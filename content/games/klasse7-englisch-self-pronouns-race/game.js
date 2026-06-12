/**
 * Self-Pronouns Race – Brettspiel zu englischen Reflexivpronomen.
 *
 * Modi:
 *   Solo:  Man rückt immer genau ein Feld vor (richtig oder falsch),
 *          Spezialfelder wirken, am Ende zählt die Trefferquote.
 *   Multi: 2–4 Spieler würfeln reihum. Wer richtig antwortet, erobert
 *          das Feld. Besetzte Felder werden übersprungen (nächstes
 *          freies Feld). Ende, wenn alle im Ziel sind.
 */
import { PRONOMEN, FELDER, ZIEL_INDEX } from './data.js';

const SPIELER_FARBEN = ['#FF6B57', '#3FA7E0', '#2EC4A6', '#C76FCB'];
const WUERFEL_AUGEN = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

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
  let modus = 'solo';            // 'solo' | 'multi'
  let hardcore = false;          // true = Antwort frei eintippen statt auswählen
  let spieler = [];              // { name, farbe, pos, imZiel, richtig, falsch, aussetzen }
  let besitzer = new Map();      // Feld-Index -> Spieler-Index (nur Multi)
  let aktiverIdx = -1;
  let brettEl = null;
  let statusEl = null;
  let aktionEl = null;

  // =====================================================================
  // Bildschirm 1: Modus wählen
  // =====================================================================
  function zeigeModusWahl() {
    aufraeumen();
    container.innerHTML = `
      <div class="spr-intro">
        <h2 class="spr-titel">🏁 Self-Pronouns Race</h2>
        <p class="spr-untertitel">myself, yourself, himself … – wer kennt die Reflexivpronomen am besten?</p>
        <div class="spr-modi">
          <button type="button" class="spr-modus-karte" data-modus="solo">
            <span class="spr-modus-emoji">🧍</span>
            <span class="spr-modus-name">Allein üben</span>
            <span class="spr-modus-info">Feld für Feld bis ins Ziel – wie viele Sätze schaffst du?</span>
          </button>
          <button type="button" class="spr-modus-karte" data-modus="multi">
            <span class="spr-modus-emoji">👥</span>
            <span class="spr-modus-name">Gemeinsam spielen</span>
            <span class="spr-modus-info">2–4 Spieler würfeln und erobern Felder – wer holt die meisten?</span>
          </button>
        </div>
        <label class="spr-hardcore">
          <input type="checkbox" data-hardcore ${hardcore ? 'checked' : ''}>
          <span>🔥 <strong>Hardcore-Modus:</strong> Antwort selbst eintippen statt auswählen</span>
        </label>
        <div class="spr-regeln">
          <h3>📜 So geht's</h3>
          <ul>
            <li>Auf jedem Feld wartet ein Lückensatz – wähle das passende Reflexivpronomen.</li>
            <li>Ereignisfelder lassen dich springen (⏩ / ⏪) oder aussetzen (😞) – im Übungsmodus sind sie nur eine Schrecksekunde.</li>
            <li>Im Mehrspielermodus gewinnst du Felder mit richtigen Antworten. Besetzte Felder überspringst du.</li>
          </ul>
        </div>
      </div>
    `;
    container.querySelector('[data-hardcore]').addEventListener('change', (e) => {
      hardcore = e.target.checked;
    });
    container.querySelector('[data-modus="solo"]').addEventListener('click', () => {
      modus = 'solo';
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
      <div class="spr-intro">
        <h2 class="spr-titel">👥 Wer spielt mit?</h2>
        <div class="spr-anzahl" role="group" aria-label="Spieleranzahl">
          ${[2, 3, 4].map((n) => `
            <button type="button" class="spr-anzahl-knopf ${n === 2 ? 'spr-anzahl-knopf--aktiv' : ''}" data-anzahl="${n}">${n}</button>
          `).join('')}
          <span class="spr-anzahl-label">Spieler</span>
        </div>
        <div class="spr-namen"></div>
        <button type="button" class="knopf knopf--koralle knopf--gross knopf--block" data-start>🎲 Los geht's!</button>
        <button type="button" class="spr-zurueck-link" data-zurueck>‹ Zurück zur Modus-Auswahl</button>
      </div>
    `;

    const namenEl = container.querySelector('.spr-namen');

    function zeigeNamensfelder() {
      namenEl.innerHTML = Array.from({ length: anzahl }, (_, i) => `
        <label class="spr-name-feld">
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
          k.classList.toggle('spr-anzahl-knopf--aktiv', k === knopf));
        zeigeNamensfelder();
      });
    });

    container.querySelector('[data-start]').addEventListener('click', () => {
      modus = 'multi';
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
      ...t, pos: 0, imZiel: false, richtig: 0, falsch: 0, aussetzen: false,
    }));
    besitzer = new Map();
    aktiverIdx = -1;

    container.innerHTML = `
      <div class="spr-spiel">
        <div class="spr-status"></div>
        <div class="spr-brett" role="img" aria-label="Spielbrett"></div>
        <div class="spr-aktion"></div>
      </div>
    `;
    statusEl = container.querySelector('.spr-status');
    brettEl = container.querySelector('.spr-brett');
    aktionEl = container.querySelector('.spr-aktion');

    bauBrett();
    resizeHoerer = entprellt(platziereFelder, 150);
    window.addEventListener('resize', resizeHoerer);
    aktualisiereBrett();
    aktualisiereStatus();

    if (modus === 'solo') {
      zeigeNachricht('Bereit? Rück ein Feld vor und beantworte den Satz!', soloZug, '🚀 Los geht\'s!');
    } else {
      naechsterZug();
    }
  }

  function bauBrett() {
    brettEl.innerHTML = FELDER.map((feld, i) => {
      if (feld.typ === 'start') {
        return `<div class="spr-feld spr-feld--start" data-i="${i}">
          <span class="spr-feld-emoji">🚩</span><span class="spr-feld-label">START</span>
          <div class="spr-tokens"></div></div>`;
      }
      if (feld.typ === 'ziel') {
        return `<div class="spr-feld spr-feld--ziel" data-i="${i}">
          <span class="spr-feld-emoji">🏆</span><span class="spr-feld-label">ZIEL</span>
          <div class="spr-tokens"></div></div>`;
      }
      if (feld.typ === 'spezial') {
        return `<div class="spr-feld spr-feld--spezial" data-i="${i}">
          <span class="spr-feld-emoji">${feld.emoji}</span>
          <span class="spr-feld-label">${feld.label}</span>
          <div class="spr-tokens"></div></div>`;
      }
      return `<div class="spr-feld spr-feld--frage" data-i="${i}">
        <span class="spr-feld-nr">${feld.nr}</span>
        <span class="spr-feld-emoji">${feld.emoji}</span>
        <div class="spr-tokens"></div></div>`;
    }).join('');
    platziereFelder();
  }

  /** Felder in Schlangenform im Raster platzieren (mobile 4, breiter 6 Spalten). */
  function platziereFelder() {
    if (!brettEl || !brettEl.isConnected) return;
    const spalten = brettEl.clientWidth >= 540 ? 6 : 4;
    brettEl.style.gridTemplateColumns = `repeat(${spalten}, 1fr)`;
    brettEl.querySelectorAll('.spr-feld').forEach((el, i) => {
      const reihe = Math.floor(i / spalten);
      let spalte = i % spalten;
      if (reihe % 2 === 1) spalte = spalten - 1 - spalte;
      el.style.gridRow = String(reihe + 1);
      el.style.gridColumn = String(spalte + 1);
    });
  }

  function aktualisiereBrett() {
    brettEl.querySelectorAll('.spr-feld').forEach((el) => {
      const i = Number(el.dataset.i);

      // Eroberte Felder einfärben (Multi)
      const besitzerIdx = besitzer.get(i);
      if (besitzerIdx !== undefined) {
        const farbe = spieler[besitzerIdx].farbe;
        el.classList.add('spr-feld--besetzt');
        el.style.setProperty('--besitzer-farbe', farbe);
      }

      // Spielfiguren
      const hier = spieler.filter((s) => s.pos === i);
      el.querySelector('.spr-tokens').innerHTML = hier.map((s) => `
        <span class="spr-token" style="background:${s.farbe}" title="${s.name}">${[...s.name][0].toUpperCase()}</span>
      `).join('');

      // Aktives Feld hervorheben
      const aktiv = aktiverIdx >= 0 && spieler[aktiverIdx] && spieler[aktiverIdx].pos === i && !spieler[aktiverIdx].imZiel;
      el.classList.toggle('spr-feld--aktiv', aktiv);
    });
  }

  function aktualisiereStatus() {
    if (modus === 'solo') {
      const s = spieler[0];
      statusEl.innerHTML = `
        <span class="spr-chip">📍 Feld ${s.pos} / ${ZIEL_INDEX}</span>
        <span class="spr-chip spr-chip--gruen">✅ ${s.richtig} richtig</span>
        <span class="spr-chip spr-chip--rot">❌ ${s.falsch} falsch</span>
      `;
    } else {
      statusEl.innerHTML = spieler.map((s, i) => `
        <span class="spr-chip spr-spieler-chip ${i === aktiverIdx ? 'spr-spieler-chip--aktiv' : ''}">
          <span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span>
          ${s.name} ${s.imZiel ? '🏆' : ''} · ${[...besitzer.values()].filter((b) => b === i).length} 🚩
        </span>
      `).join('');
    }
  }

  // =====================================================================
  // Spielablauf
  // =====================================================================

  /** Solo: immer genau ein Feld vor. */
  function soloZug() {
    const s = spieler[0];
    if (s.pos >= ZIEL_INDEX) return ende();
    bewege(s, s.pos + 1);
  }

  /** Multi: nächsten Spieler bestimmen (überspringt Spieler im Ziel). */
  function naechsterZug() {
    if (spieler.every((s) => s.imZiel)) return ende();
    do {
      aktiverIdx = (aktiverIdx + 1) % spieler.length;
    } while (spieler[aktiverIdx].imZiel);
    const s = spieler[aktiverIdx];
    aktualisiereStatus();
    aktualisiereBrett();

    if (s.aussetzen) {
      s.aussetzen = false;
      zeigeNachricht(`😞 ${s.name} muss diese Runde aussetzen.`, naechsterZug);
      return;
    }
    zeigeWuerfeln(s);
  }

  function zeigeWuerfeln(s) {
    aktionEl.innerHTML = `
      <div class="spr-panel">
        <p class="spr-zug-info"><span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span> <strong>${s.name}</strong> ist dran!</p>
        <button type="button" class="spr-wuerfel" aria-label="Würfeln">🎲</button>
        <p class="spr-hinweis">Tippe auf den Würfel</p>
      </div>
    `;
    const wuerfelKnopf = aktionEl.querySelector('.spr-wuerfel');
    wuerfelKnopf.addEventListener('click', () => {
      wuerfelKnopf.disabled = true;
      wuerfelKnopf.classList.add('spr-wuerfel--rollt');
      const wurf = 1 + Math.floor(Math.random() * 6);
      let schritte = 0;
      const rolle = setInterval(() => {
        wuerfelKnopf.textContent = WUERFEL_AUGEN[Math.floor(Math.random() * 6)];
        if (++schritte >= 10) {
          clearInterval(rolle);
          timer.delete(rolle);
          wuerfelKnopf.textContent = WUERFEL_AUGEN[wurf - 1];
          wuerfelKnopf.classList.remove('spr-wuerfel--rollt');
          aktionEl.querySelector('.spr-hinweis').textContent = `${s.name} würfelt eine ${wurf}!`;
          spaeter(() => bewege(s, s.pos + wurf), 800);
        }
      }, 90);
      timer.add(rolle);
    }, { once: true });
  }

  /** Figur bewegen (vor oder zurück), dann das Landefeld auswerten. */
  function bewege(s, zielPos) {
    s.pos = Math.max(1, Math.min(zielPos, ZIEL_INDEX));
    aktualisiereBrett();
    aktualisiereStatus();
    scrolleZuFeld(s.pos);
    spaeter(() => lande(s), 500);
  }

  /** Auswertung des Felds, auf dem die Figur gelandet ist. */
  function lande(s) {
    const i = s.pos;
    const feld = FELDER[i];

    if (feld.typ === 'ziel') {
      s.imZiel = true;
      aktualisiereBrett();
      aktualisiereStatus();
      if (modus === 'solo') return ende();
      zeigeNachricht(`🎉 ${s.name} hat das Ziel erreicht!`, naechsterZug);
      return;
    }

    if (feld.typ === 'spezial') {
      if (modus === 'solo') {
        // Beim Üben sind Ereignisfelder nur eine Schrecksekunde: Würde
        // „zurück" wirken, käme man Feld für Feld nie am Feld vorbei
        // (Endlosschleife) – und „vor" würde Fragen überspringen.
        zeigeNachricht(`${feld.emoji} ${feld.label} Zum Glück übst du nur – es geht normal weiter.`, soloZug);
      } else if (feld.effekt === 'aussetzen') {
        s.aussetzen = true;
        zeigeNachricht(`${feld.emoji} ${s.name} landet auf „Aussetzen" und pausiert nächste Runde.`, naechsterZug);
      } else {
        const richtung = feld.effekt > 0 ? 'vor' : 'zurück';
        zeigeNachricht(`${feld.emoji} ${feld.label} ${s.name} springt ${Math.abs(feld.effekt)} Felder ${richtung}.`,
          () => bewege(s, i + feld.effekt), 'Hüpf! ➜');
      }
      return;
    }

    // Frage-Feld
    if (modus === 'multi' && besitzer.has(i)) {
      // Nächstes freies Feld suchen (Spezialfelder gelten als frei)
      let p = i;
      while (p < ZIEL_INDEX && FELDER[p].typ === 'frage' && besitzer.has(p)) p += 1;
      const wessen = spieler[besitzer.get(i)].name;
      zeigeNachricht(`🚩 Dieses Feld gehört schon ${wessen} – ${s.name} rückt zum nächsten freien Feld vor!`,
        () => bewege(s, p), 'Weiterrücken ➜');
      return;
    }

    zeigeFrage(s, i);
  }

  function zeigeFrage(s, feldIndex) {
    const feld = FELDER[feldIndex];
    const satzHtml = feld.satz.replace('___', '<span class="spr-luecke">______</span>');

    const antwortBereich = hardcore
      ? `
        <form class="spr-eingabe" autocomplete="off">
          <input type="text" class="spr-eingabe-feld" lang="en" autocapitalize="none"
                 autocorrect="off" spellcheck="false" enterkeyhint="done"
                 placeholder="Antwort eintippen …" aria-label="Antwort">
          <button type="submit" class="knopf knopf--koralle">Prüfen</button>
        </form>`
      : `
        <div class="spr-antworten">
          ${PRONOMEN.map((p) => `<button type="button" class="spr-antwort" data-antwort="${p}" lang="en">${p}</button>`).join('')}
        </div>`;

    aktionEl.innerHTML = `
      <div class="spr-panel">
        <p class="spr-zug-info">
          <span class="spieler-punkt" style="--punkt-farbe:${s.farbe}"></span>
          <strong>${s.name}</strong> · Feld ${feld.nr} ${feld.emoji}
        </p>
        <p class="spr-satz" lang="en">${satzHtml}</p>
        ${antwortBereich}
        <div class="spr-feedback" aria-live="polite"></div>
      </div>
    `;

    const feedbackEl = aktionEl.querySelector('.spr-feedback');

    // Gemeinsame Auswertung für beide Antwortarten (Knöpfe & Freitext).
    function werteAntwortAus(korrekt) {
      aktionEl.querySelector('.spr-luecke').textContent = feld.antwort;

      if (korrekt) {
        s.richtig += 1;
        if (modus === 'multi') {
          besitzer.set(feldIndex, spieler.indexOf(s));
          aktualisiereBrett();
        }
      } else {
        s.falsch += 1;
      }
      aktualisiereStatus();

      feedbackEl.innerHTML = `
        <p class="spr-feedback-text ${korrekt ? 'spr-feedback-text--gruen' : 'spr-feedback-text--rot'}">
          ${korrekt
            ? `✅ Richtig!${modus === 'multi' ? ' Das Feld gehört jetzt dir!' : ''}`
            : `❌ Leider falsch – richtig ist „${feld.antwort}".`}
        </p>
        <button type="button" class="knopf knopf--minze" data-weiter>Weiter ➜</button>
      `;
      feedbackEl.querySelector('[data-weiter]').addEventListener('click', () => {
        if (modus === 'solo') soloZug();
        else naechsterZug();
      }, { once: true });
    }

    if (hardcore) {
      const form = aktionEl.querySelector('.spr-eingabe');
      const input = form.querySelector('.spr-eingabe-feld');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const eingabe = input.value.trim();
        if (!eingabe) return; // leere Eingabe ignorieren

        const korrekt = eingabe.toLowerCase() === feld.antwort.toLowerCase();
        input.disabled = true;
        form.querySelector('button').disabled = true;
        input.classList.add(korrekt ? 'spr-eingabe-feld--richtig' : 'spr-eingabe-feld--falsch');
        werteAntwortAus(korrekt);
      });
      input.focus();
    } else {
      aktionEl.querySelectorAll('.spr-antwort').forEach((knopf) => {
        knopf.addEventListener('click', () => {
          const gewaehlt = knopf.dataset.antwort;
          const korrekt = gewaehlt === feld.antwort;

          // Alle Knöpfe sperren, Lösung markieren
          aktionEl.querySelectorAll('.spr-antwort').forEach((k) => {
            k.disabled = true;
            if (k.dataset.antwort === feld.antwort) k.classList.add('spr-antwort--richtig');
            else if (k === knopf) k.classList.add('spr-antwort--falsch');
          });
          werteAntwortAus(korrekt);
        }, { once: true });
      });
    }
  }

  function zeigeNachricht(text, weiter, knopfText = 'Weiter ➜') {
    aktionEl.innerHTML = `
      <div class="spr-panel">
        <p class="spr-nachricht">${text}</p>
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
  function ende() {
    aufraeumen();

    if (modus === 'solo') {
      const s = spieler[0];
      const gesamt = s.richtig + s.falsch;
      const quote = gesamt ? Math.round((s.richtig / gesamt) * 100) : 0;
      const titel = quote >= 90 ? 'Fantastisch!' : quote >= 70 ? 'Stark gespielt!' : quote >= 50 ? 'Gut gemacht!' : 'Dranbleiben!';
      context.showEndScreen({
        titel: `${titel}`,
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

    const rangliste = [...spieler]
      .map((s, i) => ({ ...s, felder: [...besitzer.values()].filter((b) => b === i).length }))
      .sort((a, b) => b.felder - a.felder || b.richtig - a.richtig);
    const beste = rangliste[0].felder;

    context.showEndScreen({
      titel: 'Zieleinlauf!',
      untertitel: `${rangliste.filter((s) => s.felder === beste).map((s) => s.name).join(' & ')} gewinnt mit ${beste} ${beste === 1 ? 'Feld' : 'Feldern'}!`,
      ergebnisse: rangliste.map((s) => ({
        name: s.name,
        farbe: s.farbe,
        wert: `${s.felder} 🚩`,
        detail: `${s.richtig} richtig · ${s.falsch} falsch`,
        sieger: s.felder === beste,
      })),
      onRestart: zeigeModusWahl,
    });
  }

  // ---- Hilfsfunktionen -------------------------------------------------
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
