// navigation.js

const menuButton = document.getElementById("menuButton");
const primaryNav = document.getElementById("primaryNav");

menuButton.addEventListener("click", () => {
  // Toggle classes to show/hide the nav
  primaryNav.classList.toggle("open");
  primaryNav.classList.toggle("closed");
});
