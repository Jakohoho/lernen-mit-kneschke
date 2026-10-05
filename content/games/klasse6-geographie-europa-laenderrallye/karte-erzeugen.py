#!/usr/bin/env python3
"""
Erzeugt karte.js – die stumme Europakarte der Europa Länderrallye.

Nur nötig, wenn sich Grenzen, Kartenausschnitt oder die Länderauswahl ändern.
Die Website selbst braucht dieses Skript nicht (kein Build-Schritt).

Voraussetzungen: Python 3 und Node.js (für `npx mapshaper`), Internet für den
ersten Download der Kartendaten.

    python3 karte-erzeugen.py

Datenquelle: Natural Earth 1:10m (gemeinfrei, https://www.naturalearthdata.com),
Variante mit deutscher Sicht auf strittige Grenzen (Krim gehört zur Ukraine,
Kosovo ist eigenständig, Nordzypern gehört zu Zypern).

Ablauf: Ausschnitt wählen → flächentreu projizieren (Lambert, Mitte 52° N / 20° O)
→ vereinfachen (gemeinsame Grenzen bleiben deckungsgleich) → je Land ein
SVG-Pfad. Es entstehen zwei Detailstufen: „fein“ (1,5 km) für die herangezoomte
Karte in Ruhe und „grob“ (5 km, alle Inseln bleiben) für die Übersicht und während des Zoomens –
so bleibt die Karte auch auf langsamen Handys flüssig. Es werden nur Küsten, Grenzen und Hauptstadt-Punkte erzeugt –
keine Beschriftungen, Flüsse oder Seen.
"""
import json
import subprocess
import urllib.request
from pathlib import Path

HIER = Path(__file__).resolve().parent
CACHE = Path.home() / '.cache' / 'europa-laenderrallye'
QUELLE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/'
PROJ = '+proj=laea +lat_0=52 +lon_0=20 +ellps=GRS80 +units=m'

# Gesamtausschnitt in Metern: Island/Grönland bis östlich von Astana, Sahara bis Spitzbergen.
# Großzügig gewählt, damit auch auf Handys im Hochformat kein Kartenrand ins Bild kommt.
XMIN, YMIN, XMAX, YMAX = -3300000, -2950000, 3650000, 2900000
# Standardansicht „typisch Europa“ (Island bis Ural)
EUROPA = (-2800000, -2150000, 2550000, 2400000)
KM_PRO_EINHEIT = 5      # 1 Karteneinheit = 5 km
S = 1 / (KM_PRO_EINHEIT * 1000)

# Die 48 Länder der App (Codes wie in data.js)
LAENDER = ('ISL NOR SWE FIN DNK IRL GBR NLD BEL LUX FRA MCO AND PRT ESP ITA SMR VAT MLT GRC CYP '
           'DEU CHE LIE AUT CZE POL SVK HUN SVN HRV BIH SRB ROU MNE KOS ALB MKD BGR '
           'EST LVA LTU BLR UKR MDA RUS KAZ TUR').split()
ZUSAMMENFASSEN = {'ALD': 'FIN'}          # Åland gehört zu Finnland
KLEINSTAATEN = ['MCO', 'SMR', 'VAT', 'LIE', 'AND', 'MLT']   # bekommen einen Tipp-Kreis


def lade(name):
    CACHE.mkdir(parents=True, exist_ok=True)
    ziel = CACHE / f'{name}.geojson'
    if not ziel.exists():
        print('lade', name)
        urllib.request.urlretrieve(QUELLE + f'{name}.geojson', ziel)
    return ziel


def mapshaper(*args):
    subprocess.run(['npx', '--yes', 'mapshaper', *map(str, args)], check=True,
                   stdout=subprocess.DEVNULL)


def px(x, y):
    return (x - XMIN) * S, (YMAX - y) * S


