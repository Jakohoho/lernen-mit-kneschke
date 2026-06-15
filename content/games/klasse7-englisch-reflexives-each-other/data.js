/**
 * Spieldaten: Myself & Each Other Race (Klasse 7, Englisch)
 *
 * Thema (drei Bereiche, bunt gemischt im Pool):
 *   - Reflexivpronomen        (myself, yourself, himself … ourselves … themselves)
 *   - Reflexive Verben        (im Deutschen mit „sich", im Englischen OHNE Pronomen)
 *   - Reziprokes Pronomen     each other  (= einander / sich gegenseitig)
 *
 * Aufbau wie bei Conditionals Race:
 *   SAETZE – der Satz-POOL. Bei JEDEM Betreten eines Frage-Feldes wird ein
 *            zufälliger Satz gezogen (Feld ≠ fester Satz → es braucht viele).
 *   BRETT  – das Spielbrett (start / frage / spezial / ziel).
 *
 * Ein Satz:
 *   {
 *     kat: 'pronomen' | 'verb' | 'eachother',  // bestimmt den Tipp nach dem Antworten
 *     satz: '… ___ …',     // genau EINE Lücke ___
 *     antwort: 'himself',   // die richtige Einsetzung – ODER KEIN_WORT (siehe unten),
 *                           //   wenn an die Lücke KEIN Wort gehört
 *     optionen: [ … ],      // 4 Auswahlmöglichkeiten (inkl. richtiger) – werden gemischt
 *     akzeptiert: [ … ],    // optional: weitere im Hardcore-Modus erlaubte Schreibweisen
 *   }
 *
 * Das „kein Wort"-Prinzip (antwort: KEIN_WORT):
 *   Manche Verben tragen im Deutschen ein „sich", brauchen im Englischen aber
 *   KEIN Reflexivpronomen (I remember = ich erinnere mich; ebenso „calm down",
 *   „get ready" …). Bei solchen Sätzen steht das Verb schon im Satz, die Lücke
 *   kommt DANACH, und richtig ist das Leerfeld KEIN_WORT. Als Auswahl werden
 *   passende Reflexivpronomen (die Falle) PLUS das Leerfeld angeboten – gemischt
 *   mit echten Pronomen-Sätzen. Ziel: die Schüler lernen, dass genau diese Verben
 *   kein Selfpronomen verlangen. Damit das Leerfeld nicht zum Verräter wird, steht
 *   KEIN_WORT auch in MANCHEN echten Pronomen-Sätzen als FALSCHE Option zur Wahl –
 *   dort ist ein Reflexivpronomen richtig. „Kein Wort" als Option heißt also nicht
 *   automatisch „kein Wort" als Lösung.
 *
 * Eigene Beispielsätze – decken dieselben Grammatikbereiche auf Klasse-7-Niveau ab.
 */

/** Antwort-Token für „an diese Lücke gehört KEIN Wort" (wird als „—" angezeigt). */
export const KEIN_WORT = '—';

