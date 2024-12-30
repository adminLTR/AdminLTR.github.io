window.addEventListener("load", function () {
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

    document.getElementById("age").textContent = getAge("2003-05-28");

    renderAreas(areas);
    renderLanguages(languages);
    renderSkills(technologies);
    renderExperience(experience);
    renderProjects(projects);
});

function renderAreas(areas) {
    const areasDiv = document.querySelector(".developer-areas");
    let html = "";
    areas.forEach(area => {
        html += `<p>${area}</p>`;        
    });
    areasDiv.innerHTML = html
}

function renderLanguages(languages) {
    const languagesDiv = document.querySelector(".languages-div");
    let html = "";
    languages.forEach(lang => {
        html += `<img width="48" height="48" src="https://img.icons8.com/color/48/${lang}-circular.png" alt="${lang}-circular"/>`;        
    });
    languagesDiv.innerHTML = html
}

function renderSkills(technologies) {
    const skillsDiv = document.querySelector("#skills .row");
    let html = ""
    technologies.forEach(tech => {
        html += `<img class="animate-fade-scroll" src="./img/technologies/${tech.toLowerCase()}.png" alt="${tech}"/>`;
    });
    skillsDiv.innerHTML = html;
}

function renderExperience(experience) {
    const experienceDiv = document.querySelector("#experience .row");
    let html = "";
    experience.forEach(exp => {
        html += `<div class="card animate-fade-scroll">
            <figure class="card-img">
                <img src="./img/experience/${exp.name.toLowerCase()}.png" alt="${exp.name}">
            </figure>
            <div class="card-body">
                <h4 class="card-title">
                    ${exp.name}
                    <a href="${exp.web}" target="_blank">
                        <img width="25" src="https://img.icons8.com/ios/50/domain--v1.png" alt="domain--v1"/>
                    </a>
                </h4>
                <div class="card-info">
                    <p>${exp.description}</p>
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
    projects.forEach(prj => {
        html += `<div class="card animate-fade-scroll">
            <figure class="card-img">
                <img src="./img/projects/${prj.name.toLowerCase()}.png" alt="${prj.name}">
            </figure>
            <div class="card-body">
                <h4 class="card-title">
                    ${prj.name}
                    <div>
                        <a href="${prj.github}"><img width="25" src="https://img.icons8.com/ios-glyphs/30/github.png" alt="github"/></a>
                        <a href="${prj.web}"><img width="25" src="https://img.icons8.com/ios/50/domain--v1.png" alt="domain--v1"/></a>
                    </div>
                </h4>
                <div class="card-info">
                    <p>${prj.description}</p>
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
    const navLinks = document.querySelectorAll("header nav ul li a");
    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            } 
        });
        console.log(currentSection)
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if ((link.getAttribute("href")) === "#"+currentSection) {
                link.classList.add("active");
            }
        });
    });
}