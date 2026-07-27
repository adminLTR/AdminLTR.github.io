// ====================================
// Profile & contact (shared across web + CV)
// ====================================
const profile = {
    name: 'Jose Luis La Torre Romero',
    photo: './img/foto.jpeg',
    phone: '+51941831923',
    email: 'joselatorre143351@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jose-luis-la-torre-romero-7bb5442a6/',
    github: 'https://github.com/adminLTR',
    website: 'https://adminltr.github.io/',
    location: {
        'great-britain': 'Lima, Peru',
        spain: 'Lima, Perú',
        italy: 'Lima, Perù',
        brazil: 'Lima, Peru',
        germany: 'Lima, Peru',
    },
};

// CV area versions (web is only for the website, not a downloadable CV)
const cvAreas = ['Frontend', 'Backend', 'Data Science', 'IoT'];

const languages = [
    'great-britain',
    'spain',
    'italy',
    'brazil',
    'germany',
];

// Labels for "Present" / month names when formatting from–to dates
const dateLabels = {
    present: {
        'great-britain': 'Present',
        spain: 'Actualidad',
        italy: 'Presente',
        brazil: 'Presente',
        germany: 'Gegenwart',
    },
    months: {
        'great-britain': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        spain: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        italy: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        brazil: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        germany: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    },
};

// ====================================
// Presentation (about) — per area + web, per language
// If an area key is missing, that CV version has no presentation section.
// ====================================
const presentation = {
    web: {
        'great-britain': "I'm a young 9th semester Software Engineering student at UNMSM, with experience in Full Stack development and focus on building IoT solutions and embedded systems with Artificial Intelligence. Passionate about innovation, I enjoy transforming ideas into functional products that generate real impact for the benefit of the community. I speak 6 languages and have been winner of 3 hackathons. I am characterized by my leadership and self-taught attitude.",
        spain: 'Soy un joven estudiante de 9no ciclo de Ingeniería de Software en la UNMSM, con experiencia en desarrollo Full Stack y enfoque en la construcción de soluciones IoT y sistemas embebidos con Inteligencia Artificial. Apasionado por la innovación, disfruto transformar ideas en productos funcionales que generen impacto real en beneficio de la comunidad. Hablo 6 idiomas y he sido ganador de 3 hackathons. Me caracterizo por mi liderazgo y actitud autodidacta.',
        italy: "Sono un giovane studente del 9° semestre di Ingegneria del Software presso l'UNMSM, con esperienza nello sviluppo Full Stack e focus sulla costruzione di soluzioni IoT e sistemi embedded con Intelligenza Artificiale. Appassionato di innovazione, mi piace trasformare idee in prodotti funzionali che generano un impatto reale a beneficio della comunità. Parlo 6 lingue e sono stato vincitore di 3 hackathon. Mi caratterizzo per la mia leadership e attitudine autodidatta.",
        brazil: 'Sou um jovem estudante do 9º período de Engenharia de Software na UNMSM, com experiência em desenvolvimento Full Stack e foco na construção de soluções IoT e sistemas embarcados com Inteligência Artificial. Apaixonado por inovação, gosto de transformar ideias em produtos funcionais que geram impacto real para o benefício da comunidade. Falo 6 idiomas e fui vencedor de 3 hackathons. Me caracterizo pela minha liderança e atitude autodidata.',
        germany: 'Ich bin ein junger Student im 9. Semester des Software-Engineering an der UNMSM, mit Erfahrung in der Full-Stack-Entwicklung und Fokus auf den Aufbau von IoT-Lösungen und eingebetteten Systemen mit Künstlicher Intelligenz. Leidenschaftlich für Innovation, genieße ich es, Ideen in funktionale Produkte zu verwandeln, die echte Auswirkungen zum Wohle der Gemeinschaft erzeugen. Ich spreche 6 Sprachen und war Gewinner von 3 Hackathons. Ich zeichne mich durch meine Führungsqualitäten und autodidaktische Einstellung aus.',
    },
    Frontend: {
        'great-britain': 'Software Engineering student specialized in building modern, responsive user interfaces with React, JavaScript and CSS frameworks. Focused on clean UX and accessible web experiences.',
        spain: 'Estudiante de Ingeniería de Software especializado en interfaces modernas y responsivas con React, JavaScript y frameworks CSS. Enfocado en UX limpia y experiencias web accesibles.',
        italy: 'Studente di Ingegneria del Software specializzato in interfacce moderne e responsive con React, JavaScript e framework CSS. Orientato a UX pulita ed esperienze web accessibili.',
        brazil: 'Estudante de Engenharia de Software especializado em interfaces modernas e responsivas com React, JavaScript e frameworks CSS. Focado em UX limpa e experiências web acessíveis.',
        germany: 'Software-Engineering-Student mit Fokus auf moderne, responsive Oberflächen mit React, JavaScript und CSS-Frameworks. Orientiert an klarer UX und barrierefreien Web-Erlebnissen.',
    },
    Backend: {
        'great-britain': 'Software Engineering student with experience designing APIs, databases and scalable server-side architectures using Python, Django, Flask and Node.js.',
        spain: 'Estudiante de Ingeniería de Software con experiencia diseñando APIs, bases de datos y arquitecturas escalables con Python, Django, Flask y Node.js.',
        italy: 'Studente di Ingegneria del Software con esperienza nella progettazione di API, database e architetture scalabili con Python, Django, Flask e Node.js.',
        brazil: 'Estudante de Engenharia de Software com experiência no design de APIs, bancos de dados e arquiteturas escaláveis com Python, Django, Flask e Node.js.',
        germany: 'Software-Engineering-Student mit Erfahrung in APIs, Datenbanken und skalierbaren Server-Architekturen mit Python, Django, Flask und Node.js.',
    },
    'Data Science': {
        'great-britain': 'Software Engineering student applying machine learning and data analysis to real products, with experience in TensorFlow, Keras and data-driven decision systems.',
        spain: 'Estudiante de Ingeniería de Software aplicando machine learning y análisis de datos a productos reales, con experiencia en TensorFlow, Keras y sistemas basados en datos.',
        italy: 'Studente di Ingegneria del Software che applica machine learning e analisi dei dati a prodotti reali, con esperienza in TensorFlow, Keras e sistemi data-driven.',
        brazil: 'Estudante de Engenharia de Software aplicando machine learning e análise de dados a produtos reais, com experiência em TensorFlow, Keras e sistemas baseados em dados.',
        germany: 'Software-Engineering-Student mit Fokus auf Machine Learning und Datenanalyse in realen Produkten, Erfahrung mit TensorFlow, Keras und datenbasierten Systemen.',
    },
    IoT: {
        'great-britain': 'Software Engineering student focused on IoT and embedded systems with AI, building connected devices with Arduino, ESP32 and sensor-driven automation.',
        spain: 'Estudiante de Ingeniería de Software enfocado en IoT y sistemas embebidos con IA, construyendo dispositivos conectados con Arduino, ESP32 y automatización basada en sensores.',
        italy: 'Studente di Ingegneria del Software focalizzato su IoT e sistemi embedded con IA, costruendo dispositivi connessi con Arduino, ESP32 e automazione basata su sensori.',
        brazil: 'Estudante de Engenharia de Software focado em IoT e sistemas embarcados com IA, construindo dispositivos conectados com Arduino, ESP32 e automação baseada em sensores.',
        germany: 'Software-Engineering-Student mit Fokus auf IoT und Embedded Systems mit KI, Entwicklung vernetzter Geräte mit Arduino, ESP32 und sensorgesteuerter Automatisierung.',
    },
};

