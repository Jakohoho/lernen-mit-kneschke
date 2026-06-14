/**
 * Zentrale Spiele-Registry.
 *
 * Ein neues Spiel registrieren = Manifest importieren und unten
 * in das SPIELE-Array eintragen. Mehr ist nicht nötig – Klassen,
 * Fächer und Kategorien erscheinen automatisch in der Navigation,
 * sobald hier ein Spiel dafür existiert.
 *
 * 👉 Anleitung: docs/neues-spiel.md
 */
import selfPronounsRace from '../content/games/klasse7-englisch-self-pronouns-race/manifest.js';
import conditionalsRace from '../content/games/klasse8-englisch-conditionals-race/manifest.js';

/**
 * Alle registrierten Spiele (Manifeste) – auch deaktivierte!
 * ⚠️ Für Anzeigen nie direkt verwenden, sondern immer die
 * Helper-Funktionen unten: die filtern deaktivierte Spiele
 * (aktiv: false im Manifest) heraus.
 */
export const SPIELE = [
  selfPronounsRace,
  conditionalsRace,
];

/**
 * Nur die aktiven Spiele. Fehlendes aktiv-Flag zählt als aktiv,
 * damit ein vergessenes Flag ein Spiel nie versehentlich versteckt.
 */
const AKTIVE = SPIELE.filter((s) => s.aktiv !== false);

/** Klassenstufen, für die es mindestens ein aktives Spiel gibt (sortiert). */
export function klassenMitSpielen() {
  return [...new Set(AKTIVE.map((s) => s.klasse))].sort((a, b) => a - b);
}

/** Fach-Slugs einer Klasse, für die es mindestens ein aktives Spiel gibt. */
export function faecherFuerKlasse(klasse) {
  return [...new Set(AKTIVE.filter((s) => s.klasse === klasse).map((s) => s.fach))];
}

/** Alle aktiven Spiele einer Klasse + eines Fachs. */
export function spieleFuer(klasse, fach) {
  return AKTIVE.filter((s) => s.klasse === klasse && s.fach === fach);
}

/** Anzahl der aktiven Spiele einer Klasse (für die Kärtchen auf der Startseite). */
export function anzahlSpieleKlasse(klasse) {
  return AKTIVE.filter((s) => s.klasse === klasse).length;
}

/** Ein aktives Spiel anhand seiner ID finden. */
export function spielMitId(id) {
  return AKTIVE.find((s) => s.id === id) ?? null;
}
