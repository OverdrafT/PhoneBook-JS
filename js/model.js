export default class ContactModel {
    constructor() {
        const defaultContacts = [
            { id: 1, name: "Steve Jobs", phone: "+380671112233" },
            { id: 2, name: "Mark Zuckerberg", phone: "+380504445566" },
            { id: 3, name: "Linus Torvalds", phone: "+380937778899" },
            { id: 4, name: "Satya Nadella", phone: "+380440001122" },
            { id: 5, name: "Tim Cook", phone: "+380683334455" }
        ];

        const saved = localStorage.getItem('contacts');
        this.contacts = saved ? JSON.parse(saved) : defaultContacts;
        
        if (!saved) this._save();
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