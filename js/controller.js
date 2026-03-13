export default class ContactController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.onContactListChanged(this.model.getGroupedContacts());

        this.view.bindAddContact(this.handleAddContact.bind(this));
        this.view.bindDeleteContact(this.handleDeleteContact);
        this.view.bindEditContact(this.handleEdit.bind(this));
    }

    onContactListChanged = (contacts) => {
        this.view.renderContacts(contacts);
    }

    handleAddContact(name, phone, id = null) {
        this.model.addContact(name, phone, id);
        const grouped = this.model.getGroupedContacts();
        this.view.renderContacts(grouped);
    }

    handleDeleteContact = (id) => {
        this.model.deleteContact(id);
        this.onContactListChanged(this.model.getGroupedContacts());
    }

    handleEdit(id) {
        const contact = this.model.contacts.find(c => c.id === id);
        if (contact) {
            this.view.fillForm(contact);
            this.editingId = id; 
        }
    }
}