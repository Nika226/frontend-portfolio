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

  const [selectedTemplate, setSelectedTemplate] = useState(
    "Unternehmensbeschreibung (B2B)",
  );
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
    },
  };
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "de");

  const t = copy[lang];

  const PLACEHOLDERS = {
    "Unternehmensbeschreibung (B2B)":
      "Beschreibe kurz dein Unternehmen (Branche, Leistungen, Zielkunden, Vorteile)…",
    Leistungsbeschreibung:
      "Welche Leistung bietest du an? Für wen? Prozess, Umfang, Vorteile (Stichpunkte)…",
    "Landing-Text":
      "Ziel der Landingpage + Angebot + Zielgruppe + Ton (seriös / modern)…",
    "Google Business Beschreibung":
      "Kurz: Wer seid ihr? Was macht ihr? Standort Nürnberg + 3–5 Vorteile…",
    "Kundenantwort (E-Mail)":
      "Beschreibe die Anfrage des Kunden + gewünschter Ton + wichtige Details…",
  };
  const EXAMPLES = {
    "Unternehmensbeschreibung (B2B)": `Wir sind ein technischer Industrie-Dienstleister mit Sitz in Nürnberg.
Wir unterstützen Industrieunternehmen in den Bereichen Wartung, Instandhaltung und technische Beratung.

Unsere Stärken:
- Zuverlässige Projektabwicklung
- Erfahrene Fachkräfte
- Individuelle Lösungen

Ziel: Eine kurze, professionelle Unternehmensbeschreibung für unsere Website.`,

    Leistungsbeschreibung: `Leistung: Industrielle Wartung & Instandhaltung (B2B)
Zielgruppe: Produktionsbetriebe in Nürnberg und Umgebung
Umfang:
- Regelmäßige Wartungsintervalle
- Störungsbehebung (kurzfristig)
- Dokumentation & Prüfprotokolle

Vorteile:
- Weniger Stillstandzeiten
- Planbare Kosten
- Erhöhte Anlagenverfügbarkeit`,

    "Landing-Text": `Ziel: Anfragen für Wartungs-Services generieren
Angebot: Wartung & Instandhaltung für Industrieanlagen
USP:
- Schnelle Reaktionszeiten
- Zertifizierte Fachkräfte
- Transparente Prozesse

CTA: Termin vereinbaren / Angebot anfordern`,

    "Google Business Beschreibung": `Technischer Industrie-Dienstleister in Nürnberg.
Wir bieten Wartung, Instandhaltung und technische Beratung für B2B-Kunden.
Zuverlässig, termintreu und mit erfahrenen Fachkräften. Kontaktieren Sie uns für ein Angebot.`,

    "Kundenantwort (E-Mail)": `Kunde: Anfrage zur Wartung einer Produktionsanlage (Termin + Kosten)
Ton: freundlich & professionell
Wichtige Infos: Standort Nürnberg, Zeitraum nächste Woche

Bitte antworte dem Kunden und schlage einen kurzen Telefontermin vor.`,
  };

  const smartPlaceholder =
    PLACEHOLDERS[selectedTemplate] ||
    "Beschreibe kurz dein Unternehmen oder füge Stichpunkte ein…";
  function buildResult(template, text) {
    const clean = text.trim();
    if (!clean) return "";

    switch (template) {
      case "Unternehmensbeschreibung (B2B)":
        return `**Unternehmensprofil (Kurztext)**
        

${clean}

**Leistungen**
- Wartung & Instandhaltung
- Technische Beratung
- Individuelle B2B-Lösungen

**Kontakt**
Nürnberg · Angebot anfordern · Telefontermin vereinbaren`;

      case "Leistungsbeschreibung":
        return `**Leistungsbeschreibung**

${clean}

**Nutzen für den Kunden**
- Reduzierte Stillstandzeiten
- Planbare Wartung
- Dokumentierte Qualität (B2B)

**Nächster Schritt**
Kurz telefonieren → Bedarf klären → Angebot senden`;

      case "Landing-Text":
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

      case "Google Business Beschreibung":
        return `
${clean}
Wartung, Instandhaltung & technische Beratung für B2B-Kunden. Kontaktieren Sie uns für ein Angebot.`;

      case "Kundenantwort (E-Mail)":
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
            <h2 className="panelTitle">Eingabe</h2>

            <label className="label">
              Vorlage
              <select
                className="select"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                <option>Unternehmensbeschreibung (B2B)</option>
                <option>Leistungsbeschreibung</option>
                <option>Landing-Text</option>
                <option>Google Business Beschreibung</option>
                <option>Kundenantwort (E-Mail)</option>
              </select>
            </label>

            <label className="label">
              Eingabetext
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
                onClick={() => setInputText(EXAMPLES[selectedTemplate] || "")}
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
