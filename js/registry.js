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

/** Alle registrierten Spiele (Manifeste). */
export const SPIELE = [
  selfPronounsRace,
];

/** Klassenstufen, für die es mindestens ein Spiel gibt (sortiert). */
export function klassenMitSpielen() {
  return [...new Set(SPIELE.map((s) => s.klasse))].sort((a, b) => a - b);
}

/** Fach-Slugs einer Klasse, für die es mindestens ein Spiel gibt. */
export function faecherFuerKlasse(klasse) {
  return [...new Set(SPIELE.filter((s) => s.klasse === klasse).map((s) => s.fach))];
}

/** Alle Spiele einer Klasse + eines Fachs. */
export function spieleFuer(klasse, fach) {
  return SPIELE.filter((s) => s.klasse === klasse && s.fach === fach);
}

/** Anzahl der Spiele einer Klasse (für die Kärtchen auf der Startseite). */
export function anzahlSpieleKlasse(klasse) {
  return SPIELE.filter((s) => s.klasse === klasse).length;
}

/** Ein Spiel anhand seiner ID finden. */
export function spielMitId(id) {
  return SPIELE.find((s) => s.id === id) ?? null;
}
