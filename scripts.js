window.addEventListener('load', function () {
    const preload = document.getElementById('preload');
    if (!preload) return;
    preload.classList.add('preload-hidden');
    setTimeout(() => {
        preload.remove();
    }, 500);
});

const translations = {
    en: {
        title: "The Portfolio",
        offers_name: "What i offer",
        offers_1: "Backend development",
        offers_2: "Telegram bots",
        offers_3: "SQL integration",
        offers_4: "thx",
        info_name: "About me",
        info_1: "15yo",
        badge_name: "My stek",
        badge_senior: "senior",
        badge_role: "Python developer",
        skills_core: "Core:",
        skills_web: "Web:",
        skills_frontend: "Frontend",
        skills_backend: "Backend",
        skills_cyber: "Cybersecurity",
        btn_projects: "My projects",
        btn_info: "My info",
        projects_heading: "My projects",
        proj1_desc: "OSINT tool for searching information by username, email and IP address. Single-script solution for quick reconnaissance.",
        proj2_desc: "Modular LLM system with vector search and prompt engineering. Architecture: core, clients, interface, llm, vector."
    },
    ru: {
        title: "Портфолио",
        offers_name: "Что я предлагаю",
        offers_1: "Backend разработка",
        offers_2: "Telegram боты",
        offers_3: "Интеграция SQL",
        offers_4: "спс",
        info_name: "Обо мне",
        info_1: "15 лет",
        badge_name: "Мой стек",
        badge_senior: "senior",
        badge_role: "Python разработчик",
        skills_core: "Основное:",
        skills_web: "Веб:",
        skills_frontend: "Frontend",
        skills_backend: "Backend",
        skills_cyber: "Кибербезопасность",
        btn_projects: "Мои проекты",
        btn_info: "Обо мне",
        projects_heading: "Мои проекты",
        proj1_desc: "OSINT-инструмент для поиска информации по username, email и IP-адресу. Single-script решение для быстрой разведки.",
        proj2_desc: "Модульная LLM-система с векторным поиском и промпт-инжинирингом. Архитектура: core, clients, interface, llm, vector."
    }
};

function setLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
    let saved = 'en';
    try { saved = localStorage.getItem('lang') || 'en'; } catch (e) {}
    setLanguage(saved);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    const projectsBtn = document.querySelector('.projects');
    const projectsSection = document.getElementById('projects-section');
    if (projectsBtn && projectsSection) {
        projectsBtn.addEventListener('click', () => {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    const revealEls = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('visible'));
    } else {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealEls.forEach(el => observer.observe(el));
    }

    const codeEl = document.getElementById('typed-code');
    if (codeEl) {
        const code = `def illeg4l(q):
    for _ in q:
        print(_)

value = [1010, 11101, 100101]
illeg4l(value)`;

        let charIndex = 0;
        let deleting = false;

        function typeLoop() {
            if (!deleting) {
                charIndex++;
                codeEl.textContent = code.slice(0, charIndex);
                if (charIndex >= code.length) {
                    deleting = true;
                    setTimeout(typeLoop, 2200);
                    return;
                }
                setTimeout(typeLoop, 55);
            } else {
                charIndex--;
                codeEl.textContent = code.slice(0, charIndex);
                if (charIndex <= 0) {
                    deleting = false;
                    setTimeout(typeLoop, 600);
                    return;
                }
                setTimeout(typeLoop, 18);
            }
        }

        typeLoop();
    }
});