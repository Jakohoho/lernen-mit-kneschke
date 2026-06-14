/**
 * Spieldaten: Conditionals Race (If-Sätze Typ 1, 2 & 3 – Klasse 8)
 *
 * Zwei Dinge stecken hier drin – beide ohne Programmierkenntnisse änderbar:
 *
 *   1) SAETZE  – der Satz-POOL. Aus ihm zieht das Spiel bei JEDEM Betreten
 *                eines Frage-Feldes zufällig einen Satz. Ein Feld ist also
 *                NICHT fest an einen Satz gebunden – darum braucht es viele
 *                Sätze (Typ 1/2/3 bunt gemischt, nicht nach Typ sortiert).
 *
 *   2) BRETT   – das Spielbrett: eine Liste von Feldern. Feldtypen:
 *                  start   – Startfeld (keine Aufgabe)
 *                  frage   – Frage-Feld (Satz wird dynamisch geladen)
 *                  spezial – Ereignisfeld (effekt: Zahl = Felder vor/zurück,
 *                            'aussetzen' oder 'nochmal')
 *                  ziel    – Zielfeld (keine Aufgabe – wer hier ankommt, gewinnt)
 *
 * Aufbau eines Satzes:
 *   {
 *     typ: 1 | 2 | 3,        // Conditional-Typ (wird erst NACH dem Antworten verraten)
 *     satz: '… ___ (verb) …', // genau EINE Lücke ___ ; in Klammern der Grundverb-Tipp
 *     antwort: 'rains',        // die richtige eingesetzte Verbform
 *     optionen: [ … ],         // 4 Auswahlmöglichkeiten (inkl. richtiger) – werden gemischt
 *     akzeptiert: [ … ],       // optional: weitere im Hardcore-Modus erlaubte Schreibweisen
 *   }
 *
 * Es ist immer entweder der Hauptsatz oder der If-Satz schon vorgegeben –
 * die Schüler setzen nur das eingeklammerte Verb in die richtige Form.
 *
 * Eigene Beispielsätze – decken dieselben Grammatikbereiche auf Klasse-8-Niveau ab.
 */