def zahl(v):
    """Zehntel-Ganzzahl -> kürzeste Schreibweise ("12", "1.5", ".5", "-.5")."""
    s = str(v // 10) if v % 10 == 0 else f'{v / 10:.1f}'
    return s.replace('0.', '.', 1) if s.startswith(('0.', '-0.')) else s


def ring_pfad(ring):
    punkte, letzter = [], None
    for x, y in ring:
        p = tuple(round(c * 10) for c in px(x, y))
        if p != letzter:
            punkte.append(p)
            letzter = p
    if len(punkte) > 1 and punkte[0] == punkte[-1]:
        punkte.pop()
    if len(punkte) < 3:
        return ''
    schritte = ' '.join(f'{zahl(b[0] - a[0])} {zahl(b[1] - a[1])}' for a, b in zip(punkte, punkte[1:]))
    return f'M{zahl(punkte[0][0])} {zahl(punkte[0][1])}l{schritte.replace(" -", "-")}z'


def polygone(geometrie):
    if geometrie is None:
        return []
    if geometrie['type'] == 'Polygon':
        return [geometrie['coordinates']]
    if geometrie['type'] == 'MultiPolygon':
        return geometrie['coordinates']
    return []


def schwerpunkt(polys):
    """Flächenschwerpunkt des größten Teilpolygons (für die Tipp-Kreise)."""
    beste = None
    for poly in polys:
        ring = poly[0]
        a = cx = cy = 0.0
        for (x0, y0), (x1, y1) in zip(ring, ring[1:]):
            f = x0 * y1 - x1 * y0
            a += f
            cx += (x0 + x1) * f
            cy += (y0 + y1) * f
        if a and (beste is None or abs(a) > beste[0]):
            beste = (abs(a), cx / (3 * a), cy / (3 * a))
    return beste[1], beste[2]


def detailstufe(laender_roh, name, intervall, inseln_ab):
    """Projizierte, vereinfachte Länder → (Pfade je Land, Polygone je Land, Hintergrund-Pfade)."""
    ziel = CACHE / f'laender_{name}.geojson'
    mapshaper(laender_roh, '-filter-fields', 'ADM0_A3', '-clip', 'bbox=-50,15,110,86', '-proj', PROJ,
              '-clip', f'bbox={XMIN},{YMIN},{XMAX},{YMAX}', '-filter-islands', f'min-area={inseln_ab}km2',
              '-simplify', f'interval={intervall}', 'keep-shapes', '-o', ziel, 'precision=10')
    pfade, polys, hintergrund = {}, {}, []
    for f in json.loads(ziel.read_text())['features']:
        code = ZUSAMMENFASSEN.get(f['properties']['ADM0_A3'], f['properties']['ADM0_A3'])
        teile = polygone(f['geometry'])
        d = ''.join(ring_pfad(r) for poly in teile for r in poly)
        if code in LAENDER:
            pfade[code] = pfade.get(code, '') + d
            polys.setdefault(code, []).extend(teile)
        elif d:
            hintergrund.append(d)
    fehlt = set(LAENDER) - set(polys)
    assert not fehlt, f'Länder fehlen in den Kartendaten: {fehlt}'
    for code in KLEINSTAATEN:   # Vatikan ist kleiner als ein Zehntel Karteneinheit → winzige Raute
        if not pfade[code]:
            x, y = px(*schwerpunkt(polys[code]))
            pfade[code] = f'M{x:.1f} {y - .3:.1f}l.3 .3-.3 .3-.3-.3z'
    return pfade, polys, ''.join(hintergrund)


def main():
    laender_roh = lade('ne_10m_admin_0_countries_deu')
    orte_roh = lade('ne_10m_populated_places_simple')
    orte = CACHE / 'hauptstaedte.geojson'
    orte_p = CACHE / 'hauptstaedte_projiziert.geojson'

    pfade, polys, hintergrund = detailstufe(laender_roh, 'fein', 1500, 15)
    pfade_grob, _, hintergrund_grob = detailstufe(laender_roh, 'grob', 5000, 15)

    hs = [f for f in json.loads(orte_roh.read_text())['features']
          if f['properties']['featurecla'] == 'Admin-0 capital' and f['properties']['adm0_a3'] in LAENDER]
    orte.write_text(json.dumps({'type': 'FeatureCollection', 'features': [
        {'type': 'Feature', 'properties': {'A3': f['properties']['adm0_a3']},
         'geometry': {'type': 'Point', 'coordinates': [f['properties']['longitude'], f['properties']['latitude']]}}
        for f in hs]}))
    mapshaper(orte, '-proj', PROJ, '-o', orte_p, 'precision=10')

    kreise = {}
    for code in KLEINSTAATEN:
        x, y = px(*schwerpunkt(polys[code]))
        kreise[code] = [round(x, 1), round(y, 1)]

    hauptstaedte = {}
    for f in json.loads(orte_p.read_text())['features']:
        x, y = px(*f['geometry']['coordinates'])
        hauptstaedte[f['properties']['A3']] = [round(x, 1), round(y, 1)]
    assert set(hauptstaedte) == set(LAENDER), set(LAENDER) ^ set(hauptstaedte)

    ex0, ey0, ex1, ey1 = EUROPA
    x0, y1 = px(ex0, ey0)
    x1, y0 = px(ex1, ey1)
    karte = {
        'breite': round((XMAX - XMIN) * S, 1),
        'hoehe': round((YMAX - YMIN) * S, 1),
        'europa': [round(x0, 1), round(y0, 1), round(x1 - x0, 1), round(y1 - y0, 1)],
        'laender': pfade,
        'hintergrund': hintergrund,
        'laenderGrob': pfade_grob,
        'hintergrundGrob': hintergrund_grob,
        'hauptstaedte': hauptstaedte,
        'kreise': kreise,
    }
    kopf = ('// Automatisch erzeugt von karte-erzeugen.py – bitte nicht von Hand bearbeiten.\n'
            '// Kartendaten: Natural Earth (gemeinfrei), deutsche Sicht auf strittige Grenzen.\n'
            '// Koordinaten: Lambert flächentreu (52° N / 20° O), 1 Einheit = 5 km.\n')
    ziel = HIER / 'karte.js'
    ziel.write_text(kopf + 'export const KARTE = ' + json.dumps(karte, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print(f'{ziel.name}: {ziel.stat().st_size / 1024:.0f} KB, {len(pfade)} Länder, Karte {karte["breite"]} × {karte["hoehe"]}')


if __name__ == '__main__':
    main()
