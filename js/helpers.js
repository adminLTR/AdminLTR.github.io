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
    if (Array.isArray(value)) return value;
    const result = value[lang] ?? value['great-britain'] ?? value.spain ?? '';
    return result;
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

function getCvPdfStyles() {
    return `
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  margin: 0;
  padding: 0;
  background: #ffffff;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
  color: #333;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
body {
  display: flex;
  justify-content: center;
}
.cv-container {
  font-family: Arial, Helvetica, sans-serif;
  width: 700px;
  max-width: 700px;
  margin: 0 auto;
  padding: 8px 18px 10px 18px;
  background: #ffffff;
  color: #333;
  line-height: 1.28;
}
h1, h2, p, a, ul, li, div {
  font-family: Arial, Helvetica, sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  text-transform: none;
}
ul { list-style: none; margin: 0; padding: 0; }
.cv-header {
  margin: 0 0 5px 0;
  padding: 0 0 4px 0;
  border-bottom: 1.5px solid #2c3e50;
  text-align: center;
}
.cv-name {
  font-size: 15px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 2px 0;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  line-height: 1.15;
}
.cv-title {
  font-size: 9px;
  color: #555;
  font-style: italic;
  margin: 0 0 2px 0;
}
.cv-contact {
  font-size: 7.5px;
  color: #666;
  line-height: 1.35;
  text-align: center;
}
.cv-contact span,
.cv-contact a {
  color: inherit;
  text-decoration: none;
  margin: 0 4px;
  white-space: nowrap;
  font-size: 7.5px;
}
.cv-section { margin: 0 0 5px 0; padding: 0; }
.cv-section-title {
  font-size: 9.5px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 2px 0;
  text-transform: uppercase;
  letter-spacing: 0.25px;
  line-height: 1.2;
}
.cv-divider {
  height: 1px;
  background: #bdc3c7;
  margin: 0 0 3px 0;
}
.cv-about {
  font-size: 7.5px;
  text-align: justify;
  line-height: 1.32;
  color: #444;
  margin: 0;
}
.cv-item { margin: 0 0 3.5px 0; }
.cv-item:last-child { margin-bottom: 0; }
.cv-item-header { overflow: hidden; margin-bottom: 1px; }
.cv-item-title {
  float: left;
  font-size: 8.5px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
  max-width: 70%;
}
.cv-item-date {
  float: right;
  font-size: 7px;
  color: #777;
  font-style: italic;
  white-space: nowrap;
}
.cv-item-company {
  clear: both;
  font-size: 8px;
  color: #555;
  font-weight: 600;
  margin: 0;
}
.cv-item-location {
  clear: both;
  font-size: 7px;
  color: #888;
  margin: 0 0 1px 0;
}
.cv-item-description {
  clear: both;
  font-size: 7.5px;
  text-align: justify;
  line-height: 1.32;
  color: #444;
  margin: 0;
}
.cv-desc-list { clear: both; margin: 1px 0 0 0; padding: 0; }
.cv-bullet-row { margin: 0 0 1px 0; padding: 0; overflow: hidden; }
.cv-dot-wrap { float: left; width: 8px; padding-top: 3px; line-height: 0; }
.cv-dot {
  display: block;
  width: 2.5px;
  height: 2.5px;
  background-color: #2c3e50;
  border-radius: 50%;
}
.cv-bullet-text {
  display: block;
  margin-left: 8px;
  font-size: 7.5px;
  line-height: 1.32;
  color: #444;
  text-align: justify;
}
.cv-education-item { margin: 0 0 3.5px 0; overflow: hidden; }
.cv-education-item:last-child { margin-bottom: 0; }
.cv-education-header { overflow: hidden; }
.cv-education-degree {
  float: left;
  font-size: 8.5px;
  font-weight: bold;
  color: #2c3e50;
  max-width: 70%;
}
.cv-education-period {
  float: right;
  font-size: 7px;
  color: #777;
  font-style: italic;
  white-space: nowrap;
}
.cv-education-university {
  clear: both;
  font-size: 7.5px;
  color: #555;
  margin: 0;
}
.cv-education-faculty { font-size: 7px; color: #888; }
.cv-project { margin: 0 0 3.5px 0; }
.cv-project:last-child { margin-bottom: 0; }
.cv-project-header { margin: 0; }
.cv-project-name { font-size: 8.5px; font-weight: bold; color: #2c3e50; }
.cv-project-subtitle {
  font-size: 7.5px;
  color: #555;
  font-style: italic;
  margin: 0 0 1px 0;
}
.cv-project-description {
  font-size: 7.5px;
  text-align: justify;
  line-height: 1.32;
  color: #444;
  margin: 0;
}
.cv-achievement { margin: 0 0 3.5px 0; overflow: hidden; }
.cv-achievement:last-child { margin-bottom: 0; }
.cv-achievement-header { overflow: hidden; }
.cv-achievement-title {
  float: left;
  font-size: 8.5px;
  font-weight: bold;
  color: #2c3e50;
  max-width: 70%;
}
.cv-achievement-date {
  float: right;
  font-size: 7px;
  color: #777;
  font-style: italic;
  white-space: nowrap;
}
.cv-achievement-location {
  clear: both;
  font-size: 7px;
  color: #888;
  margin: 0 0 1px 0;
}
.cv-achievement-description {
  clear: both;
  font-size: 7.5px;
  text-align: justify;
  line-height: 1.32;
  color: #444;
  margin: 0;
}
`.trim();
}

