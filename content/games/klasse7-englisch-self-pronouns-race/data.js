/**
 * Spieldaten: Self-Pronouns Race (Reflexivpronomen, Klasse 7)
 *
 * Das Brett ist ein Pfad aus Feldern. Feldtypen:
 *   start   – Startfeld
 *   frage   – Lückensatz, Antwort ist ein Reflexivpronomen
 *   spezial – Ereignisfeld: effekt = Zahl (Felder vor/zurück)
 *             oder 'aussetzen'
 *   ziel    – Zielfeld
 */

/** Alle Antwortmöglichkeiten (werden bei jeder Frage angeboten). */
export const PRONOMEN = [
  'myself', 'yourself', 'himself', 'herself',
  'itself', 'ourselves', 'yourselves', 'themselves',
];

export const FELDER = [
  { typ: 'start' },
  { typ: 'frage', nr: 1, satz: 'I made this cake by ___.', antwort: 'myself', emoji: '🎂' },
  { typ: 'frage', nr: 2, satz: 'Sarah looked at ___ in the mirror.', antwort: 'herself', emoji: '🪞' },
  { typ: 'frage', nr: 3, satz: 'Tom hurt ___ while playing football.', antwort: 'himself', emoji: '⚽' },
  { typ: 'frage', nr: 4, satz: 'We enjoyed ___ at the party.', antwort: 'ourselves', emoji: '🎉' },
  { typ: 'frage', nr: 5, satz: 'The cat cleaned ___.', antwort: 'itself', emoji: '🐱' },
  { typ: 'frage', nr: 6, satz: 'We drove to the lake by ___.', antwort: 'ourselves', emoji: '🚗' },
  { typ: 'frage', nr: 7, satz: 'They introduced ___ to the class.', antwort: 'themselves', emoji: '👋' },
  { typ: 'frage', nr: 8, satz: 'My sister taught ___ French.', antwort: 'herself', emoji: '🇫🇷' },
  { typ: 'frage', nr: 9, satz: 'The children dressed ___.', antwort: 'themselves', emoji: '🧒' },
  { typ: 'frage', nr: 10, satz: 'We painted the room ___.', antwort: 'ourselves', emoji: '🖌️' },
  { typ: 'spezial', effekt: 2, label: '2 Felder vor!', emoji: '⏩' },
  { typ: 'frage', nr: 11, satz: 'I cut ___ with a knife.', antwort: 'myself', emoji: '🔪' },
  { typ: 'frage', nr: 12, satz: 'You can do it ___! (you = ihr)', antwort: 'yourselves', emoji: '🎯' },
  { typ: 'frage', nr: 13, satz: 'The dog found ___ trapped in the garden.', antwort: 'itself', emoji: '🐶' },
  { typ: 'frage', nr: 14, satz: 'She bought the present ___.', antwort: 'herself', emoji: '🎁' },
  { typ: 'spezial', effekt: 'aussetzen', label: 'Einmal aussetzen!', emoji: '😞' },
  { typ: 'frage', nr: 15, satz: 'They enjoyed ___ during the holidays.', antwort: 'themselves', emoji: '🧳' },
  { typ: 'frage', nr: 16, satz: 'He repaired the bike ___.', antwort: 'himself', emoji: '🚲' },
  { typ: 'spezial', effekt: -3, label: '3 Felder zurück!', emoji: '⏪' },
  { typ: 'frage', nr: 17, satz: 'We prepared ___ for the test.', antwort: 'ourselves', emoji: '📚' },
  { typ: 'frage', nr: 18, satz: 'The baby fed ___.', antwort: 'itself', emoji: '🍼' },
  { typ: 'frage', nr: 19, satz: 'I saw ___ in the photo.', antwort: 'myself', emoji: '📷' },
  { typ: 'frage', nr: 20, satz: 'The players congratulated ___.', antwort: 'themselves', emoji: '🏆' },
  { typ: 'frage', nr: 21, satz: 'The bird fed ___ in the nest.', antwort: 'itself', emoji: '🐦' },
  { typ: 'frage', nr: 22, satz: 'The team celebrated ___ at the stadium.', antwort: 'themselves', emoji: '🏟️' },
  { typ: 'ziel' },
];

/** Index des Zielfelds. */
export const ZIEL_INDEX = FELDER.length - 1;
