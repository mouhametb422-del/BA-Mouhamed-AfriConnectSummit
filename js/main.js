/* COMMIT 6 - Menu hamburger, Dark Mode, Année automatique du footer et Bouton retour en haut */

// MENU HAMBURGER
const hamburger = document.querySelector(".hamburger");
const navlinks = document.querySelector(".nav-links");

if(hamburger && navlinks) {
    hamburger.addEventListener("click", () => {
        navlinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
}

// DARK MODE
const themeBtn = document.querySelector(".theme-toggle");
const body = document.body;
if(localStorage.getItem("theme") === "dark") {
    body.setAttribute("data-theme", "dark");
}
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        if (body.getAttribute("data-theme") === "dark") {
            body.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    });
}

// ANNEE AUTOMATIQUE DU FOOTER 
const annee = document.getElementById("annee-actuelle");
if (annee) {
    annee.textContent = new Date().getFullYear();
}

// BOUTON RETOUR EN HAUT
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
    if (!backToTop) return;
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});
if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

