/**
 * Manifest: Europa Länderrallye
 * Ordnet das Spiel einer Klasse, einem Fach und einer Kategorie zu.
 * Registriert wird es in js/registry.js (eine Import-Zeile).
 */
export default {
  id: 'europa-laenderrallye',
  titel: 'Europa Länderrallye',
  beschreibung: 'Finde die Länder Europas auf der Karte, nenne ihre Hauptstädte und entdecke Regionen, Schengen-Raum und Euro – allein oder gegen deine Freunde!',
  emoji: '🗺️',
  klasse: 6,
  fach: 'geographie',
  kategorie: 'topographie',
  /** false = Spiel ist für Schüler unsichtbar (siehe docs/apps-deaktivieren.md). */
  aktiv: true,
  /** Spielmodul erst laden, wenn das Spiel geöffnet wird. */
  laden: () => import('./game.js'),
  /** Spiel-eigenes Stylesheet (lädt und entfernt der gameHost). */
  stylesUrl: new URL('./game.css', import.meta.url).href,
};
