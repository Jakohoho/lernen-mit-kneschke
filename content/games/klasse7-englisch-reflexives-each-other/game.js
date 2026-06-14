/**
 * Myself & Each Other Race – Brettspiel zu Reflexivpronomen, reflexiven Verben
 * und dem reziproken Pronomen each other (Klasse 7, Englisch).
 *
 * Ablauf (1–4 Spieler, alle würfeln):
 *   - Reihum würfeln und vorrücken.
 *   - Auf einem Frage-Feld wird ein ZUFÄLLIGER Satz aus dem Pool geladen
 *     (jedes Mal neu – ein Feld ist nicht fest an einen Satz gebunden).
 *   - Richtig geantwortet → man bleibt stehen.
 *   - Falsch geantwortet → sofort zurück auf das Feld, von dem man in
 *     diesem Zug gestartet ist.
 *   - Mehrere Spieler dürfen dasselbe Feld besetzen (jeder löst eine Aufgabe).
 *   - Ereignisfelder: vor / zurück / aussetzen / nochmal würfeln.
 *   - Wer zuerst das Ziel erreicht, gewinnt. Danach erscheint die Wertung.
 *
 * Modi: Antworten auswählen (Standard) oder 🔥 Hardcore (frei eintippen).
 */
import { SAETZE, BRETT, ZIEL_INDEX } from './data.js';

const SPIELER_FARBEN = ['#FF6B57', '#3FA7E0', '#2EC4A6', '#C76FCB'];
const WUERFEL_AUGEN = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
/** Rein dekorative Emojis für die Frage-Felder (zyklisch vergeben). */
const FRAGE_EMOJIS = ['🪞', '💬', '🤝', '⭐', '🔤', '🧍', '💡', '👥'];

/** Lern-Tipp, der NACH dem Antworten verraten wird (je nach Kategorie). */
function tippFuer(satz) {
  if (satz.kat === 'verb') return 'Reflexives Verb – im Englischen ohne „sich"!';
  if (satz.kat === 'eachother') {
    return satz.antwort.toLowerCase().includes('each other')
      ? 'each other = einander / sich gegenseitig'
      : 'Reflexivpronomen – zurück auf das Subjekt';
  }
  return 'Reflexivpronomen';
}

