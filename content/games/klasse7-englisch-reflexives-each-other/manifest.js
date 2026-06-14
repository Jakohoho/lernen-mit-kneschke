/**
 * Manifest: Myself & Each Other Race
 * Ordnet das Spiel einer Klasse, einem Fach und einer Kategorie zu.
 * Registriert wird es in js/registry.js (eine Import-Zeile).
 */
export default {
  id: 'reflexives-each-other',
  titel: 'Myself & Each Other Race',
  beschreibung: 'Würfle übers Brett und meistere Reflexivpronomen, reflexive Verben (ohne „sich"!) und each other – allein oder gegen deine Freunde!',
  emoji: '🪞',
  klasse: 7,
  fach: 'englisch',
  kategorie: 'grammatik',
  /** false = Spiel ist für Schüler unsichtbar (siehe docs/apps-deaktivieren.md). */
  aktiv: true,
  /** Spielmodul erst laden, wenn das Spiel geöffnet wird. */
  laden: () => import('./game.js'),
  /** Spiel-eigenes Stylesheet (lädt und entfernt der gameHost). */
  stylesUrl: new URL('./game.css', import.meta.url).href,
};
