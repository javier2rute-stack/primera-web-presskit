const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const storageKey = "press-kit-pro-dj:v2";
const legacyStorageKey = "press-kit-pro-dj:v1";

const defaults = {
  lang: "es",
  refId: "ST-992-B",
  artistName: "VANTABLACK",
  genre: "Techno Industrial",
  location: "Berlin, DE",
  bio: "Un maestro de la tension atmosferica y el ritmo industrial. Desde 2018, Vantablack se ha labrado un nicho en el circuito underground con un sonido definido por paisajes sonoros oscuros como la obsidiana y un implacable ritmo de 140 BPM.",
  instagram: "https://instagram.com/vantablack",
  spotify: "https://open.spotify.com/",
  soundcloud: "https://soundcloud.com/",
  youtube: "https://youtube.com/",
  bookingEmail: "booking@afterdark.example",
  phone: "+34 600 000 000",
  photo: "",
  rider: [
    { title: "Mesa de mezclas", detail: "Pioneer DJM-V10 (x1)" },
    { title: "Reproduccion", detail: "Pioneer CDJ-3000 (x4)" },
    { title: "Monitorizacion", detail: "D&B Audiotechnik (Estereo)" },
    { title: "Conectividad", detail: "Switch LAN / Configuracion Pro Link" }
  ],
  gallery: [
    { title: "Press photo 01", detail: "Retrato principal en alta resolucion" },
    { title: "Live booth", detail: "Foto de cabina para promotores" }
  ],
  videos: [{ title: "Boiler Room style set", detail: "https://youtube.com/watch?v=demo" }],
  discography: [
    { title: "Acid Rain LP", detail: "2026 - Afterdark Records" },
    { title: "Midnight Pulse", detail: "Original Mix - 125 BPM" }
  ],
  events: [
    { title: "15 Jun - Berlin", detail: "Tresor, Alemania" },
    { title: "22 Jun - Ibiza", detail: "Afterdark Warehouse" }
  ],
  customSections: [{ title: "Hospitality", detail: "Agua, toallas, green room seguro y contacto local de produccion." }]
};