// ====================================
// Experience
// description[area][lang] = string[] (CV bullets) | string (web paragraph)
// Missing area key => item excluded from that CV
// ====================================
const experience = [
    {
        company: 'GM Group',
        image: 'experience/gmgroup-side.png',
        location: {
            'great-britain': 'Salto, Uruguay',
            spain: 'Salto, Uruguay',
            italy: 'Salto, Uruguay',
            brazil: 'Salto, Uruguai',
            germany: 'Salto, Uruguay',
        },
        from: { year: 2025, month: 4 },
        to: null,
        position: {
            'great-britain': 'Developer & IT Support',
            spain: 'Desarrollador y soporte TI',
            italy: 'Sviluppatore e supporto IT',
            brazil: 'Desenvolvedor e suporte TI',
            germany: 'Entwickler und IT-Support',
        },
        description: {
            web: {
                'great-britain': 'Full-stack developer specializing in modern web solutions, database design, and scalable architectures. Deployed production systems with automated processes through web scraping, while providing continuous technical support that significantly improved staff efficiency, system performance, and operational security.',
                spain: 'Desarrollador full-stack especializado en soluciones web modernas, diseño de bases de datos y arquitecturas escalables. Desplegué sistemas en producción con procesos automatizados mediante web scraping, brindando soporte técnico continuo que mejoró significativamente la eficiencia del personal, el rendimiento de los sistemas y la seguridad operativa.',
                italy: "Sviluppatore full-stack specializzato in soluzioni web moderne, progettazione di database e architetture scalabili. Ho distribuito sistemi in produzione con processi automatizzati tramite web scraping, fornendo supporto tecnico continuo che ha migliorato significativamente l'efficienza del personale, le prestazioni dei sistemi e la sicurezza operativa.",
                brazil: 'Desenvolvedor full-stack especializado em soluções web modernas, design de bancos de dados e arquiteturas escaláveis. Implementei sistemas em produção com processos automatizados através de web scraping, fornecendo suporte técnico contínuo que melhorou significativamente a eficiência da equipe, o desempenho dos sistemas e a segurança operacional.',
                germany: 'Full-Stack-Entwickler mit Spezialisierung auf moderne Weblösungen, Datenbankdesign und skalierbare Architekturen. Stellte Produktionssysteme mit automatisierten Prozessen durch Web Scraping bereit und leistete kontinuierlichen technischen Support, der die Mitarbeitereffizienz, Systemleistung und Betriebssicherheit erheblich verbesserte.',
            },
            Frontend: {
                'great-britain': [
                    'Built modern responsive interfaces with React, TailwindCSS and JavaScript',
                    'Improved UX and staff workflows through iterative UI enhancements',
                ],
                spain: [
                    'Desarrollé interfaces responsivas modernas con React, TailwindCSS y JavaScript',
                    'Mejoré la UX y los flujos del personal mediante iteraciones de interfaz',
                ],
                italy: [
                    'Ho costruito interfacce responsive moderne con React, TailwindCSS e JavaScript',
                    'Ho migliorato UX e flussi di lavoro del personale con iterazioni UI',
                ],
                brazil: [
                    'Construí interfaces responsivas modernas com React, TailwindCSS e JavaScript',
                    'Melhorei a UX e os fluxos da equipe com iterações de interface',
                ],
                germany: [
                    'Moderne responsive Interfaces mit React, TailwindCSS und JavaScript gebaut',
                    'UX und Arbeitsabläufe des Personals durch UI-Iterationen verbessert',
                ],
            },
            Backend: {
                'great-britain': [
                    'Designed databases and scalable APIs with Express, Django and Flask',
                    'Deployed production systems with automated web scraping pipelines',
                    'Provided IT support improving performance and operational security',
                ],
                spain: [
                    'Diseñé bases de datos y APIs escalables con Express, Django y Flask',
                    'Desplegué sistemas en producción con pipelines de web scraping',
                    'Brindé soporte TI mejorando rendimiento y seguridad operativa',
                ],
                italy: [
                    'Ho progettato database e API scalabili con Express, Django e Flask',
                    'Ho distribuito sistemi in produzione con pipeline di web scraping',
                    'Ho fornito supporto IT migliorando prestazioni e sicurezza operativa',
                ],
                brazil: [
                    'Projetei bancos de dados e APIs escaláveis com Express, Django e Flask',
                    'Implantei sistemas em produção com pipelines de web scraping',
                    'Prestei suporte TI melhorando desempenho e segurança operacional',
                ],
                germany: [
                    'Datenbanken und skalierbare APIs mit Express, Django und Flask entworfen',
                    'Produktionssysteme mit Web-Scraping-Pipelines bereitgestellt',
                    'IT-Support zur Verbesserung von Leistung und Betriebssicherheit geleistet',
                ],
            },
            'Data Science': {
                'great-britain': [
                    'Supported data-oriented automation and reporting for operational decisions',
                    'Worked with MySQL data models feeding internal tools and dashboards',
                ],
                spain: [
                    'Apoyé automatización y reportes orientados a datos para decisiones operativas',
                    'Trabajé con modelos de datos MySQL para herramientas internas y dashboards',
                ],
                italy: [
                    'Ho supportato automazione e report orientati ai dati per decisioni operative',
                    'Ho lavorato con modelli dati MySQL per tool interni e dashboard',
                ],
                brazil: [
                    'Apoiei automação e relatórios orientados a dados para decisões operacionais',
                    'Trabalhei com modelos de dados MySQL para ferramentas internas e dashboards',
                ],
                germany: [
                    'Datenorientierte Automatisierung und Reports für operative Entscheidungen unterstützt',
                    'Mit MySQL-Datenmodellen für interne Tools und Dashboards gearbeitet',
                ],
            },
        },
        website: 'https://solucionesgm.com/',
        technologies: [
            'html', 'css', 'javascript', 'react', 'tailwindcss',
            'expressjs', 'django', 'flask', 'mysql',
        ],
    },
];

// ====================================
// Volunteer
// ====================================
const volunteer = [
    {
        title: {
            'great-britain': 'Development Team Lead — Eneisoft',
            spain: 'Líder de equipo de desarrollo — Eneisoft',
            italy: 'Leader del team di sviluppo — Eneisoft',
            brazil: 'Líder da equipe de desenvolvimento — Eneisoft',
            germany: 'Teamleiter Entwicklung — Eneisoft',
        },
        organization: 'Eneisoft',
        image: 'experience/eneisoft-side.webp',
        location: {
            'great-britain': 'Lima, Peru',
            spain: 'Lima, Perú',
            italy: 'Lima, Perù',
            brazil: 'Lima, Peru',
            germany: 'Lima, Peru',
        },
        from: { year: 2024, month: 10 },
        to: { year: 2024, month: 11 },
        description: {
            web: {
                'great-britain': 'Led a development team in creating and deploying the official event landing page, while managing and centralizing critical information through automated scripts. Actively contributed to logistical planning and execution, playing a key role in the success of this national-scale technology event.',
                spain: 'Lideré un equipo de desarrollo en la creación y despliegue de la landing page oficial del evento, gestionando y centralizando información crítica mediante scripts automatizados. Contribuí activamente en la planificación y ejecución logística, desempeñando un rol clave en el éxito de este evento tecnológico a nivel nacional.',
                italy: "Ho guidato un team di sviluppo nella creazione e distribuzione della landing page ufficiale dell'evento, gestendo e centralizzando informazioni critiche tramite script automatizzati. Ho contribuito attivamente alla pianificazione ed esecuzione logistica, svolgendo un ruolo chiave nel successo di questo evento tecnologico su scala nazionale.",
                brazil: 'Liderei uma equipe de desenvolvimento na criação e implantação da landing page oficial do evento, gerenciando e centralizando informações críticas através de scripts automatizados. Contribuí ativamente no planejamento e execução logística, desempenhando um papel fundamental no sucesso deste evento tecnológico em escala nacional.',
                germany: 'Leitete ein Entwicklungsteam bei der Erstellung und Bereitstellung der offiziellen Event-Landingpage und verwaltete kritische Informationen durch automatisierte Skripte. Trug aktiv zur logistischen Planung und Durchführung bei und spielte eine Schlüsselrolle beim Erfolg dieser landesweiten Technologieveranstaltung.',
            },
            Frontend: {
                'great-britain': 'Led the team that built and shipped the official event landing page with HTML, CSS, JavaScript, jQuery and Bootstrap.',
                spain: 'Lideré el equipo que construyó y publicó la landing page oficial del evento con HTML, CSS, JavaScript, jQuery y Bootstrap.',
                italy: "Ho guidato il team che ha realizzato e pubblicato la landing page ufficiale dell'evento con HTML, CSS, JavaScript, jQuery e Bootstrap.",
                brazil: 'Liderei a equipe que construiu e publicou a landing page oficial do evento com HTML, CSS, JavaScript, jQuery e Bootstrap.',
                germany: 'Leitete das Team, das die offizielle Event-Landingpage mit HTML, CSS, JavaScript, jQuery und Bootstrap umsetzte.',
            },
            Backend: {
                'great-britain': 'Managed and centralized critical event information through automated scripts supporting logistics at national scale.',
                spain: 'Gestioné y centralicé información crítica del evento mediante scripts automatizados que apoyaron la logística a escala nacional.',
                italy: "Ho gestito e centralizzato informazioni critiche dell'evento tramite script automatizzati a supporto della logistica su scala nazionale.",
                brazil: 'Gerenciei e centralizei informações críticas do evento por meio de scripts automatizados que apoiaram a logística em escala nacional.',
                germany: 'Verwaltete und zentralisierte kritische Event-Informationen durch automatisierte Skripte zur Unterstützung der landesweiten Logistik.',
            },
        },
        website: 'https://eneisoft.org/',
        technologies: ['html', 'css', 'javascript', 'jquery', 'bootstrap'],
    },
];

