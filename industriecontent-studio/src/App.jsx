import { useState } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const exampleText = `Wir sind ein technischer Industrie-Dienstleister mit Sitz in Nürnberg.
Unser Unternehmen bietet professionelle Lösungen in den Bereichen Wartung,
Instandhaltung und technische Beratung für B2B-Kunden.

Unsere Stärken:
- Zuverlässige Projektabwicklung
- Erfahrene Fachkräfte
- Individuelle Lösungen für Industrieunternehmen

Ziel: Eine kurze, professionelle Unternehmensbeschreibung für unsere Website.`;

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="title">IndustrieContent Studio</h1>
          <p className="subtitle">
            KI-Textassistent für technische Industrie-Dienstleister (B2B)
          </p>
        </div>
      </header>

      <div className="workspace">
        {/* LEFT PANEL */}
        <section className="panel">
          <h2 className="panelTitle">Eingabe</h2>

          <label className="label">
            Vorlage
            <select className="select">
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
              placeholder="Beschreibe kurz dein Unternehmen oder füge Stichpunkte ein…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </label>
          <div className="buttonGroup">
            <button
              className="button buttonGhost"
              onClick={() => setInputText(exampleText)}
            >
              Beispieltext einfügen
            </button>
            <button
              className="button"
              onClick={() => {
                setResultText(inputText);
                setInputText("");
              }}
            >
              Text vorbereiten
            </button>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="panel">
          <h2 className="panelTitle">Ergebnis</h2>
          <p className="hint">
            Hier wird später der generierte Text angezeigt.
          </p>

          <div className="resultBox">
            <p className="resultPlaceholder">
              {resultText ||
                "Noch kein Ergebnis. Gib Text ein und klicke auf den Button."}
            </p>
          </div>

          <button
            className="button buttonGhost"
            disabled={!resultText}
            onClick={() => navigator.clipboard.writeText(resultText)}
          >
            Kopieren
          </button>
        </section>
      </div>
    </div>
  );
}
