"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const allElements = document.querySelectorAll(".title, .subtitle");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 1.0 });
    allElements.forEach((element) => {
        observer.observe(element);
        element.classList.add("hide");
    });
});