function generatePDF(area) {
    const lang = getCurrentLang();
    populateCVTemplate(lang, area);

    const source = document.querySelector('#cv-template .cv-container');
    if (!source) {
        console.error('CV template not found');
        return;
    }

    showLoadingIndicator();

    const clone = source.cloneNode(true);
    clone.querySelectorAll('.cv-section').forEach((section) => {
        if (section.style.display === 'none') {
            section.remove();
        }
    });

    const frame = document.createElement('iframe');
    frame.id = 'cv-pdf-frame';
    frame.setAttribute('aria-hidden', 'true');
    frame.style.cssText = [
        'position:fixed',
        'left:50%',
        'top:0',
        'transform:translateX(-50%)',
        'width:794px',
        'height:1123px',
        'border:0',
        'margin:0',
        'padding:0',
        'z-index:999998',
        'opacity:1',
        'pointer-events:none',
        'background:#ffffff',
    ].join(';');
    document.body.appendChild(frame);

    const frameDoc = frame.contentDocument || frame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>${getCvPdfStyles()}</style>
</head>
<body></body>
</html>`);
    frameDoc.close();

    const prevScrollX = window.scrollX;
    const prevScrollY = window.scrollY;
    window.scrollTo(0, 0);

    const nameSlug = profile.name.replace(/\s+/g, '_');
    const areaSlug = area.replace(/\s+/g, '_');

    const cleanup = () => {
        frame.remove();
        window.scrollTo(prevScrollX, prevScrollY);
    };

    setTimeout(() => {
        frameDoc.body.innerHTML = clone.outerHTML;
        const target = frameDoc.querySelector('.cv-container');
        if (!target) {
            hideLoadingIndicator();
            cleanup();
            alert('Error al generar PDF. Por favor intenta de nuevo.');
            return;
        }

        const opt = {
            margin: [8, 12, 8, 12],
            filename: `CV-${nameSlug}-${areaSlug}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                scrollX: 0,
                scrollY: 0,
                windowWidth: 794,
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
            },
            pagebreak: { mode: ['css'] },
        };

        html2pdf()
            .set(opt)
            .from(target)
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
    }, 200);
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
        else phoneEl.textContent = profile.phone;
        phoneEl.href = `tel:${profile.phone}`;
    }

    const emailEl = document.getElementById('cv-email');
    if (emailEl) {
        const span = emailEl.querySelector('span');
        if (span) span.textContent = profile.email;
        else emailEl.textContent = profile.email;
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
    const skillList =
        skills.abilities?.[area]?.[lang] ||
        skills.abilities?.[area]?.['great-britain'] ||
        skills.abilities?.[area]?.spain ||
        [];
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
