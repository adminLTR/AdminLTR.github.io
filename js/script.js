window.addEventListener("load", function () {
    linkSelectionEvent();
    initScrollEffects();

    document.getElementById("age").textContent = getAge("2003-05-28");

    renderLinks();
    renderInfo();

    renderAreas(areas);
    renderLanguages(languages);
    renderSkills(areas);
    renderExperience(experience);
    renderProjects(projects);

    // Initialize scroll-to-top button behavior
    initScrollTopButton();

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

                // UPDATE LINKS
                renderLinks();
                renderInfo();

                renderExperience(experience);
                renderProjects(projects);
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
    const langUser = localStorage.getItem("language");
    const lang = langUser ? langUser : 'great-britain'
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
    const langUser = localStorage.getItem("language");
    const lang = langUser ? langUser : 'great-britain';

    document.getElementById("career-info").textContent = info[lang].career;
    document.getElementById("download-info").textContent = info[lang].download;
    document.getElementById("about-info").textContent = info[lang].about;

    document.getElementById("download-info").setAttribute("href", "./cv/"+lang+".pdf");

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
    const skillsDiv = document.querySelector("#skills .skills-container");
    const navDiv = document.querySelector("#skills .nav-buttons");
    
    // Create navigation buttons
    let navHtml = "";
    const areaKeys = Object.keys(areas);
    areaKeys.forEach((area, index) => {
        navHtml += `<button class="nav-btn ${index === 0 ? 'active' : ''}" data-area="${area}">
            <i class="fa-solid fa-${getAreaIcon(area)}"></i>
            <span>${area}</span>
        </button>`;
    });
    navDiv.innerHTML = navHtml;
    
    // Create skills content
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
                    return `<div class="skill-item" style="animation-delay: ${techIndex * 0.1}s">
                        <div class="skill-icon">
                            <img src="./img/technologies/${tech.toLowerCase()}.png" alt="${tech}"/>
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
    
    // Update stats
    const totalSkills = Object.values(areas).flat().length;
    document.getElementById('total-skills').textContent = totalSkills;
    document.getElementById('skill-areas').textContent = areaKeys.length;
    
    // Add navigation functionality
    const navButtons = document.querySelectorAll('.nav-btn');
    const skillAreas = document.querySelectorAll('.skill-area');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetArea = btn.dataset.area;
            
            // Remove active class from all buttons and areas
            navButtons.forEach(b => b.classList.remove('active'));
            skillAreas.forEach(area => area.classList.remove('active'));
            
            // Add active class to clicked button and corresponding area
            btn.classList.add('active');
            document.querySelector(`.skill-area[data-area="${targetArea}"]`).classList.add('active');
        });
    });
    
    // Animate skill bars when section comes into view
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

function getAreaIcon(area) {
    const icons = {
        'Frontend': 'palette',
        'Backend': 'server',
        'Data Science': 'chart-line',
        'IoT': 'microchip'
    };
    return icons[area] || 'code';
}

function getAreaDescription(area) {
    const descriptions = {
        'Frontend': 'Creating beautiful and responsive user interfaces',
        'Backend': 'Building robust server-side applications and APIs',
        'Data Science': 'Analyzing data and creating machine learning models',
        'IoT': 'Developing connected devices and embedded systems'
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

function renderExperience(experience) {
    const experienceDiv = document.querySelector("#experience .experience-timeline");
    let html = "";
    const langUser = localStorage.getItem("language");
    const lang = langUser ? langUser : 'great-britain'
    experience.forEach((exp, index) => {
        const isEven = index % 2 === 0;
        html += `<div class="timeline-item ${isEven ? 'timeline-left' : 'timeline-right'}" data-index="${index}">
            <div class="timeline-marker">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${exp.date}</div>
            </div>
            <div class="timeline-content">
                <div class="experience-card">
                    <div class="card-header">
                        <div class="company-info">
                            <div class="company-logo">
                                <img src="./img/experience/${formatNameForImg(exp.name)}.png" alt="${exp.name}">
                            </div>
                            <div class="company-details">
                                <h3 class="company-name">${exp.name}</h3>
                                <h4 class="job-title">${exp['job-title'][lang]}</h4>
                                <a href="${exp.web}" target="_blank" class="company-link">
                                    <i class="fa-solid fa-external-link"></i>
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="job-description">
                            <h5>Key Responsibilities:</h5>
                            <ul>
                                ${exp.description[lang].map(d => `<li>${d}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="technologies-used">
                            <h5>Technologies:</h5>
                            <div class="tech-stack">
                                ${exp.technologies.map(tech => `
                                    <div class="tech-item" title="${tech}">
                                        <img src="./img/technologies/${tech.toLowerCase()}.png" alt="${tech}"/>
                                        <span>${tech}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    })
    experienceDiv.innerHTML = html;
    
    // Add intersection observer for timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

function renderProjects(projects) {
    const projectsDiv = document.querySelector("#projects .projects-grid");
    let html = "";
    const langUser = localStorage.getItem("language");
    const lang = langUser ? langUser : 'great-britain'
    projects.forEach((prj, index) => {
        html += `<div class="project-card animate-fade-scroll" data-index="${index}">
            <div class="project-image">
                <img src="./img/projects/${formatNameForImg(prj.name)}.png" alt="${prj.name}">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${prj.github}" target="_blank" class="project-link github-link" title="View Code">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="${prj.web}" target="_blank" class="project-link demo-link" title="Live Demo">
                            <i class="fa-solid fa-external-link"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${prj.name}</h3>
                    <div class="project-status">
                        <span class="status-badge">Live</span>
                    </div>
                </div>
                <div class="project-description">
                    <ul>
                        ${prj.description[lang].map(d => `<li>${d}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-tech">
                    <div class="tech-header">
                        <span>Built with:</span>
                    </div>
                    <div class="tech-list">
                        ${prj.technologies.map(tech => `
                            <div class="tech-badge" title="${tech}">
                                <img src="./img/technologies/${tech.toLowerCase()}.png" alt="${tech}"/>
                                <span>${tech}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="project-actions">
                    <a href="${prj.github}" target="_blank" class="action-btn primary">
                        <i class="fa-brands fa-github"></i>
                        Source Code
                    </a>
                    <a href="${prj.web}" target="_blank" class="action-btn secondary">
                        <i class="fa-solid fa-rocket"></i>
                        Live Demo
                    </a>
                </div>
            </div>
        </div>`
    })
    projectsDiv.innerHTML = html;
    
    // Add intersection observer for project animations
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