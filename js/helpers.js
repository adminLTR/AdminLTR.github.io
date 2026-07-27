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
    // Styles for on-screen host AND html2canvas clone (must travel with the element)
    return `
.cv-pdf-capture {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  width: 794px !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: #ffffff !important;
  z-index: 999998 !important;
  opacity: 1 !important;
  pointer-events: none !important;
  transform: none !important;
  overflow: visible !important;
  box-sizing: border-box !important;
  font-family: Arial, Helvetica, sans-serif !important;
  font-size: 8px !important;
  color: #333 !important;
  line-height: 1.3 !important;
  text-align: left !important;
}
.cv-pdf-capture *,
.cv-pdf-capture *::before,
.cv-pdf-capture *::after {
  box-sizing: border-box !important;
  font-family: Arial, Helvetica, sans-serif !important;
  transform: none !important;
}
.cv-pdf-capture .cv-container {
  width: 794px !important;
  max-width: 794px !important;
  margin: 0 !important;
  padding: 10px 28px 14px 28px !important;
  background: #ffffff !important;
  color: #333 !important;
  line-height: 1.3 !important;
  position: relative !important;
  left: 0 !important;
  top: 0 !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.cv-pdf-capture a {
  color: inherit !important;
  text-decoration: none !important;
  margin: 0 !important;
  padding: 0 !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  display: inline !important;
}
.cv-pdf-capture ul {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
.cv-pdf-capture h1,
.cv-pdf-capture h2 {
  margin: 0 !important;
  padding: 0 !important;
  font-weight: bold !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.cv-pdf-capture .cv-header {
  margin: 0 0 6px 0 !important;
  padding: 0 0 5px 0 !important;
  border-bottom: 1.5px solid #2c3e50 !important;
  text-align: center !important;
}
.cv-pdf-capture .cv-name {
  font-size: 16px !important;
  font-weight: bold !important;
  color: #2c3e50 !important;
  margin: 0 0 2px 0 !important;
  letter-spacing: 0.3px !important;
  text-transform: uppercase !important;
  line-height: 1.15 !important;
  text-align: center !important;
}
.cv-pdf-capture .cv-title {
  font-size: 9.5px !important;
  color: #555 !important;
  font-style: italic !important;
  margin: 0 0 3px 0 !important;
  text-align: center !important;
}
.cv-pdf-capture .cv-contact {
  font-size: 8px !important;
  color: #666 !important;
  line-height: 1.4 !important;
  text-align: center !important;
}
.cv-pdf-capture .cv-contact span,
.cv-pdf-capture .cv-contact a {
  color: inherit !important;
  margin: 0 5px !important;
  white-space: nowrap !important;
  font-size: 8px !important;
}
.cv-pdf-capture .cv-section {
  margin: 0 0 6px 0 !important;
  padding: 0 !important;
  clear: both !important;
}
.cv-pdf-capture .cv-section-title {
  font-size: 10.5px !important;
  font-weight: bold !important;
  color: #2c3e50 !important;
  margin: 0 0 2px 0 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  line-height: 1.2 !important;
  text-align: left !important;
}
.cv-pdf-capture .cv-divider {
  height: 1px !important;
  background: #bdc3c7 !important;
  margin: 0 0 3px 0 !important;
  border: 0 !important;
}
.cv-pdf-capture .cv-about {
  font-size: 8px !important;
  text-align: justify !important;
  line-height: 1.35 !important;
  color: #444 !important;
  margin: 0 !important;
}
.cv-pdf-capture .cv-item,
.cv-pdf-capture .cv-education-item,
.cv-pdf-capture .cv-project,
.cv-pdf-capture .cv-achievement {
  margin: 0 0 4px 0 !important;
  padding: 0 !important;
  clear: both !important;
  overflow: hidden !important;
}
.cv-pdf-capture .cv-item-header,
.cv-pdf-capture .cv-education-header,
.cv-pdf-capture .cv-achievement-header {
  overflow: hidden !important;
  margin-bottom: 1px !important;
}
.cv-pdf-capture .cv-item-title,
.cv-pdf-capture .cv-education-degree,
.cv-pdf-capture .cv-achievement-title,
.cv-pdf-capture .cv-project-name {
  float: left !important;
  font-size: 9px !important;
  font-weight: bold !important;
  color: #2c3e50 !important;
  margin: 0 !important;
  max-width: 72% !important;
}
.cv-pdf-capture .cv-item-date,
.cv-pdf-capture .cv-education-period,
.cv-pdf-capture .cv-achievement-date {
  float: right !important;
  font-size: 7.5px !important;
  color: #777 !important;
  font-style: italic !important;
  white-space: nowrap !important;
  margin: 0 !important;
}
.cv-pdf-capture .cv-item-company {
  clear: both !important;
  font-size: 8.5px !important;
  color: #555 !important;
  font-weight: 600 !important;
  margin: 0 !important;
}
.cv-pdf-capture .cv-item-location,
.cv-pdf-capture .cv-achievement-location,
.cv-pdf-capture .cv-education-faculty {
  clear: both !important;
  font-size: 7.5px !important;
  color: #888 !important;
  margin: 0 0 2px 0 !important;
}
.cv-pdf-capture .cv-education-university {
  clear: both !important;
  font-size: 8px !important;
  color: #555 !important;
  margin: 0 !important;
}
.cv-pdf-capture .cv-item-description,
.cv-pdf-capture .cv-project-description,
.cv-pdf-capture .cv-achievement-description,
.cv-pdf-capture .cv-project-subtitle {
  clear: both !important;
  font-size: 8px !important;
  text-align: justify !important;
  line-height: 1.35 !important;
  color: #444 !important;
  margin: 0 !important;
}
.cv-pdf-capture .cv-project-subtitle {
  font-style: italic !important;
  color: #555 !important;
  margin: 0 0 1px 0 !important;
  text-align: left !important;
}
.cv-pdf-capture .cv-desc-list {
  clear: both !important;
  margin: 1px 0 0 0 !important;
  padding: 0 !important;
}
.cv-pdf-capture .cv-bullet-row {
  margin: 0 0 1.5px 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}
.cv-pdf-capture .cv-dot-wrap {
  float: left !important;
  width: 9px !important;
  padding-top: 3px !important;
  line-height: 0 !important;
}
.cv-pdf-capture .cv-dot {
  display: block !important;
  width: 3px !important;
  height: 3px !important;
  background-color: #2c3e50 !important;
  border-radius: 50% !important;
}
.cv-pdf-capture .cv-bullet-text {
  display: block !important;
  margin-left: 9px !important;
  font-size: 8px !important;
  line-height: 1.35 !important;
  color: #444 !important;
  text-align: justify !important;
  float: none !important;
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

    const cssText = getCvPdfStyles();

    // Style MUST live inside the captured node so html2canvas clone keeps CV CSS
    const styleEl = document.createElement('style');
    styleEl.textContent = cssText;

    const host = document.createElement('div');
    host.id = 'cv-pdf-host';
    host.className = 'cv-pdf-capture';
    host.setAttribute('aria-hidden', 'true');
    host.appendChild(styleEl);
    host.appendChild(clone);
    document.body.appendChild(host);

    const prevScrollX = window.scrollX;
    const prevScrollY = window.scrollY;
    window.scrollTo(0, 0);

    const nameSlug = profile.name.replace(/\s+/g, '_');
    const areaSlug = area.replace(/\s+/g, '_');

    const cleanup = () => {
        host.remove();
        window.scrollTo(prevScrollX, prevScrollY);
    };

    const opt = {
        margin: [10, 10, 10, 10],
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
            onclone: (clonedDoc, element) => {
                const root =
                    (element && element.classList && element.classList.contains('cv-pdf-capture') && element) ||
                    clonedDoc.querySelector('.cv-pdf-capture') ||
                    clonedDoc.getElementById('cv-pdf-host');

                if (root) {
                    root.classList.add('cv-pdf-capture');
                    root.style.cssText = [
                        'position:relative',
                        'left:0',
                        'top:0',
                        'margin:0',
                        'padding:0',
                        'transform:none',
                        'width:794px',
                        'background:#ffffff',
                    ].join(';');

                    // Ensure CV CSS exists inside the cloned tree
                    if (!root.querySelector('style[data-cv-pdf]')) {
                        const s = clonedDoc.createElement('style');
                        s.setAttribute('data-cv-pdf', '1');
                        s.textContent = cssText;
                        root.insertBefore(s, root.firstChild);
                    }
                }

                if (clonedDoc.body) {
                    clonedDoc.body.style.margin = '0';
                    clonedDoc.body.style.padding = '0';
                    clonedDoc.body.style.background = '#ffffff';
                }
            },
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
        },
        pagebreak: { mode: ['css'] },
    };

    requestAnimationFrame(() => {
        setTimeout(() => {
            // Capture the HOST (preview), not the inner container alone
            html2pdf()
                .set(opt)
                .from(host)
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
        }, 300);
    });
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
