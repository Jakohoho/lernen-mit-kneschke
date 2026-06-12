/**
 * Universeller Endscreen für ALLE Spiele.
 *
 * Zeigt das Ergebnis (eine Rangliste oder einen einzelnen Score),
 * Konfetti und die zwei Standard-Aktionen:
 *   „Nochmal spielen"        → ruft onRestart() des Spiels auf
 *   „Zurück zur Übersicht"   → ruft onExit() auf (setzt der gameHost)
 *
 * Aufruf aus einem Spiel heraus:
 *   context.showEndScreen({
 *     titel: 'Geschafft!',
 *     untertitel: 'Tolle Runde!',
 *     ergebnisse: [{ name, wert, detail, farbe, sieger }],
 *     onRestart: () => { ... },
 *   });
 */

const KONFETTI_FARBEN = ['var(--koralle)', 'var(--sonne)', 'var(--minze)', 'var(--himmel)', 'var(--beere)'];
const MEDAILLEN = ['🥇', '🥈', '🥉', '4.'];

export function zeigeEndscreen(container, { titel = 'Geschafft!', untertitel = '', ergebnisse = [], onRestart, onExit }) {
  const konfetti = Array.from({ length: 18 }, (_, i) => {
    const farbe = KONFETTI_FARBEN[i % KONFETTI_FARBEN.length];
    const links = (i * 53 + 7) % 100;
    const dauer = 2.4 + (i % 5) * 0.5;
    const start = (i % 7) * -0.45;
    return `<span class="konfetti" style="left:${links}%;background:${farbe};animation-duration:${dauer}s;animation-delay:${start}s"></span>`;
  }).join('');

  const zeilen = ergebnisse.map((e, i) => `
    <li class="endscreen-zeile ${e.sieger ? 'endscreen-zeile--sieger' : ''}">
      ${ergebnisse.length > 1 ? `<span class="endscreen-platz">${MEDAILLEN[i] ?? `${i + 1}.`}</span>` : ''}
      <span class="endscreen-name">
        ${e.farbe ? `<span class="spieler-punkt" style="--punkt-farbe:${e.farbe}"></span>` : ''}${e.name}
      </span>
      <span class="endscreen-wert">
        ${e.wert}
        ${e.detail ? `<span class="endscreen-detail">${e.detail}</span>` : ''}
      </span>
    </li>`).join('');

  container.innerHTML = `
    <section class="endscreen" aria-live="polite">
      ${konfetti}
      <span class="endscreen-pokal" aria-hidden="true">🏆</span>
      <h2>${titel}</h2>
      ${untertitel ? `<p class="endscreen-untertitel">${untertitel}</p>` : ''}
      ${zeilen ? `<ol class="endscreen-liste">${zeilen}</ol>` : ''}
      <div class="endscreen-knoepfe">
        <button type="button" class="knopf knopf--minze" data-aktion="nochmal">🔄 Nochmal spielen</button>
        <button type="button" class="knopf knopf--blass" data-aktion="zurueck">📚 Zurück zur Übersicht</button>
      </div>
    </section>
  `;

  container.querySelector('[data-aktion="nochmal"]').addEventListener('click', () => onRestart?.());
  container.querySelector('[data-aktion="zurueck"]').addEventListener('click', () => onExit?.());
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
