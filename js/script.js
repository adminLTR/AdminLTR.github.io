window.addEventListener("load", function () {
    linkSelectionEvent();
    initScrollEffects();

    document.getElementById("age").textContent = getAge("2003-05-28");

    renderLinks();
    renderInfo();

    renderLanguages(languages);
    renderHeaderLanguageSelect(languages);
    renderSkills(areas);
    renderEducation(education);
    renderProjects(projects);
    renderAchievements(achievements);

    bindLanguageSelectors();
    initScrollTopButton();

    // Close mobile/collapsed nav after clicking a link
    document.querySelectorAll('#menu a').forEach((link) => {
        link.addEventListener('click', () => {
            const check = document.getElementById('check-menu');
            if (check) check.checked = false;
        });
    });

    // Add smooth scroll for CTA button
    document.querySelector('.view-work-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#projects').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function initScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Parallax effect for floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape, .bg-shape, .exp-bg-shape, .proj-bg-shape, .skills-bg-shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function renderLinks() {
    const lang = getCurrentLang();
    const links = Object.keys(info[lang].links);
    links.forEach(link => {
        try {
            document.getElementById("link-"+link).textContent = info[lang].links[link];            
        } catch {

        }
        try {
            document.getElementById("subtitle-"+link).textContent = info[lang].links[link]
        } catch {
            
        }
    })
}

function renderInfo() {
    const lang = getCurrentLang();

    document.getElementById("career-info").textContent = info[lang].career;
    const homeAbout = document.getElementById("home-about-info");
    if (homeAbout) {
        homeAbout.textContent = presentation.web[lang];
    }

    const downloadBtn = document.getElementById("download-info");
    const downloadText = document.getElementById("download-info-text");
    if (downloadBtn) {
        downloadBtn.href = `./cv/${lang}.pdf`;
        downloadBtn.setAttribute('download', `CV-JoseLuisLaTorre-${lang}.pdf`);
    }
    if (downloadText) {
        downloadText.textContent = info[lang].download;
    }

    const currentLangName = document.getElementById("current-lang-name");
    if (currentLangName) {
        currentLangName.textContent = languageNames[lang] || lang;
    }

    const projectsDesc = document.getElementById('projects-section-description');
    if (projectsDesc && info[lang].projectsDescription) {
        projectsDesc.textContent = info[lang].projectsDescription;
    }
}

function renderLanguages(languagesList) {
    const languagesDiv = document.querySelector('#home .languages-div');
    if (!languagesDiv) return;

    const langUser = getCurrentLang();
    let html = '';
    languagesList.forEach((lang) => {
        const isActive = lang === langUser;
        html += `<img data-lang="${lang}" class="${isActive ? 'active' : ''}" width="32" height="32" src="https://img.icons8.com/color/48/${lang}-circular.png" alt="${languageNames[lang] || lang}" title="${languageNames[lang] || lang}"/>`;
    });
    languagesDiv.innerHTML = html;
}

function renderHeaderLanguageSelect(languagesList) {
    const select = document.getElementById('header-lang-select');
    if (!select) return;

    const langUser = getCurrentLang();
    select.innerHTML = languagesList
        .map(
            (lang) =>
                `<option value="${lang}"${lang === langUser ? ' selected' : ''}>${languageNames[lang] || lang}</option>`
        )
        .join('');
}

function setActiveLanguageFlags(lang) {
    document.querySelectorAll('#home .languages-div img[data-lang]').forEach((img) => {
        img.classList.toggle('active', img.dataset.lang === lang);
    });
    const select = document.getElementById('header-lang-select');
    if (select && select.value !== lang) {
        select.value = lang;
    }
}

function refreshLocalizedContent() {
    renderLinks();
    renderInfo();
    renderLanguages(languages);
    renderHeaderLanguageSelect(languages);
    renderSkills(areas);
    renderEducation(education);
    renderProjects(projects);
    renderAchievements(achievements);
}

function switchLanguage(lang) {
    if (!lang || lang === getCurrentLang()) return;

    setActiveLanguageFlags(lang);

    const check = document.getElementById('check-menu');
    if (check) check.checked = false;

    localStorage.setItem('language', lang);
    refreshLocalizedContent();
}

function bindLanguageSelectors() {
    const homeLanguages = document.querySelector('#home .languages-div');
    if (homeLanguages && !homeLanguages.dataset.bound) {
        homeLanguages.dataset.bound = 'true';
        homeLanguages.addEventListener('click', (event) => {
            const img = event.target.closest('img[data-lang]');
            if (!img) return;
            switchLanguage(img.dataset.lang);
        });
    }

    const select = document.getElementById('header-lang-select');
    if (select && !select.dataset.bound) {
        select.dataset.bound = 'true';
        select.addEventListener('change', () => {
            switchLanguage(select.value);
        });
    }
}

function renderSkills(areas) {
    const lang = getCurrentLang();
    const skillsDiv = document.querySelector("#skills .skills-container");
    const navDiv = document.querySelector("#skills .nav-buttons");

    let navHtml = "";
    const areaKeys = Object.keys(areas);
    areaKeys.forEach((area, index) => {
        const label = skillAreaLabels[area]
            ? getLocalized(skillAreaLabels[area], lang)
            : area;
        navHtml += `<button class="nav-btn ${index === 0 ? 'active' : ''}" data-area="${area}">
            <i class="fa-solid fa-${getAreaIcon(area)}"></i>
            <span>${label}</span>
        </button>`;
    });
    navDiv.innerHTML = navHtml;
    
    let html = "";
    areaKeys.forEach((area, index) => {
        html += `<div class="skill-area ${index === 0 ? 'active' : ''}" data-area="${area}">
            <div class="skills-grid">
                ${areas[area].map((tech, techIndex) => {
                    const iconSrc = getTechIconSrc(tech);
                    return `<div class="skill-item" style="animation-delay: ${techIndex * 0.1}s">
                        <div class="skill-icon">
                            <img src="${iconSrc}" alt="${tech}" onerror="this.onerror=null;this.src='./img/technologies/javascript.png';"/>
                        </div>
                        <div class="skill-info">
                            <h4>${tech}</h4>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    });
    skillsDiv.innerHTML = html;
    
    const totalSkills = Object.values(areas).flat().length;
    document.getElementById('total-skills').textContent = totalSkills;
    document.getElementById('skill-areas').textContent = areaKeys.length;
    
    const navButtons = document.querySelectorAll('.nav-btn');
    const skillAreas = document.querySelectorAll('.skill-area');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetArea = btn.dataset.area;
            navButtons.forEach(b => b.classList.remove('active'));
            skillAreas.forEach(area => area.classList.remove('active'));
            btn.classList.add('active');
            document.querySelector(`.skill-area[data-area="${targetArea}"]`).classList.add('active');
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    skillAreas.forEach(area => observer.observe(area));
}

const TECH_ICON_FILES = {
    'tensorflow/keras': 'tensorflow.png',
    "llm's": 'llms.png',
    'scikit-learn': 'scikitlearn.png',
    ml: 'ml.svg',
    dl: 'dl.svg',
    esp32: 'esp32.png',
    arduino: 'arduino.png',
    raspberry: 'raspberry.png',
    'esp-idf': 'espidf.svg',
    c: 'c.png',
    'c++': 'c++.png',
};

function normalizeTechName(tech) {
    return String(tech || '')
        .toLowerCase()
        .trim()
        .replace(/[\u2018\u2019\u0060]/g, "'");
}

function getTechIconSrc(tech) {
    const raw = normalizeTechName(tech);
    if (TECH_ICON_FILES[raw]) {
        return `./img/technologies/${TECH_ICON_FILES[raw]}`;
    }

    const aliases = {
        reactjs: 'react',
        typescript: 'typescript',
        html5: 'html',
        css3: 'css',
        'tailwind css': 'tailwindcss',
        'node.js': 'nodejs',
        expressjs: 'expressjs',
        'api rest': 'apirest',
        'web scraping': 'webscraping',
        microservicios: 'microservicios',
        sqlite: 'sqlite',
    };
    const key = aliases[raw] || raw.replace(/[^a-z0-9]+/g, '');
    const svgIcons = new Set(['flutter', 'fastapi', 'typescript', 'ml', 'dl']);
    const ext = svgIcons.has(key) ? 'svg' : 'png';
    return `./img/technologies/${key}.${ext}`;
}

function getAreaIcon(area) {
    const icons = {
        Frontend: 'palette',
        Backend: 'server',
        Databases: 'database',
        Architecture: 'diagram-project',
        Tools: 'wrench',
        AI: 'brain',
        IoT: 'microchip',
    };
    return icons[area] || 'code';
}

function renderEducation(educationList) {
    const educationDiv = document.querySelector('.home-education-grid');
    if (!educationDiv) return;

    const lang = getCurrentLang();

    let html = '';
    educationList.forEach((edu) => {
        const period = formatPeriod(edu.from, edu.to, lang);
        const cardClass = edu.type === 'exchange' ? 'home-edu-card exchange-card' : 'home-edu-card';

        html += `<div class="${cardClass}">
            <img src="./img/${edu.logo}.png" class="home-edu-logo" alt="${edu.acronym}">
            <div class="home-edu-body">
                <p class="home-edu-title">${edu.acronym} · ${getLocalized(edu.career, lang)}</p>
                <p class="home-edu-meta">${getLocalized(edu.location, lang)} · ${period}</p>
            </div>
        </div>`;
    });

    educationDiv.innerHTML = html;
}

function sortProjectsByDate(list) {
    return [...list].sort((a, b) => {
        const aKey = (a.from?.year ?? 0) * 12 + (a.from?.month ?? 0);
        const bKey = (b.from?.year ?? 0) * 12 + (b.from?.month ?? 0);
        return bKey - aKey;
    });
}

function getProjectCardImage(prj) {
    if (prj.image) return `./img/${prj.image}`;
    return `./img/projects/${formatNameForImg(prj.name)}.png`;
}

function isValidProjectLink(url) {
    return url && url !== '#';
}

function renderProjects(projectsList) {
    const projectsDiv = document.querySelector('#projects .projects-grid');
    if (!projectsDiv) return;

    const lang = getCurrentLang();
    const sorted = sortProjectsByDate(projectsList);
    let html = '';

    sorted.forEach((prj, index) => {
        const isThesis = prj.type === 'thesis';
        const category = prj.category || (isThesis ? 'academic' : 'product');
        const categoryLabel = getLocalized(projectCategoryLabels[category], lang) || category;
        let statusBadge;
        if (isThesis) {
            statusBadge = `<span class="status-badge thesis"><i class="fa-solid fa-graduation-cap"></i> Thesis Project</span>`;
        } else if (category !== 'product') {
            statusBadge = `<span class="status-badge category-${category}">${categoryLabel}</span>`;
        } else {
            statusBadge = `<span class="status-badge">Live</span>`;
        }

        const descHtml = descriptionToDisplayHtml(getLocalized(prj.description?.web, lang));
        const site = prj.website || prj.web || '#';
        const github = prj.github || '#';
        const period = (prj.from || prj.to) ? formatPeriod(prj.from, prj.to, lang) : '';
        const subtitleText = prj.subtitle
            ? getLocalized(prj.subtitle, lang)
            : (prj.role ? getLocalized(prj.role, lang) : '');
        const imgSrc = getProjectCardImage(prj);
        const showGithubLink = isValidProjectLink(github);
        const showSiteLink = isValidProjectLink(site);

        html += `<div class="project-card ${isThesis ? 'thesis-project' : ''} animate-fade-scroll" data-index="${index}">
            <div class="project-image">
                <img src="${imgSrc}" alt="${prj.name}">
                <div class="project-overlay">
                    <div class="project-links">
                        ${showGithubLink ? `<a href="${github}" target="_blank" rel="noopener noreferrer" class="project-link github-link" title="View Code">
                            <i class="fa-brands fa-github"></i>
                        </a>` : ''}
                        ${showSiteLink ? `<a href="${site}" target="_blank" rel="noopener noreferrer" class="project-link demo-link" title="Live Demo">
                            <i class="fa-solid fa-external-link"></i>
                        </a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${prj.name}</h3>
                    <div class="project-status">
                        ${statusBadge}
                    </div>
                </div>
                ${subtitleText ? `<p class="project-subtitle">${subtitleText}</p>` : ''}
                ${period || prj.location ? `<div class="project-meta">
                    ${period ? `<span class="project-date">
                        <i class="fa-solid fa-calendar"></i>
                        ${period}
                    </span>` : ''}
                    ${prj.location ? `<span class="project-location">
                        <i class="fa-solid fa-location-dot"></i>
                        ${getLocalized(prj.location, lang)}
                    </span>` : ''}
                </div>` : ''}
                <div class="project-description">
                    ${descHtml}
                </div>
                ${showGithubLink || showSiteLink ? `<div class="project-actions">
                    ${showGithubLink ? `<a href="${github}" target="_blank" rel="noopener noreferrer" class="action-btn primary">
                        <i class="fa-brands fa-github"></i>
                        Source Code
                    </a>` : ''}
                    ${showSiteLink ? `<a href="${site}" target="_blank" rel="noopener noreferrer" class="action-btn secondary">
                        <i class="fa-solid fa-rocket"></i>
                        Live Demo
                    </a>` : ''}
                </div>` : ''}
            </div>
        </div>`;
    });

    projectsDiv.innerHTML = html;

    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, parseInt(entry.target.dataset.index, 10) * 200);
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach((card) => observer.observe(card));
}

function renderAchievements(achievements) {
    const achievementsDiv = document.querySelector("#achievements .achievements-grid");
    if (!achievementsDiv) return;
    
    let html = "";
    const lang = getCurrentLang();
    
    achievements.forEach((ach, index) => {
        const iconClass = ach.icon || 'trophy';
        const typeClass = ach.type || 'award';
        const desc = descriptionToPlain(getLocalized(ach.description?.web, lang));
        
        html += `<div class="achievement-card animate-fade-scroll" data-index="${index}">
            ${ach.image ? `<div class="achievement-image">
                <img src="./img/${ach.image}" alt="${getLocalized(ach.title, lang)}">
                <div class="achievement-overlay">
                    <div class="achievement-icon ${typeClass}">
                        <i class="fa-solid fa-${iconClass}"></i>
                    </div>
                </div>
            </div>` : ''}
            <div class="achievement-content">
                <h3 class="achievement-title">${getLocalized(ach.title, lang)}</h3>
                <div class="achievement-meta">
                    <span class="achievement-date">
                        <i class="fa-solid fa-calendar"></i>
                        ${formatPeriod(ach.from, ach.to, lang)}
                    </span>
                    <span class="achievement-location">
                        <i class="fa-solid fa-location-dot"></i>
                        ${getLocalized(ach.location, lang)}
                    </span>
                </div>
                <p class="achievement-description">${desc}</p>
            </div>
        </div>`
    });
    
    achievementsDiv.innerHTML = html;
    
    const achievementCards = document.querySelectorAll('.achievement-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, parseInt(entry.target.dataset.index) * 150);
            }
        });
    }, { threshold: 0.2 });
    
    achievementCards.forEach(card => observer.observe(card));
}

function linkSelectionEvent() {
    const sections = document.querySelectorAll("section"); // Asume que tus secciones son <section>
    const navLinks = document.querySelectorAll("header nav a");
    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            } 
        });
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if ((link.getAttribute("href")) === "#"+currentSection) {
                link.classList.add("active");
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            document.getElementById("check-menu").checked = false;
        })
    })
}

// Scroll-to-top button: show when user scrolls down, smooth-scroll to top on click
function initScrollTopButton() {
    const btn = document.getElementById('scroll-top-btn');
    if (!btn) return;

    // Show/hide based on scroll position
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    // initial check
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility);

    // click -> smooth scroll to top
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // keyboard accessibility (Enter/Space)
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
}