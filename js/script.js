window.addEventListener("load", function () {
    linkSelectionEvent();
    initScrollEffects();

    document.getElementById("age").textContent = getAge("2003-05-28");

    renderLinks();
    renderInfo();

    renderAreas(areas);
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
    document.getElementById("about-info").textContent = presentation.web[lang];

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

function renderAreas(areas) {
    const areasDiv = document.querySelector(".developer-areas");
    const lang = getCurrentLang();
    let html = "";
    Object.keys(areas).forEach(area => {
        const label = skillAreaLabels[area]
            ? getLocalized(skillAreaLabels[area], lang)
            : area;
        html += `<p>${label}</p>`;
    });
    areasDiv.innerHTML = html
}

function renderLanguages(languagesList) {
    const languagesDiv = document.querySelector('#about .languages-div');
    if (!languagesDiv) return;

    const langUser = getCurrentLang();
    let html = '';
    languagesList.forEach((lang) => {
        const isActive = lang === langUser;
        html += `<img data-lang="${lang}" class="${isActive ? 'active' : ''}" width="48" height="48" src="https://img.icons8.com/color/48/${lang}-circular.png" alt="${languageNames[lang] || lang}" title="${languageNames[lang] || lang}"/>`;
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
    document.querySelectorAll('#about .languages-div img[data-lang]').forEach((img) => {
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
    renderAreas(areas);
    renderLanguages(languages);
    renderHeaderLanguageSelect(languages);
    renderSkills(areas);
    renderEducation(education);
    renderProjects(projects);
    renderAchievements(achievements);
}

function switchLanguage(lang, sourceImg) {
    if (!lang || lang === getCurrentLang()) return;

    setActiveLanguageFlags(lang);

    const check = document.getElementById('check-menu');
    if (check) check.checked = false;

    const applyLanguage = () => {
        localStorage.setItem('language', lang);
        refreshLocalizedContent();
    };

    if (!sourceImg) {
        applyLanguage();
        return;
    }

    const imgSrc = sourceImg.getAttribute('src');
    const imgNode = document.createElement('img');
    imgNode.src = imgSrc;
    imgNode.classList.add('flag-fly');
    document.body.appendChild(imgNode);

    imgNode.addEventListener('animationend', () => {
        imgNode.remove();
        applyLanguage();
    });
}

function bindLanguageSelectors() {
    const aboutLanguages = document.querySelector('#about .languages-div');
    if (aboutLanguages && !aboutLanguages.dataset.bound) {
        aboutLanguages.dataset.bound = 'true';
        aboutLanguages.addEventListener('click', (event) => {
            const img = event.target.closest('img[data-lang]');
            if (!img) return;
            switchLanguage(img.dataset.lang, img);
        });
    }

    const select = document.getElementById('header-lang-select');
    if (select && !select.dataset.bound) {
        select.dataset.bound = 'true';
        select.addEventListener('change', () => {
            switchLanguage(select.value, null);
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
        const label = skillAreaLabels[area]
            ? getLocalized(skillAreaLabels[area], lang)
            : area;
        html += `<div class="skill-area ${index === 0 ? 'active' : ''}" data-area="${area}">
            <div class="area-header">
                <div class="area-icon">
                    <i class="fa-solid fa-${getAreaIcon(area)}"></i>
                </div>
                <div class="area-info">
                    <h3>${label}</h3>
                    <p>${getAreaDescription(area, lang)}</p>
                </div>
            </div>
            <div class="skills-grid">
                ${areas[area].map((tech, techIndex) => {
                    const skillLevel = getSkillLevel(tech);
                    const iconSrc = getTechIconSrc(tech);
                    return `<div class="skill-item" style="animation-delay: ${techIndex * 0.1}s">
                        <div class="skill-icon">
                            <img src="${iconSrc}" alt="${tech}" onerror="this.onerror=null;this.src='./img/technologies/javascript.png';"/>
                        </div>
                        <div class="skill-info">
                            <h4>${tech}</h4>
                            <div class="skill-level">
                                <div class="level-bar">
                                    <div class="level-progress" style="--progress-width: ${skillLevel}%"></div>
                                </div>
                                <span class="level-text">${getSkillLevelText(tech)}</span>
                            </div>
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
                        const progressBar = item.querySelector('.level-progress');
                        progressBar.style.animationDelay = '0.3s';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    skillAreas.forEach(area => observer.observe(area));
}

function getTechIconSrc(tech) {
    const raw = String(tech || '').toLowerCase().trim();
    const aliases = {
        reactjs: 'react',
        typescript: 'typescript',
        html5: 'html',
        css3: 'css',
        'tailwind css': 'tailwindcss',
        'node.js': 'nodejs',
        expressjs: 'expressjs',
        'tensorflow/keras': 'tensorflow',
        "llm's": 'llms',
        llms: 'llms',
        'scikit-learn': 'scikitlearn',
        'api rest': 'apirest',
        'web scraping': 'webscraping',
        microservicios: 'microservicios',
        sqlite: 'sqlite',
    };
    const key = aliases[raw] || raw.replace(/[^a-z0-9]+/g, '');
    const svgIcons = new Set(['flutter', 'fastapi', 'typescript']);
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
    };
    return icons[area] || 'code';
}

function getAreaDescription(area, lang) {
    const descriptions = {
        Frontend: {
            'great-britain': 'Interfaces and client-side development',
            spain: 'Interfaces y desarrollo del lado del cliente',
            italy: 'Interfacce e sviluppo lato client',
            brazil: 'Interfaces e desenvolvimento client-side',
            france: 'Interfaces et développement côté client',
        },
        Backend: {
            'great-britain': 'Server logic, APIs and services',
            spain: 'Lógica de servidor, APIs y servicios',
            italy: 'Logica server, API e servizi',
            brazil: 'Lógica de servidor, APIs e serviços',
            france: 'Logique serveur, API et services',
        },
        Databases: {
            'great-britain': 'Relational and non-relational data storage',
            spain: 'Almacenamiento de datos relacional y no relacional',
            italy: 'Archiviazione dati relazionale e non relazionale',
            brazil: 'Armazenamento de dados relacional e não relacional',
            france: 'Stockage de données relationnel et non relationnel',
        },
        Architecture: {
            'great-britain': 'System design patterns and integrations',
            spain: 'Patrones de diseño de sistemas e integraciones',
            italy: 'Pattern di progettazione e integrazioni',
            brazil: 'Padrões de design de sistemas e integrações',
            france: 'Modèles d’architecture et intégrations',
        },
        Tools: {
            'great-britain': 'Development, collaboration and delivery tools',
            spain: 'Herramientas de desarrollo, colaboración y entrega',
            italy: 'Strumenti di sviluppo, collaborazione e delivery',
            brazil: 'Ferramentas de desenvolvimento, colaboração e entrega',
            france: 'Outils de développement, collaboration et livraison',
        },
        AI: {
            'great-britain': 'Machine learning and generative AI',
            spain: 'Machine learning e inteligencia artificial generativa',
            italy: 'Machine learning e intelligenza artificiale generativa',
            brazil: 'Machine learning e inteligência artificial generativa',
            france: 'Machine learning et intelligence artificielle générative',
        },
    };
    return getLocalized(descriptions[area] || {}, lang) || 'Professional development skills';
}

function getSkillLevel(tech) {
    // Simulate skill levels - you can customize these based on actual experience
    const levels = {
        'HTML': 95, 'CSS': 90, 'JavaScript': 85, 'React': 80, 'JQuery': 75,
        'Figma': 70, 'Bootstrap': 85, 'TailwindCSS': 80, 'SASS': 75,
        'PHP': 80, 'Python': 85, 'Laravel': 75, 'Django': 80, 'MySQL': 80,
        'PostgreSQL': 75, 'Flask': 70, 'ExpressJS': 75,
        'Keras': 70, 'Excel': 85, 'Tensorflow': 65, 'VBA': 60,
        'Arduino': 80, 'ESP32': 75, 'C++': 70, 'Sensors': 75
    };
    return levels[tech] || 60;
}

function getSkillLevelText(tech) {
    const level = getSkillLevel(tech);
    if (level >= 85) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 55) return 'Intermediate';
    return 'Beginner';
}

function renderEducation(education) {
    const educationDiv = document.querySelector(".university-section");
    if (!educationDiv) return;
    
    const lang = getCurrentLang();
    
    let html = "";
    education.forEach((edu, index) => {
        const period = formatPeriod(edu.from, edu.to, lang);
        const highlight = edu.highlight ? getLocalized(edu.highlight, lang) : '';
        const cardClass = edu.type === 'exchange' ? 'university-card exchange-card' : 'university-card';

        html += `<div class="${cardClass} animate-fade-right" style="animation-delay: ${index * 0.2}s">
            <div class="university-info">
                <div class="university-info-content">
                    <img src="./img/${edu.logo}.png" class="university-logo" alt="${edu.acronym}">
                    <div>
                        <h3>${edu.university} (${edu.acronym})</h3>
                        <p>${getLocalized(edu.career, lang)}</p>
                        <p class="location"><i class="fa-solid fa-location-dot"></i> ${getLocalized(edu.location, lang)}</p>
                        ${highlight ? `<p class="edu-highlight">${highlight}</p>` : ''}
                    </div>
                </div>
                <div class="university-year">${period}</div>
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