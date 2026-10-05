/**
 * Kartenansicht der Europa Länderrallye: stumme SVG-Karte (nur Küsten,
 * Grenzen und Hauptstadt-Punkte) mit Bedienung wie bei Kartenapps:
 *   ein Finger / Maus ziehen  → verschieben
 *   zwei Finger / Mausrad     → vergrößern und verkleinern
 *   kurz tippen               → Land auswählen
 *
 * Während einer Geste wird nur das fertige Bild per CSS verschoben/skaliert
 * (flüssig auch auf älteren Handys); erst beim Loslassen wird die Karte
 * im neuen Ausschnitt neu gezeichnet.
 */
import { KARTE } from './karte.js';

const NS = 'http://www.w3.org/2000/svg';
const ZUSTAENDE = ['ist-tipp', 'ist-erledigt', 'ist-verpasst', 'ist-auswahl', 'ist-richtig', 'ist-neutral',
  'ist-falsch', 'ist-gesucht', 'ist-loesung'];
const TIPP_TOLERANZ = 8;   // px Bewegung, bis aus einem Tippen ein Verschieben wird
const MIN_BREITE = 70;     // stärkste Vergrößerung: 70 Karteneinheiten ≈ 350 km

/**
 * @param {HTMLElement} el      leeres Element, in das die Karte gezeichnet wird
 * @param {{ codes: string[], onTipp: (id: string|null, art: 'land'|'grau'|'meer') => void }} optionen
 */
