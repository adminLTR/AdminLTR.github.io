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

function descriptionToPlain(desc) {
    if (desc == null) return '';
    if (Array.isArray(desc)) return desc.join(' ');
    return desc;
}

/** Renders a localized description as a list or paragraph. */
function descriptionToDisplayHtml(desc) {
    if (desc == null || desc === '') return '';
    if (Array.isArray(desc)) {
        return `<ul>${desc.map((item) => `<li>${item}</li>`).join('')}</ul>`;
    }
    return `<p>${desc}</p>`;
}
