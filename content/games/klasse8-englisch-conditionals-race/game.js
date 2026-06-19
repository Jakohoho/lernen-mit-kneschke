/**
 * Conditionals Race – Brettspiel zu englischen If-Sätzen (Typ 1, 2 & 3).
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
const FRAGE_EMOJIS = ['✏️', '💬', '🧩', '⭐', '🔤', '📝', '💡', '🎯'];
const TYP_NAME = { 1: 'Conditional 1', 2: 'Conditional 2', 3: 'Conditional 3' };

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
    // Höchstens ein paar Versuche, eine Wiederholung zu vermeiden – nie endlos
    // (falls der Zufall mehrmals hintereinander denselben Index liefern sollte).
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
      <div class="cr-intro">
        <h2 class="cr-titel">🏎️ Conditionals Race</h2>
        <p class="cr-untertitel">If-Sätze Typ 1, 2 & 3 – setze die Verben richtig ein und rase als Erste:r ins Ziel!</p>
        <div class="cr-modi">
          <button type="button" class="cr-modus-karte" data-modus="solo">
            <span class="cr-modus-emoji">🧍</span>
            <span class="cr-modus-name">Allein üben</span>
            <span class="cr-modus-info">Würfle dich allein bis ins Ziel – schaffst du es ohne viele Patzer?</span>
          </button>
          <button type="button" class="cr-modus-karte" data-modus="multi">
            <span class="cr-modus-emoji">👥</span>
            <span class="cr-modus-name">Gegeneinander</span>
            <span class="cr-modus-info">2–4 Spieler würfeln um die Wette – wer ist zuerst im Ziel?</span>
          </button>
        </div>
        <label class="cr-hardcore">
          <input type="checkbox" data-hardcore ${hardcore ? 'checked' : ''}>
          <span>🔥 <strong>Hardcore-Modus:</strong> Antwort selbst eintippen statt auswählen</span>
        </label>
        <div class="cr-auffrischung">
          <h3>📚 Kurz aufgefrischt</h3>
          <p class="cr-auffrischung-thema">If-Sätze (Conditionals): drei Typen – je nachdem, wie wahrscheinlich die Bedingung ist.</p>
          <ul>
            <li><strong>Typ 1 – real / möglich:</strong> <em>if</em> + present simple, Hauptsatz mit <em>will</em>: If it rains, we <em>will stay</em> home.</li>
            <li><strong>Typ 2 – unwahrscheinlich (Gegenwart):</strong> <em>if</em> + past simple, Hauptsatz mit <em>would</em>: If I <em>had</em> time, I <em>would help</em> you.</li>
            <li><strong>Typ 3 – Vergangenheit (nicht mehr änderbar):</strong> <em>if</em> + past perfect, Hauptsatz mit <em>would have</em> + past participle: If we <em>had left</em> earlier, we <em>would have caught</em> the train.</li>
            <li>Im <em>if</em>-Satz selbst steht nie <em>will</em> oder <em>would</em> – nur im Hauptsatz.</li>
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
      <div class="cr-intro">
        <h2 class="cr-titel">👥 Wer fährt mit?</h2>
        <div class="cr-anzahl" role="group" aria-label="Spieleranzahl">
          ${[2, 3, 4].map((n) => `
            <button type="button" class="cr-anzahl-knopf ${n === 2 ? 'cr-anzahl-knopf--aktiv' : ''}" data-anzahl="${n}">${n}</button>
          `).join('')}
          <span class="cr-anzahl-label">Spieler</span>
        </div>
        <div class="cr-namen"></div>
        <button type="button" class="knopf knopf--koralle knopf--gross knopf--block" data-start>🎲 Los geht's!</button>
        <button type="button" class="cr-zurueck-link" data-zurueck>‹ Zurück zur Modus-Auswahl</button>
      </div>
    `;

    const namenEl = container.querySelector('.cr-namen');

    function zeigeNamensfelder() {
      namenEl.innerHTML = Array.from({ length: anzahl }, (_, i) => `
        <label class="cr-name-feld">
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
          k.classList.toggle('cr-anzahl-knopf--aktiv', k === knopf));
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
      <div class="cr-spiel">
        <div class="cr-status"></div>
        <div class="cr-brett" role="img" aria-label="Spielbrett"></div>
        <div class="cr-aktion"></div>
      </div>
    `;
    statusEl = container.querySelector('.cr-status');
    brettEl = container.querySelector('.cr-brett');
    aktionEl = container.querySelector('.cr-aktion');

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
        return `<div class="cr-feld cr-feld--start" data-i="${i}">
          <span class="cr-feld-emoji">🚩</span><span class="cr-feld-label">START</span>
          <div class="cr-tokens"></div></div>`;
      }
      if (feld.typ === 'ziel') {
        return `<div class="cr-feld cr-feld--ziel" data-i="${i}">
          <span class="cr-feld-emoji">🏁</span><span class="cr-feld-label">ZIEL</span>
          <div class="cr-tokens"></div></div>`;
      }
      if (feld.typ === 'spezial') {
        return `<div class="cr-feld cr-feld--spezial" data-i="${i}">
          <span class="cr-feld-emoji">${feld.emoji}</span>
          <span class="cr-feld-label">${feld.label}</span>
          <div class="cr-tokens"></div></div>`;
      }
      frageNr += 1;
      const emoji = FRAGE_EMOJIS[frageNr % FRAGE_EMOJIS.length];
      return `<div class="cr-feld cr-feld--frage" data-i="${i}">
        <span class="cr-feld-nr">${i}</span>
        <span class="cr-feld-emoji">${emoji}</span>
        <div class="cr-tokens"></div></div>`;
    }).join('');
    platziereFelder();
  }

  /** Felder in Schlangenform im Raster platzieren (mobil 4, breiter 6 Spalten). */
  function platziereFelder() {
    if (!brettEl || !brettEl.isConnected) return;
    const spalten = brettEl.clientWidth >= 540 ? 6 : 4;
    brettEl.style.gridTemplateColumns = `repeat(${spalten}, 1fr)`;
    brettEl.querySelectorAll('.cr-feld').forEach((el, i) => {
      const reihe = Math.floor(i / spalten);
      let spalte = i % spalten;
      if (reihe % 2 === 1) spalte = spalten - 1 - spalte;
      el.style.gridRow = String(reihe + 1);
      el.style.gridColumn = String(spalte + 1);
    });
  }

  function aktualisiereBrett() {
    brettEl.querySelectorAll('.cr-feld').forEach((el) => {
      const i = Number(el.dataset.i);

      // Spielfiguren auf diesem Feld
      const hier = spieler.filter((s) => s.pos === i);
      el.querySelector('.cr-tokens').innerHTML = hier.map((s) => `
        <span class="cr-token" style="background:${s.farbe}" title="${s.name}">${[...s.name][0].toUpperCase()}</span>
      `).join('');

      // Aktives Feld hervorheben
      const aktiv = aktiverIdx >= 0 && spieler[aktiverIdx] && spieler[aktiverIdx].pos === i && !spieler[aktiverIdx].fertig;
      el.classList.toggle('cr-feld--aktiv', aktiv);
    });
  }

  function aktualisiereStatus() {
    if (spieler.length === 1) {
      const s = spieler[0];
      statusEl.innerHTML = `
        <span class="cr-chip">📍 Feld ${s.pos} / ${ZIEL_INDEX}</span>
        <span class="cr-chip cr-chip--gruen">✅ ${s.richtig} richtig</span>
        <span class="cr-chip cr-chip--rot">❌ ${s.falsch} falsch</span>
      `;
    } else {
      statusEl.innerHTML = spieler.map((s, i) => `
        <span class="cr-chip cr-spieler-chip ${i === aktiverIdx ? 'cr-spieler-chip--aktiv' : ''}">
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
        // Allein üben: Aussetzen hat keine echte Wirkung – kurz Bescheid geben.
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
      <div class="cr-panel">
        <p class="cr-zug-info"><span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span> <strong>${s.name}</strong> ist dran!</p>
        <button type="button" class="cr-wuerfel" aria-label="Würfeln">🎲</button>
        <p class="cr-hinweis">Tippe auf den Würfel</p>
      </div>
    `;
    const wuerfelKnopf = aktionEl.querySelector('.cr-wuerfel');
    wuerfelKnopf.addEventListener('click', () => {
      wuerfelKnopf.disabled = true;
      wuerfelKnopf.classList.add('cr-wuerfel--rollt');
      const wurf = 1 + Math.floor(Math.random() * 6);
      let schritte = 0;
      const rolle = setInterval(() => {
        wuerfelKnopf.textContent = WUERFEL_AUGEN[Math.floor(Math.random() * 6)];
        if (++schritte >= 10) {
          clearInterval(rolle);
          timer.delete(rolle);
          wuerfelKnopf.textContent = WUERFEL_AUGEN[wurf - 1];
          wuerfelKnopf.classList.remove('cr-wuerfel--rollt');
          aktionEl.querySelector('.cr-hinweis').textContent = `${s.name} würfelt eine ${wurf}!`;
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
    const satzHtml = satz.satz.replace('___', '<span class="cr-luecke">______</span>');

    const optionen = mische(satz.optionen);
    const antwortBereich = hardcore
      ? `
        <form class="cr-eingabe" autocomplete="off">
          <input type="text" class="cr-eingabe-feld" lang="en" autocapitalize="none"
                 autocorrect="off" spellcheck="false" enterkeyhint="done"
                 placeholder="Verbform eintippen …" aria-label="Antwort">
          <button type="submit" class="knopf knopf--koralle">Prüfen</button>
        </form>`
      : `
        <div class="cr-antworten">
          ${optionen.map((o) => `<button type="button" class="cr-antwort" data-antwort="${o.replaceAll('"', '&quot;')}" lang="en">${o}</button>`).join('')}
        </div>`;

    aktionEl.innerHTML = `
      <div class="cr-panel">
        <p class="cr-zug-info">
          <span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span>
          <strong>${s.name}</strong> · Feld ${s.pos}
        </p>
        <p class="cr-satz" lang="en">${satzHtml}</p>
        ${antwortBereich}
        <div class="cr-feedback" aria-live="polite"></div>
      </div>
    `;

    const feedbackEl = aktionEl.querySelector('.cr-feedback');

    // Gemeinsame Auswertung für beide Antwortarten (Knöpfe & Freitext).
    function werteAntwortAus(korrekt) {
      aktionEl.querySelector('.cr-luecke').textContent = satz.antwort;

      if (korrekt) s.richtig += 1;
      else s.falsch += 1;
      aktualisiereStatus();

      const zurueck = s.zugStart;
      feedbackEl.innerHTML = `
        <p class="cr-feedback-text ${korrekt ? 'cr-feedback-text--gruen' : 'cr-feedback-text--rot'}">
          ${korrekt
            ? `✅ Richtig! <span class="cr-typ">${TYP_NAME[satz.typ]}</span>`
            : `❌ Leider falsch – richtig ist „${satz.antwort}". <span class="cr-typ">${TYP_NAME[satz.typ]}</span>`}
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
      const form = aktionEl.querySelector('.cr-eingabe');
      const input = form.querySelector('.cr-eingabe-feld');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const eingabe = input.value.trim();
        if (!eingabe) return; // leere Eingabe ignorieren

        const korrekt = istKorrekt(eingabe, satz);
        input.disabled = true;
        form.querySelector('button').disabled = true;
        input.classList.add(korrekt ? 'cr-eingabe-feld--richtig' : 'cr-eingabe-feld--falsch');
        werteAntwortAus(korrekt);
      });
      input.focus();
    } else {
      aktionEl.querySelectorAll('.cr-antwort').forEach((knopf) => {
        knopf.addEventListener('click', () => {
          const gewaehlt = knopf.dataset.antwort;
          const korrekt = gewaehlt === satz.antwort;

          // Alle Knöpfe sperren, Lösung markieren
          aktionEl.querySelectorAll('.cr-antwort').forEach((k) => {
            k.disabled = true;
            if (k.dataset.antwort === satz.antwort) k.classList.add('cr-antwort--richtig');
            else if (k === knopf) k.classList.add('cr-antwort--falsch');
          });
          werteAntwortAus(korrekt);
        }, { once: true });
      });
    }
  }

  function zeigeNachricht(text, weiter, knopfText = 'Weiter ➜') {
    aktionEl.innerHTML = `
      <div class="cr-panel">
        <p class="cr-nachricht">${text}</p>
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

  /** Hardcore-Vergleich: verzeiht Groß-/Kleinschreibung, Kontraktionen & BE/AE-Schreibweisen. */
  function istKorrekt(eingabe, satz) {
    const soll = [satz.antwort, ...(satz.akzeptiert ?? [])].map(normalisiere);
    return soll.includes(normalisiere(eingabe));
  }

  function normalisiere(text) {
    return text
      .toLowerCase()
      .replace(/[''`´]/g, "'")
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\bwouldn't\b/g, 'would not')
      .replace(/\bhadn't\b/g, 'had not')
      .replace(/\bhasn't\b/g, 'has not')
      .replace(/\bhaven't\b/g, 'have not')
      .replace(/\bdidn't\b/g, 'did not')
      .replace(/\bdoesn't\b/g, 'does not')
      .replace(/\bdon't\b/g, 'do not')
      .replace(/\bwould've\b/g, 'would have')
      .replace(/\bcould've\b/g, 'could have')
      .replace(/practice/g, 'practise')
      .replace(/gotten/g, 'got')
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