export function erzeugeKarte(el, { codes, onTipp }) {
  const { breite: W, hoehe: H } = KARTE;
  el.classList.add('elr-karte');
  el.innerHTML = `
    <svg xmlns="${NS}" role="img" aria-label="Karte von Europa">
      <rect class="elr-meer" x="${-W}" y="${-H}" width="${3 * W}" height="${3 * H}"/>
      <path class="elr-grau" d="${KARTE.hintergrund}"/>
      <g class="elr-laender">${codes.map((id) => `<path class="elr-land" data-id="${id}" d="${KARTE.laender[id]}"/>`).join('')}</g>
      <g class="elr-punkte">${codes.map((id) => {
        const [x, y] = KARTE.hauptstaedte[id];
        return `<circle class="elr-hauptstadt" data-hs="${id}" cx="${x}" cy="${y}" r="2"/>`;
      }).join('')}</g>
      <g class="elr-kreise">${Object.entries(KARTE.kreise).filter(([id]) => codes.includes(id)).map(([id, [x, y]]) =>
        `<circle class="elr-kreis" data-id="${id}" cx="${x}" cy="${y}" r="10"/>`).join('')}</g>
      <g class="elr-effekte"></g>
    </svg>
    <div class="elr-kartenfrage" aria-live="polite"></div>
    <button type="button" class="elr-europa-knopf" aria-label="Ganz Europa zeigen">🌍 Europa</button>
  `;
  const svg = el.querySelector('svg');
  const effekte = el.querySelector('.elr-effekte');
  const frageEl = el.querySelector('.elr-kartenfrage');

  // ---- Ausschnitt (viewBox) ---------------------------------------------
  let vb = { x: 0, y: 0, w: W, h: H };
  let massstab = 1;          // Karteneinheiten pro Bildschirmpixel
  let animation = 0;

  function seitenverhaeltnis() {
    const r = svg.getBoundingClientRect();
    return r.width && r.height ? r.height / r.width : H / W;
  }

  function begrenze(v) {
    const a = seitenverhaeltnis();
    const maxBreite = Math.max(W, H / a);
    const w = Math.min(maxBreite, Math.max(MIN_BREITE, v.w));
    const h = w * a;
    // Der Ausschnitt bleibt innerhalb der Karte – nur wenn er größer ist als die Karte, wird er mittig gesetzt
    let cx = v.x + v.w / 2;
    let cy = v.y + (v.h ?? v.w * a) / 2;
    cx = w <= W ? Math.min(W - w / 2, Math.max(w / 2, cx)) : W / 2;
    cy = h <= H ? Math.min(H - h / 2, Math.max(h / 2, cy)) : H / 2;
    return { x: cx - w / 2, y: cy - h / 2, w, h };
  }

  function setze(v) {
    const neu = begrenze(v);
    if (![neu.x, neu.y, neu.w, neu.h].every(Number.isFinite)) return;   // Schutz vor ungültigen Werten
    vb = neu;
    svg.setAttribute('viewBox', `${vb.x.toFixed(2)} ${vb.y.toFixed(2)} ${vb.w.toFixed(2)} ${vb.h.toFixed(2)}`);
    const r = svg.getBoundingClientRect();
    massstab = r.width ? vb.w / r.width : 1;
    for (const c of svg.querySelectorAll('.elr-hauptstadt')) c.setAttribute('r', (2.6 * massstab).toFixed(2));
    for (const c of svg.querySelectorAll('.elr-kreis')) c.setAttribute('r', Math.min(12 * massstab, 12).toFixed(2));
    for (const c of effekte.querySelectorAll('[data-r]')) c.setAttribute('r', (c.dataset.r * massstab).toFixed(2));
  }

  /** Ausschnitt so wählen, dass das Rechteck r = [x, y, w, h] vollständig sichtbar ist. */
  function passend(r, rand = 1.15) {
    const a = seitenverhaeltnis();
    const w = Math.max(r[2] * rand, (r[3] * rand) / a);
    return { x: r[0] + r[2] / 2 - w / 2, y: r[1] + r[3] / 2 - (w * a) / 2, w, h: w * a };
  }

  function gleite(ziel, ms = 450) {
    cancelAnimationFrame(animation);
    const a = { ...vb };
    const b = begrenze(ziel);
    const t0 = performance.now();
    const schritt = (jetzt) => {
      const k = Math.min(1, (jetzt - t0) / ms);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setze({ x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e, w: a.w + (b.w - a.w) * e, h: a.h + (b.h - a.h) * e });
      if (k < 1) animation = requestAnimationFrame(schritt);
    };
    animation = requestAnimationFrame(schritt);
  }

  function rahmenVon(ids) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const id of ids) {
      const b = svg.querySelector(`.elr-land[data-id="${id}"]`).getBBox();
      x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height);
    }
    return [x0, y0, x1 - x0, y1 - y0];
  }

  // ---- Gesten -------------------------------------------------------------
  const zeiger = new Map();
  let geste = null;

  function bildschirmZuKarte(p, v = vb) {
    const r = svg.getBoundingClientRect();
    return { x: v.x + ((p.x - r.left) / r.width) * v.w, y: v.y + ((p.y - r.top) / r.height) * v.h };
  }

  function mitte() {
    const [a, b] = [...zeiger.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }
  function abstand() {
    const [a, b] = [...zeiger.values()];
    return Math.hypot(a.x - b.x, a.y - b.y) || 1;
  }

  function zeigeVerschiebung(dx, dy, s = 1, ursprung = { x: 0, y: 0 }) {
    svg.style.transformOrigin = `${ursprung.x}px ${ursprung.y}px`;
    svg.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
  }

  function beendeGeste() {
    if (!geste || geste.art === 'tipp') return;
    svg.style.transform = '';
    if (geste.ziel) setze(geste.ziel);
  }

  svg.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    cancelAnimationFrame(animation);
    zeiger.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { svg.setPointerCapture(e.pointerId); } catch { /* ältere Browser */ }
    if (zeiger.size === 1) {
      geste = { art: 'tipp', start: { x: e.clientX, y: e.clientY }, vb0: { ...vb } };
    } else if (zeiger.size === 2) {
      beendeGeste();
      const r = svg.getBoundingClientRect();
      const m = mitte();
      geste = { art: 'zoom', m0: m, d0: abstand(), vb0: { ...vb }, k0: bildschirmZuKarte(m), r0: r };
    }
  });

  svg.addEventListener('pointermove', (e) => {
    if (!zeiger.has(e.pointerId) || !geste) return;
    zeiger.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const r0 = geste.r0;
    if (geste.art === 'zoom' && zeiger.size === 2) {
      const m = mitte();
      const minS = geste.vb0.w / Math.max(W, H / seitenverhaeltnis());
      const maxS = geste.vb0.w / MIN_BREITE;
      const s = Math.min(maxS, Math.max(minS, abstand() / geste.d0));
      zeigeVerschiebung(m.x - geste.m0.x, m.y - geste.m0.y, s, { x: geste.m0.x - r0.left, y: geste.m0.y - r0.top });
      const w = geste.vb0.w / s;
      const h = geste.vb0.h / s;
      geste.ziel = {
        x: geste.k0.x - ((m.x - r0.left) / r0.width) * w,
        y: geste.k0.y - ((m.y - r0.top) / r0.height) * h,
        w, h,
      };
      return;
    }
    if (geste.art === 'tipp' && Math.hypot(e.clientX - geste.start.x, e.clientY - geste.start.y) > TIPP_TOLERANZ) {
      geste.art = 'schieben';
      geste.r0 = svg.getBoundingClientRect();
    }
    if (geste.art === 'schieben') {
      const dx = e.clientX - geste.start.x;
      const dy = e.clientY - geste.start.y;
      zeigeVerschiebung(dx, dy);
      const k = geste.vb0.w / geste.r0.width;
      geste.ziel = { ...geste.vb0, x: geste.vb0.x - dx * k, y: geste.vb0.y - dy * k };
    }
  });

  function zeigerEnde(e) {
    if (!zeiger.has(e.pointerId)) return;
    zeiger.delete(e.pointerId);
    if (geste?.art === 'tipp' && e.type === 'pointerup') {
      geste = null;
      werteTippAus(e.clientX, e.clientY);
      return;
    }
    if (zeiger.size === 1 && geste?.art === 'zoom') {
      // Ein Finger bleibt liegen → nahtlos weiter verschieben
      beendeGeste();
      const [p] = zeiger.values();
      geste = { art: 'schieben', start: p, vb0: { ...vb }, r0: svg.getBoundingClientRect() };
      return;
    }
    if (zeiger.size === 0) {
      beendeGeste();
      geste = null;
    }
  }
  svg.addEventListener('pointerup', zeigerEnde);
  svg.addEventListener('pointercancel', zeigerEnde);

  svg.addEventListener('wheel', (e) => {
    e.preventDefault();
    cancelAnimationFrame(animation);
    const f = e.deltaY > 0 ? 1.2 : 1 / 1.2;
    const p = { x: e.clientX, y: e.clientY };
    const k = bildschirmZuKarte(p);
    const r = svg.getBoundingClientRect();
    const w = vb.w * f;
    const h = vb.h * f;
    setze({ x: k.x - ((p.x - r.left) / r.width) * w, y: k.y - ((p.y - r.top) / r.height) * h, w, h });
  }, { passive: false });

  /** Tippen auswerten. Daneben (aufs Meer) getippt? Dann das nächste Land im Umkreis von 18 px nehmen. */
  function werteTippAus(x, y) {
    const treffer = (px, py) => document.elementFromPoint(px, py)?.closest?.('[data-id]');
    let el = treffer(x, y);
    const direkt = document.elementFromPoint(x, y);
    if (!el && direkt?.classList.contains('elr-meer')) {
      outer: for (const radius of [6, 12, 18]) {
        for (let i = 0; i < 12; i++) {
          const w = (i / 12) * Math.PI * 2;
          el = treffer(x + Math.cos(w) * radius, y + Math.sin(w) * radius);
          if (el) break outer;
        }
      }
    }
    if (el) onTipp(el.dataset.id, 'land');
    else onTipp(null, direkt?.classList.contains('elr-grau') ? 'grau' : 'meer');
  }

  el.querySelector('.elr-europa-knopf').addEventListener('click', () => gleite(passend(KARTE.europa, 1)));

  // Erst wenn die Karte eine Größe hat, die Standardansicht „Europa“ einpassen
  let eingepasst = false;
  const beobachter = new ResizeObserver(() => {
    if (!svg.getBoundingClientRect().width) return;
    if (!eingepasst) { eingepasst = true; setze(passend(KARTE.europa, 1)); } else setze(vb);
  });
  beobachter.observe(svg);

  // ---- Zustände ---------------------------------------------------------
  const teile = (id) => svg.querySelectorAll(`[data-id="${id}"]`);

  return {
    /** Zustand eines Landes setzen (z. B. 'ist-richtig') – null entfernt alle Zustände. */
    zustand(id, z) {
      for (const t of teile(id)) {
        t.classList.remove(...ZUSTAENDE);
        if (z) t.classList.add(z);
      }
    },
    plus(id, z) { for (const t of teile(id)) t.classList.add(z); },
    minus(id, z) { for (const t of teile(id)) t.classList.remove(z); },
    /** Eigene Füllfarbe (Regionen, Spielerfarben) – null setzt zurück. */
    farbe(id, f) { for (const t of teile(id)) t.style.fill = f || ''; },
    /** Alle Zustände, Farben und Markierungen entfernen. */
    leeren() {
      for (const t of svg.querySelectorAll('[data-id]')) { t.classList.remove(...ZUSTAENDE); t.style.fill = ''; }
      effekte.innerHTML = '';
      frageEl.textContent = '';
    },
    /** Hauptstadt eines Landes mit pulsierendem Ring markieren (null = keine). */
    hauptstadt(id) {
      effekte.innerHTML = '';
      if (!id) return;
      const [x, y] = KARTE.hauptstaedte[id];
      for (const [klasse, r] of [['elr-puls', 13], ['elr-punkt', 5]]) {
        const c = document.createElementNS(NS, 'circle');
        c.setAttribute('class', klasse);
        c.setAttribute('cx', x);
        c.setAttribute('cy', y);
        c.dataset.r = r;
        c.setAttribute('r', r * massstab);
        effekte.appendChild(c);
      }
    },
    /** Frage oben auf der Karte (leerer Text blendet sie aus). */
    frage(text) { frageEl.textContent = text; },
    europa() { gleite(passend(KARTE.europa, 1)); },
    /** Länder (und optional einen Punkt) ins Bild holen – nicht kleiner als minBreite Einheiten. */
    zeige(ids, { punkt = null, minBreite = 220 } = {}) {
      if (!ids.length) return;
      let [x, y, w, h] = rahmenVon(ids);
      if (punkt) {
        const x1 = Math.max(x + w, punkt[0]);
        const y1 = Math.max(y + h, punkt[1]);
        x = Math.min(x, punkt[0]); y = Math.min(y, punkt[1]);
        w = x1 - x; h = y1 - y;
      }
      if (w < minBreite) { x -= (minBreite - w) / 2; w = minBreite; }
      gleite(passend([x, y, w, h], 1.3));
    },
    /** Ausschnitt um einen Kartenpunkt mit gegebener Breite. */
    zeigePunkt([x, y], breite = 300) {
      gleite(passend([x - breite / 2, y - breite / 3, breite, (breite * 2) / 3], 1));
    },
    /** Liegt der Kartenpunkt im sichtbaren Ausschnitt? */
    sichtbar([x, y]) { return x > vb.x && x < vb.x + vb.w && y > vb.y && y < vb.y + vb.h; },
    /** Größe eines Landes in Karteneinheiten. */
    groesse(id) { const [, , w, h] = rahmenVon([id]); return Math.max(w, h); },
    aufraeumen() {
      cancelAnimationFrame(animation);
      beobachter.disconnect();
    },
  };
}
