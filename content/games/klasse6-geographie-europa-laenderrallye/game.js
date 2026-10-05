/**
 * Europa Länderrallye – Topographie Europas (Geographie, Klasse 6).
 *
 * Aufgaben (Auswahl auf dem Startbildschirm):
 *   1 Länder & Hauptstädte – Land auf der Karte finden, Hauptstadt nennen,
 *                             optional das Länderkennzeichen
 *   2 Regionen Europas     – Land einer der sechs Regionen zuordnen
 *   3 Schengen-Raum        – alle Schengen-Länder auf der Karte antippen
 *   4 Euro-Länder          – alle Länder mit dem Euro antippen
 *   5 EU ohne Euro         – EU-Länder ohne Euro antippen + Währung wählen
 *   🔍 Entdecken           – Länder antippen und Steckbrief lesen
 *
 * Modi: allein üben oder gemeinsam (2–4 Spieler reihum an einem Gerät).
 * 🔥 Hardcore: Hauptstadt und Kennzeichen selbst eintippen, keine Tipps,
 *    bei Aufgabe 3/4 wird die Auswahl erst am Ende geprüft.
 * Jede Frage hat genau einen Versuch – danach wird die Lösung gezeigt.
 *
 * Alle Lerninhalte stehen in data.js, die Karte in karte.js (erzeugt von
 * karte-erzeugen.py), die Kartenbedienung in kartenansicht.js.
 */
import { KARTE } from './karte.js';
import { LAENDER, REGIONEN, WAEHRUNGEN, SCHENGEN_OFFEN } from './data.js';
import { erzeugeKarte } from './kartenansicht.js';

// ---------------------------------------------------------------------------
// Aufgabenstellungen und Auffrischung (Oberflächentexte)
// ---------------------------------------------------------------------------
export const AUFGABEN = [
  {
    id: 'laender', nr: 1, emoji: '📍', titel: 'Länder & Hauptstädte',
    kurz: 'Finde das Land auf der Karte und nenne seine Hauptstadt.',
    auftrag: 'Oben auf der Karte steht der Name eines Landes. Tippe das Land auf der Karte an. '
      + 'Danach ist seine Hauptstadt rot markiert – wie heißt sie? Zum Schluss kannst du noch das Länderkennzeichen ergänzen.',
    einfach: 'Du wählst die Hauptstadt aus vier Antworten. Mit „💡 Tipp“ siehst du, in welcher Region das Land liegt.',
    hardcore: 'Du schreibst die Hauptstadt selbst. Kleine Tippfehler zählen – du siehst dann die richtige Schreibweise.',
  },
  {
    id: 'regionen', nr: 2, emoji: '🧭', titel: 'Regionen Europas',
    kurz: 'Ordne die Länder den sechs Regionen Europas zu.',
    auftrag: 'Du siehst den Namen eines Landes. Zu welcher der sechs Regionen gehört es? '
      + 'Tippe auf die richtige Region. Mit jeder Antwort wird die Karte bunter.',
    einfach: 'Das Land ist auf der Karte gelb markiert.',
    hardcore: 'Das Land ist nicht markiert – du musst selbst wissen, wo es liegt.',
  },
  {
    id: 'schengen', nr: 3, emoji: '🛂', titel: 'Schengen-Raum',
    kurz: 'Finde alle Länder ohne Ausweiskontrollen an den Grenzen.',
    auftrag: 'Im Schengen-Raum gibt es an den Grenzen zwischen den Mitgliedsländern normalerweise keine Ausweiskontrollen. '
      + 'Benannt ist er nach dem Ort Schengen in Luxemburg, wo 1985 der erste Vertrag unterschrieben wurde. '
      + 'Tippe alle Länder an, die zum Schengen-Raum gehören. Achtung: Nicht alle EU-Länder sind dabei – und einige Länder außerhalb der EU schon!',
    einfach: 'Du erfährst sofort, ob ein Land dazugehört, und siehst, wie viele Länder noch fehlen.',
    hardcore: 'Wähle alle Länder aus und tippe dann auf „Prüfen“. Erst dann siehst du, was richtig war.',
  },
  {
    id: 'euro', nr: 4, emoji: '💶', titel: 'Euro-Länder',
    kurz: 'Finde alle Länder, in denen man mit dem Euro bezahlt.',
    auftrag: 'Der Euro (€) ist das gemeinsame Geld vieler Länder in Europa. Euro-Münzen und -Scheine gibt es seit 2002. '
      + 'Tippe alle Länder an, in denen man mit dem Euro bezahlt. Tipp: Auch einige kleine Länder außerhalb der EU gehören dazu!',
    einfach: 'Du erfährst sofort, ob ein Land dazugehört, und siehst, wie viele Länder noch fehlen.',
    hardcore: 'Wähle alle Länder aus und tippe dann auf „Prüfen“. Erst dann siehst du, was richtig war.',
  },
  {
    id: 'eunoeuro', nr: 5, emoji: '🪙', titel: 'EU ohne Euro',
    kurz: 'Finde die EU-Länder mit eigener Währung und wähle die richtige Währung.',
    auftrag: 'Die Europäische Union (EU) hat 27 Mitgliedsländer. Sechs davon bezahlen nicht mit dem Euro, sondern mit ihrem eigenen Geld. '
      + 'Tippe diese Länder auf der Karte an. Nach jedem gefundenen Land wählst du die richtige Währung aus.',
    einfach: 'Du siehst, wie viele Länder noch fehlen.',
    hardcore: 'Du siehst nicht, wie viele Länder noch fehlen – tippe auf „Fertig“, wenn du alle gefunden hast.',
  },
];

export const ENTDECKEN = {
  id: 'entdecken', emoji: '🔍', titel: 'Entdecken',
  kurz: 'Tippe auf ein Land und erfahre mehr darüber – zum Lernen vor dem Spielen.',
};

export const ALLGEMEIN = {
  einVersuch: 'Für jede Frage hast du einen Versuch. Danach siehst du die Lösung.',
  gemeinsam: 'Ihr spielt reihum an einem Gerät. Jede richtige Antwort bringt einen Punkt.',
};

export const AUFFRISCHUNG = {
  thema: 'Europa auf einen Blick – das brauchst du für die Rallye:',
  punkte: [
    'In dieser App ist Europa in <em>sechs Regionen</em> eingeteilt: Nord-, West-, Süd-, Mittel-, Südost- und Osteuropa.',
    'Die <em>Europäische Union (EU)</em> hat 27 Mitgliedsländer – 21 davon bezahlen mit dem <em>Euro (€)</em>.',
    'Im <em>Schengen-Raum</em> (29 Länder) gibt es an den Grenzen normalerweise keine Ausweiskontrollen.',
    'Das <em>Länderkennzeichen</em> zeigt, aus welchem Land ein Auto kommt: <em>D</em> steht für Deutschland.',
  ],
};

// ---------------------------------------------------------------------------
// Hilfen
// ---------------------------------------------------------------------------
const SPIELER_FARBEN = ['#FF6B57', '#3FA7E0', '#2EC4A6', '#C76FCB'];
const L = Object.fromEntries(LAENDER.map((l) => [l.id, l]));
const CODES = LAENDER.map((l) => l.id);
const REG = Object.fromEntries(REGIONEN.map((r) => [r.id, r]));

const gross = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const nom = (l) => l.formen?.nom ?? l.name;          // Frankreich · die Schweiz
const dat = (l) => l.formen?.dat ?? `in ${l.name}`;  // in Frankreich · in der Schweiz
const gen = (l) => l.formen?.gen ?? `von ${l.name}`; // von Frankreich · der Schweiz
const mz = (l) => Boolean(l.formen?.mehrzahl);
const istSind = (l) => (mz(l) ? 'sind' : 'ist');
const liegt = (l) => (mz(l) ? 'liegen' : 'liegt');
const gehoert = (l) => (mz(l) ? 'gehören' : 'gehört');
const auchText = (l) => (l.auch ? (l.auch.includes(':') ? l.auch : `auch: ${l.auch}`) : '');

function mische(liste) {
  const a = [...liste];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (z) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[z]));
}