const es = {
  "nav.artist": "Artista", "nav.editor": "Editor", "nav.media": "Media", "nav.reports": "Informes", "nav.preview": "Vista previa",
  "rail.dashboard": "Panel de Control", "rail.profile": "Perfil del Artista", "rail.media": "Biblioteca Media", "rail.analytics": "Analiticas", "rail.export": "Centro de Exportacion",
  "actions.export": "Exportar PDF", "actions.new": "+ Nuevo EPK", "actions.viewAll": "Ver Todo", "actions.changePhoto": "Cambiar foto", "actions.addRider": "+ Anadir rider", "actions.back": "Volver", "actions.save": "Guardar cambios", "actions.editSections": "Editar secciones", "actions.addPhoto": "+ Anadir foto", "actions.addVideo": "+ Anadir video", "actions.addRelease": "+ Anadir lanzamiento", "actions.addEvent": "+ Anadir evento", "actions.addSection": "+ Anadir nueva seccion",
  "home.title": "Eleva tu Carrera con un <strong>Press Kit Pro</strong>", "home.lead": "La primera impresion es la unica que cuenta en la industria. Crea un press kit profesional, editable y listo para agencias, clubs y festivales.",
  "feature.speed": "Velocidad", "feature.speedText": "Carga instantanea y optimizacion total.", "feature.pro": "Estado Pro", "feature.proText": "Documento A4 premium para agencias top-tier.", "feature.visibility": "Visibilidad", "feature.visibilityText": "Analiticas y actividad profesional del kit.", "feature.download": "Descargar", "feature.downloadText": "Exportacion PDF en un clic. Siempre listo.",
  "dashboard.title": "PRESS KIT PRO DJ - PANEL DE GESTION", "dashboard.stream": "Intensidad de Reproduccion", "dashboard.feed": "Feed de Actividad Global",
  "editor.title": "PERFIL DEL ARTISTA Y RIDER TECNICO", "editor.subtitle": "Define identidad, conectividad digital y materiales operativos. Todo se guarda automaticamente.", "editor.identity": "Identidad", "editor.rider": "Rider Tecnico", "editor.socials": "Redes Sociales", "editor.progress": "Progreso de Completado",
  "field.artistName": "Nombre artistico", "field.genre": "Genero musical", "field.location": "Ubicacion", "field.bio": "Biografia",
  "media.title": "GALERIA, VIDEOS, DISCOGRAFIA Y EVENTOS", "media.gallery": "Galeria de Fotos", "media.videos": "Videos", "media.discography": "Discografia", "media.events": "Proximos Eventos", "media.contact": "Contacto Profesional", "media.custom": "Secciones Personalizadas",
  "preview.bio": "Biografia Oficial", "report.badge": "Reporte de Analisis Pro", "report.growth": "Crecimiento de Audiencia", "report.map": "Mapa de Calor Global", "report.regions": "Regiones Principales"
};
const en = {
  "nav.artist": "Artist", "nav.editor": "Editor", "nav.media": "Media", "nav.reports": "Reports", "nav.preview": "Preview",
  "rail.dashboard": "Dashboard", "rail.profile": "Artist Profile", "rail.media": "Media Library", "rail.analytics": "Analytics", "rail.export": "Export Center",
  "actions.export": "Export PDF", "actions.new": "+ New EPK", "actions.viewAll": "View All", "actions.changePhoto": "Change photo", "actions.addRider": "+ Add rider", "actions.back": "Back", "actions.save": "Save changes", "actions.editSections": "Edit sections", "actions.addPhoto": "+ Add photo", "actions.addVideo": "+ Add video", "actions.addRelease": "+ Add release", "actions.addEvent": "+ Add event", "actions.addSection": "+ Add section",
  "home.title": "Raise your career with a <strong>Pro Press Kit</strong>", "home.lead": "First impressions matter in the industry. Build a professional, editable press kit ready for agencies, clubs and festivals.",
  "feature.speed": "Speed", "feature.speedText": "Instant loading and full optimization.", "feature.pro": "Pro Status", "feature.proText": "Premium A4 document for top-tier agencies.", "feature.visibility": "Visibility", "feature.visibilityText": "Analytics and professional kit activity.", "feature.download": "Download", "feature.downloadText": "PDF export in one click. Always ready.",
  "dashboard.title": "PRESS KIT PRO DJ - MANAGEMENT PANEL", "dashboard.stream": "Playback Intensity", "dashboard.feed": "Global Activity Feed",
  "editor.title": "ARTIST PROFILE AND TECHNICAL RIDER", "editor.subtitle": "Define identity, digital connectivity and operational materials. Everything autosaves.", "editor.identity": "Identity", "editor.rider": "Technical Rider", "editor.socials": "Social Networks", "editor.progress": "Completion Progress",
  "field.artistName": "Artist name", "field.genre": "Music genre", "field.location": "Location", "field.bio": "Biography",
  "media.title": "GALLERY, VIDEOS, DISCOGRAPHY AND EVENTS", "media.gallery": "Photo Gallery", "media.videos": "Videos", "media.discography": "Discography", "media.events": "Upcoming Events", "media.contact": "Professional Contact", "media.custom": "Custom Sections",
  "preview.bio": "Official Biography", "report.badge": "Pro Analytics Report", "report.growth": "Audience Growth", "report.map": "Global Heat Map", "report.regions": "Top Regions"
};
const translations = {
  es, en,
  fr: {
    "nav.artist": "Artiste", "nav.editor": "Editeur", "nav.media": "Media", "nav.reports": "Rapports", "nav.preview": "Apercu",
    "rail.dashboard": "Tableau de bord", "rail.profile": "Profil artiste", "rail.media": "Bibliotheque media", "rail.analytics": "Analytique", "rail.export": "Centre export",
    "actions.export": "Exporter PDF", "actions.new": "+ Nouvel EPK", "actions.viewAll": "Tout voir", "actions.changePhoto": "Changer photo", "actions.addRider": "+ Ajouter rider", "actions.back": "Retour", "actions.save": "Enregistrer", "actions.editSections": "Modifier sections", "actions.addPhoto": "+ Ajouter photo", "actions.addVideo": "+ Ajouter video", "actions.addRelease": "+ Ajouter sortie", "actions.addEvent": "+ Ajouter evenement", "actions.addSection": "+ Ajouter section",
    "home.title": "Elevez votre carriere avec un <strong>Press Kit Pro</strong>", "home.lead": "La premiere impression compte dans l'industrie. Creez un press kit professionnel, editable et pret pour agences, clubs et festivals.",
    "feature.speed": "Vitesse", "feature.speedText": "Chargement instantane et optimisation totale.", "feature.pro": "Statut Pro", "feature.proText": "Document A4 premium pour agences top-tier.", "feature.visibility": "Visibilite", "feature.visibilityText": "Analytique et activite professionnelle du kit.", "feature.download": "Telecharger", "feature.downloadText": "Export PDF en un clic. Toujours pret.",
    "dashboard.title": "PRESS KIT PRO DJ - TABLEAU DE GESTION", "dashboard.stream": "Intensite de lecture", "dashboard.feed": "Flux d'activite global",
    "editor.title": "PROFIL ARTISTE ET RIDER TECHNIQUE", "editor.subtitle": "Definissez identite, connectivite numerique et materiels operationnels. Tout est sauvegarde automatiquement.", "editor.identity": "Identite", "editor.rider": "Rider Technique", "editor.socials": "Reseaux sociaux", "editor.progress": "Progression",
    "field.artistName": "Nom d'artiste", "field.genre": "Genre musical", "field.location": "Localisation", "field.bio": "Biographie",
    "media.title": "GALERIE, VIDEOS, DISCOGRAPHIE ET EVENEMENTS", "media.gallery": "Galerie photos", "media.videos": "Videos", "media.discography": "Discographie", "media.events": "Evenements a venir", "media.contact": "Contact professionnel", "media.custom": "Sections personnalisees",
    "preview.bio": "Biographie officielle", "report.badge": "Rapport analytique pro", "report.growth": "Croissance audience", "report.map": "Carte thermique globale", "report.regions": "Regions principales"
  },
  de: {
    "nav.artist": "Kuenstler", "nav.editor": "Editor", "nav.media": "Media", "nav.reports": "Berichte", "nav.preview": "Vorschau",
    "rail.dashboard": "Dashboard", "rail.profile": "Kuenstlerprofil", "rail.media": "Medienbibliothek", "rail.analytics": "Analysen", "rail.export": "Exportzentrum",
    "actions.export": "PDF exportieren", "actions.new": "+ Neues EPK", "actions.viewAll": "Alle sehen", "actions.changePhoto": "Foto wechseln", "actions.addRider": "+ Rider hinzufuegen", "actions.back": "Zurueck", "actions.save": "Speichern", "actions.editSections": "Sektionen bearbeiten", "actions.addPhoto": "+ Foto hinzufuegen", "actions.addVideo": "+ Video hinzufuegen", "actions.addRelease": "+ Release hinzufuegen", "actions.addEvent": "+ Event hinzufuegen", "actions.addSection": "+ Sektion hinzufuegen",
    "home.title": "Steigere deine Karriere mit einem <strong>Pro Press Kit</strong>", "home.lead": "Der erste Eindruck zaehlt. Erstelle ein professionelles, editierbares Press Kit fuer Agenturen, Clubs und Festivals.",
    "feature.speed": "Geschwindigkeit", "feature.speedText": "Sofortiges Laden und volle Optimierung.", "feature.pro": "Pro Status", "feature.proText": "Premium A4 Dokument fuer Top-Agenturen.", "feature.visibility": "Sichtbarkeit", "feature.visibilityText": "Analysen und professionelle Kit-Aktivitaet.", "feature.download": "Download", "feature.downloadText": "PDF Export mit einem Klick. Immer bereit.",
    "dashboard.title": "PRESS KIT PRO DJ - MANAGEMENT PANEL", "dashboard.stream": "Wiedergabe-Intensitaet", "dashboard.feed": "Globaler Aktivitaetsfeed",
    "editor.title": "KUENSTLERPROFIL UND TECHNISCHER RIDER", "editor.subtitle": "Definiere Identitaet, digitale Konnektivitaet und operative Materialien. Alles wird automatisch gespeichert.", "editor.identity": "Identitaet", "editor.rider": "Technischer Rider", "editor.socials": "Soziale Netzwerke", "editor.progress": "Fortschritt",
    "field.artistName": "Kuenstlername", "field.genre": "Musikgenre", "field.location": "Standort", "field.bio": "Biografie",
    "media.title": "GALERIE, VIDEOS, DISKOGRAFIE UND EVENTS", "media.gallery": "Fotogalerie", "media.videos": "Videos", "media.discography": "Diskografie", "media.events": "Naechste Events", "media.contact": "Professioneller Kontakt", "media.custom": "Eigene Sektionen",
    "preview.bio": "Offizielle Biografie", "report.badge": "Pro Analysebericht", "report.growth": "Publikumswachstum", "report.map": "Globale Heatmap", "report.regions": "Top Regionen"
  },
  it: {
    "nav.artist": "Artista", "nav.editor": "Editor", "nav.media": "Media", "nav.reports": "Report", "nav.preview": "Anteprima",
    "rail.dashboard": "Pannello", "rail.profile": "Profilo artista", "rail.media": "Libreria media", "rail.analytics": "Analitiche", "rail.export": "Centro export",
    "actions.export": "Esporta PDF", "actions.new": "+ Nuovo EPK", "actions.viewAll": "Vedi tutto", "actions.changePhoto": "Cambia foto", "actions.addRider": "+ Aggiungi rider", "actions.back": "Indietro", "actions.save": "Salva", "actions.editSections": "Modifica sezioni", "actions.addPhoto": "+ Aggiungi foto", "actions.addVideo": "+ Aggiungi video", "actions.addRelease": "+ Aggiungi release", "actions.addEvent": "+ Aggiungi evento", "actions.addSection": "+ Aggiungi sezione",
    "home.title": "Porta la tua carriera piu in alto con un <strong>Press Kit Pro</strong>", "home.lead": "La prima impressione conta. Crea un press kit professionale, modificabile e pronto per agenzie, club e festival.",
    "feature.speed": "Velocita", "feature.speedText": "Caricamento immediato e ottimizzazione totale.", "feature.pro": "Stato Pro", "feature.proText": "Documento A4 premium per agenzie top-tier.", "feature.visibility": "Visibilita", "feature.visibilityText": "Analitiche e attivita professionale del kit.", "feature.download": "Scarica", "feature.downloadText": "Export PDF in un clic. Sempre pronto.",
    "dashboard.title": "PRESS KIT PRO DJ - PANNELLO DI GESTIONE", "dashboard.stream": "Intensita di riproduzione", "dashboard.feed": "Feed attivita globale",
    "editor.title": "PROFILO ARTISTA E RIDER TECNICO", "editor.subtitle": "Definisci identita, connettivita digitale e materiali operativi. Tutto viene salvato automaticamente.", "editor.identity": "Identita", "editor.rider": "Rider Tecnico", "editor.socials": "Social network", "editor.progress": "Avanzamento",
    "field.artistName": "Nome artistico", "field.genre": "Genere musicale", "field.location": "Posizione", "field.bio": "Biografia",
    "media.title": "GALLERIA, VIDEO, DISCOGRAFIA ED EVENTI", "media.gallery": "Galleria foto", "media.videos": "Video", "media.discography": "Discografia", "media.events": "Prossimi eventi", "media.contact": "Contatto professionale", "media.custom": "Sezioni personalizzate",
    "preview.bio": "Biografia ufficiale", "report.badge": "Report analitico pro", "report.growth": "Crescita pubblico", "report.map": "Mappa calore globale", "report.regions": "Regioni principali"
  }
};

