const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../js/data.js');
let source = fs.readFileSync(dataPath, 'utf8');

function extractObjectLiteral(text, varName) {
    const marker = `const ${varName} = [`;
    const start = text.indexOf(marker);
    if (start === -1) throw new Error(`missing ${varName}`);
    let i = start + marker.length - 1;
    let depth = 0;
    let started = false;
    for (; i < text.length; i++) {
        const ch = text[i];
        if (ch === '[') {
            depth++;
            started = true;
        } else if (ch === ']') depth--;
        if (started && depth === 0) return text.slice(start, i + 2);
    }
    throw new Error(`unclosed ${varName}`);
}

function extractEntries(literal) {
    const inner = literal.replace(/^const \w+ = /, '').slice(1, -1);
    const entries = [];
    let i = 0;
    while (i < inner.length) {
        if (inner[i] === '{') {
            let depth = 0;
            const start = i;
            for (; i < inner.length; i++) {
                if (inner[i] === '{') depth++;
                else if (inner[i] === '}') depth--;
                if (depth === 0) {
                    entries.push(inner.slice(start, i + 1));
                    i++;
                    break;
                }
            }
        } else i++;
    }
    return entries;
}

function convertExpEntry(entry) {
    let e = entry.replace(/^(\s*)company:/m, '$1name:');
    e = e.replace(/^(\s*)position:/m, '$1role:');
    e = e.replace(/^(\s*)name: '([^']+)',/m, `$1name: '$2',\n$1category: 'professional',`);
    return e;
}

function convertVolEntry(entry) {
    let e = entry.replace(/^(\s*)organization:/m, '$1name:');
    e = e.replace(/^(\s*)title:/m, '$1role:');
    e = e.replace(/^(\s*)name: '([^']+)',/m, `$1name: '$2',\n$1category: 'community',`);
    return e;
}

function removeConstBlock(text, varName) {
    const block = extractObjectLiteral(text, varName);
    const start = text.indexOf(block);
    return text.slice(0, start) + text.slice(start + block.length);
}

const expBlock = extractObjectLiteral(source, 'experience');
const volBlock = extractObjectLiteral(source, 'volunteer');
const workBlock = [
    ...extractEntries(expBlock).map(convertExpEntry),
    ...extractEntries(volBlock).map(convertVolEntry),
].join(',\n    ');

let data = source;
data = removeConstBlock(data, 'volunteer');
data = removeConstBlock(data, 'experience');

const portfolioNote = `// ====================================
// Portfolio data lives in projects below.
// category: professional | community | product | academic
// ====================================

`;

data = data.replace(
    /\/\/ ====================================\n\/\/ Experience[\s\S]*?const volunteer = \[[\s\S]*?\];\n\n/,
    portfolioNote
);

data = data.replace(
    /\/\/ ====================================\n\/\/ Projects\n\/\/ ====================================\nconst projects = \[/,
    `// ====================================
// Projects (portfolio: professional, community, products, research)
// description[area|web][lang] = string[] (web) | string (CV)
// ====================================
const projects = [`
);

const marker = 'const projects = [';
const idx = data.indexOf(marker);
data = `${data.slice(0, idx + marker.length)}\n    ${workBlock},\n${data.slice(idx + marker.length)}`;

[
    ["name: 'SpeakUp',", "name: 'SpeakUp',\n        category: 'academic',"],
    ["name: 'CacaoLens',", "name: 'CacaoLens',\n        category: 'product',"],
    ["name: 'Jigsaw Model',", "name: 'Jigsaw Model',\n        category: 'product',"],
    ["name: 'PotAI',", "name: 'PotAI',\n        category: 'product',"],
].forEach(([from, to]) => {
    if (data.includes(from) && !data.includes(to)) data = data.replace(from, to);
});

fs.writeFileSync(dataPath, data, 'utf8');
console.log('Migrated portfolio data OK');
