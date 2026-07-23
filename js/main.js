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

// COMMIT 7 - COMPTE A REBOURS, COMPTEUR DES STATIQUES, ANIMATIONS

// COMPTE A REBOURS
const evenDate = new Date("November 12, 2026 09:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = evenDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minutesEl = document.getElementById("countdown-minutes");
    const secondsEl = document.getElementById("countdown-seconds");

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// COMPTEUR ANIMES
const counters = document.querySelectorAll(".stat-number");
function startCounters() {
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let current = 0;
        const increment = Math.ceil(target / 100);
        const timer = setInterval(() => {
            current += increment;
            if(current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = current;
            }
        }, 20);
    });
}

// LANCER LES COMPTEURS
let countersStarted = false;
window.addEventListener("scroll", () => {
    const stats = document.querySelector(".stats-grid");
    if (!stats || countersStarted) return;
    const position = stats.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
        countersStarted = true;
        startCounters();
    }
});

// ANIMATIONS AU SCROLL (IntersectionObserver)
const elements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});
elements.forEach(element => {
    observer.observe(element);
});

