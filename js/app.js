import ContactModel from './model.js';
import ContactView from './view.js';
import ContactController from './controller.js';

const contactApp = document.getElementById('contact-list') 
    ? new ContactController(new ContactModel(), new ContactView()) 
    : null;

const profileInit = () => {
    const nameEl = document.getElementById('profile-name');
    
    if (nameEl) {
        const userData = JSON.parse(localStorage.getItem('currentUser')) || {
            name: "Shcherbatiuk Yevhen",
            email: "shcherbatiuk.yevhen@kpi.ua",
            gender: "Male",
            dob: "2000-01-12"
        };

        nameEl.innerText = userData.name;
        document.getElementById('profile-email').innerText = userData.email;
        document.getElementById('profile-gender').innerText = userData.gender;
        document.getElementById('profile-dob').innerText = userData.dob;
    }
};

profileInit();

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

const registrationForm = document.getElementById('registration-form');

registrationForm?.addEventListener('submit', (event) => {
    if (!registrationForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();

        const userData = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            gender: document.getElementById('reg-gender').value,
            dob: document.getElementById('reg-dob').value
        };
        
        localStorage.setItem('userProfile', JSON.stringify(userData));
        alert('Registration successful!');
        window.location.href = 'profile.html';
    }

    registrationForm.classList.add('was-validated');
}, false);