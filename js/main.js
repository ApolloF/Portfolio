/* ===== Portfolio JS - Florian Greeven ===== */

const DEFAULT_LANGUAGE = 'nl';
const LANGUAGE_STORAGE_KEY = 'portfolio-language';
let activeLanguage = DEFAULT_LANGUAGE;
let typingTimer = null;

const TYPING_PHRASES = {
  nl: ['Maker & bouwer', 'Systeembeheerder', 'Student Bedrijfskunde', '3D-print enthousiast'],
  en: ['Maker & Builder', 'System Administrator', 'Business Student', '3D Print Enthusiast']
};

const TRANSLATIONS = {
  nl: {
    'meta.title': 'Florian Greeven - Praktische maker & systeembeheerder',
    'meta.description': 'Portfolio van Florian Greeven - praktische maker, systeembeheerder en student Bedrijfskunde in Groningen. Projecten in 3D-printen, elektronica, infrastructuur en fabricage.',
    'meta.ogDescription': 'Portfolio van Florian Greeven - 3D-printen, CAD-ontwerp, elektronica, infrastructuur en praktische fabricage.',
    'menu.toggle': 'Menu openen',
    'language.group': 'Taal kiezen',
    'nav.about': 'Over mij',
    'nav.skills': 'Vaardigheden',
    'nav.projects': 'Projecten',
    'nav.experience': 'Ervaring',
    'nav.contact': 'Contact',
    'cta.contact': 'Contact',
    'cta.cv': 'Bekijk CV',
    'about.title': 'Over mij',
    'about.p1': 'Ik ben Florian, een Nederlandse maker en systeembeheerder die momenteel <strong>Bedrijfskunde</strong> studeert aan de <strong>Rijksuniversiteit Groningen</strong>.',
    'about.p2': 'Ik werk graag op het snijvlak van digitaal en fysiek maken. Of het nu gaat om custom simracingpedalen ontwerpen en 3D-printen met Arduino-gebaseerde load cells, self-hosted serverinfrastructuur beheren, of bouwen met hout en metaal: ik haal energie uit ideeen omzetten in werkende realiteit.',
    'about.p3': 'Met praktische ervaring in 3D-printen, CAD-ontwerp, elektronica, systeembeheer en bedrijfsvoering breng ik een nuchtere mix van technische vaardigheid, eigenaarschap en probleemoplossend vermogen mee.',
    'about.p4': 'Ik ben Nederlands en spreek Nederlands, Duits en Engels. Ik heb in Duitsland gewoond en in Nederland gestudeerd.',
    'about.highlightsLabel': 'Portfolio highlights',
    'about.highlight1.title': 'Van idee tot werkend prototype',
    'about.highlight1.text': 'Prototyping van CAD naar werkende hardware',
    'about.highlight2.title': 'Altijd draaiend',
    'about.highlight2.text': 'Homelab, Docker-services en Home Assistant',
    'about.highlight3.title': 'Bedrijfsvoering',
    'about.highlight3.text': 'Boekhouding, hospitality en administratie',
    'details.location.label': 'Locatie',
    'details.languages.label': 'Talen',
    'details.languages.value': 'Nederlands, Duits, Engels',
    'details.education.label': 'Opleiding',
    'details.education.value': 'Bedrijfskunde, RUG',
    'details.email.label': 'E-mail',
    'contact.emailLabel': 'E-mail',
    'skills.title': 'Vaardigheden',
    'skills.fabrication.title': 'Digitale fabricage',
    'skills.fabrication.printing': '3D-printen (FDM)',
    'skills.fabrication.prototyping': 'Rapid prototyping',
    'skills.fabrication.cad': 'CAD-ontwerp',
    'skills.fabrication.laser': 'Lasersnijden',
    'skills.fabrication.printerAlt': '3D-printer in de werkplaats',
    'skills.fabrication.laserAlt': 'Lasersnijder in de werkplaats',
    'skills.electronics.title': 'Elektronica & code',
    'skills.electronics.arduino': 'Arduino & microcontrollers',
    'skills.electronics.sensors': 'Sensorintegratie',
    'skills.electronics.circuits': 'Circuitontwerp & solderen',
    'skills.infrastructure.title': 'IT & infrastructuur',
    'skills.infrastructure.linux': 'Linux-beheer',
    'skills.infrastructure.homelab': 'Servers & homelab',
    'skills.infrastructure.docker': 'Docker & netwerken',
    'skills.craft.title': 'Maken & ambacht',
    'skills.craft.wood': 'Houtbewerking',
    'skills.craft.construction': 'Constructie & fabricage',
    'skills.craft.vr': 'VR-technologie',
    'skills.operations.title': 'Operatie & bedrijf',
    'skills.operations.hospitality': 'Hospitality-operaties',
    'skills.operations.bookkeeping': 'Boekhouding & administratie',
    'skills.operations.guests': 'Gastenservice',
    'skills.operations.finance': 'Financiele planning',
    'level.strong': 'Sterk',
    'level.functional': 'Functionele onderdelen',
    'level.handsOn': 'Praktisch',
    'level.experienced': 'Ervaren',
    'projects.title': 'Projecten',
    'projects.pedals.title': 'Custom simracingpedalen',
    'projects.pedals.desc': 'Custom load-cell rempedalen voor simracing ontworpen en gebouwd. Het volledige traject gedaan: CAD-modellering, 3D-printen, Arduino-elektronica, sensorkalibratie en eigen firmware.',
    'projects.pedals.alt1': 'Complete custom simracingpedaalopstelling',
    'projects.pedals.alt2': 'Arduino-elektronica en custom 3D-geprinte behuizing voor simracingpedalen',
    'projects.pedals.alt3': 'Veer- en load-cellmechanisme van custom simracingpedalen',
    'projects.homelab.title': 'Homelab-infrastructuur',
    'projects.homelab.desc': 'Serverinfrastructuur op twee locaties gebouwd en onderhouden met Proxmox-virtualisatie, Docker-services, backups en monitoring. Self-hosted media, development, surveillance, persoonlijke webapplicaties en een huis dat draait op Home Assistant.',
    'projects.homelab.alt': "Proxmox-dashboard met homelab-VM's en containers",
    'projects.surveillance.title': 'AI-surveillancesysteem',
    'projects.surveillance.desc': 'Frigate NVR met YOLOv5 AI-objectdetectie opgezet voor real-time beveiligingsmonitoring. Een multi-camera setup gebouwd met slimme meldingen, event recording en netwerkopslag binnen het homelab.',
    'projects.surveillance.alt': "AI-camera feed die 's nachts een persoon detecteert",
    'projects.bgrid.desc': "Een draagbare demonstratiekit ontwikkeld voor bGrid's indoor positioning en smart building technology. Custom CAD-prototypes gemaakt met lasersnijden en 3D-printen, zodat stakeholders het concept direct konden vasthouden en testen.",
    'projects.bgrid.alt': 'bGrid-demokit met lasergesneden behuizing en elektronica',
    'projects.plant.title': 'Stressgestuurde plantenbewatering',
    'projects.plant.desc': 'Een interactief plantenbewateringsprototype gebouwd dat reageerde op elektronisch gemeten stressniveaus van de gebruiker. Arduino-sensoren, eigen code, 3D-geprinte behuizingen en fysieke prototyping gecombineerd tot een speels geautomatiseerd systeem.',
    'projects.plant.alt1': 'Stressgestuurd plantenbewateringsprototype met Arduino-elektronica',
    'projects.plant.alt2': 'Plantenbewateringsprototype met 3D-geprinte onderdelen en plant',
    'projects.wood.title': 'Houtbewerking & constructie',
    'projects.wood.desc': 'Houtbewerkings- en constructieprojecten uitgevoerd, van custom meubels tot grotere structurele builds. Planning, materiaalkeuze, werkplaatsinrichting en hands-on fabricage gecombineerd met aandacht voor afwerking en duurzaamheid.',
    'projects.wood.alt1': 'Afgewerkte houtwerkplaats met werkbanken en gereedschap',
    'projects.wood.alt2': 'Houten schuur en overkapping tijdens de bouw',
    'projects.wood.alt3': 'Afwerking van een custom houten live-edge tafel',
    'tag.printing': '3D-printen',
    'tag.electronics': 'Elektronica',
    'tag.networking': 'Netwerken',
    'tag.selfHosting': 'Self-hosting',
    'tag.prototyping': 'Prototyping',
    'tag.sensors': 'Sensoren',
    'tag.woodworking': 'Houtbewerking',
    'tag.design': 'Ontwerp',
    'tag.fabrication': 'Fabricage',
    'experience.title': 'Ervaring',
    'experience.restaurant.date': 'Ongeveer 2 jaar',
    'experience.restaurant.title': 'Restaurant- & Airbnb-operaties',
    'experience.restaurant.company': 'Familiebedrijf',
    'experience.restaurant.li1': 'Volledige administratie en boekhouding beheerd',
    'experience.restaurant.li2': 'Complete digitale infrastructuur ontworpen en geinstalleerd',
    'experience.restaurant.li3': 'Gastenservice en hospitality-operaties gecoordineerd',
    'experience.restaurant.li4': 'Ondersteund bij bediening en keukenwerkzaamheden',
    'experience.it.date': 'Doorlopend',
    'experience.it.title': 'IT-support & elektronicahandel',
    'experience.it.company': 'Zelfstandig',
    'experience.it.li1': 'Betaalde hardware-, netwerk- en softwaresupport geleverd',
    'experience.it.li2': 'Technische problemen duidelijk uitgelegd aan niet-technische gebruikers',
    'experience.it.li3': 'Elektronica gekocht, verkocht, geconfigureerd en gerepareerd',
    'experience.farm.date': 'Zomer 2022',
    'experience.farm.title': 'Agrarisch werk',
    'experience.farm.company': 'Boerderij',
    'experience.farm.li1': 'Fysiek zwaar werk tijdens lange werkdagen',
    'experience.farm.li2': 'Bediening en onderhoud van apparatuur',
    'experience.farm.li3': 'Sterke werkhouding en doorzettingsvermogen ontwikkeld',
    'education.title': 'Opleiding',
    'education.rug.date': '2025 - 2028 verwacht',
    'education.rug.title': 'Bachelor Bedrijfskunde',
    'education.rug.school': 'Rijksuniversiteit Groningen',
    'education.ut.title': 'Creative Technology',
    'education.ut.school': 'Universiteit Twente',
    'education.vwo.date': 'Diploma 2022',
    'education.vwo.title': 'VWO N&T, Economie & Informatica',
    'contact.title': 'Neem contact op',
    'contact.text': 'Interesse in praktisch technisch werk, een hands-on project of een gesprek over een stage? Ik sta open voor kansen waar bouwen, bedrijfsvoering en probleemoplossing samenkomen.',
    'contact.emailButton': 'Stuur een e-mail',
    'contact.linkedinButton': 'LinkedIn-profiel',
    'footer.rights': '© 2026 Florian Greeven. Alle rechten voorbehouden.',
    'lightbox.label': 'Vergrote afbeelding',
    'lightbox.close': 'Vergrote afbeelding sluiten',
    'lightbox.image': 'Portfolio-afbeelding',
    'lightbox.enlarge': 'Afbeelding vergroten: '
  },
  en: {
    'meta.title': 'Florian Greeven - Practical Maker & Systems Builder',
    'meta.description': 'Portfolio of Florian Greeven - practical maker, systems builder, and business administration student based in Groningen, NL. Projects in 3D printing, electronics, infrastructure, and fabrication.',
    'meta.ogDescription': 'Portfolio of Florian Greeven - 3D printing, CAD design, electronics, infrastructure, and hands-on fabrication.',
    'menu.toggle': 'Toggle menu',
    'language.group': 'Choose language',
    'nav.about': 'About',
    'nav.skills': 'Capabilities',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'cta.contact': 'Contact Me',
    'cta.cv': 'View CV',
    'about.title': 'About Me',
    'about.p1': "I'm Florian, a Dutch maker and systems builder currently pursuing a <strong>Bachelor's in Business Administration</strong> at the <strong>University of Groningen</strong>.",
    'about.p2': "I thrive at the intersection of digital and physical making. Whether it's designing and 3D printing custom sim racing pedals with Arduino-based load cells, managing self-hosted server infrastructure, or building things with wood and metal: I'm driven by the satisfaction of turning concepts into working reality.",
    'about.p3': 'With hands-on experience in 3D printing, CAD design, electronics, system administration, and business operations, I bring a practical mix of technical skill, ownership, and problem-solving to every project.',
    'about.p4': 'I am Dutch and speak Dutch, German, and English, shaped by studying in the Netherlands and having lived in Germany.',
    'about.highlightsLabel': 'Portfolio highlights',
    'about.highlight1.title': 'End-to-end',
    'about.highlight1.text': 'Prototyping from CAD to working hardware',
    'about.highlight2.title': 'Always-on',
    'about.highlight2.text': 'Homelab, Docker services, and Home Assistant',
    'about.highlight3.title': 'Operations',
    'about.highlight3.text': 'Bookkeeping, hospitality, and admin ownership',
    'details.location.label': 'Location',
    'details.languages.label': 'Languages',
    'details.languages.value': 'Dutch, German, English',
    'details.education.label': 'Education',
    'details.education.value': 'Business Administration, RUG',
    'details.email.label': 'Email',
    'contact.emailLabel': 'Email',
    'skills.title': 'Capabilities',
    'skills.fabrication.title': 'Digital Fabrication',
    'skills.fabrication.printing': '3D Printing (FDM)',
    'skills.fabrication.prototyping': 'Rapid Prototyping',
    'skills.fabrication.cad': 'CAD Design',
    'skills.fabrication.laser': 'Laser Cutting',
    'skills.fabrication.printerAlt': '3D printer in the workshop',
    'skills.fabrication.laserAlt': 'Laser cutter in the workshop',
    'skills.electronics.title': 'Electronics & Code',
    'skills.electronics.arduino': 'Arduino & Microcontrollers',
    'skills.electronics.sensors': 'Sensor Integration',
    'skills.electronics.circuits': 'Circuit Design & Soldering',
    'skills.infrastructure.title': 'IT & Infrastructure',
    'skills.infrastructure.linux': 'Linux Administration',
    'skills.infrastructure.homelab': 'Server & Homelab',
    'skills.infrastructure.docker': 'Docker & Networking',
    'skills.craft.title': 'Making & Craft',
    'skills.craft.wood': 'Woodworking',
    'skills.craft.construction': 'Construction & Fabrication',
    'skills.craft.vr': 'VR Technologies',
    'skills.operations.title': 'Operations & Business',
    'skills.operations.hospitality': 'Hospitality Operations',
    'skills.operations.bookkeeping': 'Bookkeeping & Administration',
    'skills.operations.guests': 'Guest Services',
    'skills.operations.finance': 'Financial Planning',
    'level.strong': 'Strong',
    'level.functional': 'Functional Parts',
    'level.handsOn': 'Hands-on',
    'level.experienced': 'Experienced',
    'projects.title': 'Projects',
    'projects.pedals.title': 'Custom Sim Racing Pedals',
    'projects.pedals.desc': 'Designed and fabricated custom load-cell brake pedals for sim racing. Owned the full lifecycle from CAD modeling and 3D printing to Arduino electronics, sensor calibration, and custom firmware.',
    'projects.pedals.alt1': 'Complete custom sim racing pedal assembly',
    'projects.pedals.alt2': 'Arduino electronics and custom 3D-printed enclosure for sim racing pedals',
    'projects.pedals.alt3': 'Spring and load-cell mechanism on custom sim racing pedals',
    'projects.homelab.title': 'Homelab Infrastructure',
    'projects.homelab.desc': 'Built and maintain server infrastructure across two locations with Proxmox virtualization, Docker-based services, backups, and monitoring. Self-hosted media, development, surveillance, personal web applications, and a Home Assistant-powered home.',
    'projects.homelab.alt': 'Proxmox dashboard showing homelab virtual machines and containers',
    'projects.surveillance.title': 'AI Surveillance System',
    'projects.surveillance.desc': 'Deployed Frigate NVR with YOLOv5 AI-powered object detection for real-time security monitoring. Built a multi-camera setup with intelligent alerts, event recording, and networked storage across the homelab.',
    'projects.surveillance.alt': 'AI surveillance camera feed detecting a person at night',
    'projects.bgrid.desc': "Developed a portable demonstration kit for bGrid's indoor positioning and smart building technology. Created custom CAD prototypes using laser cutting and 3D printing so stakeholders could handle and test the concept directly.",
    'projects.bgrid.alt': 'bGrid demo kit with laser-cut enclosure and electronics',
    'projects.plant.title': 'Stress-Responsive Plant Watering',
    'projects.plant.desc': 'Built an interactive plant watering prototype that reacted to electronically measured user stress levels. Combined Arduino sensing, custom code, 3D-printed housings, and physical prototyping to translate biometric input into a playful automated system.',
    'projects.plant.alt1': 'Stress-responsive plant watering prototype with Arduino electronics',
    'projects.plant.alt2': 'Plant watering prototype with 3D-printed parts and plant',
    'projects.wood.title': 'Woodworking & Construction',
    'projects.wood.desc': 'Completed woodworking and construction projects ranging from custom furniture to larger structural builds. Combined planning, material selection, workshop setup, and hands-on fabrication with attention to finish and durability.',
    'projects.wood.alt1': 'Finished woodworking workshop with benches and tools',
    'projects.wood.alt2': 'Timber shed and covered outdoor structure under construction',
    'projects.wood.alt3': 'Finishing a custom live-edge wooden table',
    'tag.printing': '3D Printing',
    'tag.electronics': 'Electronics',
    'tag.networking': 'Networking',
    'tag.selfHosting': 'Self-hosting',
    'tag.prototyping': 'Prototyping',
    'tag.sensors': 'Sensors',
    'tag.woodworking': 'Woodworking',
    'tag.design': 'Design',
    'tag.fabrication': 'Fabrication',
    'experience.title': 'Experience',
    'experience.restaurant.date': 'Approx. 2 years',
    'experience.restaurant.title': 'Restaurant & Airbnb Operations',
    'experience.restaurant.company': 'Family Business',
    'experience.restaurant.li1': 'Managed full administration and bookkeeping',
    'experience.restaurant.li2': 'Designed and installed complete digital infrastructure',
    'experience.restaurant.li3': 'Coordinated guest services and hospitality operations',
    'experience.restaurant.li4': 'Assisted with food service and kitchen operations',
    'experience.it.date': 'Ongoing',
    'experience.it.title': 'IT Support & Electronics Trading',
    'experience.it.company': 'Independent',
    'experience.it.li1': 'Provided paid hardware, networking, and software support',
    'experience.it.li2': 'Explained technical issues clearly for non-technical users',
    'experience.it.li3': 'Bought, sold, configured, and repaired electronics',
    'experience.farm.date': 'Summer 2022',
    'experience.farm.title': 'Agricultural Work',
    'experience.farm.company': 'Farm',
    'experience.farm.li1': 'High-intensity physical labor across long working days',
    'experience.farm.li2': 'Equipment operation and maintenance',
    'experience.farm.li3': 'Developed strong work ethic and resilience',
    'education.title': 'Education',
    'education.rug.date': '2025 - 2028 expected',
    'education.rug.title': 'Bachelor of Business Administration',
    'education.rug.school': 'University of Groningen',
    'education.ut.title': 'Creative Technology',
    'education.ut.school': 'University of Twente',
    'education.vwo.date': 'Diploma 2022',
    'education.vwo.title': 'VWO N&T, Economics & Informatics',
    'contact.title': 'Get In Touch',
    'contact.text': 'Interested in practical technical work, a hands-on project, or an internship conversation? I am open to opportunities where building, operations, and problem-solving meet.',
    'contact.emailButton': 'Send an Email',
    'contact.linkedinButton': 'LinkedIn Profile',
    'footer.rights': '© 2026 Florian Greeven. All rights reserved.',
    'lightbox.label': 'Enlarged image',
    'lightbox.close': 'Close enlarged image',
    'lightbox.image': 'Portfolio image',
    'lightbox.enlarge': 'Enlarge image: '
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initTypingEffect();
  initScrollReveal();
  initNavigation();
  initMobileMenu();
  initImageLightbox();
});

