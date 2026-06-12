/** Startseite: Auswahl der Klassenstufe. */
import { klassenMitSpielen, anzahlSpieleKlasse } from '../registry.js';

const AKZENTE = ['var(--koralle)', 'var(--himmel)', 'var(--minze)', 'var(--sonne)', 'var(--beere)', 'var(--gras)'];

export function renderHome(wurzel) {
  document.title = 'Lernen mit Kneschke';
  const klassen = klassenMitSpielen();

  const karten = klassen.map((klasse, i) => {
    const anzahl = anzahlSpieleKlasse(klasse);
    return `
      <a class="karte" href="#/klasse/${klasse}" style="--akzent:${AKZENTE[i % AKZENTE.length]}">
        <span class="karte-zahl">${klasse}</span>
        <span class="karte-titel">Klasse ${klasse}</span>
        <span class="karte-info">${anzahl} ${anzahl === 1 ? 'Spiel' : 'Spiele'}</span>
      </a>`;
  }).join('');

  wurzel.innerHTML = `
    <section class="hero">
      <h1><span class="bunt-1">Spielen.</span> <span class="bunt-2">Lernen.</span> <span class="bunt-3">Gewinnen.</span></h1>
      <p>Wähle deine Klassenstufe und entdecke Lernspiele für den Unterricht – direkt auf deinem Handy.</p>
    </section>
    <h2 class="abschnitt-titel">🎒 Deine Klassenstufe</h2>
    ${klassen.length
      ? `<div class="karten-raster">${karten}</div>`
      : `<div class="leer-hinweis"><span class="karte-emoji">🚧</span>Hier entstehen bald die ersten Spiele!</div>`}
  `;
}
