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
    return name.toLowerCase().replace(/ /g, '');
}

const languageNames = {
    'great-britain': 'English',
    spain: 'Español',
    italy: 'Italiano',
    brazil: 'Português',
    france: 'Français',
};

function getCurrentLang() {
    let lang = localStorage.getItem('language') || 'great-britain';
    // Migrate removed German locale to French
    if (lang === 'germany') {
        lang = 'france';
        localStorage.setItem('language', lang);
    }
    return lang;
}

/** True when item has content for the given area (or web). */
function hasAreaContent(item, area) {
    return !!(item && item.description && item.description[area] != null);
}

function filterByArea(items, area) {
    return (items || []).filter((item) => hasAreaContent(item, area));
}

function getLocalized(value, lang) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[lang] || value['great-britain'] || '';
}

function formatDatePart(dateObj, lang) {
    if (!dateObj) return '';
    const months = dateLabels.months[lang] || dateLabels.months['great-britain'];
    if (dateObj.month) {
        return `${months[dateObj.month - 1]} ${dateObj.year}`;
    }
    return String(dateObj.year);
}

/** Formats from/to into a localized period string. */
function formatPeriod(from, to, lang) {
    if (!from && !to) return '';
    const fromStr = formatDatePart(from, lang);
    if (!to) {
        return `${fromStr} - ${dateLabels.present[lang] || dateLabels.present['great-britain']}`;
    }
    const toStr = formatDatePart(to, lang);
    if (fromStr === toStr) return fromStr;
    return `${fromStr} - ${toStr}`;
}

function descriptionToHtml(desc, asList) {
    if (desc == null || desc === '') return '';
    const toRows = (lines) =>
        lines
            .map(
                (line) =>
                    `<div class="cv-bullet-row"><span class="cv-dot-wrap"><span class="cv-dot"></span></span><span class="cv-bullet-text">${line}</span></div>`
            )
            .join('');

    if (Array.isArray(desc)) {
        if (!desc.length) return '';
        return `<div class="cv-desc-list">${toRows(desc)}</div>`;
    }
    if (asList) {
        return `<div class="cv-desc-list">${toRows([desc])}</div>`;
    }
    return `<p class="cv-item-description">${desc}</p>`;
}

function descriptionToPlain(desc) {
    if (desc == null) return '';
    if (Array.isArray(desc)) return desc.join(' ');
    return desc;
}

// ====================================
// CV Modal
// ====================================