const sharedExtra = {
  "actions.help": "Soporte", "actions.signout": "Cerrar Sesion", "actions.cancel": "Cancelar", "actions.saveShort": "Guardar", "actions.edit": "Editar", "actions.delete": "Eliminar",
  "footer.terms": "Terminos del Servicio", "footer.privacy": "Politica de Privacidad", "footer.contact": "Contactar Agente", "footer.online": "Sistema Online",
  "home.kicker": "Premium EPK Systems", "dashboard.kicker": "Sistema de Gestion", "dashboard.activity": "Actividad Global", "dashboard.activeEpks": "EPKs Activos", "dashboard.focus": "En Foco", "dashboard.peak": "Rendimiento Maximo", "dashboard.nominal": "Sistemas Nominales", "dashboard.encryption": "Encriptacion: AES-256", "dashboard.latency": "Latencia: 12ms",
  "doc.page": "Pagina", "doc.ref": "ID de Referencia", "editor.kicker": "Constructor EPK // Pagina 02", "editor.productionReady": "Listo para produccion", "media.kicker": "Biblioteca Media", "field.bookingEmail": "Email de booking", "field.phone": "Telefono / WhatsApp", "field.locationColon": "Ubicacion:", "field.genreColon": "Genero:",
  "preview.available": "Disponible para booking", "report.period": "Q3 2026 Datos de Rendimiento", "report.clientRef": "Ref Cliente: AD-9921-X", "report.liveData": "Global Reach: Live Data", "report.insightTitle": "Insight de Audiencia", "report.insight": "Demografia principal inclinada hacia jovenes de 22-35 anos con 65% de consumo movil durante la noche.", "report.confidential": "Datos confidenciales destinados a destinatarios autorizados.",
  "metric.reach": "Alcance total", "metric.engagement": "Interaccion media", "metric.streaming": "Volumen streaming", "metric.press": "Clips de prensa", "metric.impact": "Alto impacto",
  "dialog.edit": "Editar elemento", "dialog.add": "Anadir", "dialog.title": "Titulo", "dialog.detail": "Detalle",
  "placeholder.instagram": "https://instagram.com/tu-artista", "placeholder.spotify": "https://open.spotify.com/artist/...", "placeholder.soundcloud": "https://soundcloud.com/tu-artista", "placeholder.youtube": "https://youtube.com/@tu-artista", "placeholder.bookingEmail": "booking@agencia.com", "placeholder.phone": "+34 600 000 000",
  "validation.artistName": "El nombre artistico debe tener al menos 2 caracteres.", "validation.genre": "Indica el genero musical.", "validation.location": "Indica la ubicacion.", "validation.bio": "La biografia debe tener al menos 40 caracteres.", "validation.email": "El email de booking no parece valido.", "validation.url": "{field} debe empezar por http:// o https://.",
  "toast.saved": "Cambios guardados correctamente", "toast.needsReview": "Revisa los campos marcados", "toast.added": "Elemento anadido", "toast.updated": "Elemento actualizado", "toast.deleted": "Elemento eliminado", "toast.new": "Nuevo EPK creado", "toast.print": "Abriendo dialogo de impresion / PDF", "toast.settings": "Ajustes abiertos: edita el perfil desde la seccion Editor", "toast.notify": "Sin notificaciones pendientes. Sistema online.", "toast.help": "Soporte: revisa contacto profesional en Media", "toast.signout": "Sesion local cerrada. Los datos siguen guardados en este navegador.", "toast.scan": "Analiticas actualizadas", "toast.photoType": "Selecciona una imagen valida", "toast.photoUpdated": "Foto principal actualizada", "toast.lang": "Idioma cambiado: {lang}",
  "dashboard.updated": "Actualizado automaticamente", "dashboard.draft": "Borrador operativo", "dashboard.live": "Vivo", "dashboard.draftStatus": "Borrador", "dashboard.releaseFallback": "Nuevo lanzamiento",
  "feed.agent": "Agente de Reservas descargo activos de Press Kit.", "feed.universal": "Universal Music vio el Tech Rider.", "feed.shared": "EPK compartido en Instagram Stories.", "feed.promoter": "Promotor de Festival descargo el Tech Rider.", "feed.now": "Berlin, DE - Ahora mismo", "feed.london": "Londres, UK - hace 12m", "feed.newyork": "Nueva York, US - hace 1h", "feed.ibiza": "Ibiza, ES - hace 4h"
};

