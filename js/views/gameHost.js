/**
 * Spiel-Host: lädt ein Spielmodul dynamisch, stellt den Spiel-Kontext
 * bereit und räumt beim Verlassen wieder auf.
 *
 * Spiel-Vertrag (siehe docs/neues-spiel.md):
 *   Jedes Spiel exportiert  mount(container, context)  und gibt optional
 *   eine Aufräum-Funktion zurück. Der Kontext bietet:
 *     context.exit()            → zurück zur Spieleliste (Klasse + Fach)
 *     context.showEndScreen({}) → universeller Endscreen mit
 *                                 „Nochmal spielen" / „Zurück zur Übersicht"
 */
import { FAECHER } from '../../content/struktur.js';
import { spielMitId } from '../registry.js';
import { zeigeEndscreen } from '../lib/endscreen.js';

export function renderGameHost(wurzel, spielId) {
  const manifest = spielMitId(spielId);

  if (!manifest) {
    wurzel.innerHTML = `
      <div class="leer-hinweis">
        <span class="karte-emoji">🙈</span>
        Dieses Spiel wurde nicht gefunden.<br><br>
        <a class="knopf" href="#/">Zur Startseite</a>
      </div>`;
    return;
  }

  const fach = FAECHER[manifest.fach] ?? { name: manifest.fach, emoji: '📘' };
  document.title = `${manifest.titel} · Lernen mit Kneschke`;

  wurzel.innerHTML = `
    <nav class="brotkrumen" aria-label="Navigation">
      <a href="#/">🏠 Start</a>
      <span class="krume-pfeil">›</span>
      <a href="#/klasse/${manifest.klasse}">Klasse ${manifest.klasse}</a>
      <span class="krume-pfeil">›</span>
      <a href="#/klasse/${manifest.klasse}/${manifest.fach}">${fach.emoji} ${fach.name}</a>
      <span class="krume-pfeil">›</span>
      <span class="krume-aktiv">${manifest.emoji} ${manifest.titel}</span>
    </nav>
    <div class="spiel-container"></div>
  `;
  const container = wurzel.querySelector('.spiel-container');

  // Spiel-eigenes Stylesheet laden (wird beim Verlassen wieder entfernt)
  let styleLink = null;
  if (manifest.stylesUrl) {
    styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = manifest.stylesUrl;
    document.head.appendChild(styleLink);
  }

  const context = {
    manifest,
    /** Zurück zur Spieleliste des richtigen Fachs. */
    exit() {
      location.hash = `#/klasse/${manifest.klasse}/${manifest.fach}`;
    },
    /** Universeller Endscreen – von allen Spielen genutzt. */
    showEndScreen(optionen) {
      zeigeEndscreen(container, { ...optionen, onExit: () => context.exit() });
    },
  };

  let spielAufraeumen = null;
  manifest.laden()
    .then((modul) => {
      spielAufraeumen = modul.mount(container, context) || null;
    })
    .catch((fehler) => {
      console.error('Spiel konnte nicht geladen werden:', fehler);
      container.innerHTML = `
        <div class="leer-hinweis">
          <span class="karte-emoji">⚠️</span>
          Das Spiel konnte nicht geladen werden.
        </div>`;
    });

  // Aufräumen beim Verlassen der Route
  return () => {
    if (typeof spielAufraeumen === 'function') {
      try { spielAufraeumen(); } catch (e) { console.error(e); }
    }
    styleLink?.remove();
  };
}
