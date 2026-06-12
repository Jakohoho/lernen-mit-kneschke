/** Spieleliste einer Klasse + eines Fachs, gruppiert nach Kategorie. */
import { FAECHER, KATEGORIEN } from '../../content/struktur.js';
import { spieleFuer } from '../registry.js';

export function renderSpiele(wurzel, klasse, fachSlug) {
  const fach = FAECHER[fachSlug] ?? { name: fachSlug, emoji: '📘' };
  document.title = `${fach.name} · Klasse ${klasse} · Lernen mit Kneschke`;
  const spiele = spieleFuer(klasse, fachSlug);

  if (!spiele.length) {
    wurzel.innerHTML = `
      <div class="leer-hinweis">
        <span class="karte-emoji">🔍</span>
        Hier gibt es noch keine Spiele.<br><br>
        <a class="knopf" href="#/">Zur Startseite</a>
      </div>`;
    return;
  }

  // Nach Kategorie gruppieren (Reihenfolge wie in KATEGORIEN definiert)
  const gruppen = new Map();
  for (const spiel of spiele) {
    if (!gruppen.has(spiel.kategorie)) gruppen.set(spiel.kategorie, []);
    gruppen.get(spiel.kategorie).push(spiel);
  }
  const sortierteSlugs = [
    ...Object.keys(KATEGORIEN).filter((k) => gruppen.has(k)),
    ...[...gruppen.keys()].filter((k) => !(k in KATEGORIEN)),
  ];

  const abschnitte = sortierteSlugs.map((katSlug) => {
    const kat = KATEGORIEN[katSlug] ?? { name: katSlug, emoji: '🧩' };
    const karten = gruppen.get(katSlug).map((spiel) => `
      <a class="karte spielkarte" href="#/spiel/${spiel.id}" style="--akzent:${fach.farbe ?? 'var(--sonne)'}">
        <span class="karte-emoji">${spiel.emoji}</span>
        <span class="spielkarte-text">
          <span class="karte-titel">${spiel.titel}</span><br>
          <span class="karte-info">${spiel.beschreibung}</span>
        </span>
        <span class="spielkarte-pfeil" aria-hidden="true">➜</span>
      </a>`).join('');
    return `
      <h2 class="abschnitt-titel">${kat.emoji} ${kat.name}</h2>
      <div class="karten-raster karten-raster--breit">${karten}</div>`;
  }).join('');

  wurzel.innerHTML = `
    <nav class="brotkrumen" aria-label="Navigation">
      <a href="#/">🏠 Start</a>
      <span class="krume-pfeil">›</span>
      <a href="#/klasse/${klasse}">Klasse ${klasse}</a>
      <span class="krume-pfeil">›</span>
      <span class="krume-aktiv">${fach.emoji} ${fach.name}</span>
    </nav>
    ${abschnitte}
  `;
}
