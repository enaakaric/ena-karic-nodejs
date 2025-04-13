// Postavljanje fade-in efekta pri učitavanju stranice
document.addEventListener("DOMContentLoaded", function() {
    document.body.style.opacity = 0; // Početno postavljanje opacity na 0 (nevidljivo)
    document.body.style.transition = "opacity 1.5s ease-in-out"; // Postavljanje transition efekta za glatku promjenu

    // Kasnije postavite opacity na 1, čime će stranica postati vidljiva
    setTimeout(function() {
        document.body.style.opacity = 1; 
    }, 10); // 10ms kašnjenje da se stil primeni
});

// Provjera da li je korisnik već unio ime u localStorage
if (!localStorage.getItem("userName")) {
    const userName = prompt("Unesite vaše ime:"); // Ako nije uneseno ime, traži od korisnika da unese
    if (userName) {
        localStorage.setItem("userName", userName); // Spremi ime u localStorage
        alert(`Dobrodošli, ${userName}!`); // Obavijesti korisnika dobrodošlicom
    }
} else {
    alert(`Dobrodošli nazad, ${localStorage.getItem("userName")}!`); // Ako je ime već spremljeno, obavijesti korisnika
}

// Brojač posjeta (samo za prvi dolazak na sajt u sesiji)
if (!sessionStorage.getItem("visited")) {
    let count = localStorage.getItem("visitCount") ? parseInt(localStorage.getItem("visitCount")) + 1 : 1; // Povećaj broj posjeta
    localStorage.setItem("visitCount", count); // Spremi broj posjeta u localStorage
    alert(`Ovo je vaša ${count}. posjeta stranici!`); // Obavijesti korisnika o broju posjeta
    sessionStorage.setItem("visited", "true"); // Sprečava brojanje na svako učitavanje stranice
}

// Validacija formulara
const form = document.querySelector("form"); // Odabir formulara
if (form) {
    form.addEventListener("submit", function(event) { // Dodavanje event listenera na submit
        let name = document.querySelector("#name").value.trim(); // Uzimanje vrijednosti imena
        let email = document.querySelector("#email").value.trim(); // Uzimanje vrijednosti emaila
        let message = document.querySelector("#message").value.trim(); // Uzimanje vrijednosti poruke
        
        if (!name || !email || !message) { // Provjera da li su svi podaci uneseni
            alert("Molimo popunite sva polja."); // Ako neki podatak nedostaje, obavijesti korisnika
            event.preventDefault(); // Sprečava slanje formulara
        } else {
            alert("Hvala što ste poslali poruku!"); // Ako je sve ispravno, obavijesti korisnika
        }
    });
}

// Modal prozor
document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModal"); // Dugme za otvaranje modala
    const modal = document.querySelector(".modal"); // Odabir modal prozora
    const closeModalBtn = document.querySelector(".close-modal"); // Dugme za zatvaranje modala

    // Prikazivanje modala
    openModalBtn.addEventListener("click", function () {
        modal.style.display = "flex"; // Prikazivanje modala
        setTimeout(() => {
            modal.style.opacity = "1"; // Fade-in efekt za modal
        }, 50);
    });

    // Zatvaranje modala
    closeModalBtn.addEventListener("click", function () {
        modal.style.opacity = "0"; // Fade-out efekt za modal
        setTimeout(() => {
            modal.style.display = "none"; // Sakrij modal nakon efekta
        }, 300);
    });

    // Zatvaranje modala klikom izvan sadržaja
    modal.addEventListener("click", function (event) {
        if (event.target === modal) { // Ako je kliknuto izvan sadržaja modala
            modal.style.opacity = "0"; // Fade-out efekt za modal
            setTimeout(() => {
                modal.style.display = "none"; // Sakrij modal nakon efekta
            }, 300);
        }
    });
});

// Back to top dugme
const backToTop = document.querySelector(".backToTop"); // Odabir dugmeta za povratak na vrh
if (backToTop) {
    window.addEventListener("scroll", function() { // Kada korisnik pomiče stranicu
        if (window.scrollY > 100) { // Ako je pomaknut više od 100px
            backToTop.style.display = "block"; // Prikazivanje dugmeta
        } else {
            backToTop.style.display = "none"; // Sakrivanje dugmeta
        }
    });
    backToTop.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Pomicanje na vrh stranice s glatkim prijelazom
    });
}