// ====================================
// Achievements / recognition
// ====================================
const achievements = [
    {
        image: 'achievements/datapower.jpg',
        title: {
            'great-britain': 'Official Speaker at DataPower (DSRP)',
            spain: 'Ponente oficial en DataPower (DSRP)',
            italy: 'Relatore ufficiale a DataPower (DSRP)',
            brazil: 'Palestrante oficial no DataPower (DSRP)',
            germany: 'Offizieller Redner bei DataPower (DSRP)',
        },
        location: {
            'great-britain': 'Lima, Peru',
            spain: 'Lima, Perú',
            italy: 'Lima, Perù',
            brazil: 'Lima, Peru',
            germany: 'Lima, Peru',
        },
        from: { year: 2025, month: 11 },
        to: { year: 2025, month: 11 },
        description: {
            web: {
                'great-britain': 'Presented the POT-AI project at the Data Power event organized by Data Science Research Peru (DSRP), sharing ideas and experiences on how artificial intelligence and the Internet of Things can be combined to build environmental solutions.',
                spain: 'Tuve la oportunidad de presentar el proyecto POT-AI en el evento Data Power organizado por Data Science Research Perú (DSRP), compartir ideas y experiencias de cómo la inteligencia artificial y el internet de las cosas pueden combinarse para construir soluciones medioambientales.',
                italy: "Ho avuto l'opportunità di presentare il progetto POT-AI all'evento Data Power organizzato da Data Science Research Peru (DSRP), condividendo idee ed esperienze su come l'intelligenza artificiale e l'Internet delle Cose possono essere combinati per costruire soluzioni ambientali.",
                brazil: 'Tive a oportunidade de apresentar o projeto POT-AI no evento Data Power organizado pela Data Science Research Peru (DSRP), compartilhando ideias e experiências sobre como a inteligência artificial e a Internet das Coisas podem ser combinadas para construir soluções ambientais.',
                germany: 'Hatte die Gelegenheit, das POT-AI-Projekt bei der Data Power-Veranstaltung zu präsentieren, die von Data Science Research Peru (DSRP) organisiert wurde, und Ideen und Erfahrungen darüber zu teilen, wie künstliche Intelligenz und das Internet der Dinge kombiniert werden können, um Umweltlösungen zu schaffen.',
            },
            'Data Science': {
                'great-britain': 'Presented POT-AI at DataPower (DSRP), sharing how AI and IoT combine for environmental solutions.',
                spain: 'Presenté POT-AI en DataPower (DSRP), compartiendo cómo la IA y el IoT se combinan en soluciones ambientales.',
                italy: 'Ho presentato POT-AI a DataPower (DSRP), condividendo come IA e IoT si combinano in soluzioni ambientali.',
                brazil: 'Apresentei o POT-AI no DataPower (DSRP), compartilhando como IA e IoT se combinam em soluções ambientais.',
                germany: 'Präsentierte POT-AI bei DataPower (DSRP) und zeigte, wie KI und IoT Umweltlösungen ermöglichen.',
            },
            IoT: {
                'great-britain': 'Presented POT-AI at DataPower (DSRP), highlighting IoT sensing and AI-driven irrigation for sustainability.',
                spain: 'Presenté POT-AI en DataPower (DSRP), destacando sensado IoT y riego con IA para sostenibilidad.',
                italy: 'Ho presentato POT-AI a DataPower (DSRP), evidenziando sensing IoT e irrigazione con IA per la sostenibilità.',
                brazil: 'Apresentei o POT-AI no DataPower (DSRP), destacando sensores IoT e irrigação com IA para sustentabilidade.',
                germany: 'Präsentierte POT-AI bei DataPower (DSRP) mit Fokus auf IoT-Sensorik und KI-Bewässerung für Nachhaltigkeit.',
            },
        },
        icon: 'microphone',
        type: 'speaker',
    },
    {
        image: 'achievements/1551.png',
        title: {
            'great-britain': 'Winner at San Marcos Circular Challenge',
            spain: 'Ganador en el San Marcos Circular Challenge',
            italy: 'Vincitore della San Marcos Circular Challenge',
            brazil: 'Vencedor do San Marcos Circular Challenge',
            germany: 'Gewinner der San Marcos Circular Challenge',
        },
        location: {
            'great-britain': 'Lima, Peru',
            spain: 'Lima, Perú',
            italy: 'Lima, Perù',
            brazil: 'Lima, Peru',
            germany: 'Lima, Peru',
        },
        from: { year: 2023, month: 12 },
        to: { year: 2023, month: 12 },
        description: {
            web: {
                'great-britain': 'Smart Tachito project won first place in the San Marcos Circular Challenge hackathon organized by the 1551 business incubator of UNMSM, meeting the expectations of circular economy, innovation and environmental care.',
                spain: 'Mi proyecto Smart Tachito quedó en primer puesto en la hackathon del San Marcos Circular Challenge organizado por la incubadora de empresas 1551 de la UNMSM, cumpliendo con las expectativas de economía circular, innovación y cuidado del medio ambiente.',
                italy: "Il mio progetto Smart Tachito ha vinto il primo posto nell'hackathon San Marcos Circular Challenge organizzato dall'incubatore di imprese 1551 dell'UNMSM, soddisfacendo le aspettative di economia circolare, innovazione e cura dell'ambiente.",
                brazil: 'Meu projeto Smart Tachito conquistou o primeiro lugar no hackathon San Marcos Circular Challenge organizado pela incubadora de empresas 1551 da UNMSM, atendendo às expectativas de economia circular, inovação e cuidado ambiental.',
                germany: 'Mein Smart Tachito-Projekt gewann den ersten Platz beim San Marcos Circular Challenge-Hackathon, der vom Gründerzentrum 1551 der UNMSM organisiert wurde und die Erwartungen an Kreislaufwirtschaft, Innovation und Umweltschutz erfüllte.',
            },
            Frontend: {
                'great-britain': 'Won 1st place with Smart Tachito, including a web interface for waste classification monitoring.',
                spain: 'Gané el 1er puesto con Smart Tachito, incluyendo una interfaz web para monitoreo de clasificación de residuos.',
                italy: 'Ho vinto il 1° posto con Smart Tachito, inclusa un’interfaccia web per il monitoraggio della classificazione dei rifiuti.',
                brazil: 'Venci o 1º lugar com o Smart Tachito, incluindo uma interface web para monitoramento da classificação de resíduos.',
                germany: '1. Platz mit Smart Tachito, inkl. Web-Oberfläche zur Überwachung der Abfallklassifikation.',
            },
            'Data Science': {
                'great-britain': 'Won 1st place with Smart Tachito using AI to classify waste by type for circular economy goals.',
                spain: 'Gané el 1er puesto con Smart Tachito usando IA para clasificar residuos por tipo con metas de economía circular.',
                italy: 'Ho vinto il 1° posto con Smart Tachito usando l’IA per classificare i rifiuti per tipo con obiettivi di economia circolare.',
                brazil: 'Venci o 1º lugar com o Smart Tachito usando IA para classificar resíduos por tipo com metas de economia circular.',
                germany: '1. Platz mit Smart Tachito durch KI-Klassifikation von Abfällen für Kreislaufwirtschaftsziele.',
            },
            IoT: {
                'great-britain': 'Won 1st place with Smart Tachito, an IoT + AI system for automatic waste classification.',
                spain: 'Gané el 1er puesto con Smart Tachito, un sistema IoT + IA para clasificación automática de residuos.',
                italy: 'Ho vinto il 1° posto con Smart Tachito, un sistema IoT + IA per la classificazione automatica dei rifiuti.',
                brazil: 'Venci o 1º lugar com o Smart Tachito, um sistema IoT + IA para classificação automática de resíduos.',
                germany: '1. Platz mit Smart Tachito, einem IoT+KI-System zur automatischen Abfallklassifikation.',
            },
        },
        icon: 'trophy',
        type: 'award',
    },
    {
        image: 'achievements/fisi.png',
        title: {
            'great-britain': 'Second Place — FISI Anniversary Hackathon',
            spain: 'Segundo puesto — Hackathon aniversario FISI',
            italy: 'Secondo posto — Hackathon anniversario FISI',
            brazil: 'Segundo lugar — Hackathon aniversário FISI',
            germany: 'Zweiter Platz — FISI Jubiläums-Hackathon',
        },
        location: {
            'great-britain': 'Lima, Peru',
            spain: 'Lima, Perú',
            italy: 'Lima, Perù',
            brazil: 'Lima, Peru',
            germany: 'Lima, Peru',
        },
        from: { year: 2023, month: 11 },
        to: { year: 2023, month: 11 },
        description: {
            web: {
                'great-britain': 'Secured 2nd place in the hackathon for the anniversary of the Faculty of Systems Engineering and Informatics of UNMSM with an administrative management project for the same faculty.',
                spain: 'Quedé en 2do lugar en la hackathon por el aniversario de la Facultad de Ingeniería de Sistemas e Informática de la UNMSM con un proyecto de gestión administrativa para la misma facultad.',
                italy: "Ho ottenuto il 2° posto nell'hackathon per l'anniversario della Facoltà di Ingegneria dei Sistemi e Informatica dell'UNMSM con un progetto di gestione amministrativa per la stessa facoltà.",
                brazil: 'Conquistei o 2º lugar no hackathon pelo aniversário da Faculdade de Engenharia de Sistemas e Informática da UNMSM com um projeto de gestão administrativa para a mesma faculdade.',
                germany: 'Erreichte den 2. Platz beim Hackathon zum Jubiläum der Fakultät für Systemtechnik und Informatik der UNMSM mit einem Verwaltungsprojekt für dieselbe Fakultät.',
            },
            Frontend: {
                'great-britain': '2nd place with an administrative management web project for FISI-UNMSM.',
                spain: '2do puesto con un proyecto web de gestión administrativa para FISI-UNMSM.',
                italy: '2° posto con un progetto web di gestione amministrativa per FISI-UNMSM.',
                brazil: '2º lugar com um projeto web de gestão administrativa para FISI-UNMSM.',
                germany: '2. Platz mit einem Web-Verwaltungsprojekt für FISI-UNMSM.',
            },
            Backend: {
                'great-britain': '2nd place with an administrative management system for FISI-UNMSM.',
                spain: '2do puesto con un sistema de gestión administrativa para FISI-UNMSM.',
                italy: '2° posto con un sistema di gestione amministrativa per FISI-UNMSM.',
                brazil: '2º lugar com um sistema de gestão administrativa para FISI-UNMSM.',
                germany: '2. Platz mit einem Verwaltungssystem für FISI-UNMSM.',
            },
        },
        icon: 'medal',
        type: 'award',
    },
];

