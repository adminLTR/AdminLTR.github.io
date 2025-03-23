window.addEventListener("load", function () {
    linkSelectionEvent();

    document.getElementById("age").textContent = getAge("2003-05-28");

    renderLinks();
    renderInfo();

    renderAreas(areas);
    renderLanguages(languages);
    renderSkills(areas);
    renderExperience(experience);
    renderProjects(projects);

    // CLICK LANGUAGES
    this.document.querySelectorAll("#about .languages-div img").forEach(img => {
        img.addEventListener("click", function () {
            document.querySelectorAll("#about .languages-div img").forEach(i => {i.classList.remove("active")});
            img.classList.add("active");
            const lang = img.dataset.lang;
            localStorage.setItem("language", lang);

            // UPDATE LINKS
            renderLinks();
            renderInfo();

            renderExperience(experience);
            renderProjects(projects);
        })
    })
});

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
    let html = ""
    Object.keys(areas).forEach(area => {
        html += `<div class="area-skill">
            <div class="area-skill-content">
                <h3>${area}</h3>
                <div class="area-skills-row animate-fade-size">
                    ${areas[area].map(tech => {
                        return `
                            <div class="tech-container animate-fade-scroll">
                                <img src="./img/technologies/${tech.toLowerCase()}.png" class="w-100" alt="HTML">
                                <h4 class="text-main fw-bold text-uppercase">${tech}</h4>
                            </div>
                        `;
                    }).join('')}
                </div>
                <img class="tech-bg" src="./img/technologies/${area.toLowerCase().replace(' ', '-')}.png" alt="${area}">
            </div>
        </div>`;
        // html += `<img class="animate-fade-scroll" src="./img/technologies/${tech.toLowerCase()}.png" alt="${tech}"/>`;
    });
    skillsDiv.innerHTML = html;
}

function renderExperience(experience) {
    const experienceDiv = document.querySelector("#experience .row");
    let html = "";
    const langUser = localStorage.getItem("language");
    const lang = langUser ? langUser : 'great-britain'
    experience.forEach(exp => {
        console.log(exp)
        html += `<div class="card animate-fade-scroll">
            <figure class="card-img">
                <img src="./img/experience/${formatNameForImg(exp.name)}.png" alt="${exp.name}">
            </figure>
            <div class="card-body">
                <div class="card-header">
                    <h4 class="card-title">
                        ${exp.name}
                        <a href="${exp.web}" target="_blank">
                            <img width="25" src="https://img.icons8.com/ios/50/domain--v1.png" alt="domain--v1"/>
                        </a>
                    </h4>
                    <h5 class="card-sub-title">
                        ${exp['job-title'][lang]}
                    </h5>
                    <h5 class="text-dark" style="width: 100%; font-size: 12px;">${exp.date}</h5>
                </div>
                <div class="card-info">
                    <ul>
                        ${exp.description[lang].map(d => {
                            return `<li>${d}</li>`
                        }).join('')}
                    </ul>
                </div>
                <div class="card-technologies">
                    ${exp.technologies.map(tech => {
                        return `<img width="25" src="./img/technologies/${tech.toLowerCase()}.png"/>`
                    }).join('')}
                </div>
            </div>
        </div>`
    })
    experienceDiv.innerHTML = html;
}

function renderProjects(projects) {
    const projectsDiv = document.querySelector("#projects .row");
    let html = "";
    const langUser = localStorage.getItem("language");
    const lang = langUser ? langUser : 'great-britain'
    projects.forEach(prj => {
        html += `<div class="card animate-fade-scroll">
            <figure class="card-img">
                <img src="./img/projects/${formatNameForImg(prj.name)}.png" alt="${prj.name}">
            </figure>
            <div class="card-body">
                <h4 class="card-title">
                    ${prj.name}
                    <div>
                        <a href="${prj.github}"><img width="25" src="https://img.icons8.com/ios-glyphs/30/github.png" alt="github"/></a>
                        <a href="${prj.web}"><img width="25" src="https://img.icons8.com/ios/50/domain--v1.png" alt="domain--v1"/></a>
                    </div>
                </h4>
                <h5 class="card-sub-title">
                        ${prj.title[lang]}
                    </h5>
                <div class="card-info">
                    <p>${prj.description[lang]}</p>
                </div>
                <div class="card-technologies">
                    ${prj.technologies.map(tech => {
                        return `<img width="25" src="./img/technologies/${tech.toLowerCase()}.png"/>`
                    }).join('')}
                </div>
            </div>
        </div>`
    })
    projectsDiv.innerHTML = html;
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