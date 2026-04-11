export default class ContactController {
constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAddContact(this.handleAddContact);
    this.view.bindDeleteContact(this.handleDeleteContact);
    this.view.bindEditContact(this.handleEditContact);

    if (!localStorage.getItem('currentUser')) {
        this.view.renderContacts({});
    } else {
        this.onContactsChanged(this.model.contacts);
    }
}

    onContactsChanged = (contacts) => {
        const grouped = this.groupByLetter(contacts);
        this.view.renderContacts(grouped);
    };

    handleAddContact = (name, phone, id) => {
        if (!name || !phone) return;

        if (id) {
            this.model.updateContact(id, name, phone);
        } else {
            this.model.addContact(name, phone);
        }

        this.onContactsChanged(this.model.contacts);
    };

    handleDeleteContact = (id) => {
        this.model.deleteContact(id);
        this.onContactsChanged(this.model.contacts);
    };

    handleEditContact = (id) => {
        const contact = this.model.contacts.find(c => c.id == id);
        if (contact) {
            this.view.fillForm(contact);
        }
    };

    groupByLetter(contacts) {
        return contacts.reduce((acc, contact) => {
            const letter = contact.name?.[0]?.toUpperCase() || '#';

            if (!acc[letter]) {
                acc[letter] = [];
            }

            acc[letter].push(contact);
            return acc;
        }, {});
    }
}