export const SAETZE = [
  // ---------- Conditional Type 1 (if + present, will + infinitive) ----------
  { typ: 1, satz: 'If it ___ (snow) this weekend, we will build a snowman.', antwort: 'snows',
    optionen: ['snows', 'will snow', 'snowed', 'would snow'] },
  { typ: 1, satz: 'If you finish your homework early, we ___ (watch) a film this evening.', antwort: 'will watch',
    optionen: ['will watch', 'watch', 'watched', 'would watch'] },
  { typ: 1, satz: 'If the bus ___ (be) late, we will walk to the cinema.', antwort: 'is',
    optionen: ['is', 'will be', 'was', 'would be'] },
  { typ: 1, satz: 'If Mia ___ (not feel) well tomorrow, she will stay at home.', antwort: 'doesn\'t feel',
    optionen: ['doesn\'t feel', 'won\'t feel', 'didn\'t feel', 'wouldn\'t feel'] },
  { typ: 1, satz: 'We ___ (be) tired tomorrow if we go to bed too late.', antwort: 'will be',
    optionen: ['will be', 'are', 'were', 'would be'] },
  { typ: 1, satz: 'If the team wins tonight, the whole town ___ (celebrate).', antwort: 'will celebrate',
    optionen: ['will celebrate', 'celebrates', 'celebrated', 'would celebrate'] },
  { typ: 1, satz: 'If the shop ___ (have) my size, I will buy these trainers.', antwort: 'has',
    optionen: ['has', 'will have', 'had', 'would have'] },
  { typ: 1, satz: 'I ___ (not cook) dinner tonight if you bring some pizza.', antwort: 'won\'t cook',
    optionen: ['won\'t cook', 'don\'t cook', 'didn\'t cook', 'wouldn\'t cook'] },
  { typ: 1, satz: 'If Ben ___ (score) another goal, his team will win the match.', antwort: 'scores',
    optionen: ['scores', 'will score', 'scored', 'would score'] },
  { typ: 1, satz: 'If you go out in the rain tonight, you ___ (catch) a cold.', antwort: 'will catch',
    optionen: ['will catch', 'catch', 'caught', 'would catch'] },
  { typ: 1, satz: 'If we ___ (not leave) now, we will be late for the concert.', antwort: 'don\'t leave',
    optionen: ['don\'t leave', 'won\'t leave', 'didn\'t leave', 'wouldn\'t leave'] },
  { typ: 1, satz: 'If everyone passes the test, our teacher ___ (take) us to the zoo next week.', antwort: 'will take',
    optionen: ['will take', 'takes', 'took', 'would take'] },

  // ---------- Conditional Type 2 (if + past simple, would + infinitive) ----------
  { typ: 2, satz: 'If I had a robot, it ___ (clean) my room every day.', antwort: 'would clean',
    optionen: ['would clean', 'will clean', 'cleans', 'cleaned'] },
  { typ: 2, satz: 'If I ___ (be) you, I would tell the truth.', antwort: 'were',
    optionen: ['were', 'am', 'would be', 'had been'] },
  { typ: 2, satz: 'My grandma would be happy if I ___ (visit) her more often.', antwort: 'visited',
    optionen: ['visited', 'visit', 'would visit', 'will visit'] },
  { typ: 2, satz: 'If everyone ___ (recycle) more, there would be far less rubbish.', antwort: 'recycled',
    optionen: ['recycled', 'recycles', 'would recycle', 'will recycle'] },
  { typ: 2, satz: 'I would learn the guitar if I ___ (have) more free time.', antwort: 'had',
    optionen: ['had', 'have', 'would have', 'will have'] },
  { typ: 2, satz: 'If you could visit any country, which one ___ (you / choose)?', antwort: 'would you choose',
    optionen: ['would you choose', 'will you choose', 'do you choose', 'did you choose'] },
  { typ: 2, satz: 'If our school ___ (have) a pool, we would swim every week.', antwort: 'had',
    optionen: ['had', 'has', 'would have', 'will have'] },
  { typ: 2, satz: 'Lina ___ (pass) the audition if she practised a bit more.', antwort: 'would pass',
    optionen: ['would pass', 'will pass', 'passes', 'passed'] },
  { typ: 2, satz: 'If you ___ (not eat) so many sweets, you would feel better.', antwort: 'didn\'t eat',
    optionen: ['didn\'t eat', 'don\'t eat', 'wouldn\'t eat', 'won\'t eat'] },
  { typ: 2, satz: 'What ___ (you / do) if you suddenly became invisible?', antwort: 'would you do',
    optionen: ['would you do', 'will you do', 'do you do', 'did you do'] },
  { typ: 2, satz: 'If my brother ___ (not snore), I would sleep much better.', antwort: 'didn\'t snore',
    optionen: ['didn\'t snore', 'doesn\'t snore', 'wouldn\'t snore', 'won\'t snore'] },
  { typ: 2, satz: 'If I won the lottery, I ___ (buy) that jacket straight away.', antwort: 'would buy',
    optionen: ['would buy', 'will buy', 'buy', 'bought'] },

  // ---------- Conditional Type 3 (if + past perfect, would have + past participle) ----------
  { typ: 3, satz: 'If we ___ (leave) earlier, we would have caught the train.', antwort: 'had left',
    optionen: ['had left', 'left', 'would leave', 'would have left'] },
  { typ: 3, satz: 'If we\'d left earlier, we ___ (catch) the train.', antwort: 'would have caught',
    optionen: ['would have caught', 'had caught', 'would catch', 'caught'] },
  { typ: 3, satz: 'What would you have said if the teacher ___ (ask) you?', antwort: 'had asked',
    optionen: ['had asked', 'asked', 'would ask', 'would have asked'] },
  { typ: 3, satz: 'If Oscar ___ (bring) an umbrella, he wouldn\'t have got wet.', antwort: 'had brought',
    optionen: ['had brought', 'brought', 'would bring', 'would have brought'] },
  { typ: 3, satz: 'If I ___ (charge) my phone, I would have seen your message last night.', antwort: 'had charged',
    optionen: ['had charged', 'charged', 'would charge', 'would have charged'] },
  { typ: 3, satz: 'If the team ___ (play) better in the final, they would have won the cup.', antwort: 'had played',
    optionen: ['had played', 'played', 'would play', 'would have played'] },
  { typ: 3, satz: 'So if Dad ___ (check) the map, we wouldn\'t have taken the wrong road.', antwort: 'had checked',
    optionen: ['had checked', 'checked', 'would check', 'would have checked'] },
  { typ: 3, satz: 'If I ___ (write) down the address, I wouldn\'t have got lost.', antwort: 'had written',
    optionen: ['had written', 'wrote', 'would write', 'would have written'] },
  { typ: 3, satz: 'The cake would have tasted better if I ___ (add) more sugar.', antwort: 'had added',
    optionen: ['had added', 'added', 'would add', 'would have added'] },
  { typ: 3, satz: 'The ice cream would have melted if we ___ (not put) it in the freezer.', antwort: 'hadn\'t put',
    optionen: ['hadn\'t put', 'didn\'t put', 'wouldn\'t put', 'wouldn\'t have put'] },
  { typ: 3, satz: 'If you had labelled the boxes, we ___ (not waste) two hours yesterday looking for the keys.', antwort: 'wouldn\'t have wasted',
    optionen: ['wouldn\'t have wasted', 'hadn\'t wasted', 'wouldn\'t waste', 'didn\'t waste'] },
  { typ: 3, satz: 'If the alarm had gone off, I ___ (not oversleep) this morning.', antwort: 'wouldn\'t have overslept',
    optionen: ['wouldn\'t have overslept', 'hadn\'t overslept', 'wouldn\'t oversleep', 'didn\'t oversleep'] },
];

/**
 * Ereignisfelder (Sonderfelder). Verteilt über das Brett – siehe BRETT unten.
 *   effekt: Zahl       → so viele Felder vor (+) oder zurück (−)
 *   effekt: 'aussetzen'→ eine Runde pausieren
 *   effekt: 'nochmal'  → sofort nochmal würfeln
 */
const EREIGNIS = {
  vor: { effekt: 2, label: 'Forward 2 spaces', emoji: '⏩' },
  zurueck: { effekt: -3, label: 'Move back 3 spaces', emoji: '⏪' },
  nochmal: { effekt: 'nochmal', label: 'Roll again', emoji: '🎲' },
  aussetzen: { effekt: 'aussetzen', label: 'Miss a turn', emoji: '😴' },
};

/**
 * Position der Ereignisfelder auf dem Brett (Feld-Index → Ereignis).
 * Bewusst NICHT nebeneinander, damit Sprünge nicht auf einem weiteren
 * Ereignisfeld landen.
 */
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
