import { useRef, useState } from "react";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const resultRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [resultText, setResultText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [isLangSwitching, setIsLangSwitching] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState("company");
  const copy = {
    de: {
      title: "IndustrieContent Studio",
      subtitle: "KI-Textassistent für technische Industrie-Dienstleister (B2B)",
      inputTitle: "Eingabe",
      resultTitle: "Ergebnis",
      generate: "Text vorbereiten",
      copy: "Kopieren",
      loading: "Generiere…",
      exampleBtn: "Beispieltext einfügen",
      badge: "Demo · Mock AI",
      templateLabel: "Vorlage",
      inputLabel: "Eingabetext",
      templates: {
        company: "Unternehmensbeschreibung (B2B)",
        services: "Leistungsbeschreibung",
        landing: "Landing-Text",
        google: "Google Business Beschreibung",
        email: "Kundenantwort (E-Mail)",
      },
    },

    en: {
      title: "IndustryContent Studio",
      subtitle: "AI Text Assistant for Industrial B2B Companies",
      inputTitle: "Input",
      resultTitle: "Result",
      generate: "Generate text",
      copy: "Copy",
      loading: "Generating…",
      exampleBtn: "Insert example",
      badge: "Demo · AI Simulation",
      templateLabel: "Template",
      inputLabel: "Input text",
      templates: {
        company: "Company Description (B2B)",
        services: "Service Description",
        landing: "Landing Text",
        google: "Google Business Description",
        email: "Customer Response (Email)",
      },
    },
  };
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "de");

  const t = copy[lang];

  const PLACEHOLDERS = {
    de: {
      company:
        "Beschreibe kurz dein Unternehmen (Branche, Leistungen, Zielkunden, Vorteile)…",

      services:
        "Welche Leistung bietest du an? Für wen? Prozess, Umfang, Vorteile (Stichpunkte)…",

      landing:
        "Ziel der Landingpage + Angebot + Zielgruppe + Ton (seriös / modern)…",

      google:
        "Kurz: Wer seid ihr? Was macht ihr? Standort Nürnberg + 3–5 Vorteile…",

      email:
        "Beschreibe die Anfrage des Kunden + gewünschter Ton + wichtige Details…",
    },
    en: {
      company:
        "Shortly describe your company (industry, services, target clients, benefits)…",
      services:
        "What service do you offer? For whom? Process, scope, benefits (bullet points)…",

      landing:
        "Landing page goal + offer + target audience + tone (serious / modern)…",

      google: "Short: Who are you? What do you do? Location + 3–5 benefits…",

      email:
        "Describe the customer request + desired tone + important details…",
    },
  };
  const EXAMPLES = {
    de: {
      company: `Wir sind ein technischer Industrie-Dienstleister mit Sitz in Nürnberg.
Wir unterstützen Industrieunternehmen in den Bereichen Wartung, Instandhaltung und technische Beratung.

Unsere Stärken:
- Zuverlässige Projektabwicklung
- Erfahrene Fachkräfte
- Individuelle Lösungen

Ziel: Eine kurze, professionelle Unternehmensbeschreibung für unsere Website.`,

      services: `Leistung: Industrielle Wartung & Instandhaltung (B2B)
Zielgruppe: Produktionsbetriebe in Nürnberg und Umgebung
Umfang:
- Regelmäßige Wartungsintervalle
- Störungsbehebung (kurzfristig)
- Dokumentation & Prüfprotokolle

Vorteile:
- Weniger Stillstandzeiten
- Planbare Kosten
- Erhöhte Anlagenverfügbarkeit`,

      landing: `Ziel: Anfragen für Wartungs-Services generieren
Angebot: Wartung & Instandhaltung für Industrieanlagen
USP:
- Schnelle Reaktionszeiten
- Zertifizierte Fachkräfte
- Transparente Prozesse

CTA: Termin vereinbaren / Angebot anfordern`,

      google: `Technischer Industrie-Dienstleister in Nürnberg.
Wir bieten Wartung, Instandhaltung und technische Beratung für B2B-Kunden.
Zuverlässig, termintreu und mit erfahrenen Fachkräften. Kontaktieren Sie uns für ein Angebot.`,

      email: `Kunde: Anfrage zur Wartung einer Produktionsanlage (Termin + Kosten)
Ton: freundlich & professionell
Wichtige Infos: Standort Nürnberg, Zeitraum nächste Woche

Bitte antworte dem Kunden und schlage einen kurzen Telefontermin vor.`,
    },
    en: {
      company: `We are an industrial service provider based in Nuremberg.
We support industrial companies in maintenance, servicing and technical consulting.

Our strengths:
- Reliable project execution
- Experienced specialists
- Individual B2B solutions

Goal: A short, professional company description for our website.`,

      services: `Service: Industrial maintenance & servicing (B2B)
Target group: Manufacturing companies in Nuremberg and surrounding areas
Scope:
- Regular maintenance intervals
- Quick troubleshooting
- Documentation & inspection reports

Benefits:
- Reduced downtime
- Predictable costs
- Increased equipment availability`,

      landing: `Goal: Generate inquiries for maintenance services
Offer: Maintenance & servicing for industrial equipment
USP:
- Fast response times
- Certified specialists
- Transparent processes

CTA: Request a quote / Book a consultation`,

      google: `Industrial service provider in Nuremberg.
We offer maintenance, servicing and technical consulting for B2B clients.
Reliable, on time and with experienced specialists. Contact us for a quote.`,

      email: `Customer request: Maintenance of industrial equipment (timing + cost)
Tone: friendly & professional
Key info: Nuremberg location, next week timeframe

Please respond to the customer and suggest a short call to clarify details.`,
    },
  };

  const smartPlaceholder =
    PLACEHOLDERS[lang]?.[selectedTemplate] ||
    PLACEHOLDERS["de"][selectedTemplate] ||
    "Beschreibe kurz dein Unternehmen oder füge Stichpunkte ein…";
  function buildResult(template, text) {
    const clean = text.trim();
    if (!clean) return "";

    switch (template) {
      case "company":
        return `**Unternehmensprofil (Kurztext)**
        

${clean}

**Leistungen**
- Wartung & Instandhaltung
- Technische Beratung
- Individuelle B2B-Lösungen

**Kontakt**
Nürnberg · Angebot anfordern · Telefontermin vereinbaren`;

      case "services":
        return `**Leistungsbeschreibung**

${clean}

**Nutzen für den Kunden**
- Reduzierte Stillstandzeiten
- Planbare Wartung
- Dokumentierte Qualität (B2B)

**Nächster Schritt**
Kurz telefonieren → Bedarf klären → Angebot senden`;

      case "landing":
        return `**Headline**
Zuverlässige Wartung & Instandhaltung für Industrieanlagen in Nürnberg

**Kurzbeschreibung**
${clean}

**Vorteile**
- Schnelle Reaktionszeit
- Erfahrene Fachkräfte
- Transparente Prozesse

**Call-to-Action**
Jetzt Angebot anfordern`;

      case "google":
        return `
${clean}
Wartung, Instandhaltung & technische Beratung für B2B-Kunden. Kontaktieren Sie uns für ein Angebot.`;

      case "email":
        return `Betreff: Ihre Anfrage zur Wartung – kurzer Abstimmungstermin

Guten Tag,

vielen Dank für Ihre Anfrage. ${clean}

Gerne klären wir die Details (Umfang, Termin, benötigte Informationen) in einem kurzen Telefonat.
Passt Ihnen morgen oder übermorgen ein 10–15-minütiger Termin?

Mit freundlichen Grüßen
IndustrieContent Studio`;

      default:
        return clean;
    }
  }
  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(resultText);
      setToast("Kopiert!");
      setTimeout(() => setToast(""), 1500);
    } catch {
      setToast("Kopieren nicht möglich (Browser-Berechtigung).");
      setTimeout(() => setToast(""), 2000);
    }
  }
  function switchLang(nextLang) {
    if (nextLang === lang) return;

    setIsLangSwitching(true);
    setLang(nextLang);
    localStorage.setItem("lang", nextLang);

    setTimeout(() => {
      setIsLangSwitching(false);
    }, 220);
  }

  return (
    <div className={`app ${theme}`}>
      <div className={`container ${isLangSwitching ? "langFade" : ""}`}>
        <header className="header">
          <div>
            <div className="titleRow">
              <h1 className="title">{t.title}</h1>

              <span className="badge">{t.badge}</span>
              <div className="controlsRow">
                <div className="langSwitch">
                  <button
                    type="button"
                    className={`langBtn ${lang === "de" ? "active" : ""}`}
                    onClick={() => switchLang("de")}
                  >
                    DE
                  </button>

                  <button
                    type="button"
                    className={`langBtn ${lang === "en" ? "active" : ""}`}
                    onClick={() => switchLang("en")}
                  >
                    EN
                  </button>
                </div>

                <button
                  className="themeBtn"
                  onClick={toggleTheme}
                  type="button"
                >
                  {theme === "light" ? "Dark" : "Light"}
                </button>
              </div>
            </div>

            <p className="subtitle">{t.subtitle}</p>
          </div>
        </header>

        <div className="workspace">
          {/* LEFT PANEL */}
          <section className="panel" ref={resultRef}>
            <h2 className="panelTitle">{t.inputTitle}</h2>

            <label className="label">
              {t.templateLabel}
              <select
                className="select"
                value={selectedTemplate}
                onChange={(e) => {
                  setSelectedTemplate(e.target.value);
                }}
              >
                <option value="company">{t.templates.company}</option>
                <option value="services">{t.templates.services}</option>
                <option value="landing">{t.templates.landing}</option>
                <option value="google">{t.templates.google}</option>
                <option value="email">{t.templates.email}</option>
              </select>
            </label>

            <label className="label">
              {t.inputLabel}
              <textarea
                className="textarea"
                rows={8}
                disabled={isLoading}
                placeholder={smartPlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </label>
            <div className="buttonGroup">
              <button
                className="button buttonGhost"
                onClick={() => {
                  const example = EXAMPLES[lang]?.[selectedTemplate];

                  setInputText(example || "");
                }}
              >
                {t.exampleBtn}
              </button>
              <button
                className="button"
                disabled={!inputText.trim() || isLoading}
                onClick={() => {
                  setIsLoading(true);

                  setTimeout(() => {
                    const output = buildResult(selectedTemplate, inputText);

                    setResultText(output);
                    setTypedText(""); // сброс печати
                    setInputText("");
                    setIsLoading(false);
                    requestAnimationFrame(() => {
                      resultRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    });

                    let i = 0;
                    const interval = setInterval(() => {
                      i += 1;
                      setTypedText(output.slice(0, i));
                      if (i >= output.length) clearInterval(interval);
                    }, 12); // скорость печати
                  }, 800);
                }}
              >
                {isLoading ? t.loading : t.generate}
              </button>
            </div>
          </section>

          {/* RIGHT PANEL */}
          <section className="panel">
            <h2 className="panelTitle">{t.resultTitle}</h2>

            <p className="hint">
              Hier wird später der generierte Text angezeigt.
            </p>

            <div className="resultBox">
              {isLoading ? (
                <div className="skeleton">
                  <div className="skLine w80" />
                  <div className="skLine w95" />
                  <div className="skLine w70" />
                  <div className="skLine w90" />
                </div>
              ) : resultText ? (
                <div className="resultText">
                  {(typedText || resultText).trim()}

                  {typedText && typedText.length < resultText.length ? (
                    <span className="cursor">▍</span>
                  ) : null}
                </div>
              ) : (
                <p className="resultPlaceholder">
                  Noch kein Ergebnis. Gib Text ein und klicke auf den Button.
                </p>
              )}
            </div>

            <button
              className="button buttonGhost"
              disabled={!resultText}
              onClick={handleCopy}
            >
              {t.copy}
            </button>
            {toast && <p className="hint">{toast}</p>}
          </section>
        </div>
      </div>
    </div>
  );
}
