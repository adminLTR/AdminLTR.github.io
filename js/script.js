window.addEventListener("load", function () {
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
        html += `<img src="./img/technologies/${tech.toLowerCase()}.png" alt="${tech}"/>`;
    });
    skillsDiv.innerHTML = html;
}

function renderExperience(experience) {
    const experienceDiv = document.querySelector("#experience .row");
    let html = "";
    experience.forEach(exp => {
        html += `<div class="card">
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
                    }).toString().replace(/,/g, '')}
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
        html += `<div class="card">
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
                    }).toString().replace(/,/g, '')}
                </div>
            </div>
        </div>`
    })
    projectsDiv.innerHTML = html;
}