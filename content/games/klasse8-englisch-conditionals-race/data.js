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
 */

export const SAETZE = [
  // ---------- Conditional Type 1 (if + present, will + infinitive) ----------
  { typ: 1, satz: 'If it ___ (rain) tomorrow, we will stay at home.', antwort: 'rains',
    optionen: ['rains', 'will rain', 'rained', 'would rain'] },
  { typ: 1, satz: 'If you study hard, you ___ (pass) the exam.', antwort: 'will pass',
    optionen: ['will pass', 'pass', 'passed', 'would pass'] },
  { typ: 1, satz: 'If she ___ (have) time, she will call you.', antwort: 'has',
    optionen: ['has', 'will have', 'had', 'would have'] },
  { typ: 1, satz: 'If we don\'t hurry, we ___ (miss) the train.', antwort: 'will miss',
    optionen: ['will miss', 'miss', 'missed', 'would miss'] },
  { typ: 1, satz: 'If you ___ (not water) the plants, they will die.', antwort: 'don\'t water',
    optionen: ['don\'t water', 'won\'t water', 'didn\'t water', 'wouldn\'t water'] },
  { typ: 1, satz: 'If the weather is nice, we ___ (go) to the beach.', antwort: 'will go',
    optionen: ['will go', 'go', 'went', 'would go'] },
  { typ: 1, satz: 'If you tell Harry the truth, he ___ (not get) angry.', antwort: 'won\'t get',
    optionen: ['won\'t get', 'doesn\'t get', 'didn\'t get', 'wouldn\'t get'] },
  { typ: 1, satz: 'I won\'t lend Leo my bag if he ___ (make) it dirty again.', antwort: 'makes',
    optionen: ['makes', 'will make', 'made', 'would make'] },
  { typ: 1, satz: 'You will have to practise it if you ___ (want) to play this song.', antwort: 'want',
    optionen: ['want', 'will want', 'wanted', 'would want'] },
  { typ: 1, satz: 'I will let Keira borrow my bike if she ___ (fix) the flat tyre.', antwort: 'fixes',
    optionen: ['fixes', 'will fix', 'fixed', 'would fix'] },
  { typ: 1, satz: 'If you ___ (be) late for school again, Mrs Hill will send a letter to your parents.', antwort: 'are',
    optionen: ['are', 'will be', 'were', 'would be'] },
  { typ: 1, satz: 'You\'ll forget how to speak French if you ___ (not practise) it.', antwort: 'don\'t practise',
    optionen: ['don\'t practise', 'won\'t practise', 'didn\'t practise', 'wouldn\'t practise'] },

  // ---------- Conditional Type 2 (if + past simple, would + infinitive) ----------
  { typ: 2, satz: 'If I had more money, I ___ (buy) a new bike.', antwort: 'would buy',
    optionen: ['would buy', 'will buy', 'buy', 'bought'] },
  { typ: 2, satz: 'If I ___ (be) you, I would apologise.', antwort: 'were',
    optionen: ['were', 'am', 'would be', 'had been'] },
  { typ: 2, satz: 'My sister wouldn\'t like it if I ___ (post) photos of her online.', antwort: 'posted',
    optionen: ['posted', 'post', 'would post', 'will post'] },
  { typ: 2, satz: 'If nobody ___ (drive) cars in the city, the air would be cleaner.', antwort: 'drove',
    optionen: ['drove', 'drives', 'would drive', 'will drive'] },
  { typ: 2, satz: 'I would speak English as well as you do if my father ___ (be) from Ireland.', antwort: 'were',
    optionen: ['were', 'is', 'would be', 'had been'] },
  { typ: 2, satz: 'Where would you fly to if you ___ (have) your own plane?', antwort: 'had',
    optionen: ['had', 'have', 'would have', 'will have'] },
  { typ: 2, satz: 'If my legs were longer, I ___ (be) a great basketball player.', antwort: 'would be',
    optionen: ['would be', 'will be', 'am', 'were'] },
  { typ: 2, satz: 'I ___ (have) my own bedroom if we lived in a house and not a small flat.', antwort: 'would have',
    optionen: ['would have', 'will have', 'have', 'had'] },
  { typ: 2, satz: 'If you found a wallet in the street, you ___ (give) it to the police.', antwort: 'would give',
    optionen: ['would give', 'will give', 'give', 'gave'] },
  { typ: 2, satz: 'My dad wouldn\'t have to be away so often if he ___ (not work) as a coach driver.', antwort: 'didn\'t work',
    optionen: ['didn\'t work', 'doesn\'t work', 'wouldn\'t work', 'won\'t work'] },
  { typ: 2, satz: 'What would you change if you ___ (be) head teacher of the school?', antwort: 'were',
    optionen: ['were', 'are', 'would be', 'had been'] },
  { typ: 2, satz: 'If I ___ (not have) so much homework, I would come with you.', antwort: 'didn\'t have',
    optionen: ['didn\'t have', 'don\'t have', 'wouldn\'t have', 'hadn\'t had'] },

  // ---------- Conditional Type 3 (if + past perfect, would have + past participle) ----------
  { typ: 3, satz: 'If I ___ (apply) to GreenIn, I would have got an internship.', antwort: 'had applied',
    optionen: ['had applied', 'applied', 'would apply', 'would have applied'] },
  { typ: 3, satz: 'If I\'d applied to GreenIn, I ___ (get) an internship.', antwort: 'would have got',
    optionen: ['would have got', 'had got', 'would get', 'got'], akzeptiert: ['would have gotten'] },
  { typ: 3, satz: 'What would you have done if you ___ (work) at GreenIn?', antwort: 'had worked',
    optionen: ['had worked', 'worked', 'would work', 'would have worked'] },
  { typ: 3, satz: 'If I had been an intern there, I ___ (develop) an app.', antwort: 'would have developed',
    optionen: ['would have developed', 'had developed', 'would develop', 'developed'] },
  { typ: 3, satz: 'I would have designed a cycling app if I ___ (have) a chance.', antwort: 'had had',
    optionen: ['had had', 'had', 'would have', 'would have had'] },
  { typ: 3, satz: 'If GreenIn had launched my app, I ___ (become) well-known.', antwort: 'would have become',
    optionen: ['would have become', 'had become', 'would become', 'became'] },
  { typ: 3, satz: 'So if I ___ (be) successful at GreenIn, another tech company would have offered me a job.', antwort: 'had been',
    optionen: ['had been', 'was', 'would have been', 'would be'] },
  { typ: 3, satz: 'If I ___ (arrive) sooner, we would have seen the film.', antwort: 'had arrived',
    optionen: ['had arrived', 'arrived', 'would arrive', 'would have arrived'] },
  { typ: 3, satz: 'She would have passed her exam if she ___ (study) harder.', antwort: 'had studied',
    optionen: ['had studied', 'studied', 'would study', 'would have studied'] },
  { typ: 3, satz: 'We would have lost the match if you ___ (not score) a goal.', antwort: 'hadn\'t scored',
    optionen: ['hadn\'t scored', 'didn\'t score', 'wouldn\'t score', 'wouldn\'t have scored'] },
  { typ: 3, satz: 'If you had watered the plants, they ___ (not die).', antwort: 'wouldn\'t have died',
    optionen: ['wouldn\'t have died', 'hadn\'t died', 'wouldn\'t die', 'didn\'t die'] },
  { typ: 3, satz: 'I ___ (not mind) if you had asked me first.', antwort: 'wouldn\'t have minded',
    optionen: ['wouldn\'t have minded', 'hadn\'t minded', 'wouldn\'t mind', 'didn\'t mind'] },
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
