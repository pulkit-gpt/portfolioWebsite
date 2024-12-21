"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Handle form submission using AJAX
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form); // Collect form data

  // Send data to Google Apps Script using fetch
  fetch("<YOUR_GOOGLE_APPS_SCRIPT_URL>", {
    method: "POST",
    body: formData, // Send form data
  })
    .then((response) => response.text())
    .then((data) => {
      // Optionally show a success message or update UI
      alert("Your message has been sent!");
      form.reset(); // Clear the form fields
    })
    .catch((error) => {
      // Handle errors if any
      console.error("Error:", error);
      alert("There was an issue sending your message. Please try again.");
    });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

const projectItems = document.querySelectorAll(".project-item");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal content selectors
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalKeyFeatures = document.querySelector("[data-modal-key-features]");
const modalTechnologies = document.querySelector("[data-modal-technologies]");
const modalLink = document.querySelector("[data-modal-link]");

// Modal toggle function
const toggleModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to project items
projectItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Fetch data attributes
    const title = item.dataset.title;
    const description = item.dataset.description;
    const keyFeatures = JSON.parse(item.dataset.keyfeatures);
    const technologies = JSON.parse(item.dataset.technologies);
    const link = item.dataset.link;

    // Update modal content
    modalTitle.textContent = title;
    modalText.innerHTML = `<p>${description}</p>`;

    // Populate key features
    modalKeyFeatures.innerHTML = keyFeatures
      .map((feature) => `<li>${feature}</li>`)
      .join("");

    // Populate technologies
    modalTechnologies.textContent = technologies.join(", ");

    // Update project link
    modalLink.href = link;
    modalLink.textContent = "View Project";

    toggleModal();
  });
});

// Add click event to close button and overlay
modalCloseBtn.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);
