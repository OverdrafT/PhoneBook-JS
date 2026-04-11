import ContactModel from './model.js';
import ContactView from './view.js';
import ContactController from './controller.js';

const contactList = document.getElementById('contact-list');
if (contactList) {
    console.log("PhoneBook: Initializing...");
    const model = new ContactModel();
    const view = new ContactView();
    new ContactController(model, view);
}

const profileInit = () => {
    const nameEl = document.getElementById('profile-name');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && nameEl) {
        nameEl.innerText = currentUser.name;
        document.getElementById('profile-email').innerText = currentUser.email;
        document.getElementById('profile-gender').innerText = currentUser.gender;
        document.getElementById('profile-dob').innerText = currentUser.dob;
    } else if (nameEl) {
        window.location.href = 'login.html';
    }
};

if (document.getElementById('profile-name')) {
    profileInit();
}

document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

const regForm = document.getElementById('registration-form');
regForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (regForm.checkValidity()) {
        const userData = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            password: document.getElementById('reg-password').value,
            gender: document.getElementById('reg-gender').value,
            dob: document.getElementById('reg-dob').value
        };
        localStorage.setItem('registeredUser', JSON.stringify(userData));
        localStorage.setItem('currentUser', JSON.stringify(userData));
        alert('Реєстрація успішна!');
        window.location.href = 'profile.html';
    }
    regForm.classList.add('was-validated');
});

const loginForm = document.getElementById('login-form');
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    const saved = JSON.parse(localStorage.getItem('registeredUser'));

    if (saved && saved.email === email && saved.password === pass) {
        localStorage.setItem('currentUser', JSON.stringify(saved));
        window.location.href = 'profile.html';
    } else {
        alert('Incorrect email or password!');
    }
});