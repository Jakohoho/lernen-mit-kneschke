/**
 * Spieldaten: Europa Länderrallye (Geographie, Klasse 6)
 *
 * Inhaltsstand: Oktober 2026
 *   EU: 27 Staaten · Euro: 21 EU-Staaten (Bulgarien seit 1.1.2026) + 6 Staaten außerhalb der EU
 *   Schengen-Raum: 29 Staaten (Bulgarien und Rumänien seit 1.1.2025 vollständig; Zypern und Irland nicht)
 *   Namen und Hauptstädte: Länderverzeichnis des Auswärtigen Amts (Stand 28.07.2026)
 *   Länderkennzeichen: Liste der UNECE (Wiener Übereinkommen über den Straßenverkehr)
 *   Regionen: Einteilung aus der Unterrichtsliste (6 Regionen)
 *
 * Felder je Land:
 *   id            Code der Kartendaten (karte.js) – nicht ändern
 *   name          Anzeigename
 *   auch          weiterer gebräuchlicher Name (wird als Hinweis angezeigt)
 *   formen        nur bei Ländern mit Artikel: { nom: 'die Schweiz', dat: 'in der Schweiz', gen: 'der Schweiz' }
 *   hauptstadt    richtige Schreibweise
 *   hauptstadtAuch    gleichwertige Schreibweisen (zählen ohne Hinweis)
 *   hauptstadtAlt     ältere/andere Schreibweisen: [Schreibweise, Hinweis] – zählen als richtig, mit Hinweis
 *   kennzeichen   internationales Kfz-Kennzeichen
 *   kennzeichenAlt    [Kürzel, Hinweis] – frühere Kennzeichen, zählen als richtig, mit Hinweis
 *   region        Schlüssel aus REGIONEN
 *   eu, schengen, euro   true/false
 *   waehrung      nur ohne Euro: { name, mit: 'mit dem …' }
 *   hinweis       kurzer Zusatz für den Steckbrief (optional)
 *   regionHinweis Zusatz bei der Regionen-Aufgabe (optional)
 *   typisch       Spezialitäten: [Emoji, Text]
 */

export const STAND = 'Oktober 2026';

export const REGIONEN = [
  { id: 'nord', name: 'Nordeuropa', farbe: '#3FA7E0' },
  { id: 'west', name: 'Westeuropa', farbe: '#FFC53D' },
  { id: 'sued', name: 'Südeuropa', farbe: '#FF6B57' },
  { id: 'mitte', name: 'Mitteleuropa', farbe: '#2EC4A6' },
  { id: 'suedost', name: 'Südosteuropa', farbe: '#C76FCB' },
  { id: 'ost', name: 'Osteuropa', farbe: '#8BC34A' },
];