/* ===== Language Toggle ===== */
function initLanguageToggle() {
  const storedLanguage = getStoredLanguage();
  setLanguage(storedLanguage || DEFAULT_LANGUAGE, { persist: false });

  document.addEventListener('click', event => {
    const button = event.target.closest('.language-toggle__option');
    if (!button) return;

    event.preventDefault();
    const lang = button.getAttribute('data-lang');
    setLanguage(lang);
    restartTypingEffect();
  });
}

function getStoredLanguage() {
  try {
    const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return value === 'nl' || value === 'en' ? value : null;
  } catch (error) {
    return null;
  }
}

function translate(key, lang = activeLanguage) {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

function setLanguage(lang, options = {}) {
  if (lang !== 'nl' && lang !== 'en') return;

  const { persist = true } = options;
  activeLanguage = lang;
  document.documentElement.lang = lang;
  document.title = translate('meta.title');
  setMetaContent('description', translate('meta.description'));
  setMetaProperty('og:title', translate('meta.title'));
  setMetaProperty('og:description', translate('meta.ogDescription'));

  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = translate(element.getAttribute('data-i18n'));
  });

  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    element.innerHTML = translate(element.getAttribute('data-i18n-html'));
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(element => {
    element.getAttribute('data-i18n-attr').split(',').forEach(pair => {
      const [attribute, key] = pair.split(':').map(value => value.trim());
      if (attribute && key) element.setAttribute(attribute, translate(key));
    });
  });

  document.querySelectorAll('.language-toggle__option').forEach(button => {
    const isActive = button.getAttribute('data-lang') === lang;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  refreshImageLabels();
  refreshLightboxLabels();

  if (persist) {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      // Language preference is a convenience; the site still works without storage.
    }
  }
}

