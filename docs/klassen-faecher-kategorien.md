# 🏫 Anleitung: Klassen, Fächer und Kategorien verwalten

Alle Stammdaten liegen in **einer** Datei: [`content/struktur.js`](../content/struktur.js).

**Wichtig zu wissen:** Auf der Website erscheint eine Klasse, ein Fach oder eine
Kategorie erst, wenn es dafür mindestens ein registriertes Spiel gibt. Du kannst
also gefahrlos Stammdaten anlegen – sie bleiben unsichtbar, bis das erste Spiel
dafür existiert.

## Neue Klassenstufe

Die Klassen 5–12 sind bereits angelegt. Falls doch einmal eine weitere nötig ist
(z. B. 13), einfach die Zahl ergänzen:

```js
export const KLASSEN = [5, 6, 7, 8, 9, 10, 11, 12, 13];
```

## Neues Fach

In `FAECHER` einen Eintrag hinzufügen. Der Schlüssel ist der „Slug" – er wird in
URLs und Spiel-Manifesten verwendet: **klein, ohne Leerzeichen, ohne Umlaute**
(`mathematik`, nicht `Mathematik` oder `mathe matik`).

```js
export const FAECHER = {
  englisch: { name: 'Englisch', emoji: '🇬🇧', farbe: 'var(--himmel)' },
  geographie: { name: 'Geographie', emoji: '🌍', farbe: 'var(--minze)' },
  mathematik: { name: 'Mathematik', emoji: '➗', farbe: 'var(--koralle)' },  // ← neu
};
```

- `name`: Anzeigename auf der Website
- `emoji`: Icon auf der Fach-Karte
- `farbe`: Akzentfarbe der Karten. Vorhandene Farb-Variablen:
  `var(--koralle)`, `var(--sonne)`, `var(--minze)`, `var(--himmel)`,
  `var(--beere)`, `var(--gras)` – oder ein eigener Farbwert wie `#7B5BE6`.

## Neue Kategorie

Kategorien gruppieren die Spiele innerhalb eines Fachs (z. B. bei Englisch:
Grammatik, Vokabeln). Sie gelten fachübergreifend – jedes Fach zeigt nur die
Kategorien, für die es Spiele hat. In `KATEGORIEN` ergänzen:

```js
export const KATEGORIEN = {
  grammatik: { name: 'Grammatik', emoji: '✏️' },
  vokabeln: { name: 'Vokabeln', emoji: '📖' },
  hoerverstehen: { name: 'Hörverstehen', emoji: '🎧' },  // ← neu
};
```

Die Reihenfolge in `KATEGORIEN` bestimmt auch die Reihenfolge der Abschnitte
in der Spieleliste.

## Und dann?

Spiele verweisen in ihrem `manifest.js` auf diese Slugs:

```js
klasse: 7,
fach: 'englisch',
kategorie: 'grammatik',
```

Sobald ein Spiel mit den neuen Slugs registriert ist (siehe
[neues-spiel.md](neues-spiel.md)), taucht alles automatisch in der Navigation auf.