Object.assign(translations.es, sharedExtra);
Object.assign(translations.en, {
  ...sharedExtra,
  "actions.help": "Support", "actions.signout": "Sign out", "actions.cancel": "Cancel", "actions.saveShort": "Save", "actions.edit": "Edit", "actions.delete": "Delete",
  "footer.terms": "Terms of Service", "footer.privacy": "Privacy Policy", "footer.contact": "Contact Agent", "footer.online": "System Online",
  "dashboard.kicker": "Management System", "dashboard.activity": "Global Activity", "dashboard.activeEpks": "Active EPKs", "dashboard.focus": "In Focus", "dashboard.peak": "Peak Performance", "dashboard.nominal": "Systems Nominal", "dashboard.encryption": "Encryption: AES-256", "dashboard.latency": "Latency: 12ms",
  "doc.page": "Page", "doc.ref": "Reference ID", "editor.kicker": "EPK Builder // Page 02", "editor.productionReady": "Production ready", "media.kicker": "Media Library", "field.bookingEmail": "Booking email", "field.phone": "Phone / WhatsApp", "field.locationColon": "Location:", "field.genreColon": "Genre:",
  "preview.available": "Available for booking", "report.period": "Q3 2026 Performance Data", "report.clientRef": "Client Ref: AD-9921-X", "report.insightTitle": "Audience Insight", "report.insight": "Core demographic leans toward 22-35 year olds with 65% mobile consumption at night.", "report.confidential": "Confidential data intended for authorized recipients.",
  "metric.reach": "Total reach", "metric.engagement": "Average engagement", "metric.streaming": "Streaming volume", "metric.press": "Press clips", "metric.impact": "High impact",
  "dialog.edit": "Edit item", "dialog.add": "Add", "dialog.title": "Title", "dialog.detail": "Detail",
  "validation.artistName": "Artist name must have at least 2 characters.", "validation.genre": "Enter the music genre.", "validation.location": "Enter the location.", "validation.bio": "Biography must have at least 40 characters.", "validation.email": "Booking email does not look valid.", "validation.url": "{field} must start with http:// or https://.",
  "toast.saved": "Changes saved successfully", "toast.needsReview": "Review the highlighted fields", "toast.added": "Item added", "toast.updated": "Item updated", "toast.deleted": "Item deleted", "toast.new": "New EPK created", "toast.print": "Opening print / PDF dialog", "toast.settings": "Settings opened: edit the profile from Editor", "toast.notify": "No pending notifications. System online.", "toast.help": "Support: check professional contact in Media", "toast.signout": "Local session closed. Data remains saved in this browser.", "toast.scan": "Analytics refreshed", "toast.photoType": "Select a valid image", "toast.photoUpdated": "Main photo updated", "toast.lang": "Language changed: {lang}",
  "dashboard.updated": "Updated automatically", "dashboard.draft": "Operational draft", "dashboard.live": "Live", "dashboard.draftStatus": "Draft", "dashboard.releaseFallback": "New release",
  "feed.agent": "Booking Agent downloaded Press Kit assets.", "feed.universal": "Universal Music viewed the Tech Rider.", "feed.shared": "EPK shared on Instagram Stories.", "feed.promoter": "Festival promoter downloaded the Tech Rider.", "feed.now": "Berlin, DE - Just now", "feed.london": "London, UK - 12m ago", "feed.newyork": "New York, US - 1h ago", "feed.ibiza": "Ibiza, ES - 4h ago"
});
Object.assign(translations.fr, {
  ...translations.en, ...translations.fr,
  "actions.help": "Support", "actions.signout": "Deconnexion", "actions.cancel": "Annuler", "actions.saveShort": "Enregistrer", "actions.edit": "Modifier", "actions.delete": "Supprimer",
  "footer.terms": "Conditions de service", "footer.privacy": "Politique de confidentialite", "footer.contact": "Contacter agent", "footer.online": "Systeme en ligne",
  "dashboard.kicker": "Systeme de gestion", "dashboard.activity": "Activite globale", "dashboard.activeEpks": "EPKs actifs", "dashboard.focus": "En focus", "dashboard.peak": "Performance maximale",
  "doc.page": "Page", "doc.ref": "ID de reference", "editor.kicker": "Constructeur EPK // Page 02", "editor.productionReady": "Pret pour production", "media.kicker": "Bibliotheque media", "field.bookingEmail": "Email booking", "field.phone": "Telephone / WhatsApp",
  "preview.available": "Disponible pour booking", "metric.reach": "Portee totale", "metric.engagement": "Interaction moyenne", "metric.streaming": "Volume streaming", "metric.press": "Clips presse", "metric.impact": "Fort impact",
  "dialog.edit": "Modifier element", "dialog.add": "Ajouter", "dialog.title": "Titre", "dialog.detail": "Detail", "toast.saved": "Modifications enregistrees", "toast.needsReview": "Verifiez les champs marques"
});
Object.assign(translations.de, {
  ...translations.en, ...translations.de,
  "actions.help": "Support", "actions.signout": "Abmelden", "actions.cancel": "Abbrechen", "actions.saveShort": "Speichern", "actions.edit": "Bearbeiten", "actions.delete": "Loeschen",
  "footer.terms": "Nutzungsbedingungen", "footer.privacy": "Datenschutz", "footer.contact": "Agent kontaktieren", "footer.online": "System online",
  "dashboard.kicker": "Managementsystem", "dashboard.activity": "Globale Aktivitaet", "dashboard.activeEpks": "Aktive EPKs", "dashboard.focus": "Im Fokus", "dashboard.peak": "Maximale Leistung",
  "doc.page": "Seite", "doc.ref": "Referenz-ID", "editor.kicker": "EPK Builder // Seite 02", "editor.productionReady": "Produktionsbereit", "media.kicker": "Medienbibliothek", "field.bookingEmail": "Booking E-Mail", "field.phone": "Telefon / WhatsApp",
  "preview.available": "Fuer Booking verfuegbar", "metric.reach": "Gesamtreichweite", "metric.engagement": "Durchschnittliches Engagement", "metric.streaming": "Streaming-Volumen", "metric.press": "Presseclips", "metric.impact": "Hohe Wirkung",
  "dialog.edit": "Element bearbeiten", "dialog.add": "Hinzufuegen", "dialog.title": "Titel", "dialog.detail": "Detail", "toast.saved": "Aenderungen gespeichert", "toast.needsReview": "Markierte Felder pruefen"
});
Object.assign(translations.it, {
  ...translations.en, ...translations.it,
  "actions.help": "Supporto", "actions.signout": "Esci", "actions.cancel": "Annulla", "actions.saveShort": "Salva", "actions.edit": "Modifica", "actions.delete": "Elimina",
  "footer.terms": "Termini di servizio", "footer.privacy": "Privacy policy", "footer.contact": "Contatta agente", "footer.online": "Sistema online",
  "dashboard.kicker": "Sistema di gestione", "dashboard.activity": "Attivita globale", "dashboard.activeEpks": "EPK attivi", "dashboard.focus": "In evidenza", "dashboard.peak": "Massima performance",
  "doc.page": "Pagina", "doc.ref": "ID riferimento", "editor.kicker": "Builder EPK // Pagina 02", "editor.productionReady": "Pronto per produzione", "media.kicker": "Libreria media", "field.bookingEmail": "Email booking", "field.phone": "Telefono / WhatsApp",
  "preview.available": "Disponibile per booking", "metric.reach": "Copertura totale", "metric.engagement": "Interazione media", "metric.streaming": "Volume streaming", "metric.press": "Clip stampa", "metric.impact": "Alto impatto",
  "dialog.edit": "Modifica elemento", "dialog.add": "Aggiungi", "dialog.title": "Titolo", "dialog.detail": "Dettaglio", "toast.saved": "Modifiche salvate", "toast.needsReview": "Controlla i campi evidenziati"
});

