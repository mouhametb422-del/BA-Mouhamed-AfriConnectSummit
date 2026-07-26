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
const icon = document.querySelector(".theme-toggle i");
if(localStorage.getItem("theme") === "dark") {
    body.setAttribute("data-theme", "dark");
    icon.className = "bi bi-sun-fill";
}
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        if (body.getAttribute("data-theme") === "dark") {
            body.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            icon.className = "bi bi-moon-stars-fill";
        } else {
            body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            icon.className = "bi bi-sun-fill";
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

// COMMIT 8 - ONGLETS DU PROGRAMME, FILTRES DES INTERVENANTS, VALIDATION FORMULAIRE CONTACT ET MESSAGE SUCCES

// ONGLETS DU PROGRAMME
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(button => {
    button.addEventListener("click", () =>{
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanels.forEach(panel => panel.classList.remove("active"));

        button.classList.add("active");

        const target = document.getElementById(button.dataset.tab);

        if (target) {
            target.classList.add("active")
        }
    });
});

// FILTRE DES INTERVENANTS
const filterButtons = document.querySelectorAll(".filter-btn");
const speakerCards = document.querySelectorAll(".speaker-card-full");

filterButtons.forEach(button  => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn  => btn.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        speakerCards.forEach(card => {
            const category = card.dataset.categorie;
            if (filter === "tous" || category === filter) {
                card.classList.remove("hide");
                card.classList.add("show");
                
            } else {
                card.classList.remove("show");
                card.classList.add("hide"); 
            }
        });
    });
});

// FORMULAIRE D'INSCRIPTION

const form = document.getElementById("inscription-form");
if (form) {
    const successBox = document.getElementById("success-box");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let formvalid = true;

        // Récupération des champs
        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const telephone = document.getElementById("telephone");
        const participation = document.getElementById("participation");
        const pays = document.getElementById("pays");
        const message = document.getElementById("message");

        const fields = [
            nom,
            email,
            telephone,
            participation,
            pays,
            message
        ];

        // Suppression des anciennes erreurs
        fields.forEach(field => {
            const group = field.closest(".form-group");
            if (group) {
                group.classList.remove("error");
            }
        });

        // vérification des champs vides
        fields.forEach(field => {
            if (field.value.trim() === ""){
                field.closest(".form-group").classList.add("error");
                formvalid = false;
            }
        });

        // Vérification email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.value.trim() !== "" && !emailPattern.test(email.value)) {
            email.closest(".form-group").classList.add("error"); 
            formvalid = false;
        }

        // Vérification message
        if(message.value.trim().length < 20) {
            message.closest(".form-group").classList.add("error");
            formvalid = false;
        }

        // Vérification téléphone 
        const telPattern = /^[\d\s+\-]{8,15}$/;
        if(telephone.value.trim() !== "" && !telPattern.test(telephone.value)){
            telephone.closest(".form-group").classList.add("error");
            formvalid = false;
        }

        // Si tout est correct
        if (formvalid) {
            successBox.classList.add("show");
            form.reset();
            setTimeout(()  =>{
                successBox.classList.remove("show");
            }, 5000);
        }

    });
}