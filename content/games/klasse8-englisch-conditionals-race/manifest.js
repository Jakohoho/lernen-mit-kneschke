/**
 * Manifest: Conditionals Race
 * Ordnet das Spiel einer Klasse, einem Fach und einer Kategorie zu.
 * Registriert wird es in js/registry.js (eine Import-Zeile).
 */
export default {
  id: 'conditionals-race',
  titel: 'Conditionals Race',
  beschreibung: 'Würfle übers Brett und setze die Verben in If-Sätzen (Typ 1, 2 & 3) richtig ein – falsch geantwortet heißt zurück aufs Startfeld des Zuges!',
  emoji: '🏎️',
  klasse: 8,
  fach: 'englisch',
  kategorie: 'grammatik',
  /** false = Spiel ist für Schüler unsichtbar (siehe docs/apps-deaktivieren.md). */
  aktiv: true,
  /** Spielmodul erst laden, wenn das Spiel geöffnet wird. */
  laden: () => import('./game.js'),
  /** Spiel-eigenes Stylesheet (lädt und entfernt der gameHost). */
  stylesUrl: new URL('./game.css', import.meta.url).href,
};