// Automatski slideshow
let slideIndex = 0; // Početni indeks slajda
const slides = document.querySelectorAll(".slide"); // Odabir svih slajdova
function showSlides() {
    slides.forEach(slide => slide.style.display = "none"); // Sakrij sve slajdove
    slideIndex++; // Povećaj indeks slajda
    if (slideIndex > slides.length) { slideIndex = 1; } // Ako je indeks veći od broja slajdova, resetuj na 1
    slides[slideIndex - 1].style.display = "block"; // Prikazivanje trenutnog slajda
    setTimeout(showSlides, 3000); // Pozivanje funkcije svakih 3 sekunde
}
if (slides.length > 0) {
    showSlides(); // Pokreni slideshow
}

// Tooltip prikaz
const tooltips = document.querySelectorAll("[data-tooltip]"); // Odabir svih elemenata s tooltipom
tooltips.forEach(tooltip => {
    tooltip.addEventListener("mouseenter", function() { // Kada korisnik mišem pređe preko elementa
        let tip = document.createElement("div"); // Kreiraj novi element za tooltip
        tip.className = "tooltip-box"; // Dodaj klasu za stilizovanje
        tip.innerText = tooltip.getAttribute("data-tooltip"); // Postavi tekst tooltipa
        document.body.appendChild(tip); // Dodaj tooltip u body
        let rect = tooltip.getBoundingClientRect(); // Dobij koordinate elementa
        tip.style.left = `${rect.left + window.scrollX}px`; // Postavi poziciju tooltipa
        tip.style.top = `${rect.top + window.scrollY - 30}px`; // Postavi poziciju tooltipa
        tooltip.dataset.tipElement = tip; // Spremi tooltip za kasniju upotrebu
    });
    tooltip.addEventListener("mouseleave", function() { // Kada korisnik pomakne miša sa elementa
        document.body.removeChild(tooltip.dataset.tipElement); // Ukloni tooltip iz DOM-a
    });
});

// Digitalni sat
function updateClock() {
    const clock = document.querySelector("#clock"); // Odabir elementa za sat
    if (clock) {
        const now = new Date(); // Uzimanje trenutnog vremena
        const hours = now.getHours().toString().padStart(2, '0'); // Formatiranje sati
        const minutes = now.getMinutes().toString().padStart(2, '0'); // Formatiranje minuta
        const seconds = now.getSeconds().toString().padStart(2, '0'); // Formatiranje sekundi
        clock.textContent = `VRIJEME: ${hours}:${minutes}:${seconds}`; // Postavljanje vremena u element
    }
}
setInterval(updateClock, 1000); // Ažuriraj sat svake sekunde
updateClock(); // Prvi put pozovi funkciju odmah

// Nasumično motivaciono iznenađenje
const messages = [
    "Vjeruj u sebe!", // Motivacijska poruka
    "Svaki dan je nova prilika!", // Motivacijska poruka
    "Nikad ne odustaj!", // Motivacijska poruka
    "Mali koraci vode ka velikim uspjesima!", // Motivacijska poruka
    "Ti to možeš!" // Motivacijska poruka
];

// Prikazivanje motivacionog citata unutar div-a
function showMotivationalQuote() {
    const messageElement = document.querySelector("#motivational-message"); // Odabir elementa za citat
    if (messageElement) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]; // Odabir nasumične poruke
        messageElement.innerHTML = `<span>${randomMessage}</span>`; // Postavljanje citata unutar <span> tag-a da bi ga mogli stilizovati
        messageElement.classList.add("visible"); // Aktiviramo fade-in efekat
    }
}

// Prikazivanje citata 5 sekundi nakon učitavanja stranice
setTimeout(showMotivationalQuote, 5000);

// Efekat pisanja teksta
document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector("#typingEffect"); // Odabir elementa za efekat tipkanja
    if (textElement) {
        const text = textElement.getAttribute("data-text"); // Uzimanje teksta iz data atributa
        let index = 0;
        function typeText() {
            if (index < text.length) { // Ako još ima teksta za ispisati
                textElement.textContent += text.charAt(index); // Ispisivanje jednog karaktera
                index++;
                setTimeout(typeText, 100); // Pozivanje funkcije nakon 100ms
            }
        }
        typeText(); // Pokreni efekat tipkanja
    }
});

function typeEffect(element, text, speed) {
    let i = 0;
    const interval = setInterval(() => { // Koristi interval za tipkanje efekta
        if (i < text.length) {
            element.textContent += text.charAt(i); // Dodavanje jednog karaktera
            i++;
        } else {
            clearInterval(interval); // Zaustavi interval kada je tekst ispisan
        }
    }, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    const animatedTextElement = document.getElementById("animated-text"); // Odabir elementa za animirani tekst
    const textToAnimate = "O nama"; // Tekst koji treba biti animiran
    const typingSpeed = 100; // Brzina tipkanja u milisekundama
    typeEffect(animatedTextElement, textToAnimate, typingSpeed); // Pokreni efekat tipkanja
});
