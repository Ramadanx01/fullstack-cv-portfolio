document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langIcon = langToggleBtn.querySelector('i');
    const langMenu = document.getElementById('lang-menu');
    let currentLang = localStorage.getItem('lang') || 'en';
    const langOptions = document.querySelectorAll('.lang-option');

    const translations = {};

    async function fetchTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load ${lang}.json`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return {}; // Return empty object on error
        }
    }

    function applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = key.split('.').reduce((obj, k) => (obj && obj[k] !== 'undefined') ? obj[k] : null, translations[lang]);
            
            if (translation) {
                // Handle elements that contain other HTML tags like <strong>
                if (el.children.length > 0 && el.dataset.i18nKeepChildren) {
                    const firstChild = el.firstChild;
                    if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
                        firstChild.nodeValue = translation;
                    }
                } else if (el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', translation);
                }
                else {
                    el.innerHTML = translation;
                }
            }
        });

        // Update document direction
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }

    async function setLanguage(lang) {
        langIcon.classList.add('is-loading'); // Start loading animation

        if (!translations[lang]) {
            translations[lang] = await fetchTranslations(lang);
        }
        applyTranslations(lang);
        localStorage.setItem('lang', lang);
        currentLang = lang;

        langIcon.classList.remove('is-loading'); // Stop loading animation
    }

    // Toggle language menu
    langToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from immediately closing the menu
        langMenu.classList.toggle('hidden');
    });

    // Set language when an option is clicked
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const newLang = option.getAttribute('data-lang');
            if (newLang !== currentLang) {
                setLanguage(newLang);
            }
            langMenu.classList.add('hidden');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!langMenu.classList.contains('hidden') && !langToggleBtn.contains(e.target)) {
            langMenu.classList.add('hidden');
        }
    });

    // Initial load
    setLanguage(currentLang);
});