// ====================================
// Projects
// ====================================
const projects = [
    {
        name: 'SpeakUp',
        subtitle: {
            'great-britain': 'AI glove for Peruvian Sign Language',
            spain: 'Guante IA para Lengua de Señas Peruana',
            italy: 'Guanto IA per la Lingua dei Segni Peruviana',
            brazil: 'Luva de IA para Língua de Sinais Peruana',
            germany: 'KI-Handschuh für peruanische Gebärdensprache',
        },
        from: { year: 2025, month: 8 },
        to: null,
        location: {
            'great-britain': 'Lima, Peru',
            spain: 'Lima, Perú',
            italy: 'Lima, Perù',
            brazil: 'Lima, Peru',
            germany: 'Lima, Peru',
        },
        type: 'thesis',
        website: '#',
        github: '#',
        technologies: ['python', 'tensorflow', 'arduino', 'cpp'],
        description: {
            web: {
                'great-britain': 'Research and development of an intelligent glove that translates Peruvian Sign Language to voice using Artificial Intelligence and Embedded Systems. The device captures finger curvature, position, movement and hand rotation data to recognize both static and dynamic signs, using an LSTM neural network to convert signals to voice and improve communication accessibility for the deaf community.',
                spain: 'Investigación y desarrollo de un guante traductor de Lengua de Señas Peruana a voz con Inteligencia Artificial y Sistemas Embebidos. El dispositivo captura datos de curvatura de dedos, posición, movimiento y giro de mano para reconocer señas estáticas y dinámicas, utilizando una red neuronal LSTM para convertir las señales a voz y mejorar la accesibilidad de comunicación para la comunidad sorda.',
                italy: "Ricerca e sviluppo di un guanto intelligente che traduce la Lingua dei Segni Peruviana in voce utilizzando Intelligenza Artificiale e Sistemi Embedded. Il dispositivo cattura dati di curvatura delle dita, posizione, movimento e rotazione della mano per riconoscere segni statici e dinamici, utilizzando una rete neurale LSTM per convertire i segnali in voce e migliorare l'accessibilità della comunicazione per la comunità sorda.",
                brazil: 'Pesquisa e desenvolvimento de uma luva inteligente que traduz a Língua de Sinais Peruana para voz usando Inteligência Artificial e Sistemas Embarcados. O dispositivo captura dados de curvatura dos dedos, posição, movimento e rotação da mão para reconhecer sinais estáticos e dinâmicos, utilizando uma rede neural LSTM para converter os sinais em voz e melhorar a acessibilidade de comunicação para a comunidade surda.',
                germany: 'Forschung und Entwicklung eines intelligenten Handschuhs, der die peruanische Gebärdensprache mit Künstlicher Intelligenz und Embedded Systems in Sprache übersetzt. Das Gerät erfasst Fingerkrümmung, Position, Bewegung und Handdrehung, um statische und dynamische Zeichen zu erkennen, und verwendet ein LSTM-neuronales Netzwerk zur Umwandlung der Signale in Sprache und zur Verbesserung der Kommunikationszugänglichkeit für die Gehörlosengemeinschaft.',
            },
            'Data Science': {
                'great-britain': 'LSTM neural network that recognizes static and dynamic Peruvian Sign Language gestures from sensor time series and converts them to voice.',
                spain: 'Red neuronal LSTM que reconoce gestos estáticos y dinámicos de Lengua de Señas Peruana a partir de series temporales de sensores y los convierte a voz.',
                italy: 'Rete neurale LSTM che riconosce gesti statici e dinamici della Lingua dei Segni Peruviana da serie temporali di sensori e li converte in voce.',
                brazil: 'Rede neural LSTM que reconhece gestos estáticos e dinâmicos da Língua de Sinais Peruana a partir de séries temporais de sensores e os converte em voz.',
                germany: 'LSTM-Netzwerk zur Erkennung statischer und dynamischer Gesten der peruanischen Gebärdensprache aus Sensor-Zeitreihen und Umwandlung in Sprache.',
            },
            IoT: {
                'great-britain': 'Embedded glove with sensors for finger curvature, motion and rotation, streaming data for on-device and edge AI inference.',
                spain: 'Guante embebido con sensores de curvatura, movimiento y rotación, enviando datos para inferencia de IA en dispositivo y edge.',
                italy: 'Guanto embedded con sensori di curvatura, movimento e rotazione, che invia dati per inferenza IA su device ed edge.',
                brazil: 'Luva embarcada com sensores de curvatura, movimento e rotação, enviando dados para inferência de IA no dispositivo e edge.',
                germany: 'Embedded-Handschuh mit Sensoren für Krümmung, Bewegung und Rotation; Datenstrom für On-Device- und Edge-KI.',
            },
        },
    },
    {
        name: 'SmartTachito',
        subtitle: {
            'great-britain': 'AI + IoT smart waste classifier',
            spain: 'Clasificador inteligente de residuos IA + IoT',
            italy: 'Classificatore rifiuti intelligente IA + IoT',
            brazil: 'Classificador inteligente de resíduos IA + IoT',
            germany: 'Intelligenter Abfallklassifizierer KI + IoT',
        },
        from: { year: 2023, month: 12 },
        to: { year: 2023, month: 12 },
        location: {
            'great-britain': 'Lima, Peru',
            spain: 'Lima, Perú',
            italy: 'Lima, Perù',
            brazil: 'Lima, Peru',
            germany: 'Lima, Peru',
        },
        website: 'https://adminltr.github.io/SmartTachito/',
        github: 'https://github.com/adminLTR/SmartTachito',
        technologies: ['html', 'css', 'javascript', 'django', 'react', 'tailwindcss', 'tensorflow', 'arduino'],
        description: {
            web: {
                'great-britain': 'Integrated software and hardware system using Artificial Intelligence and Internet of Things to automatically classify waste by type. Recognized for its innovation and sustainability, winning first place at the San Marcos Circular Challenge hackathon organized by UNMSM, contributing to environmental care through circular economy principles.',
                spain: 'Sistema integrado de software y hardware que utiliza Inteligencia Artificial e Internet de las Cosas para clasificar residuos de manera automática según su tipo. Reconocido por su innovación y sostenibilidad, ganó el primer puesto en la hackathon San Marcos Circular Challenge organizada por la UNMSM, contribuyendo al cuidado del medio ambiente mediante principios de economía circular.',
                italy: "Sistema integrato software e hardware che utilizza Intelligenza Artificiale e Internet delle Cose per classificare automaticamente i rifiuti per tipo. Riconosciuto per innovazione e sostenibilità, vincitore del primo posto nell'hackathon San Marcos Circular Challenge organizzato dall'UNMSM, contribuisce alla cura dell'ambiente attraverso principi di economia circolare.",
                brazil: 'Sistema integrado de software e hardware que utiliza Inteligência Artificial e Internet das Coisas para classificar resíduos automaticamente por tipo. Reconhecido por sua inovação e sustentabilidade, vencedor do primeiro lugar no hackathon San Marcos Circular Challenge organizado pela UNMSM, contribuindo para o cuidado ambiental através de princípios de economia circular.',
                germany: 'Integriertes Software- und Hardware-System, das Künstliche Intelligenz und Internet der Dinge nutzt, um Abfälle automatisch nach Typ zu klassifizieren. Ausgezeichnet für Innovation und Nachhaltigkeit, Gewinner des ersten Platzes beim San Marcos Circular Challenge Hackathon der UNMSM, trägt durch Prinzipien der Kreislaufwirtschaft zum Umweltschutz bei.',
            },
            Frontend: {
                'great-britain': 'React + Tailwind interface to monitor classification results and interact with the SmartTachito system.',
                spain: 'Interfaz React + Tailwind para monitorear resultados de clasificación e interactuar con SmartTachito.',
                italy: 'Interfaccia React + Tailwind per monitorare i risultati di classificazione e interagire con SmartTachito.',
                brazil: 'Interface React + Tailwind para monitorar resultados de classificação e interagir com o SmartTachito.',
                germany: 'React+Tailwind-Oberfläche zur Überwachung der Klassifikation und Interaktion mit SmartTachito.',
            },
            Backend: {
                'great-britain': 'Django backend integrating device events, classification results and web services for the circular economy prototype.',
                spain: 'Backend Django que integra eventos del dispositivo, resultados de clasificación y servicios web del prototipo de economía circular.',
                italy: 'Backend Django che integra eventi del dispositivo, risultati di classificazione e servizi web del prototipo di economia circolare.',
                brazil: 'Backend Django que integra eventos do dispositivo, resultados de classificação e serviços web do protótipo de economia circular.',
                germany: 'Django-Backend zur Integration von Geräte-Events, Klassifikationsergebnissen und Webservices des Kreislauf-Prototyps.',
            },
            'Data Science': {
                'great-britain': 'TensorFlow model that classifies waste by type to support circular economy goals.',
                spain: 'Modelo TensorFlow que clasifica residuos por tipo para apoyar metas de economía circular.',
                italy: 'Modello TensorFlow che classifica i rifiuti per tipo a supporto degli obiettivi di economia circolare.',
                brazil: 'Modelo TensorFlow que classifica resíduos por tipo para apoiar metas de economia circular.',
                germany: 'TensorFlow-Modell zur Abfallklassifikation nach Typ für Kreislaufwirtschaftsziele.',
            },
            IoT: {
                'great-britain': 'Arduino-based sensing and actuation hardware that feeds the AI classifier for automatic waste sorting.',
                spain: 'Hardware Arduino de sensado y actuación que alimenta el clasificador de IA para el ordenamiento automático de residuos.',
                italy: 'Hardware Arduino di sensing e attuazione che alimenta il classificatore IA per lo smistamento automatico dei rifiuti.',
                brazil: 'Hardware Arduino de sensores e atuação que alimenta o classificador de IA para a separação automática de resíduos.',
                germany: 'Arduino-Hardware für Sensorik und Aktorik als Eingabe für den KI-Klassifizierer zur automatischen Abfalltrennung.',
            },
        },
    },
    {
        name: 'PotAI',
        subtitle: {
            'great-britain': 'AI-powered automated irrigation',
            spain: 'Riego automatizado con IA',
            italy: 'Irrigazione automatizzata con IA',
            brazil: 'Irrigação automatizada com IA',
            germany: 'KI-gesteuerte automatisierte Bewässerung',
        },
        from: { year: 2025, month: 5 },
        to: { year: 2025, month: 5 },
        location: {
            'great-britain': 'Lima, Peru',
            spain: 'Lima, Perú',
            italy: 'Lima, Perù',
            brazil: 'Lima, Peru',
            germany: 'Lima, Peru',
        },
        website: 'https://github.com/adminLTR/PotAI',
        github: 'https://github.com/adminLTR/PotAI',
        technologies: ['html', 'css', 'javascript', 'django', 'bootstrap', 'arduino', 'python'],
        description: {
            web: {
                'great-britain': 'Intelligent automated irrigation system using environmental sensors and an AI model to calculate the exact amount of water each plant needs. The system optimizes water consumption according to plant species and environmental conditions, integrating IoT hardware and a software-controlled water pump to reduce waste and promote efficient resource care, with a user application for monitoring and control.',
                spain: 'Sistema inteligente de riego automatizado que utiliza sensores ambientales y un modelo de IA para calcular la cantidad exacta de agua que cada planta necesita. El sistema optimiza el consumo hídrico según la especie de planta y las condiciones del entorno, integrando hardware IoT y una bomba de agua controlada por software para reducir el desperdicio y promover el cuidado eficiente de recursos, con una aplicación de usuario para monitoreo y control.',
                italy: "Sistema intelligente di irrigazione automatizzato che utilizza sensori ambientali e un modello di IA per calcolare la quantità esatta di acqua di cui ogni pianta ha bisogno. Il sistema ottimizza il consumo idrico in base alla specie di pianta e alle condizioni ambientali, integrando hardware IoT e una pompa dell'acqua controllata da software per ridurre gli sprechi e promuovere la cura efficiente delle risorse, con un'applicazione utente per monitoraggio e controllo.",
                brazil: 'Sistema inteligente de irrigação automatizado que utiliza sensores ambientais e um modelo de IA para calcular a quantidade exata de água que cada planta precisa. O sistema otimiza o consumo de água de acordo com a espécie da planta e as condições ambientais, integrando hardware IoT e uma bomba de água controlada por software para reduzir o desperdício e promover o cuidado eficiente de recursos, com uma aplicação de usuário para monitoramento e controle.',
                germany: 'Intelligentes automatisiertes Bewässerungssystem, das Umweltsensoren und ein KI-Modell verwendet, um die genaue Wassermenge zu berechnen, die jede Pflanze benötigt. Das System optimiert den Wasserverbrauch entsprechend der Pflanzenart und den Umgebungsbedingungen, integriert IoT-Hardware und eine softwaregesteuerte Wasserpumpe zur Reduzierung von Verschwendung und Förderung effizienter Ressourcenpflege, mit einer Benutzeranwendung zur Überwachung und Steuerung.',
            },
            Frontend: {
                'great-britain': 'User application to monitor sensors and control irrigation schedules.',
                spain: 'Aplicación de usuario para monitorear sensores y controlar horarios de riego.',
                italy: "Applicazione utente per monitorare i sensori e controllare gli orari di irrigazione.",
                brazil: 'Aplicação de usuário para monitorar sensores e controlar horários de irrigação.',
                germany: 'Benutzeranwendung zur Sensorüberwachung und Steuerung der Bewässerungszeiten.',
            },
            Backend: {
                'great-britain': 'Django services coordinating sensor data, AI recommendations and pump control.',
                spain: 'Servicios Django que coordinan datos de sensores, recomendaciones de IA y control de bomba.',
                italy: 'Servizi Django che coordinano dati dei sensori, raccomandazioni IA e controllo della pompa.',
                brazil: 'Serviços Django que coordenam dados de sensores, recomendações de IA e controle da bomba.',
                germany: 'Django-Dienste zur Koordination von Sensordaten, KI-Empfehlungen und Pumpensteuerung.',
            },
            'Data Science': {
                'great-britain': 'AI model that estimates the exact water volume needed per plant species and environment.',
                spain: 'Modelo de IA que estima el volumen exacto de agua según especie y entorno.',
                italy: 'Modello di IA che stima il volume esatto di acqua in base a specie e ambiente.',
                brazil: 'Modelo de IA que estima o volume exato de água conforme espécie e ambiente.',
                germany: 'KI-Modell zur Schätzung der genauen Wassermenge je Pflanzenart und Umgebung.',
            },
            IoT: {
                'great-britain': 'Environmental sensors and software-controlled pump hardware for automated irrigation.',
                spain: 'Sensores ambientales y bomba controlada por software para riego automatizado.',
                italy: 'Sensori ambientali e pompa controllata da software per irrigazione automatizzata.',
                brazil: 'Sensores ambientais e bomba controlada por software para irrigação automatizada.',
                germany: 'Umweltsensoren und softwaregesteuerte Pumpe für automatisierte Bewässerung.',
            },
        },
    },
    {
        name: 'Teslab',
        subtitle: {
            'great-britain': 'Multipurpose syntax analyzer',
            spain: 'Analizador sintáctico multipropósito',
            italy: 'Analizzatore sintattico multipurpose',
            brazil: 'Analisador sintático multipropósito',
            germany: 'Multifunktionaler Syntax-Analysator',
        },
        website: 'https://splendid-dodol-d107f1.netlify.app/',
        github: 'https://github.com/adminLTR/Teslab',
        technologies: ['html', 'css', 'javascript', 'react', 'tailwindcss'],
        description: {
            web: {
                'great-britain': 'Multipurpose syntax analyzer capable of solving complex mathematical operations. The application utilizes sophisticated data structures and algorithms built from scratch to provide accurate parsing and computation of mathematical expressions.',
                spain: 'Analizador sintáctico multipropósito capaz de resolver operaciones matemáticas complejas. La aplicación utiliza estructuras de datos y algoritmos sofisticados construidos desde cero para proporcionar análisis y cálculo preciso de expresiones matemáticas.',
                italy: "Analizzatore sintattico multipurpose capace di risolvere operazioni matematiche complesse. L'applicazione utilizza strutture dati e algoritmi sofisticati costruiti da zero per fornire analisi e calcolo preciso di espressioni matematiche.",
                brazil: 'Analisador sintático multipropósito capaz de resolver operações matemáticas complexas. A aplicação utiliza estruturas de dados e algoritmos sofisticados construídos do zero para fornecer análise e cálculo preciso de expressões matemáticas.',
                germany: 'Multifunktionaler Syntax-Analysator zur Lösung komplexer mathematischer Operationen. Die Anwendung verwendet ausgeklügelte Datenstrukturen und Algorithmen, die von Grund auf entwickelt wurden, um präzise Analyse und Berechnung mathematischer Ausdrücke zu ermöglichen.',
            },
            Frontend: {
                'great-britain': 'React + Tailwind app for parsing and computing mathematical expressions with a clean UI.',
                spain: 'App React + Tailwind para analizar y calcular expresiones matemáticas con una UI limpia.',
                italy: 'App React + Tailwind per analizzare e calcolare espressioni matematiche con UI pulita.',
                brazil: 'App React + Tailwind para analisar e calcular expressões matemáticas com UI limpa.',
                germany: 'React+Tailwind-App zum Parsen und Berechnen mathematischer Ausdrücke mit klarer UI.',
            },
            Backend: {
                'great-britain': 'Custom data structures and algorithms from scratch for accurate expression parsing and evaluation.',
                spain: 'Estructuras de datos y algoritmos propios desde cero para el análisis y evaluación precisos de expresiones.',
                italy: 'Strutture dati e algoritmi custom da zero per parsing e valutazione accurati delle espressioni.',
                brazil: 'Estruturas de dados e algoritmos próprios do zero para análise e avaliação precisas de expressões.',
                germany: 'Eigene Datenstrukturen und Algorithmen von Grund auf für präzises Parsen und Auswerten von Ausdrücken.',
            },
        },
    },
    {
        name: 'ParisCorp',
        subtitle: {
            'great-britain': 'Course platform with auth & REST',
            spain: 'Plataforma de cursos con auth y REST',
            italy: 'Piattaforma corsi con auth e REST',
            brazil: 'Plataforma de cursos com auth e REST',
            germany: 'Kursplattform mit Auth & REST',
        },
        website: 'https://paris-corp.netlify.app/login',
        github: 'https://github.com/adminLTR/test-frontend-dev',
        technologies: ['html', 'css', 'javascript', 'react', 'bootstrap', 'sass', 'python', 'flask'],
        description: {
            web: {
                'great-britain': 'Responsive interface for a course platform featuring secure token-based authentication and REST API integration. The application provides a seamless user experience for browsing and managing educational content with modern web technologies.',
                spain: 'Interfaz responsiva para una plataforma de cursos con autenticación segura basada en tokens e integración de API REST. La aplicación proporciona una experiencia de usuario fluida para navegar y gestionar contenido educativo con tecnologías web modernas.',
                italy: "Interfaccia responsiva per una piattaforma di corsi con autenticazione sicura basata su token e integrazione API REST. L'applicazione fornisce un'esperienza utente fluida per navigare e gestire contenuti educativi con tecnologie web moderne.",
                brazil: 'Interface responsiva para uma plataforma de cursos com autenticação segura baseada em tokens e integração de API REST. A aplicação oferece uma experiência de usuário fluida para navegar e gerenciar conteúdo educacional com tecnologias web modernas.',
                germany: 'Responsive Benutzeroberfläche für eine Kursplattform mit sicherer tokenbasierter Authentifizierung und REST-API-Integration. Die Anwendung bietet eine nahtlose Benutzererfahrung zum Durchsuchen und Verwalten von Bildungsinhalten mit modernen Webtechnologien.',
            },
            Frontend: {
                'great-britain': 'Responsive React UI with Bootstrap/SASS for browsing and managing course content.',
                spain: 'UI React responsiva con Bootstrap/SASS para navegar y gestionar contenido de cursos.',
                italy: 'UI React responsive con Bootstrap/SASS per navigare e gestire contenuti dei corsi.',
                brazil: 'UI React responsiva com Bootstrap/SASS para navegar e gerenciar conteúdo de cursos.',
                germany: 'Responsive React-UI mit Bootstrap/SASS zum Durchsuchen und Verwalten von Kursinhalten.',
            },
            Backend: {
                'great-britain': 'Flask REST API with secure token-based authentication for the course platform.',
                spain: 'API REST con Flask y autenticación segura basada en tokens para la plataforma de cursos.',
                italy: 'API REST con Flask e autenticazione sicura basata su token per la piattaforma corsi.',
                brazil: 'API REST com Flask e autenticação segura baseada em tokens para a plataforma de cursos.',
                germany: 'Flask-REST-API mit sicherer tokenbasierter Authentifizierung für die Kursplattform.',
            },
        },
    },
];

