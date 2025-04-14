document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});
document.getElementById('lastModified').textContent = document.lastModified;

// Responsive Navigation Toggle Script
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', function() {
  mainNav.classList.toggle('open');
});