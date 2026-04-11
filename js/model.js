export default class ContactModel {
    constructor() {
        const savedContacts = JSON.parse(localStorage.getItem('contacts'));
        this.contacts = savedContacts || [];
    }

    _save() {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }

    addContact(name, phone, id = null) {
        const isEdit = id !== null && id !== '';

        if (isEdit) {
            const numericId = Number(id);
            const index = this.contacts.findIndex(c => Number(c.id) === numericId);
            
            if (index !== -1) {
                this.contacts[index] = { ...this.contacts[index], name, phone };
                this._save();
                return;
            }
        }

        this.contacts.push({
            id: Date.now(),
            name,
            phone
        });
        this._save();
    }

    deleteContact(id) {
        const numericId = Number(id);
        this.contacts = this.contacts.filter(contact => Number(contact.id) !== numericId);
        this._save();
    }

    getGroupedContacts() {
        const sorted = [...this.contacts].sort((a, b) => a.name.localeCompare(b.name));
        return sorted.reduce((groups, contact) => {
            const letter = contact.name[0].toUpperCase();
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(contact);
            return groups;
        }, {});
    }
}