// ====================================
// Skills: abilities (lists) + tools (tech icons on web)
// abilities[area|web][lang] = string[]
// ====================================
const skills = {
    abilities: {
        web: {
            'great-britain': [
                'Leadership and teamwork',
                'Self-taught learning',
                'Problem solving',
                'Clear technical communication',
                'Multilingual collaboration (6 languages)',
            ],
            spain: [
                'Liderazgo y trabajo en equipo',
                'Aprendizaje autodidacta',
                'Resolución de problemas',
                'Comunicación técnica clara',
                'Colaboración multilingüe (6 idiomas)',
            ],
            italy: [
                'Leadership e lavoro di squadra',
                'Apprendimento autodidatta',
                'Problem solving',
                'Comunicazione tecnica chiara',
                'Collaborazione multilingue (6 lingue)',
            ],
            brazil: [
                'Liderança e trabalho em equipe',
                'Aprendizado autodidata',
                'Resolução de problemas',
                'Comunicação técnica clara',
                'Colaboração multilíngue (6 idiomas)',
            ],
            germany: [
                'Führung und Teamarbeit',
                'Autodidaktisches Lernen',
                'Problemlösung',
                'Klare technische Kommunikation',
                'Mehrsprachige Zusammenarbeit (6 Sprachen)',
            ],
        },
        Frontend: {
            'great-britain': [
                'Responsive UI development',
                'Component-driven architecture',
                'Accessibility awareness',
                'Design-to-code workflow',
            ],
            spain: [
                'Desarrollo de UI responsiva',
                'Arquitectura orientada a componentes',
                'Conciencia de accesibilidad',
                'Flujo de diseño a código',
            ],
            italy: [
                'Sviluppo UI responsive',
                'Architettura component-driven',
                'Attenzione all’accessibilità',
                'Workflow design-to-code',
            ],
            brazil: [
                'Desenvolvimento de UI responsiva',
                'Arquitetura orientada a componentes',
                'Atenção à acessibilidade',
                'Fluxo design-to-code',
            ],
            germany: [
                'Responsive UI-Entwicklung',
                'Komponentenbasierte Architektur',
                'Barrierefreiheit im Blick',
                'Design-to-Code-Workflow',
            ],
        },
        Backend: {
            'great-britain': [
                'API design and integration',
                'Relational data modeling',
                'Authentication & security basics',
                'Automation and scripting',
            ],
            spain: [
                'Diseño e integración de APIs',
                'Modelado de datos relacionales',
                'Autenticación y bases de seguridad',
                'Automatización y scripting',
            ],
            italy: [
                'Progettazione e integrazione di API',
                'Modellazione dati relazionali',
                'Autenticazione e basi di sicurezza',
                'Automazione e scripting',
            ],
            brazil: [
                'Design e integração de APIs',
                'Modelagem de dados relacionais',
                'Autenticação e bases de segurança',
                'Automação e scripting',
            ],
            germany: [
                'API-Design und Integration',
                'Relationale Datenmodellierung',
                'Authentifizierung & Sicherheitsgrundlagen',
                'Automatisierung und Scripting',
            ],
        },
        'Data Science': {
            'great-britain': [
                'Supervised learning prototypes',
                'Data cleaning and feature prep',
                'Model evaluation basics',
                'Insight communication',
            ],
            spain: [
                'Prototipos de aprendizaje supervisado',
                'Limpieza de datos y features',
                'Bases de evaluación de modelos',
                'Comunicación de insights',
            ],
            italy: [
                'Prototipi di apprendimento supervisionato',
                'Pulizia dati e feature prep',
                'Basi di valutazione dei modelli',
                'Comunicazione degli insight',
            ],
            brazil: [
                'Protótipos de aprendizado supervisionado',
                'Limpeza de dados e features',
                'Bases de avaliação de modelos',
                'Comunicação de insights',
            ],
            germany: [
                'Überwachte Lernprototypen',
                'Datenbereinigung und Feature-Prep',
                'Grundlagen der Modellevaluation',
                'Kommunikation von Insights',
            ],
        },
        IoT: {
            'great-britain': [
                'Sensor integration',
                'Embedded prototyping',
                'Hardware–software bridging',
                'Edge data acquisition',
            ],
            spain: [
                'Integración de sensores',
                'Prototipado embebido',
                'Puente hardware–software',
                'Adquisición de datos en edge',
            ],
            italy: [
                'Integrazione di sensori',
                'Prototipazione embedded',
                'Bridging hardware–software',
                'Acquisizione dati edge',
            ],
            brazil: [
                'Integração de sensores',
                'Prototipagem embarcada',
                'Ponte hardware–software',
                'Aquisição de dados em edge',
            ],
            germany: [
                'Sensorintegration',
                'Embedded-Prototyping',
                'Hardware–Software-Brücke',
                'Edge-Datenerfassung',
            ],
        },
    },
    tools: {
        Frontend: [
            'HTML', 'CSS', 'JavaScript', 'React', 'JQuery',
            'Figma', 'Bootstrap', 'TailwindCSS', 'SASS',
        ],
        Backend: [
            'PHP', 'Python', 'Laravel', 'Django',
            'MySQL', 'PostgreSQL', 'Flask', 'ExpressJS',
        ],
        'Data Science': [
            'Keras', 'Excel', 'Tensorflow', 'MySQL', 'PostgreSQL', 'VBA',
        ],
        IoT: [
            'Arduino', 'ESP32', 'C++', 'Sensors',
        ],
    },
};

