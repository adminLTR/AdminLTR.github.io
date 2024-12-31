const experience = [       
    {
        name: 'Academia VITA',
        date: 'November 2024 - December 2024',
        description: {
            'great-britain': 'Freelance Frontend Developer. Specializing in design, development, deployment, and SEO.',
            spain: 'Desarrollador Frontend Freelance. Especializado en diseño, desarrollo, implementación y SEO.',
            italy: 'Sviluppatore Frontend Freelance. Specializzato in design, sviluppo, implementazione e SEO.',
            brazil: 'Desenvolvedor Frontend Freelance. Especializado em design, desenvolvimento, implantação e SEO.',
            germany: 'Freelance Frontend-Entwickler. Spezialisiert auf Design, Entwicklung, Implementierung und SEO.',
        },
        web: "https://academiapreuniversitariavita.com/",
        technologies: [
            "html",
            "css",
            "javascript",
            "jquery",
            "bootstrap",
        ]
    },
    {
        name: 'Eneisoft',
        date: 'October 2024 - November 2024',
        description: {
            'great-britain': 'Development team lead, freelance full-stack developer. Expertise in designing and developing landing pages, data structuring, deployment, SEO, and process automation.',
            spain: 'Líder de equipo de desarrollo y desarrollador full-stack freelance. Experto en diseño y desarrollo de páginas de aterrizaje, estructuración de datos, implementación, SEO y automatización de procesos.',
            italy: 'Leader del team di sviluppo e sviluppatore full-stack freelance. Esperto nella progettazione e nello sviluppo di landing page, strutturazione dei dati, implementazione, SEO e automazione dei processi.',
            brazil: 'Líder de equipe de desenvolvimento e desenvolvedor full-stack freelance. Especializado em design e desenvolvimento de landing pages, estruturação de dados, implantação, SEO e automação de processos.',
            germany: 'Entwicklungs-Teamleiter und Freelance Full-Stack-Entwickler. Spezialisiert auf das Design und die Entwicklung von Landing Pages, Datenstrukturierung, Implementierung, SEO und Prozessautomatisierung.',
        },
        web: "https://eneisoft.org/",
        technologies: [
            "html",
            "css",
            "javascript",
            "jquery",
            "bootstrap",
        ]
    },
    {
        name: 'CapitalFork',
        date: 'July 2024 - August 2024',
        description: {
            'great-britain': 'Junior Full-stack Developer specializing in bug fixing, maintenance, and feature implementation.',
            spain: 'Desarrollador Full-stack Junior especializado en corrección de errores, mantenimiento e implementación de nuevas funciones.',
            italy: 'Sviluppatore Full-stack Junior specializzato nella correzione di bug, manutenzione e implementazione di funzionalità.',
            brazil: 'Desenvolvedor Full-stack Júnior especializado em correção de bugs, manutenção e implementação de funcionalidades.',
            germany: 'Junior Full-Stack-Entwickler, spezialisiert auf Fehlerbehebung, Wartung und Implementierung von Funktionen.',
        },
        web: "https://capitalfork.com/",
        technologies: [
            "php",
            "html",
            "css",
            "javascript",
            "jquery",
            "laravel",
            "bootstrap",
        ]
    }, 
]
const projects = [
    {
        name: 'SmartTachito',
        description: {
            'great-britain': 'Smart trash can capable of classifying kinds of trash.',
            spain: 'Contenedor de basura inteligente capaz de clasificar tipos de basura.',
            italy: 'Bidone della spazzatura intelligente in grado di classificare i tipi di rifiuti.',
            brazil: 'Lixeira inteligente capaz de classificar tipos de lixo.',
            germany: 'Intelligenter Mülleimer, der in der Lage ist, verschiedene Müllarten zu klassifizieren.',
        },
        web: "#",
        github: "#",
        technologies: [
            "html",
            "css",
            "javascript",
            "django",
            "react",
            "tailwindcss",
            "tensorflow",
            "arduino",
        ]
    },
    {
        name: 'BillyApp',
        description: {
            'great-britain': 'Smart security system based on image recognition and artificial intelligence.',
            spain: 'Sistema de seguridad inteligente basado en reconocimiento de imágenes e inteligencia artificial.',
            italy: 'Sistema di sicurezza intelligente basato sul riconoscimento delle immagini e sull’intelligenza artificiale.',
            brazil: 'Sistema de segurança inteligente baseado em reconhecimento de imagens e inteligência artificial.',
            germany: 'Intelligentes Sicherheitssystem basierend auf Bildverarbeitung und künstlicher Intelligenz.',
        },
        web: "#",
        github: "#",
        technologies: [
            "html",
            "css",
            "javascript",
            "django",
            "react",
            "tailwindcss",
            "tensorflow",
            "arduino",
        ]
    },
]

const technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "PHP",
    "Python",
    "React",
    "Laravel",
    "JQuery",
    "Django",
    "Arduino",
    "Figma",
    "MySQL",
    "PostgreSQL",
    "Bootstrap",
    "TailwindCSS",
]

const areas = [
    "Frontend",
    "Backend",
    "IoT"
]

const languages = [
    "great-britain",
    "spain",
    "italy",
    "brazil",
    "germany"
]

const info = {
    'great-britain': {
        links: {
            'home' : 'home',
            'about' : 'about me',
            'projects' : 'projects',
            'experience' : 'experience',
            'skills' : 'skills',
            'languages' : 'languages',
        },
        career: 'Software Engineering Student',
        download: 'Download my CV',
        about: "Hi! I'm a software engineering student from Peru. Passionate about Full Stack Development, IoT, and Mobile Development. I love solving problems and bringing ideas to life through code. Continuously exploring and building innovative solutions that can make a difference. Hope we can create something great together!",        
    },
    spain: {
        links: {
            'home' : 'inicio',
            'about' : 'sobre mi',
            'projects' : 'proyectos',
            'experience' : 'experiencia',
            'skills' : 'habilidades',
            'languages' : 'idiomas',
        },
        career: 'Estudiante de Ingeniería de Software',
        download: 'Descarga mi CV',
        about: "¡Hola! Soy un estudiante de Ingeniería de Software de Perú, apasionado por el desarrollo Full Stack, IoT y desarrollo móvil. Me encanta resolver problemas y dar vida a las ideas a través del código. Siempre estoy explorando y construyendo soluciones innovadoras que puedan marcar la diferencia. ¡Espero que podamos crear algo grandioso juntos!", 
    },
    brazil: {
        links: {
            'home' : 'inicio',
            'about' : 'sobre mim',
            'projects' : 'projetos',
            'experience' : 'experiência',
            'skills' : 'habilidades',
            'languages' : 'idiomas',
        },
        career: 'Aluno de Engenharia de Software',
        download: 'Baixa meu CV',
        about: "Olá! Sou um estudante de Engenharia de Software do Peru, apaixonado por Desenvolvimento Full Stack, IoT e Desenvolvimento Mobile. Adoro resolver problemas e dar vida a ideias por meio do código. Estou sempre explorando e construindo soluções inovadoras que possam fazer a diferença. Espero que possamos criar algo incrível juntos!", 
    },
    italy: {
        links: {
            'home' : 'home',
            'about' : 'su di me',
            'projects' : 'progetti',
            'experience' : 'esperienza',
            'skills' : 'competenze',
            'languages' : 'lingue',
        },
        career: 'Studente di Ingegneria di Software',
        download: 'Scarica il mio CV',
        about: "Ciao! Sono uno studente di Ingegneria del Software dal Perù, appassionato di sviluppo Full Stack, IoT e sviluppo mobile. Amo risolvere problemi e dare vita alle idee attraverso il codice. Esploro continuamente e costruisco soluzioni innovative che possono fare la differenza. Spero che possiamo creare qualcosa di straordinario insieme!", 
    },
    germany: {
        links: {
            'home' : 'Heim',
            'about' : 'über mich',
            'projects' : 'Projekte',
            'experience' : 'Erfahrung',
            'skills' : 'Fähigkeiten',
            'languages' : 'Sprachen',
        },
        career: 'Student der Softwareentwicklung',
        download: 'Meinen Lebenslauf herunterladen',
        about: "Hallo! Ich bin ein Software-Engineering-Student aus Peru, leidenschaftlich für Full-Stack-Entwicklung, IoT und Mobile-Entwicklung. Ich liebe es, Probleme zu lösen und Ideen durch Code zum Leben zu erwecken. Ich erkunde und entwickle ständig innovative Lösungen, die einen Unterschied machen können. Ich hoffe, wir können zusammen etwas Großartiges schaffen!", 
    },
}