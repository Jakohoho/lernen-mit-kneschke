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
├── game.js         (Pflicht – Spiellogik)
├── data.js         (empfohlen – Inhalte getrennt von der Logik)
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
  laden: () => import('./game.js'),    // immer so lassen
  stylesUrl: new URL('./game.css', import.meta.url).href, // weglassen, wenn kein CSS
};
```

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

## Schritt 4: In der Registry eintragen

In `js/registry.js` zwei Zeilen ergänzen:

```js
import irregularVerbsQuiz from '../content/games/klasse8-englisch-irregular-verbs-quiz/manifest.js';

export const SPIELE = [
  selfPronounsRace,
  irregularVerbsQuiz,   // ← neu
];
```

## Schritt 5: Testen

Lokalen Server starten (siehe [README](../README.md)), Seite öffnen und prüfen:

1. Erscheint die Klassenstufe auf der Startseite?
2. Erscheint das Spiel im richtigen Fach unter der richtigen Kategorie?
3. Funktioniert das Spiel auf einem schmalen Bildschirm (Browser-Fenster schmal ziehen)?
4. Führen „Nochmal spielen" und „Zurück zur Übersicht" am Ende ans richtige Ziel?

Danach committen und pushen – fertig (siehe [github-pages.md](github-pages.md)).