// Alias used by existing render helpers
const areas = skills.tools;

// ====================================
// Education
// ====================================
const education = [
    {
        university: 'Universidad Nacional Mayor de San Marcos',
        acronym: 'UNMSM',
        logo: 'unmsm',
        career: {
            'great-britain': 'Software Engineering',
            spain: 'Ingeniería de Software',
            italy: 'Ingegneria del Software',
            brazil: 'Engenharia de Software',
            germany: 'Software-Engineering',
        },
        faculty: {
            'great-britain': 'Faculty of Systems Engineering and Informatics',
            spain: 'Facultad de Ingeniería de Sistemas e Informática',
            italy: 'Facoltà di Ingegneria dei Sistemi e Informatica',
            brazil: 'Faculdade de Engenharia de Sistemas e Informática',
            germany: 'Fakultät für Systemtechnik und Informatik',
        },
        location: {
            'great-britain': 'Lima, Peru',
            spain: 'Lima, Perú',
            italy: 'Lima, Perù',
            brazil: 'Lima, Peru',
            germany: 'Lima, Peru',
        },
        from: { year: 2022 },
        to: null,
        description: {
            web: {
                'great-britain': 'Undergraduate Software Engineering program focused on full-stack development, systems design and applied computing projects.',
                spain: 'Carrera de Ingeniería de Software enfocada en desarrollo full-stack, diseño de sistemas y proyectos de computación aplicada.',
                italy: 'Percorso di Ingegneria del Software incentrato su sviluppo full-stack, design di sistemi e progetti di computing applicato.',
                brazil: 'Curso de Engenharia de Software focado em desenvolvimento full-stack, design de sistemas e projetos de computação aplicada.',
                germany: 'Software-Engineering-Studium mit Fokus auf Full-Stack-Entwicklung, Systemdesign und angewandte Computing-Projekte.',
            },
            Frontend: {
                'great-britain': 'Software Engineering studies with strong focus on web interfaces, UX and modern frontend stacks.',
                spain: 'Estudios de Ingeniería de Software con fuerte enfoque en interfaces web, UX y stacks frontend modernos.',
                italy: 'Studi di Ingegneria del Software con forte focus su interfacce web, UX e stack frontend moderni.',
                brazil: 'Estudos de Engenharia de Software com forte foco em interfaces web, UX e stacks frontend modernas.',
                germany: 'Software-Engineering-Studium mit starkem Fokus auf Web-Oberflächen, UX und moderne Frontend-Stacks.',
            },
            Backend: {
                'great-britain': 'Software Engineering studies emphasizing APIs, databases and scalable system architectures.',
                spain: 'Estudios de Ingeniería de Software enfatizando APIs, bases de datos y arquitecturas de sistemas escalables.',
                italy: 'Studi di Ingegneria del Software con enfasi su API, database e architetture di sistemi scalabili.',
                brazil: 'Estudos de Engenharia de Software com ênfase em APIs, bancos de dados e arquiteturas de sistemas escaláveis.',
                germany: 'Software-Engineering-Studium mit Schwerpunkt auf APIs, Datenbanken und skalierbaren Systemarchitekturen.',
            },
            'Data Science': {
                'great-britain': 'Software Engineering studies applying data analysis and ML concepts in academic and personal projects.',
                spain: 'Estudios de Ingeniería de Software aplicando análisis de datos y conceptos de ML en proyectos académicos y personales.',
                italy: 'Studi di Ingegneria del Software applicando analisi dati e concetti di ML in progetti accademici e personali.',
                brazil: 'Estudos de Engenharia de Software aplicando análise de dados e conceitos de ML em projetos acadêmicos e pessoais.',
                germany: 'Software-Engineering-Studium mit Anwendung von Datenanalyse und ML-Konzepten in akademischen und persönlichen Projekten.',
            },
            IoT: {
                'great-britain': 'Software Engineering studies with applied work on embedded systems, sensors and connected devices.',
                spain: 'Estudios de Ingeniería de Software con trabajo aplicado en sistemas embebidos, sensores y dispositivos conectados.',
                italy: 'Studi di Ingegneria del Software con lavoro applicato su sistemi embedded, sensori e dispositivi connessi.',
                brazil: 'Estudos de Engenharia de Software com trabalho aplicado em sistemas embarcados, sensores e dispositivos conectados.',
                germany: 'Software-Engineering-Studium mit angewandter Arbeit an Embedded Systems, Sensoren und vernetzten Geräten.',
            },
        },
        type: 'degree',
    },
    {
        university: 'Alma Mater — Università di Bologna',
        acronym: 'Unibo',
        logo: 'unibo',
        career: {
            'great-britain': 'Student Exchange Program',
            spain: 'Intercambio Estudiantil',
            italy: 'Programma di Scambio Studentesco',
            brazil: 'Programa de Intercâmbio Estudantil',
            germany: 'Studentenaustauschprogramm',
        },
        location: {
            'great-britain': 'Bologna, Italy',
            spain: 'Bolonia, Italia',
            italy: 'Bologna, Italia',
            brazil: 'Bolonha, Itália',
            germany: 'Bologna, Italien',
        },
        from: { year: 2026 },
        to: { year: 2026 },
        description: {
            web: {
                'great-britain': 'International student exchange at the University of Bologna to broaden academic and cultural perspectives in computing.',
                spain: 'Intercambio estudiantil internacional en la Universidad de Bolonia para ampliar perspectivas académicas y culturales en computación.',
                italy: "Scambio studentesco internazionale presso l'Università di Bologna per ampliare prospettive accademiche e culturali nell'informatica.",
                brazil: 'Intercâmbio estudantil internacional na Universidade de Bolonha para ampliar perspectivas acadêmicas e culturais em computação.',
                germany: 'Internationaler Studentenaustausch an der Universität Bologna zur Erweiterung akademischer und kultureller Perspektiven in der Informatik.',
            },
            Frontend: {
                'great-britain': 'Exchange program strengthening international collaboration and frontend engineering perspective.',
                spain: 'Programa de intercambio que fortalece la colaboración internacional y la perspectiva de ingeniería frontend.',
                italy: 'Programma di scambio che rafforza la collaborazione internazionale e la prospettiva di ingegneria frontend.',
                brazil: 'Programa de intercâmbio que fortalece a colaboração internacional e a perspectiva de engenharia frontend.',
                germany: 'Austauschprogramm zur Stärkung internationaler Zusammenarbeit und Frontend-Engineering-Perspektive.',
            },
            Backend: {
                'great-britain': 'Exchange program strengthening international collaboration and backend systems perspective.',
                spain: 'Programa de intercambio que fortalece la colaboración internacional y la perspectiva de sistemas backend.',
                italy: 'Programma di scambio che rafforza la collaborazione internazionale e la prospettiva sui sistemi backend.',
                brazil: 'Programa de intercâmbio que fortalece a colaboração internacional e a perspectiva de sistemas backend.',
                germany: 'Austauschprogramm zur Stärkung internationaler Zusammenarbeit und Backend-Systemperspektive.',
            },
            'Data Science': {
                'great-britain': 'Exchange program strengthening international collaboration and data-oriented academic exposure.',
                spain: 'Programa de intercambio que fortalece la colaboración internacional y la exposición académica orientada a datos.',
                italy: 'Programma di scambio che rafforza la collaborazione internazionale e l’esposizione accademica orientata ai dati.',
                brazil: 'Programa de intercâmbio que fortalece a colaboração internacional e a exposição acadêmica orientada a dados.',
                germany: 'Austauschprogramm zur Stärkung internationaler Zusammenarbeit und datenorientierter akademischer Erfahrung.',
            },
            IoT: {
                'great-britain': 'Exchange program strengthening international collaboration and embedded/IoT academic exposure.',
                spain: 'Programa de intercambio que fortalece la colaboración internacional y la exposición académica en embebidos/IoT.',
                italy: 'Programma di scambio che rafforza la collaborazione internazionale e l’esposizione accademica su embedded/IoT.',
                brazil: 'Programa de intercâmbio que fortalece a colaboração internacional e a exposição acadêmica em embarcados/IoT.',
                germany: 'Austauschprogramm zur Stärkung internationaler Zusammenarbeit und akademischer Embedded/IoT-Erfahrung.',
            },
        },
        type: 'exchange',
    },
];