function setMetaContent(name, content) {
  document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', content);
}

function setMetaProperty(property, content) {
  document.querySelector(`meta[property="${property}"]`)?.setAttribute('content', content);
}

function refreshImageLabels() {
  document.querySelectorAll('.project-card__image, .skill-tools__image, .profile-photo').forEach(img => {
    img.setAttribute('aria-label', `${translate('lightbox.enlarge')}${img.alt || translate('lightbox.image')}`);
  });
}

function refreshLightboxLabels() {
  const lightbox = document.querySelector('.image-lightbox');
  const closeBtn = document.querySelector('.image-lightbox__close');
  if (lightbox) lightbox.setAttribute('aria-label', translate('lightbox.label'));
  if (closeBtn) closeBtn.setAttribute('aria-label', translate('lightbox.close'));
}

/* ===== Typing Effect ===== */
function initTypingEffect() {
  restartTypingEffect();
}

function restartTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  if (typingTimer) window.clearTimeout(typingTimer);
  const phrases = TYPING_PHRASES[activeLanguage] || TYPING_PHRASES[DEFAULT_LANGUAGE];
  el.textContent = '';

  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        typingTimer = window.setTimeout(() => { isDeleting = true; tick(); }, 2200);
        return;
      }
      typingTimer = window.setTimeout(tick, 70 + Math.random() * 40);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingTimer = window.setTimeout(tick, 400);
        return;
      }
      typingTimer = window.setTimeout(tick, 35);
    }
  }
  typingTimer = window.setTimeout(tick, 800);
}