export function mount(container, context) {
  // ---- Lebenszyklus / Aufräumen --------------------------------------
  const timer = new Set();
  let resizeHoerer = null;

  function spaeter(fn, ms) {
    const id = setTimeout(() => { timer.delete(id); fn(); }, ms);
    timer.add(id);
    return id;
  }

  function aufraeumen() {
    timer.forEach(clearTimeout);
    timer.clear();
    if (resizeHoerer) window.removeEventListener('resize', resizeHoerer);
    resizeHoerer = null;
  }

  // ---- Spielzustand ---------------------------------------------------
  let hardcore = false;          // true = Antwort frei eintippen statt auswählen
  let spieler = [];              // { name, farbe, pos, zugStart, richtig, falsch, aussetzen, fertig }
  let aktiverIdx = -1;
  let letzterSatzIndex = -1;     // damit nicht zweimal derselbe Satz hintereinander kommt
  let brettEl = null;
  let statusEl = null;
  let aktionEl = null;

  /** Zufälligen Satz aus dem Pool ziehen – möglichst nicht derselbe wie zuletzt. */
  function zieheSatz() {
    let idx = Math.floor(Math.random() * SAETZE.length);
    for (let versuch = 0; versuch < 8 && SAETZE.length > 1 && idx === letzterSatzIndex; versuch += 1) {
      idx = Math.floor(Math.random() * SAETZE.length);
    }
    letzterSatzIndex = idx;
    return SAETZE[idx];
  }

  // =====================================================================
  // Bildschirm 1: Modus wählen
  // =====================================================================
  function zeigeModusWahl() {
    aufraeumen();
    container.innerHTML = `
      <div class="rx-intro">
        <h2 class="rx-titel">🪞 Myself & Each Other Race</h2>
        <p class="rx-untertitel">Reflexivpronomen, reflexive Verben (ohne „sich"!) und each other – wer rast als Erste:r ins Ziel?</p>
        <div class="rx-modi">
          <button type="button" class="rx-modus-karte" data-modus="solo">
            <span class="rx-modus-emoji">🧍</span>
            <span class="rx-modus-name">Allein üben</span>
            <span class="rx-modus-info">Würfle dich allein bis ins Ziel – schaffst du es ohne viele Patzer?</span>
          </button>
          <button type="button" class="rx-modus-karte" data-modus="multi">
            <span class="rx-modus-emoji">👥</span>
            <span class="rx-modus-name">Gegeneinander</span>
            <span class="rx-modus-info">2–4 Spieler würfeln um die Wette – wer ist zuerst im Ziel?</span>
          </button>
        </div>
        <label class="rx-hardcore">
          <input type="checkbox" data-hardcore ${hardcore ? 'checked' : ''}>
          <span>🔥 <strong>Hardcore-Modus:</strong> Antwort selbst eintippen statt auswählen</span>
        </label>
        <div class="rx-regeln">
          <h3>📜 So geht's</h3>
          <ul>
            <li>Würfle und rücke vor. Auf jedem Feld wartet ein Satz – setze das richtige Wort ein (Reflexivpronomen, Verb oder each other).</li>
            <li><strong>Achtung:</strong> Viele Verben mit „sich" im Deutschen brauchen im Englischen <em>kein</em> Pronomen (I remember = ich erinnere mich).</li>
            <li><strong>Richtig</strong> → du bleibst stehen. <strong>Falsch</strong> → zurück auf das Feld, von dem du diesen Zug gestartet bist!</li>
            <li>Ereignisfelder schicken dich vor (⏩) oder zurück (⏪), lassen dich aussetzen (😴) oder nochmal würfeln (🎲).</li>
          </ul>
        </div>
      </div>
    `;
    container.querySelector('[data-hardcore]').addEventListener('change', (e) => {
      hardcore = e.target.checked;
    });
    container.querySelector('[data-modus="solo"]').addEventListener('click', () => {
      starteSpiel([{ name: 'Du', farbe: SPIELER_FARBEN[0] }]);
    });
    container.querySelector('[data-modus="multi"]').addEventListener('click', zeigeMultiSetup);
  }

  // =====================================================================
  // Bildschirm 2: Mehrspieler-Setup
  // =====================================================================
  function zeigeMultiSetup() {
    let anzahl = 2;
    const namen = ['', '', '', ''];

    container.innerHTML = `
      <div class="rx-intro">
        <h2 class="rx-titel">👥 Wer fährt mit?</h2>
        <div class="rx-anzahl" role="group" aria-label="Spieleranzahl">
          ${[2, 3, 4].map((n) => `
            <button type="button" class="rx-anzahl-knopf ${n === 2 ? 'rx-anzahl-knopf--aktiv' : ''}" data-anzahl="${n}">${n}</button>
          `).join('')}
          <span class="rx-anzahl-label">Spieler</span>
        </div>
        <div class="rx-namen"></div>
        <button type="button" class="knopf knopf--koralle knopf--gross knopf--block" data-start>🎲 Los geht's!</button>
        <button type="button" class="rx-zurueck-link" data-zurueck>‹ Zurück zur Modus-Auswahl</button>
      </div>
    `;

    const namenEl = container.querySelector('.rx-namen');

    function zeigeNamensfelder() {
      namenEl.innerHTML = Array.from({ length: anzahl }, (_, i) => `
        <label class="rx-name-feld">
          <span class="spieler-punkt" style="--punkt-farbe:${SPIELER_FARBEN[i]}"></span>
          <input type="text" maxlength="14" placeholder="Spieler ${i + 1}"
                 value="${namen[i].replaceAll('"', '&quot;')}" data-name="${i}" autocomplete="off">
        </label>
      `).join('');
      namenEl.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', () => { namen[Number(input.dataset.name)] = input.value; });
      });
    }
    zeigeNamensfelder();

    container.querySelectorAll('[data-anzahl]').forEach((knopf) => {
      knopf.addEventListener('click', () => {
        anzahl = Number(knopf.dataset.anzahl);
        container.querySelectorAll('[data-anzahl]').forEach((k) =>
          k.classList.toggle('rx-anzahl-knopf--aktiv', k === knopf));
        zeigeNamensfelder();
      });
    });

    container.querySelector('[data-start]').addEventListener('click', () => {
      starteSpiel(Array.from({ length: anzahl }, (_, i) => ({
        name: namen[i].trim() || `Spieler ${i + 1}`,
        farbe: SPIELER_FARBEN[i],
      })));
    });
    container.querySelector('[data-zurueck]').addEventListener('click', zeigeModusWahl);
  }

  // =====================================================================
  // Bildschirm 3: Das Spielbrett
  // =====================================================================
  function starteSpiel(teilnehmer) {
    spieler = teilnehmer.map((t) => ({
      ...t, pos: 0, zugStart: 0, richtig: 0, falsch: 0, aussetzen: false, fertig: false,
    }));
    aktiverIdx = -1;
    letzterSatzIndex = -1;

    container.innerHTML = `
      <div class="rx-spiel">
        <div class="rx-status"></div>
        <div class="rx-brett" role="img" aria-label="Spielbrett"></div>
        <div class="rx-aktion"></div>
      </div>
    `;
    statusEl = container.querySelector('.rx-status');
    brettEl = container.querySelector('.rx-brett');
    aktionEl = container.querySelector('.rx-aktion');

    bauBrett();
    resizeHoerer = entprellt(platziereFelder, 150);
    window.addEventListener('resize', resizeHoerer);
    aktualisiereBrett();
    aktualisiereStatus();

    naechsterZug();
  }

  function bauBrett() {
    let frageNr = 0;
    brettEl.innerHTML = BRETT.map((feld, i) => {
      if (feld.typ === 'start') {
        return `<div class="rx-feld rx-feld--start" data-i="${i}">
          <span class="rx-feld-emoji">🚩</span><span class="rx-feld-label">START</span>
          <div class="rx-tokens"></div></div>`;
      }
      if (feld.typ === 'ziel') {
        return `<div class="rx-feld rx-feld--ziel" data-i="${i}">
          <span class="rx-feld-emoji">🏁</span><span class="rx-feld-label">ZIEL</span>
          <div class="rx-tokens"></div></div>`;
      }
      if (feld.typ === 'spezial') {
        return `<div class="rx-feld rx-feld--spezial" data-i="${i}">
          <span class="rx-feld-emoji">${feld.emoji}</span>
          <span class="rx-feld-label">${feld.label}</span>
          <div class="rx-tokens"></div></div>`;
      }
      frageNr += 1;
      const emoji = FRAGE_EMOJIS[frageNr % FRAGE_EMOJIS.length];
      return `<div class="rx-feld rx-feld--frage" data-i="${i}">
        <span class="rx-feld-nr">${i}</span>
        <span class="rx-feld-emoji">${emoji}</span>
        <div class="rx-tokens"></div></div>`;
    }).join('');
    platziereFelder();
  }

  /** Felder in Schlangenform im Raster platzieren (mobil 4, breiter 6 Spalten). */
  function platziereFelder() {
    if (!brettEl || !brettEl.isConnected) return;
    const spalten = brettEl.clientWidth >= 540 ? 6 : 4;
    brettEl.style.gridTemplateColumns = `repeat(${spalten}, 1fr)`;
    brettEl.querySelectorAll('.rx-feld').forEach((el, i) => {
      const reihe = Math.floor(i / spalten);
      let spalte = i % spalten;
      if (reihe % 2 === 1) spalte = spalten - 1 - spalte;
      el.style.gridRow = String(reihe + 1);
      el.style.gridColumn = String(spalte + 1);
    });
  }

  function aktualisiereBrett() {
    brettEl.querySelectorAll('.rx-feld').forEach((el) => {
      const i = Number(el.dataset.i);

      // Spielfiguren auf diesem Feld
      const hier = spieler.filter((s) => s.pos === i);
      el.querySelector('.rx-tokens').innerHTML = hier.map((s) => `
        <span class="rx-token" style="background:${s.farbe}" title="${s.name}">${[...s.name][0].toUpperCase()}</span>
      `).join('');

      // Aktives Feld hervorheben
      const aktiv = aktiverIdx >= 0 && spieler[aktiverIdx] && spieler[aktiverIdx].pos === i && !spieler[aktiverIdx].fertig;
      el.classList.toggle('rx-feld--aktiv', aktiv);
    });
  }

  function aktualisiereStatus() {
    if (spieler.length === 1) {
      const s = spieler[0];
      statusEl.innerHTML = `
        <span class="rx-chip">📍 Feld ${s.pos} / ${ZIEL_INDEX}</span>
        <span class="rx-chip rx-chip--gruen">✅ ${s.richtig} richtig</span>
        <span class="rx-chip rx-chip--rot">❌ ${s.falsch} falsch</span>
      `;
    } else {
      statusEl.innerHTML = spieler.map((s, i) => `
        <span class="rx-chip rx-spieler-chip ${i === aktiverIdx ? 'rx-spieler-chip--aktiv' : ''}">
          <span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span>
          ${s.name} ${s.fertig ? '🏁' : `· Feld ${s.pos}`}
        </span>
      `).join('');
    }
  }

  // =====================================================================
  // Spielablauf
  // =====================================================================

  /** Nächsten Spieler bestimmen und seinen Zug beginnen. */
  function naechsterZug() {
    aktiverIdx = (aktiverIdx + 1) % spieler.length;
    const s = spieler[aktiverIdx];
    aktualisiereStatus();
    aktualisiereBrett();

    if (s.aussetzen) {
      s.aussetzen = false;
      if (spieler.length === 1) {
        zeigeNachricht('😴 „Miss a turn" – allein verlierst du dadurch nichts. Weiter geht\'s!', naechsterZug);
      } else {
        zeigeNachricht(`😴 ${s.name} muss diese Runde aussetzen.`, naechsterZug);
      }
      return;
    }

    s.zugStart = s.pos;   // Merken, wohin es bei einer falschen Antwort zurückgeht
    zeigeWuerfeln(s);
  }

  function zeigeWuerfeln(s) {
    aktionEl.innerHTML = `
      <div class="rx-panel">
        <p class="rx-zug-info"><span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span> <strong>${s.name}</strong> ist dran!</p>
        <button type="button" class="rx-wuerfel" aria-label="Würfeln">🎲</button>
        <p class="rx-hinweis">Tippe auf den Würfel</p>
      </div>
    `;
    const wuerfelKnopf = aktionEl.querySelector('.rx-wuerfel');
    wuerfelKnopf.addEventListener('click', () => {
      wuerfelKnopf.disabled = true;
      wuerfelKnopf.classList.add('rx-wuerfel--rollt');
      const wurf = 1 + Math.floor(Math.random() * 6);
      let schritte = 0;
      const rolle = setInterval(() => {
        wuerfelKnopf.textContent = WUERFEL_AUGEN[Math.floor(Math.random() * 6)];
        if (++schritte >= 10) {
          clearInterval(rolle);
          timer.delete(rolle);
          wuerfelKnopf.textContent = WUERFEL_AUGEN[wurf - 1];
          wuerfelKnopf.classList.remove('rx-wuerfel--rollt');
          aktionEl.querySelector('.rx-hinweis').textContent = `${s.name} würfelt eine ${wurf}!`;
          spaeter(() => bewege(s, s.pos + wurf), 800);
        }
      }, 90);
      timer.add(rolle);
    }, { once: true });
  }

  /** Figur bewegen (vor oder zurück) und anschließend das Landefeld auswerten. */
  function bewege(s, zielPos) {
    setzePos(s, zielPos);
    spaeter(() => lande(s), 500);
  }

  /** Figur nur versetzen (ohne Landefeld auszuwerten) – für die Rückkehr nach falscher Antwort. */
  function setzePos(s, zielPos) {
    s.pos = Math.max(0, Math.min(zielPos, ZIEL_INDEX));
    aktualisiereBrett();
    aktualisiereStatus();
    scrolleZuFeld(s.pos);
  }

  /** Auswertung des Felds, auf dem die Figur gelandet ist. */
  function lande(s) {
    const i = s.pos;
    const feld = BRETT[i];

    if (feld.typ === 'ziel') {
      s.fertig = true;
      aktualisiereBrett();
      aktualisiereStatus();
      return ende(s);
    }

    if (feld.typ === 'start') {
      // Kann nur durch ein Zurück-Ereignis passieren – kein Satz, einfach weiter.
      return naechsterZug();
    }

    if (feld.typ === 'spezial') {
      if (feld.effekt === 'aussetzen') {
        s.aussetzen = true;
        if (spieler.length === 1) {
          zeigeNachricht(`${feld.emoji} ${feld.label}! Allein üben – das bremst dich nicht. Weiter!`, naechsterZug);
        } else {
          zeigeNachricht(`${feld.emoji} ${s.name} landet auf „${feld.label}" und pausiert nächste Runde.`, naechsterZug);
        }
      } else if (feld.effekt === 'nochmal') {
        zeigeNachricht(`${feld.emoji} ${feld.label}! ${s.name} darf gleich nochmal würfeln.`,
          () => zeigeWuerfeln(s), 'Nochmal würfeln 🎲');
      } else {
        const richtung = feld.effekt > 0 ? 'vor' : 'zurück';
        zeigeNachricht(`${feld.emoji} ${feld.label}! ${s.name} springt ${Math.abs(feld.effekt)} Felder ${richtung}.`,
          () => bewege(s, i + feld.effekt), 'Hüpf! ➜');
      }
      return;
    }

    // Frage-Feld: bei jedem Betreten ein frischer, zufälliger Satz aus dem Pool.
    zeigeFrage(s, zieheSatz());
  }

  function zeigeFrage(s, satz) {
    const satzHtml = satz.satz.replace('___', '<span class="rx-luecke">______</span>');

    const optionen = mische(satz.optionen);
    const antwortBereich = hardcore
      ? `
        <form class="rx-eingabe" autocomplete="off">
          <input type="text" class="rx-eingabe-feld" lang="en" autocapitalize="none"
                 autocorrect="off" spellcheck="false" enterkeyhint="done"
                 placeholder="Antwort eintippen …" aria-label="Antwort">
          <button type="submit" class="knopf knopf--koralle">Prüfen</button>
        </form>`
      : `
        <div class="rx-antworten">
          ${optionen.map((o) => `<button type="button" class="rx-antwort" data-antwort="${o.replaceAll('"', '&quot;')}" lang="en">${o}</button>`).join('')}
        </div>`;

    aktionEl.innerHTML = `
      <div class="rx-panel">
        <p class="rx-zug-info">
          <span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span>
          <strong>${s.name}</strong> · Feld ${s.pos}
        </p>
        <p class="rx-satz" lang="en">${satzHtml}</p>
        ${antwortBereich}
        <div class="rx-feedback" aria-live="polite"></div>
      </div>
    `;

    const feedbackEl = aktionEl.querySelector('.rx-feedback');

    // Gemeinsame Auswertung für beide Antwortarten (Knöpfe & Freitext).
    function werteAntwortAus(korrekt) {
      aktionEl.querySelector('.rx-luecke').textContent = satz.antwort;

      if (korrekt) s.richtig += 1;
      else s.falsch += 1;
      aktualisiereStatus();

      const zurueck = s.zugStart;
      feedbackEl.innerHTML = `
        <p class="rx-feedback-text ${korrekt ? 'rx-feedback-text--gruen' : 'rx-feedback-text--rot'}">
          ${korrekt
            ? `✅ Richtig! <span class="rx-typ">${tippFuer(satz)}</span>`
            : `❌ Leider falsch – richtig ist „${satz.antwort}". <span class="rx-typ">${tippFuer(satz)}</span>`}
        </p>
        <button type="button" class="knopf knopf--minze" data-weiter>
          ${korrekt || s.pos === zurueck ? 'Weiter ➜' : (zurueck === 0 ? 'Zurück zum Start ➜' : `Zurück auf Feld ${zurueck} ➜`)}
        </button>
      `;
      feedbackEl.querySelector('[data-weiter]').addEventListener('click', () => {
        if (!korrekt && s.pos !== zurueck) {
          // Falsch: zurück auf das Startfeld dieses Zuges (ohne erneute Aufgabe).
          setzePos(s, zurueck);
          spaeter(naechsterZug, 500);
        } else {
          naechsterZug();
        }
      }, { once: true });
    }

    if (hardcore) {
      const form = aktionEl.querySelector('.rx-eingabe');
      const input = form.querySelector('.rx-eingabe-feld');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const eingabe = input.value.trim();
        if (!eingabe) return; // leere Eingabe ignorieren

        const korrekt = istKorrekt(eingabe, satz);
        input.disabled = true;
        form.querySelector('button').disabled = true;
        input.classList.add(korrekt ? 'rx-eingabe-feld--richtig' : 'rx-eingabe-feld--falsch');
        werteAntwortAus(korrekt);
      });
      input.focus();
    } else {
      aktionEl.querySelectorAll('.rx-antwort').forEach((knopf) => {
        knopf.addEventListener('click', () => {
          const gewaehlt = knopf.dataset.antwort;
          const korrekt = gewaehlt === satz.antwort;

          // Alle Knöpfe sperren, Lösung markieren
          aktionEl.querySelectorAll('.rx-antwort').forEach((k) => {
            k.disabled = true;
            if (k.dataset.antwort === satz.antwort) k.classList.add('rx-antwort--richtig');
            else if (k === knopf) k.classList.add('rx-antwort--falsch');
          });
          werteAntwortAus(korrekt);
        }, { once: true });
      });
    }
  }

  function zeigeNachricht(text, weiter, knopfText = 'Weiter ➜') {
    aktionEl.innerHTML = `
      <div class="rx-panel">
        <p class="rx-nachricht">${text}</p>
        <button type="button" class="knopf" data-weiter>${knopfText}</button>
      </div>
    `;
    aktionEl.querySelector('[data-weiter]').addEventListener('click', weiter, { once: true });
  }

  function scrolleZuFeld(i) {
    brettEl.querySelector(`[data-i="${i}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // =====================================================================
  // Spielende → universeller Endscreen der Plattform
  // =====================================================================
  function ende(sieger) {
    aufraeumen();

    if (spieler.length === 1) {
      const s = spieler[0];
      const gesamt = s.richtig + s.falsch;
      const quote = gesamt ? Math.round((s.richtig / gesamt) * 100) : 0;
      const titel = quote >= 90 ? 'Fantastisch!' : quote >= 70 ? 'Stark gefahren!' : quote >= 50 ? 'Gut gemacht!' : 'Dranbleiben!';
      context.showEndScreen({
        titel,
        untertitel: `Du hast das Ziel erreicht – ${quote} % richtig!`,
        ergebnisse: [{
          name: 'Richtige Antworten',
          wert: `${s.richtig} / ${gesamt}`,
          sieger: quote >= 70,
        }],
        onRestart: zeigeModusWahl,
      });
      return;
    }

    const rangliste = [...spieler].sort((a, b) =>
      Number(b.fertig) - Number(a.fertig) || b.pos - a.pos || b.richtig - a.richtig);

    context.showEndScreen({
      titel: '🏁 Zieleinlauf!',
      untertitel: `${sieger.name} gewinnt das Rennen!`,
      ergebnisse: rangliste.map((s) => ({
        name: s.name,
        farbe: s.farbe,
        wert: s.fertig ? 'Ziel 🏁' : `Feld ${s.pos}`,
        detail: `${s.richtig} richtig · ${s.falsch} falsch`,
        sieger: s.fertig,
      })),
      onRestart: zeigeModusWahl,
    });
  }

  // ---- Hilfsfunktionen -------------------------------------------------

  /** Antwortmöglichkeiten zufällig mischen (Fisher-Yates). */
  function mische(liste) {
    const a = [...liste];
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Hardcore-Vergleich: verzeiht Groß-/Kleinschreibung, Leerzeichen & „eachother". */
  function istKorrekt(eingabe, satz) {
    const soll = [satz.antwort, ...(satz.akzeptiert ?? [])].map(normalisiere);
    return soll.includes(normalisiere(eingabe));
  }

  function normalisiere(text) {
    return text
      .toLowerCase()
      .replace(/[''`´]/g, "'")
      .replace(/eachother/g, 'each other')
      .replace(/[.!?,]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function entprellt(fn, ms) {
    let id = null;
    return () => {
      clearTimeout(id);
      id = setTimeout(fn, ms);
    };
  }

  // Start!
  zeigeModusWahl();
  return aufraeumen;
}
