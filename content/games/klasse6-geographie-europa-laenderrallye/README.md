# 🗺️ Europa Länderrallye (Klasse 6, Geographie, Topographie)

Stumme Europakarte zum Antippen: Länder und Hauptstädte, die sechs Regionen,
Schengen-Raum, Euro-Länder und EU-Länder ohne Euro. Allein oder mit 2–4
Spielern reihum, mit 🔥 Hardcore-Modus (Hauptstädte/Kennzeichen eintippen).

## Dateien

| Datei | Inhalt | Von Hand ändern? |
| --- | --- | --- |
| `manifest.js` | Klasse, Fach, Kategorie, `aktiv`-Flag | ja |
| `data.js` | **Alle Lerninhalte**: 48 Länder mit Hauptstadt, Kennzeichen, Region, EU/Schengen/Euro, Währung, Spezialitäten | ja |
| `game.js` | Spielablauf, Aufgabenstellungen, „Kurz aufgefrischt“ | nur für Logik/Texte |
| `kartenansicht.js` | Kartenbedienung (Verschieben, Zwei-Finger-Zoom, Tippen) | selten |
| `game.css` | Aussehen (Präfix `elr-`) | selten |
| `karte.js` | Kartendaten (Grenzen, Hauptstadt-Punkte) – **erzeugt** | nein |
| `karte-erzeugen.py` | erzeugt `karte.js` | nur bei neuem Ausschnitt |

## Inhalte ändern

Alles steht in `data.js` und ist dort oben erklärt. Typische Änderungen:

- **Ein Land tritt dem Euro oder dem Schengen-Raum bei:** beim Land `euro: true`
  bzw. `schengen: true` setzen (bei Euro die `waehrung` löschen) und die Zahlen im
  Kopf von `data.js` sowie im Text „Kurz aufgefrischt“ (`AUFFRISCHUNG` in `game.js`) anpassen.
- **Andere Schreibweise einer Hauptstadt zulassen:** in `hauptstadtAuch` eintragen
  (zählt ohne Hinweis) oder in `hauptstadtAlt` mit Hinweistext (zählt mit Hinweis).
- **Spezialitäten:** `typisch: [['🥖', 'Baguette'], …]` – nur Emojis, die auch ältere
  Geräte kennen (Unicode 12 oder älter).

Die Codes (`id: 'FRA'` usw.) verbinden ein Land mit seiner Fläche in `karte.js`
und dürfen nicht geändert werden.

## Karte neu erzeugen

Nur nötig, wenn sich der Kartenausschnitt oder die Länderauswahl ändern soll.
Voraussetzungen: Python 3 und Node.js (für `npx mapshaper`).

```
cd content/games/klasse6-geographie-europa-laenderrallye
python3 karte-erzeugen.py
```

Das Skript lädt Natural Earth (1:10 Mio., gemeinfrei) mit deutscher Sicht auf
strittige Grenzen (Krim gehört zur Ukraine, Kosovo ist eigenständig), projiziert
flächentreu (Lambert, Mitte 52° N / 20° O), vereinfacht die Grenzen und schreibt
`karte.js`. Es entstehen nur Küsten, Grenzen und Hauptstadt-Punkte – keine
Beschriftungen, Flüsse oder Seen. Länder außerhalb der Liste werden grau und
sind nicht antippbar.

## Spielregeln (Kurzfassung)

- Jede Frage hat **einen Versuch**, danach wird die Lösung gezeigt.
- Hauptstadt eintippen (Hardcore): kleine Tippfehler zählen, mit Hinweis auf die
  richtige Schreibweise; ältere Schreibweisen (z. B. „Kiew“) zählen mit Hinweis.
- Aufgaben 3 und 4 im Hardcore-Modus: alle Länder auswählen, dann „Prüfen“.
  Aufgabe 5 fragt direkt nach jedem gefundenen Land die Währung ab.
- Monaco, San Marino und der Vatikan sind keine Schengen-Mitglieder, haben aber
  offene Grenzen – sie zählen bei Aufgabe 3 weder richtig noch falsch.
- Kleinstaaten (Monaco, San Marino, Vatikan, Liechtenstein, Andorra, Malta) haben
  einen gestrichelten Tipp-Kreis; ein Tipp knapp daneben ins Meer trifft das
  nächstgelegene Land.

## Quellen (Stand Oktober 2026)

- Namen und Hauptstädte: Länderverzeichnis des Auswärtigen Amts (Stand 28.07.2026)
- Euro-Raum: Europäische Zentralbank (Bulgarien seit 1.1.2026, 21 EU-Staaten)
- Schengen-Raum: 29 Staaten (Bulgarien und Rumänien seit 1.1.2025 vollständig)
- Länderkennzeichen: UNECE-Liste der Unterscheidungszeichen (z. B. UK seit 2021, NMK seit 2019)
- Regionen: Einteilung aus der Unterrichtsliste
