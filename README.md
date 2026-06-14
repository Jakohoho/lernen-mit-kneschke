# 🎲 Lernen mit Kneschke

Eine interaktive Lernspiel-Plattform für den Unterricht. Schüler wählen ihre
**Klassenstufe → Fach → Spiel** und lernen direkt auf dem Handy – im Unterricht
oder zu Hause. Mobile first, aber auch am Desktop voll nutzbar.

**Technik:** Reines HTML/CSS/JavaScript (ES-Module), **kein Build-Schritt, keine
Abhängigkeiten**. Die Seite läuft direkt auf GitHub Pages – Änderungen pushen genügt.

## 🚀 Lokal ansehen

Da die Seite ES-Module nutzt, braucht sie einen kleinen Webserver (eine direkt
geöffnete `index.html`-Datei funktioniert nicht). Im Projektordner:

```
# Variante 1 (wenn Python installiert ist):
python -m http.server 8000

# Variante 2 (wenn Node.js installiert ist):
npx serve .
```

Dann im Browser öffnen: `http://localhost:8000`

## 📁 Projektstruktur

```
├── index.html                  Die einzige HTML-Datei (App-Hülle)
├── css/
│   ├── base.css                Design-Tokens, Grund-Styles (mobile first)
│   └── components.css          Karten, Buttons, Breadcrumb, Endscreen
├── js/
│   ├── app.js                  Einstiegspunkt
│   ├── router.js               Hash-Router (#/klasse/7/englisch …)
│   ├── registry.js             ⭐ Zentrale Spiele-Registry
│   ├── views/                  Die Seiten (Klassen → Fächer → Spiele → Spiel)
│   └── lib/endscreen.js        Universeller Endscreen für alle Spiele
├── content/
│   ├── struktur.js             ⭐ Klassen, Fächer, Kategorien (Stammdaten)
│   └── games/                  ⭐ Ein Ordner pro Spiel
│       └── klasse7-englisch-self-pronouns-race/
│           ├── manifest.js     Zuordnung: Klasse, Fach, Kategorie + aktiv-Flag
│           ├── data.js         Spielinhalte (Fragen, Felder)
│           ├── game.js         Spiellogik
│           └── game.css        Spiel-eigene Styles
└── docs/                       Anleitungen (siehe unten)
    ├── formular-neue-app-idee.pdf   Druckbares Formular für neue App-Ideen
    └── formular-neue-app-idee.py    Erzeugt das PDF (python + fpdf2)
```

## 🧩 So funktioniert die Modularität

- **`content/struktur.js`** enthält die Stammdaten: Klassen 5–12, Fächer und
  Kategorien (Name, Emoji, Farbe).
- **Jedes Spiel** ist ein eigener Ordner unter `content/games/` mit einem
  `manifest.js`, das sich selbst einer Klasse, einem Fach und einer Kategorie zuordnet.
- **`js/registry.js`** listet alle Spiele auf. **Ein neues Spiel registrieren =
  eine Import-Zeile.**
- Die Navigation entsteht automatisch: Eine Klassenstufe oder ein Fach erscheint
  erst, wenn es dafür mindestens ein **aktives** Spiel gibt. Leere Bereiche bleiben unsichtbar.
- **Spiele lassen sich vorübergehend verstecken:** `aktiv: false` im Manifest setzen –
  das Spiel verschwindet überall für die Schüler, Klassen/Fächer ohne aktives Spiel
  blenden sich automatisch mit aus (siehe [docs/apps-deaktivieren.md](docs/apps-deaktivieren.md)).
- **Logik und Inhalt sind getrennt:** Alle Lerninhalte (Vokabeln, Sätze, Fragen)
  liegen pro Spiel in einer eigenen `data.js` und lassen sich ohne Programmierkenntnisse
  austauschen.

## 📖 Anleitungen

| Was möchtest du tun? | Anleitung |
| --- | --- |
| Ein neues Spiel anlegen | [docs/neues-spiel.md](docs/neues-spiel.md) |
| Ein Spiel vorübergehend ausblenden | [docs/apps-deaktivieren.md](docs/apps-deaktivieren.md) |
| Klasse, Fach oder Kategorie ergänzen | [docs/klassen-faecher-kategorien.md](docs/klassen-faecher-kategorien.md) |
| Die Seite auf GitHub Pages veröffentlichen | [docs/github-pages.md](docs/github-pages.md) |
| Eine neue App-Idee einreichen | [docs/formular-neue-app-idee.pdf](docs/formular-neue-app-idee.pdf) ausdrucken und ausfüllen |

## 🎮 Vorhandene Spiele

| Spiel | Klasse | Fach | Kategorie | Besonderheiten |
| --- | --- | --- | --- | --- |
| 🏁 Self-Pronouns Race | 7 | Englisch | Grammatik | 🔥 Hardcore-Modus (Antwort frei eintippen) |
| 🏎️ Conditionals Race | 8 | Englisch | Grammatik | If-Sätze Typ 1/2/3, Satz-Pool (Felder wechseln), falsch = zurück · 🔥 Hardcore-Modus |
