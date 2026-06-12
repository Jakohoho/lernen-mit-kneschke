/**
 * Zentrale Struktur der Plattform: Klassenstufen, Fächer und Kategorien.
 *
 * Hier werden NUR die Stammdaten gepflegt (Name, Icon, Farbe).
 * Was davon auf der Website sichtbar ist, ergibt sich automatisch:
 * Eine Klasse / ein Fach / eine Kategorie erscheint erst, sobald
 * mindestens ein Spiel dafür registriert ist (siehe js/registry.js).
 *
 * 👉 Anleitung zum Erweitern: docs/klassen-faecher-kategorien.md
 */

/** Verfügbare Klassenstufen (Gymnasium 5–12). */
export const KLASSEN = [5, 6, 7, 8, 9, 10, 11, 12];

/**
 * Fächer. Der Schlüssel (z. B. 'englisch') ist der "Slug", der in
 * URLs und Spiel-Manifesten verwendet wird – klein, ohne Umlaute.
 */
export const FAECHER = {
  englisch: { name: 'Englisch', emoji: '🇬🇧', farbe: 'var(--himmel)' },
  geographie: { name: 'Geographie', emoji: '🌍', farbe: 'var(--minze)' },
};

/**
 * Kategorien, nach denen die Spiele innerhalb eines Fachs
 * gruppiert werden. Gilt fachübergreifend – jedes Fach nutzt
 * nur die Kategorien, für die es Spiele gibt.
 */
export const KATEGORIEN = {
  grammatik: { name: 'Grammatik', emoji: '✏️' },
  vokabeln: { name: 'Vokabeln', emoji: '📖' },
  landeskunde: { name: 'Landeskunde', emoji: '🗺️' },
  topographie: { name: 'Topographie', emoji: '🧭' },
};
