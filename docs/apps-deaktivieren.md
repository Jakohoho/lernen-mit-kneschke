# 🙈 Anleitung: Ein Spiel vorübergehend ausblenden

Manchmal soll ein Spiel kurzzeitig verschwinden – etwa weil die Inhalte
veraltet sind oder gerade überarbeitet werden. Dafür gibt es das
`aktiv`-Flag im Manifest des Spiels.

## So geht's

In der `manifest.js` des Spiels (z. B.
`content/games/klasse7-englisch-self-pronouns-race/manifest.js`) das Flag
auf `false` stellen:

```js
export default {
  id: 'self-pronouns-race',
  // …
  aktiv: false,   // ← Spiel ist jetzt für Schüler unsichtbar
  // …
};
```

Danach committen und pushen – nach ca. 1–2 Minuten ist die Änderung auf
GitHub Pages live (siehe [github-pages.md](github-pages.md)).

## Was dann passiert

- Das Spiel verschwindet aus der **Spieleliste**, dem **Fach** und der **Startseite**.
- Hat ein Fach oder eine Klassenstufe danach **kein aktives Spiel mehr**,
  blendet sie sich automatisch komplett aus – ganz ohne weitere Änderung.
- Wer einen **direkten Link** (`#/spiel/self-pronouns-race`) aufruft, sieht
  einen freundlichen „Spiel nicht gefunden"-Hinweis mit Knopf zur Startseite.

## Wieder einblenden

Einfach `aktiv: true` setzen (oder die Zeile ganz löschen – ein fehlendes
Flag zählt als aktiv), committen, pushen. Fertig.
