"use strict";
const menuButton = document.querySelector("#menu-button");
function toggleMenu() {
    const navContainer = document.querySelector("#nav-container");
    if (!navContainer)
        return;
    const isMenuOpen = navContainer.classList.contains("nav-open");
    if (isMenuOpen) {
        navContainer.classList.remove("nav-open");
    }
    else {
        navContainer.classList.add("nav-open");
    }
}
if (menuButton)
    menuButton.addEventListener("click", toggleMenu);
