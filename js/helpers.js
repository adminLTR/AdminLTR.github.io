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
    // Avoid aria-hidden warning while a modal button still has focus
    if (modal.contains(document.activeElement) && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
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
.cv-container.cv-pdf-ready {
  width: 794px !important;
  max-width: 794px !important;
  margin: 0 !important;
  padding: 10px 28px 14px 28px !important;
  background: #ffffff !important;
  color: #333 !important;
  line-height: 1.3 !important;
  position: static !important;
  left: auto !important;
  top: auto !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  transform: none !important;
  box-sizing: border-box !important;
  font-family: Arial, Helvetica, sans-serif !important;
  font-size: 9.5px !important;
  text-align: left !important;
}
.cv-container.cv-pdf-ready *,
.cv-container.cv-pdf-ready *::before,
.cv-container.cv-pdf-ready *::after {
  box-sizing: border-box !important;
  font-family: Arial, Helvetica, sans-serif !important;
  transform: none !important;
}
.cv-container.cv-pdf-ready a {
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
.cv-container.cv-pdf-ready ul {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
.cv-container.cv-pdf-ready h1,
.cv-container.cv-pdf-ready h2 {
  margin: 0 !important;
  padding: 0 !important;
  font-weight: bold !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.cv-container.cv-pdf-ready .cv-header {
  margin: 0 0 7px 0 !important;
  padding: 0 0 6px 0 !important;
  border-bottom: 1.5px solid #2c3e50 !important;
  text-align: center !important;
}
.cv-container.cv-pdf-ready .cv-name {
  font-size: 18px !important;
  font-weight: bold !important;
  color: #2c3e50 !important;
  margin: 0 0 3px 0 !important;
  letter-spacing: 0.3px !important;
  text-transform: uppercase !important;
  line-height: 1.15 !important;
  text-align: center !important;
}
.cv-container.cv-pdf-ready .cv-title {
  font-size: 11px !important;
  color: #555 !important;
  font-style: italic !important;
  margin: 0 0 3px 0 !important;
  text-align: center !important;
}
.cv-container.cv-pdf-ready .cv-contact {
  font-size: 9.5px !important;
  color: #666 !important;
  line-height: 1.4 !important;
  text-align: center !important;
}
.cv-container.cv-pdf-ready .cv-contact span,
.cv-container.cv-pdf-ready .cv-contact a {
  color: inherit !important;
  margin: 0 5px !important;
  white-space: nowrap !important;
  font-size: 9.5px !important;
}
.cv-container.cv-pdf-ready .cv-section {
  margin: 0 0 7px 0 !important;
  padding: 0 !important;
  clear: both !important;
}
.cv-container.cv-pdf-ready .cv-section-title {
  font-size: 12px !important;
  font-weight: bold !important;
  color: #2c3e50 !important;
  margin: 0 0 3px 0 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  line-height: 1.2 !important;
  text-align: left !important;
}
.cv-container.cv-pdf-ready .cv-divider {
  height: 1px !important;
  background: #bdc3c7 !important;
  margin: 0 0 4px 0 !important;
  border: 0 !important;
}
.cv-container.cv-pdf-ready .cv-about {
  font-size: 9.5px !important;
  text-align: justify !important;
  line-height: 1.4 !important;
  color: #444 !important;
  margin: 0 !important;
}
.cv-container.cv-pdf-ready .cv-item,
.cv-container.cv-pdf-ready .cv-education-item,
.cv-container.cv-pdf-ready .cv-project,
.cv-container.cv-pdf-ready .cv-achievement {
  margin: 0 0 5px 0 !important;
  padding: 0 !important;
  clear: both !important;
  overflow: hidden !important;
}
.cv-container.cv-pdf-ready .cv-item-header,
.cv-container.cv-pdf-ready .cv-education-header,
.cv-container.cv-pdf-ready .cv-achievement-header {
  overflow: hidden !important;
  margin-bottom: 1px !important;
}
.cv-container.cv-pdf-ready .cv-item-title,
.cv-container.cv-pdf-ready .cv-education-degree,
.cv-container.cv-pdf-ready .cv-achievement-title,
.cv-container.cv-pdf-ready .cv-project-name {
  float: left !important;
  font-size: 10.5px !important;
  font-weight: bold !important;
  color: #2c3e50 !important;
  margin: 0 !important;
  max-width: 72% !important;
}
.cv-container.cv-pdf-ready .cv-item-date,
.cv-container.cv-pdf-ready .cv-education-period,
.cv-container.cv-pdf-ready .cv-achievement-date {
  float: right !important;
  font-size: 9px !important;
  color: #777 !important;
  font-style: italic !important;
  white-space: nowrap !important;
  margin: 0 !important;
}
.cv-container.cv-pdf-ready .cv-item-company {
  clear: both !important;
  font-size: 10px !important;
  color: #555 !important;
  font-weight: 600 !important;
  margin: 0 !important;
}
.cv-container.cv-pdf-ready .cv-item-location,
.cv-container.cv-pdf-ready .cv-achievement-location,
.cv-container.cv-pdf-ready .cv-education-faculty {
  clear: both !important;
  font-size: 9px !important;
  color: #888 !important;
  margin: 0 0 2px 0 !important;
}
.cv-container.cv-pdf-ready .cv-education-university {
  clear: both !important;
  font-size: 9.5px !important;
  color: #555 !important;
  margin: 0 !important;
}
.cv-container.cv-pdf-ready .cv-item-description,
.cv-container.cv-pdf-ready .cv-project-description,
.cv-container.cv-pdf-ready .cv-achievement-description,
.cv-container.cv-pdf-ready .cv-project-subtitle {
  clear: both !important;
  font-size: 9.5px !important;
  text-align: justify !important;
  line-height: 1.4 !important;
  color: #444 !important;
  margin: 0 !important;
}
.cv-container.cv-pdf-ready .cv-project-subtitle {
  font-style: italic !important;
  color: #555 !important;
  margin: 0 0 1px 0 !important;
  text-align: left !important;
}
.cv-container.cv-pdf-ready .cv-desc-list {
  clear: both !important;
  margin: 1px 0 0 0 !important;
  padding: 0 !important;
}
.cv-container.cv-pdf-ready .cv-bullet-row {
  margin: 0 0 2px 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}
.cv-container.cv-pdf-ready .cv-dot-wrap {
  float: left !important;
  width: 10px !important;
  padding-top: 4px !important;
  line-height: 0 !important;
}
.cv-container.cv-pdf-ready .cv-dot {
  display: block !important;
  width: 3.5px !important;
  height: 3.5px !important;
  background-color: #2c3e50 !important;
  border-radius: 50% !important;
}
.cv-container.cv-pdf-ready .cv-bullet-text {
  display: block !important;
  margin-left: 10px !important;
  font-size: 9.5px !important;
  line-height: 1.4 !important;
  color: #444 !important;
  text-align: justify !important;
  float: none !important;
}
`.trim();
}

function getJsPdfConstructor() {
    if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
    if (window.jsPDF) return window.jsPDF;
    return null;
}

function generatePDF(area) {
    const lang = getCurrentLang();
    populateCVTemplate(lang, area);

    const source = document.querySelector('#cv-template .cv-container');
    if (!source) {
        console.error('CV template not found');
        return;
    }
    if (typeof html2canvas !== 'function') {
        console.error('html2canvas not available');
        alert('Error al generar PDF. Por favor intenta de nuevo.');
        return;
    }

    showLoadingIndicator();

    const cssText = getCvPdfStyles();
    const styleEl = document.createElement('style');
    styleEl.id = 'cv-pdf-ready-styles';
    styleEl.textContent = cssText;
    document.head.appendChild(styleEl);

    const clone = source.cloneNode(true);
    clone.classList.add('cv-pdf-ready');
    clone.querySelectorAll('.cv-section').forEach((section) => {
        if (section.style.display === 'none') {
            section.remove();
        }
    });

    // Absolute (not fixed) at 0,0 — avoids html2canvas left-crop with fixed parents
    const host = document.createElement('div');
    host.id = 'cv-pdf-host';
    host.setAttribute('aria-hidden', 'true');
    host.style.cssText = [
        'position:absolute',
        'left:0',
        'top:0',
        'width:794px',
        'margin:0',
        'padding:0',
        'background:#ffffff',
        'z-index:1000001',
        'opacity:1',
        'pointer-events:none',
        'transform:none',
        'overflow:visible',
    ].join(';');
    host.appendChild(clone);
    document.body.appendChild(host);

    const prevScrollX = window.scrollX;
    const prevScrollY = window.scrollY;
    window.scrollTo(0, 0);

    const nameSlug = profile.name.replace(/\s+/g, '_');
    const areaSlug = area.replace(/\s+/g, '_');
    const filename = `CV-${nameSlug}-${areaSlug}.pdf`;

    const cleanup = () => {
        host.remove();
        styleEl.remove();
        window.scrollTo(prevScrollX, prevScrollY);
    };

    const addCanvasToPdf = (canvas) => {
        const JsPDF = getJsPdfConstructor();
        if (!JsPDF) {
            // Fallback to html2pdf if jsPDF global is unavailable
            return html2pdf()
                .set({
                    margin: [10, 10, 10, 10],
                    filename,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 1 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                })
                .from(canvas)
                .save();
        }

        const pdf = new JsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const imgW = pageW - margin * 2;
        const imgH = (canvas.height * imgW) / canvas.width;
        const imgData = canvas.toDataURL('image/jpeg', 0.98);

        let heightLeft = imgH;
        let position = margin;

        pdf.addImage(imgData, 'JPEG', margin, position, imgW, imgH);
        heightLeft -= pageH - margin * 2;

        while (heightLeft > 0) {
            position = margin - (imgH - heightLeft);
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', margin, position, imgW, imgH);
            heightLeft -= pageH - margin * 2;
        }

        pdf.save(filename);
        return Promise.resolve();
    };

    requestAnimationFrame(() => {
        setTimeout(() => {
            const captureWidth = 794;
            const captureHeight = Math.max(clone.scrollHeight, clone.offsetHeight, 1);

            html2canvas(clone, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                scrollX: 0,
                scrollY: 0,
                windowWidth: captureWidth,
                windowHeight: captureHeight,
                width: captureWidth,
                height: captureHeight,
                x: 0,
                y: 0,
                onclone: (clonedDoc, element) => {
                    const st = clonedDoc.createElement('style');
                    st.id = 'cv-pdf-ready-styles';
                    st.textContent = `${cssText}
html, body {
  margin: 0 !important;
  padding: 0 !important;
  background: #ffffff !important;
  width: ${captureWidth}px !important;
}
`;
                    clonedDoc.head.appendChild(st);

                    const target =
                        element ||
                        clonedDoc.querySelector('.cv-container.cv-pdf-ready') ||
                        clonedDoc.querySelector('.cv-container');

                    if (target) {
                        target.classList.add('cv-container', 'cv-pdf-ready');
                        // Move CV to body root (no parent offset), then drop siblings
                        clonedDoc.body.appendChild(target);
                        Array.from(clonedDoc.body.children).forEach((child) => {
                            if (child !== target) child.remove();
                        });
                        target.style.cssText = [
                            'display:block',
                            'visibility:visible',
                            'opacity:1',
                            'position:static',
                            'left:auto',
                            'top:auto',
                            'margin:0',
                            'transform:none',
                            'width:794px',
                            'max-width:794px',
                            'background:#ffffff',
                        ].join(';');
                    }
                },
            })
                .then((canvas) => addCanvasToPdf(canvas))
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