function openCVModal() {
    const modal = document.getElementById('cv-modal');
    if (!modal) return;
    const lang = getCurrentLang();
    const currentInfo = info[lang];

    document.getElementById('cv-modal-title').textContent = currentInfo.modal.title;
    document.getElementById('cv-modal-subtitle').textContent = currentInfo.modal.subtitle;
    document.getElementById('cv-modal-cancel').textContent = currentInfo.modal.cancel;
    document.getElementById('cv-modal-confirm').textContent = currentInfo.modal.confirm;

    const options = document.getElementById('cv-modal-options');
    options.innerHTML = cvAreas.map((area, index) => `
        <label class="cv-modal-option">
            <input type="radio" name="cv-area" value="${area}" ${index === 0 ? 'checked' : ''}>
            <span>${area}</span>
        </label>
    `).join('');

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeCVModal() {
    const modal = document.getElementById('cv-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

function initCVModal() {
    const modal = document.getElementById('cv-modal');
    if (!modal) return;

    document.getElementById('cv-modal-cancel')?.addEventListener('click', closeCVModal);
    modal.querySelector('.cv-modal-backdrop')?.addEventListener('click', closeCVModal);
    document.getElementById('cv-modal-close')?.addEventListener('click', closeCVModal);

    document.getElementById('cv-modal-confirm')?.addEventListener('click', () => {
        const selected = modal.querySelector('input[name="cv-area"]:checked');
        if (!selected) return;
        closeCVModal();
        generatePDF(selected.value);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeCVModal();
        }
    });
}

// ====================================
// PDF Generation
// ====================================

function generatePDF(area) {
    const lang = getCurrentLang();

    populateCVTemplate(lang, area);

    const element = document.getElementById('cv-template');
    const container = element?.querySelector('.cv-container');

    if (!element || !container) {
        console.error('CV template elements not found');
        return;
    }

    showLoadingIndicator();

    element.style.display = 'block';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '0';
    element.style.visibility = 'visible';

    const nameSlug = profile.name.replace(/\s+/g, '_');
    const areaSlug = area.replace(/\s+/g, '_');
    const opt = {
        margin: [4, 8, 6, 8],
        filename: `CV-${nameSlug}-${areaSlug}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            logging: false,
            scrollY: 0,
            scrollX: 0,
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
        },
        pagebreak: { mode: ['css', 'legacy'] },
    };

    const cleanup = () => {
        element.style.display = 'none';
        element.style.position = 'static';
        element.style.left = '0';
        element.style.visibility = 'hidden';
    };

    setTimeout(() => {
        html2pdf()
            .set(opt)
            .from(container)
            .save()
            .then(() => {
                hideLoadingIndicator();
                cleanup();
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
                hideLoadingIndicator();
                alert('Error al generar PDF. Por favor intenta de nuevo.');
                cleanup();
            });
    }, 400);
}

function showLoadingIndicator() {
    const lang = getCurrentLang();
    const message = info[lang]?.loadingPdf || 'Generating PDF...';
    const indicator = document.createElement('div');
    indicator.id = 'pdf-loading-indicator';
    indicator.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.8); z-index: 999999;
                    display: flex; align-items: center; justify-content: center;
                    flex-direction: column; gap: 20px;">
            <div style="width: 60px; height: 60px; border: 5px solid #f3f3f3;
                        border-top: 5px solid #3498db; border-radius: 50%;
                        animation: spin 1s linear infinite;"></div>
            <p style="color: white; font-size: 18px; font-family: Arial, sans-serif;">
                ${message}
            </p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(indicator);
}

function hideLoadingIndicator() {
    document.getElementById('pdf-loading-indicator')?.remove();
}

function setSectionVisible(sectionId, visible) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = visible ? 'block' : 'none';
    }
}

function populateCVTemplate(lang, area) {
    const currentInfo = info[lang];
    if (!currentInfo) return;

    // Header / contact
    const nameEl = document.getElementById('cv-name');
    if (nameEl) nameEl.textContent = profile.name;

    const careerEl = document.getElementById('cv-career');
    if (careerEl) careerEl.textContent = `${currentInfo.career} — ${area}`;

    const locationEl = document.getElementById('cv-location');
    if (locationEl) locationEl.textContent = getLocalized(profile.location, lang);

    const phoneEl = document.getElementById('cv-phone');
    if (phoneEl) {
        const span = phoneEl.querySelector('span');
        if (span) span.textContent = profile.phone;
        phoneEl.href = `tel:${profile.phone}`;
    }

    const emailEl = document.getElementById('cv-email');
    if (emailEl) {
        const span = emailEl.querySelector('span');
        if (span) span.textContent = profile.email;
        emailEl.href = `mailto:${profile.email}`;
    }

    const linkedinEl = document.getElementById('cv-linkedin');
    if (linkedinEl) linkedinEl.href = profile.linkedin;

    const githubEl = document.getElementById('cv-github');
    if (githubEl) githubEl.href = profile.github;

    const webEl = document.getElementById('cv-website');
    if (webEl) webEl.href = profile.website;

    // Presentation
    const aboutText = presentation[area]?.[lang];
    setSectionVisible('cv-section-presentation', !!aboutText);
    if (aboutText) {
        document.getElementById('cv-about-title').textContent =
            currentInfo.links.presentation.toUpperCase();
        document.getElementById('cv-about-text').textContent = aboutText;
    }

    // Experience
    const expItems = filterByArea(experience, area);
    setSectionVisible('cv-section-experience', expItems.length > 0);
    document.getElementById('cv-experience-title').textContent =
        currentInfo.links.experience.toUpperCase();
    document.getElementById('cv-experience-content').innerHTML = expItems
        .map((exp) => {
            const desc = getLocalized(exp.description[area], lang);
            return `
            <div class="cv-item">
                <div class="cv-item-header">
                    <div class="cv-item-title">${getLocalized(exp.position, lang)}</div>
                    <div class="cv-item-date">${formatPeriod(exp.from, exp.to, lang)}</div>
                </div>
                <div class="cv-item-company">${exp.company}</div>
                <div class="cv-item-location">${getLocalized(exp.location, lang)}</div>
                ${descriptionToHtml(desc, true)}
            </div>`;
        })
        .join('');

    // Education
    const eduItems = filterByArea(education, area);
    setSectionVisible('cv-section-education', eduItems.length > 0);
    document.getElementById('cv-education-title').textContent =
        (currentInfo.links.education || 'Education').toUpperCase();
    document.getElementById('cv-education-content').innerHTML = eduItems
        .map((edu) => {
            const desc = getLocalized(edu.description[area], lang);
            return `
            <div class="cv-education-item">
                <div class="cv-education-header">
                    <div class="cv-education-degree">${getLocalized(edu.career, lang)}</div>
                    <div class="cv-education-period">${formatPeriod(edu.from, edu.to, lang)}</div>
                </div>
                <div class="cv-education-university">${edu.university} (${edu.acronym})</div>
                ${edu.faculty ? `<div class="cv-education-faculty">${getLocalized(edu.faculty, lang)}</div>` : ''}
                <div class="cv-item-location">${getLocalized(edu.location, lang)}</div>
                ${descriptionToHtml(desc, false)}
            </div>`;
        })
        .join('');

    // Skills (abilities list for area)
    const skillList = skills.abilities?.[area]?.[lang] || [];
    setSectionVisible('cv-section-skills', skillList.length > 0);
    document.getElementById('cv-skills-title').textContent =
        currentInfo.links.skills.toUpperCase();
    document.getElementById('cv-skills-content').innerHTML = skillList.length
        ? `<div class="cv-desc-list">${skillList
              .map(
                  (s) =>
                      `<div class="cv-bullet-row"><span class="cv-dot-wrap"><span class="cv-dot"></span></span><span class="cv-bullet-text">${s}</span></div>`
              )
              .join('')}</div>`
        : '';

    // Projects
    const projItems = filterByArea(projects, area);
    setSectionVisible('cv-section-projects', projItems.length > 0);
    document.getElementById('cv-projects-title').textContent =
        currentInfo.links.projects.toUpperCase();
    document.getElementById('cv-projects-content').innerHTML = projItems
        .map((proj) => {
            const desc = getLocalized(proj.description[area], lang);
            return `
            <div class="cv-project">
                <div class="cv-project-header">
                    <div class="cv-project-name">${proj.name}</div>
                </div>
                ${proj.subtitle ? `<div class="cv-project-subtitle">${getLocalized(proj.subtitle, lang)}</div>` : ''}
                ${descriptionToHtml(desc, false)}
            </div>`;
        })
        .join('');

    // Volunteer
    const volItems = filterByArea(volunteer, area);
    setSectionVisible('cv-section-volunteer', volItems.length > 0);
    document.getElementById('cv-volunteer-title').textContent =
        currentInfo.links.volunteer.toUpperCase();
    document.getElementById('cv-volunteer-content').innerHTML = volItems
        .map((vol) => {
            const desc = getLocalized(vol.description[area], lang);
            return `
            <div class="cv-item cv-volunteer-item">
                <div class="cv-item-header">
                    <div class="cv-item-title">${getLocalized(vol.title, lang)}</div>
                    <div class="cv-item-date">${formatPeriod(vol.from, vol.to, lang)}</div>
                </div>
                <div class="cv-item-location">${getLocalized(vol.location, lang)}</div>
                ${descriptionToHtml(desc, false)}
            </div>`;
        })
        .join('');

    // Achievements
    const achItems = filterByArea(achievements, area);
    setSectionVisible('cv-section-achievements', achItems.length > 0);
    document.getElementById('cv-achievements-title').textContent =
        currentInfo.links.achievements.toUpperCase();
    document.getElementById('cv-achievements-content').innerHTML = achItems
        .map((ach) => {
            const desc = getLocalized(ach.description[area], lang);
            return `
            <div class="cv-achievement">
                <div class="cv-achievement-header">
                    <div class="cv-achievement-title">${getLocalized(ach.title, lang)}</div>
                    <div class="cv-achievement-date">${formatPeriod(ach.from, ach.to, lang)}</div>
                </div>
                <div class="cv-achievement-location">${getLocalized(ach.location, lang)}</div>
                ${descriptionToHtml(desc, false)}
            </div>`;
        })
        .join('');
}