let state = loadState();
let activeView = "home";
let editing = null;
let toastTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey) || "null");
    return { ...defaults, ...(saved || {}) };
  } catch {
    return { ...defaults };
  }
}

function persistQuietly() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function saveState(message = "Cambios guardados") {
  persistQuietly();
  render();
  showToast(message);
}

function showToast(message) {
  const toast = $(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function t(key, replacements = {}) {
  const lang = translations[state.lang] ? state.lang : "es";
  let value = translations[lang][key] || translations.es[key] || key;
  Object.entries(replacements).forEach(([name, replacement]) => {
    value = value.replace(`{${name}}`, replacement);
  });
  return value;
}

function navigate(view) {
  activeView = view;
  $$(".view").forEach((panel) => panel.classList.toggle("active", panel.dataset.view === view));
  $$("[data-nav]").forEach((button) => button.classList.toggle("active", button.dataset.nav === view));
  $(".mobile-menu")?.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindForm() {
  const form = $("#artistForm");
  $$("input[name], textarea[name]").forEach((field) => {
    if (field.form !== form && field.getAttribute("form") !== "artistForm") return;
    field.value = state[field.name] || "";
    field.addEventListener("input", () => {
      state[field.name] = field.value;
      persistQuietly();
      renderDynamicOnly();
    });
  });
  form?.addEventListener("submit", (event) => event.preventDefault());
}

function applyLanguage() {
  const lang = translations[state.lang] ? state.lang : "es";
  const dict = translations[lang];
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach((node) => {
    const value = dict[node.dataset.i18n] || es[node.dataset.i18n];
    if (value) node.textContent = value;
  });
  $$("[data-i18n-html]").forEach((node) => {
    const value = dict[node.dataset.i18nHtml] || es[node.dataset.i18nHtml];
    if (value) node.innerHTML = value;
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    const value = dict[node.dataset.i18nPlaceholder] || es[node.dataset.i18nPlaceholder];
    if (value) node.setAttribute("placeholder", value);
  });
  const localeButton = $(".locale-btn");
  if (localeButton) localeButton.textContent = `${lang.toUpperCase()} v`;
  $$("[data-lang]").forEach((button) => button.classList.toggle("active", button.dataset.lang === lang));
}

function validateForm() {
  const errors = [];
  if (!state.artistName || state.artistName.trim().length < 2) errors.push(t("validation.artistName"));
  if (!state.genre) errors.push(t("validation.genre"));
  if (!state.location) errors.push(t("validation.location"));
  if (!state.bio || state.bio.trim().length < 40) errors.push(t("validation.bio"));
  if (state.bookingEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.bookingEmail)) errors.push(t("validation.email"));
  ["instagram", "spotify", "soundcloud", "youtube"].forEach((key) => {
    if (state[key] && !/^https?:\/\//i.test(state[key])) errors.push(t("validation.url", { field: label(key) }));
  });
  const box = $("[data-errors]");
  if (box) box.innerHTML = errors.map((error) => `<p>${error}</p>`).join("");
  return errors;
}

function completion() {
  const required = ["artistName", "genre", "location", "bio", "bookingEmail"];
  const filled = required.filter((key) => String(state[key] || "").trim()).length;
  const lists = ["rider", "gallery", "videos", "discography", "events"].filter((key) => state[key]?.length).length;
  return Math.min(100, Math.round(((filled + lists) / (required.length + 5)) * 100));
}

function render() {
  applyLanguage();
  renderBindings();
  renderLists();
  renderDashboard();
  renderReport();
  renderPhoto();
  renderProgress();
}

function renderDynamicOnly() {
  renderBindings();
  renderPhoto();
  renderProgress();
}

function renderBindings() {
  $$("[data-bind]").forEach((node) => {
    node.textContent = state[node.dataset.bind] || "";
  });
  const social = $("#socialPreview");
  if (social) {
    social.innerHTML = ["instagram", "spotify", "soundcloud", "youtube"]
      .filter((key) => state[key])
      .map((key) => `<a href="${escapeAttr(state[key])}" target="_blank" rel="noopener">${label(key)}</a>`)
      .join("");
  }
  renderPreviewList("discographyPreview", state.discography);
  renderPreviewList("eventsPreview", state.events);
}

function renderPreviewList(id, items) {
  const target = $(`#${id}`);
  if (!target) return;
  target.innerHTML = items.map((item) => `<p><strong>${escapeHtml(item.title)}</strong><br><span>${escapeHtml(item.detail)}</span></p>`).join("");
}

function renderPhoto() {
  $$("[data-preview-bg]").forEach((node) => {
    if (!state.photo) {
      node.style.backgroundImage = "";
      node.style.backgroundSize = "";
      node.style.backgroundPosition = "";
      return;
    }
    node.style.backgroundImage = `linear-gradient(90deg, rgba(19,11,22,.95) 0 18%, rgba(19,11,22,.45)), linear-gradient(0deg, #150b17 0 10%, transparent 40%), url("${state.photo}")`;
    node.style.backgroundSize = "cover";
    node.style.backgroundPosition = "center";
  });
}

function renderLists() {
  renderEditableList("riderList", "rider");
  renderEditableList("galleryList", "gallery");
  renderEditableList("videoList", "videos");
  renderEditableList("discographyList", "discography");
  renderEditableList("eventsList", "events");
  renderEditableList("customSectionsList", "customSections");
}

function renderEditableList(targetId, key) {
  const target = $(`#${targetId}`);
  if (!target) return;
  target.innerHTML = (state[key] || []).map((item, index) => `
    <article class="list-item ${key === "gallery" ? "photo-item" : ""}">
      ${key === "gallery" ? `<span class="thumb" aria-hidden="true"></span>` : ""}
      <div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></div>
      <div class="row-actions">
        <button class="mini-btn" type="button" data-edit="${key}" data-index="${index}">${t("actions.edit")}</button>
        <button class="mini-btn danger" type="button" data-delete="${key}" data-index="${index}">${t("actions.delete")}</button>
      </div>
    </article>
  `).join("");
}

function renderDashboard() {
  const epks = $("#epkRows");
  if (epks) {
    epks.innerHTML = [
      { icon: "M", title: `${state.artistName} Main EPK`, detail: t("dashboard.updated"), views: "1.2k", status: t("dashboard.live") },
      { icon: "D", title: state.discography[0]?.title || t("dashboard.releaseFallback"), detail: t("dashboard.draft"), views: "842", status: t("dashboard.draftStatus") }
    ].map((row) => `
      <article class="epk-row">
        <i>${row.icon}</i>
        <div><strong>${escapeHtml(row.title)}</strong><p>${escapeHtml(row.detail)}</p></div>
        <div><strong>${row.views}</strong><p>${row.status}</p></div>
      </article>
    `).join("");
  }
  const bars = $("#barChart");
  if (bars && !bars.dataset.ready) {
    bars.dataset.ready = "true";
    bars.innerHTML = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB"].map((day, index) => `
      <div class="bar"><span style="height:${40 + index * 7}%"></span><b style="height:${62 - index * 4}%"></b><small>${day}</small></div>
    `).join("");
  }
  const feed = $("#activityFeed");
  if (feed) {
    feed.innerHTML = [
      ["DL", t("feed.agent"), t("feed.now")],
      ["ON", t("feed.universal"), t("feed.london")],
      ["SH", t("feed.shared"), t("feed.newyork")],
      ["DL", t("feed.promoter"), t("feed.ibiza")]
    ].map(([icon, title, detail]) => `<article class="activity-item"><span>${icon}</span><div><strong>${title}</strong><small>${detail}</small></div></article>`).join("");
  }
}

function renderReport() {
  const regions = $("#regionList");
  if (!regions) return;
  regions.innerHTML = [["01", "Estados Unidos", "32%"], ["02", "Alemania", "18%"], ["03", "Reino Unido", "14%"], ["04", "Paises Bajos", "11%"], ["05", "Brasil", "9%"]]
    .map(([num, name, value]) => `<div class="region-row"><strong>${num}</strong><span>${name}</span><b>${value}</b></div>`)
    .join("");
}

function renderProgress() {
  const value = completion();
  $("#progressBar")?.style.setProperty("width", `${value}%`);
  const text = $("#progressText");
  if (text) text.textContent = `${value}%`;
}

function openItemDialog(key, index = null) {
  editing = { key, index };
  const item = index === null ? { title: "", detail: "" } : state[key][index];
  $("#dialogTitle").textContent = index === null ? `${t("dialog.add")} ${label(key)}` : `${t("actions.edit")} ${label(key)}`;
  $("#itemForm").elements.title.value = item.title;
  $("#itemForm").elements.detail.value = item.detail;
  $("#itemDialog").showModal();
}

function saveDialogItem() {
  const form = $("#itemForm");
  const title = form.elements.title.value.trim();
  const detail = form.elements.detail.value.trim();
  if (!title) return;
  if (editing.index === null) state[editing.key].push({ title, detail });
  else state[editing.key][editing.index] = { title, detail };
  saveState(editing.index === null ? t("toast.added") : t("toast.updated"));
}

function deleteItem(key, index) {
  state[key].splice(index, 1);
  saveState(t("toast.deleted"));
}

function newEpk() {
  state = { ...defaults, refId: `ST-${Math.floor(Math.random() * 900 + 100)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}` };
  bindForm();
  saveState(t("toast.new"));
  navigate("editor");
}

function printActive() {
  $$(".view").forEach((view) => view.classList.toggle("printing", view.dataset.view === activeView));
  showToast(t("toast.print"));
  setTimeout(() => window.print(), 220);
}

function label(key) {
  return {
    rider: "rider", gallery: "foto", videos: "video", discography: "discografia", events: "evento", customSections: "seccion",
    instagram: "Instagram", spotify: "Spotify", soundcloud: "SoundCloud", youtube: "YouTube"
  }[key] || key;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

document.addEventListener("click", (event) => {
  const langButton = event.target.closest("[data-lang]");
  if (langButton) {
    state.lang = langButton.dataset.lang;
    persistQuietly();
    render();
    $(".locale-picker")?.classList.remove("open");
    $(".locale-btn")?.setAttribute("aria-expanded", "false");
    showToast(t("toast.lang", { lang: langButton.textContent }));
    return;
  }

  const nav = event.target.closest("[data-nav]");
  if (nav) navigate(nav.dataset.nav);

  const add = event.target.closest("[data-add]");
  if (add) openItemDialog(add.dataset.add);

  const edit = event.target.closest("[data-edit]");
  if (edit) openItemDialog(edit.dataset.edit, Number(edit.dataset.index));

  const del = event.target.closest("[data-delete]");
  if (del) deleteItem(del.dataset.delete, Number(del.dataset.index));

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "toggle-locale") {
    const picker = $(".locale-picker");
    const isOpen = picker?.classList.toggle("open");
    $(".locale-btn")?.setAttribute("aria-expanded", String(Boolean(isOpen)));
  }
  if (action === "menu") $(".mobile-menu")?.classList.toggle("open");
  if (action === "print") printActive();
  if (action === "save") {
    const errors = validateForm();
    if (errors.length) showToast(t("toast.needsReview"));
    else saveState(t("toast.saved"));
  }
  if (action === "new-epk") newEpk();
  if (action === "settings") showToast(t("toast.settings"));
  if (action === "notify") showToast(t("toast.notify"));
  if (action === "help") showToast(t("toast.help"));
  if (action === "signout") showToast(t("toast.signout"));
  if (action === "close-dialog") $("#itemDialog")?.close();
  if (action === "view-all") navigate("preview");
  if (action === "scan") {
    $$(".bar span, .bar b").forEach((bar) => { bar.style.height = `${Math.floor(Math.random() * 70) + 20}%`; });
    showToast(t("toast.scan"));
  }
  if (action === "edit-all") navigate("media");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".locale-picker")) {
    $(".locale-picker")?.classList.remove("open");
    $(".locale-btn")?.setAttribute("aria-expanded", "false");
  }
});

$("#itemForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  saveDialogItem();
  $("#itemDialog").close();
});

$("#photoInput")?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast(t("toast.photoType"));
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    state.photo = reader.result;
    saveState(t("toast.photoUpdated"));
  };
  reader.readAsDataURL(file);
});

setInterval(() => {
  if (activeView !== "dashboard") return;
  $$(".bar span, .bar b").forEach((bar) => { bar.style.height = `${Math.floor(Math.random() * 72) + 18}%`; });
}, 3200);

bindForm();
render();
navigate("home");