// ====================================
// UI copy (navigation, labels, modal)
// ====================================
const info = {
    'great-britain': {
        links: {
            home: 'home',
            about: 'about me',
            projects: 'projects',
            experience: 'experience',
            volunteer: 'volunteer',
            achievements: 'achievements',
            skills: 'skills',
            languages: 'languages',
            education: 'education',
            presentation: 'presentation',
        },
        career: 'Software Engineering Student',
        download: 'Download my CV',
        overview: 'Overview:',
        technologies: 'Technologies:',
        tools: 'Tools',
        abilities: 'Abilities',
        modal: {
            title: 'Download CV',
            subtitle: 'Choose the area version of your CV',
            cancel: 'Cancel',
            confirm: 'Download PDF',
        },
        loadingPdf: 'Generating PDF... Please wait',
    },
    spain: {
        links: {
            home: 'inicio',
            about: 'sobre mi',
            projects: 'proyectos',
            experience: 'experiencia',
            volunteer: 'voluntariado',
            achievements: 'reconocimientos',
            skills: 'habilidades',
            languages: 'idiomas',
            education: 'educación',
            presentation: 'presentación',
        },
        career: 'Estudiante de Ingeniería de Software',
        download: 'Descarga mi CV',
        overview: 'Descripción:',
        technologies: 'Tecnologías:',
        tools: 'Herramientas',
        abilities: 'Habilidades',
        modal: {
            title: 'Descargar CV',
            subtitle: 'Elige la versión del CV por área',
            cancel: 'Cancelar',
            confirm: 'Descargar PDF',
        },
        loadingPdf: 'Generando PDF... Por favor espera',
    },
    brazil: {
        links: {
            home: 'inicio',
            about: 'sobre mim',
            projects: 'projetos',
            experience: 'experiência',
            volunteer: 'voluntariado',
            achievements: 'reconhecimentos',
            skills: 'habilidades',
            languages: 'idiomas',
            education: 'educação',
            presentation: 'apresentação',
        },
        career: 'Aluno de Engenharia de Software',
        download: 'Baixa meu CV',
        overview: 'Visão geral:',
        technologies: 'Tecnologias:',
        tools: 'Ferramentas',
        abilities: 'Habilidades',
        modal: {
            title: 'Baixar CV',
            subtitle: 'Escolha a versão do CV por área',
            cancel: 'Cancelar',
            confirm: 'Baixar PDF',
        },
        loadingPdf: 'Gerando PDF... Por favor aguarde',
    },
    italy: {
        links: {
            home: 'home',
            about: 'su di me',
            projects: 'progetti',
            experience: 'esperienza',
            volunteer: 'volontariato',
            achievements: 'riconoscimenti',
            skills: 'competenze',
            languages: 'lingue',
            education: 'istruzione',
            presentation: 'presentazione',
        },
        career: 'Studente di Ingegneria del Software',
        download: 'Scarica il mio CV',
        overview: 'Panoramica:',
        technologies: 'Tecnologie:',
        tools: 'Strumenti',
        abilities: 'Competenze',
        modal: {
            title: 'Scarica CV',
            subtitle: 'Scegli la versione del CV per area',
            cancel: 'Annulla',
            confirm: 'Scarica PDF',
        },
        loadingPdf: 'Generazione PDF... Attendere',
    },
    germany: {
        links: {
            home: 'Heim',
            about: 'über mich',
            projects: 'Projekte',
            experience: 'Erfahrung',
            volunteer: 'Freiwilligenarbeit',
            achievements: 'Auszeichnungen',
            skills: 'Fähigkeiten',
            languages: 'Sprachen',
            education: 'Ausbildung',
            presentation: 'Vorstellung',
        },
        career: 'Student der Softwareentwicklung',
        download: 'Meinen Lebenslauf herunterladen',
        overview: 'Übersicht:',
        technologies: 'Technologien:',
        tools: 'Werkzeuge',
        abilities: 'Fähigkeiten',
        modal: {
            title: 'Lebenslauf herunterladen',
            subtitle: 'Wähle die CV-Version nach Bereich',
            cancel: 'Abbrechen',
            confirm: 'PDF herunterladen',
        },
        loadingPdf: 'PDF wird erzeugt... Bitte warten',
    },
};