/** Für Vergleiche: klein, ohne Akzente/Leerzeichen; ß → ss. */
const falte = (s) => s.toLowerCase().replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
/** Wie falte(), aber ä/ö/ü → ae/oe/ue (für Eingaben ohne Umlaut-Taste). */
const falteUmlaut = (s) => falte(s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue'));

/** Tippfehler-Abstand: einfügen, löschen, ersetzen, vertauschen = je 1. */
function tippAbstand(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** Getippte Hauptstadt prüfen → { richtig, tippfehler?, hinweis?, anderes? } */
export function pruefeHauptstadt(eingabe, l) {
  const a = falte(eingabe);
  const b = falteUmlaut(eingabe);
  if (!a) return null;
  const gleich = (v) => falte(v) === a || falteUmlaut(v) === b;
  const varianten = (x) => [x.hauptstadt, ...(x.hauptstadtAuch ?? []), ...(x.hauptstadtAlt ?? []).map((v) => v[0])];
  if ([l.hauptstadt, ...(l.hauptstadtAuch ?? [])].some(gleich)) return { richtig: true };
  const alt = (l.hauptstadtAlt ?? []).find(([v]) => gleich(v));
  if (alt) return { richtig: true, hinweis: alt[1] };
  const anderes = LAENDER.find((o) => o.id !== l.id && o.hauptstadt !== l.hauptstadt && varianten(o).some(gleich));
  if (anderes) return { richtig: false, anderes };
  const toleranz = a.length >= 8 ? 2 : a.length >= 4 ? 1 : 0;
  const nah = varianten(l).some((v) => tippAbstand(falte(v), a) <= toleranz || tippAbstand(falteUmlaut(v), b) <= toleranz);
  return nah ? { richtig: true, tippfehler: true } : { richtig: false };
}

/** Getipptes Kennzeichen prüfen → { richtig, hinweis?, anderes? } */
export function pruefeKennzeichen(eingabe, l) {
  const k = eingabe.toUpperCase().replace(/[^A-Z]/g, '');
  if (!k) return null;
  if (k === l.kennzeichen) return { richtig: true };
  const alt = (l.kennzeichenAlt ?? []).find(([v]) => v === k);
  if (alt) return { richtig: true, hinweis: alt[1] };
  return { richtig: false, anderes: LAENDER.find((o) => o.kennzeichen === k) ?? null };
}

// ---------------------------------------------------------------------------
// Spiel
// ---------------------------------------------------------------------------
export function mount(container, context) {
  // ---- Lebenszyklus / Aufräumen --------------------------------------
  const timer = new Set();
  let karte = null;

  function spaeter(fn, ms) {
    const id = setTimeout(() => { timer.delete(id); fn(); }, ms);
    timer.add(id);
  }

  function aufraeumen() {
    timer.forEach(clearTimeout);
    timer.clear();
    karte?.aufraeumen();
    karte = null;
  }

  // ---- Einstellungen (bleiben bei „Nochmal spielen“ erhalten) ----------
  let modus = 'solo';            // 'solo' | 'multi'
  let hardcore = false;
  let aufgabe = null;            // Eintrag aus AUFGABEN (oder ENTDECKEN)
  const optionen = { region: 'alle', anzahl: '10', proPerson: '5', kennzeichen: true, regionenAnzahl: '12', regionenProPerson: '6' };
  let spielerAnzahl = 2;
  const namen = ['', '', '', ''];

  // ---- Spielzustand ---------------------------------------------------
  let spieler = [];              // { name, farbe, punkte, richtig, falsch }
  let amZug = 0;
  let runde = null;
  let panelEl = null;
  let statusEl = null;

  // Klicks, Formulare und Schalter laufen über data-elr-Attribute
  const AKTIONEN = {};
  function klick(e) {
    const el = e.target.closest('[data-elr]');
    if (!el || el.disabled || !container.contains(el)) return;
    AKTIONEN[el.dataset.elr]?.(el, e);
  }
  function absenden(e) {
    const form = e.target.closest('form[data-elr-form]');
    if (!form) return;
    e.preventDefault();
    AKTIONEN[form.dataset.elrForm]?.(form, e);
  }
  container.addEventListener('click', klick);
  container.addEventListener('submit', absenden);

  // =====================================================================
  // Bildschirm 1: Startseite – Modus und Aufgabe wählen
  // =====================================================================
  function zeigeStart() {
    aufraeumen();
    runde = null;
    container.innerHTML = `
      <div class="elr-intro">
        <h2 class="elr-titel">🗺️ Europa Länderrallye</h2>
        <p class="elr-untertitel">Länder, Hauptstädte, Regionen, Schengen und Euro – direkt auf der Karte!</p>
        <div class="elr-modi" role="group" aria-label="Spielmodus">
          <button type="button" class="elr-modus ${modus === 'solo' ? 'elr-modus--aktiv' : ''}" data-elr="modus" data-wert="solo" aria-pressed="${modus === 'solo'}">
            <span class="elr-modus-emoji">🧍</span><span class="elr-modus-name">Allein üben</span>
          </button>
          <button type="button" class="elr-modus ${modus === 'multi' ? 'elr-modus--aktiv' : ''}" data-elr="modus" data-wert="multi" aria-pressed="${modus === 'multi'}">
            <span class="elr-modus-emoji">👥</span><span class="elr-modus-name">Gemeinsam (2–4)</span>
          </button>
        </div>
        <label class="elr-hardcore">
          <input type="checkbox" data-elr="hardcore" ${hardcore ? 'checked' : ''}>
          <span>🔥 <strong>Hardcore-Modus:</strong> Hauptstädte und Kennzeichen selbst eintippen, keine Tipps</span>
        </label>
        <h3 class="elr-abschnitt">Wähle eine Aufgabe</h3>
        <div class="elr-aufgaben">
          ${AUFGABEN.map((a) => `
            <button type="button" class="elr-aufgabe" data-elr="aufgabe" data-wert="${a.id}">
              <span class="elr-aufgabe-nr">${a.nr}</span>
              <span class="elr-aufgabe-text"><span class="elr-aufgabe-titel">${a.emoji} ${a.titel}</span>
              <span class="elr-aufgabe-info">${a.kurz}</span></span>
            </button>`).join('')}
          <button type="button" class="elr-aufgabe elr-aufgabe--entdecken" data-elr="aufgabe" data-wert="entdecken">
            <span class="elr-aufgabe-nr">${ENTDECKEN.emoji}</span>
            <span class="elr-aufgabe-text"><span class="elr-aufgabe-titel">${ENTDECKEN.titel}</span>
            <span class="elr-aufgabe-info">${ENTDECKEN.kurz}</span></span>
          </button>
        </div>
        <div class="elr-auffrischung">
          <h3>📚 Kurz aufgefrischt</h3>
          <p class="elr-auffrischung-thema">${AUFFRISCHUNG.thema}</p>
          <ul>${AUFFRISCHUNG.punkte.map((p) => `<li>${p}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  }

  AKTIONEN.modus = (el) => {
    modus = el.dataset.wert;
    container.querySelectorAll('[data-elr="modus"]').forEach((k) => {
      k.classList.toggle('elr-modus--aktiv', k === el);
      k.setAttribute('aria-pressed', k === el);
    });
  };
  AKTIONEN.hardcore = (el) => { hardcore = el.checked; };
  AKTIONEN.aufgabe = (el) => {
    if (el.dataset.wert === 'entdecken') return starteEntdecken();
    aufgabe = AUFGABEN.find((a) => a.id === el.dataset.wert);
    zeigeVorbereitung();
  };
  AKTIONEN.start = () => {
    if (runde && !runde.fertig && runde.gestartet && !confirm('Aufgabe wirklich beenden?')) return;
    zeigeStart();
  };

  // =====================================================================
  // Bildschirm 2: Vorbereitung – Aufgabenstellung, Optionen, Mitspieler
  // =====================================================================
  function zeigeVorbereitung() {
    const seg = (name, werte, aktuell) => `
      <div class="elr-segment" role="group">
        ${werte.map(([w, t]) => `<button type="button" class="elr-segment-knopf ${w === aktuell ? 'elr-segment-knopf--aktiv' : ''}" data-elr="option" data-name="${name}" data-wert="${w}">${t}</button>`).join('')}
      </div>`;
    let optionenHtml = '';
    if (aufgabe.id === 'laender') {
      optionenHtml = `
        <label class="elr-option"><span>Welche Länder?</span>
          <select data-elr-select="region">
            <option value="alle">Ganz Europa (${CODES.length} Länder)</option>
            ${REGIONEN.map((r) => `<option value="${r.id}" ${optionen.region === r.id ? 'selected' : ''}>${r.name} (${LAENDER.filter((l) => l.region === r.id).length} Länder)</option>`).join('')}
          </select></label>
        <div class="elr-option"><span>${modus === 'solo' ? 'Wie viele Länder?' : 'Länder pro Person'}</span>
          ${modus === 'solo'
            ? seg('anzahl', [['10', '10'], ['20', '20'], ['alle', 'alle']], optionen.anzahl)
            : seg('proPerson', [['3', '3'], ['5', '5'], ['8', '8']], optionen.proPerson)}</div>
        <label class="elr-hardcore elr-hardcore--klein"><input type="checkbox" data-elr="kennzeichen" ${optionen.kennzeichen ? 'checked' : ''}>
          <span>🚗 Länderkennzeichen mit abfragen</span></label>`;
    } else if (aufgabe.id === 'regionen') {
      optionenHtml = `
        <div class="elr-option"><span>${modus === 'solo' ? 'Wie viele Länder?' : 'Länder pro Person'}</span>
          ${modus === 'solo'
            ? seg('regionenAnzahl', [['12', '12'], ['24', '24'], ['alle', 'alle 48']], optionen.regionenAnzahl)
            : seg('regionenProPerson', [['4', '4'], ['6', '6'], ['8', '8']], optionen.regionenProPerson)}</div>`;
    }

    container.innerHTML = `
      <div class="elr-intro">
        <h2 class="elr-titel">${aufgabe.emoji} ${aufgabe.titel}</h2>
        <div class="elr-auftrag">
          <p>${aufgabe.auftrag}</p>
          <p class="elr-stufe">${hardcore ? `🔥 <strong>Hardcore:</strong> ${aufgabe.hardcore}` : `⭐ ${aufgabe.einfach}`}</p>
          <p class="elr-stufe">☝️ ${ALLGEMEIN.einVersuch}</p>
          ${modus === 'multi' ? `<p class="elr-stufe">👥 ${ALLGEMEIN.gemeinsam}</p>` : ''}
        </div>
        ${optionenHtml}
        ${modus === 'multi' ? `
          <div class="elr-option"><span>Wer spielt mit?</span>
            ${seg('spielerAnzahl', [['2', '2'], ['3', '3'], ['4', '4']], String(spielerAnzahl))}</div>
          <div class="elr-namen">${namensFelder()}</div>` : ''}
        <button type="button" class="knopf knopf--koralle knopf--gross knopf--block" data-elr="los">🚀 Los geht's!</button>
        <button type="button" class="elr-link" data-elr="start">‹ Zurück zur Aufgabenwahl</button>
      </div>
    `;
    container.querySelector('[data-elr-select="region"]')?.addEventListener('change', (e) => { optionen.region = e.target.value; });
    container.querySelectorAll('.elr-namen input').forEach((input) => {
      input.addEventListener('input', () => { namen[Number(input.dataset.nr)] = input.value; });
    });
  }

  function namensFelder() {
    return Array.from({ length: spielerAnzahl }, (_, i) => `
      <label class="elr-name-feld">
        <span class="spieler-punkt" style="--punkt-farbe:${SPIELER_FARBEN[i]}"></span>
        <input type="text" maxlength="14" placeholder="Spieler ${i + 1}" value="${esc(namen[i])}" data-nr="${i}" autocomplete="off">
      </label>`).join('');
  }

  AKTIONEN.option = (el) => {
    const { name, wert } = el.dataset;
    if (name === 'spielerAnzahl') {
      spielerAnzahl = Number(wert);
      zeigeVorbereitung();
      return;
    }
    optionen[name] = wert;
    el.parentNode.querySelectorAll('button').forEach((k) => k.classList.toggle('elr-segment-knopf--aktiv', k === el));
  };
  AKTIONEN.kennzeichen = (el) => { optionen.kennzeichen = el.checked; };

  AKTIONEN.los = () => {
    spieler = modus === 'solo'
      ? [{ name: 'Du', farbe: SPIELER_FARBEN[0] }]
      : Array.from({ length: spielerAnzahl }, (_, i) => ({ name: namen[i].trim() || `Spieler ${i + 1}`, farbe: SPIELER_FARBEN[i] }));
    spieler.forEach((s) => Object.assign(s, { punkte: 0, richtig: 0, falsch: 0 }));
    amZug = 0;
    if (aufgabe.id === 'laender') starteLaender();
    else if (aufgabe.id === 'regionen') starteRegionen();
    else starteAuswahl();
  };

  // =====================================================================
  // Spielfläche: Status, Karte, Panel
  // =====================================================================
  function baueSpielflaeche() {
    aufraeumen();
    container.innerHTML = `
      <div class="elr-spiel">
        <div class="elr-status"></div>
        <div class="elr-buehne">
          <div class="elr-kartenplatz"></div>
          <div class="elr-panel" aria-live="polite"></div>
        </div>
        <button type="button" class="elr-link" data-elr="start">‹ Zurück zur Aufgabenwahl</button>
      </div>
    `;
    statusEl = container.querySelector('.elr-status');
    panelEl = container.querySelector('.elr-panel');
    karte = erzeugeKarte(container.querySelector('.elr-kartenplatz'), { codes: CODES, onTipp: (id, art) => runde?.tipp?.(id, art) });
    container.querySelector('.elr-spiel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function zeigeStatus(fortschritt = '') {
    const chips = modus === 'multi'
      ? spieler.map((s, i) => `<span class="elr-chip ${i === amZug && !runde?.fertig ? 'elr-chip--aktiv' : ''}"><span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span>${esc(s.name)} · ${s.punkte}</span>`).join('')
      : `<span class="elr-chip elr-chip--gruen">✅ ${spieler[0].richtig}</span><span class="elr-chip elr-chip--rot">❌ ${spieler[0].falsch}</span>`;
    statusEl.innerHTML = `<span class="elr-chip elr-chip--titel">${aufgabe.emoji} ${aufgabe.titel}${hardcore ? ' 🔥' : ''}</span>${fortschritt ? `<span class="elr-chip">${fortschritt}</span>` : ''}${chips}`;
  }

  function panel(html) {
    panelEl.innerHTML = html;
  }

  /** Karte wieder ganz ins Bild holen (auf dem Handy liegt das Panel unter der Karte). */
  function karteInSicht() {
    const r = container.querySelector('.elr-karte')?.getBoundingClientRect();
    if (!r) return;
    const kopf = document.querySelector('.kopf')?.getBoundingClientRect().bottom ?? 0;
    if (r.top < kopf || r.bottom > window.innerHeight) {
      container.querySelector('.elr-spiel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function zugZeile() {
    if (modus !== 'multi') return '';
    const s = spieler[amZug];
    return `<p class="elr-zug"><span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span> <strong>${esc(s.name)}</strong> ist dran!</p>`;
  }

  function feedback(html, art = '') {
    const f = panelEl.querySelector('.elr-feedback');
    if (f) f.innerHTML = `<p class="elr-feedback-text ${art ? `elr-feedback-text--${art}` : ''}">${html}</p>`;
  }

  /** Antwort werten: Punkte/Statistik für den Spieler am Zug. */
  function werte(richtig, s = spieler[amZug]) {
    if (richtig) { s.punkte += 1; s.richtig += 1; } else s.falsch += 1;
  }

  function weiterKnopf(text, fn) {
    const k = document.createElement('button');
    k.type = 'button';
    k.className = 'knopf knopf--minze knopf--block elr-weiter';
    k.textContent = text;
    k.addEventListener('click', fn, { once: true });
    panelEl.appendChild(k);
    k.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function auswahlKnoepfe(werteListe, aktion) {
    return `<div class="elr-antworten">${werteListe.map((w) => `<button type="button" class="elr-antwort" data-elr="${aktion}" data-wert="${esc(w)}">${esc(w)}</button>`).join('')}</div>`;
  }

  /** Alle Antwortknöpfe sperren, die richtige grün und die gewählte (falls falsch) rot markieren. */
  function markiereKnoepfe(richtigerWert, gewaehlt) {
    panelEl.querySelectorAll('.elr-antwort').forEach((k) => {
      k.disabled = true;
      if (k.dataset.wert === richtigerWert) k.classList.add('elr-antwort--richtig');
      else if (k === gewaehlt) k.classList.add('elr-antwort--falsch');
    });
  }

  function eingabeFeld(aktion, platzhalter, art = 'text') {
    return `
      <form class="elr-eingabe" data-elr-form="${aktion}" autocomplete="off">
        <input type="text" class="elr-eingabe-feld ${art === 'kennzeichen' ? 'elr-eingabe-feld--kurz' : ''}" name="antwort"
               autocapitalize="${art === 'kennzeichen' ? 'characters' : 'words'}" autocorrect="off" spellcheck="false"
               enterkeyhint="done" maxlength="${art === 'kennzeichen' ? 4 : 40}" placeholder="${platzhalter}" aria-label="${platzhalter}">
        <button type="submit" class="knopf knopf--koralle">Prüfen</button>
      </form>`;
  }

  function nimmEingabe(form) {
    const input = form.querySelector('input');
    const wert = input.value.trim();
    if (!wert) { input.focus(); return null; }
    input.disabled = true;
    form.querySelector('button').disabled = true;
    return { input, wert };
  }

  // =====================================================================
  // Aufgabe 1: Länder & Hauptstädte
  // =====================================================================
  function starteLaender() {
    const pool = mische(CODES.filter((id) => optionen.region === 'alle' || L[id].region === optionen.region));
    const anzahl = modus === 'solo'
      ? (optionen.anzahl === 'alle' ? pool.length : Math.min(pool.length, Number(optionen.anzahl)))
      : Math.min(pool.length - (pool.length % spieler.length), Number(optionen.proPerson) * spieler.length);
    runde = { liste: pool.slice(0, anzahl), i: 0, verlauf: [], gestartet: true, tipp: laenderTipp };
    baueSpielflaeche();
    laenderFrage();
  }

  function laenderFrage() {
    if (runde.i >= runde.liste.length) return auswertung();
    const l = L[runde.liste[runde.i]];
    amZug = runde.i % spieler.length;
    runde.akt = { id: l.id, spieler: amZug, finden: null, hauptstadt: null, kennzeichen: null };
    runde.phase = 'finden';
    karte.hauptstadt(null);
    karte.europa();
    karte.frage(`Wo ${liegt(l)} ${nom(l)}?`);
    zeigeStatus(`Land ${runde.i + 1} / ${runde.liste.length}`);
    karteInSicht();
    panel(`
      ${zugZeile()}
      <p class="elr-frage-klein">Wo ${liegt(l)}</p>
      <p class="elr-gross">${nom(l)}?</p>
      ${auchText(l) ? `<p class="elr-auch">(${auchText(l)})</p>` : ''}
      <p class="elr-hinweis">Tippe das Land auf der Karte an.</p>
      <div class="elr-feedback"></div>
      ${hardcore ? '' : '<button type="button" class="elr-link elr-link--tipp" data-elr="regionstipp">💡 Tipp: In welcher Region liegt es?</button>'}
    `);
  }

  AKTIONEN.regionstipp = (el) => {
    if (runde.phase !== 'finden') return;
    const l = L[runde.akt.id];
    el.remove();
    for (const id of CODES) if (L[id].region === l.region) karte.plus(id, 'ist-tipp');
    karte.zeige(CODES.filter((id) => L[id].region === l.region && id !== 'RUS' && id !== 'KAZ'));
    feedback(`💡 ${gross(nom(l))} ${liegt(l)} in <strong>${REG[l.region].name}</strong> – gelb markiert.`, 'info');
  };

  function laenderTipp(id, art) {
    if (runde.phase !== 'finden') return;
    if (!id) return feedback(art === 'grau' ? 'Dieses Land gehört nicht zu unserer Liste – tippe ein anderes an.' : 'Da ist Wasser 🌊 – tippe auf ein Land.', 'info');
    const l = L[runde.akt.id];
    const richtig = id === l.id;
    runde.phase = 'gefunden';
    runde.akt.finden = richtig;
    runde.falschGetippt = richtig ? null : id;
    werte(richtig);
    zeigeStatus(`Land ${runde.i + 1} / ${runde.liste.length}`);
    for (const x of CODES) karte.minus(x, 'ist-tipp');
    panelEl.querySelector('[data-elr="regionstipp"]')?.remove();
    if (richtig) {
      karte.zustand(id, 'ist-richtig');
      feedback(`✅ Richtig! ${gross(isIstText(l))}`, 'gruen');
    } else {
      karte.plus(id, 'ist-falsch');
      karte.zustand(l.id, 'ist-loesung');
      if (l.id === 'RUS' || l.id === 'KAZ') karte.europa(); else karte.zeige([l.id]);
      feedback(`❌ ${isIstText(L[id], true)} ${gross(nom(l))} ${liegt(l)} hier – orange markiert.`, 'rot');
    }
    weiterKnopf('Weiter zur Hauptstadt ➜', laenderHauptstadt);
  }

  /** „Das ist Frankreich.“ / „Das sind die Niederlande.“ */
  function isIstText(l) {
    return `${mz(l) ? 'Das sind' : 'Das ist'} ${nom(l)}.`;
  }

  function laenderHauptstadt() {
    const l = L[runde.akt.id];
    runde.phase = 'hauptstadt';
    if (runde.falschGetippt) karte.minus(runde.falschGetippt, 'ist-falsch');
    karte.zustand(l.id, 'ist-gesucht');
    karte.hauptstadt(l.id);
    const hs = KARTE.hauptstaedte[l.id];
    if (l.id === 'RUS') karte.zeigePunkt(hs, 420);
    else if (l.id === 'KAZ' || !karte.sichtbar(hs) || karte.groesse(l.id) < 45) karte.zeige([l.id], { punkt: hs });
    karte.frage(`Hauptstadt ${gen(l)}?`);
    karteInSicht();
    const ostHinweis = l.id === 'KAZ' ? '<p class="elr-hinweis">Astana liegt weit im Osten – die Karte ist dorthin gerückt.</p>' : '';
    panel(`
      ${zugZeile()}
      <p class="elr-gross elr-gross--klein">${l.name}</p>
      <p class="elr-frage">Wie heißt die <strong>Hauptstadt</strong> ${gen(l)}? <span class="elr-hinweis">Sie ist auf der Karte rot markiert.</span></p>
      ${ostHinweis}
      ${hardcore
        ? `${eingabeFeld('hauptstadtEingabe', 'Hauptstadt eintippen …')}<button type="button" class="elr-link" data-elr="hauptstadtWeissNicht">Ich weiß es nicht</button>`
        : auswahlKnoepfe(mische([l.hauptstadt, ...mische(LAENDER.filter((o) => o.hauptstadt !== l.hauptstadt)).slice(0, 3).map((o) => o.hauptstadt)]), 'hauptstadtWahl')}
      <div class="elr-feedback"></div>
    `);
    if (hardcore) panelEl.querySelector('.elr-eingabe-feld').focus({ preventScroll: true });
  }

  function hauptstadtErgebnis(ergebnis, eingabe) {
    const l = L[runde.akt.id];
    runde.akt.hauptstadt = ergebnis.richtig;
    werte(ergebnis.richtig);
    zeigeStatus(`Land ${runde.i + 1} / ${runde.liste.length}`);
    panelEl.querySelector('[data-elr="hauptstadtWeissNicht"]')?.remove();
    let text;
    if (ergebnis.richtig) {
      text = `✅ Richtig! <strong>${l.hauptstadt}</strong> ist die Hauptstadt ${gen(l)}.`;
      if (ergebnis.tippfehler) text += `<br>✏️ Kleiner Tippfehler – man schreibt: <strong>${l.hauptstadt}</strong>.`;
      if (ergebnis.hinweis) text += `<br>ℹ️ ${ergebnis.hinweis}`;
    } else {
      text = ergebnis.anderes
        ? `❌ ${esc(eingabe)} ist die Hauptstadt ${gen(ergebnis.anderes)}.`
        : eingabe ? `❌ „${esc(eingabe)}“ stimmt leider nicht.` : '❌ Schade.';
      text += ` Die Hauptstadt ${gen(l)} heißt <strong>${l.hauptstadt}</strong>.`;
    }
    feedback(text, ergebnis.richtig ? 'gruen' : 'rot');
    weiterKnopf('Weiter ➜', optionen.kennzeichen ? laenderKennzeichen : laenderSteckbrief);
  }

  AKTIONEN.hauptstadtWahl = (el) => {
    if (runde.phase !== 'hauptstadt') return;
    runde.phase = 'hauptstadt-beantwortet';
    const l = L[runde.akt.id];
    markiereKnoepfe(l.hauptstadt, el);
    const richtig = el.dataset.wert === l.hauptstadt;
    hauptstadtErgebnis(richtig ? { richtig } : { richtig, anderes: LAENDER.find((o) => o.hauptstadt === el.dataset.wert) }, el.dataset.wert);
  };
  AKTIONEN.hauptstadtEingabe = (form) => {
    if (runde.phase !== 'hauptstadt') return;
    const e = nimmEingabe(form);
    if (!e) return;
    runde.phase = 'hauptstadt-beantwortet';
    const ergebnis = pruefeHauptstadt(e.wert, L[runde.akt.id]);
    e.input.classList.add(ergebnis.richtig ? 'elr-eingabe-feld--richtig' : 'elr-eingabe-feld--falsch');
    hauptstadtErgebnis(ergebnis, e.wert);
  };
  AKTIONEN.hauptstadtWeissNicht = () => {
    if (runde.phase !== 'hauptstadt') return;
    runde.phase = 'hauptstadt-beantwortet';
    const form = panelEl.querySelector('.elr-eingabe');
    form.querySelectorAll('input, button').forEach((x) => { x.disabled = true; });
    hauptstadtErgebnis({ richtig: false }, '');
  };

  function laenderKennzeichen() {
    const l = L[runde.akt.id];
    runde.phase = 'kennzeichen';
    karte.frage(`Kennzeichen ${gen(l)}?`);
    panel(`
      ${zugZeile()}
      <p class="elr-gross elr-gross--klein">${l.name}</p>
      <p class="elr-frage">🚗 Welches <strong>Länderkennzeichen</strong> hat ${nom(l)}? <span class="elr-hinweis">Es steht hinten auf dem Auto.</span></p>
      ${hardcore
        ? eingabeFeld('kennzeichenEingabe', 'z. B. D', 'kennzeichen')
        : auswahlKnoepfe(mische([l.kennzeichen, ...mische(LAENDER.filter((o) => o.id !== l.id)).slice(0, 3).map((o) => o.kennzeichen)]), 'kennzeichenWahl')}
      <div class="elr-feedback"></div>
      <div class="elr-knopfzeile">
        <button type="button" class="elr-link" data-elr="kennzeichenWeg">Überspringen</button>
        <button type="button" class="elr-link" data-elr="kennzeichenAus">Kennzeichen nicht mehr fragen</button>
      </div>
    `);
    if (hardcore) panelEl.querySelector('.elr-eingabe-feld').focus({ preventScroll: true });
  }

  function kennzeichenErgebnis(ergebnis, eingabe) {
    const l = L[runde.akt.id];
    runde.akt.kennzeichen = ergebnis.richtig;
    werte(ergebnis.richtig);
    zeigeStatus(`Land ${runde.i + 1} / ${runde.liste.length}`);
    panelEl.querySelector('.elr-knopfzeile')?.remove();
    let text;
    if (ergebnis.richtig) {
      text = `✅ Richtig! <span class="elr-schild">${l.kennzeichen}</span> steht für ${nom(l)}.`;
      if (ergebnis.hinweis) text += `<br>ℹ️ ${ergebnis.hinweis}`;
    } else {
      text = ergebnis.anderes ? `❌ ${esc(eingabe)} ist das Kennzeichen ${gen(ergebnis.anderes)}.` : `❌ „${esc(eingabe)}“ stimmt leider nicht.`;
      text += ` Richtig ist <span class="elr-schild">${l.kennzeichen}</span>.`;
    }
    feedback(text, ergebnis.richtig ? 'gruen' : 'rot');
    weiterKnopf('Weiter ➜', laenderSteckbrief);
  }

  AKTIONEN.kennzeichenWahl = (el) => {
    if (runde.phase !== 'kennzeichen') return;
    runde.phase = 'kennzeichen-beantwortet';
    const l = L[runde.akt.id];
    markiereKnoepfe(l.kennzeichen, el);
    const richtig = el.dataset.wert === l.kennzeichen;
    kennzeichenErgebnis({ richtig, anderes: richtig ? null : LAENDER.find((o) => o.kennzeichen === el.dataset.wert) }, el.dataset.wert);
  };
  AKTIONEN.kennzeichenEingabe = (form) => {
    if (runde.phase !== 'kennzeichen') return;
    const e = nimmEingabe(form);
    if (!e) return;
    runde.phase = 'kennzeichen-beantwortet';
    const ergebnis = pruefeKennzeichen(e.wert, L[runde.akt.id]);
    e.input.classList.add(ergebnis.richtig ? 'elr-eingabe-feld--richtig' : 'elr-eingabe-feld--falsch');
    kennzeichenErgebnis(ergebnis, e.wert.toUpperCase());
  };
  AKTIONEN.kennzeichenWeg = () => { if (runde.phase === 'kennzeichen') laenderSteckbrief(); };
  AKTIONEN.kennzeichenAus = () => {
    if (runde.phase !== 'kennzeichen') return;
    optionen.kennzeichen = false;
    laenderSteckbrief();
  };

  function laenderSteckbrief() {
    const l = L[runde.akt.id];
    runde.phase = 'steckbrief';
    karte.frage('');
    const letztes = runde.i + 1 >= runde.liste.length;
    const naechster = modus === 'multi' && !letztes ? spieler[(runde.i + 1) % spieler.length] : null;
    panel(steckbrief(l, { kennzeichen: optionen.kennzeichen }));
    weiterKnopf(letztes ? 'Zur Auswertung ➜' : naechster ? `Weiter – ${naechster.name} ist dran ➜` : 'Nächstes Land ➜', () => {
      const a = runde.akt;
      runde.verlauf.push(a);
      const alles = a.finden && a.hauptstadt && a.kennzeichen !== false;
      karte.zustand(a.id, alles ? 'ist-erledigt' : 'ist-verpasst');
      runde.i += 1;
      laenderFrage();
    });
    panelEl.scrollTop = 0;
  }

  // =====================================================================
  // Aufgabe 2: Regionen
  // =====================================================================
  function starteRegionen() {
    const pool = mische(CODES);
    const anzahl = modus === 'solo'
      ? (optionen.regionenAnzahl === 'alle' ? pool.length : Number(optionen.regionenAnzahl))
      : Math.min(pool.length - (pool.length % spieler.length), Number(optionen.regionenProPerson) * spieler.length);
    runde = { liste: pool.slice(0, anzahl), i: 0, verlauf: [], gestartet: true, tipp: regionenTipp };
    baueSpielflaeche();
    regionenFrage();
  }

  function regionenFrage() {
    if (runde.i >= runde.liste.length) return auswertung();
    const l = L[runde.liste[runde.i]];
    amZug = runde.i % spieler.length;
    runde.akt = { id: l.id, spieler: amZug, richtig: null };
    runde.phase = 'frage';
    if (!hardcore) {
      karte.zustand(l.id, 'ist-gesucht');
      if (karte.groesse(l.id) < 45) karte.zeige([l.id]);
      else karte.europa();
    } else karte.europa();
    karte.frage(`${l.name}: welche Region?`);
    zeigeStatus(`Land ${runde.i + 1} / ${runde.liste.length}`);
    karteInSicht();
    panel(`
      ${zugZeile()}
      <p class="elr-frage-klein">Zu welcher Region ${gehoert(l)}</p>
      <p class="elr-gross">${nom(l)}?</p>
      ${auchText(l) ? `<p class="elr-auch">(${auchText(l)})</p>` : ''}
      <div class="elr-antworten elr-antworten--regionen">
        ${REGIONEN.map((r) => `<button type="button" class="elr-antwort elr-antwort--region" style="--region:${r.farbe}" data-elr="regionWahl" data-wert="${r.id}">${r.name}</button>`).join('')}
      </div>
      <div class="elr-feedback"></div>
    `);
  }

  function regionenTipp(id) {
    if (runde.phase === 'frage' && id) feedback(`${isIstText(L[id])} Tippe unten auf eine Region.`, 'info');
  }

  AKTIONEN.regionWahl = (el) => {
    if (runde.phase !== 'frage') return;
    runde.phase = 'beantwortet';
    const l = L[runde.akt.id];
    const richtig = el.dataset.wert === l.region;
    runde.akt.richtig = richtig;
    werte(richtig);
    zeigeStatus(`Land ${runde.i + 1} / ${runde.liste.length}`);
    markiereKnoepfe(l.region, el);
    karte.zustand(l.id, null);
    karte.farbe(l.id, REG[l.region].farbe);
    if (hardcore || !richtig) {
      if (l.id === 'RUS' || l.id === 'KAZ') karte.europa();
      else karte.zeige([l.id]);
    }
    let text = richtig
      ? `✅ Richtig! ${gross(nom(l))} ${gehoert(l)} zu ${REG[l.region].name}.`
      : `❌ ${gross(nom(l))} ${gehoert(l)} zu <strong>${REG[l.region].name}</strong>.`;
    if (l.regionHinweis) text += `<br>ℹ️ ${l.regionHinweis}`;
    feedback(text, richtig ? 'gruen' : 'rot');
    const letztes = runde.i + 1 >= runde.liste.length;
    const naechster = modus === 'multi' && !letztes ? spieler[(runde.i + 1) % spieler.length] : null;
    weiterKnopf(letztes ? 'Zur Auswertung ➜' : naechster ? `Weiter – ${naechster.name} ist dran ➜` : 'Nächstes Land ➜', () => {
      runde.verlauf.push(runde.akt);
      runde.i += 1;
      regionenFrage();
    });
  };

  // =====================================================================
  // Aufgaben 3–5: alle passenden Länder auf der Karte antippen
  // =====================================================================
  const AUSWAHL = {
    schengen: {
      ziel: (l) => l.schengen,
      offen: SCHENGEN_OFFEN,
      frage: 'Tippe alle Länder an, die zum <strong>Schengen-Raum</strong> gehören.',
      kartenfrage: 'Welche Länder gehören zum Schengen-Raum?',
      richtig: (l) => `✅ Richtig! ${gross(nom(l))} ${gehoert(l)} zum Schengen-Raum.`,
      falsch: (l) => (l.eu
        ? `${gross(nom(l))} ${istSind(l)} zwar in der EU, ${gehoert(l)} aber nicht zum Schengen-Raum.`
        : `${gross(nom(l))} ${gehoert(l)} nicht zum Schengen-Raum.`),
      offenText: (l) => `${gross(nom(l))} ist kein Mitglied, hat aber offene Grenzen – zählt hier weder richtig noch falsch.`,
    },
    euro: {
      ziel: (l) => l.euro,
      offen: [],
      frage: 'Tippe alle Länder an, in denen man mit dem <strong>Euro (€)</strong> bezahlt.',
      kartenfrage: 'Wo bezahlt man mit dem Euro?',
      richtig: (l) => `✅ Richtig! ${gross(dat(l))} bezahlt man mit dem Euro.`,
      falsch: (l) => `${gross(dat(l))} bezahlt man ${l.waehrung.mit}.`,
    },
    eunoeuro: {
      ziel: (l) => l.eu && !l.euro,
      offen: [],
      waehrung: true,
      frage: 'Tippe die <strong>EU-Länder</strong> an, die den Euro <strong>nicht</strong> eingeführt haben.',
      kartenfrage: 'Welche EU-Länder haben keinen Euro?',
      richtig: (l) => `✅ Richtig! ${gross(nom(l))} ${istSind(l)} in der EU, hat aber keinen Euro.`,
      falsch: (l) => (!l.eu ? `${gross(nom(l))} ${istSind(l)} kein Mitglied der EU.` : `${gross(dat(l))} bezahlt man schon mit dem Euro.`),
    },
  };

  function starteAuswahl() {
    const cfg = AUSWAHL[aufgabe.id];
    // Sofort-Rückmeldung: einfach, gemeinsam und immer bei Aufgabe 5 (Währung direkt nach jedem Land)
    const sofort = !hardcore || modus === 'multi' || cfg.waehrung;
    runde = {
      cfg, sofort,
      zaehler: !hardcore,
      ziele: new Set(CODES.filter((id) => cfg.ziel(L[id]))),
      offen: new Set(cfg.offen),
      gefunden: new Map(),          // id → Spieler-Index
      auswahl: new Set(),           // nur Hardcore allein (Aufgabe 3/4)
      falsch: [],                   // falsch getippte Länder
      verpasst: [],
      waehrungen: [],               // { id, richtig }
      phase: 'karte',
      gestartet: true,
      tipp: auswahlTipp,
    };
    baueSpielflaeche();
    karte.frage(cfg.kartenfrage);
    zeigeAuswahlPanel();
  }

  function fortschrittText() {
    if (runde.sofort) return runde.zaehler ? `Gefunden: ${runde.gefunden.size} / ${runde.ziele.size}` : `Gefunden: ${runde.gefunden.size}`;
    return `Ausgewählt: ${runde.auswahl.size}`;
  }

  function zeigeAuswahlPanel(feedbackHtml = '') {
    zeigeStatus(fortschrittText());
    panel(`
      ${zugZeile()}
      <p class="elr-frage">${runde.cfg.frage}</p>
      <p class="elr-hinweis">${runde.sofort
        ? (modus === 'multi' ? 'Reihum tippt jeder ein Land an.' : 'Tippe ein Land nach dem anderen an.')
        : 'Nochmal tippen hebt die Auswahl auf. Wenn du fertig bist: „Prüfen“.'}</p>
      <div class="elr-feedback">${feedbackHtml}</div>
      <div class="elr-knopfzeile">
        ${runde.sofort
          ? `<button type="button" class="knopf knopf--blass" data-elr="auswahlEnde">${runde.zaehler ? '🏳️ Lösung zeigen' : '🏁 Fertig'}</button>`
          : '<button type="button" class="knopf knopf--koralle" data-elr="auswahlPruefen">✔️ Prüfen</button>'}
      </div>
    `);
  }

  function auswahlTipp(id, art) {
    if (runde.phase === 'waehrung') return feedback('Wähle zuerst die richtige Währung aus.', 'info');
    if (runde.phase !== 'karte') return;
    if (!id) return feedback(art === 'grau' ? 'Dieses Land gehört nicht zu unserer Liste.' : 'Da ist Wasser 🌊 – tippe auf ein Land.', 'info');
    const l = L[id];
    const cfg = runde.cfg;

    if (!runde.sofort) {
      if (runde.auswahl.has(id)) { runde.auswahl.delete(id); karte.zustand(id, null); } else { runde.auswahl.add(id); karte.zustand(id, 'ist-auswahl'); }
      zeigeStatus(fortschrittText());
      return feedback('');
    }

    if (runde.gefunden.has(id)) return feedback(`${gross(nom(l))} ${istSind(l)} schon gefunden – tippe ein anderes Land an.`, 'info');
    if (runde.offen.has(id)) { karte.zustand(id, 'ist-neutral'); return feedback(cfg.offenText(l), 'info'); }

    if (runde.ziele.has(id)) {
      runde.gefunden.set(id, amZug);
      if (modus === 'multi') karte.farbe(id, spieler[amZug].farbe); else karte.zustand(id, 'ist-richtig');
      werte(true);
      zeigeStatus(fortschrittText());
      if (cfg.waehrung) return waehrungFrage(l, cfg.richtig(l));
      feedback(cfg.richtig(l), 'gruen');
      return naechsterZug();
    }

    runde.falsch.push(id);
    werte(false);
    zeigeStatus(fortschrittText());
    karte.plus(id, 'ist-falsch');
    spaeter(() => karte?.minus(id, 'ist-falsch'), 1400);
    feedback(`❌ ${cfg.falsch(l)}`, 'rot');
    naechsterZug();
  }

  /** Nach einem Tipp: alle gefunden? Sonst im Gemeinsam-Modus der Nächste. */
  function naechsterZug() {
    if (runde.gefunden.size === runde.ziele.size) {
      runde.phase = 'fertig';
      zeigeStatus(fortschrittText());
      panelEl.querySelector('.elr-knopfzeile')?.remove();
      panelEl.querySelector('.elr-zug')?.remove();
      panelEl.querySelector('.elr-feedback').insertAdjacentHTML('beforeend', '<p class="elr-feedback-text elr-feedback-text--gruen">🎉 Alle Länder gefunden!</p>');
      weiterKnopf('Zur Auswertung ➜', auswertung);
      return;
    }
    if (modus === 'multi') {
      amZug = (amZug + 1) % spieler.length;
      zeigeStatus(fortschrittText());
      const z = panelEl.querySelector('.elr-zug');
      if (z) z.outerHTML = zugZeile();
    }
  }

  function waehrungFrage(l, lob) {
    runde.phase = 'waehrung';
    const familie = l.waehrung.name.split(' ').pop();
    const aehnlich = mische(WAEHRUNGEN.filter((w) => w !== l.waehrung.name && w.endsWith(familie))).slice(0, 2);
    const rest = mische(WAEHRUNGEN.filter((w) => w !== l.waehrung.name && !aehnlich.includes(w))).slice(0, 3 - aehnlich.length);
    karte.frage(`Welche Währung hat ${nom(l)}?`);
    panel(`
      ${zugZeile()}
      <p class="elr-feedback-text elr-feedback-text--gruen">${lob}</p>
      <p class="elr-gross elr-gross--klein">${l.name}</p>
      <p class="elr-frage">💰 Mit welchem Geld bezahlt man ${dat(l)}?</p>
      ${auswahlKnoepfe(mische([l.waehrung.name, ...aehnlich, ...rest]), 'waehrungWahl')}
      <div class="elr-feedback"></div>
    `);
    runde.waehrungLand = l.id;
    panelEl.querySelector('.elr-antworten').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  AKTIONEN.waehrungWahl = (el) => {
    if (runde.phase !== 'waehrung') return;
    runde.phase = 'waehrung-beantwortet';
    const l = L[runde.waehrungLand];
    const richtig = el.dataset.wert === l.waehrung.name;
    markiereKnoepfe(l.waehrung.name, el);
    werte(richtig);
    runde.waehrungen.push({ id: l.id, richtig, spieler: amZug });
    zeigeStatus(fortschrittText());
    feedback(richtig ? `✅ Richtig! ${gross(dat(l))} bezahlt man ${l.waehrung.mit}.` : `❌ ${gross(dat(l))} bezahlt man <strong>${l.waehrung.mit}</strong>.`, richtig ? 'gruen' : 'rot');
    weiterKnopf('Weiter ➜', () => {
      runde.phase = 'karte';
      karte.frage(runde.cfg.kartenfrage);
      zeigeAuswahlPanel();
      naechsterZug();
      karteInSicht();
    });
  };

  AKTIONEN.auswahlEnde = () => {
    if (runde.phase !== 'karte') return;
    if (runde.zaehler && !confirm('Lösung zeigen und die Aufgabe beenden?')) return;
    runde.phase = 'fertig';
    runde.verpasst = [...runde.ziele].filter((id) => !runde.gefunden.has(id));
    for (const id of runde.verpasst) karte.zustand(id, 'ist-loesung');
    const namenListe = runde.verpasst.map((id) => L[id].name).join(', ');
    panelEl.querySelector('.elr-knopfzeile')?.remove();
    feedback(runde.verpasst.length
      ? `Orange markiert – diese Länder fehlten noch: <strong>${namenListe}</strong>.`
      : '🎉 Du hattest schon alle gefunden!', 'info');
    spaeter(() => runde.verpasst.forEach((id) => karte?.zustand(id, 'ist-verpasst')), 2800);
    weiterKnopf('Zur Auswertung ➜', auswertung);
  };

  AKTIONEN.auswahlPruefen = () => {
    if (runde.phase !== 'karte') return;
    runde.phase = 'fertig';
    const cfg = runde.cfg;
    for (const id of CODES) {
      const ziel = runde.ziele.has(id);
      const gewaehlt = runde.auswahl.has(id);
      if (ziel && gewaehlt) { runde.gefunden.set(id, 0); karte.zustand(id, 'ist-richtig'); }
      else if (ziel) { runde.verpasst.push(id); karte.zustand(id, 'ist-verpasst'); }
      else if (gewaehlt && runde.offen.has(id)) karte.zustand(id, 'ist-neutral');
      else if (gewaehlt) { runde.falsch.push(id); karte.zustand(id, 'ist-falsch'); }
    }
    spieler[0].richtig = runde.gefunden.size;
    spieler[0].falsch = runde.falsch.length + runde.verpasst.length;
    zeigeStatus(`Richtig: ${runde.gefunden.size} / ${runde.ziele.size}`);
    panel(`
      <p class="elr-frage">${cfg.frage}</p>
      <ul class="elr-bilanz">
        <li><span class="elr-farbfeld elr-farbfeld--richtig"></span>Richtig ausgewählt: <strong>${runde.gefunden.size} von ${runde.ziele.size}</strong></li>
        <li><span class="elr-farbfeld elr-farbfeld--verpasst"></span>Vergessen: <strong>${runde.verpasst.length}</strong></li>
        <li><span class="elr-farbfeld elr-farbfeld--falsch"></span>Gehören nicht dazu: <strong>${runde.falsch.length}</strong></li>
      </ul>
      ${runde.verpasst.length ? `<p><strong>Vergessen:</strong> ${runde.verpasst.map((id) => L[id].name).join(', ')}</p>` : ''}
      ${runde.falsch.length ? `<p><strong>Gehören nicht dazu:</strong></p><ul class="elr-liste">${runde.falsch.map((id) => `<li>${cfg.falsch(L[id])}</li>`).join('')}</ul>` : ''}
    `);
    weiterKnopf('Zur Auswertung ➜', auswertung);
  };

  // =====================================================================
  // Auswertung → universeller Endscreen der Plattform
  // =====================================================================
  function auswertung() {
    runde.fertig = true;
    runde.phase = 'auswertung';
    karte.hauptstadt(null);
    karte.frage('');
    karte.europa();
    zeigeStatus('Auswertung');
    karteInSicht();

    let ueben = [];
    let zeilen = '';
    if (aufgabe.id === 'laender') {
      const v = runde.verlauf;
      const kz = v.filter((a) => a.kennzeichen !== null);
      zeilen = `
        <li>📍 Land gefunden: <strong>${v.filter((a) => a.finden).length} von ${v.length}</strong></li>
        <li>🏙️ Hauptstadt gewusst: <strong>${v.filter((a) => a.hauptstadt).length} von ${v.length}</strong></li>
        ${kz.length ? `<li>🚗 Kennzeichen gewusst: <strong>${kz.filter((a) => a.kennzeichen).length} von ${kz.length}</strong></li>` : ''}`;
      ueben = v.filter((a) => !a.finden || !a.hauptstadt || a.kennzeichen === false).map((a) => {
        const was = [!a.finden && 'Lage', !a.hauptstadt && `Hauptstadt ${L[a.id].hauptstadt}`, a.kennzeichen === false && `Kennzeichen ${L[a.id].kennzeichen}`].filter(Boolean).join(', ');
        return `${L[a.id].name} <span class="elr-hinweis">(${was})</span>`;
      });
    } else if (aufgabe.id === 'regionen') {
      const v = runde.verlauf;
      zeilen = `<li>🧭 Richtig zugeordnet: <strong>${v.filter((a) => a.richtig).length} von ${v.length}</strong></li>`;
      ueben = v.filter((a) => !a.richtig).map((a) => `${L[a.id].name} → ${REG[L[a.id].region].name}`);
    } else {
      zeilen = `
        <li>✅ Gefunden: <strong>${runde.gefunden.size} von ${runde.ziele.size}</strong></li>
        <li>❌ Falsch angetippt: <strong>${runde.falsch.length}</strong></li>
        ${runde.verpasst.length ? `<li>🟧 Nicht gefunden: <strong>${runde.verpasst.length}</strong></li>` : ''}
        ${runde.cfg.waehrung ? `<li>💰 Währung gewusst: <strong>${runde.waehrungen.filter((w) => w.richtig).length} von ${runde.waehrungen.length}</strong></li>` : ''}`;
      ueben = [
        ...runde.verpasst.map((id) => `${L[id].name} <span class="elr-hinweis">(vergessen)</span>`),
        ...[...new Set(runde.falsch)].map((id) => `${L[id].name} <span class="elr-hinweis">(gehört nicht dazu)</span>`),
        ...runde.waehrungen.filter((w) => !w.richtig).map((w) => `${L[w.id].name} <span class="elr-hinweis">(Währung: ${L[w.id].waehrung.name})</span>`),
      ];
    }

    panel(`
      <h3 class="elr-auswertung-titel">📋 Auswertung</h3>
      ${modus === 'solo' ? `<ul class="elr-bilanz elr-bilanz--plain">${zeilen}</ul>` : `<p>${spieler.map((s) => `<span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span> ${esc(s.name)}: <strong>${s.punkte}</strong>`).join(' · ')}</p>`}
      ${aufgabe.id === 'regionen' ? `<div class="elr-legende">${REGIONEN.map((r) => `<span><i style="background:${r.farbe}"></i>${r.name}</span>`).join('')}</div>` : ''}
      ${ueben.length ? `<p class="elr-ueben-titel">Das übt ${modus === 'solo' ? 'du' : 'ihr'} noch:</p><ul class="elr-liste">${ueben.map((u) => `<li>${u}</li>`).join('')}</ul>` : '<p>🌟 Alles richtig – stark!</p>'}
    `);
    weiterKnopf('🏆 Zum Ergebnis', ende);
  }

  function ende() {
    aufraeumen();
    if (modus === 'solo') {
      const s = spieler[0];
      const gesamt = s.richtig + s.falsch;
      const quote = gesamt ? Math.round((s.richtig / gesamt) * 100) : 0;
      const titel = quote >= 90 ? 'Fantastisch!' : quote >= 70 ? 'Stark gespielt!' : quote >= 50 ? 'Gut gemacht!' : 'Dranbleiben!';
      context.showEndScreen({
        titel,
        untertitel: `${aufgabe.titel}: ${quote} % richtig!`,
        ergebnisse: [{ name: 'Richtige Antworten', wert: `${s.richtig} / ${gesamt}`, sieger: quote >= 70 }],
        onRestart: zeigeStart,
      });
      return;
    }
    const rangliste = [...spieler].sort((a, b) => b.punkte - a.punkte || b.richtig - a.richtig);
    const beste = rangliste[0].punkte;
    const sieger = rangliste.filter((s) => s.punkte === beste);
    context.showEndScreen({
      titel: 'Rallye beendet!',
      untertitel: `${sieger.map((s) => esc(s.name)).join(' & ')} ${sieger.length > 1 ? 'gewinnen' : 'gewinnt'} mit ${beste} ${beste === 1 ? 'Punkt' : 'Punkten'}!`,
      ergebnisse: rangliste.map((s) => ({
        name: esc(s.name), farbe: s.farbe, wert: `${s.punkte} ⭐`, detail: `${s.richtig} richtig · ${s.falsch} falsch`, sieger: s.punkte === beste,
      })),
      onRestart: zeigeStart,
    });
  }

  // =====================================================================
  // Entdecken
  // =====================================================================
  function starteEntdecken() {
    aufgabe = ENTDECKEN;
    spieler = [{ name: 'Du', farbe: SPIELER_FARBEN[0], punkte: 0, richtig: 0, falsch: 0 }];
    runde = { tipp: entdeckenTipp, gestartet: false };
    const vorherModus = modus;
    modus = 'solo';
    baueSpielflaeche();
    modus = vorherModus;
    statusEl.innerHTML = `<span class="elr-chip elr-chip--titel">${ENTDECKEN.emoji} ${ENTDECKEN.titel}</span>`;
    karte.frage('Tippe auf ein Land!');
    panel(`
      <p class="elr-frage">Tippe auf ein Land, um mehr darüber zu erfahren.</p>
      <p class="elr-hinweis">Mit zwei Fingern kannst du die Karte vergrößern und mit einem Finger verschieben.</p>
      <label class="elr-hardcore elr-hardcore--klein"><input type="checkbox" data-elr="regionenFarbe"><span>🎨 Regionen einfärben</span></label>
      <div class="elr-legendenplatz"></div>
      <div class="elr-steckbriefplatz"></div>
    `);
  }

  AKTIONEN.regionenFarbe = (el) => {
    for (const id of CODES) karte.farbe(id, el.checked ? REG[L[id].region].farbe : null);
    panelEl.querySelector('.elr-legendenplatz').innerHTML = el.checked
      ? `<div class="elr-legende">${REGIONEN.map((r) => `<span><i style="background:${r.farbe}"></i>${r.name}</span>`).join('')}</div>` : '';
  };

  function entdeckenTipp(id) {
    if (!id) return;
    for (const x of CODES) karte.minus(x, 'ist-gesucht');
    karte.plus(id, 'ist-gesucht');
    karte.hauptstadt(id);
    karte.frage(L[id].name);
    const platz = panelEl.querySelector('.elr-steckbriefplatz');
    platz.innerHTML = steckbrief(L[id], { kennzeichen: true });
    // nur so weit scrollen, dass der Name des Landes sichtbar ist – die Karte bleibt im Bild
    platz.querySelector('.elr-steckbrief-name').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // =====================================================================
  // Steckbrief eines Landes (Aufgabe 1 und Entdecken)
  // =====================================================================
  function steckbrief(l, { kennzeichen }) {
    const r = REG[l.region];
    const marke = (text, an) => `<span class="elr-marke ${an ? 'elr-marke--ja' : 'elr-marke--nein'}">${an ? '✔' : '✘'} ${text}</span>`;
    return `
      <div class="elr-steckbrief">
        <div class="elr-steckbrief-emojis" aria-hidden="true">${l.typisch.map((t) => t[0]).join(' ')}</div>
        <h3 class="elr-steckbrief-name">${l.name}</h3>
        ${auchText(l) ? `<p class="elr-auch">(${auchText(l)})</p>` : ''}
        <dl class="elr-fakten">
          <div><dt>Hauptstadt</dt><dd>${l.hauptstadt}</dd></div>
          ${kennzeichen ? `<div><dt>Kennzeichen</dt><dd><span class="elr-schild">${l.kennzeichen}</span></dd></div>` : ''}
          <div><dt>Region</dt><dd><i class="elr-regionpunkt" style="background:${r.farbe}"></i>${r.name}</dd></div>
          <div><dt>Geld</dt><dd>${l.euro ? 'Euro (€)' : l.waehrung.name}</dd></div>
        </dl>
        <div class="elr-marken">${marke('EU', l.eu)}${marke('Schengen', l.schengen)}${marke('Euro', l.euro)}</div>
        ${l.hinweis ? `<p class="elr-steckbrief-hinweis">ℹ️ ${l.hinweis}</p>` : ''}
        <p class="elr-steckbrief-typisch">Typisch ${l.name}:</p>
        <ul class="elr-typisch">${l.typisch.map(([e, t]) => `<li><span aria-hidden="true">${e}</span>${t}</li>`).join('')}</ul>
      </div>`;
  }

  // Start!
  zeigeStart();
  return () => {
    aufraeumen();
    container.removeEventListener('click', klick);
    container.removeEventListener('submit', absenden);
  };
}
