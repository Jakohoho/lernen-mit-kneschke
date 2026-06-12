# 🎮 Anleitung: Ein neues Spiel anlegen

Ein Spiel besteht aus einem Ordner unter `content/games/` und einer
Import-Zeile in `js/registry.js`. Das war's – Klasse, Fach und Kategorie
erscheinen automatisch in der Navigation.

## Schritt 1: Spielordner anlegen

Lege unter `content/games/` einen neuen Ordner an. Bewährtes Namensschema:
`klasse<NR>-<fach>-<spielname>`, z. B.:

```
content/games/klasse8-englisch-irregular-verbs-quiz/
├── manifest.js     (Pflicht – Steckbrief des Spiels)
├── game.js         (Pflicht – Spiellogik, KEINE Lerninhalte)
├── data.js         (Pflicht – alle Lerninhalte, getrennt von der Logik)
└── game.css        (optional – eigene Styles)
```

> Tipp: Am einfachsten kopierst du einen vorhandenen Spielordner
> (z. B. `klasse7-englisch-self-pronouns-race`) und passt ihn an.

## Schritt 2: `manifest.js` ausfüllen

```js
export default {
  id: 'irregular-verbs-quiz',          // eindeutig, klein, ohne Leerzeichen
  titel: 'Irregular Verbs Quiz',       // wird in der Spieleliste angezeigt
  beschreibung: 'Teste dein Wissen über unregelmäßige Verben!',
  emoji: '⚡',                          // Icon in der Spieleliste
  klasse: 8,                           // Zahl 5–12
  fach: 'englisch',                    // Slug aus content/struktur.js
  kategorie: 'grammatik',              // Slug aus content/struktur.js
  aktiv: true,                         // false = Spiel ist für Schüler unsichtbar
  laden: () => import('./game.js'),    // immer so lassen
  stylesUrl: new URL('./game.css', import.meta.url).href, // weglassen, wenn kein CSS
};
```

## Schritt 2b: Inhalte gehören in `data.js`

**Lerninhalte und Spiellogik sind strikt getrennt.** Alles, was inhaltlich ist –
Vokabeln, Lückensätze, Fragen, Antworten, Antwortoptionen – liegt ausschließlich
in `data.js` und wird von `game.js` importiert. So lassen sich Inhalte später
ohne Programmierkenntnisse austauschen oder erweitern.

```js
// data.js – nur Inhalte, keine Logik:
export const PRONOMEN = ['myself', 'yourself', /* … */];
export const FELDER = [
  { typ: 'frage', nr: 1, satz: 'I made this cake by ___.', antwort: 'myself', emoji: '🎂' },
  // …
];
```

UI-Texte (Knopf-Beschriftungen, Feedback-Meldungen, Spielregeln) dürfen in
`game.js` bleiben – sie gehören zur Oberfläche, nicht zum Lerninhalt.
Referenz: `content/games/klasse7-englisch-self-pronouns-race/`.

## Schritt 3: `game.js` schreiben – der Spiel-Vertrag

Jedes Spiel exportiert genau eine Funktion `mount(container, context)`:

```js
export function mount(container, context) {
  // container: das DOM-Element, in das dein Spiel rendert
  // context:   Brücke zur Plattform (siehe unten)

  container.innerHTML = `<button class="knopf">Spiel beenden</button>`;
  container.querySelector('button').addEventListener('click', () => {
    context.showEndScreen({
      titel: 'Geschafft!',
      untertitel: 'Tolle Runde!',
      ergebnisse: [
        // Bei einem Spieler: eine Zeile. Bei mehreren: Rangliste
        // (oben = Platz 1). farbe & detail sind optional.
        { name: 'Anna', wert: '8 Punkte', detail: '8 richtig · 2 falsch', farbe: '#FF6B57', sieger: true },
        { name: 'Ben', wert: '5 Punkte', sieger: false },
      ],
      onRestart: () => mount(container, context), // was bei „Nochmal spielen" passiert
    });
  });

  // Optional: Aufräum-Funktion zurückgeben. Sie wird aufgerufen, wenn
  // der Spieler die Seite verlässt (Timer stoppen, Listener entfernen …).
  return () => { /* aufräumen */ };
}
```

### Was der `context` bietet

| Funktion | Wirkung |
| --- | --- |
| `context.exit()` | Zurück zur Spieleliste (richtige Klasse + Fach) |
| `context.showEndScreen({...})` | Universeller Endscreen mit Konfetti, Ergebnis, **„Nochmal spielen"** (ruft dein `onRestart` auf) und **„Zurück zur Übersicht"** |
| `context.manifest` | Das eigene Manifest (falls du Titel etc. brauchst) |

**Wichtig:** Nutze am Spielende immer `context.showEndScreen(...)`. So verhalten
sich alle Spiele gleich – Neustart und Rückweg zur Übersicht sind garantiert.

Du kannst die fertigen Plattform-Styles nutzen: `knopf` (Button, Varianten
`knopf--minze`, `knopf--koralle`, `knopf--himmel`, `knopf--gross`, `knopf--block`)
sowie die CSS-Variablen aus `css/base.css` (`var(--koralle)`, `var(--radius)` …).

### Empfehlung: Hardcore-Modus als Muster

Wenn dein Spiel Antworten zur Auswahl anbietet (Multiple Choice), biete nach
Möglichkeit zusätzlich einen **🔥 Hardcore-Modus** an: Statt zu wählen, tippen
die Schüler die Antwort frei in ein Textfeld. Bewährte Regeln dafür:

- Vergleich mit `eingabe.trim().toLowerCase() === antwort.toLowerCase()`
  (Leerzeichen und Groß-/Kleinschreibung verzeihen).
- Leere Eingaben ignorieren, Absenden per `<form>` + Submit (damit die
  Enter-Taste der Handy-Tastatur funktioniert).
- Eingabefeld mit mindestens 16 px Schriftgröße (verhindert Auto-Zoom auf iOS).

Referenz-Implementierung: `zeigeFrage()` im Self-Pronouns Race.

## Schritt 4: In der Registry eintragen

In `js/registry.js` zwei Zeilen ergänzen:

```js
import irregularVerbsQuiz from '../content/games/klasse8-englisch-irregular-verbs-quiz/manifest.js';

export const SPIELE = [
  selfPronounsRace,
  irregularVerbsQuiz,   // ← neu
];
```

> ⚠️ `SPIELE` enthält **auch deaktivierte** Spiele. Wenn du irgendwo Spiele
> anzeigen willst, nutze immer die Helper-Funktionen der Registry
> (`spieleFuer()`, `klassenMitSpielen()` …) – sie filtern `aktiv: false` heraus.
> Iteriere nie direkt über `SPIELE`.

## Schritt 5: Testen

Lokalen Server starten (siehe [README](../README.md)), Seite öffnen und prüfen:

1. Erscheint die Klassenstufe auf der Startseite?
2. Erscheint das Spiel im richtigen Fach unter der richtigen Kategorie?
3. Funktioniert das Spiel auf einem schmalen Bildschirm (Browser-Fenster schmal ziehen)?
4. Führen „Nochmal spielen" und „Zurück zur Übersicht" am Ende ans richtige Ziel?
5. Kurz `aktiv: false` im Manifest setzen: Verschwindet das Spiel überall
   (Startseite, Fächer, Spieleliste) und zeigt der direkte Link `#/spiel/<id>`
   „nicht gefunden"? Danach wieder auf `true` stellen!

Danach committen und pushen – fertig (siehe [github-pages.md](github-pages.md)).
