/**
 * Manifest: Self-Pronouns Race
 * Ordnet das Spiel einer Klasse, einem Fach und einer Kategorie zu.
 * Registriert wird es in js/registry.js (eine Import-Zeile).
 */
export default {
  id: 'self-pronouns-race',
  titel: 'Self-Pronouns Race',
  beschreibung: 'Würfle dich über das Spielbrett und meistere die Reflexivpronomen – allein oder gegen deine Freunde!',
  emoji: '🏁',
  klasse: 7,
  fach: 'englisch',
  kategorie: 'grammatik',
  /** Spielmodul erst laden, wenn das Spiel geöffnet wird. */
  laden: () => import('./game.js'),
  /** Spiel-eigenes Stylesheet (lädt und entfernt der gameHost). */
  stylesUrl: new URL('./game.css', import.meta.url).href,
};
