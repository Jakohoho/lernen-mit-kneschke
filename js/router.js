/**
 * Hash-Router der Plattform.
 *
 * Routen:
 *   #/                        → Startseite (Klassenstufen)
 *   #/klasse/7                → Fächer der Klasse 7
 *   #/klasse/7/englisch       → Spieleliste (Klasse 7, Englisch)
 *   #/spiel/<spiel-id>        → Ein Spiel
 *
 * Hash-Routing funktioniert ohne Server-Konfiguration und damit
 * problemlos auf GitHub Pages.
 */
import { renderHome } from './views/home.js';
import { renderFaecher } from './views/faecher.js';
import { renderSpiele } from './views/spiele.js';
import { renderGameHost } from './views/gameHost.js';

let wurzel = null;
let aufraeumen = null;

export function initRouter(rootEl) {
  wurzel = rootEl;
  window.addEventListener('hashchange', render);
  render();
}

function render() {
  // Aufräum-Funktion der vorherigen Ansicht ausführen (z. B. Spiel beenden)
  if (typeof aufraeumen === 'function') {
    try { aufraeumen(); } catch (e) { console.error(e); }
  }
  aufraeumen = null;
  wurzel.innerHTML = '';
  window.scrollTo(0, 0);

  const teile = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);

  if (teile[0] === 'klasse' && teile[1] && teile[2]) {
    aufraeumen = renderSpiele(wurzel, Number(teile[1]), teile[2]);
  } else if (teile[0] === 'klasse' && teile[1]) {
    aufraeumen = renderFaecher(wurzel, Number(teile[1]));
  } else if (teile[0] === 'spiel' && teile[1]) {
    aufraeumen = renderGameHost(wurzel, teile[1]);
  } else {
    aufraeumen = renderHome(wurzel);
  }
}
