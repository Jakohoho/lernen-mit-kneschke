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
 *     satz: '… ___ …',     // genau EINE Lücke ___ (bei Verben steht der dt. Tipp in Klammern)
 *     antwort: 'himself',   // die richtige Einsetzung
 *     optionen: [ … ],      // 4 Auswahlmöglichkeiten (inkl. richtiger) – werden gemischt
 *     akzeptiert: [ … ],    // optional: weitere im Hardcore-Modus erlaubte Schreibweisen
 *   }
 *
 * Eigene Beispielsätze – decken dieselben Grammatikbereiche auf Klasse-7-Niveau ab.
 */

export const SAETZE = [
  // ---------- Reflexivpronomen ----------
  { kat: 'pronomen', satz: 'On his first day, Daniel soon made ___ at home in the new class.', antwort: 'himself',
    optionen: ['himself', 'herself', 'themselves', 'yourself'] },
  { kat: 'pronomen', satz: 'I accidentally locked ___ out of the house this morning.', antwort: 'myself',
    optionen: ['myself', 'himself', 'yourself', 'ourselves'] },
  { kat: 'pronomen', satz: 'Come in, you two, and make ___ comfortable!', antwort: 'yourselves',
    optionen: ['yourselves', 'yourself', 'themselves', 'ourselves'] },
  { kat: 'pronomen', satz: 'I cut ___ a little while I was chopping the onions.', antwort: 'myself',
    optionen: ['myself', 'himself', 'yourself', 'itself'] },
  { kat: 'pronomen', satz: 'Emma burnt ___ on the hot oven door.', antwort: 'herself',
    optionen: ['herself', 'himself', 'itself', 'themselves'] },
  { kat: 'pronomen', satz: 'We practised for weeks, so we were really proud of ___ after the show.', antwort: 'ourselves',
    optionen: ['ourselves', 'themselves', 'yourselves', 'myself'] },
  { kat: 'pronomen', satz: 'Take a deep breath, Mia, and calm ___ down.', antwort: 'yourself',
    optionen: ['yourself', 'yourselves', 'myself', 'themselves'] },
  { kat: 'pronomen', satz: 'The new robot vacuum charges ___ when the battery is low.', antwort: 'itself',
    optionen: ['itself', 'himself', 'themselves', 'herself'] },
  { kat: 'pronomen', satz: 'Liam treated ___ to a big ice cream after the match.', antwort: 'himself',
    optionen: ['himself', 'herself', 'itself', 'themselves'] },
  { kat: 'pronomen', satz: 'The twins got ___ ready for the school play.', antwort: 'themselves',
    optionen: ['themselves', 'himself', 'ourselves', 'yourselves'] },
  { kat: 'pronomen', satz: 'Grandma saw ___ on television last night.', antwort: 'herself',
    optionen: ['herself', 'himself', 'itself', 'themselves'] },
  { kat: 'pronomen', satz: 'The app updates ___ automatically every week.', antwort: 'itself',
    optionen: ['itself', 'himself', 'themselves', 'herself'] },
  { kat: 'pronomen', satz: 'We really enjoyed ___ on the school trip to London.', antwort: 'ourselves',
    optionen: ['ourselves', 'themselves', 'each other', 'yourselves'] },
  { kat: 'pronomen', satz: 'Anna, you look hungry – help ___ to some more cake!', antwort: 'yourself',
    optionen: ['yourself', 'yourselves', 'myself', 'herself'] },

  // ---------- Reflexive Verben (im Englischen OHNE „sich") ----------
  { kat: 'verb', satz: 'After all these years I still ___ my first day at school. (sich erinnern)', antwort: 'remember',
    optionen: ['remember', 'imagine', 'worry', 'change'] },
  { kat: 'verb', satz: 'She was ___ why the lights were still on. (sich fragen)', antwort: 'wondering',
    optionen: ['wondering', 'worrying', 'hiding', 'relaxing'] },
  { kat: 'verb', satz: 'Don\'t ___ about the test – you have studied really hard. (sich Sorgen machen)', antwort: 'worry',
    optionen: ['worry', 'wonder', 'hide', 'move'] },
  { kat: 'verb', satz: 'After a good night\'s sleep, I always ___ full of energy. (sich fühlen)', antwort: 'feel',
    optionen: ['feel', 'change', 'meet', 'relax'] },
  { kat: 'verb', satz: 'Sit back and ___ – the film is about to start. (sich entspannen)', antwort: 'relax',
    optionen: ['relax', 'remember', 'worry', 'hide'] },
  { kat: 'verb', satz: 'I ___ the new café will be really busy on Saturday. (sich vorstellen / annehmen)', antwort: 'imagine',
    optionen: ['imagine', 'remember', 'meet', 'move'] },
  { kat: 'verb', satz: 'Max wanted pizza, but then he ___ his mind and chose pasta. (es sich anders überlegen)', antwort: 'changed',
    optionen: ['changed', 'felt', 'met', 'relaxed'] },
  { kat: 'verb', satz: 'She walked into the room and quietly ___ on the sofa. (sich hinsetzen)', antwort: 'sat down',
    optionen: ['sat down', 'remembered', 'moved', 'hid'] },
  { kat: 'verb', satz: 'Let\'s ___ in front of the library at six o\'clock. (sich treffen)', antwort: 'meet',
    optionen: ['meet', 'move', 'hide', 'change'] },
  { kat: 'verb', satz: 'Please don\'t ___ – it was an honest mistake. (sich ärgern)', antwort: 'get angry',
    optionen: ['get angry', 'sit down', 'relax', 'remember'] },
  { kat: 'verb', satz: 'The rabbit likes to ___ behind the sofa when it is scared. (sich verstecken)', antwort: 'hide',
    optionen: ['hide', 'meet', 'change', 'wonder'] },
  { kat: 'verb', satz: 'Could you ___ a little? I can\'t see the screen. (sich bewegen)', antwort: 'move',
    optionen: ['move', 'feel', 'worry', 'relax'] },

  // ---------- each other (reziprok) vs. themselves (reflexiv) ----------
  { kat: 'eachother', satz: 'Noah and Ella often message ___ after school. (Noah → Ella and Ella → Noah)', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'himself'] },
  { kat: 'eachother', satz: 'The two brothers often argue with ___ about football.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'himself'] },
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
    optionen: ['each other', 'themselves', 'ourselves', 'yourselves'] },
  { kat: 'eachother', satz: 'Good teammates always pass the ball to ___ during a game.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'yourselves'] },
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
