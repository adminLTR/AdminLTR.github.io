const experience = [       
    {
        name: 'Academia VITA',
        date: 'November 2024 - December 2024',
        'job-title' : {
            'great-britain': 'Freelance Fullstack developer',
            spain: 'Desarrollador Fullstack freelance',
            italy: 'Sviluppatore FullStack freelance',
            brazil: 'Desenvolvedor Fullstack freelance',
            germany: 'Freelance FullStack-Entwickler',
        },
        description: {
            'great-britain' : [
                "Design and implementation of landing page",
                "SEO and web positioning",
                "Consulting on the company's internal software",
            ],
            spain: [
                "Diseño e implementaciòn de landing page",
                "SEO y posicionamiento web",
                "Consultorìa en software interno de la empresa",
            ],
            italy: [
               "Design e implementazione di landing page",
               "SEO e posizionamento web",
               "Consulenza sul software interno dell'azienda",
            ],
            brazil: [
                "Design e implementação de landing pages",
                "SEO e posicionamento web",
                "Consultoria em software interno da empresa",
            ],
            germany: [
                "Design und Implementierung von Landingpages",
                "SEO und Web-Positionierung",
                "Beratung zur internen Unternehmenssoftware",
            ]
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
        'job-title' : {
            'great-britain': 'Development team lead',
            spain: 'Lider de equipo de desarrollo',
            italy: 'Leader del team di sviluppo',
            brazil: 'Líder da equipe de desenvolvimento',
            germany: 'Teamleiter der Entwicklung',
        },
        description: {
            'great-britain': [
                "Design and implementation of landing pages",
                "SEO and web positioning",
                "Process automation",
                "Data structuring and management",
            ],
            spain: [
                "Diseño e implementación de landing page",
                "SEO y posicionamiento web",
                "Automatización de procesos",
                "Estructuración y administración de los datos",
            ],
            italy: [
                "Design e implementazione di landing page",
                "SEO e posizionamento web",
                "Automazione dei processi",
                "Strutturazione e gestione dei dati",
            ],
            brazil: [
               "Design e implementação de landing pages",
               "SEO e posicionamento web",
               "Automatização de processos",
               "Estruturação e administração de dados",
            ],
            germany: [
                "Design und Implementierung von Landingpages",
                "SEO und Web-Positionierung",
                "Prozessautomatisierung",
                "Strukturierung und Verwaltung von Daten",
            ],
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
        'job-title' : {
            'great-britain': 'Fullstack developer junior',
            spain: 'Desarrollador fullstack junior',
            italy: 'Sviluppatore FullStack freelance',
            brazil: 'Desenvolvedor fullstack junior',
            germany: 'Junior FullStack-Entwickler',
        },
        description: {
            'great-britain': [
                "Feature implementation",
                "Bug fixing",
                "Design implementation",
            ],
            spain: [
                "Implementaciòn de features",
                "Correcciòn de bugs",
                "Implementación del diseño",
            ],
            italy: [
                "Implementazione di funzionalità",
                "Correzione di bug",
                "Implementazione del design",
            ],
            brazil: [
               "Implementação de features",
               "Correção de bugs",
               "Implementação do design",
            ],
            germany: [
                "Implementierung von Features",
                "Fehlerbehebung (Bugfixing)",
                "Design-Implementierung",
            ],
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
        web: "https://adminltr.github.io/SmartTachito-landing/",
        github: "https://github.com/adminLTR/SmartTachito",
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
        github: "https://github.com/adminLTR/Billy-project",
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

const areas = {
    "Frontend" : [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "JQuery",
        "Figma",
        "Bootstrap",
        "TailwindCSS",
    ],
    "Backend" : [
        "PHP",
        "Python",    
        "Laravel",    
        "Django",
        "MySQL",
        "PostgreSQL",
        "Flask",
        "ExpressJS",
    ],
    "Data Science" : [
        "Keras",
        "Excel",
        "Tensorflow",
        "MySQL",
        "PostgreSQL",
    ],
    "IoT" : [
        "Arduino", 
        "ESP32",
        "C++",
        "Sensors",
    ],
}

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
