# -*- coding: utf-8 -*-
"""
Erzeugt das druckbare Formular "Neue App-Idee" (formular-neue-app-idee.pdf).

Aufruf:        python docs/formular-neue-app-idee.py
Benötigt:      pip install fpdf2
Hinweis:       Reines Entwickler-Werkzeug – die Website lädt diese Datei nie.
               Nach Änderungen das Skript neu ausführen und das PDF mit committen.
"""
from fpdf import FPDF

# ---------------------------------------------------------------- Grundlayout
RAND = 14            # Seitenrand in mm
SCHREIBLINIE = 9     # Abstand der Schreiblinien in mm (handschrifttauglich)
TINTE = (50, 46, 43)         # Dunkelbraun wie auf der Website (--tinte)
KORALLE = (255, 107, 87)     # Akzentfarbe (--koralle)
GRAU = (150, 145, 140)

pdf = FPDF(orientation="P", unit="mm", format="A4")
pdf.set_margins(RAND, RAND, RAND)
pdf.set_auto_page_break(False)
pdf.add_page()
BREITE = pdf.w - 2 * RAND


def linie(y, x1=RAND, x2=RAND + BREITE):
    pdf.set_draw_color(*GRAU)
    pdf.set_line_width(0.3)
    pdf.line(x1, y, x2, y)


def schreiblinien(anzahl):
    """Zeichnet `anzahl` Schreiblinien ab der aktuellen Position."""
    for _ in range(anzahl):
        pdf.set_y(pdf.get_y() + SCHREIBLINIE)
        linie(pdf.get_y())


def abschnitt(titel, zeilen):
    """Überschrift + Schreiblinien."""
    pdf.set_y(pdf.get_y() + 5)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*TINTE)
    pdf.cell(0, 5, titel, new_x="LMARGIN", new_y="NEXT")
    schreiblinien(zeilen)


def checkbox(x, y, groesse=4):
    pdf.set_draw_color(*TINTE)
    pdf.set_line_width(0.4)
    pdf.rect(x, y, groesse, groesse)


# ---------------------------------------------------------------- Kopfbereich
pdf.set_font("Helvetica", "B", 22)
pdf.set_text_color(*KORALLE)
pdf.cell(0, 10, "Neue App-Idee", new_x="LMARGIN", new_y="NEXT")
pdf.set_font("Helvetica", "B", 11)
pdf.set_text_color(*GRAU)
pdf.cell(0, 6, "Lernen mit Kneschke  -  Vorlage für neue Lernspiel-Ideen", new_x="LMARGIN", new_y="NEXT")

pdf.set_y(pdf.get_y() + 3)
pdf.set_font("Helvetica", "", 10)
pdf.set_text_color(*TINTE)
y = pdf.get_y() + 5
drittel = BREITE / 3
for i, feld in enumerate(["Name:", "Klasse:", "Datum:"]):
    x = RAND + i * drittel
    pdf.set_xy(x, y - 4)
    pdf.cell(14, 4, feld)
    linie(y, x + 14, x + drittel - 5)
pdf.set_y(y)

# ------------------------------------------------------- Die Kernfragen
abschnitt("1. Wie soll die App heißen?", 1)
abschnitt("2. Was soll die App können? (Ziel der App)", 3)
abschnitt("3. Wie ist der Ablauf? (Schritt für Schritt: Was sieht und macht man?)", 4)
abschnitt("4. Für welche Klasse und welches Fach ist die App?", 1)

# ------------------------------------------------------- Weitere Anmerkungen
abschnitt("5. Weitere Anmerkungen (Platz für größere Gedanken und Konzepte)", 6)

# ------------------------------------------------------- Notwendige Inhaltsdaten
pdf.set_y(pdf.get_y() + 5)
pdf.set_font("Helvetica", "B", 11)
pdf.cell(0, 5, "6. Notwendige Inhaltsdaten (bitte ankreuzen und beilegen)", new_x="LMARGIN", new_y="NEXT")
pdf.set_font("Helvetica", "", 10)
optionen = [
    "Vokabel- / Wortliste liegt bei",
    "Beispielsätze liegen bei",
    "Fragen mit Lösungen liegen bei",
    "Bilder / Skizzen liegen bei",
]
y = pdf.get_y() + 2
halb = BREITE / 2
for i, text in enumerate(optionen):
    x = RAND + (i % 2) * halb
    zy = y + (i // 2) * 7
    checkbox(x, zy)
    pdf.set_xy(x + 6, zy)
    pdf.cell(halb - 8, 4, text)
zy = y + 14
checkbox(RAND, zy)
pdf.set_xy(RAND + 6, zy)
pdf.cell(20, 4, "Sonstiges:")
linie(zy + 4, RAND + 27, RAND + BREITE)
pdf.set_y(zy + 4)

# ------------------------------------------------------- Prüfung & Unterschrift
y = pdf.h - RAND - 16
pdf.set_draw_color(*TINTE)
pdf.set_line_width(0.4)
linie(y - 4, RAND, RAND + BREITE)

checkbox(RAND, y)
pdf.set_font("Helvetica", "B", 10)
pdf.set_xy(RAND + 6, y)
pdf.cell(50, 4, "Vom Lehrer geprüft")

pdf.set_font("Helvetica", "", 10)
linie(y + 9, RAND + 95, RAND + 160)
pdf.set_xy(RAND + 95, y + 10)
pdf.cell(65, 4, "Unterschrift Lehrkraft")
linie(y + 9, RAND + 168, RAND + BREITE)
pdf.set_xy(RAND + 168, y + 10)
pdf.cell(28, 4, "Datum")

import os
ziel = os.path.join(os.path.dirname(os.path.abspath(__file__)), "formular-neue-app-idee.pdf")
pdf.output(ziel)
print(f"OK: {ziel} ({pdf.pages_count} Seite/n)")