/* ===== Scroll Reveal ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ===== Navigation Active State ===== */
function initNavigation() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const isActive = link.getAttribute('data-section') === id;
          link.classList.toggle('active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));

  // Smooth scroll on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute('data-section'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu
        document.getElementById('sidebar')?.classList.remove('open');
        document.getElementById('menuToggle')?.classList.remove('active');
        document.querySelector('.sidebar-backdrop')?.classList.remove('active');
      }
    });
  });
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  if (!toggle || !sidebar) return;

  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'sidebar-backdrop';
  document.body.appendChild(backdrop);

  function toggleMenu() {
    sidebar.classList.toggle('open');
    toggle.classList.toggle('active');
    backdrop.classList.toggle('active');
  }

  toggle.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', toggleMenu);
}

/* ===== Image Lightbox ===== */
function initImageLightbox() {
  const images = document.querySelectorAll('.project-card__image, .skill-tools__image, .profile-photo');
  if (!images.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', translate('lightbox.label'));
  lightbox.innerHTML = `
    <button class="image-lightbox__close" type="button" aria-label="${translate('lightbox.close')}">&times;</button>
    <div class="image-lightbox__dialog">
      <img class="image-lightbox__image" alt="">
      <p class="image-lightbox__caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.image-lightbox__image');
  const caption = lightbox.querySelector('.image-lightbox__caption');
  const closeBtn = lightbox.querySelector('.image-lightbox__close');
  let lastFocused = null;

  function openImage(img) {
    lastFocused = document.activeElement;
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || translate('lightbox.image');
    caption.textContent = img.alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeImage() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImage.removeAttribute('src');
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  images.forEach(img => {
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', `${translate('lightbox.enlarge')}${img.alt || translate('lightbox.image')}`);

    img.addEventListener('click', () => openImage(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImage(img);
      }
    });
  });

  closeBtn.addEventListener('click', closeImage);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeImage();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('active')) {
      closeImage();
    }
  });
}
