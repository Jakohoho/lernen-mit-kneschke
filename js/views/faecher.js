/** Fächer-Übersicht einer Klassenstufe. */
import { FAECHER } from '../../content/struktur.js';
import { faecherFuerKlasse, spieleFuer } from '../registry.js';

export function renderFaecher(wurzel, klasse) {
  document.title = `Klasse ${klasse} · Lernen mit Kneschke`;
  const slugs = faecherFuerKlasse(klasse);

  if (!slugs.length) {
    wurzel.innerHTML = `
      <div class="leer-hinweis">
        <span class="karte-emoji">🔍</span>
        Für Klasse ${klasse} gibt es noch keine Spiele.<br><br>
        <a class="knopf" href="#/">Zur Startseite</a>
      </div>`;
    return;
  }

  const karten = slugs.map((slug) => {
    const fach = FAECHER[slug] ?? { name: slug, emoji: '📘', farbe: 'var(--sonne)' };
    const anzahl = spieleFuer(klasse, slug).length;
    return `
      <a class="karte" href="#/klasse/${klasse}/${slug}" style="--akzent:${fach.farbe}">
        <span class="karte-emoji">${fach.emoji}</span>
        <span class="karte-titel">${fach.name}</span>
        <span class="karte-info">${anzahl} ${anzahl === 1 ? 'Spiel' : 'Spiele'}</span>
      </a>`;
  }).join('');

  wurzel.innerHTML = `
    <nav class="brotkrumen" aria-label="Navigation">
      <a href="#/">🏠 Start</a>
      <span class="krume-pfeil">›</span>
      <span class="krume-aktiv">Klasse ${klasse}</span>
    </nav>
    <h2 class="abschnitt-titel">📚 Wähle dein Fach</h2>
    <div class="karten-raster">${karten}</div>
  `;
}
