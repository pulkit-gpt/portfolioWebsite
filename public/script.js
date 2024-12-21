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

// add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

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
