  // Dynamically display the last modified date of the page
  document.getElementById('lastModified').textContent = document.lastModified;

  // Responsive Navigation Toggle Script
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  navToggle.addEventListener('click', function() {
    mainNav.classList.toggle('open');
  });