export const LAENDER = [
  // ---------- Nordeuropa ----------
  {
    id: 'ISL', name: 'Island', hauptstadt: 'Reykjavik', hauptstadtAuch: ['Reykjavík'], kennzeichen: 'IS',
    region: 'nord', eu: false, schengen: true, euro: false,
    waehrung: { name: 'Isländische Krone', mit: 'mit der Isländischen Krone' },
    typisch: [['🌋', 'Vulkane und heiße Springquellen (Geysire)'], ['🐴', 'Islandpferde']],
  },
  {
    id: 'NOR', name: 'Norwegen', hauptstadt: 'Oslo', kennzeichen: 'N',
    region: 'nord', eu: false, schengen: true, euro: false,
    waehrung: { name: 'Norwegische Krone', mit: 'mit der Norwegischen Krone' },
    typisch: [['🏔️', 'Fjorde – lange, schmale Meeresarme zwischen steilen Bergen'], ['🐟', 'Lachs']],
  },
  {
    id: 'SWE', name: 'Schweden', hauptstadt: 'Stockholm', kennzeichen: 'S',
    region: 'nord', eu: true, schengen: true, euro: false,
    waehrung: { name: 'Schwedische Krone', mit: 'mit der Schwedischen Krone' },
    typisch: [['🐴', 'Dalapferd – ein bunt bemaltes Holzpferd'], ['👧', 'Pippi Langstrumpf – erfunden von der Schwedin Astrid Lindgren']],
  },
  {
    id: 'FIN', name: 'Finnland', hauptstadt: 'Helsinki', kennzeichen: 'FIN',
    region: 'nord', eu: true, schengen: true, euro: true,
    typisch: [['🧖', 'Sauna – das Wort kommt aus dem Finnischen'], ['🎅', 'Weihnachtsmanndorf in Rovaniemi (Lappland)']],
  },
  {
    id: 'DNK', name: 'Dänemark', hauptstadt: 'Kopenhagen', hauptstadtAuch: ['København'], kennzeichen: 'DK',
    region: 'nord', eu: true, schengen: true, euro: false,
    waehrung: { name: 'Dänische Krone', mit: 'mit der Dänischen Krone' },
    typisch: [['🧱', 'LEGO-Steine – die Firma LEGO kommt aus Dänemark'], ['🧜‍♀️', 'die Kleine Meerjungfrau in Kopenhagen']],
  },

  // ---------- Westeuropa ----------
  {
    id: 'IRL', name: 'Irland', hauptstadt: 'Dublin', kennzeichen: 'IRL',
    region: 'west', eu: true, schengen: false, euro: true,
    typisch: [['☘️', 'Kleeblatt – das Symbol Irlands'], ['🐑', 'grüne Wiesen mit vielen Schafen']],
  },
  {
    id: 'GBR', name: 'Vereinigtes Königreich', auch: 'Großbritannien',
    formen: { nom: 'das Vereinigte Königreich', dat: 'im Vereinigten Königreich', gen: 'des Vereinigten Königreichs' },
    hauptstadt: 'London', kennzeichen: 'UK',
    kennzeichenAlt: [['GB', 'GB war das Kennzeichen bis 2021 – seitdem gilt UK.']],
    region: 'west', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Pfund Sterling', mit: 'mit dem Pfund Sterling' },
    hinweis: 'Der amtliche Name lautet „Vereinigtes Königreich Großbritannien und Nordirland“.',
    typisch: [['💂', 'Wachsoldaten am Buckingham Palace in London'], ['🚌', 'rote Doppeldeckerbusse']],
  },
  {
    id: 'NLD', name: 'Niederlande',
    formen: { nom: 'die Niederlande', dat: 'in den Niederlanden', gen: 'der Niederlande', mehrzahl: true },
    hauptstadt: 'Amsterdam', kennzeichen: 'NL',
    region: 'west', eu: true, schengen: true, euro: true,
    hinweis: 'Die Regierung sitzt in Den Haag – die Hauptstadt ist aber Amsterdam.',
    typisch: [['🌷', 'Tulpenfelder'], ['🧀', 'Gouda-Käse']],
  },
  {
    id: 'BEL', name: 'Belgien', hauptstadt: 'Brüssel', hauptstadtAuch: ['Bruxelles', 'Brussel'], kennzeichen: 'B',
    region: 'west', eu: true, schengen: true, euro: true,
    typisch: [['⚛️', 'Atomium in Brüssel – ein riesiges Modell von neun Eisen-Atomen'], ['🧇', 'Waffeln'], ['🍫', 'Pralinen']],
  },
  {
    id: 'LUX', name: 'Luxemburg', hauptstadt: 'Luxemburg', hauptstadtAuch: ['Luxembourg'], kennzeichen: 'L',
    region: 'west', eu: true, schengen: true, euro: true,
    typisch: [['📜', 'Schengen – nach diesem Ort in Luxemburg ist der Schengen-Raum benannt'], ['🏰', 'Altstadt mit alten Festungsanlagen']],
  },
  {
    id: 'FRA', name: 'Frankreich', hauptstadt: 'Paris', kennzeichen: 'F',
    region: 'west', eu: true, schengen: true, euro: true,
    typisch: [['🥖', 'Baguette'], ['🗼', 'Eiffelturm in Paris'], ['🥐', 'Croissants']],
  },
  {
    id: 'MCO', name: 'Monaco', hauptstadt: 'Monaco', kennzeichen: 'MC',
    region: 'west', eu: false, schengen: false, euro: true,
    hinweis: 'Monaco ist nach dem Vatikan der zweitkleinste Staat der Welt.',
    typisch: [['🏎️', 'Formel-1-Rennen mitten durch die Stadt'], ['🛥️', 'Jachthafen']],
  },
  {
    id: 'AND', name: 'Andorra', hauptstadt: 'Andorra la Vella', kennzeichen: 'AND',
    region: 'west', eu: false, schengen: false, euro: true,
    typisch: [['⛷️', 'Skifahren in den Pyrenäen'], ['🏔️', 'ein kleines Land mitten in den Bergen']],
  },

  // ---------- Südeuropa ----------
  {
    id: 'PRT', name: 'Portugal', hauptstadt: 'Lissabon', hauptstadtAuch: ['Lisboa'], kennzeichen: 'P',
    region: 'sued', eu: true, schengen: true, euro: true,
    typisch: [['🥧', 'Pastéis de Nata – kleine Puddingtörtchen'], ['🏄', 'Riesenwellen zum Surfen in Nazaré']],
  },
  {
    id: 'ESP', name: 'Spanien', hauptstadt: 'Madrid', kennzeichen: 'E',
    region: 'sued', eu: true, schengen: true, euro: true,
    typisch: [['🥘', 'Paella'], ['💃', 'Flamenco']],
  },
  {
    id: 'ITA', name: 'Italien', hauptstadt: 'Rom', hauptstadtAuch: ['Roma'], kennzeichen: 'I',
    region: 'sued', eu: true, schengen: true, euro: true,
    typisch: [['🍕', 'Pizza'], ['🍝', 'Pasta'], ['🏟️', 'Kolosseum in Rom']],
  },
  {
    id: 'SMR', name: 'San Marino', hauptstadt: 'San Marino', kennzeichen: 'RSM',
    region: 'sued', eu: false, schengen: false, euro: true,
    typisch: [['🏰', 'drei Türme auf dem Berg Monte Titano'], ['📜', 'eine der ältesten Republiken der Welt']],
  },
  {
    id: 'VAT', name: 'Vatikan', auch: 'Vatikanstadt',
    formen: { nom: 'der Vatikan', dat: 'im Vatikan', gen: 'des Vatikans' },
    hauptstadt: 'Vatikanstadt', hauptstadtAuch: ['Vatikan'], kennzeichen: 'V',
    region: 'sued', eu: false, schengen: false, euro: true,
    hinweis: 'Der Vatikan ist ein Stadtstaat: Land und Hauptstadt sind dasselbe. Amtlich heißt er „Staat Vatikanstadt“.',
    typisch: [['⛪', 'Petersdom'], ['🔑', 'kleinster Staat der Welt – hier wohnt der Papst']],
  },
  {
    id: 'MLT', name: 'Malta', hauptstadt: 'Valletta', kennzeichen: 'M',
    region: 'sued', eu: true, schengen: true, euro: true,
    typisch: [['🏖️', 'Sonne, Strand und Meer'], ['🛡️', 'Festungen der Malteserritter in Valletta']],
  },
  {
    id: 'GRC', name: 'Griechenland', hauptstadt: 'Athen', hauptstadtAuch: ['Athina'], kennzeichen: 'GR',
    region: 'sued', eu: true, schengen: true, euro: true,
    typisch: [['🏛️', 'Akropolis in Athen'], ['🏅', 'Die Olympischen Spiele stammen aus dem antiken Griechenland']],
  },
  {
    id: 'CYP', name: 'Zypern', hauptstadt: 'Nikosia', hauptstadtAuch: ['Nicosia', 'Lefkosia'], kennzeichen: 'CY',
    region: 'sued', eu: true, schengen: false, euro: true,
    typisch: [['🐢', 'Meeresschildkröten'], ['🧀', 'Halloumi – ein Grillkäse']],
  },

  // ---------- Mitteleuropa ----------
  {
    id: 'DEU', name: 'Deutschland', hauptstadt: 'Berlin', kennzeichen: 'D',
    region: 'mitte', eu: true, schengen: true, euro: true,
    typisch: [['🥨', 'Brezel'], ['🏰', 'Schloss Neuschwanstein']],
  },
  {
    id: 'CHE', name: 'Schweiz', formen: { nom: 'die Schweiz', dat: 'in der Schweiz', gen: 'der Schweiz' },
    hauptstadt: 'Bern', kennzeichen: 'CH',
    region: 'mitte', eu: false, schengen: true, euro: false,
    waehrung: { name: 'Schweizer Franken', mit: 'mit dem Schweizer Franken' },
    hinweis: 'Bern heißt offiziell „Bundesstadt“. Die größte Stadt der Schweiz ist Zürich.',
    typisch: [['🍫', 'Schokolade'], ['⌚', 'Uhren'], ['🏔️', 'Matterhorn']],
  },
  {
    id: 'LIE', name: 'Liechtenstein', hauptstadt: 'Vaduz', kennzeichen: 'FL',
    region: 'mitte', eu: false, schengen: true, euro: false,
    waehrung: { name: 'Schweizer Franken', mit: 'mit dem Schweizer Franken' },
    typisch: [['🏰', 'Schloss Vaduz – hier wohnt die Fürstenfamilie'], ['⛰️', 'liegt mitten in den Alpen']],
  },
  {
    id: 'AUT', name: 'Österreich', hauptstadt: 'Wien', kennzeichen: 'A',
    region: 'mitte', eu: true, schengen: true, euro: true,
    typisch: [['🍰', 'Sachertorte'], ['🎻', 'Mozart – geboren in Salzburg']],
  },
  {
    id: 'CZE', name: 'Tschechien', auch: 'Tschechische Republik', hauptstadt: 'Prag', hauptstadtAuch: ['Praha'], kennzeichen: 'CZ',
    region: 'mitte', eu: true, schengen: true, euro: false,
    waehrung: { name: 'Tschechische Krone', mit: 'mit der Tschechischen Krone' },
    typisch: [['🕰️', 'Astronomische Uhr in Prag'], ['🏰', 'Prager Burg']],
  },
  {
    id: 'POL', name: 'Polen', hauptstadt: 'Warschau', hauptstadtAuch: ['Warszawa'], kennzeichen: 'PL',
    region: 'mitte', eu: true, schengen: true, euro: false,
    waehrung: { name: 'Zloty', mit: 'mit dem Zloty' },
    typisch: [['🥟', 'Piroggen – gefüllte Teigtaschen'], ['🐉', 'die Sage vom Wawel-Drachen in Krakau']],
  },
  {
    id: 'SVK', name: 'Slowakei', formen: { nom: 'die Slowakei', dat: 'in der Slowakei', gen: 'der Slowakei' },
    hauptstadt: 'Bratislava', hauptstadtAuch: ['Pressburg'], kennzeichen: 'SK',
    region: 'mitte', eu: true, schengen: true, euro: true,
    typisch: [['🏔️', 'Hohe Tatra'], ['🏰', 'viele Burgen, zum Beispiel die Zipser Burg']],
  },
  {
    id: 'HUN', name: 'Ungarn', hauptstadt: 'Budapest', kennzeichen: 'H',
    region: 'mitte', eu: true, schengen: true, euro: false,
    waehrung: { name: 'Forint', mit: 'mit dem Forint' },
    typisch: [['🌶️', 'Paprika'], ['🍲', 'Gulasch']],
  },

  // ---------- Südosteuropa ----------
  {
    id: 'SVN', name: 'Slowenien', hauptstadt: 'Ljubljana', hauptstadtAuch: ['Laibach'], kennzeichen: 'SLO',
    region: 'suedost', eu: true, schengen: true, euro: true,
    typisch: [['🐎', 'Lipizzaner – diese Pferderasse stammt aus Lipica'], ['🏞️', 'Bleder See mit einer kleinen Insel']],
  },
  {
    id: 'HRV', name: 'Kroatien', hauptstadt: 'Zagreb', hauptstadtAuch: ['Agram'], kennzeichen: 'HR',
    region: 'suedost', eu: true, schengen: true, euro: true,
    typisch: [['👔', 'Die Krawatte geht auf Halstücher kroatischer Soldaten zurück'], ['🐕', 'Dalmatiner – benannt nach der Region Dalmatien']],
  },
  {
    id: 'BIH', name: 'Bosnien und Herzegowina', hauptstadt: 'Sarajevo', hauptstadtAuch: ['Sarajewo'], kennzeichen: 'BIH',
    region: 'suedost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Konvertible Mark', mit: 'mit der Konvertiblen Mark' },
    typisch: [['🌉', 'Alte Brücke von Mostar'], ['☕', 'bosnischer Kaffee']],
  },
  {
    id: 'SRB', name: 'Serbien', hauptstadt: 'Belgrad', hauptstadtAuch: ['Beograd'], kennzeichen: 'SRB',
    region: 'suedost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Serbischer Dinar', mit: 'mit dem Serbischen Dinar' },
    typisch: [['🍖', 'Ćevapčići – Hackfleischröllchen'], ['🎾', 'Tennisstar Novak Đoković']],
  },
  {
    id: 'ROU', name: 'Rumänien', hauptstadt: 'Bukarest', hauptstadtAuch: ['București', 'Bucuresti'], kennzeichen: 'RO',
    region: 'suedost', eu: true, schengen: true, euro: false,
    waehrung: { name: 'Rumänischer Leu', mit: 'mit dem Rumänischen Leu' },
    typisch: [['🧛', 'Schloss Bran – oft „Dracula-Schloss“ genannt'], ['🐻', 'viele Braunbären in den Karpaten']],
  },
  {
    id: 'MNE', name: 'Montenegro', hauptstadt: 'Podgorica', kennzeichen: 'MNE',
    region: 'suedost', eu: false, schengen: false, euro: true,
    typisch: [['⛰️', 'Der Name bedeutet „Schwarzer Berg“'], ['🏖️', 'Bucht von Kotor']],
  },
  {
    id: 'KOS', name: 'Kosovo', formen: { nom: 'der Kosovo', dat: 'im Kosovo', gen: 'des Kosovo' },
    hauptstadt: 'Pristina', hauptstadtAuch: ['Prishtina', 'Priština'], kennzeichen: 'RKS',
    kennzeichenAlt: [['KOS', 'Das amtliche Kennzeichen ist RKS (Republik Kosovo).']],
    region: 'suedost', eu: false, schengen: false, euro: true,
    typisch: [['🎂', 'erklärte 2008 seine Unabhängigkeit – einer der jüngsten Staaten Europas'], ['🥞', 'Flija – Pfannkuchen in vielen Schichten']],
  },
  {
    id: 'ALB', name: 'Albanien', hauptstadt: 'Tirana', hauptstadtAuch: ['Tiranë'], kennzeichen: 'AL',
    region: 'suedost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Lek', mit: 'mit dem Lek' },
    typisch: [['🦅', 'Adler – der albanische Landesname wird oft mit „Land der Adler“ übersetzt'], ['🏖️', 'Strände am Mittelmeer']],
  },
  {
    id: 'MKD', name: 'Nordmazedonien', auch: 'bis 2019: Mazedonien', hauptstadt: 'Skopje', kennzeichen: 'NMK',
    kennzeichenAlt: [['MK', 'MK war das Kennzeichen bis 2019 – seitdem gilt NMK.']],
    region: 'suedost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Mazedonischer Denar', mit: 'mit dem Mazedonischen Denar' },
    typisch: [['🏞️', 'Ohridsee – einer der ältesten Seen der Erde'], ['☀️', 'eine Sonne auf der Flagge']],
  },
  {
    id: 'BGR', name: 'Bulgarien', hauptstadt: 'Sofia', hauptstadtAuch: ['Sofija'], kennzeichen: 'BG',
    region: 'suedost', eu: true, schengen: true, euro: true,
    hinweis: 'Bulgarien bezahlt seit dem 1. Januar 2026 mit dem Euro.',
    typisch: [['🌹', 'Rosenöl aus dem Rosental'], ['🥛', 'Joghurt']],
  },

  // ---------- Osteuropa ----------
  {
    id: 'EST', name: 'Estland', hauptstadt: 'Tallinn', hauptstadtAuch: ['Reval'], kennzeichen: 'EST',
    region: 'ost', eu: true, schengen: true, euro: true,
    typisch: [['💻', 'Skype wurde zum großen Teil in Estland programmiert'], ['🏰', 'mittelalterliche Altstadt von Tallinn']],
  },
  {
    id: 'LVA', name: 'Lettland', hauptstadt: 'Riga', kennzeichen: 'LV',
    region: 'ost', eu: true, schengen: true, euro: true,
    typisch: [['🌲', 'Wald bedeckt etwa die Hälfte des Landes'], ['🏖️', 'lange Sandstrände an der Ostsee']],
  },
  {
    id: 'LTU', name: 'Litauen', hauptstadt: 'Vilnius', hauptstadtAuch: ['Wilna'], kennzeichen: 'LT',
    region: 'ost', eu: true, schengen: true, euro: true,
    typisch: [['🏀', 'Basketball ist Nationalsport'], ['🟡', 'Bernstein von der Ostseeküste']],
  },
  {
    id: 'BLR', name: 'Belarus', auch: 'früher: Weißrussland', hauptstadt: 'Minsk', kennzeichen: 'BY',
    region: 'ost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Belarussischer Rubel', mit: 'mit dem Belarussischen Rubel' },
    typisch: [['🥔', 'Draniki – Kartoffelpuffer'], ['🌲', 'Wisente (europäische Bisons) im Urwald von Białowieża']],
  },
  {
    id: 'UKR', name: 'Ukraine', formen: { nom: 'die Ukraine', dat: 'in der Ukraine', gen: 'der Ukraine' },
    hauptstadt: 'Kyjiw', hauptstadtAuch: ['Kyiv'],
    hauptstadtAlt: [['Kiew', '„Kiew“ ist die ältere deutsche Schreibweise – amtlich schreibt man heute Kyjiw.']],
    kennzeichen: 'UA',
    region: 'ost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Hrywnja', mit: 'mit der Hrywnja' },
    typisch: [['🌻', 'Sonnenblumen'], ['🌾', 'Weizen – die Ukraine gilt als „Kornkammer Europas“'], ['🍲', 'Borschtsch – eine Rote-Bete-Suppe']],
  },
  {
    id: 'MDA', name: 'Republik Moldau', auch: 'Moldau',
    formen: { nom: 'die Republik Moldau', dat: 'in der Republik Moldau', gen: 'der Republik Moldau' },
    hauptstadt: 'Kischinau', hauptstadtAuch: ['Chisinau', 'Chișinău', 'Kischinjow'],
    kennzeichen: 'MD',
    region: 'ost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Moldauischer Leu', mit: 'mit dem Moldauischen Leu' },
    hinweis: 'Die Hauptstadt heißt in der Landessprache Chișinău.',
    typisch: [['🍇', 'Weintrauben'], ['🌻', 'Sonnenblumenfelder']],
  },
  {
    id: 'RUS', name: 'Russland', auch: 'amtlich: Russische Föderation', hauptstadt: 'Moskau', hauptstadtAuch: ['Moskwa'], kennzeichen: 'RUS',
    region: 'ost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Russischer Rubel', mit: 'mit dem Russischen Rubel' },
    hinweis: 'Russland reicht von Europa bis zum Pazifik – der größte Teil liegt in Asien.',
    regionHinweis: 'Nur der westliche Teil Russlands liegt in Europa – der größte Teil liegt in Asien.',
    typisch: [['🌍', 'das größte Land der Erde'], ['❄️', 'eiskalte Winter in Sibirien']],
  },
  {
    id: 'KAZ', name: 'Kasachstan', hauptstadt: 'Astana', kennzeichen: 'KZ',
    region: 'ost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Tenge', mit: 'mit dem Tenge' },
    hinweis: 'Der größte Teil Kasachstans liegt in Asien. Die Hauptstadt Astana liegt weit im Osten – schiebe die Karte dafür nach rechts.',
    regionHinweis: 'Nur ein kleiner Teil Kasachstans liegt in Europa – der größte Teil liegt in Asien.',
    typisch: [['🚀', 'Weltraumbahnhof Baikonur'], ['🍎', 'Hier wachsen die wilden Vorfahren unserer Äpfel']],
  },
  {
    id: 'TUR', name: 'Türkei', formen: { nom: 'die Türkei', dat: 'in der Türkei', gen: 'der Türkei' },
    hauptstadt: 'Ankara', kennzeichen: 'TR',
    region: 'ost', eu: false, schengen: false, euro: false,
    waehrung: { name: 'Türkische Lira', mit: 'mit der Türkischen Lira' },
    hinweis: 'Der größte Teil der Türkei liegt in Asien. Die größte Stadt ist Istanbul – die Hauptstadt ist Ankara.',
    regionHinweis: 'Nur ein kleiner Teil der Türkei liegt in Europa – der größte Teil liegt in Asien.',
    typisch: [['🎈', 'Heißluftballons in Kappadokien'], ['🥙', 'Döner Kebab']],
  },
];

/** Keine Schengen-Mitglieder, aber offene Grenzen – zählen bei der Schengen-Aufgabe weder richtig noch falsch. */
export const SCHENGEN_OFFEN = ['MCO', 'SMR', 'VAT'];

/** Auswahl an Währungen für die Antwortmöglichkeiten (Multiple Choice). */
export const WAEHRUNGEN = [
  'Euro', 'Dänische Krone', 'Schwedische Krone', 'Norwegische Krone', 'Isländische Krone', 'Tschechische Krone',
  'Zloty', 'Forint', 'Rumänischer Leu', 'Moldauischer Leu', 'Schweizer Franken', 'Pfund Sterling',
  'Russischer Rubel', 'Belarussischer Rubel', 'Türkische Lira', 'Hrywnja', 'Serbischer Dinar',
];
