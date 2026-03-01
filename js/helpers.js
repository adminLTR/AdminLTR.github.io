function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function formatNameForImg(name) {
    return name.toLowerCase().replace(/ /g, '')
}

// ====================================
// PDF Generation Function
// ====================================

function generatePDF() {
    const langUser = localStorage.getItem("language");
    const lang = langUser ? langUser : 'great-britain';
    
    console.log('Generating PDF in language:', lang);
    
    // Populate CV template with current language data
    populateCVTemplate(lang);
    
    // Get the CV template element
    const element = document.getElementById('cv-template');
    
    if (!element) {
        console.error('CV template element not found');
        return;
    }
    
    // Get the cv-container inside the template
    const container = element.querySelector('.cv-container');
    if (!container) {
        console.error('CV container not found inside template');
        return;
    }
    
    // Make the template visible temporarily
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.style.display = 'block';
    element.style.position = 'fixed';
    element.style.left = '0';
    element.style.top = '0';
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.overflow = 'auto';
    element.style.zIndex = '999999';
    element.style.background = 'rgba(255, 255, 255, 0.95)';
    
    console.log('Template element content length:', element.innerHTML.length);
    console.log('Container content length:', container.innerHTML.length);
    
    // Configure PDF options
    const opt = {
        margin: [10, 10, 10, 10],
        filename: `CV-La_Torre_Romero-${lang}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            logging: true,
            width: container.scrollWidth,
            height: container.scrollHeight
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Wait for DOM to update and fonts to load, then generate PDF
    setTimeout(() => {
        console.log('Starting PDF generation...');
        html2pdf().set(opt).from(container).save().then(() => {
            console.log('PDF generated successfully');
            // Hide the template again after generation
            element.style.display = 'none';
            element.style.position = 'static';
            element.style.zIndex = '0';
            document.body.style.overflow = originalOverflow;
        }).catch(error => {
            console.error('Error generating PDF:', error);
            // Hide the template even if there's an error
            element.style.display = 'none';
            element.style.position = 'static';
            element.style.zIndex = '0';
            document.body.style.overflow = originalOverflow;
        });
    }, 500);
}

function populateCVTemplate(lang) {
    console.log('Populating CV template for language:', lang);
    
    const currentInfo = info[lang];
    
    if (!currentInfo) {
        console.error('Language info not found for:', lang);
        return;
    }
    
    // Populate header
    const careerEl = document.getElementById('cv-career');
    if (careerEl) {
        careerEl.textContent = currentInfo.career;
        console.log('Career set:', currentInfo.career);
    }
    
    // Populate About section
    const aboutTitleEl = document.getElementById('cv-about-title');
    const aboutTextEl = document.getElementById('cv-about-text');
    
    if (aboutTitleEl && aboutTextEl) {
        aboutTitleEl.textContent = currentInfo.links.about.toUpperCase();
        aboutTextEl.textContent = currentInfo.about;
        console.log('About section populated');
    }
    
    // Populate Education section
    document.getElementById('cv-education-title').textContent = 'EDUCATION';
    const educationContent = document.getElementById('cv-education-content');
    educationContent.innerHTML = education.map(edu => {
        if (edu.type === 'degree') {
            return `
                <div class="cv-education-item">
                    <div class="cv-education-header">
                        <div class="cv-education-degree">${edu.degree[lang]}</div>
                        <div class="cv-education-period">${edu.period[lang]}</div>
                    </div>
                    <div class="cv-education-university">${edu.university} (${edu.acronym})</div>
                    <div class="cv-education-faculty">${edu.faculty[lang]}</div>
                </div>
            `;
        } else if (edu.type === 'exchange') {
            return `
                <div class="cv-education-item">
                    <div class="cv-education-header">
                        <div class="cv-education-degree">${edu.program[lang]}</div>
                        <div class="cv-education-period">${edu.period[lang]}</div>
                    </div>
                    <div class="cv-education-university">${edu.university} (${edu.acronym})</div>
                </div>
            `;
        }
    }).join('');
    
    // Populate Experience section
    document.getElementById('cv-experience-title').textContent = currentInfo.links.experience.toUpperCase();
    const experienceContent = document.getElementById('cv-experience-content');
    experienceContent.innerHTML = experience.map(exp => `
        <div class="cv-item">
            <div class="cv-item-header">
                <div class="cv-item-title">${exp['job-title'][lang]}</div>
                <div class="cv-item-date">${exp.date[lang]}</div>
            </div>
            <div class="cv-item-company">${exp.name}</div>
            <div class="cv-item-location"><i class="fa-solid fa-location-dot"></i> ${exp.location[lang]}</div>
            <div class="cv-item-description">${exp.description[lang]}</div>
            ${exp.web !== '#' ? `<div class="cv-item-web"><i class="fa-solid fa-globe"></i> ${exp.web}</div>` : ''}
            <div class="cv-technologies">
                ${exp.technologies.map(tech => `<span class="cv-tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    // Populate Volunteer section
    document.getElementById('cv-volunteer-title').textContent = currentInfo.links.volunteer.toUpperCase();
    const volunteerContent = document.getElementById('cv-volunteer-content');
    volunteerContent.innerHTML = volunteer.map(vol => `
        <div class="cv-item">
            <div class="cv-item-header">
                <div class="cv-item-title">${vol['job-title'][lang]}</div>
                <div class="cv-item-date">${vol.date[lang]}</div>
            </div>
            <div class="cv-item-company">${vol.name}</div>
            <div class="cv-item-location"><i class="fa-solid fa-location-dot"></i> ${vol.location[lang]}</div>
            <div class="cv-item-description">${vol.description[lang]}</div>
            ${vol.web !== '#' ? `<div class="cv-item-web"><i class="fa-solid fa-globe"></i> ${vol.web}</div>` : ''}
            <div class="cv-technologies">
                ${vol.technologies.map(tech => `<span class="cv-tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    // Populate Skills section
    document.getElementById('cv-skills-title').textContent = currentInfo.links.skills.toUpperCase();
    const skillsContent = document.getElementById('cv-skills-content');
    skillsContent.innerHTML = Object.keys(areas).map(area => `
        <div class="cv-skills-area">
            <div class="cv-skills-area-title">${area}</div>
            <div class="cv-skills-list">
                ${areas[area].map(skill => `<span class="cv-skill-item">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    // Populate Projects section
    document.getElementById('cv-projects-title').textContent = currentInfo.links.projects.toUpperCase();
    const projectsContent = document.getElementById('cv-projects-content');
    projectsContent.innerHTML = projects.map(proj => `
        <div class="cv-project">
            <div class="cv-project-header">
                <div class="cv-project-name">${proj.name}</div>
                ${proj.date ? `<div class="cv-project-date">${proj.date[lang]}</div>` : ''}
            </div>
            ${(proj.web && proj.web !== '#') || (proj.github && proj.github !== '#') ? `
                <div class="cv-project-links">
                    ${proj.web && proj.web !== '#' ? `<a href="${proj.web}"><i class="fa-solid fa-globe"></i> Website</a>` : ''}
                    ${proj.github && proj.github !== '#' ? `<a href="${proj.github}"><i class="fa-brands fa-github"></i> GitHub</a>` : ''}
                </div>
            ` : ''}
            <div class="cv-project-description">${proj.description[lang]}</div>
            ${proj.technologies ? `
                <div class="cv-technologies">
                    ${proj.technologies.map(tech => `<span class="cv-tech-tag">${tech}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    // Populate Achievements section
    document.getElementById('cv-achievements-title').textContent = currentInfo.links.achievements.toUpperCase();
    const achievementsContent = document.getElementById('cv-achievements-content');
    achievementsContent.innerHTML = achievements.map(ach => `
        <div class="cv-achievement">
            <div class="cv-achievement-header">
                <div class="cv-achievement-title">
                    <i class="cv-achievement-icon fa-solid fa-${ach.icon}"></i>
                    ${ach.title[lang]}
                </div>
                <div class="cv-achievement-date">${ach.date[lang]}</div>
            </div>
            <div class="cv-achievement-location"><i class="fa-solid fa-location-dot"></i> ${ach.location[lang]}</div>
            <div class="cv-achievement-description">${ach.description[lang]}</div>
        </div>
    `).join('');
    
    console.log('CV template populated successfully');
    console.log('Experience items:', experience.length);
    console.log('Projects items:', projects.length);
    console.log('Achievements items:', achievements.length);
}
