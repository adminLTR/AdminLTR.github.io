window.addEventListener("load", function () {
    linkSelectionEvent();
    initScrollEffects();

    document.getElementById("age").textContent = getAge("2003-05-28");

    renderLinks();
    renderInfo();

    renderAreas(areas);
    renderLanguages(languages);
    renderSkills(areas);
    renderEducation(education);
    renderExperience(experience);
    renderVolunteer(volunteer);
    renderProjects(projects);
    renderAchievements(achievements);

    // Initialize scroll-to-top button behavior
    initScrollTopButton();
    initCVModal();

    // Close mobile/collapsed nav after clicking a link
    document.querySelectorAll('#menu a').forEach((link) => {
        link.addEventListener('click', () => {
            const check = document.getElementById('check-menu');
            if (check) check.checked = false;
        });
    });

    // CLICK LANGUAGES
    this.document.querySelectorAll("#about .languages-div img").forEach(img => {
        img.addEventListener("click", function () {
            document.querySelectorAll("#about .languages-div img").forEach(i => {i.classList.remove("active")});
            img.classList.add("active");
            const lang = img.dataset.lang;
            
            const imgSrc = img.getAttribute("src");
            const imgNode = document.createElement("img");
            imgNode.src = imgSrc;
            imgNode.classList.add('flag-fly');

            document.body.appendChild(imgNode);

            imgNode.addEventListener('animationend', () => {
                imgNode.remove();
                
                localStorage.setItem("language", lang);

                renderLinks();
                renderInfo();
                renderSkills(areas);

                renderEducation(education);
                renderExperience(experience);
                renderVolunteer(volunteer);
                renderProjects(projects);
                renderAchievements(achievements);
            });

            
        })
    })
    
    // Add smooth scroll for CTA button
    document.querySelector('.view-work-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#projects').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Open CV area selection modal
    document.getElementById('download-info')?.addEventListener('click', function(e) {
        e.preventDefault();
        openCVModal();
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
    const downloadText = document.getElementById("download-info-text");
    if (downloadText) {
        downloadText.textContent = info[lang].download;
    } else {
        document.getElementById("download-info").textContent = info[lang].download;
    }
    document.getElementById("about-info").textContent = presentation.web[lang];

    const currentLangName = document.getElementById("current-lang-name");
    if (currentLangName) {
        currentLangName.textContent = languageNames[lang] || lang;
    }
}

function renderAreas(areas) {
    const areasDiv = document.querySelector(".developer-areas");
    let html = "";
    Object.keys(areas).forEach(area => {
        html += `<p>${area}</p>`;        
    });
    areasDiv.innerHTML = html
}

function renderLanguages(languages) {
    const languagesDiv = document.querySelector(".languages-div");
    const langUser = localStorage.getItem('language');
    let html = "";
    languages.forEach(lang => {
        html += `<img data-lang="${lang}" class="${lang===langUser || (!langUser && lang==="great-britain") ?'active' : ''}" width="48" height="48" src="https://img.icons8.com/color/48/${lang}-circular.png" alt="${lang}-circular"/>`;        
    });
    languagesDiv.innerHTML = html
}

function renderSkills(areas) {
    const lang = getCurrentLang();
    const skillsDiv = document.querySelector("#skills .skills-container");
    const navDiv = document.querySelector("#skills .nav-buttons");

    let navHtml = "";
    const areaKeys = Object.keys(areas);
    areaKeys.forEach((area, index) => {
        navHtml += `<button class="nav-btn ${index === 0 ? 'active' : ''}" data-area="${area}">
            <i class="fa-solid fa-${getAreaIcon(area)}"></i>
            <span>${area}</span>
        </button>`;
    });
    navDiv.innerHTML = navHtml;
    
    let html = "";
    areaKeys.forEach((area, index) => {
        html += `<div class="skill-area ${index === 0 ? 'active' : ''}" data-area="${area}">
            <div class="area-header">
                <div class="area-icon">
                    <i class="fa-solid fa-${getAreaIcon(area)}"></i>
                </div>
                <div class="area-info">
                    <h3>${area}</h3>
                    <p>${getAreaDescription(area)}</p>
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
    const key = String(tech || '').toLowerCase().trim();
    const svgIcons = new Set(['flutter', 'fastapi']);
    const ext = svgIcons.has(key) ? 'svg' : 'png';
    return `./img/technologies/${key}.${ext}`;
}

function getAreaIcon(area) {
    const icons = {
        'Frontend': 'palette',
        'Backend': 'server',
        'Data Science': 'chart-line',
        'Fullstack': 'layer-group'
    };
    return icons[area] || 'code';
}

function getAreaDescription(area) {
    const descriptions = {
        'Frontend': 'Creating beautiful and responsive user interfaces',
        'Backend': 'Building robust server-side applications and APIs',
        'Data Science': 'Analyzing data and creating machine learning models',
        'Fullstack': 'Building complete web applications from frontend to backend'
    };
    return descriptions[area] || 'Professional development skills';
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
        const desc = edu.description?.web ? getLocalized(edu.description.web, lang) : '';

        if (edu.type === "degree") {
            html += `<div class="university-card animate-fade-right" style="animation-delay: ${index * 0.2}s">
                <div class="university-info">
                    <div class="university-info-content">
                        <img src="./img/${edu.logo}.png" class="university-logo" alt="${edu.acronym}">
                        <div>
                            <h3>${edu.university} (${edu.acronym})</h3>
                            <p>${edu.faculty ? getLocalized(edu.faculty, lang) : ''}</p>
                            <p>${getLocalized(edu.career, lang)}</p>
                            <p class="location"><i class="fa-solid fa-location-dot"></i> ${getLocalized(edu.location, lang)}</p>
                        </div>
                    </div>
                    <div class="university-year">${period}</div>
                    ${desc ? `<p class="edu-description">${desc}</p>` : ''}
                </div>
            </div>`;
        } else if (edu.type === "exchange") {
            html += `<div class="university-card exchange-card animate-fade-right" style="animation-delay: ${index * 0.2}s">
                <div class="university-info">
                    <div class="university-info-content">
                        <img src="./img/${edu.logo}.png" class="university-logo" alt="${edu.acronym}">
                        <div>
                            <h3>${edu.university} (${edu.acronym})</h3>
                            <p>${edu.faculty ? getLocalized(edu.faculty, lang) : ''}</p>
                            <p>${getLocalized(edu.career, lang)}</p>
                            <p class="location"><i class="fa-solid fa-location-dot"></i> ${getLocalized(edu.location, lang)}</p>
                        </div>
                    </div>
                    <div class="university-year">${period}</div>
                    ${desc ? `<p class="edu-description">${desc}</p>` : ''}
                </div>
            </div>`;
        }
    });
    
    educationDiv.innerHTML = html;
}

function renderExperience(experience) {
    const experienceDiv = document.querySelector("#experience .experience-timeline");
    if (!experienceDiv) return;
    
    let html = "";
    const lang = getCurrentLang();
    
    experience.forEach((exp, index) => {
        const isEven = index % 2 === 0;
        const date = formatPeriod(exp.from, exp.to, lang);
        const desc = descriptionToPlain(getLocalized(exp.description?.web, lang));
        const site = exp.website || exp.web || '#';
        
        html += `<div class="timeline-item ${isEven ? 'timeline-left' : 'timeline-right'}" data-index="${index}">
            <div class="timeline-marker">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${date}</div>
            </div>
            ${exp.image ? `<div class="timeline-image">
                <img src="./img/${exp.image}" alt="${exp.company}">
            </div>` : ''}
            <div class="timeline-content">
                <div class="experience-card">
                    <div class="card-header">
                        <div class="company-info">
                            <div class="company-logo">
                                <img src="./img/experience/${formatNameForImg(exp.company)}.png" alt="${exp.company}">
                            </div>
                            <div class="company-details">
                                <h3 class="company-name">${exp.company}</h3>
                                <h4 class="job-title">${getLocalized(exp.position, lang)}</h4>
                                ${exp.location ? `<p class="location">
                                    <i class="fa-solid fa-location-dot"></i>
                                    ${getLocalized(exp.location, lang)}
                                </p>` : ''}
                                <a href="${site}" target="_blank" class="company-link">
                                    <i class="fa-solid fa-external-link"></i>
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="job-description">
                            <h5>${info[lang].overview}</h5>
                            <p>${desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    });
    
    experienceDiv.innerHTML = html;
    
    const timelineItems = document.querySelectorAll('#experience .timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

function renderVolunteer(volunteer) {
    const volunteerDiv = document.querySelector("#volunteer .volunteer-timeline");
    if (!volunteerDiv) return;
    
    let html = "";
    const lang = getCurrentLang();
    
    volunteer.forEach((vol, index) => {
        const isEven = index % 2 === 0;
        const org = vol.organization || vol.name || '';
        const desc = descriptionToPlain(getLocalized(vol.description?.web, lang));
        const site = vol.website || vol.web || '#';

        html += `<div class="timeline-item ${isEven ? 'timeline-left' : 'timeline-right'}" data-index="${index}">
            <div class="timeline-marker">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${formatPeriod(vol.from, vol.to, lang)}</div>
            </div>
            ${vol.image ? `<div class="timeline-image">
                <img src="./img/${vol.image}" alt="${org}">
            </div>` : ''}
            <div class="timeline-content">
                <div class="experience-card volunteer-card">
                    <div class="card-header">
                        <div class="company-info">
                            <div class="company-logo">
                                <img src="./img/experience/${formatNameForImg(org)}.png" alt="${org}">
                            </div>
                            <div class="company-details">
                                <h3 class="company-name">${org}</h3>
                                <h4 class="job-title">
                                    ${getLocalized(vol.title, lang)}
                                </h4>
                                <p class="location">
                                    <i class="fa-solid fa-location-dot"></i>
                                    ${getLocalized(vol.location, lang)}
                                </p>
                                <a href="${site}" target="_blank" class="company-link">
                                    <i class="fa-solid fa-external-link"></i>
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="job-description">
                            <h5>${info[lang].overview}</h5>
                            <p>${desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    });
    
    volunteerDiv.innerHTML = html;
    
    const timelineItems = document.querySelectorAll('#volunteer .timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
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

function renderProjects(projects) {
    const projectsDiv = document.querySelector("#projects .projects-grid");
    if (!projectsDiv) return;
    
    let html = "";
    const lang = getCurrentLang();
    
    projects.forEach((prj, index) => {
        const isThesis = prj.type === 'thesis';
        const statusBadge = isThesis ? 
            `<span class="status-badge thesis"><i class="fa-solid fa-graduation-cap"></i> Thesis Project</span>` :
            `<span class="status-badge">Live</span>`;
        const desc = descriptionToPlain(getLocalized(prj.description?.web, lang));
        const site = prj.website || prj.web || '#';
        const period = (prj.from || prj.to) ? formatPeriod(prj.from, prj.to, lang) : '';
            
        html += `<div class="project-card ${isThesis ? 'thesis-project' : ''} animate-fade-scroll" data-index="${index}">
            <div class="project-image">
                <img src="./img/projects/${formatNameForImg(prj.name)}.png" alt="${prj.name}">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${prj.github}" target="_blank" class="project-link github-link" title="View Code">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="${site}" target="_blank" class="project-link demo-link" title="Live Demo">
                            <i class="fa-solid fa-external-link"></i>
                        </a>
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
                ${prj.subtitle ? `<p class="project-subtitle">${getLocalized(prj.subtitle, lang)}</p>` : ''}
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
                    <p>${desc}</p>
                </div>
                <div class="project-actions">
                    <a href="${prj.github}" target="_blank" class="action-btn primary">
                        <i class="fa-brands fa-github"></i>
                        Source Code
                    </a>
                    <a href="${site}" target="_blank" class="action-btn secondary">
                        <i class="fa-solid fa-rocket"></i>
                        Live Demo
                    </a>
                </div>
            </div>
        </div>`
    });
    
    projectsDiv.innerHTML = html;
    
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, parseInt(entry.target.dataset.index) * 200);
            }
        });
    }, { threshold: 0.2 });
    
    projectCards.forEach(card => observer.observe(card));
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