export const SAETZE = [
  // ---------- Reflexivpronomen (richtig ist ein Pronomen – wo KEIN_WORT steht, ist es die Falle!) ----------
  { kat: 'pronomen', satz: 'On his first day, Daniel soon made ___ at home in the new class.', antwort: 'himself',
    optionen: ['himself', 'herself', 'themselves', KEIN_WORT] },
  { kat: 'pronomen', satz: 'I accidentally locked ___ out of the house this morning.', antwort: 'myself',
    optionen: ['myself', 'himself', 'yourself', 'ourselves'] },
  { kat: 'pronomen', satz: 'Come in, you two, and make ___ comfortable!', antwort: 'yourselves',
    optionen: ['yourselves', 'yourself', 'themselves', KEIN_WORT] },
  { kat: 'pronomen', satz: 'I cut ___ a little while I was chopping the onions.', antwort: 'myself',
    optionen: ['myself', 'himself', 'yourself', 'itself'] },
  { kat: 'pronomen', satz: 'Emma burnt ___ on the hot oven door.', antwort: 'herself',
    optionen: ['herself', 'himself', 'themselves', KEIN_WORT] },
  { kat: 'pronomen', satz: 'We practised for weeks, so we were really proud of ___ after the show.', antwort: 'ourselves',
    optionen: ['ourselves', 'themselves', 'yourselves', KEIN_WORT] },
  { kat: 'pronomen', satz: 'Take a deep breath, Mia, and calm ___ down.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'yourself', 'myself', 'themselves'] },
  { kat: 'pronomen', satz: 'The new robot vacuum charges ___ when the battery is low.', antwort: 'itself',
    optionen: ['itself', 'himself', 'themselves', 'herself'] },
  { kat: 'pronomen', satz: 'Liam treated ___ to a big ice cream after the match.', antwort: 'himself',
    optionen: ['himself', 'herself', 'themselves', KEIN_WORT] },
  { kat: 'pronomen', satz: 'The twins got ___ ready for the school play.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'themselves', 'ourselves', 'yourselves'] },
  { kat: 'pronomen', satz: 'Grandma saw ___ on television last night.', antwort: 'herself',
    optionen: ['herself', 'himself', 'themselves', KEIN_WORT] },
  { kat: 'pronomen', satz: 'The app updates ___ automatically every week.', antwort: 'itself',
    optionen: ['itself', 'himself', 'themselves', 'herself'] },
  { kat: 'pronomen', satz: 'We really enjoyed ___ on the school trip to London.', antwort: 'ourselves',
    optionen: ['ourselves', 'themselves', 'each other', KEIN_WORT] },
  { kat: 'pronomen', satz: 'Anna, you look hungry – help ___ to some more cake!', antwort: 'yourself',
    optionen: ['yourself', 'yourselves', 'myself', KEIN_WORT] },

  // ---------- Reflexive Verben: Verb steht schon da – an die Lücke gehört KEIN Pronomen ----------
  // (im Deutschen „sich …", im Englischen ohne Reflexivpronomen → richtig ist KEIN_WORT;
  //  als Falle werden zum Subjekt passende Reflexivpronomen mit angeboten)
  { kat: 'verb', satz: 'After all these years I still remember ___ my first day at school.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'myself', 'ourselves', 'yourself'] },
  { kat: 'verb', satz: 'She was wondering ___ why the lights were still on.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'herself', 'themselves', 'myself'] },
  { kat: 'verb', satz: 'Don\'t worry ___ about the test – you have studied really hard.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'yourself', 'yourselves', 'myself'] },
  { kat: 'verb', satz: 'After a good night\'s sleep, I always feel ___ full of energy.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'myself', 'ourselves', 'himself'] },
  { kat: 'verb', satz: 'Sit back and relax ___ – the film is about to start.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'yourself', 'yourselves', 'himself'] },
  { kat: 'verb', satz: 'I imagine ___ the new café will be really busy on Saturday.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'myself', 'ourselves', 'yourself'] },
  { kat: 'verb', satz: 'Max wanted pizza, but then he changed ___ his mind and chose pasta.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'himself', 'themselves', 'ourselves'] },
  { kat: 'verb', satz: 'She walked into the room and quietly sat down ___ on the sofa.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'herself', 'themselves', 'myself'] },
  { kat: 'verb', satz: 'Come on, hurry ___ up or we will miss the bus!', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'yourself', 'yourselves', 'himself'] },
  { kat: 'verb', satz: 'Please don\'t get angry ___ – it was an honest mistake.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'yourself', 'yourselves', 'himself'] },
  { kat: 'verb', satz: 'The rabbit likes to hide ___ behind the sofa when it is scared.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'itself', 'themselves', 'himself'] },
  { kat: 'verb', satz: 'Could you move ___ a little? I can\'t see the screen.', antwort: KEIN_WORT,
    optionen: [KEIN_WORT, 'yourself', 'yourselves', 'himself'] },

  // ---------- each other (reziprok) vs. themselves (reflexiv) ----------
  { kat: 'eachother', satz: 'Noah and Ella often message ___ after school. (Noah → Ella and Ella → Noah)', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'himself'] },
  { kat: 'eachother', satz: 'The two brothers often argue with ___ about football.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', KEIN_WORT] },
  { kat: 'eachother', satz: 'Before the test, Sara and Aisha lent ___ their notes.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'herself'] },
  { kat: 'eachother', satz: 'Young children slowly learn to dress ___ in the morning.', antwort: 'themselves',
    optionen: ['themselves', 'each other', 'ourselves', 'yourselves'] },
  { kat: 'eachother', satz: 'Lucas and Theo often visit ___ at the weekend.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'himself'] },
  { kat: 'eachother', satz: 'Stay close so that we can still see ___ in this busy market.', antwort: 'each other',
    optionen: ['each other', 'ourselves', 'themselves', 'yourselves'] },
  { kat: 'eachother', satz: 'My two cousins video-call ___ every Sunday evening.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'herself'] },
  { kat: 'eachother', satz: 'The teacher told the children to behave ___ during the trip.', antwort: 'themselves',
    optionen: ['themselves', 'each other', 'ourselves', 'yourselves'] },
  { kat: 'eachother', satz: 'At the school reunion, the old friends hugged ___ warmly.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'yourselves'] },
  { kat: 'eachother', satz: 'People who live alone sometimes talk to ___ out loud. (each person to himself or herself)', antwort: 'themselves',
    optionen: ['themselves', 'each other', 'ourselves', 'yourselves'] },
  { kat: 'eachother', satz: 'Friendly neighbours always say hello to ___ in the morning.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', KEIN_WORT] },
  { kat: 'eachother', satz: 'Good teammates always pass the ball to ___ during a game.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', KEIN_WORT] },
];

/**
 * Ereignisfelder (Sonderfelder):
 *   effekt: Zahl        → so viele Felder vor (+) oder zurück (−)
 *   effekt: 'aussetzen' → eine Runde pausieren
 *   effekt: 'nochmal'   → sofort nochmal würfeln
 */
const EREIGNIS = {
  vor: { effekt: 2, label: 'Forward 2 spaces', emoji: '⏩' },
  zurueck: { effekt: -3, label: 'Move back 3 spaces', emoji: '⏪' },
  nochmal: { effekt: 'nochmal', label: 'Roll again', emoji: '🎲' },
  aussetzen: { effekt: 'aussetzen', label: 'Miss a turn', emoji: '😴' },
};

/** Position der Ereignisfelder (Feld-Index → Ereignis). Bewusst nicht nebeneinander. */
const SPEZIAL_FELDER = {
  5: EREIGNIS.vor,
  9: EREIGNIS.zurueck,
  14: EREIGNIS.nochmal,
  19: EREIGNIS.aussetzen,
  24: EREIGNIS.vor,
  29: EREIGNIS.zurueck,
  34: EREIGNIS.nochmal,
  39: EREIGNIS.aussetzen,
};

/** Gesamtzahl der Felder (inkl. Start & Ziel). Muss ≥ 40 sein. */
const ANZAHL_FELDER = 44;

/** Das Spielbrett als Liste von Feldern (Schlangenlinie macht das Spiel selbst). */
export const BRETT = Array.from({ length: ANZAHL_FELDER }, (_, i) => {
  if (i === 0) return { typ: 'start' };
  if (i === ANZAHL_FELDER - 1) return { typ: 'ziel' };
  if (SPEZIAL_FELDER[i]) return { typ: 'spezial', ...SPEZIAL_FELDER[i] };
  return { typ: 'frage' };
});

/** Index des Zielfelds. */
export const ZIEL_INDEX = BRETT.length - 1;
