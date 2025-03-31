// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Manejo del tema (claro/oscuro)
const themeSwitch = document.getElementById('checkbox');
const htmlElement = document.documentElement;

// Verificar si hay un tema guardado en localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
themeSwitch.checked = savedTheme === 'light';

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Manejo del idioma (español/inglés)
const langSwitch = document.getElementById('lang-checkbox');
const langElements = document.querySelectorAll('[data-lang]');

// Verificar si hay un idioma guardado en localStorage
const savedLang = localStorage.getItem('lang') || 'es';
setLanguage(savedLang);
langSwitch.checked = savedLang === 'en';

langSwitch.addEventListener('change', () => {
    const newLang = langSwitch.checked ? 'en' : 'es';
    setLanguage(newLang);
    localStorage.setItem('lang', newLang);
});

function setLanguage(lang) {
    langElements.forEach(element => {
        if (element.getAttribute('data-lang') === lang) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

// Navegación Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Menú Móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Header Transparente con Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    header.classList.add('scrolled');
    lastScroll = currentScroll;
});

// Formulario de Contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = langSwitch.checked ? 'Sending...' : 'Enviando...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert(langSwitch.checked ? 'Message sent successfully! I will contact you soon.' : '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
            contactForm.reset();
        } catch (error) {
            alert(langSwitch.checked ? 'There was an error sending the message. Please try again.' : 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Lazy Loading para imágenes
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Animación de habilidades al hacer scroll
const animateSkills = () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.level;
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(level => skillObserver.observe(level));
};

// Inicializar animaciones de habilidades
document.addEventListener('DOMContentLoaded', animateSkills);
