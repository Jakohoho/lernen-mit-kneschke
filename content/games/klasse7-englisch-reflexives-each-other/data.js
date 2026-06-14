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
 * Inhalte aus dem Lehrbuch (Grammar 21–23 + Practice 21–23) übernommen/angelehnt.
 */

export const SAETZE = [
  // ---------- Reflexivpronomen ----------
  { kat: 'pronomen', satz: 'The boy held out his hand and introduced ___.', antwort: 'himself',
    optionen: ['himself', 'herself', 'themselves', 'yourself'] },
  { kat: 'pronomen', satz: 'I wouldn\'t call ___ a star.', antwort: 'myself',
    optionen: ['myself', 'himself', 'yourself', 'ourselves'] },
  { kat: 'pronomen', satz: 'This exercise is easy – I think you guys can complete it ___.', antwort: 'yourselves',
    optionen: ['yourselves', 'yourself', 'themselves', 'ourselves'] },
  { kat: 'pronomen', satz: 'I tried not to laugh but I couldn\'t stop ___.', antwort: 'myself',
    optionen: ['myself', 'himself', 'yourself', 'itself'] },
  { kat: 'pronomen', satz: 'Zara hurt ___ when she fell over a chair.', antwort: 'herself',
    optionen: ['herself', 'himself', 'itself', 'themselves'] },
  { kat: 'pronomen', satz: 'Jake and I made this cake, so we gave ___ the biggest pieces.', antwort: 'ourselves',
    optionen: ['ourselves', 'themselves', 'yourselves', 'myself'] },
  { kat: 'pronomen', satz: 'If you want to teach ___ a language, you can do an online class.', antwort: 'yourself',
    optionen: ['yourself', 'yourselves', 'myself', 'themselves'] },
  { kat: 'pronomen', satz: 'My alarm clock turns ___ off after five minutes.', antwort: 'itself',
    optionen: ['itself', 'himself', 'themselves', 'herself'] },
  { kat: 'pronomen', satz: 'Patrick took a picture of ___ and added a beach background.', antwort: 'himself',
    optionen: ['himself', 'herself', 'itself', 'themselves'] },
  { kat: 'pronomen', satz: 'Before their presentation, Mason and Riley introduced ___ to the audience.', antwort: 'themselves',
    optionen: ['themselves', 'himself', 'ourselves', 'yourselves'] },
  { kat: 'pronomen', satz: 'Sarah looked at ___ in the mirror.', antwort: 'herself',
    optionen: ['herself', 'himself', 'itself', 'themselves'] },
  { kat: 'pronomen', satz: 'The cat cleaned ___ after the meal.', antwort: 'itself',
    optionen: ['itself', 'himself', 'themselves', 'herself'] },
  { kat: 'pronomen', satz: 'We had a great time – we really enjoyed ___ at the party.', antwort: 'ourselves',
    optionen: ['ourselves', 'themselves', 'each other', 'yourselves'] },
  { kat: 'pronomen', satz: 'Tom, you look hungry – help ___ to a sandwich!', antwort: 'yourself',
    optionen: ['yourself', 'yourselves', 'myself', 'himself'] },

  // ---------- Reflexive Verben (im Englischen OHNE „sich") ----------
  { kat: 'verb', satz: 'I can never ___ anything after a long day at school. (sich erinnern)', antwort: 'remember',
    optionen: ['remember', 'imagine', 'worry', 'change'] },
  { kat: 'verb', satz: 'Tariq was probably ___ where I was. (sich fragen)', antwort: 'wondering',
    optionen: ['wondering', 'worrying', 'hiding', 'relaxing'] },
  { kat: 'verb', satz: 'Don\'t ___ about it, I\'ll text him now. (sich Sorgen machen)', antwort: 'worry',
    optionen: ['worry', 'wonder', 'hide', 'move'] },
  { kat: 'verb', satz: 'Thanks, Sam. I ___ really bad about it. (sich fühlen)', antwort: 'feel',
    optionen: ['feel', 'change', 'meet', 'relax'] },
  { kat: 'verb', satz: '___, it\'s fine! You can buy the bike another time. (sich entspannen)', antwort: 'Relax',
    optionen: ['Relax', 'Remember', 'Worry', 'Hide'] },
  { kat: 'verb', satz: 'I ___ you can meet him another time to buy the bike. (sich vorstellen / annehmen)', antwort: 'imagine',
    optionen: ['imagine', 'remember', 'meet', 'move'] },
  { kat: 'verb', satz: 'But not if Tariq ___ his mind! (es sich anders überlegen)', antwort: 'changes',
    optionen: ['changes', 'feels', 'meets', 'relaxes'] },
  { kat: 'verb', satz: 'There, in a corner, he found a bench and ___. (sich hinsetzen)', antwort: 'sat down',
    optionen: ['sat down', 'remembered', 'moved', 'hid'] },
  { kat: 'verb', satz: 'Let\'s ___ at the bus stop at four o\'clock. (sich treffen)', antwort: 'meet',
    optionen: ['meet', 'move', 'hide', 'change'] },
  { kat: 'verb', satz: 'Please don\'t ___ – it was only a small mistake. (sich ärgern)', antwort: 'get angry',
    optionen: ['get angry', 'sit down', 'relax', 'remember'] },
  { kat: 'verb', satz: 'The cat likes to ___ under the bed when guests come. (sich verstecken)', antwort: 'hide',
    optionen: ['hide', 'meet', 'change', 'wonder'] },
  { kat: 'verb', satz: 'Try not to ___ during the photo, or it will be blurry. (sich bewegen)', antwort: 'move',
    optionen: ['move', 'feel', 'worry', 'relax'] },

  // ---------- each other (reziprok) vs. themselves (reflexiv) ----------
  { kat: 'eachother', satz: 'John and Lucy often talk to ___. (John → Lucy and Lucy → John)', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'himself'] },
  { kat: 'eachother', satz: 'Kim and Maya always give ___ presents on their birthdays.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'yourselves', 'herself'] },
  { kat: 'eachother', satz: 'After school, Ron and Tom often help ___ with their French homework.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'himself'] },
  { kat: 'eachother', satz: 'Mum and Dad always enjoy ___ at our Halloween party.', antwort: 'themselves',
    optionen: ['themselves', 'each other', 'ourselves', 'yourselves'] },
  { kat: 'eachother', satz: 'Poppy and Freya have known ___ for the last six years.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'herself'] },
  { kat: 'eachother', satz: 'Hold my hand! We don\'t want to lose ___ in this big crowd of people.', antwort: 'each other',
    optionen: ['each other', 'ourselves', 'themselves', 'yourselves'] },
  { kat: 'eachother', satz: 'My mum and her sister always phone ___ when there\'s big news.', antwort: 'each other',
    optionen: ['each other', 'themselves', 'ourselves', 'herself'] },
  { kat: 'eachother', satz: 'Many people buy software to protect ___ from internet attacks.', antwort: 'themselves',
    optionen: ['themselves', 'each other', 'ourselves', 'yourselves'] },
  { kat: 'eachother', satz: 'On the first day back at school, we all told ___ about our summer holidays.', antwort: 'each other',
    optionen: ['each other', 'ourselves', 'themselves', 'yourselves'] },
  { kat: 'eachother', satz: 'John and Lucy sometimes talk to ___. (John → John and Lucy → Lucy)', antwort: 'themselves',
    optionen: ['themselves', 'each other', 'ourselves', 'yourselves'] },
  { kat: 'eachother', satz: 'We\'re a great team. We support ___ and we\'re always there for one another.', antwort: 'each other',
    optionen: ['each other', 'ourselves', 'themselves', 'yourselves'] },
  { kat: 'eachother', satz: 'Best friends should always be honest with ___.', antwort: 'each other',
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
