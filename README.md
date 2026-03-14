# Laboratory Work #2: PhoneBook Web Application

### Developer Information
* **Name:** Shcherbatiuk Yevhen
* **Group:** KV-33
* **Institution:** Igor Sikorsky Kyiv Polytechnic Institute (KPI)
* **Course:** Web Design & Front-end Development

---

## Project Overview
This project is a dynamic web application for contact management, built using the Model-View-Controller (MVC) architectural pattern. Unlike static prototypes, this version features a fully functional CRUD (Create, Read, Update, Delete) system with persistent data storage.
### Key Features:
* **MVC Architecture:** Strict separation of concerns between data (Model), UI (View), and logic (Controller).
* **Persistent Storage:** Data is saved in the browser's LocalStorage, ensuring contacts remain after page reloads.
* **Full CRUD Operations:** Support for adding new contacts, editing existing ones, and deleting entries with smooth animations.
* **Smart UI/UX:**
* Dynamic Avatars: Initial-based avatars with unique colors generated via HSL hashing of contact names.
* Alphabetical Grouping: Automatic sorting and grouping of contacts by the first letter.
* Smooth Animations: Integrated CSS transitions for row removal (fade-out effect).
* **Advanced Form Validation:** Complex validation using Regular Expressions (Regex) and Bootstrap's Constraint Validation API on both Contact and Registration forms.
* **Responsive & Sticky UI:** Adaptive layout with a Sticky Navbar for better navigation in long lists.

---

## Technologies Used
* **JavaScript(ES6+):** Classes for MVC implementation, Event Delegation and Hashing algorithms.
* **HTML5:** Semantic structure of the web pages.
* **CSS3:** Custom styles for avatars, layout adjustments, and UI enhancements.
* **Bootstrap 5.3:** Main framework for grid system, components (cards, tables), and responsiveness.
* **Bootstrap Icons:** Font-based icons for UI elements and branding.

---

## Project Structure
The repository contains the following files:
* `index.html` — The main dashboard with the contact list.
* `register.html` — User registration form.
* `login.html` — User authentication form.
* `profile.html` — User's personal information page.
* `about.html` — Information about the project and developer.
* `privacy.html` — Data handling policy (academic notice).
* `style.css` — Centralized custom stylesheet.
* `favicon.ico` / `myicon.png` — Website icon.
* `js/model.js` - Business logic and LocalStorage handling.
* `js/view.js` - DOM manipulation, Event binding and Animations.
* `js/controller.js` - Event handling and MVC coordination.
* `js/app.js` - Entry point for initializing the application.

---

## Navigation Flow
The application follows a logical user journey:
1. **Initial State:** On first load, the Model populates the list with default IT-industry contacts.
2. **Contact Management:** Clicking "Add Contact" opens a modal.
* The View handles form validation before passing data to the Controller.
* The Model performs a "Type-Casting" check (ID Numbering) to decide whether to Update or Insert a record.
3. **Synchronization:** Every data change triggers an automatic re-render of the View and updates the LocalStorage.
---

## How to Run
1. **Clone the repository:**
   ```bash
   git clone https://github.com/shche/PhoneBook.git
2. **Open the project:**
   Simply open index.html via Live Server in VS Code or any modern browser.

3. **Live Demo:**
   Alternatively, visit the live demo via [GitHub Pages](https://overdraft.github.io/PhoneBook-JS/index.html).

   ---

   Report: [Google Docs](https://docs.google.com/document/d/1hclSB-8W1cqrtn-H-WY6Rx7wAtG-2Zy-/edit?usp=sharing&ouid=113956265273490753946&rtpof=true&sd=true)
