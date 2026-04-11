export default class ContactView {
    constructor() {
        this.contactList = document.getElementById('contact-list');
        this.form = document.getElementById('add-contact-form');
        
        const modalElement = document.getElementById('addContactModal');
        this.modal = modalElement ? new window.bootstrap.Modal(modalElement) : null;
    }

    stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = Math.abs(hash % 360);
        return `hsl(${h}, 65%, 55%)`; 
    }

    getInitials(name) {
        const nameParts = name.trim().split(/\s+/);
        if (nameParts.length > 1) {
            return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
        }
        return (nameParts[0][0] || '?').toUpperCase();
    }

    renderContacts(groupedContacts) {
        if (!this.contactList) return;
        this.contactList.innerHTML = '';

        for (const [letter, contacts] of Object.entries(groupedContacts)) {
            const headerRow = document.createElement('tr');
            headerRow.className = 'table-light';
            headerRow.innerHTML = `<td colspan="4" class="fw-bold text-primary small ps-3">${letter}</td>`;
            this.contactList.appendChild(headerRow);

            contacts.forEach(contact => {
                const color = this.stringToColor(contact.name);
                const initials = this.getInitials(contact.name);

                const row = document.createElement('tr');
                row.className = 'align-middle';
                row.innerHTML = `
                    <td>
                        <div class="avatar-circle shadow-sm" style="background-color: ${color}; color: white; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; font-weight: bold;">
                            ${initials}
                        </div>
                    </td>
                    <td><strong>${contact.name}</strong></td>
                    <td class="text-muted">${contact.phone}</td>
                    <td class="text-end" data-id="${contact.id}">
                        <button class="btn btn-sm btn-outline-primary edit-btn">Edit</button>
                        <button class="btn btn-sm btn-outline-danger del-btn ms-1">Delete</button>
                    </td>
                `;
                this.contactList.appendChild(row);
            });
        }
    }

    fillForm(contact) {
        document.getElementById('modal-id').value = contact.id; 
        document.getElementById('modal-name').value = contact.name;
        document.getElementById('modal-phone').value = contact.phone;
        
        document.querySelector('.modal-title').textContent = 'Edit Contact';
        this.modal?.show();
    }

    bindAddContact(handler) {
        const addBtn = document.getElementById('add-contact-btn');
        
        if (addBtn) {
            addBtn.onclick = (e) => {

                const isLogged = localStorage.getItem('currentUser');
                if (!isLogged) {
                    if (confirm("Only authorized users can add contacts. Go to login?")) {
                        window.location.href = 'login.html';
                    }
                    return;
                }

                this.form.reset();
                document.getElementById('modal-id').value = '';
                document.querySelector('.modal-title').textContent = 'New Contact';
                this.form.classList.remove('was-validated');

                this.modal?.show();
            };
        }

        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.form.checkValidity()) {
                e.stopPropagation();
                this.form.classList.add('was-validated');
                return;
            }

            const id = document.getElementById('modal-id').value;
            const name = document.getElementById('modal-name').value;
            const phone = document.getElementById('modal-phone').value;

            handler(name, phone, id); 
            this.modal?.hide();
        });
    }

    bindDeleteContact(handler) {
        this.contactList?.addEventListener('click', e => {
            const btn = e.target.closest('.del-btn');
            if (btn) {
                const id = btn.parentElement.dataset.id;
                if (confirm('Delete this contact?')) {
                    handler(id);
                }
            }
        });
    }

    bindEditContact(handler) {
        this.contactList?.addEventListener('click', e => {
            const btn = e.target.closest('.edit-btn');
            if (btn) {
                const id = btn.parentElement.dataset.id;
                handler(id); 
            }
        });
    }
}