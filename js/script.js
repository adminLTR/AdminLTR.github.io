document.addEventListener("load", function () {
    document.getElementById("age").textContent = getAge("2003-05-28");

    renderAreas(areas);
    renderLanguages(languages);

}, true);

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