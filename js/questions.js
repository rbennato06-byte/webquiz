/*
 * Banca dati domande - Quiz Semestre Filtro: Chimica, Fisica e Biologia
 * Chimica: slide del corso (Stati di aggregazione della materia, Stato aeriforme, Stato liquido,
 * Termodinamica delle reazioni chimiche, Atomo, Il sistema periodico degli elementi, Legami,
 * Composti inorganici) + quiz proposti nelle slide stesse + domande ufficiali delle prove del
 * semestre filtro 2025 (primo e secondo appello) + Syllabus ufficiale Chimica e Propedeutica
 * Biochimica 2026/27 (MUR).
 * Fisica: slide del corso (Cinematica, Lavoro ed energia) + domande ufficiali delle prove del
 * semestre filtro 2025 (primo e secondo appello) su unità di misura, cinematica, dinamica,
 * lavoro-energia-potenza, integrate con domande originali sugli stessi argomenti.
 * Biologia: slide del corso (macromolecole biologiche, amminoacidi e proteine, enzimi e
 * metabolismo, lipidi, membrane cellulari, teoria cellulare, cellula procariotica e virus,
 * meccanismi di trasporto di membrana) + capitoli del manuale Fasano "Biologia e Genetica per
 * il semestre filtro" (acidi nucleici/cromatina, organelli cellulari e citoscheletro) +
 * domande ufficiali delle prove del semestre filtro 2025 (primo e secondo appello) + Syllabus
 * ufficiale Biologia 2026/27 (MUR).
 * Formato coerente con le prove ufficiali del semestre filtro 2025/26: domande a risposta
 * multipla (5 opzioni A-E, una sola corretta) e domande a completamento.
 *
 * Ogni argomento di Chimica e Biologia riporta anche il numero (unit) dell'unità didattica del
 * rispettivo syllabus ministeriale a cui appartiene: vedi SYLLABUS per l'elenco completo delle
 * unità didattiche nell'ordine ufficiale (comprese quelle non ancora coperte da domande).
 */

const AREAS = {
  chimica:  { name: "Chimica",  icon: "🧪", color: "#6366f1" },
  fisica:   { name: "Fisica",   icon: "⚛️", color: "#dc2626" },
  biologia: { name: "Biologia", icon: "🧬", color: "#16a34a" }
};

// Unità didattiche ufficiali, nell'ordine del syllabus ministeriale 2026/27 (solo per le aree in
// cui è stato fornito un syllabus, cioè Chimica e Biologia). Fisica non ha un syllabus dedicato
// disponibile e i suoi argomenti restano quindi elencati senza suddivisione in unità.
const SYLLABUS = {
  chimica: [
    { unit: 1, name: "La struttura dell'atomo, i legami chimici, stati di aggregazione della materia e termodinamica dei sistemi aperti" },
    { unit: 2, name: "Miscele, soluzioni e le proprietà colligative delle soluzioni" },
    { unit: 3, name: "Le reazioni chimiche negli organismi viventi: caratteristiche generali, cinetica ed equilibrio chimico" },
    { unit: 4, name: "Acidi, basi, sali, pH, soluzioni tampone; reazioni di ossido-riduzione ed elettrochimica" },
    { unit: 5, name: "Proprietà del carbonio e reattività dei composti organici, idrocarburi, alogenuri alchilici, idrocarburi aromatici e derivati" },
    { unit: 6, name: "I gruppi funzionali e isomerie: alcoli, fenoli, eteri, tioli e tioeteri; aldeidi e chetoni; acidi carbossilici e derivati, ammine e ammidi" },
    { unit: 7, name: "Amminoacidi e proteine, carboidrati, lipidi, nucleotidi, polinucleotidi e acidi nucleici" }
  ],
  biologia: [
    { unit: 1, name: "Le basi dell'organizzazione biologica e molecolare della vita" },
    { unit: 2, name: "I meccanismi cellulari di trasmissione e controllo dell'informazione genetica ed epigenetica" },
    { unit: 3, name: "Il flusso dell'informazione" },
    { unit: 4, name: "I meccanismi cellulari di trasmissione e controllo dei caratteri selvatici e mutati" },
    { unit: 5, name: "Le strutture cellulari: biogenesi, morfologia e funzioni" },
    { unit: 6, name: "La cellula e l'ambiente, la segnalazione cellulare e la trasduzione del segnale" },
    { unit: 7, name: "Il controllo della proliferazione e della sopravvivenza cellulare" }
  ]
};

const TOPICS = {
  aggregazione: { name: "Stati di aggregazione della materia", color: "#6366f1", area: "chimica", unit: 1 },
  gas:          { name: "Stato aeriforme (i gas)",             color: "#0ea5e9", area: "chimica", unit: 1 },
  liquido:      { name: "Stato liquido",                       color: "#14b8a6", area: "chimica", unit: 1 },
  termodinamica:{ name: "Termodinamica",                       color: "#f59e0b", area: "chimica", unit: 1 },
  atomo:        { name: "Struttura dell'atomo",                color: "#d946ef", area: "chimica", unit: 1 },
  tavola:       { name: "Tavola periodica degli elementi",     color: "#65a30d", area: "chimica", unit: 1 },
  legami:       { name: "Legami chimici",                      color: "#0891b2", area: "chimica", unit: 1 },
  nomenclatura: { name: "Nomenclatura chimica",                color: "#db2777", area: "chimica", unit: 1 },
  geometria:    { name: "Struttura e geometria molecolare",    color: "#9333ea", area: "chimica", unit: 1 },
  soluzioni:    { name: "Miscele, soluzioni e proprietà colligative", color: "#2563eb", area: "chimica", unit: 2 },
  misure:       { name: "Unità di misura e grandezze fisiche", color: "#e11d48", area: "fisica" },
  cinematica:   { name: "Cinematica",                          color: "#ea580c", area: "fisica" },
  dinamica:     { name: "Dinamica",                            color: "#7c3aed", area: "fisica" },
  energia:      { name: "Lavoro, energia e potenza",           color: "#059669", area: "fisica" },
  quantita_moto:{ name: "Quantità di moto, urti e centro di massa", color: "#0ea5e9", area: "fisica" },
  corpirigidi:  { name: "Dinamica rotazionale, statica e leve", color: "#b45309", area: "fisica" },
  biomolecole:  { name: "Basi molecolari della vita",          color: "#16a34a", area: "biologia", unit: 1 },
  proteine:     { name: "Amminoacidi e proteine",               color: "#0d9488", area: "biologia", unit: 1 },
  enzimi:       { name: "Enzimi e metabolismo",                 color: "#ca8a04", area: "biologia", unit: 1 },
  lipidi:       { name: "Lipidi",                               color: "#be123c", area: "biologia", unit: 1 },
  procarioti:   { name: "Teoria cellulare e cellula procariotica", color: "#0369a1", area: "biologia", unit: 1 },
  virus:        { name: "Virus e cicli replicativi",            color: "#b91c1c", area: "biologia", unit: 1 },
  membrane:     { name: "Membrane cellulari",                   color: "#7c3aed", area: "biologia", unit: 5 },
  acidinucleici:{ name: "Acidi nucleici e cromatina",           color: "#1d4ed8", area: "biologia", unit: 1 },
  organelli:    { name: "Organelli e citoscheletro",            color: "#c2410c", area: "biologia", unit: 5 }
};

// type: 'mc' (scelta multipla, options[5], correct = indice 0-4)
//       'fill' (completamento, answer = stringa risposta attesa, si accettano più varianti in answerAlt)
const QUESTIONS = [

/* ============================= STATI DI AGGREGAZIONE ============================= */

{ id:"agg-01", topic:"aggregazione", type:"mc",
  q:"Come viene chiamato il passaggio dallo stato solido a quello aeriforme?",
  options:[
    "Fusione",
    "Evaporazione",
    "Sublimazione",
    "Ebollizione",
    "Brinamento"], correct:2,
  explain:"La sublimazione è il passaggio diretto solido→vapore; il brinamento è il passaggio opposto vapore→solido." },

{ id:"agg-02", topic:"aggregazione", type:"mc",
  q:"In quale dei seguenti composti si osserva tipicamente il passaggio di fase della sublimazione?",
  options:[
    "Ghiaccio ($H_2O$ solido)",
    "Cloruro di sodio (NaCl) solido",
    "Zolfo solido ($S_8$)",
    "$CO_2$ solida (ghiaccio secco)",
    "Rame metallico solido ($Cu$)"], correct:3,
  explain:"La $CO_2$ solida (ghiaccio secco) è l'esempio classico citato nelle slide, insieme a iodio e naftalina." },

{ id:"agg-03", topic:"aggregazione", type:"mc",
  q:"Indicare la differenza tra evaporazione ed ebollizione:",
  options:[
    "Evaporazione ed ebollizione interessano entrambe l'intero volume di liquido",
    "L'evaporazione interessa solo gli strati superficiali del liquido, mentre l'ebollizione l'intero volume",
    "Evaporazione ed ebollizione interessano entrambe solo gli strati superficiali del liquido",
    "Nessuna delle precedenti risposte è corretta",
    "L'ebollizione interessa solo gli strati superficiali del liquido, mentre l'evaporazione l'intero volume"], correct:1 },

{ id:"agg-04", topic:"aggregazione", type:"mc",
  q:"I solidi cristallini presentano:",
  options:[
    "Atomi con una disposizione disordinata",
    "Atomi immobili a temperatura ambiente nelle loro posizioni reticolari",
    "Isotropia",
    "Nessuna delle altre risposte è corretta",
    "Atomi con una disposizione periodica"], correct:4,
  explain:"I solidi cristallini hanno una disposizione periodica a lungo raggio (reticolo cristallino) e sono anisotropi, non isotropi." },

{ id:"agg-05", topic:"aggregazione", type:"mc",
  q:"Durante il processo di fusione di una data sostanza allo stato solido, quale delle seguenti grandezze NON cambia?",
  options:[
    "La temperatura",
    "La velocità media delle particelle",
    "La densità",
    "Il volume",
    "L'energia interna"], correct:0,
  explain:"Durante un passaggio di stato la temperatura resta costante: il calore fornito serve a vincere le forze di coesione, non a scaldare la sostanza." },

{ id:"agg-07", topic:"aggregazione", type:"mc",
  q:"Da cosa dipende lo stato fisico della materia a una data temperatura?",
  options:[
    "Esclusivamente dalle forze di attrazione intermolecolari, indipendentemente dalla temperatura",
    "Unicamente dalla massa molare delle particelle costituenti la sostanza in esame",
    "Esclusivamente dall'energia cinetica media delle particelle, a prescindere dalle forze attrattive",
    "Soltanto dalla pressione atmosferica esercitata sul sistema in quel momento",
    "Dal bilancio tra l'energia cinetica delle particelle e le forze di attrazione tra esse"], correct:4 },

{ id:"agg-08", topic:"aggregazione", type:"mc",
  q:"Negli stati solido e liquido, le forze di coesione tra le molecole sono:",
  options:[
    "Inferiori all'energia cinetica delle molecole",
    "Nulle",
    "Superiori all'energia cinetica delle molecole",
    "Uguali all'energia cinetica delle molecole",
    "Non influenzano lo stato fisico"], correct:2,
  explain:"Per questo motivo solidi e liquidi hanno bassa comprimibilità, a differenza dei gas." },

{ id:"agg-09", topic:"aggregazione", type:"mc",
  q:"Quale proprietà NON è influenzata dalle forze di coesione (forze intermolecolari)?",
  options:[
    "Il punto di ebollizione",
    "La struttura di acidi nucleici e proteine",
    "La massa atomica degli elementi",
    "Il punto di liquefazione",
    "La solubilità di gas, liquidi e solidi nei solventi"], correct:2 },

{ id:"agg-10", topic:"aggregazione", type:"mc",
  q:"Come si chiama il passaggio di stato da liquido a solido?",
  options:[
    "Sublimazione (da solido a gas)",
    "Brinamento (da gas a solido)",
    "Fusione (da solido a liquido)",
    "Condensazione (da gas a liquido)",
    "Solidificazione (o cristallizzazione)"], correct:4,
  explain:"È il processo opposto alla fusione; la temperatura di congelamento coincide con quella di fusione." },

{ id:"agg-12", topic:"aggregazione", type:"mc",
  q:"Il termine \"liquefazione\" (gas→liquido) si usa per le sostanze che a temperatura ambiente sono:",
  options:[
    "Sia solide che liquide",
    "Plasma",
    "Gassose",
    "Solide",
    "Liquide"], correct:2 },

{ id:"agg-13", topic:"aggregazione", type:"mc",
  q:"Un solido amorfo si distingue da uno cristallino perché:",
  options:[
    "Fonde in un intervallo di temperatura e non ha periodicità a lungo raggio",
    "Presenta un reticolo cristallino ordinato, con periodicità regolare a lungo raggio",
    "È costituito esclusivamente da ioni disposti in un reticolo cubico",
    "Ha una temperatura di fusione netta e ben definita, come nei solidi cristallini",
    "È sempre anisotropo, cioè le sue proprietà variano a seconda della direzione"], correct:0 },

{ id:"agg-14", topic:"aggregazione", type:"mc",
  q:"I solidi covalenti, come il diamante, sono caratterizzati da:",
  options:[
    "Legami intermolecolari deboli, tipo forze di London, tra molecole discrete",
    "Un reticolo tenuto insieme da legami covalenti, con punti di fusione altissimi",
    "Assenza di periodicità nel reticolo, come nei solidi amorfi disordinati",
    "Punti di fusione molto bassi, dovuti a deboli interazioni di van der Waals",
    "Una nuvola di elettroni delocalizzati che circonda cationi, come nei metalli"], correct:1,
  explain:"Il cristallo covalente può essere visto come un'unica grande molecola (\"solido covalente a rete\")." },

{ id:"agg-15", topic:"aggregazione", type:"mc",
  q:"Nei solidi metallici il legame è dovuto a:",
  options:[
    "Legami covalenti direzionali orientati secondo la geometria degli orbitali ibridi",
    "Forze di London, esclusivamente, tra molecole apolari prive di altre interazioni",
    "Legami ionici tra cationi e anioni disposti in un reticolo cristallino rigido",
    "Legami a idrogeno tra atomi di idrogeno e atomi molto elettronegativi",
    "Cationi metallici circondati da una nuvola delocalizzata di elettroni di valenza"], correct:4 },

{ id:"agg-16", topic:"aggregazione", type:"mc",
  q:"I solidi molecolari sono tenuti insieme da:",
  options:[
    "Legame metallico, con elettroni di valenza delocalizzati tra i cationi",
    "Forze intermolecolari come forze di London, interazioni dipolo-dipolo e legami a idrogeno",
    "Nessuna forza apprezzabile: le molecole sono libere di muoversi senza vincoli",
    "Legami ionici tra ioni positivi e negativi disposti in un reticolo rigido",
    "Legami covalenti a rete estesa su tutto il cristallo, come nel diamante"], correct:1,
  explain:"Essendo forze più deboli dei legami ionici, i solidi molecolari hanno generalmente punti di fusione più bassi dei cristalli ionici." },

{ id:"agg-19", topic:"aggregazione", type:"mc",
  q:"I solidi ionici sono formati da:",
  options:[
    "Particelle prive di carica elettrica, tenute insieme da deboli forze di van der Waals",
    "Ioni positivi e negativi disposti in un reticolo cristallino tenuto insieme da legami ionici",
    "Atomi legati covalentemente in un'unica rete tridimensionale estesa, come nel diamante",
    "Molecole neutre tenute insieme unicamente da deboli forze di dispersione di London",
    "Atomi metallici immersi in una nuvola di elettroni delocalizzati, come nei metalli"], correct:1 },

{ id:"agg-20", topic:"aggregazione", type:"fill",
  q:"Il passaggio di stato da solido a liquido si chiama ________.",
  answer:"FUSIONE" },

{ id:"agg-21", topic:"aggregazione", type:"fill",
  q:"Il passaggio di stato che avviene direttamente da solido a vapore, senza passare per lo stato liquido, si chiama ________.",
  answer:"SUBLIMAZIONE" },

{ id:"agg-22", topic:"aggregazione", type:"fill",
  q:"I solidi che presentano una disposizione periodica a lungo raggio delle particelle sono detti solidi ________.",
  answer:"CRISTALLINI" },

{ id:"agg-23", topic:"aggregazione", type:"fill",
  q:"La temperatura di congelamento di una sostanza è uguale alla sua temperatura di ________.",
  answer:"FUSIONE" },

{ id:"agg-24", topic:"aggregazione", type:"fill",
  q:"Le forze che tengono unite le molecole in un liquido o in un solido molecolare sono dette forze di ________ (o forze intermolecolari).",
  answer:"COESIONE" },

/* ============================= STATO AERIFORME (GAS) ============================= */

{ id:"gas-01", topic:"gas", type:"mc",
  q:"La legge di Boyle afferma che, a temperatura costante:",
  options:[
    "Se il volume del gas viene dimezzato la pressione quadruplica",
    "Il volume di un gas è direttamente proporzionale alla pressione applicata",
    "Volume e pressione non sono grandezze correlate",
    "Il volume di un gas è inversamente proporzionale alla pressione applicata",
    "Un aumento di pressione provoca un aumento di volume"], correct:3 },

{ id:"gas-02", topic:"gas", type:"mc",
  q:"Se un gas viene riscaldato a volume costante, in base alla legge di Gay-Lussac la sua pressione:",
  options:[
    "Diminuisce",
    "Aumenta",
    "Prima diminuisce e poi aumenta",
    "Rimane costante",
    "Prima aumenta e poi diminuisce"], correct:1 },

{ id:"gas-03", topic:"gas", type:"mc",
  q:"Da quale funzione matematica è rappresentata graficamente la legge di Boyle (P in funzione di V)?",
  options:[
    "Da una parabola",
    "Da una retta parallela all'asse delle X",
    "Da una porzione di circonferenza",
    "Da una retta parallela all'asse delle Y",
    "Da un ramo d'iperbole"], correct:4 },

{ id:"gas-04", topic:"gas", type:"mc",
  q:"Un campione di gas è tenuto in un recipiente flessibile a pressione costante. Se la temperatura assoluta raddoppia:",
  options:[
    "Il volume si riduce a un terzo",
    "Il volume raddoppia",
    "Il volume resta costante",
    "Il volume dimezza",
    "Il volume triplica"], correct:1,
  explain:"Legge di Charles: a $P$ costante, $V$ è direttamente proporzionale a $T$." },

{ id:"gas-05", topic:"gas", type:"mc",
  q:"Quale delle seguenti affermazioni descrive correttamente la legge di Charles?",
  options:[
    "La pressione di un gas è direttamente proporzionale alla sua temperatura, a volume costante",
    "La temperatura di un gas è direttamente proporzionale alla sua pressione, a volume costante",
    "Il volume di un gas è direttamente proporzionale alla sua temperatura, a pressione costante",
    "Il volume di un gas è direttamente proporzionale alla sua pressione, a temperatura costante",
    "Il volume di un gas è inversamente proporzionale alla sua temperatura, a pressione costante"], correct:2 },

{ id:"gas-06", topic:"gas", type:"mc",
  q:"Un campione di gas occupa un volume di 6,00 L alla pressione di 1,50 atm. Calcolare il suo volume se la pressione è portata a 3,00 atm a temperatura costante:",
  options:[
    "10,0 L",
    "5,00 L",
    "2,50 L",
    "3,00 L",
    "2,00 L"], correct:3,
  explain:"Legge di Boyle: $P_1V_1 = P_2V_2$ → $1{,}50\\times 6{,}00 = 3{,}00\\times V_2$ → $V_2 = 3{,}00\\text{ L}$." },

{ id:"gas-07", topic:"gas", type:"mc",
  q:"Un campione di gas è tenuto a 200 K a una pressione di 2,00 atm. Viene poi riscaldato a volume costante fino a raggiungere una pressione di 6,00 atm. Quale sarà la sua temperatura finale?",
  options:[
    "250 K",
    "150 K",
    "600 K",
    "100 K",
    "200 K"], correct:2,
  explain:"Legge di Gay-Lussac: $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$ → $\\dfrac{2{,}00}{200} = \\dfrac{6{,}00}{T_2}$ → $T_2 = 600\\text{ K}$." },

{ id:"gas-08", topic:"gas", type:"mc",
  q:"Un gas ideale subisce una trasformazione isocora dallo stato A ($P_A=1$ atm; $T_A=200$ K) allo stato B ($V_B=5$ L; $T_B=400$ K), e poi una trasformazione isoterma che lo porta allo stato C ($V_C=8$ L). Calcolare $P_C$.",
  options:[
    "1,25 atm",
    "4,00 atm",
    "2,00 atm",
    "1,00 atm",
    "3,00 atm"], correct:0,
  explain:"$A\\to B$ (isocora, $V_A=V_B=5\\text{ L}$): $\\dfrac{P_A}{T_A}=\\dfrac{P_B}{T_B}$ → $P_B=\\dfrac{1\\times 400}{200}=2\\text{ atm}$. $B\\to C$ (isoterma): $P_BV_B=P_CV_C$ → $2\\times 5=P_C\\times 8$ → $P_C=1{,}25\\text{ atm}$." },

{ id:"gas-09", topic:"gas", type:"mc",
  q:"In un gas il prodotto della pressione per il volume (a quantità di gas costante):",
  options:[
    "Resta costante all'aumentare della temperatura",
    "È indipendente dalla densità",
    "È indipendente dalla quantità di gas",
    "È proporzionale alla temperatura assoluta",
    "Raddoppia se la T passa da 10 a 20 °C"], correct:3,
  explain:"Dalla legge dei gas ideali $PV=nRT$, a $n$ costante $PV$ è direttamente proporzionale a $T$ (attenzione: raddoppiare la $T$ in °C da 10 a 20 non raddoppia $T$ in kelvin)." },

{ id:"gas-10", topic:"gas", type:"mc",
  q:"Due recipienti dello stesso volume contengono rispettivamente $N_2$ e $O_2$, nelle stesse condizioni di temperatura e pressione. La quantità di $N_2$ è pari a 2,8 g; calcolare la quantità di $O_2$ (gas perfetti, $M(N_2)=28$ g/mol, $M(O_2)=32$ g/mol).",
  options:[
    "2,8 g",
    "1,4 g",
    "3,0 g",
    "3,2 g",
    "2,0 g"], correct:3,
  explain:"Per la legge di Avogadro, stesso $V$, $T$, $P$ → stesse moli: $n(N_2)=\\dfrac{2{,}8}{28}=0{,}1\\text{ mol}$ → massa $O_2 = 0{,}1\\times 32 = 3{,}2\\text{ g}$." },

{ id:"gas-11", topic:"gas", type:"mc",
  q:"Il volume di 22,414 litri è quello occupato da:",
  options:[
    "1 mole di qualunque gas nelle condizioni ambiente (25°C, 1 atm)",
    "1 mole di azoto liquido a pressione atmosferica",
    "1 kg di un gas ideale a condizioni standard",
    "1 mole di qualunque gas alle condizioni standard (0°C, 1 atm)",
    "1 mole di acqua allo stato di vapore surriscaldato"], correct:3 },

{ id:"gas-12", topic:"gas", type:"mc",
  q:"A 0°C e alla pressione di 1 atmosfera, due moli di gas $N_2$:",
  options:[
    "Occupano un volume maggiore rispetto a quello di due moli di gas $H_2$",
    "Hanno una massa complessiva di 28 g",
    "Contengono $12{,}044\\times 10^{23}$ molecole di $N_2$",
    "Contengono $6{,}022\\times 10^{23}$ molecole di $N_2$",
    "Occupano un volume minore di due moli di gas $H_2$"], correct:2,
  explain:"2 moli contengono $2\\times N_A = 12{,}044\\times 10^{23}$ molecole. Per la legge di Avogadro il volume, a parità di $T$, $P$ e moli, è uguale a quello di $H_2$ (non maggiore né minore). La massa di 2 moli di $N_2$ è 56 g, non 28 g." },

{ id:"gas-13", topic:"gas", type:"mc",
  q:"La legge di Avogadro afferma che volumi uguali di gas diversi, nelle stesse condizioni di temperatura e pressione, contengono:",
  options:[
    "Un numero di molecole che dipende solo dalla pressione",
    "Un numero differente di molecole a seconda del gas",
    "Un numero di molecole che dipende solo dalla temperatura",
    "Lo stesso numero di molecole",
    "Un numero di molecole che varia in base al tipo di gas"], correct:3 },

{ id:"gas-14", topic:"gas", type:"mc",
  q:"Quale tra le seguenti assunzioni NON è alla base della teoria cinetica dei gas?",
  options:[
    "Le molecole possiedono esclusivamente energia cinetica",
    "Le molecole non interagiscono tra loro tra una collisione e l'altra (traiettorie rettilinee)",
    "Le molecole sono assimilate a punti materiali (volume trascurabile)",
    "Le collisioni tra le molecole sono perfettamente elastiche",
    "Il moto delle molecole avviene in un'unica direzione"], correct:4,
  explain:"Le molecole si muovono casualmente in tutte le direzioni con velocità diverse, non in un'unica direzione." },

{ id:"gas-15", topic:"gas", type:"mc",
  q:"Qual è la formula della legge dei gas ideali?",
  options:[
    "$PV = \\dfrac{nR}{T}$",
    "$PV = nRT$",
    "$P = \\dfrac{nRT}{V^2}$",
    "$\\dfrac{P}{V} = nRT$",
    "$PV^2 = nRT$"], correct:1 },

{ id:"gas-16", topic:"gas", type:"mc",
  q:"Qual è il valore della costante universale dei gas $R$, espressa in $\\text{L}\\cdot\\text{atm}/(\\text{mol}\\cdot\\text{K})$?",
  options:[
    "22,4",
    "$6{,}022\\times 10^{23}$",
    "0,0821",
    "8,314",
    "273,15"], correct:2 },

{ id:"gas-17", topic:"gas", type:"mc",
  q:"Secondo la teoria cinetica dei gas, il volume occupato dalle singole molecole di un gas:",
  options:[
    "Aumenta proporzionalmente con l'aumentare della pressione esterna",
    "Coincide esattamente con il volume molare a condizioni standard",
    "È sempre costante e identico, indipendentemente dal tipo di gas",
    "È trascurabile rispetto al volume totale occupato dal gas",
    "È uguale al volume totale occupato dal gas nel recipiente"], correct:3,
  explain:"La maggior parte del volume occupato da un gas è spazio vuoto: per questo i gas si comprimono facilmente." },

{ id:"gas-18", topic:"gas", type:"mc",
  q:"Durante le collisioni tra le molecole di un gas ideale, secondo la teoria cinetica:",
  options:[
    "Le traiettorie diventano curve anche tra una collisione e l'altra",
    "Le molecole si fondono tra loro formando aggregati molecolari stabili",
    "Le collisioni sono perfettamente elastiche e l'energia cinetica totale del gas resta costante",
    "Le molecole si fermano completamente, annullando ogni energia cinetica",
    "L'energia cinetica totale del gas diminuisce progressivamente"], correct:2 },

{ id:"gas-19", topic:"gas", type:"mc",
  q:"Qual è l'origine della pressione esercitata da un gas sulle pareti del recipiente che lo contiene?",
  options:[
    "La temperatura assoluta del recipiente in cui il gas è contenuto",
    "L'attrazione gravitazionale delle molecole",
    "Le collisioni delle molecole di gas con le pareti del recipiente",
    "Le reazioni chimiche che avvengono tra le molecole del gas",
    "La densità del gas presente all'interno del recipiente"], correct:2 },

{ id:"gas-20", topic:"gas", type:"fill",
  q:"La legge di Boyle afferma che, a temperatura costante, il volume di un gas è ________ proporzionale alla pressione applicata.",
  answer:"INVERSAMENTE" },

{ id:"gas-21", topic:"gas", type:"fill",
  q:"La legge di Charles afferma che, a pressione costante, il volume di un gas è ________ proporzionale alla sua temperatura assoluta.",
  answer:"DIRETTAMENTE" },

{ id:"gas-22", topic:"gas", type:"fill",
  q:"La legge di Gay-Lussac afferma che, a volume costante, la pressione di un gas è ________ proporzionale alla sua temperatura assoluta.",
  answer:"DIRETTAMENTE" },

{ id:"gas-23", topic:"gas", type:"fill",
  q:"Lo zero della scala Kelvin, detto zero assoluto, corrisponde a ________ °C.",
  answer:"-273,15", answerAlt:["-273","273,15 GRADI SOTTO ZERO"] },

{ id:"gas-24", topic:"gas", type:"fill",
  q:"Una mole di qualsiasi gas, a temperatura e pressione standard (0°C, 1 atm), occupa un volume di ________ litri.",
  answer:"22,4", answerAlt:["22,414"] },

{ id:"gas-25", topic:"gas", type:"fill",
  q:"La distribuzione statistica delle velocità molecolari di un gas, che dipende dalla temperatura, è descritta dalla legge (o distribuzione) di ________.",
  answer:"MAXWELL-BOLTZMANN" },

/* ============================= STATO LIQUIDO ============================= */

{ id:"liq-01", topic:"liquido", type:"mc",
  q:"Quando la tensione di vapore di un liquido eguaglia la pressione esterna, il liquido:",
  options:[
    "Si riscalda",
    "Congela",
    "Bolle",
    "Si raffredda",
    "È alla temperatura critica"], correct:2 },

{ id:"liq-02", topic:"liquido", type:"mc",
  q:"Se aumentiamo la pressione esercitata su un liquido, la sua temperatura di ebollizione:",
  options:[
    "Diminuisce",
    "Non varia",
    "Varia con il cubo della pressione",
    "Varia con il quadrato della pressione",
    "Aumenta"], correct:4 },

{ id:"liq-03", topic:"liquido", type:"mc",
  q:"Se aumentiamo la pressione esercitata su un campione di acqua liquida, la sua temperatura di congelamento:",
  options:[
    "Aumenta",
    "Non varia",
    "Varia con il quadrato della pressione",
    "Diminuisce",
    "Varia con il cubo della pressione"], correct:3,
  explain:"L'acqua è anomala: il ghiaccio è meno denso dell'acqua liquida (curva di fusione a pendenza negativa), quindi un aumento di pressione abbassa la temperatura di congelamento." },

{ id:"liq-04", topic:"liquido", type:"mc",
  q:"Come varia la tensione di vapore di un liquido all'aumentare della temperatura?",
  options:[
    "Resta costante",
    "Diminuisce linearmente",
    "Diminuisce in maniera esponenziale",
    "Non dipende dalla temperatura",
    "Aumenta in maniera esponenziale"], correct:4 },

{ id:"liq-05", topic:"liquido", type:"mc",
  q:"Il calore latente di evaporazione è definito come:",
  options:[
    "L'energia necessaria per aumentare di 1°C la temperatura di 1 g di liquido",
    "La quantità di energia necessaria, a temperatura costante, per far evaporare un grammo di liquido",
    "La differenza di energia interna tra lo stato liquido e lo stato solido della sostanza",
    "L'energia rilasciata quando un vapore condensa completamente",
    "La pressione esercitata dal vapore sulla superficie del liquido"], correct:1 },

{ id:"liq-06", topic:"liquido", type:"mc",
  q:"Durante l'evaporazione, le molecole che abbandonano il liquido sono quelle con:",
  options:[
    "Minore massa molecolare",
    "Energia cinetica media, senza effetti sulla temperatura",
    "Minore energia cinetica, per cui il liquido si riscalda",
    "Maggiore energia cinetica, per cui il liquido si raffredda",
    "Carica elettrica negativa"], correct:3,
  explain:"Allontanandosi le molecole più energetiche, l'energia media (e quindi la temperatura) del liquido rimasto diminuisce." },

{ id:"liq-07", topic:"liquido", type:"mc",
  q:"Il raffreddamento del corpo umano dovuto alla sudorazione è spiegato principalmente da:",
  options:[
    "La bassa densità del sudore",
    "La capacità termica delle ghiandole sudoripare",
    "L'elevato calore di evaporazione dell'acqua",
    "L'elevata tensione superficiale dell'acqua",
    "L'elevata viscosità del sudore"], correct:2 },

{ id:"liq-08", topic:"liquido", type:"mc",
  q:"Qual è il valore approssimativo del calore di evaporazione dell'acqua a 40°C, citato nelle slide?",
  options:[
    "2402 J/g",
    "0,0821 J/g",
    "4,184 J/g",
    "100 J/g",
    "22,4 J/g"], correct:0 },

{ id:"liq-09", topic:"liquido", type:"mc",
  q:"In un diagramma di fase, il punto triplo rappresenta:",
  options:[
    "Le condizioni oltre le quali si forma un fluido supercritico",
    "Le condizioni di temperatura e pressione in cui coesistono le tre fasi solida, liquida e gassosa",
    "Il punto di massima densità raggiunta da una sostanza a una certa pressione",
    "Il punto in cui la tensione superficiale del liquido si annulla completamente",
    "Le condizioni di temperatura e pressione in cui il liquido entra in ebollizione"], correct:1 },

{ id:"liq-10", topic:"liquido", type:"mc",
  q:"Il punto triplo dell'acqua si trova approssimativamente a:",
  options:[
    "374,13°C e 217 atm",
    "100°C e 1 atm",
    "-56,6°C e circa 5,1 atm",
    "0,01°C e circa 0,006 atm",
    "0°C e 1 atm"], correct:3 },

{ id:"liq-11", topic:"liquido", type:"mc",
  q:"Oltre il punto critico di una sostanza:",
  options:[
    "La sostanza si decompone chimicamente in composti più semplici e stabili",
    "Non esiste più distinzione tra fase liquida e gassosa: si parla di fluido supercritico",
    "La tensione di vapore diventa nulla e il liquido smette di evaporare",
    "Coesistono sempre e comunque le tre fasi solida, liquida e gassosa",
    "La sostanza passa sempre allo stato solido, indipendentemente dalla pressione"], correct:1 },

{ id:"liq-12", topic:"liquido", type:"mc",
  q:"Perché nel diagramma di fase dell'acqua la curva di fusione solido-liquido ha pendenza negativa?",
  options:[
    "Perché l'acqua, solidificando, diminuisce di volume, come la maggior parte delle sostanze",
    "È un errore di misura: in realtà la curva di fusione ha sempre pendenza positiva",
    "Perché l'acqua, solidificando, aumenta di volume: un aumento di pressione favorisce quindi il passaggio da solido a liquido",
    "Perché il ghiaccio risulta sempre più denso dell'acqua liquida da cui proviene",
    "Perché l'acqua, a differenza della maggior parte delle sostanze, non possiede un punto triplo"], correct:2 },

{ id:"liq-13", topic:"liquido", type:"mc",
  q:"Nel diagramma di fase della $CO_2$, un aumento di pressione (in prossimità della curva di fusione) favorisce:",
  options:[
    "La sublimazione diretta dallo stato solido allo stato gassoso",
    "Il passaggio da solido a liquido, come nell'acqua",
    "La formazione di fluido supercritico indipendentemente dalla temperatura",
    "Il passaggio da liquido a solido, poiché la curva di fusione ha pendenza positiva",
    "Nessun cambiamento di fase, poiché la $CO_2$ resta sempre gassosa"], correct:3 },

{ id:"liq-14", topic:"liquido", type:"mc",
  q:"Il punto critico dell'acqua si trova approssimativamente a:",
  options:[
    "31,1°C e 73 atm",
    "374,13°C e 217 atm",
    "100°C e 1 atm",
    "0,01°C e 0,006 atm",
    "-56,6°C e 5,1 atm"], correct:1 },

{ id:"liq-15", topic:"liquido", type:"mc",
  q:"La tensione superficiale di un liquido è dovuta al fatto che:",
  options:[
    "Le molecole all'interno del liquido sono più mobili di quelle in superficie, per effetto delle continue collisioni termiche",
    "Le molecole in superficie sono attratte maggiormente verso l'interno del liquido rispetto alla fase gassosa sovrastante",
    "La pressione di vapore risulta sempre nulla in prossimità della superficie, indipendentemente dalla temperatura del liquido",
    "Le molecole in superficie non subiscono alcuna forza intermolecolare netta, essendo isolate dal resto del liquido",
    "Il liquido perde continuamente massa evaporando dalla superficie esposta, fino a raggiungere l'equilibrio termodinamico"], correct:1 },

{ id:"liq-16", topic:"liquido", type:"mc",
  q:"L'effetto della tensione superficiale su un liquido è quello di:",
  options:[
    "Ridurre progressivamente a zero il volume complessivo del liquido",
    "Annullare completamente le forze di coesione tra le molecole del liquido",
    "Creare uno strato superficiale simile a un film elastico, che tende a contrarsi ed è difficile da penetrare",
    "Espandere il più possibile la superficie del liquido, aumentandone l'area",
    "Aumentare notevolmente la comprimibilità del liquido sottoposto a pressione"], correct:2 },

{ id:"liq-17", topic:"liquido", type:"mc",
  q:"Perché i liquidi, a differenza dei gas, sono difficilmente comprimibili?",
  options:[
    "Perché le molecole di un liquido sono cariche elettricamente",
    "Perché i liquidi occupano tutto lo spazio disponibile",
    "Perché tra le molecole di un liquido c'è poco spazio vuoto",
    "Perché i liquidi hanno sempre densità minore dei gas",
    "Perché le molecole di un liquido non si muovono"], correct:2 },

{ id:"liq-18", topic:"liquido", type:"fill",
  q:"La temperatura alla quale la tensione di vapore di un liquido eguaglia la pressione esterna è detta temperatura di ________.",
  answer:"EBOLLIZIONE" },

{ id:"liq-19", topic:"liquido", type:"fill",
  q:"Il punto in cui, su un diagramma di fase, coesistono simultaneamente le fasi solida, liquida e gassosa è detto punto ________.",
  answer:"TRIPLO" },

{ id:"liq-20", topic:"liquido", type:"fill",
  q:"Oltre il punto critico, una sostanza si trova nello stato di fluido ________.",
  answer:"SUPERCRITICO" },

{ id:"liq-21", topic:"liquido", type:"fill",
  q:"La forza che si oppone all'aumento della superficie di un liquido, dovuta alla maggiore attrazione delle molecole superficiali verso l'interno, è detta ________ superficiale.",
  answer:"TENSIONE" },

{ id:"liq-22", topic:"liquido", type:"fill",
  q:"Il calore assorbito durante l'evaporazione del sudore produce un effetto di ________ sulla pelle.",
  answer:"RAFFREDDAMENTO" },

{ id:"liq-23", topic:"liquido", type:"fill",
  q:"Nel diagramma di fase dell'anidride carbonica, il punto triplo si trova a circa ________ °C.",
  answer:"-56,6", answerAlt:["-56,6°C","56,6 GRADI SOTTO ZERO"] },

{ id:"liq-24", topic:"liquido", type:"fill",
  q:"A differenza dei gas, i liquidi hanno un volume ________, indipendentemente dal recipiente che li contiene.",
  answer:"PROPRIO", answerAlt:["COSTANTE"] },

{ id:"liq-25", topic:"liquido", type:"fill",
  q:"Le molecole in un liquido occupano posizioni ________, pur essendo consentiti movimenti reciproci tra loro.",
  answer:"CASUALI" },

{ id:"liq-26", topic:"liquido", type:"mc",
  q:"Quantitativamente, la tensione superficiale (γ) di un liquido è definita come:",
  options:[
    "La viscosità del liquido, ovvero la sua resistenza interna allo scorrimento",
    "Il calore necessario, a temperatura costante, per vaporizzare un grammo di liquido",
    "Il rapporto tra la massa e il volume occupato dal liquido, cioè la densità, espressa in g/cm³",
    "La pressione esercitata dal vapore quando è in equilibrio con il liquido sottostante",
    "Il rapporto tra la forza F e la lunghezza L lungo cui agisce (equivalente all'energia per unità di superficie), $\\gamma=F/L$"], correct:4 },

{ id:"liq-27", topic:"liquido", type:"mc",
  q:"Le molecole tensioattive (surfattanti), come quelle del sapone, sono molecole anfipatiche che abbassano la tensione superficiale dell'acqua perché:",
  options:[
    "Aumentano ulteriormente la coesione tra le molecole d'acqua in superficie",
    "Reagiscono chimicamente con l'acqua formando un nuovo composto",
    "Non hanno alcun effetto misurabile sulla superficie del liquido acquoso",
    "Aumentano sensibilmente la viscosità del liquido in cui sono disciolti",
    "Si dispongono in superficie interrompendo la rete di legami idrogeno tra le molecole d'acqua"], correct:4 },

{ id:"liq-28", topic:"liquido", type:"mc",
  q:"La capillarità, cioè la risalita (o discesa) di un liquido in un tubo sottile, dipende dal bilancio tra:",
  options:[
    "Il calore latente di vaporizzazione del liquido considerato",
    "La sola pressione atmosferica esercitata sulla superficie del liquido",
    "La densità del liquido e l'accelerazione di gravità soltanto",
    "Le forze di coesione (liquido-liquido) e le forze di adesione (liquido-parete)",
    "La sola temperatura a cui si trova il liquido nel capillare"], correct:3 },

{ id:"liq-29", topic:"liquido", type:"mc",
  q:"Se l'adesione (liquido-parete) è maggiore della coesione (liquido-liquido), come nel caso dell'acqua in un tubo di vetro, il liquido:",
  options:[
    "Bagna la parete, risale nel capillare e forma un menisco concavo",
    "È respinto dalla parete e forma un menisco convesso",
    "Non risale né scende nel capillare, restando fermo al livello esterno",
    "Forma un menisco piatto, senza curvatura apprezzabile in superficie",
    "Evapora immediatamente non appena entra in contatto con la parete"], correct:0 },

{ id:"liq-30", topic:"liquido", type:"mc",
  q:"Nel caso del mercurio in un tubo di vetro, dove la coesione supera l'adesione, il liquido:",
  options:[
    "Risale indefinitamente nel capillare, superando il livello esterno",
    "Si comporta esattamente come l'acqua, bagnando la parete del vetro",
    "Bagna la parete del capillare e forma un menisco concavo, come l'acqua",
    "Non risente affatto della presenza della parete del tubo capillare",
    "È respinto dalla parete, forma un menisco convesso e scende rispetto al livello esterno"], correct:4 },

{ id:"liq-31", topic:"liquido", type:"mc",
  q:"La relazione tra la tensione di vapore di un liquido e la temperatura, descritta dall'equazione di Clausius-Clapeyron, è di tipo:",
  options:[
    "Indipendente dalla temperatura: la tensione di vapore resta sempre costante",
    "Lineare: la tensione di vapore aumenta in proporzione diretta alla temperatura",
    "Esponenziale: un piccolo aumento di temperatura provoca un aumento molto più che proporzionale della tensione di vapore",
    "Quadratica: la tensione di vapore cresce col quadrato della temperatura assoluta",
    "Inversamente proporzionale alla temperatura assoluta del liquido considerato"], correct:2 },

{ id:"liq-32", topic:"liquido", type:"mc",
  q:"La tensione di vapore di un liquido, a una data temperatura, NON dipende da:",
  options:[
    "Nessuna delle precedenti: la tensione di vapore dipende da tutti questi fattori",
    "La temperatura assoluta del sistema, che è invece un fattore determinante",
    "La quantità di liquido presente nel recipiente (né dal volume del recipiente, finché c'è equilibrio liquido-vapore)",
    "La natura chimica della sostanza che costituisce il liquido, poiché molecole diverse hanno interazioni intermolecolari diverse",
    "La forza delle interazioni intermolecolari presenti nel liquido stesso"], correct:2,
  explain:"La tensione di vapore è una proprietà intensiva: dipende solo dalla temperatura e dalla natura chimica della sostanza, non dalla quantità di liquido presente." },

{ id:"liq-33", topic:"liquido", type:"mc",
  q:"Un liquido si definisce 'volatile' quando, a temperatura ambiente, presenta:",
  options:[
    "Un'elevata tensione di vapore, dovuta a forze intermolecolari deboli (es. etere dietilico, acetone)",
    "Un punto di ebollizione molto alto, dovuto a forze intermolecolari intense",
    "Una viscosità molto elevata, che ne rallenta lo scorrimento a temperatura ambiente",
    "Una densità molto alta rispetto alla maggior parte dei liquidi comuni",
    "Una bassissima tensione di vapore, tipica dei liquidi poco volatili come il glicerolo"], correct:0 },

{ id:"liq-34", topic:"liquido", type:"mc",
  q:"Tra i fattori che determinano il punto di ebollizione di una sostanza, quello che 'domina su tutto' quando presente è:",
  options:[
    "Il colore della sostanza, percepibile solo se assorbe luce visibile",
    "La sola pressione esterna esercitata sul liquido in ebollizione",
    "La sola massa molecolare, a prescindere dal tipo di forze intermolecolari",
    "La sola forma della molecola, lineare o ramificata che sia",
    "La presenza del legame a idrogeno (F, O o N legati direttamente a H)"], correct:4 },

{ id:"liq-35", topic:"liquido", type:"mc",
  q:"A parità di tipo di forze intermolecolari, tra due molecole di massa diversa, quella più pesante ha generalmente:",
  options:[
    "Nessuna relazione prevedibile con il punto di ebollizione",
    "Lo stesso punto di ebollizione, indipendentemente dalla massa",
    "Un punto di ebollizione più basso, nonostante la maggiore massa molecolare",
    "Un punto di ebollizione più alto, per la maggiore forza di dispersione di London",
    "Una tensione di vapore più alta, per le più deboli forze intermolecolari"], correct:3 },

{ id:"liq-36", topic:"liquido", type:"mc",
  q:"A parità di formula e massa molecolare, una molecola allungata rispetto a una compatta (sferica) presenta generalmente:",
  options:[
    "Nessuna differenza apprezzabile nelle proprietà fisiche rispetto alla forma compatta",
    "Un punto di ebollizione più basso, per la minore superficie di contatto disponibile",
    "Un punto di ebollizione più alto, per la maggiore superficie di contatto disponibile per le interazioni di London",
    "La stessa tensione di vapore della molecola compatta, a parità di temperatura",
    "Una minore massa molecolare rispetto alla corrispondente molecola compatta"], correct:2 },

{ id:"liq-37", topic:"liquido", type:"fill",
  q:"Le molecole anfipatiche come il sapone, che abbassano la tensione superficiale dell'acqua interrompendo i legami idrogeno in superficie, si chiamano tensioattivi o ________.",
  answer:"SURFATTANTI" },

{ id:"liq-38", topic:"liquido", type:"fill",
  q:"Nella capillarità, quando il liquido bagna la parete del tubo (adesione maggiore della coesione), si forma un menisco ________.",
  answer:"CONCAVO" },

/* ============================= TERMODINAMICA ============================= */

{ id:"term-01", topic:"termodinamica", type:"mc",
  q:"Un sistema chiuso:",
  options:[
    "Nessuna delle precedenti",
    "Può scambiare calore e materia con l'ambiente",
    "Può scambiare solo calore (energia) con l'ambiente",
    "Può scambiare solo materia con l'ambiente",
    "Non può scambiare calore e materia con l'ambiente"], correct:2 },

{ id:"term-02", topic:"termodinamica", type:"mc",
  q:"A 37°C, una reazione con $\\Delta H = -10\\text{ kJ/mol}$ e $\\Delta S = -0{,}05\\text{ kJ/mol}\\cdot\\text{K}$ è definita:",
  options:[
    "All'equilibrio",
    "Spontanea",
    "Esoergonica",
    "Endotermica",
    "Endoergonica"], correct:4,
  explain:"$\\Delta G = \\Delta H - T\\Delta S = -10 - (310{,}15)(-0{,}05) \\approx -10 + 15{,}5 = +5{,}5\\text{ kJ/mol} > 0$ → reazione endoergonica (non spontanea)." },

{ id:"term-03", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione spontanea è esotermica?",
  options:[
    "$\\Delta S > 0$",
    "$\\Delta S < 0$",
    "$\\Delta G > 0$",
    "$\\Delta H < 0$",
    "$\\Delta H > 0$"], correct:3 },

{ id:"term-04", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione spontanea è endotermica?",
  options:[
    "$\\Delta H > 0$",
    "$\\Delta H < 0$",
    "$\\Delta S > 0$",
    "$\\Delta G > 0$",
    "$\\Delta S < 0$"], correct:0 },

{ id:"term-05", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione spontanea è entropicamente favorita?",
  options:[
    "$\\Delta S < 0$",
    "$\\Delta G > 0$",
    "$\\Delta H < 0$",
    "$\\Delta S > 0$",
    "$\\Delta H > 0$"], correct:3 },

{ id:"term-06", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione è esoergonica?",
  options:[
    "$\\Delta G < 0$",
    "$\\Delta G = 0$",
    "$\\Delta G > 0$",
    "$\\Delta H < 0$",
    "$\\Delta H > 0$"], correct:0 },

{ id:"term-07", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione è endoergonica?",
  options:[
    "$\\Delta G < 0$",
    "$\\Delta H < 0$",
    "$\\Delta H > 0$",
    "$\\Delta G = 0$",
    "$\\Delta G > 0$"], correct:4 },

{ id:"term-08", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione è all'equilibrio?",
  options:[
    "$\\Delta H < 0$",
    "$\\Delta G = 0$",
    "$\\Delta G > 0$",
    "$\\Delta H > 0$",
    "$\\Delta G < 0$"], correct:1 },

{ id:"term-09", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti coppie di relazioni caratterizza con certezza una reazione spontanea a qualunque temperatura $T > 0$?",
  options:[
    "$\\Delta H<0;\\ \\Delta S>0$",
    "$\\Delta H=0;\\ \\Delta S<0$",
    "$\\Delta H>0;\\ \\Delta S>0$",
    "$\\Delta H<0;\\ \\Delta S<0$",
    "$\\Delta H>0;\\ \\Delta S=0$"], correct:0,
  explain:"Con $\\Delta H<0$ e $\\Delta S>0$, $\\Delta G=\\Delta H-T\\Delta S$ è sempre negativo per qualunque $T>0$: la reazione è spontanea a tutte le temperature." },

{ id:"term-10", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti coppie di valori indica una reazione spontanea a $T=300\\text{ K}$?",
  options:[
    "$\\Delta H=+30\\text{ kJ/mol};\\ \\Delta S=0$",
    "$\\Delta H=+30\\text{ kJ/mol};\\ \\Delta S=+0{,}1\\text{ kJ/mol}\\cdot\\text{K}$",
    "$\\Delta H=0;\\ \\Delta S=-0{,}1\\text{ kJ/mol}\\cdot\\text{K}$",
    "$\\Delta H=-30\\text{ kJ/mol};\\ \\Delta S=-0{,}1\\text{ kJ/mol}\\cdot\\text{K}$",
    "$\\Delta H=-30\\text{ kJ/mol};\\ \\Delta S=+0{,}1\\text{ kJ/mol}\\cdot\\text{K}$"], correct:4,
  explain:"$\\Delta G = \\Delta H - T\\Delta S = -30 - 300\\times 0{,}1 = -60\\text{ kJ/mol} < 0$ → spontanea. Le altre opzioni danno $\\Delta G \\ge 0$." },

{ id:"term-11", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti affermazioni è ERRATA rispetto al I principio della termodinamica (cioè lo contraddice)?",
  options:[
    "L'energia non può essere né creata né distrutta, ma solo trasformata",
    "L'energia può trasformarsi da una forma all'altra senza che la somma totale cambi",
    "La quantità totale di energia presente nell'universo rimane sempre costante nel tempo",
    "La trasformazione dell'energia da una forma all'altra determina un aumento dell'energia totale dell'universo",
    "In un sistema isolato la somma delle energie rimane invariata nel tempo"], correct:3,
  explain:"Il I principio (conservazione dell'energia) afferma che l'energia totale di un sistema isolato/dell'universo resta costante: non può quindi 'aumentare' semplicemente trasformandosi da una forma all'altra. Questa domanda riguarda il I principio, non il II (che riguarda invece l'aumento di entropia, non di energia — vedi la domanda successiva)." },

{ id:"term-12", topic:"termodinamica", type:"mc",
  q:"Un sistema si definisce aperto se scambia con l'esterno:",
  options:[
    "Materia ma non energia",
    "Solo calore ma non lavoro",
    "Energia ma non materia",
    "Sia materia che energia",
    "Solo calore e lavoro"], correct:3 },

{ id:"term-13", topic:"termodinamica", type:"mc",
  q:"Un sistema si definisce chiuso se scambia con l'esterno:",
  options:[
    "Sia materia che energia",
    "Materia ma non energia",
    "Solo calore ma non lavoro",
    "Energia ma non materia",
    "Solo calore e lavoro"], correct:3 },

{ id:"term-14", topic:"termodinamica", type:"mc",
  q:"Una \"funzione di stato\":",
  options:[
    "Si conserva in qualunque trasformazione termodinamica",
    "Dipende direttamente dal tempo di evoluzione del sistema",
    "Varia a seconda del percorso seguito dal sistema",
    "Dipende solo dallo stato iniziale e finale, indipendentemente dal cammino seguito",
    "Descrive solo i sistemi isolati e non quelli aperti o chiusi"], correct:3 },

{ id:"term-15", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti affermazioni è coerente con il secondo principio della termodinamica?",
  options:[
    "L'entropia dell'universo è zero allo zero assoluto",
    "La somma delle energie dell'universo è zero",
    "L'energia non può essere né creata né distrutta, ma solo trasformata",
    "Le reazioni entropicamente favorite hanno una $\\Delta S > 0$",
    "La somma delle energie dell'universo è costante"], correct:3,
  explain:"Il II principio riguarda l'aumento di entropia nei processi spontanei: una reazione entropicamente favorita ha, per definizione, $\\Delta S>0$. Le opzioni A e C descrivono invece il I principio." },

{ id:"term-16", topic:"termodinamica", type:"mc",
  q:"Indicare la risposta NON corretta:",
  options:[
    "Una diminuzione del disordine di un sistema corrisponde a una variazione negativa dell'entropia",
    "L'entropia è il rapporto tra il calore scambiato $Q$ e la temperatura $T$ ($\\Delta S = Q/T$)",
    "Un aumento del disordine di un sistema corrisponde a una variazione negativa dell'entropia",
    "L'entropia è legata al concetto di disordine del sistema",
    "Un aumento del disordine di un sistema corrisponde a una variazione positiva dell'entropia"], correct:2 },

{ id:"term-17", topic:"termodinamica", type:"mc",
  q:"L'entalpia ($H$) di un sistema è definita come:",
  options:[
    "La somma dell'energia cinetica e potenziale",
    "Una funzione che dipende esclusivamente dal calore specifico",
    "La differenza tra energia interna e lavoro compiuto dal sistema",
    "La misura dell'energia cinetica media delle molecole",
    "La quantità di calore scambiata in una trasformazione"], correct:4 },

{ id:"term-18", topic:"termodinamica", type:"mc",
  q:"Una reazione si dice esotermica se:",
  options:[
    "Procede sempre spontaneamente",
    "È accompagnata da assorbimento di calore",
    "L'entalpia dei prodotti è uguale a quella dei reagenti",
    "Si svolge senza assorbimento né emissione di calore",
    "È accompagnata da sviluppo (rilascio) di calore"], correct:4 },

{ id:"term-19", topic:"termodinamica", type:"mc",
  q:"La variazione di entropia per un processo non dipende dal percorso attraverso il quale il processo avviene. L'entropia è quindi una funzione:",
  options:[
    "Di stato",
    "Negativa",
    "Variabile",
    "Costante",
    "Positiva"], correct:0 },

{ id:"term-20", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti è l'unità di misura dell'energia nel Sistema Internazionale?",
  options:[
    "L'atmosfera",
    "La mole",
    "La caloria",
    "Il joule",
    "Il kelvin"], correct:3 },

{ id:"term-21", topic:"termodinamica", type:"mc",
  q:"A quanti joule corrisponde una caloria?",
  options:[
    "22,4 J",
    "0,0821 J",
    "4,184 J",
    "1 J",
    "273,15 J"], correct:2 },

{ id:"term-22", topic:"termodinamica", type:"fill",
  q:"Una reazione è detta ________ se rilascia calore all'ambiente.",
  answer:"ESOTERMICA" },

{ id:"term-23", topic:"termodinamica", type:"fill",
  q:"Il ________ è la temperatura alla quale un solido diventa liquido.",
  answer:"PUNTO DI FUSIONE", answerAlt:["PUNTO FUSIONE"] },

{ id:"term-24", topic:"termodinamica", type:"fill",
  q:"La ________ è un cambiamento fisico da solido a liquido.",
  answer:"FUSIONE" },

{ id:"term-25", topic:"termodinamica", type:"fill",
  q:"Una reazione ________ è una reazione che può procedere in entrambe le direzioni, formando un equilibrio tra reagenti e prodotti.",
  answer:"REVERSIBILE" },

{ id:"term-26", topic:"termodinamica", type:"fill",
  q:"Una reazione è detta ________ se assorbe calore dall'ambiente.",
  answer:"ENDOTERMICA" },

{ id:"term-27", topic:"termodinamica", type:"fill",
  q:"L'energia ________ aumenta all'aumentare della temperatura, favorendo la dispersione delle molecole.",
  answer:"CINETICA" },

{ id:"term-28", topic:"termodinamica", type:"fill",
  q:"Un sistema ________ non scambia né energia né materia con l'ambiente esterno.",
  answer:"ISOLATO" },

{ id:"term-29", topic:"termodinamica", type:"fill",
  q:"La variazione di ________ (di Gibbs) determina la spontaneità di un processo.",
  answer:"ENERGIA LIBERA", answerAlt:["ENERGIA LIBERA DI GIBBS","G"] },

{ id:"term-30", topic:"termodinamica", type:"fill",
  q:"Il ________ è energia trasferita tra sistemi a causa di una differenza di temperatura.",
  answer:"CALORE" },

/* =========================================================================
   FISICA
   ========================================================================= */

/* ============================= UNITÀ DI MISURA E GRANDEZZE FISICHE ============================= */

{ id:"mis-01", topic:"misure", type:"mc",
  q:"La grandezza fisica energia cinetica di un corpo si misura in:",
  options:[
    "$\\text{m/s}^2$",
    "watt",
    "$\\text{kg/s}^2$",
    "joule",
    "N/m"], correct:3,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). L'energia cinetica, come ogni forma di energia, si misura in joule nel Sistema Internazionale." },

{ id:"mis-02", topic:"misure", type:"mc",
  q:"Un volume di $10\\text{ dm}^3$ corrisponde a:",
  options:[
    "10 millilitri",
    "10 litri",
    "100 millilitri",
    "100 litri",
    "1 litro"], correct:1,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). $1\\text{ dm}^3 = 1$ litro, quindi $10\\text{ dm}^3 = 10$ litri." },

{ id:"mis-03", topic:"misure", type:"mc",
  q:"Quale delle seguenti affermazioni è corretta?",
  options:[
    "$10^{-9}\\text{ km} = 1\\text{ cm}$",
    "$10^{-9}\\text{ km} = 1\\text{ mm}$",
    "$10^{-9}\\text{ km} = 1\\text{ dm}$",
    "$10^{-9}\\text{ km} = 1\\text{ nm}$",
    "$10^{-9}\\text{ km} = 1\\ \\mu\\text{m}$"], correct:4,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello). $10^{-9}\\text{ km} = 10^{-9}\\times 1000\\text{ m} = 10^{-6}\\text{ m} = 1\\ \\mu\\text{m}$." },

{ id:"mis-04", topic:"misure", type:"mc",
  q:"Quali sono le dimensioni fisiche di una forza nel Sistema Internazionale?",
  options:[
    "$[M][L][T]^{-2}$",
    "$[M][L][T]^{-1}$",
    "$[M][L][T]$",
    "$[L][T]^{-2}$",
    "$[M][L]^2[T]^{-2}$"], correct:0,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello). Da $F = ma$: $[M]\\times[L][T]^{-2} = [M][L][T]^{-2}$." },

{ id:"mis-05", topic:"misure", type:"mc",
  q:"Quale delle seguenti NON è una grandezza fondamentale del Sistema Internazionale?",
  options:[
    "Forza",
    "Massa",
    "Lunghezza",
    "Temperatura",
    "Tempo"], correct:0,
  explain:"La forza è una grandezza derivata ($F = ma$), non una delle sette grandezze fondamentali del SI." },

{ id:"mis-06", topic:"misure", type:"mc",
  q:"L'unità di misura della pressione nel Sistema Internazionale è:",
  options:[
    "Il pascal",
    "Il newton",
    "L'atmosfera",
    "Il watt",
    "Il joule"], correct:0 },

{ id:"mis-07", topic:"misure", type:"mc",
  q:"Quale delle seguenti è una grandezza derivata (non fondamentale) nel Sistema Internazionale?",
  options:[
    "Il tempo",
    "La massa",
    "La temperatura",
    "La lunghezza",
    "La velocità"], correct:4,
  explain:"La velocità si ottiene dal rapporto tra una lunghezza e un tempo, quindi è una grandezza derivata." },

{ id:"mis-08", topic:"misure", type:"mc",
  q:"Il prefisso \"nano\" (n) indica un fattore moltiplicativo pari a:",
  options:[
    "$10^3$",
    "$10^9$",
    "$10^6$",
    "$10^{-3}$",
    "$10^{-9}$"], correct:4 },

{ id:"mis-09", topic:"misure", type:"mc",
  q:"Il prefisso \"mega\" (M) indica un fattore moltiplicativo pari a:",
  options:[
    "$10^3$",
    "$10^9$",
    "$10^{-6}$",
    "$10^6$",
    "$10^{-3}$"], correct:3 },

{ id:"mis-10", topic:"misure", type:"mc",
  q:"Una misura si dice diretta quando:",
  options:[
    "Si ricava esclusivamente tramite un calcolo matematico a partire da altre grandezze misurate direttamente",
    "Si ottiene confrontando la grandezza con un campione di tipo diverso, dopo un'opportuna conversione di unità",
    "Si ottiene confrontando direttamente la grandezza con un campione dello stesso tipo (es. una lunghezza con un righello)",
    "È per definizione meno precisa di qualsiasi misura indiretta della stessa grandezza",
    "Si ottiene esclusivamente utilizzando uno strumento di misura elettronico digitale"], correct:2 },

{ id:"mis-11", topic:"misure", type:"mc",
  q:"Una misura si dice indiretta quando:",
  options:[
    "Si ottiene sempre confrontando direttamente la grandezza con un campione dello stesso tipo",
    "È indipendente dallo strumento di misura utilizzato per le grandezze di partenza",
    "Si ottiene tramite calcolo a partire da altre grandezze misurate direttamente",
    "Si ottiene con un solo strumento tarato, senza eseguire alcun calcolo",
    "Coincide sempre con il risultato di una misura diretta dello stesso fenomeno"], correct:2,
  explain:"Ad esempio, la velocità media è una misura indiretta: si calcola a partire dalle misure dirette di spazio e tempo." },

{ id:"mis-12", topic:"misure", type:"mc",
  q:"L'analisi dimensionale di una formula fisica serve a:",
  options:[
    "Calcolare il valore numerico esatto di una grandezza fisica incognita",
    "Stabilire quale strumento di misura sia più adatto per una grandezza",
    "Eliminare la necessità di indicare le unità di misura nel risultato finale",
    "Sostituire completamente la misura sperimentale di una grandezza fisica",
    "Verificare che i due membri di un'equazione abbiano le stesse dimensioni fisiche"], correct:4 },

{ id:"mis-13", topic:"misure", type:"mc",
  q:"Quante sono le grandezze fondamentali del Sistema Internazionale?",
  options:[
    "9",
    "6",
    "7",
    "5",
    "4"], correct:2,
  explain:"Le sette grandezze fondamentali sono: lunghezza, massa, tempo, corrente elettrica, temperatura, quantità di sostanza, intensità luminosa." },

{ id:"mis-14", topic:"misure", type:"mc",
  q:"L'unità di misura dell'energia nel Sistema Internazionale è:",
  options:[
    "Il joule",
    "Il newton",
    "Il watt",
    "Il pascal",
    "La caloria"], correct:0 },

{ id:"mis-15", topic:"misure", type:"fill",
  q:"Una velocità di 30 m/s espressa in km/h vale ________.",
  answer:"108" },

{ id:"mis-16", topic:"misure", type:"fill",
  q:"Sapendo che 1 metro equivale a 100 centimetri, un'accelerazione di $320\\text{ cm/s}^2$ corrisponde a ________ $\\text{m/s}^2$ nel Sistema Internazionale.",
  answer:"3,2", answerAlt:["3.2"] },

{ id:"mis-17", topic:"misure", type:"fill",
  q:"Per convertire un valore da pascal a nanopascal, si moltiplica il valore in pascal per 10 elevato alla potenza di ________.",
  answer:"9" },

{ id:"mis-18", topic:"misure", type:"fill",
  q:"Un elettrone si sposta tra due punti di un campo elettrico tra i quali esiste una differenza di potenziale di $3\\times 10^4$ volt. La variazione di energia dell'elettrone è pari a ________ keV.",
  answer:"30" },

{ id:"mis-19", topic:"misure", type:"fill",
  q:"In $1\\text{ mm}^3$ di sangue sono disciolti 4 µg di una proteina. In 1 litro ne saranno disciolti ________ g.",
  answer:"4",
  explain:"$1\\text{ litro} = 10^6\\text{ mm}^3$, quindi $4\\ \\mu\\text{g/mm}^3 \\times 10^6\\text{ mm}^3 = 4\\times 10^6\\ \\mu\\text{g} = 4\\text{ g}$." },

{ id:"mis-20", topic:"misure", type:"fill",
  q:"Il Sistema Internazionale di unità di misura si basa su ________ grandezze fondamentali.",
  answer:"SETTE", answerAlt:["7"] },

{ id:"mis-21", topic:"misure", type:"mc",
  q:"Il prodotto scalare di due vettori $\\vec{A}$ e $\\vec{B}$ è definito come:",
  options:[
    "Un vettore perpendicolare al piano di A e B, con modulo $AB\\sin\\theta$",
    "$\\vec{A}\\cdot\\vec{B}=AB\\cos\\theta$, con θ l'angolo compreso tra i due vettori",
    "$\\vec{A}\\cdot\\vec{B}=AB\\sin\\theta$, con θ l'angolo tra i due vettori",
    "Sempre uguale a zero, indipendentemente dall'angolo tra i vettori",
    "La somma algebrica dei moduli di A e B, $\\vec{A}\\cdot\\vec{B}=A+B$"], correct:1 },

{ id:"mis-22", topic:"misure", type:"mc",
  q:"Il prodotto scalare di due vettori restituisce come risultato:",
  options:[
    "Sempre un numero negativo",
    "Un vettore perpendicolare ai due vettori di partenza",
    "Una grandezza priva di significato fisico",
    "Un vettore parallelo a entrambi",
    "Una grandezza scalare"], correct:4 },

{ id:"mis-23", topic:"misure", type:"mc",
  q:"Se due vettori sono perpendicolari tra loro (θ = 90°), il loro prodotto scalare vale:",
  options:[
    "Il prodotto dei loro moduli",
    "Non è calcolabile",
    "Zero",
    "Il quadrato del modulo maggiore",
    "La somma dei loro moduli"], correct:2 },

{ id:"mis-24", topic:"misure", type:"mc",
  q:"Il prodotto scalare di un vettore per se stesso, $\\vec{A}\\cdot\\vec{A}$, è uguale a:",
  options:[
    "Il doppio del modulo del vettore",
    "Un vettore nullo",
    "Il quadrato del modulo del vettore, $A^2$",
    "Il modulo del vettore, senza elevamento al quadrato",
    "Zero sempre"], correct:2 },

{ id:"mis-25", topic:"misure", type:"mc",
  q:"Il prodotto vettoriale di due vettori $\\vec{A}$ e $\\vec{B}$ ha modulo:",
  options:[
    "Indipendente dall'angolo formato dai due vettori, poiché dipende solo dai moduli",
    "Uguale alla somma dei moduli di A e B, indipendentemente dall'angolo tra loro",
    "Sempre massimo, qualunque sia l'angolo θ compreso tra i due vettori",
    "$|\\vec{A}\\times\\vec{B}|=AB\\sin\\theta$, con θ l'angolo compreso tra i due vettori",
    "$|\\vec{A}\\times\\vec{B}|=AB\\cos\\theta$, con θ l'angolo compreso tra i due vettori"], correct:3 },

{ id:"mis-26", topic:"misure", type:"mc",
  q:"A differenza del prodotto scalare, il risultato del prodotto vettoriale $\\vec{A}\\times\\vec{B}$ è:",
  options:[
    "Uno scalare privo di direzione e verso, proprio come il risultato del prodotto scalare",
    "Un vettore, perpendicolare al piano individuato da A e B, con verso dato dalla regola della mano destra",
    "Sempre nullo, indipendentemente dall'angolo formato dai due vettori",
    "Numericamente identico al risultato del prodotto scalare $\\vec{A}\\cdot\\vec{B}$",
    "Un vettore diretto lungo la bisettrice dell'angolo formato da A e B"], correct:1 },

{ id:"mis-27", topic:"misure", type:"mc",
  q:"Se due vettori sono paralleli (θ = 0° oppure 180°), il loro prodotto vettoriale è:",
  options:[
    "Massimo in modulo, perché $\\sin 90° = 1$",
    "Uguale al prodotto scalare $\\vec{A}\\cdot\\vec{B}$",
    "Il vettore nullo, perché $\\sin 0° = \\sin 180° = 0$",
    "Sempre diretto lungo l'asse z, per convenzione",
    "Pari alla somma dei moduli dei due vettori"], correct:2 },

{ id:"mis-28", topic:"misure", type:"mc",
  q:"Invertendo l'ordine dei fattori nel prodotto vettoriale, cioè calcolando $\\vec{B}\\times\\vec{A}$ invece di $\\vec{A}\\times\\vec{B}$:",
  options:[
    "L'operazione non è definita, perché il prodotto vettoriale non è invertibile",
    "Si ottiene un vettore di uguale modulo ma verso opposto: il prodotto vettoriale è anticommutativo",
    "Si ottiene esattamente lo stesso vettore, perché il prodotto vettoriale è commutativo",
    "Il risultato diventa uno scalare, uguale al prodotto $\\vec{A}\\cdot\\vec{B}$",
    "Il modulo del vettore risultante raddoppia rispetto al prodotto originale"], correct:1 },

{ id:"mis-29", topic:"misure", type:"fill",
  q:"Il prodotto tra due vettori che restituisce come risultato una grandezza scalare, pari a $AB\\cos\\theta$, si chiama prodotto ________.",
  answer:"SCALARE" },

{ id:"mis-30", topic:"misure", type:"fill",
  q:"Il prodotto tra due vettori che restituisce come risultato un vettore perpendicolare al piano dei due vettori di partenza si chiama prodotto ________.",
  answer:"VETTORIALE" },

/* ============================= CINEMATICA ============================= */

{ id:"cin-01", topic:"cinematica", type:"mc",
  q:"La cinematica è la branca della meccanica che studia:",
  options:[
    "La trasformazione e la conservazione dell'energia nei sistemi meccanici",
    "Il movimento dei corpi analizzandone le caratteristiche, senza occuparsi delle cause",
    "Le forze applicate a un corpo e gli effetti che esse producono sul suo moto",
    "Le cause del moto dei corpi, cioè le forze e le masse che lo determinano",
    "L'equilibrio dei corpi soggetti a forze esterne, quando restano fermi"], correct:1 },

{ id:"cin-02", topic:"cinematica", type:"mc",
  q:"La traiettoria di un punto materiale è definita come:",
  options:[
    "La velocità media con cui il punto materiale si sposta nel tempo",
    "La variazione di velocità subita dal punto materiale nel tempo",
    "L'insieme dei punti dello spazio occupati dal punto materiale durante il suo moto",
    "Il tempo complessivo impiegato dal punto per percorrere un tragitto",
    "La distanza totale percorsa dal punto materiale in un dato intervallo di tempo"], correct:2 },

{ id:"cin-03", topic:"cinematica", type:"mc",
  q:"Quando la traiettoria di un punto materiale è una retta, il moto si definisce:",
  options:[
    "Rettilineo",
    "Curvilineo",
    "Parabolico",
    "Circolare",
    "Armonico"], correct:0 },

{ id:"cin-04", topic:"cinematica", type:"mc",
  q:"Il sistema di riferimento, in cinematica, è definito come:",
  options:[
    "La grandezza vettoriale che misura la variazione di velocità di un corpo",
    "Un luogo fisico rispetto al quale sono effettuate le misure delle grandezze cinematiche",
    "L'insieme dei punti occupati dal corpo durante il suo moto nello spazio",
    "Un particolare tipo di moto caratterizzato da accelerazione costante",
    "La velocità del corpo calcolata in un singolo istante di tempo"], correct:1 },

{ id:"cin-05", topic:"cinematica", type:"mc",
  q:"La relazione che lega la posizione di un corpo al tempo è detta:",
  options:[
    "Tensione superficiale",
    "Accelerazione media",
    "Traiettoria",
    "Legge oraria del moto",
    "Sistema di riferimento"], correct:3 },

{ id:"cin-06", topic:"cinematica", type:"mc",
  q:"La velocità media è definita come:",
  options:[
    "Il rapporto tra la variazione di velocità $\\Delta v$ e l'intervallo di tempo $\\Delta t$",
    "Il prodotto tra lo spazio percorso $\\Delta s$ e il tempo impiegato $\\Delta t$",
    "Il rapporto tra l'intervallo di tempo $\\Delta t$ e lo spazio percorso $\\Delta s$",
    "Il rapporto tra lo spazio percorso $\\Delta s$ e l'intervallo di tempo $\\Delta t$ in cui è stato percorso",
    "Il rapporto tra l'accelerazione $a$ e l'intervallo di tempo $\\Delta t$"], correct:3 },

{ id:"cin-07", topic:"cinematica", type:"mc",
  q:"Per convertire una velocità da m/s a km/h occorre:",
  options:[
    "Moltiplicare per 10",
    "Dividere per 10",
    "Dividere per 3,6",
    "Moltiplicare per 1000",
    "Moltiplicare per 3,6"], correct:4 },

{ id:"cin-09", topic:"cinematica", type:"mc",
  q:"Il moto rettilineo uniforme è caratterizzato da:",
  options:[
    "Assenza di ogni spostamento nel tempo, cioè corpo fermo",
    "Velocità media costante lungo un'unica dimensione",
    "Un'accelerazione costante e diversa da zero",
    "Una velocità che aumenta linearmente nel tempo",
    "Una traiettoria circolare percorsa a velocità costante"], correct:1 },

{ id:"cin-10", topic:"cinematica", type:"mc",
  q:"Nella legge oraria del moto rettilineo uniforme $s = s_0 + vt$, il termine $s_0$ rappresenta:",
  options:[
    "Il tempo trascorso dall'inizio del moto",
    "L'accelerazione costante del corpo",
    "La velocità iniziale del corpo",
    "Lo spazio iniziale percorso dal corpo",
    "Lo spazio totale percorso durante il moto"], correct:3 },

{ id:"cin-11", topic:"cinematica", type:"mc",
  q:"Il grafico spazio-tempo del moto rettilineo uniforme è rappresentato da:",
  options:[
    "Una retta orizzontale, poiché la posizione non cambia nel tempo",
    "Una circonferenza, tipica di un moto con traiettoria curva",
    "Una curva esponenziale, che indica una crescita accelerata",
    "Una parabola, tipica del moto uniformemente accelerato",
    "Una retta il cui coefficiente angolare coincide con la velocità"], correct:4 },

{ id:"cin-12", topic:"cinematica", type:"mc",
  q:"L'accelerazione media è definita come:",
  options:[
    "Il prodotto tra la forza applicata $F$ e l'intervallo di tempo $\\Delta t$ in cui agisce",
    "Il rapporto tra la variazione di velocità $\\Delta v$ e l'intervallo di tempo $\\Delta t$ in cui avviene",
    "Il prodotto tra la velocità $v$ e il tempo $\\Delta t$ impiegato per raggiungerla",
    "Il rapporto tra la variazione di posizione $\\Delta x$ e l'intervallo di tempo $\\Delta t$",
    "Il rapporto tra la velocità istantanea $v$ e la distanza percorsa $\\Delta s$"], correct:1 },

{ id:"cin-13", topic:"cinematica", type:"mc",
  q:"L'unità di misura dell'accelerazione nel Sistema Internazionale è:",
  options:[
    "m/s",
    "$\\text{m}^2\\text{/s}$",
    "N/kg",
    "km/h",
    "$\\text{m/s}^2$"], correct:4 },

{ id:"cin-14", topic:"cinematica", type:"mc",
  q:"Un moto rettilineo si definisce uniformemente accelerato se:",
  options:[
    "Il corpo rimane fermo per tutto l'intervallo di tempo considerato",
    "L'accelerazione media risulta costante in tutto l'intervallo di tempo considerato",
    "La velocità del corpo rimane sempre nulla durante il moto",
    "La traiettoria descritta dal corpo è sempre una parabola",
    "L'accelerazione varia in modo continuo durante tutto il moto"], correct:1 },

{ id:"cin-15", topic:"cinematica", type:"mc",
  q:"Nel moto uniformemente accelerato, la velocità dipende dal tempo secondo la relazione $v = v_0 + at$. In un grafico velocità-tempo, il coefficiente angolare della retta rappresenta:",
  options:[
    "La posizione iniziale",
    "La velocità iniziale",
    "Lo spazio percorso",
    "Il tempo totale",
    "L'accelerazione"], correct:4 },

{ id:"cin-17", topic:"cinematica", type:"mc",
  q:"Il moto di un punto materiale con curvatura costante della traiettoria e velocità scalare costante è:",
  options:[
    "Un quesito senza soluzione univoca",
    "Uniformemente accelerato",
    "Circolare uniforme",
    "Elicoidale",
    "Armonico"], correct:2,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"cin-18", topic:"cinematica", type:"mc",
  q:"Una nave percorre in successione 10 km verso Nord, 6 km verso Est e infine 18 km verso Sud. Quanto vale il modulo dello spostamento risultante?",
  options:[
    "25 km",
    "15 km",
    "10 km",
    "5 km",
    "20 km"], correct:2,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). Componente Nord-Sud: $10-18 = -8\\text{ km}$; componente Est: $6\\text{ km}$. Modulo $= \\sqrt{8^2+6^2} = \\sqrt{100} = 10\\text{ km}$." },

{ id:"cin-20", topic:"cinematica", type:"mc",
  q:"Se il grafico spazio-tempo di un corpo è una retta con pendenza nulla (parallela all'asse dei tempi), il corpo:",
  options:[
    "Sta accelerando",
    "Sta decelerando",
    "È fermo (velocità nulla)",
    "Si muove di moto uniformemente accelerato",
    "Si muove a velocità costante e diversa da zero"], correct:2 },

{ id:"cin-21", topic:"cinematica", type:"fill",
  q:"Il grafico spazio-tempo di un moto uniformemente accelerato ha forma ________.",
  answer:"PARABOLICA", answerAlt:["PARABOLA"],
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello)." },

{ id:"cin-22", topic:"cinematica", type:"fill",
  q:"Il grafico velocità-tempo di un moto uniformemente accelerato è rappresentato da una ________.",
  answer:"RETTA" },

{ id:"cin-23", topic:"cinematica", type:"fill",
  q:"Un corpo cade liberamente, senza attriti, partendo da fermo da un'altezza di 12 m. L'altezza dal suolo alla quale la sua velocità è pari alla metà di quella finale (a terra) è ________ m.",
  answer:"9",
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). Da $v^2=2g(h_0-h)$: se $v = v_{finale}/2$, allora $h_0-h = h_0/4$, quindi $h = \\tfrac{3}{4}h_0 = 9\\text{ m}$." },

{ id:"cin-24", topic:"cinematica", type:"fill",
  q:"Nel moto rettilineo uniforme lo spazio percorso è direttamente proporzionale al ________ impiegato per percorrerlo.",
  answer:"TEMPO" },

{ id:"cin-25", topic:"cinematica", type:"fill",
  q:"La grandezza fisica che descrive la variazione di velocità nel tempo si chiama ________.",
  answer:"ACCELERAZIONE" },

{ id:"cin-26", topic:"cinematica", type:"fill",
  q:"L'insieme dei punti dello spazio occupati da un corpo in movimento si chiama ________ del moto.",
  answer:"TRAIETTORIA" },

{ id:"cin-27", topic:"cinematica", type:"fill",
  q:"Il moto di un punto materiale che si muove lungo una traiettoria circolare con velocità scalare costante si chiama moto circolare ________.",
  answer:"UNIFORME" },

{ id:"cin-28", topic:"cinematica", type:"fill",
  q:"La velocità media si misura, nel Sistema Internazionale, in ________.",
  answer:"M/S", answerAlt:["METRI AL SECONDO","METRI/SECONDO","M/SEC"] },

{ id:"cin-29", topic:"cinematica", type:"mc",
  q:"Il moto di un proiettile (lanciato con una componente orizzontale della velocità) può essere studiato scomponendo il moto in due direzioni indipendenti:",
  options:[
    "Un moto circolare uniforme lungo l'asse verticale e un MRU lungo quello orizzontale",
    "Un unico moto uniformemente accelerato lungo l'intera traiettoria parabolica",
    "Un moto orizzontale a velocità costante (MRU) e un moto verticale uniformemente accelerato dalla sola gravità",
    "Due moti rettilinei uniformi identici lungo gli assi orizzontale e verticale",
    "Due moti uniformemente accelerati identici lungo gli assi x e y"], correct:2 },

{ id:"cin-30", topic:"cinematica", type:"mc",
  q:"Le componenti della velocità iniziale di un proiettile lanciato con velocità $v_0$ e angolo $\\theta_0$ rispetto all'orizzontale sono:",
  options:[
    "$v_{0x}=v_0\\sin\\theta_0,\\ v_{0y}=v_0\\cos\\theta_0$",
    "$v_{0x}=v_{0y}=v_0$",
    "$v_{0x}=v_0\\tan\\theta_0,\\ v_{0y}=v_0$",
    "$v_{0x}=v_0,\\ v_{0y}=0$ sempre",
    "$v_{0x}=v_0\\cos\\theta_0,\\ v_{0y}=v_0\\sin\\theta_0$"], correct:4 },

{ id:"cin-31", topic:"cinematica", type:"mc",
  q:"Nel moto di un proiettile, trascurando l'attrito dell'aria, la componente orizzontale della velocità $v_x$:",
  options:[
    "Aumenta progressivamente",
    "È sempre uguale alla componente verticale",
    "Resta costante durante tutto il moto",
    "Si annulla al culmine della traiettoria",
    "Diminuisce progressivamente per effetto della gravità"], correct:2 },

{ id:"cin-32", topic:"cinematica", type:"mc",
  q:"Nel moto di un proiettile, la componente verticale della velocità $v_y$ al culmine della traiettoria (punto più alto) vale:",
  options:[
    "Il valore massimo raggiunto durante il moto",
    "Uguale a $v_{0y}$",
    "Non è mai nulla durante il moto",
    "Uguale alla componente orizzontale $v_x$",
    "Zero"], correct:4,
  explain:"Al culmine si annulla solo la componente verticale della velocità; l'accelerazione resta g, diretta verso il basso, e la componente orizzontale resta invariata." },

{ id:"cin-33", topic:"cinematica", type:"mc",
  q:"Per un proiettile lanciato con velocità $v_0$ e angolo $\\theta_0$, che ritorna alla stessa quota di lancio, il tempo totale di volo è dato da:",
  options:[
    "$t_f=\\dfrac{2v_0\\sin\\theta_0}{g}$",
    "$t_f=\\dfrac{g}{2v_0\\sin\\theta_0}$",
    "$t_f=\\dfrac{v_0\\cos\\theta_0}{g}$",
    "$t_f=\\dfrac{v_0}{g}$",
    "$t_f=\\dfrac{2v_0}{g\\sin\\theta_0}$"], correct:0 },

{ id:"cin-34", topic:"cinematica", type:"mc",
  q:"Per un proiettile lanciato con velocità $v_0$ e angolo $\\theta_0$, che ritorna alla stessa quota di lancio, la gittata (distanza orizzontale percorsa) è data da:",
  options:[
    "$R=\\dfrac{v_0^2\\sin\\theta_0}{g}$",
    "$R=\\dfrac{v_0^2\\sin(2\\theta_0)}{g}$",
    "$R=\\dfrac{v_0^2\\cos(2\\theta_0)}{g}$",
    "$R=\\dfrac{2v_0^2\\sin\\theta_0}{g}$",
    "$R=\\dfrac{v_0^2\\sin\\theta_0}{2g}$"], correct:1 },

{ id:"cin-35", topic:"cinematica", type:"mc",
  q:"A parità di velocità iniziale $v_0$, la gittata di un proiettile (che ritorna alla stessa quota di lancio) è massima per un angolo di lancio $\\theta_0$ pari a:",
  options:[
    "60°",
    "0°",
    "90°",
    "45°",
    "30°"], correct:3 },

{ id:"cin-36", topic:"cinematica", type:"mc",
  q:"Due angoli di lancio complementari (che sommati danno 90°, come 30° e 60°), a parità di velocità iniziale $v_0$:",
  options:[
    "Producono gittate diverse, perché dipendono in modo differente dall'angolo di lancio",
    "Non hanno alcuna relazione geometrica o fisica tra loro",
    "Sono completamente equivalenti in ogni aspetto del moto, tempo di volo incluso",
    "Producono sempre la stessa altezza massima, oltre alla medesima gittata",
    "Producono la stessa gittata, ma tempi di volo e altezze massime diverse"], correct:4,
  explain:"Il lancio con l'angolo maggiore (es. 60°) sale di più e resta in aria più a lungo, ma i due lanci raggiungono la stessa distanza orizzontale." },

{ id:"cin-37", topic:"cinematica", type:"mc",
  q:"L'altezza massima raggiunta da un proiettile rispetto al punto di lancio, in funzione della componente verticale iniziale $v_{0y}$, è data da:",
  options:[
    "$\\Delta h_{max}=\\dfrac{v_{0y}^2}{2g}$",
    "$\\Delta h_{max}=2v_{0y}g$",
    "$\\Delta h_{max}=\\dfrac{g}{2v_{0y}^2}$",
    "$\\Delta h_{max}=\\dfrac{v_{0y}}{g}$",
    "$\\Delta h_{max}=v_{0y}^2g$"], correct:0 },

{ id:"cin-38", topic:"cinematica", type:"mc",
  q:"Un corpo lanciato orizzontalmente da un'altezza h (velocità iniziale verticale nulla) tocca il suolo dopo un tempo:",
  options:[
    "Infinito, se la velocità orizzontale di lancio è sufficientemente elevata",
    "$t_f=\\sqrt{h/g}$, indipendente dalla velocità orizzontale di lancio",
    "$t_f=h/g$, indipendente dalla velocità orizzontale di lancio",
    "$t_f=\\sqrt{2h/g}$, indipendente dalla velocità orizzontale di lancio",
    "$t_f=\\sqrt{2h/g}$, ma aumenta se la velocità orizzontale di lancio è maggiore"], correct:3,
  explain:"Il moto orizzontale e quello verticale sono indipendenti: il tempo di caduta dipende solo dall'altezza h e da g, non dalla velocità orizzontale." },

{ id:"cin-39", topic:"cinematica", type:"mc",
  q:"Una pallina lasciata cadere da un'altezza h e un'altra lanciata orizzontalmente dalla stessa altezza, nello stesso istante, trascurando l'aria:",
  options:[
    "Toccano il suolo esattamente nello stesso istante, perché hanno la stessa velocità verticale iniziale nulla e la stessa accelerazione verticale $-g$",
    "La pallina lanciata orizzontalmente tocca il suolo dopo quella lasciata cadere, perché deve percorrere anche una distanza orizzontale prima di atterrare",
    "La pallina lasciata cadere tocca il suolo prima, perché non deve percorrere alcuna distanza orizzontale durante la caduta",
    "Il risultato dipende dalla massa delle due palline e dalla forma che offrono alla resistenza dell'aria",
    "Nessuna delle due tocca mai il suolo, perché il moto orizzontale annullerebbe completamente l'effetto della gravità"], correct:0 },

{ id:"cin-40", topic:"cinematica", type:"mc",
  q:"Il modulo della velocità totale di un proiettile in un dato istante, note le componenti $v_x$ e $v_y$, si calcola come:",
  options:[
    "$v=\\sqrt{v_x^2+v_y^2}$",
    "$v=\\dfrac{v_x}{v_y}$",
    "$v=v_x\\cdot v_y$",
    "$v=v_x+v_y$",
    "$v=v_x-v_y$"], correct:0,
  explain:"Le componenti sono perpendicolari tra loro, quindi si combinano secondo il teorema di Pitagora, non si sommano direttamente." },

{ id:"cin-41", topic:"cinematica", type:"mc",
  q:"Nel moto circolare uniforme, il periodo T (tempo necessario per compiere un giro completo) e la frequenza f (numero di giri al secondo) sono legati dalla relazione:",
  options:[
    "$f=1/T$",
    "$f=T^2$",
    "$f=T$",
    "$f=\\sqrt{T}$",
    "$f=2T$"], correct:0 },

{ id:"cin-42", topic:"cinematica", type:"mc",
  q:"La velocità angolare ω di un corpo in moto circolare uniforme è legata al periodo T dalla relazione:",
  options:[
    "$\\omega=\\dfrac{2\\pi}{T}=2\\pi f$",
    "$\\omega=\\dfrac{T}{2\\pi}=\\dfrac{1}{2\\pi f}$",
    "$\\omega=2\\pi T=\\dfrac{2\\pi}{f}$",
    "$\\omega=\\pi f=\\dfrac{\\pi}{T}$",
    "$\\omega=\\dfrac{f}{2\\pi}$"], correct:0 },

{ id:"cin-43", topic:"cinematica", type:"mc",
  q:"Nel moto circolare uniforme, la velocità tangenziale (lineare) v di un punto a distanza r dal centro è legata alla velocità angolare ω dalla relazione:",
  options:[
    "$v=r/\\omega$",
    "$v=\\omega+r$",
    "$v=\\omega^2 r$",
    "$v=\\omega/r$",
    "$v=\\omega r$"], correct:4 },

{ id:"cin-44", topic:"cinematica", type:"mc",
  q:"L'accelerazione centripeta $a_c$ nel moto circolare uniforme può essere espressa, in funzione della velocità tangenziale v o della velocità angolare ω, come:",
  options:[
    "$a_c=\\dfrac{v^2}{r}=\\omega^2 r$",
    "$a_c=v\\cdot r=\\omega r^2$",
    "$a_c=\\dfrac{v}{r^2}=\\dfrac{\\omega}{r}$",
    "$a_c=\\dfrac{r}{v^2}=\\dfrac{1}{\\omega^2 r}$",
    "$a_c=\\omega r=\\dfrac{v}{r}$"], correct:0 },

{ id:"cin-45", topic:"cinematica", type:"mc",
  q:"A parità di raggio r, se la velocità tangenziale v di un corpo in moto circolare uniforme raddoppia, l'accelerazione centripeta:",
  options:[
    "Si riduce a un quarto, poiché $a_c$ diminuisce se la velocità aumenta",
    "Resta invariata, perché $a_c$ dipende solo dal raggio r",
    "Raddoppia soltanto, in modo direttamente proporzionale a v",
    "Diventa quattro volte maggiore, perché $a_c$ dipende dal quadrato di v",
    "Si dimezza, perché $a_c$ è inversamente proporzionale a v"], correct:3 },

{ id:"cin-46", topic:"cinematica", type:"mc",
  q:"A parità di velocità angolare ω, se il raggio r di un moto circolare uniforme raddoppia, l'accelerazione centripeta:",
  options:[
    "Diventa quattro volte maggiore, perché $a_c$ dipende dal quadrato del raggio r",
    "Si dimezza, perché a parità di ω un raggio maggiore riduce l'accelerazione",
    "Raddoppia, perché in questo caso anche la velocità tangenziale v aumenta proporzionalmente a r",
    "Resta invariata, perché a parità di ω l'accelerazione non dipende dal raggio",
    "Si annulla, perché a raggio infinito l'accelerazione centripeta tende a zero"], correct:2 },

{ id:"cin-47", topic:"cinematica", type:"mc",
  q:"Nel moto circolare uniforme, l'angolo Δθ percorso in un intervallo di tempo Δt, e l'arco di circonferenza s corrispondente, sono legati dalle relazioni:",
  options:[
    "$s=\\omega\\Delta t,\\ \\Delta\\theta=s\\cdot r$",
    "$\\Delta\\theta=s/\\omega,\\ s=r/\\Delta\\theta$",
    "$s=r/\\Delta\\theta,\\ \\Delta\\theta=\\omega/\\Delta t$",
    "$\\Delta\\theta=r\\Delta t,\\ s=\\omega\\Delta\\theta$",
    "$\\Delta\\theta=\\omega\\Delta t,\\ s=r\\Delta\\theta$"], correct:4 },

{ id:"cin-48", topic:"cinematica", type:"fill",
  q:"La distanza orizzontale percorsa da un proiettile che ritorna alla stessa quota di lancio si chiama ________.",
  answer:"GITTATA" },

{ id:"cin-49", topic:"cinematica", type:"fill",
  q:"A parità di velocità iniziale, la gittata massima di un proiettile (stessa quota di lancio e arrivo) si ottiene con un angolo di lancio di ________ gradi.",
  answer:"45" },

{ id:"cin-50", topic:"cinematica", type:"fill",
  q:"Nel moto circolare uniforme, il tempo necessario per compiere un giro completo si chiama ________.",
  answer:"PERIODO" },

{ id:"cin-51", topic:"cinematica", type:"fill",
  q:"Nel moto circolare uniforme, l'accelerazione è sempre diretta verso il centro della circonferenza e per questo si chiama accelerazione ________.",
  answer:"CENTRIPETA" },

/* ============================= DINAMICA ============================= */

{ id:"din-01", topic:"dinamica", type:"mc",
  q:"Il primo principio della dinamica (principio d'inerzia) afferma che:",
  options:[
    "L'energia meccanica di un sistema si conserva sempre, anche in presenza di forze di attrito",
    "La quantità di moto totale di un sistema isolato aumenta progressivamente nel tempo",
    "Un corpo soggetto a una forza netta nulla persevera nel suo stato di quiete o di moto rettilineo uniforme",
    "Ogni corpo accelera con un'intensità che non dipende dalla forza risultante applicata",
    "Ad ogni forza applicata corrisponde sempre una reazione uguale e contraria sullo stesso corpo"], correct:2 },

{ id:"din-02", topic:"dinamica", type:"mc",
  q:"Il secondo principio della dinamica si esprime matematicamente come:",
  options:[
    "$F = ma^2$",
    "$F = m/a$",
    "$F = ma$",
    "$F = a/m$",
    "$F = mv$"], correct:2 },

{ id:"din-03", topic:"dinamica", type:"mc",
  q:"Il terzo principio della dinamica (principio di azione e reazione) afferma che:",
  options:[
    "Un corpo fermo rimane fermo finché non è sollecitato da una forza esterna non nulla",
    "La forza risultante applicata a un corpo è direttamente proporzionale alla sua accelerazione",
    "L'energia meccanica totale di un sistema isolato si conserva sempre nel tempo",
    "Se un corpo A esercita una forza su un corpo B, allora B esercita su A una forza uguale in modulo e direzione ma di verso opposto",
    "La quantità di moto totale di un sistema isolato aumenta progressivamente nel tempo"], correct:3 },

{ id:"din-04", topic:"dinamica", type:"mc",
  q:"Le forze di azione e reazione del terzo principio della dinamica:",
  options:[
    "Sono sempre nulle in un sistema in equilibrio",
    "Hanno sempre natura diversa tra loro",
    "Si annullano a vicenda perché agiscono sullo stesso corpo",
    "Agiscono su corpi diversi e quindi non si annullano",
    "Agiscono solo se i due corpi sono a contatto diretto"], correct:3 },

{ id:"din-05", topic:"dinamica", type:"mc",
  q:"Applicando una forza di uguale intensità a due corpi di massa diversa, i due corpi acquistano:",
  options:[
    "Accelerazioni direttamente proporzionali alle masse dei due corpi",
    "Velocità finali uguali, indipendentemente dalle masse dei corpi",
    "La stessa velocità, poiché la forza applicata è la stessa",
    "La stessa accelerazione, indipendentemente dalla massa",
    "Accelerazioni inversamente proporzionali alle masse"], correct:4,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello). Dal secondo principio, $a=F/m$: a parità di $F$, l'accelerazione è inversamente proporzionale alla massa." },

{ id:"din-06", topic:"dinamica", type:"mc",
  q:"L'unità di misura della forza nel Sistema Internazionale è:",
  options:[
    "Il joule",
    "Il newton",
    "Il watt",
    "Il kilogrammo",
    "Il pascal"], correct:1 },

{ id:"din-07", topic:"dinamica", type:"mc",
  q:"Un newton (N) equivale a:",
  options:[
    "$1\\ \\text{kg}\\cdot\\text{m/s}^2$",
    "$1\\ \\text{kg}\\cdot\\text{m}^2\\text{/s}$",
    "$1\\ \\text{kg}\\cdot\\text{m/s}$",
    "$1\\ \\text{kg/m}^2$",
    "$1\\ \\text{kg/s}^2$"], correct:0 },

{ id:"din-08", topic:"dinamica", type:"mc",
  q:"La forza peso di un corpo di massa $m$ è data da:",
  options:[
    "$P = mg$",
    "$P = m^2g$",
    "$P = g/m$",
    "$P = m/g$",
    "$P = m + g$"], correct:0 },

{ id:"din-09", topic:"dinamica", type:"mc",
  q:"La massa di un corpo, a differenza del peso:",
  options:[
    "È una grandezza vettoriale, espressa in newton come il peso",
    "Dipende dall'accelerazione di gravità del luogo in cui si trova",
    "È una proprietà intrinseca del corpo e non varia con la posizione",
    "Si misura in newton, come il peso del corpo",
    "Aumenta quando il corpo viene accelerato da una forza"], correct:2 },

{ id:"din-10", topic:"dinamica", type:"mc",
  q:"La forza d'attrito che si oppone al moto di un corpo che striscia su una superficie è chiamata attrito:",
  options:[
    "Elastico",
    "Statico",
    "Gravitazionale",
    "Viscoso",
    "Dinamico (o radente)"], correct:4 },

{ id:"din-11", topic:"dinamica", type:"mc",
  q:"La forza di attrito statico massima, tra le stesse superfici, rispetto a quella dinamica è generalmente:",
  options:[
    "Non confrontabile",
    "Uguale",
    "Maggiore o uguale",
    "Nulla",
    "Minore"], correct:2 },

{ id:"din-12", topic:"dinamica", type:"mc",
  q:"La forza elastica esercitata da una molla è descritta dalla legge di Hooke:",
  options:[
    "$F = kx$",
    "$F = kx^2$",
    "$F = mx$",
    "$F = mgx$",
    "$F = k/x$"], correct:0,
  explain:"$k$ è la costante elastica della molla, $x$ l'allungamento (o la compressione) rispetto alla posizione di riposo." },

{ id:"din-13", topic:"dinamica", type:"mc",
  q:"La forza normale esercitata da un piano di appoggio su un corpo è diretta:",
  options:[
    "In verso opposto alla forza peso solo se il corpo è in moto",
    "Perpendicolarmente al piano di appoggio",
    "Nella direzione del moto",
    "Parallelamente al piano",
    "Sempre verso il basso"], correct:1 },

{ id:"din-14", topic:"dinamica", type:"mc",
  q:"Un corpo si trova in equilibrio (statico) quando:",
  options:[
    "La sua accelerazione è massima e costante nel tempo",
    "La sua velocità istantanea raggiunge il valore massimo",
    "La sua massa è nulla, per cui non risente delle forze",
    "È soggetto a una sola forza, priva di reazioni",
    "La risultante delle forze agenti su di esso è nulla"], correct:4 },

{ id:"din-15", topic:"dinamica", type:"mc",
  q:"Il momento di una forza rispetto a un punto è dato dal prodotto tra:",
  options:[
    "La massa del corpo e la sua accelerazione angolare istantanea",
    "La forza applicata e l'intervallo di tempo in cui agisce",
    "La forza e la velocità angolare del corpo in rotazione",
    "La forza applicata e la massa del corpo su cui agisce",
    "La forza e il suo braccio (distanza dalla retta d'azione al punto)"], correct:4 },

{ id:"din-16", topic:"dinamica", type:"mc",
  q:"Un pendolo che oscilla si smorza progressivamente nel tempo a causa di:",
  options:[
    "Forze conservative",
    "Forze dissipative",
    "Un aumento della sua massa",
    "Assenza totale di attrito",
    "Una diminuzione della forza peso"], correct:1,
  explain:"Le forze dissipative (attrito dell'aria, attriti interni) sottraggono energia meccanica al sistema, smorzando l'oscillazione." },

{ id:"din-17", topic:"dinamica", type:"mc",
  q:"Due o più forze applicate a uno stesso corpo si compongono secondo:",
  options:[
    "La somma algebrica dei loro moduli, indipendentemente dalla direzione",
    "La regola del parallelogramma (somma vettoriale)",
    "Nessuna regola particolare",
    "Il prodotto dei moduli",
    "La loro differenza"], correct:1 },

{ id:"din-18", topic:"dinamica", type:"fill",
  q:"Un pendolo oscilla e le oscillazioni si smorzano nel tempo. Ciò avviene perché sul pendolo agiscono forze di tipo ________.",
  answer:"DISSIPATIVE",
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"din-19", topic:"dinamica", type:"fill",
  q:"Il principio secondo cui un corpo non soggetto a forze (o soggetto a una risultante nulla) mantiene il proprio stato di quiete o di moto rettilineo uniforme è detto principio di ________.",
  answer:"INERZIA" },

{ id:"din-20", topic:"dinamica", type:"fill",
  q:"Secondo il terzo principio della dinamica, ad ogni azione corrisponde una ________ uguale e contraria.",
  answer:"REAZIONE" },

{ id:"din-21", topic:"dinamica", type:"fill",
  q:"La costante $k$ che compare nella legge di Hooke $F = kx$ è detta costante ________.",
  answer:"ELASTICA" },

{ id:"din-22", topic:"dinamica", type:"fill",
  q:"La forza che si oppone allo scivolamento relativo tra due superfici a contatto è la forza di ________.",
  answer:"ATTRITO" },

{ id:"din-23", topic:"dinamica", type:"fill",
  q:"Nel Sistema Internazionale, la forza si misura in ________.",
  answer:"NEWTON" },

{ id:"din-24", topic:"dinamica", type:"fill",
  q:"Un corpo in equilibrio ha una risultante delle forze agenti su di esso pari a ________.",
  answer:"ZERO", answerAlt:["0","NULLA"] },

{ id:"din-25", topic:"dinamica", type:"fill",
  q:"Secondo il secondo principio della dinamica, l'accelerazione di un corpo è ________ proporzionale alla forza netta applicata.",
  answer:"DIRETTAMENTE" },

{ id:"din-26", topic:"dinamica", type:"mc",
  q:"La legge di gravitazione universale di Newton afferma che la forza attrattiva tra due corpi di massa $m_1$ e $m_2$, posti a distanza r, è data da:",
  options:[
    "$F_g=G\\dfrac{m_1+m_2}{r}$",
    "$F_g=Gm_1m_2r$",
    "$F_g=G\\dfrac{r^2}{m_1 m_2}$",
    "$F_g=G\\dfrac{m_1 m_2}{r^2}$",
    "$F_g=G(m_1+m_2)r^2$"], correct:3 },

{ id:"din-27", topic:"dinamica", type:"mc",
  q:"Nella legge di gravitazione universale, se la distanza tra due corpi raddoppia mentre le masse restano invariate, la forza gravitazionale:",
  options:[
    "Raddoppia rispetto al valore iniziale",
    "Si riduce a un quarto del valore iniziale",
    "Si dimezza rispetto al valore iniziale",
    "Quadruplica rispetto al valore iniziale",
    "Resta invariata, perché non dipende dalla distanza"], correct:1,
  explain:"La forza è inversamente proporzionale al quadrato della distanza: raddoppiando r, F diminuisce di un fattore $2^2=4$." },

{ id:"din-28", topic:"dinamica", type:"mc",
  q:"Nella legge di gravitazione universale, se entrambe le masse raddoppiano mentre la distanza resta invariata, la forza gravitazionale:",
  options:[
    "Si dimezza",
    "Raddoppia",
    "Quadruplica",
    "Si riduce a un quarto",
    "Resta invariata"], correct:2 },

{ id:"din-29", topic:"dinamica", type:"mc",
  q:"L'accelerazione di gravità g in prossimità della superficie di un pianeta è legata alla massa M e al raggio R del pianeta dalla relazione:",
  options:[
    "$g=\\dfrac{G}{MR}$",
    "$g=GM+R^2$",
    "$g=GMR^2$",
    "$g=\\dfrac{GM}{R^2}$",
    "$g=\\dfrac{GR}{M}$"], correct:3 },

{ id:"din-30", topic:"dinamica", type:"mc",
  q:"Il valore dell'accelerazione di gravità g:",
  options:[
    "Non dipende in alcun modo dalla distanza dal centro del pianeta considerato",
    "Dipende dal pianeta considerato e dalla distanza dal suo centro, ma non dalla massa dell'oggetto che cade",
    "Dipende dalla massa dell'oggetto che cade: un corpo più pesante accelera maggiormente",
    "È una costante universale, identica per ogni pianeta e ogni distanza dal centro",
    "Dipende solo dalla forma e dal materiale dell'oggetto che cade"], correct:1,
  explain:"Per questo motivo, in assenza di resistenza dell'aria, corpi di massa diversa cadono con la stessa accelerazione nello stesso luogo." },

{ id:"din-31", topic:"dinamica", type:"mc",
  q:"La costante di gravitazione universale G vale circa:",
  options:[
    "$6{,}022\\times10^{23}\\ \\text{mol}^{-1}$ (numero di Avogadro)",
    "$3\\times10^8\\ \\text{m/s}$ (velocità della luce nel vuoto)",
    "$9{,}8\\ \\text{m/s}^2$ (accelerazione di gravità sulla Terra)",
    "$6{,}67\\times10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$",
    "$1{,}6\\times10^{-19}\\ \\text{C}$ (carica elementare)"], correct:3 },

{ id:"din-32", topic:"dinamica", type:"mc",
  q:"La differenza fondamentale tra la costante G e l'accelerazione di gravità g è che:",
  options:[
    "G dipende dal pianeta considerato, mentre g è una costante identica in tutto l'universo",
    "G è una costante universale, mentre g è un'accelerazione locale che dipende dal pianeta e dalla distanza dal suo centro",
    "Non esiste alcuna differenza concettuale tra le due: sono la stessa identica costante",
    "G si misura in m/s² come un'accelerazione, mentre g è una grandezza adimensionale",
    "G e g rappresentano esattamente la stessa grandezza fisica, solo con simboli diversi"], correct:1 },

{ id:"din-33", topic:"dinamica", type:"fill",
  q:"La legge secondo cui la forza gravitazionale tra due corpi è direttamente proporzionale al prodotto delle masse e inversamente proporzionale al quadrato della distanza è la legge di gravitazione ________.",
  answer:"UNIVERSALE" },

/* ============================= LAVORO, ENERGIA E POTENZA ============================= */

{ id:"en-01", topic:"energia", type:"mc",
  q:"Il lavoro $L$ compiuto da una forza $F$ costante durante uno spostamento $s$ è definito come:",
  options:[
    "Il rapporto tra $F$ e $s$",
    "La differenza tra $F$ e $s$",
    "Il prodotto vettoriale tra $F$ e $s$",
    "La somma tra $F$ e $s$",
    "Il prodotto scalare tra $F$ e $s$"], correct:4 },

{ id:"en-02", topic:"energia", type:"mc",
  q:"L'unità di misura del lavoro nel Sistema Internazionale è:",
  options:[
    "Il joule",
    "Il pascal",
    "Il watt",
    "Il newton",
    "La caloria"], correct:0 },

{ id:"en-03", topic:"energia", type:"mc",
  q:"Il lavoro $L = |F||s|\\cos\\alpha$ si definisce motore quando:",
  options:[
    "Il lavoro $L$ è negativo, perché $\\alpha$ è maggiore di 90°",
    "$F$ e $s$ sono perpendicolari, per cui $L$ è nullo",
    "L'angolo $\\alpha$ è ottuso e quindi $L$ è negativo",
    "L'angolo $\\alpha$ è acuto (o nullo) e quindi $L$ è positivo",
    "Il lavoro $L$ è sempre nullo, indipendentemente dall'angolo $\\alpha$"], correct:3 },

{ id:"en-04", topic:"energia", type:"mc",
  q:"Il lavoro si definisce resistente quando:",
  options:[
    "L'angolo tra $F$ e $s$ è ottuso (o piatto) e quindi $L$ è negativo",
    "Lo spostamento $s$ è nullo, per cui il lavoro non è definito",
    "$F$ e $s$ sono paralleli e concordi, per cui $L$ è massimo e positivo",
    "L'angolo tra $F$ e $s$ è acuto e quindi $L$ è positivo",
    "La forza $F$ è nulla, per cui il lavoro è automaticamente nullo"], correct:0 },

{ id:"en-05", topic:"energia", type:"mc",
  q:"La potenza è definita come:",
  options:[
    "La variazione di energia cinetica subita dal corpo nel tempo",
    "Il prodotto tra il lavoro compiuto e il tempo impiegato",
    "Il prodotto tra la forza applicata e il quadrato della velocità",
    "Il rapporto tra il lavoro compiuto e l'intervallo di tempo impiegato",
    "Il rapporto tra la forza applicata e lo spostamento percorso"], correct:3 },

{ id:"en-06", topic:"energia", type:"mc",
  q:"L'unità di misura della potenza nel Sistema Internazionale è:",
  options:[
    "Il joule",
    "Il watt",
    "Il kWh",
    "Il newton",
    "Il pascal"], correct:1 },

{ id:"en-07", topic:"energia", type:"mc",
  q:"Il watt (W), unità di misura della potenza, corrisponde a:",
  options:[
    "1 newton al secondo",
    "1 joule al minuto",
    "1 joule al secondo",
    "1 joule per metro",
    "1 newton per metro"], correct:2 },

{ id:"en-08", topic:"energia", type:"mc",
  q:"A quanti joule corrisponde 1 kWh?",
  options:[
    "36.000 J",
    "1000 J",
    "3600 J",
    "860 J",
    "3.600.000 J"], correct:4,
  explain:"$1\\text{ kWh} = 1000\\text{ W} \\times 3600\\text{ s} = 3.600.000\\text{ J}$." },

{ id:"en-09", topic:"energia", type:"mc",
  q:"Una forza si definisce conservativa quando:",
  options:[
    "Il suo lavoro dipende dalla velocità istantanea del corpo in moto",
    "Produce sempre un lavoro negativo, indipendentemente dal percorso",
    "Il lavoro compiuto lungo un qualsiasi tragitto chiuso è sempre nullo",
    "È sempre diretta verso il basso, come la forza peso",
    "Il lavoro compiuto per spostare un corpo da A a B dipende dal percorso seguito"], correct:2 },

{ id:"en-10", topic:"energia", type:"mc",
  q:"Quali delle seguenti sono forze conservative?",
  options:[
    "La forza elastica e la forza di attrito",
    "Nessuna forza in meccanica è conservativa",
    "La forza di attrito e la forza peso",
    "La forza peso e la forza elastica",
    "Solo la forza di attrito"], correct:3 },

{ id:"en-11", topic:"energia", type:"mc",
  q:"La forza di attrito è un tipico esempio di forza:",
  options:[
    "Elastica, come quella della molla",
    "Gravitazionale, come il peso",
    "Centripeta, in un moto circolare",
    "Dissipativa (non conservativa)",
    "Conservativa, come quella elastica"], correct:3 },

{ id:"en-12", topic:"energia", type:"mc",
  q:"L'energia cinetica di un corpo è l'energia associata:",
  options:[
    "Al suo movimento",
    "Esclusivamente alla sua massa a riposo",
    "Alla sua carica elettrica",
    "Alla sua temperatura",
    "Alla sua posizione nello spazio"], correct:0 },

{ id:"en-13", topic:"energia", type:"mc",
  q:"Il teorema dell'energia cinetica afferma che il lavoro compiuto su un corpo è pari:",
  options:[
    "Alla sua quantità di moto, cioè massa per velocità",
    "Alla potenza media sviluppata durante il moto",
    "Al quadrato della sua velocità finale",
    "Alla variazione della sua energia potenziale",
    "Alla variazione di energia cinetica subita dal corpo"], correct:4 },

{ id:"en-14", topic:"energia", type:"mc",
  q:"L'energia potenziale è definita in relazione a:",
  options:[
    "La sola massa del corpo",
    "Qualsiasi tipo di forza",
    "Esclusivamente le forze dissipative",
    "Il tempo di applicazione della forza",
    "Esclusivamente le forze conservative"], correct:4,
  explain:"Se la forza non fosse conservativa, il lavoro dipenderebbe dal percorso e la definizione di energia potenziale non sarebbe univoca." },

{ id:"en-15", topic:"energia", type:"mc",
  q:"L'energia potenziale gravitazionale di una massa $m$ posta a un'altezza $h$ rispetto a un riferimento è data da:",
  options:[
    "$U = mgh$",
    "$U = \\tfrac{1}{2}mv^2$",
    "$U = mh/g$",
    "$U = mg/h$",
    "$U = \\tfrac{1}{2}kh^2$"], correct:0 },

{ id:"en-16", topic:"energia", type:"mc",
  q:"L'energia potenziale elastica immagazzinata da una molla allungata di una quantità $x$, con costante elastica $k$, è data da:",
  options:[
    "$U = kx^2$",
    "$U = \\tfrac{1}{2}kx^2$",
    "$U = \\tfrac{1}{2}k^2x$",
    "$U = kx$",
    "$U = mgx$"], correct:1 },

{ id:"en-17", topic:"energia", type:"mc",
  q:"L'energia meccanica $E$ di un corpo è definita come:",
  options:[
    "La sola energia cinetica",
    "La somma dell'energia cinetica e dell'energia potenziale",
    "La differenza tra energia cinetica ed energia potenziale",
    "Il rapporto tra lavoro e tempo",
    "Il prodotto tra energia cinetica ed energia potenziale"], correct:1 },

{ id:"en-18", topic:"energia", type:"mc",
  q:"Il principio di conservazione dell'energia meccanica afferma che l'energia meccanica di un sistema si mantiene costante quando:",
  options:[
    "Agiscono solo forze dissipative",
    "Agiscono esclusivamente forze conservative",
    "Il sistema è fermo",
    "Agiscono sia forze conservative che dissipative",
    "La massa del sistema è costante"], correct:1 },

{ id:"en-19", topic:"energia", type:"mc",
  q:"Se su un sistema agiscono anche forze dissipative (come l'attrito), la variazione di energia meccanica $\\Delta E$ è pari a:",
  options:[
    "L'energia potenziale finale del sistema considerato",
    "Il lavoro compiuto dalle forze dissipative agenti sul sistema",
    "Sempre un valore positivo, indipendentemente dall'attrito",
    "Zero, perché l'energia meccanica si conserva comunque",
    "L'energia cinetica iniziale del sistema considerato"], correct:1,
  explain:"$\\Delta E = L_{att}$, dove $L_{att}$ è il lavoro (negativo) delle forze dissipative agenti sul sistema." },

{ id:"en-20", topic:"energia", type:"mc",
  q:"Una molla orizzontale, di costante elastica $k$, ha attaccato un blocco di massa $m = 7$ kg che oscilla con periodo $T = \\pi/3$ s. Usando la relazione $T = 2\\pi\\sqrt{m/k}$, quanto vale $k$?",
  options:[
    "$252\\pi\\text{ N/m}$",
    "$252\\text{ N/m}$",
    "$126\\text{ N/m}$",
    "$28\\text{ N/m}$",
    "$4\\text{ N/m}$"], correct:1,
  explain:"Ispirata a una domanda della prova ufficiale del semestre filtro 2025 (primo appello). $k = \\dfrac{4\\pi^2m}{T^2} = \\dfrac{4\\pi^2\\times 7}{(\\pi/3)^2} = \\dfrac{4\\pi^2\\times 7\\times 9}{\\pi^2} = 252\\text{ N/m}$." },

{ id:"en-21", topic:"energia", type:"fill",
  q:"Il lavoro meccanico di una forza è definito come il prodotto ________ tra il vettore forza e il vettore spostamento.",
  answer:"SCALARE",
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"en-22", topic:"energia", type:"fill",
  q:"L'energia associata al movimento di un corpo si chiama energia ________.",
  answer:"CINETICA" },

{ id:"en-23", topic:"energia", type:"fill",
  q:"L'unità di misura della potenza nel Sistema Internazionale è il ________.",
  answer:"WATT" },

{ id:"en-24", topic:"energia", type:"fill",
  q:"La forza peso e la forza elastica sono esempi di forze ________.",
  answer:"CONSERVATIVE" },

{ id:"en-25", topic:"energia", type:"fill",
  q:"La forza di attrito è un esempio di forza ________ (non conservativa).",
  answer:"DISSIPATIVA" },

{ id:"en-26", topic:"energia", type:"fill",
  q:"Nella formula dell'energia potenziale gravitazionale $U = mgh$, la lettera $g$ rappresenta l'accelerazione di ________.",
  answer:"GRAVITÀ" },

{ id:"en-27", topic:"energia", type:"fill",
  q:"La somma dell'energia cinetica e dell'energia potenziale di un corpo è detta energia ________.",
  answer:"MECCANICA" },

{ id:"en-28", topic:"energia", type:"fill",
  q:"1 kWh corrisponde, in notazione estesa, a ________ joule.",
  answer:"3600000", answerAlt:["3.600.000","3600000 J"] },

{ id:"en-29", topic:"energia", type:"fill",
  q:"Il lavoro compiuto da una forza il cui angolo con lo spostamento è ottuso si definisce lavoro ________.",
  answer:"RESISTENTE" },

{ id:"en-30", topic:"energia", type:"fill",
  q:"Il lavoro compiuto da una forza il cui angolo con lo spostamento è acuto (o nullo) si definisce lavoro ________.",
  answer:"MOTORE" },

/* ============================= STRUTTURA DELL'ATOMO ============================= */

{ id:"atom-01", topic:"atomo", type:"mc",
  q:"Il numero atomico di un elemento è:",
  options:[
    "Il numero di neutroni contenuti nel nucleo",
    "Il numero di protoni contenuti nel nucleo",
    "La somma del numero di protoni e neutroni",
    "La somma del numero di protoni ed elettroni",
    "Il numero totale di elettroni"], correct:1,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"atom-02", topic:"atomo", type:"mc",
  q:"Gli isotopi di un elemento sono atomi che hanno lo stesso numero:",
  options:[
    "Atomico",
    "Di neutroni",
    "Di massa",
    "Di elettroni nel nucleo",
    "Di elettroni e neutroni"], correct:0,
  explain:"Domanda ispirata alla prova ufficiale del semestre filtro 2025 (secondo appello), che chiedeva di completare: \"Negli isotopi diverso numero di ________\" (neutroni). Gli isotopi hanno infatti lo stesso $Z$ ma diverso numero di massa $A$, perché differiscono per il numero di neutroni." },

{ id:"atom-03", topic:"atomo", type:"mc",
  q:"L'atomo con struttura elettronica $1s^2\\,2s^2\\,2p^5$ è:",
  options:[
    "Azoto",
    "Neon",
    "Ossigeno",
    "Argon",
    "Fluoro"], correct:4,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). Il numero totale di elettroni è $2+2+5=9$, che corrisponde al fluoro ($Z=9$)." },

{ id:"atom-04", topic:"atomo", type:"mc",
  q:"Il numero massimo di elettroni presenti in un orbitale con $l = 1$ è:",
  options:[
    "2",
    "6",
    "3",
    "4",
    "1"], correct:0,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello). Ogni singolo orbitale, indipendentemente dalla sua forma, può contenere al massimo 2 elettroni con spin antiparallelo (principio di Pauli)." },

{ id:"atom-05", topic:"atomo", type:"mc",
  q:"Le particelle subatomiche con carica positiva sono chiamate:",
  options:[
    "Fotoni",
    "Nuclidi",
    "Neutroni",
    "Elettroni",
    "Protoni"], correct:4 },

{ id:"atom-06", topic:"atomo", type:"mc",
  q:"Quale particella subatomica è priva di carica elettrica?",
  options:[
    "Protone",
    "Elettrone",
    "Neutrone",
    "Nucleone",
    "Positrone"], correct:2 },

{ id:"atom-07", topic:"atomo", type:"mc",
  q:"Dove si trovano protoni e neutroni in un atomo?",
  options:[
    "Negli orbitali più esterni",
    "Nello spazio tra nucleo ed elettroni",
    "Non hanno una posizione definita",
    "Nel nucleo",
    "Distribuiti uniformemente in tutto il volume atomico"], correct:3 },

{ id:"atom-08", topic:"atomo", type:"mc",
  q:"La massa di un elettrone rispetto a quella di un protone è circa:",
  options:[
    "2000 volte più piccola",
    "Il doppio",
    "2000 volte più grande",
    "La metà",
    "Uguale"], correct:0 },

{ id:"atom-09", topic:"atomo", type:"mc",
  q:"La somma del numero di protoni e neutroni in un atomo costituisce:",
  options:[
    "Il numero atomico ($Z$)",
    "Il numero di massa ($A$)",
    "Il peso molecolare",
    "Il numero quantico principale",
    "Il numero di Avogadro"], correct:1 },

{ id:"atom-10", topic:"atomo", type:"mc",
  q:"Due atomi con lo stesso numero atomico ma diverso numero di massa sono detti:",
  options:[
    "Radicali",
    "Ioni",
    "Isotopi",
    "Isomeri",
    "Isobari"], correct:2 },

{ id:"atom-11", topic:"atomo", type:"mc",
  q:"Gli isotopi di uno stesso elemento hanno:",
  options:[
    "Diverse proprietà chimiche ma le stesse proprietà fisiche",
    "Un diverso numero di protoni nel nucleo, e quindi un diverso elemento",
    "Le stesse proprietà chimiche ma diverse proprietà fisiche",
    "Proprietà chimiche e fisiche identiche",
    "Un diverso numero atomico, pur mantenendo lo stesso numero di massa"], correct:2 },

{ id:"atom-12", topic:"atomo", type:"mc",
  q:"Il numero quantico principale $n$ definisce principalmente:",
  options:[
    "La carica del nucleo",
    "L'orientamento dell'orbitale nello spazio",
    "La forma dell'orbitale",
    "Il verso di rotazione dell'elettrone",
    "L'energia e la dimensione dell'orbitale"], correct:4 },

{ id:"atom-13", topic:"atomo", type:"mc",
  q:"Il numero quantico secondario $l$ definisce:",
  options:[
    "Lo spin dell'elettrone",
    "La forma dell'orbitale",
    "L'orientamento dell'orbitale nello spazio",
    "Il numero atomico",
    "L'energia totale dell'atomo"], correct:1 },

{ id:"atom-14", topic:"atomo", type:"mc",
  q:"A quale tipo di orbitale corrisponde il numero quantico secondario $l = 2$?",
  options:[
    "Orbitale d",
    "Orbitale s",
    "Nessun orbitale esiste per $l=2$",
    "Orbitale p",
    "Orbitale f"], correct:0 },

{ id:"atom-15", topic:"atomo", type:"mc",
  q:"Quanti orbitali p esistono in un dato livello energetico ($l = 1$)?",
  options:[
    "5",
    "1",
    "7",
    "3",
    "2"], correct:3,
  explain:"Il numero quantico magnetico $m$ va da $-l$ a $+l$: per $l=1$, $m=-1,0,+1$, quindi 3 orbitali." },

{ id:"atom-16", topic:"atomo", type:"mc",
  q:"Quanti orbitali d esistono in un dato livello energetico ($l = 2$)?",
  options:[
    "1",
    "9",
    "7",
    "3",
    "5"], correct:4 },

{ id:"atom-17", topic:"atomo", type:"mc",
  q:"Il numero quantico magnetico di spin $s$ può assumere:",
  options:[
    "Valori da $-l$ a $+l$",
    "Solo valori interi da 0 a $n-1$",
    "Valori multipli di $n$",
    "Solo i valori $+1/2$ e $-1/2$",
    "Solo valori positivi"], correct:3 },

{ id:"atom-18", topic:"atomo", type:"mc",
  q:"Il principio di esclusione di Pauli afferma che in un atomo:",
  options:[
    "Non possono esistere due elettroni con la stessa sequenza dei quattro numeri quantici",
    "Ogni orbitale può contenere al massimo un elettrone",
    "Tutti gli elettroni in uno stesso atomo devono avere spin parallelo tra loro",
    "Gli elettroni occupano sempre l'orbitale con $n$ più alto",
    "Gli orbitali si riempiono partendo da quelli a maggiore energia"], correct:0 },

{ id:"atom-19", topic:"atomo", type:"mc",
  q:"Secondo la regola di Hund, quando sono disponibili orbitali isoenergetici, gli elettroni si dispongono:",
  options:[
    "Occupando il maggior numero di orbitali possibile con spin parallelo",
    "In ordine casuale, senza seguire alcuna regola energetica precisa",
    "Tutti nello stesso orbitale con spin opposto",
    "Solo negli orbitali s, mai in quelli p o d degeneri",
    "Sempre a coppie, con spin antiparallelo fin dal primo elettrone"], correct:0 },

{ id:"atom-20", topic:"atomo", type:"mc",
  q:"Qual è la configurazione elettronica del carbonio ($Z = 6$)?",
  options:[
    "$1s^2\\,2s^4$",
    "$1s^2\\,2s^2\\,2p^2$",
    "$1s^2\\,2s^2\\,2p^6$",
    "$1s^6$",
    "$1s^2\\,2s^2\\,2p^4$"], correct:1 },

{ id:"atom-21", topic:"atomo", type:"mc",
  q:"In un orbitale atomico possono trovarsi al massimo:",
  options:[
    "3 elettroni con spin non tutti opposti",
    "Un numero illimitato di elettroni",
    "2 elettroni con spin antiparallelo",
    "8 elettroni, come in un ottetto completo",
    "1 solo elettrone per ogni orbitale disponibile"], correct:2 },

{ id:"atom-22", topic:"atomo", type:"mc",
  q:"L'orbitale di tipo s ha forma:",
  options:[
    "Elicoidale (a manubrio)",
    "Cubica",
    "A quadrifoglio",
    "Sferica",
    "A ciambella"], correct:3 },

{ id:"atom-23", topic:"atomo", type:"mc",
  q:"Qual è il massimo valore del numero quantico principale $n$ riscontrato sperimentalmente negli atomi in natura?",
  options:[
    "9",
    "6",
    "4",
    "5",
    "7"], correct:4 },

{ id:"atom-24", topic:"atomo", type:"mc",
  q:"La teoria quantistica moderna descrive l'elettrone come dotato di:",
  options:[
    "Solo proprietà di particella, come una minuscola sfera carica",
    "Una traiettoria perfettamente calcolabile",
    "Nessuna proprietà fisica definita o misurabile in alcun modo",
    "Proprietà contemporanee di particella e di onda",
    "Solo proprietà di onda, priva di qualunque natura corpuscolare"], correct:3,
  explain:"È il principio di indeterminazione: non è possibile conoscere con la stessa precisione posizione e velocità dell'elettrone." },

{ id:"atom-25", topic:"atomo", type:"mc",
  q:"L'orbitale atomico è definito come:",
  options:[
    "La traiettoria esatta e prevedibile di un elettrone attorno al nucleo",
    "Un particolare tipo di legame chimico tra due atomi vicini",
    "La regione di spazio attorno al nucleo in cui è massima la probabilità di trovare un elettrone",
    "La somma del numero di protoni e di neutroni presenti nel nucleo",
    "Il nucleo dell'atomo, dove è concentrata quasi tutta la massa atomica"], correct:2 },

{ id:"atom-26", topic:"atomo", type:"fill",
  q:"I protoni hanno carica elettrica ________.",
  answer:"POSITIVA" },

{ id:"atom-27", topic:"atomo", type:"fill",
  q:"Gli elettroni hanno carica elettrica ________.",
  answer:"NEGATIVA" },

{ id:"atom-28", topic:"atomo", type:"fill",
  q:"Il numero atomico si indica con la lettera ________.",
  answer:"Z" },

{ id:"atom-29", topic:"atomo", type:"fill",
  q:"Il numero di massa si indica con la lettera ________.",
  answer:"A" },

{ id:"atom-30", topic:"atomo", type:"fill",
  q:"Atomi con lo stesso numero atomico ma diverso numero di massa si chiamano ________.",
  answer:"ISOTOPI" },

{ id:"atom-31", topic:"atomo", type:"fill",
  q:"Il principio di ________ afferma che in un atomo non possono esistere due elettroni con la stessa sequenza dei quattro numeri quantici.",
  answer:"PAULI", answerAlt:["ESCLUSIONE DI PAULI"] },

{ id:"atom-32", topic:"atomo", type:"mc",
  q:"La legge di Lavoisier (conservazione della massa) afferma che, in una reazione chimica:",
  options:[
    "La massa dei prodotti è sempre maggiore di quella dei reagenti",
    "La massa dei reagenti è sempre maggiore di quella dei prodotti",
    "Solo l'energia si conserva, non la massa",
    "La massa si conserva solo nelle reazioni tra gas",
    "La massa totale dei reagenti è uguale alla massa totale dei prodotti"], correct:4 },

{ id:"atom-33", topic:"atomo", type:"mc",
  q:"La legge di Proust (delle proporzioni definite) afferma che, in un composto chimico puro:",
  options:[
    "Gli elementi che lo costituiscono sono sempre combinati secondo rapporti di massa definiti e costanti, indipendentemente dall'origine del composto",
    "Solo i composti organici obbediscono a questa legge, mentre quelli inorganici ne sono esenti",
    "La massa totale del composto è sempre uguale alla massa del solo elemento più pesante presente",
    "Il rapporto di massa tra gli elementi varia a seconda di come il composto viene preparato",
    "Gli elementi possono combinarsi tra loro secondo un rapporto di massa del tutto arbitrario e variabile"], correct:0,
  explain:"Ad esempio, nell'acqua il rapporto in massa idrogeno:ossigeno è sempre 1:8, qualunque sia la fonte del campione analizzato." },

{ id:"atom-34", topic:"atomo", type:"mc",
  q:"La legge di Dalton (delle proporzioni multiple) afferma che, quando due elementi formano composti diversi tra loro:",
  options:[
    "Solo il primo composto storicamente scoperto tra i due elementi rispetta rapporti di massa fissi, gli altri composti ne sono esenti",
    "Le masse di un elemento che si combinano con una massa fissa dell'altro stanno tra loro secondo rapporti espressi da numeri interi e piccoli",
    "Le masse dei due elementi sono sempre uguali tra loro in ciascuno dei composti formati",
    "Il rapporto tra le masse dei due elementi è sempre esattamente 1:1, in ogni composto",
    "Non esiste alcuna relazione numerica riconoscibile tra le masse dei diversi composti formati"], correct:1,
  explain:"Esempio classico: gli ossidi di azoto N₂O, NO, NO₂, N₂O₅ contengono, per una quantità fissa di azoto, masse di ossigeno nel rapporto 1:2:4:5." },

{ id:"atom-35", topic:"atomo", type:"mc",
  q:"Secondo la teoria atomica di Dalton, gli atomi di uno stesso elemento sono:",
  options:[
    "Identici agli atomi di qualunque altro elemento presente in natura",
    "Tutti identici tra loro per massa e proprietà, e diversi dagli atomi di altri elementi",
    "Suddivisibili in particelle più piccole con le stesse proprietà",
    "Tutti diversi tra loro per massa, anche se dello stesso elemento",
    "Privi di massa propria, poiché la massa risiede solo nei composti"], correct:1 },

{ id:"atom-36", topic:"atomo", type:"mc",
  q:"Secondo la teoria atomica di Dalton, nelle reazioni chimiche gli atomi:",
  options:[
    "Non si creano né si distruggono, ma si combinano o si separano soltanto — spiegando così direttamente la legge di Lavoisier",
    "Vengono continuamente creati dal nulla ogni volta che avviene una reazione",
    "Vengono sempre completamente distrutti al termine di ogni reazione chimica",
    "Cambiano identità elementare durante la reazione, trasformandosi in un altro elemento",
    "Si dividono sempre in particelle subatomiche più piccole durante la reazione"], correct:0 },

{ id:"atom-37", topic:"atomo", type:"mc",
  q:"Thomson, studiando i raggi catodici, scoprì l'elettrone osservando che questi raggi:",
  options:[
    "Erano sempre dotati di carica positiva e venivano perciò deviati verso l'elettrodo caricato negativamente, il catodo del tubo",
    "Erano costituiti da fotoni privi di massa, incapaci di essere deviati da un campo elettrico",
    "Non erano mai influenzati da campi elettrici o magnetici, viaggiando sempre in linea retta",
    "Erano visibili solo nel vuoto assoluto e non subivano mai alcuna deviazione, qualunque fosse il campo applicato",
    "Erano deviati da campi elettrici e magnetici, avevano carica negativa e si comportavano allo stesso modo indipendentemente dal gas o dal metallo usato"], correct:4 },

{ id:"atom-38", topic:"atomo", type:"mc",
  q:"Nel modello atomico di Thomson (\"a panettone\" o plum pudding model), l'atomo è descritto come:",
  options:[
    "Una sfera di carica positiva diffusa, con gli elettroni (carica negativa) immersi al suo interno, complessivamente neutro",
    "Un insieme di orbitali a forma ben definita, disposti attorno a un nucleo centrale",
    "Un nucleo centrale piccolissimo circondato da elettroni orbitanti a grande distanza",
    "Una particella indivisibile e priva di qualunque struttura interna, come pensava Dalton",
    "Un sistema di livelli energetici quantizzati, occupati da elettroni orbitanti"], correct:0 },

{ id:"atom-39", topic:"atomo", type:"mc",
  q:"Nell'esperimento della lamina d'oro, Rutherford bombardò una sottile lamina metallica con un fascio di particelle α (nuclei di elio); il risultato inatteso fu che:",
  options:[
    "Le particelle venivano tutte quante assorbite completamente dalla lamina d'oro, senza attraversarla",
    "La maggior parte delle particelle attraversava la lamina senza deviazioni, ma alcune venivano deviate con angoli ampi e una piccola frazione rimbalzava indietro",
    "Tutte le particelle attraversavano la lamina senza alcuna deviazione, come previsto dal modello di Thomson",
    "Tutte le particelle rimbalzavano indietro, senza che nessuna riuscisse ad attraversare la lamina",
    "Le particelle α, dopo aver attraversato la lamina d'oro, si trasformavano spontaneamente in elettroni dotati di carica negativa"], correct:1 },

{ id:"atom-40", topic:"atomo", type:"mc",
  q:"Dai risultati dell'esperimento della lamina d'oro, Rutherford dedusse che:",
  options:[
    "Quasi tutta la massa e la carica positiva dell'atomo sono concentrate in un nucleo centrale piccolissimo, mentre gli elettroni orbitano a grande distanza in uno spazio quasi vuoto",
    "Il nucleo occupa la maggior parte del volume dell'atomo, mentre gli elettroni riempiono lo spazio restante in modo compatto",
    "La carica positiva è distribuita in modo uniforme in tutto il volume dell'atomo, come nel modello di Thomson",
    "L'atomo non possiede affatto una struttura interna, essendo una particella indivisibile e compatta, come già ipotizzato da Dalton",
    "Gli elettroni si trovano all'interno del nucleo, mescolati insieme a protoni e neutroni, senza orbitare esternamente"], correct:0,
  explain:"Per questa analogia con il Sistema Solare (nucleo centrale come il Sole, elettroni orbitanti come i pianeti) il modello di Rutherford è detto anche 'modello planetario'." },

{ id:"atom-41", topic:"atomo", type:"mc",
  q:"Il modello atomico di Bohr risolse un problema del modello di Rutherford, secondo cui gli elettroni, accelerando continuamente lungo l'orbita, avrebbero dovuto perdere energia e collassare sul nucleo. Bohr postulò che:",
  options:[
    "Gli elettroni si muovono solo su orbite (livelli energetici) ben definite, senza perdere energia, e cambiano livello solo assorbendo o emettendo un quanto di energia esatto",
    "Gli elettroni possono occupare qualsiasi orbita a qualsiasi distanza dal nucleo, in modo continuo e non quantizzato",
    "Gli elettroni non possiedono mai un'energia ben definita, ma la variano in modo continuo e del tutto casuale nel tempo",
    "Gli elettroni ruotano attorno al nucleo lungo una traiettoria a spirale, perdendo gradualmente energia fino a collassare su di esso",
    "Gli elettroni restano sempre completamente fermi rispetto al nucleo, senza compiere alcun tipo di movimento orbitale"], correct:0 },

{ id:"atom-42", topic:"atomo", type:"mc",
  q:"Nel modello di Bohr, quando un elettrone eccitato ricade da un'orbita più esterna a una più interna, l'atomo:",
  options:[
    "Assorbe energia dall'ambiente circostante, aumentando il proprio livello energetico",
    "Non subisce alcun cambiamento energetico, poiché l'orbita non influisce sull'energia",
    "Distrugge il nucleo, liberando una grande quantità di energia",
    "Emette un elettrone aggiuntivo insieme a una piccola quantità di calore",
    "Emette un fotone con energia esattamente pari al salto energetico tra le due orbite"], correct:4,
  explain:"Poiché ogni salto tra livelli specifici produce sempre la stessa energia (e quindi la stessa frequenza di luce), il modello di Bohr spiega perché gli spettri di emissione atomici sono costituiti da righe discrete, non da un continuo." },

{ id:"atom-43", topic:"atomo", type:"mc",
  q:"Un limite importante del modello di Bohr è che:",
  options:[
    "Negava del tutto l'esistenza del nucleo atomico, tornando al modello di Thomson",
    "Prevedeva correttamente lo spettro di ogni atomo, compresi quelli con più elettroni, senza eccezioni",
    "Non spiegava alcun fenomeno sperimentale osservato, nemmeno lo spettro dell'idrogeno",
    "Era identico in tutto e per tutto al modello planetario di Rutherford, senza alcuna novità",
    "Funzionava bene solo per l'atomo di idrogeno (con un solo elettrone), ma dava previsioni sbagliate per atomi con più elettroni"], correct:4 },

{ id:"atom-44", topic:"atomo", type:"mc",
  q:"All'interno del nucleo atomico, nonostante la reciproca repulsione elettrostatica tra i protoni (carichi positivamente), i nucleoni restano uniti grazie a:",
  options:[
    "La sola forza di gravità tra i nucleoni, che a quella scala risulterebbe comunque sufficiente a tenerli uniti",
    "L'attrazione magnetica generata dal moto orbitale degli elettroni che circondano continuamente il nucleo atomico",
    "La forza nucleare forte, una forza attrattiva molto intensa ma a raggio d'azione cortissimo, efficace solo a distanze dell'ordine delle dimensioni nucleari",
    "Il campo magnetico terrestre, la cui influenza si estenderebbe fino all'interno del nucleo atomico",
    "L'assenza totale di carica elettrica nei protoni, che eliminerebbe così ogni repulsione reciproca"], correct:2 },

{ id:"atom-45", topic:"atomo", type:"mc",
  q:"I nuclei atomici molto grandi, con un numero elevato di protoni, tendono a diventare instabili e radioattivi perché:",
  options:[
    "Il numero di elettroni finisce sempre per superare quello dei protoni, rendendo l'atomo instabile",
    "I neutroni diventano carichi positivamente nei nuclei molto grandi, aumentando la repulsione interna",
    "La forza nucleare forte aumenta indefinitamente con le dimensioni del nucleo, stabilizzandolo sempre di più",
    "La forza nucleare forte, a corto raggio, non riesce più a compensare efficacemente la crescente repulsione elettrostatica tra tutti i protoni",
    "La gravità nucleare diventa improvvisamente negativa, respingendo i nucleoni tra loro"], correct:3 },

{ id:"atom-46", topic:"atomo", type:"fill",
  q:"La legge secondo cui la massa totale dei reagenti è uguale alla massa totale dei prodotti in una reazione chimica è la legge di ________.",
  answer:"LAVOISIER" },

{ id:"atom-47", topic:"atomo", type:"fill",
  q:"La legge secondo cui in un composto puro gli elementi sono sempre combinati in rapporti di massa definiti e costanti è la legge di ________.",
  answer:"PROUST" },

{ id:"atom-48", topic:"atomo", type:"fill",
  q:"L'esperimento con cui Rutherford dedusse l'esistenza del nucleo atomico, bombardando una sottile lamina d'oro con particelle α, è noto come esperimento della lamina ________.",
  answer:"D'ORO" },

{ id:"atom-49", topic:"atomo", type:"fill",
  q:"La forza attrattiva a cortissimo raggio che tiene uniti protoni e neutroni nel nucleo, vincendo la repulsione elettrostatica, si chiama forza nucleare ________.",
  answer:"FORTE" },

/* ============================= TAVOLA PERIODICA DEGLI ELEMENTI ============================= */

{ id:"tav-01", topic:"tavola", type:"mc",
  q:"Nella tavola periodica gli elementi sono ordinati secondo:",
  options:[
    "Il numero atomico crescente",
    "Il numero di elettroni di valenza decrescente",
    "Il peso atomico decrescente",
    "L'ordine alfabetico",
    "Il numero di massa crescente"], correct:0 },

{ id:"tav-02", topic:"tavola", type:"mc",
  q:"Quante sono le righe orizzontali (periodi) della tavola periodica?",
  options:[
    "8",
    "6",
    "18",
    "9",
    "7"], correct:4 },

{ id:"tav-03", topic:"tavola", type:"mc",
  q:"Il numero del periodo a cui appartiene un elemento corrisponde:",
  options:[
    "Al numero totale di orbitali occupati nel guscio più esterno dell'atomo",
    "Al massimo valore del numero quantico principale $n$ occupato",
    "Al numero atomico dell'elemento, cioè al totale dei protoni nel nucleo",
    "Al numero complessivo di elettroni di valenza posseduti dall'atomo",
    "Al numero del gruppo a cui l'elemento appartiene nella tavola periodica"], correct:1 },

{ id:"tav-04", topic:"tavola", type:"mc",
  q:"Gli elementi di uno stesso gruppo della tavola periodica hanno in comune:",
  options:[
    "Lo stesso numero complessivo di elettroni nell'atomo",
    "Lo stesso numero di neutroni presenti nel nucleo",
    "Una configurazione elettronica esterna simile",
    "Lo stesso periodo all'interno della tavola periodica",
    "Lo stesso numero di massa atomica relativa (A)"], correct:2 },

{ id:"tav-05", topic:"tavola", type:"mc",
  q:"Il gruppo 8A della tavola periodica corrisponde a:",
  options:[
    "I gas nobili",
    "I metalli alcalini",
    "I metalli di transizione",
    "I metalli alcalino-terrosi",
    "Gli alogeni"], correct:0 },

{ id:"tav-06", topic:"tavola", type:"mc",
  q:"Perché i gas nobili non formano legami chimici in condizioni normali?",
  options:[
    "Perché possiedono un numero atomico troppo elevato perché si formino orbitali di legame",
    "Perché la loro elevatissima massa atomica impedisce la sovrapposizione degli orbitali di valenza",
    "Perché hanno un solo elettrone spaiato nel guscio più esterno, incompatibile con la condivisione",
    "Perché il loro nucleo, ricco di neutroni, risulta troppo instabile per formare legami chimici",
    "Perché possiedono già la configurazione elettronica esterna più stabile (ottetto completo)"], correct:4 },

{ id:"tav-07", topic:"tavola", type:"mc",
  q:"Gli elementi di transizione compaiono a partire dal:",
  options:[
    "2° periodo",
    "7° periodo",
    "1° periodo",
    "4° periodo",
    "3° periodo"], correct:3,
  explain:"Con gli elementi di transizione iniziano a riempirsi gli orbitali di tipo d." },

{ id:"tav-08", topic:"tavola", type:"mc",
  q:"Lantanidi e attinidi occupano orbitali di tipo:",
  options:[
    "f",
    "d",
    "s",
    "Nessun orbitale specifico",
    "p"], correct:0 },

{ id:"tav-09", topic:"tavola", type:"mc",
  q:"Quale delle seguenti è una proprietà tipica dei metalli?",
  options:[
    "Formazione di anioni",
    "Scarsa conducibilità elettrica",
    "Tendenza ad acquistare elettroni",
    "Formazione di anidridi",
    "Tendenza a cedere elettroni"], correct:4 },

{ id:"tav-10", topic:"tavola", type:"mc",
  q:"Quale delle seguenti è una proprietà tipica dei non metalli?",
  options:[
    "Tendono ad acquistare elettroni formando anioni",
    "Sono buoni conduttori di calore ed elettricità",
    "Formano ossidi basici",
    "Sono tutti allo stato solido a temperatura ambiente",
    "Sono malleabili e duttili"], correct:0 },

{ id:"tav-11", topic:"tavola", type:"mc",
  q:"Il raggio atomico degli elementi, scendendo lungo un gruppo:",
  options:[
    "Varia in modo casuale",
    "Diventa nullo",
    "Resta costante",
    "Diminuisce",
    "Aumenta"], correct:4 },

{ id:"tav-12", topic:"tavola", type:"mc",
  q:"Il raggio atomico degli elementi, procedendo lungo un periodo (da sinistra a destra):",
  options:[
    "Non è definibile",
    "Aumenta",
    "Resta costante",
    "Raddoppia",
    "Diminuisce"], correct:4 },

{ id:"tav-13", topic:"tavola", type:"mc",
  q:"L'energia di ionizzazione è definita come l'energia necessaria per:",
  options:[
    "Aggiungere un elettrone a un atomo in fase gassosa",
    "Rompere completamente un legame covalente in una molecola",
    "Portare un solido direttamente allo stato di vapore",
    "Allontanare un elettrone da un atomo in fase gassosa",
    "Allontanare un protone dal nucleo di un atomo"], correct:3 },

{ id:"tav-14", topic:"tavola", type:"mc",
  q:"Lungo un periodo, l'energia di ionizzazione degli elementi:",
  options:[
    "Diventa negativa",
    "Aumenta",
    "Resta costante",
    "Non è definita",
    "Diminuisce"], correct:1 },

{ id:"tav-15", topic:"tavola", type:"mc",
  q:"Scendendo lungo un gruppo, l'energia di ionizzazione degli elementi:",
  options:[
    "Resta costante",
    "Non varia in modo prevedibile",
    "Diminuisce",
    "Raddoppia",
    "Aumenta"], correct:2 },

{ id:"tav-16", topic:"tavola", type:"mc",
  q:"L'affinità elettronica è definita come:",
  options:[
    "L'energia che si libera quando un atomo in fase gassosa acquista un elettrone",
    "La capacità di un atomo di attrarre su di sé gli elettroni condivisi in un legame",
    "Il numero totale di elettroni di valenza posseduti da un atomo neutro",
    "L'energia necessaria per allontanare un elettrone da un atomo in fase gassosa",
    "La massa atomica media di un elemento, espressa in unità di massa atomica"], correct:0 },

{ id:"tav-17", topic:"tavola", type:"mc",
  q:"L'elettronegatività misura:",
  options:[
    "Il numero di protoni presenti nel nucleo di un atomo di quell'elemento",
    "La tendenza di un atomo ad attirare su di sé gli elettroni di legame",
    "L'energia che si libera quando l'atomo acquista un elettrone aggiuntivo",
    "L'energia necessaria per rimuovere un elettrone da un atomo isolato",
    "La distanza media tra il nucleo e l'elettrone più esterno dell'atomo"], correct:1 },

{ id:"tav-18", topic:"tavola", type:"mc",
  q:"Lungo un periodo l'elettronegatività degli elementi:",
  options:[
    "Diminuisce",
    "Dipende solo dal numero di massa",
    "Resta costante",
    "Diventa negativa",
    "Aumenta"], correct:4 },

{ id:"tav-19", topic:"tavola", type:"mc",
  q:"Scendendo lungo un gruppo, l'elettronegatività degli elementi:",
  options:[
    "Raddoppia",
    "Aumenta",
    "Diminuisce",
    "Resta costante",
    "Diventa nulla"], correct:2 },

{ id:"tav-20", topic:"tavola", type:"mc",
  q:"Per quali elementi non è possibile definire un valore di elettronegatività?",
  options:[
    "I gas nobili",
    "Gli alogeni",
    "I metalli alcalini",
    "I metalli di transizione",
    "Il carbonio e l'azoto"], correct:0 },

{ id:"tav-21", topic:"tavola", type:"mc",
  q:"L'unità di massa atomica (u.m.a.) è definita come:",
  options:[
    "1/12 della massa dell'isotopo 12 del carbonio",
    "Il peso di un protone",
    "La massa di un atomo di ossigeno-16",
    "La massa di una mole di elettroni",
    "La massa di un atomo di idrogeno"], correct:0 },

{ id:"tav-22", topic:"tavola", type:"mc",
  q:"Una mole di una sostanza contiene sempre:",
  options:[
    "Un numero di particelle pari al numero di Avogadro",
    "22,4 litri di sostanza, indipendentemente dallo stato fisico",
    "Una massa esattamente pari a 1 grammo, qualunque sia il soluto",
    "Una massa pari a 6,022 grammi, indipendentemente dal tipo di sostanza",
    "Un numero di particelle che varia a seconda della sostanza considerata"], correct:0 },

{ id:"tav-23", topic:"tavola", type:"mc",
  q:"Il numero di Avogadro è definito come il numero di atomi di carbonio contenuti in:",
  options:[
    "6,022 g di carbonio naturale",
    "22,4 L di anidride carbonica gassosa",
    "12 g dell'isotopo 12 del carbonio",
    "1 grammo dell'isotopo 12 del carbonio",
    "1 mole di atomi di idrogeno"], correct:2 },

{ id:"tav-24", topic:"tavola", type:"mc",
  q:"Qual è la relazione corretta tra peso molecolare (P.M.) e mole?",
  options:[
    "Il P.M. espresso in grammi corrisponde alla massa di una mole della sostanza",
    "Una mole corrisponde sempre a 22,4 g di sostanza, qualunque sia il composto",
    "Il P.M. è numericamente uguale al numero di Avogadro di particelle",
    "Il P.M. si misura sempre in litri per mole di sostanza gassosa",
    "Il P.M. dipende esclusivamente dal volume occupato dalla sostanza"], correct:0 },

{ id:"tav-25", topic:"tavola", type:"mc",
  q:"Calcolare il numero di moli presenti in 0,093 g di Zn (massa atomica 65,41 u):",
  options:[
    "$7{,}04\\times 10^{2}$ mol",
    "$1{,}42\\times 10^{-2}$ mol",
    "$1{,}42\\times 10^{-3}$ mol",
    "65,41 mol",
    "$6{,}08\\times 10^{-4}$ mol"], correct:2,
  explain:"$n = \\dfrac{m}{M} = \\dfrac{0{,}093}{65{,}41} \\approx 1{,}42\\times 10^{-3}\\text{ mol}$." },

{ id:"tav-26", topic:"tavola", type:"mc",
  q:"Quante moli sono contenute in 3,4 g di $H_2SO_4$ ($H=1$, $S=32$, $O=16$)?",
  options:[
    "$3{,}47\\times 10^{-2}$ mol",
    "$3{,}47\\times 10^{-1}$ mol",
    "$1{,}06\\times 10^{-1}$ mol",
    "$5{,}31\\times 10^{-2}$ mol",
    "$2{,}88\\times 10^{1}$ mol"], correct:0,
  explain:"$M(H_2SO_4) = 2(1)+32+4(16) = 98\\text{ g/mol}$. $n = \\dfrac{3{,}4}{98} \\approx 3{,}47\\times 10^{-2}\\text{ mol}$." },

{ id:"tav-27", topic:"tavola", type:"fill",
  q:"La tavola periodica ordina gli elementi secondo il numero ________ crescente.",
  answer:"ATOMICO" },

{ id:"tav-28", topic:"tavola", type:"fill",
  q:"Le righe orizzontali della tavola periodica si chiamano ________.",
  answer:"PERIODI" },

{ id:"tav-29", topic:"tavola", type:"fill",
  q:"Le colonne verticali della tavola periodica si chiamano ________.",
  answer:"GRUPPI" },

{ id:"tav-30", topic:"tavola", type:"fill",
  q:"Il numero di Avogadro vale $6{,}022 \\times 10$ elevato a ________.",
  answer:"23" },

{ id:"tav-31", topic:"tavola", type:"fill",
  q:"Calcolare la massa in grammi di 0,018 mol di magnesio (massa atomica 24,30 u): ________ g.",
  answer:"0,437", answerAlt:["0,44","0,4374","0.437"] },

{ id:"tav-32", topic:"tavola", type:"fill",
  q:"Il peso molecolare dell'acqua ($H_2O$), sapendo che $H=1{,}008$ u e $O=15{,}999$ u, è pari a ________ u.m.a.",
  answer:"18,015", answerAlt:["18,02","18","18.015"] },

{ id:"tav-33", topic:"tavola", type:"mc",
  q:"La carica nucleare efficace ($Z_{eff}$), percepita da un elettrone di valenza, è definita come:",
  options:[
    "La carica nucleare totale Z, cioè il numero di protoni nel nucleo, senza applicare alcuna correzione per l'effetto di schermo",
    "Il numero di neutroni presenti nel nucleo, che non contribuisce alla carica elettrica percepita dagli elettroni",
    "La carica positiva netta di cui risente l'elettrone, tenendo conto dell'effetto di schermo degli elettroni più interni",
    "La massa atomica dell'elemento, espressa in unità di massa atomica, indipendentemente dalla sua configurazione elettronica",
    "Il numero di elettroni di valenza dell'atomo, cioè quelli presenti nel guscio più esterno occupato"], correct:2,
  explain:"Per il litio (1s²2s¹), Z = 3 ma gli elettroni interni 1s² schermano quasi completamente il nucleo: $Z_{eff}\\approx 3-2=1$ per l'elettrone di valenza 2s." },

{ id:"tav-34", topic:"tavola", type:"mc",
  q:"Lungo un periodo (da sinistra a destra), la carica nucleare efficace $Z_{eff}$ percepita dagli elettroni di valenza:",
  options:[
    "Diventa negativa, perché la repulsione tra gli elettroni supera l'attrazione del nucleo",
    "Diminuisce, perché l'aumento del numero di elettroni schermanti prevale sulla crescita di Z",
    "Resta costante, perché l'aumento di Z è sempre compensato esattamente dall'effetto di schermo",
    "Dipende solo dal gruppo di appartenenza, non varia mai lungo un periodo",
    "Aumenta, perché il numero atomico cresce ma il numero di elettroni schermanti resta invariato"], correct:4 },

{ id:"tav-35", topic:"tavola", type:"mc",
  q:"Un atomo può avere più potenziali di ionizzazione successivi, uno per ogni elettrone rimosso; il secondo potenziale di ionizzazione, rispetto al primo, è:",
  options:[
    "Sempre uguale al primo, perché la carica nucleare efficace non cambia dopo la prima ionizzazione",
    "Sempre maggiore del primo, perché rimuovere un elettrone da uno ione già carico positivamente richiede più energia",
    "Sempre minore del primo, perché lo ione positivo trattiene gli elettroni restanti con meno forza",
    "Nullo, perché dopo la prima ionizzazione l'atomo non possiede più elettroni da rimuovere",
    "Negativo, perché la rimozione di un secondo elettrone libera energia anziché richiederne"], correct:1,
  explain:"Dopo aver rimosso il primo elettrone, la repulsione elettrone-elettrone diminuisce e l'attrazione netta del nucleo sugli elettroni rimanenti aumenta." },

{ id:"tav-36", topic:"tavola", type:"mc",
  q:"Per il sodio Na (configurazione $[Ne]3s^1$), il secondo potenziale di ionizzazione è enormemente più alto del primo perché:",
  options:[
    "Il sodio non può mai perdere un secondo elettrone, poiché il suo numero di ossidazione massimo è sempre +1 in ogni composto",
    "Il primo e il secondo potenziale di ionizzazione sono sempre identici per tutti i metalli alcalini, indipendentemente dalla configurazione",
    "Dopo aver rimosso l'unico elettrone 3s, si raggiunge la configurazione stabile del gas nobile neon, molto difficile da rompere ulteriormente",
    "La seconda rimozione avviene da un orbitale 2p più esterno rispetto al 3s, dove l'elettrone è schermato meno efficacemente",
    "Il sodio, dopo la prima ionizzazione, acquista un elettrone aggiuntivo trasformandosi in uno ione carico negativamente"], correct:2 },

{ id:"tav-37", topic:"tavola", type:"mc",
  q:"La scala di elettronegatività di Mulliken definisce l'elettronegatività di un elemento come:",
  options:[
    "La media aritmetica tra la sua energia di ionizzazione e la sua affinità elettronica",
    "Il solo valore dell'affinità elettronica, trascurando il contributo dell'energia di ionizzazione",
    "Il solo valore dell'energia di ionizzazione, senza tenere conto dell'affinità elettronica",
    "Il rapporto tra l'energia di ionizzazione e l'affinità elettronica dell'atomo",
    "La differenza tra l'energia di ionizzazione e l'affinità elettronica dell'atomo"], correct:0 },

{ id:"tav-38", topic:"tavola", type:"mc",
  q:"Gli elementi con configurazione $s^2$ piena (gruppo 2) o $p^3$ semipiena (gruppo 15) presentano affinità elettroniche anomale, spesso vicine allo zero o positive, perché:",
  options:[
    "Questi elementi non possono mai formare anioni stabili in nessuna condizione sperimentale",
    "Sono tutti elementi appartenenti al blocco dei gas nobili, con ottetto completo",
    "Aggiungere un elettrone romperebbe una configurazione elettronica già particolarmente stabile",
    "Non possiedono elettroni di valenza disponibili nel loro guscio più esterno",
    "Hanno sempre l'affinità elettronica più alta e favorevole di tutto il periodo"], correct:2 },

{ id:"tav-39", topic:"tavola", type:"fill",
  q:"La carica positiva netta percepita da un elettrone di valenza, tenendo conto dell'effetto di schermo degli elettroni interni, si chiama carica nucleare ________.",
  answer:"EFFICACE", answerAlt:["EFFETTIVA"] },

/* ============================= LEGAMI CHIMICI ============================= */

{ id:"leg-01", topic:"legami", type:"mc",
  q:"La regola dell'ottetto afferma che, nella formazione di un legame chimico, un elemento tende a circondarsi di:",
  options:[
    "4 elettroni",
    "8 elettroni",
    "2 elettroni",
    "10 elettroni",
    "6 elettroni"], correct:1 },

{ id:"leg-02", topic:"legami", type:"mc",
  q:"Quale dei seguenti elementi, per la regola dell'ottetto, tende a raggiungere la configurazione dell'elio (2 elettroni)?",
  options:[
    "Lo zolfo",
    "Il calcio",
    "L'idrogeno",
    "Il sodio",
    "Il cloro"], correct:2 },

{ id:"leg-03", topic:"legami", type:"mc",
  q:"L'energia di legame è definita come:",
  options:[
    "Il numero di legami tra due atomi",
    "La distanza tra i nuclei di due atomi legati",
    "L'energia cinetica media degli elettroni di legame",
    "L'energia necessaria per rompere un legame chimico",
    "L'energia totale della molecola"], correct:3 },

{ id:"leg-04", topic:"legami", type:"mc",
  q:"L'ordine di legame indica:",
  options:[
    "Il tipo di ibridazione degli orbitali coinvolti nel legame chimico",
    "L'energia complessiva posseduta dalla molecola nel suo insieme",
    "La distanza di equilibrio tra i nuclei dei due atomi legati",
    "La polarità complessiva del legame covalente considerato",
    "Il numero di legami (singoli, doppi, tripli) tra due atomi"], correct:4 },

{ id:"leg-05", topic:"legami", type:"mc",
  q:"A un maggiore ordine di legame corrisponde generalmente:",
  options:[
    "Nessuna relazione con energia e lunghezza di legame",
    "Minore energia di legame e minore lunghezza di legame",
    "Minore energia di legame e maggiore lunghezza di legame",
    "Maggiore energia di legame e maggiore lunghezza di legame",
    "Maggiore energia di legame e minore lunghezza di legame"], correct:4 },

{ id:"leg-06", topic:"legami", type:"mc",
  q:"Secondo la teoria del legame di valenza (VB), il legame covalente si forma per:",
  options:[
    "Cessione definitiva di elettroni tra due atomi",
    "Formazione di un mare di elettroni delocalizzati",
    "Emissione di radiazione elettromagnetica",
    "Attrazione elettrostatica tra ioni di carica opposta",
    "Condivisione di elettroni tra orbitali sovrapposti di atomi diversi"], correct:4 },

{ id:"leg-07", topic:"legami", type:"mc",
  q:"Un legame covalente tra due atomi con la stessa elettronegatività (es. H–H) si definisce:",
  options:[
    "Metallico",
    "Dativo",
    "Omeopolare",
    "Ionico",
    "Eteropolare"], correct:2 },

{ id:"leg-08", topic:"legami", type:"mc",
  q:"Un legame covalente tra due atomi con diversa elettronegatività si definisce:",
  options:[
    "Legame ionico puro",
    "Dativo (o di coordinazione)",
    "Eteropolare (o polarizzato)",
    "Metallico delocalizzato",
    "Omeopolare (o apolare)"], correct:2 },

{ id:"leg-09", topic:"legami", type:"mc",
  q:"In un legame covalente polarizzato, l'atomo più elettronegativo:",
  options:[
    "Attira maggiormente la coppia di elettroni di legame",
    "Diventa un catione stabile all'interno della molecola",
    "Cede completamente il proprio elettrone all'altro atomo",
    "Smette di condividere elettroni con l'altro atomo del legame",
    "Perde completamente la propria identità chimica originaria"], correct:0 },

{ id:"leg-10", topic:"legami", type:"mc",
  q:"Nel legame dativo (di coordinazione), la coppia di elettroni condivisa proviene:",
  options:[
    "Da un solo atomo (il donatore)",
    "Sempre dall'atomo più elettronegativo",
    "Da nessuno dei due atomi",
    "Da un terzo atomo esterno",
    "In parti uguali da entrambi gli atomi"], correct:0 },

{ id:"leg-11", topic:"legami", type:"mc",
  q:"Nel legame dativo, l'atomo che riceve la coppia di elettroni è chiamato:",
  options:[
    "Catione",
    "Nucleofilo",
    "Radicale",
    "Donatore",
    "Accettore"], correct:4 },

{ id:"leg-12", topic:"legami", type:"mc",
  q:"Secondo la teoria degli orbitali molecolari (MO), un orbitale molecolare legante, rispetto agli orbitali atomici di partenza, ha:",
  options:[
    "Energia maggiore",
    "Energia nulla",
    "Energia minore",
    "La stessa energia",
    "Energia negativa"], correct:2 },

{ id:"leg-13", topic:"legami", type:"mc",
  q:"Secondo la teoria degli orbitali molecolari, il numero totale di orbitali molecolari che si formano è:",
  options:[
    "Sempre il doppio del numero di orbitali atomici di partenza",
    "Sempre pari a 2, indipendentemente dagli atomi coinvolti",
    "Sempre un numero dispari di orbitali molecolari",
    "Indipendente dal numero di orbitali atomici che si combinano",
    "Uguale al numero degli orbitali atomici che si combinano"], correct:4 },

{ id:"leg-14", topic:"legami", type:"mc",
  q:"La molecola di ossigeno ($O_2$) presenta un comportamento paramagnetico perché, secondo la teoria degli orbitali molecolari, possiede:",
  options:[
    "Nessun elettrone spaiato in nessun orbitale molecolare",
    "Tutti gli elettroni appaiati negli orbitali di legame",
    "Esclusivamente legami di natura ionica tra gli atomi",
    "Elettroni spaiati negli orbitali di antilegame",
    "Un unico legame covalente di tipo sigma semplice"], correct:3 },

{ id:"leg-15", topic:"legami", type:"mc",
  q:"Il legame ionico si instaura tipicamente tra:",
  options:[
    "Un metallo e un non metallo",
    "Due gas nobili tra loro",
    "Due metalli differenti",
    "Due elementi non metallici",
    "Due atomi dello stesso elemento"], correct:0 },

{ id:"leg-16", topic:"legami", type:"mc",
  q:"Nella formazione di un legame ionico, il metallo tende a:",
  options:[
    "Formare un legame dativo",
    "Acquistare elettroni",
    "Cedere elettroni",
    "Condividere elettroni in parti uguali",
    "Non reagire"], correct:2 },

{ id:"leg-17", topic:"legami", type:"mc",
  q:"I composti ionici, allo stato solido:",
  options:[
    "Si presentano sempre allo stato gassoso a temperatura ambiente",
    "Hanno tipicamente basse temperature di fusione, simili ai solidi molecolari",
    "Conducono bene la corrente elettrica, perché gli ioni sono liberi di muoversi nel reticolo",
    "Non formano mai strutture cristalline ordinate a lungo raggio",
    "Non conducono corrente elettrica, perché gli ioni occupano posizioni fisse nel reticolo"], correct:4 },

{ id:"leg-18", topic:"legami", type:"mc",
  q:"I composti ionici fusi o disciolti in acqua:",
  options:[
    "Diventano gassosi",
    "Perdono la loro carica",
    "Non conducono comunque corrente elettrica",
    "Diventano conduttori di corrente elettrica",
    "Si trasformano in composti covalenti"], correct:3 },

{ id:"leg-19", topic:"legami", type:"mc",
  q:"Il legame metallico è dovuto all'attrazione tra:",
  options:[
    "Ioni positivi e negativi disposti alternativamente in un reticolo cristallino ionico",
    "Due anioni di carica negativa che si respingono reciprocamente nel reticolo",
    "Cationi metallici disposti in un reticolo e gli elettroni di valenza delocalizzati",
    "Molecole polari e apolari tenute insieme da deboli forze di van der Waals",
    "Due nuclei atomici privi di elettroni circostanti che li schermano"], correct:2 },

{ id:"leg-20", topic:"legami", type:"mc",
  q:"Quale proprietà dei metalli è spiegata direttamente dalla mobilità degli elettroni nel legame metallico?",
  options:[
    "La fragilità tipica dei solidi ionici cristallini",
    "La bassa densità rispetto ai composti ionici",
    "L'elevata temperatura di fusione di molti metalli",
    "La buona conducibilità elettrica e termica",
    "L'elevata elettronegatività degli atomi metallici"], correct:3 },

{ id:"leg-21", topic:"legami", type:"mc",
  q:"Il legame a idrogeno si forma tipicamente quando l'idrogeno è legato covalentemente a:",
  options:[
    "Il carbonio, indipendentemente dalla sua elettronegatività",
    "Qualsiasi elemento della tavola periodica, senza eccezioni",
    "Un atomo piccolo e molto elettronegativo come F, O o N",
    "Il fosforo, un elemento scarsamente elettronegativo",
    "Lo zolfo, anch'esso poco elettronegativo e ingombrante"], correct:2 },

{ id:"leg-22", topic:"legami", type:"mc",
  q:"Rispetto al legame covalente, il legame a idrogeno è generalmente:",
  options:[
    "Di intensità identica",
    "Impossibile da rompere",
    "Più debole e più lungo",
    "Più forte e più corto",
    "Privo di energia"], correct:2 },

{ id:"leg-23", topic:"legami", type:"mc",
  q:"La particolare struttura del ghiaccio, meno densa dell'acqua liquida, è dovuta a:",
  options:[
    "Legami metallici che si instaurano tra le molecole d'acqua a bassa temperatura",
    "Un'elevata pressione interna generata dal congelamento rapido dell'acqua",
    "Legami ionici che si formano tra le molecole d'acqua allo stato solido",
    "L'assenza quasi totale di legami intermolecolari nel ghiaccio",
    "Legami a idrogeno che dispongono le molecole in una struttura aperta"], correct:4 },

{ id:"leg-24", topic:"legami", type:"mc",
  q:"Le forze di London (o forze di dispersione) sono forze attrattive che si instaurano tra:",
  options:[
    "Molecole non polari, tramite dipoli istantanei",
    "Ioni di carica opposta",
    "Cationi metallici",
    "Molecole polari con dipolo permanente",
    "Atomi legati covalentemente nella stessa molecola"], correct:0 },

{ id:"leg-25", topic:"legami", type:"mc",
  q:"L'intensità delle forze di London è inversamente proporzionale:",
  options:[
    "Alla massa molecolare",
    "Alla sesta potenza della distanza",
    "Alla prima potenza della distanza",
    "Alla temperatura assoluta",
    "Al quadrato della distanza"], correct:1 },

{ id:"leg-26", topic:"legami", type:"mc",
  q:"Il legame idrofobico è la forza che tiene unite tra loro:",
  options:[
    "Molecole polari, che formano legami a idrogeno con le molecole d'acqua",
    "Cationi metallici disposti in un reticolo cristallino ordinato",
    "Atomi dello stesso elemento uniti da un legame covalente puro",
    "Molecole non polari, per minimizzare il contatto con l'acqua",
    "Ioni di carica opposta, attratti da forze elettrostatiche"], correct:3 },

{ id:"leg-27", topic:"legami", type:"fill",
  q:"I gas nobili non formano legami chimici perché possiedono già una configurazione elettronica esterna particolarmente ________.",
  answer:"STABILE" },

{ id:"leg-28", topic:"legami", type:"fill",
  q:"Un legame covalente con ordine di legame pari a 2 si chiama legame ________.",
  answer:"DOPPIO" },

{ id:"leg-29", topic:"legami", type:"fill",
  q:"Un legame covalente con ordine di legame pari a 3 si chiama legame ________.",
  answer:"TRIPLO" },

{ id:"leg-30", topic:"legami", type:"fill",
  q:"Nel legame dativo, l'atomo che dona la coppia di elettroni è detto ________.",
  answer:"DONATORE" },

{ id:"leg-31", topic:"legami", type:"fill",
  q:"Il legame chimico dovuto all'attrazione tra cationi metallici e una nuvola di elettroni delocalizzati è detto legame ________.",
  answer:"METALLICO" },

{ id:"leg-32", topic:"legami", type:"fill",
  q:"Il legame debole che si forma tra l'idrogeno legato a F, O o N e un altro atomo elettronegativo è detto legame a ________.",
  answer:"IDROGENO" },

{ id:"leg-33", topic:"legami", type:"fill",
  q:"Le forze attrattive tra molecole non polari, dovute a dipoli istantanei, sono dette forze di ________.",
  answer:"LONDON" },

{ id:"leg-34", topic:"legami", type:"fill",
  q:"I composti ionici sono generalmente solubili in solventi ________, come l'acqua.",
  answer:"POLARI" },

/* ============================= NOMENCLATURA CHIMICA ============================= */

{ id:"nom-01", topic:"nomenclatura", type:"mc",
  q:"Il composto $K_2S$ è:",
  options:[
    "Solfuro di potassio",
    "Idrogeno solfuro di potassio",
    "Solfito di potassio",
    "Idrogeno solfato di potassio",
    "Solfato di potassio"], correct:0 },

{ id:"nom-02", topic:"nomenclatura", type:"mc",
  q:"Il nitrito di cadmio corrisponde a:",
  options:[
    "$Ca(NO_3)_2$",
    "$Cd(NO_2)_2$",
    "$Ca(NO_2)_2$",
    "$Cd(NO_3)_2$",
    "$CdNO_2$"], correct:1,
  explain:"Il cadmio forma tipicamente lo ione $Cd^{2+}$; il nitrito è $NO_2^-$, quindi la formula è $Cd(NO_2)_2$." },

{ id:"nom-03", topic:"nomenclatura", type:"mc",
  q:"Il nome del composto $KMnO_4$ è:",
  options:[
    "Ipomanganito di potassio",
    "Permanganato di potassio",
    "Manganato di potassio",
    "Manganito di potassio",
    "Ipomanganato di potassio"], correct:1 },

{ id:"nom-04", topic:"nomenclatura", type:"mc",
  q:"I sali sono composti che si formano dalla reazione di:",
  options:[
    "Un acido e una base",
    "Un ossidante e un riducente",
    "Un idruro e un metallo",
    "Un non metallo con ossigeno",
    "Un ossido e un metallo"], correct:0 },

{ id:"nom-05", topic:"nomenclatura", type:"mc",
  q:"L'anione derivante dall'atomo di idrogeno è detto:",
  options:[
    "Ione ossidrilico",
    "Ione idruro",
    "Radicale ossidrile",
    "Ione idrogeno",
    "Idrogenione"], correct:1 },

{ id:"nom-06", topic:"nomenclatura", type:"mc",
  q:"La formula del nitrato di ammonio è:",
  options:[
    "$NH_3NO_3$",
    "$NH_4NO_3$",
    "$NH_2NO_3$",
    "$(NH_4)_2NO_3$",
    "$NH_4NO_2$"], correct:1 },

{ id:"nom-07", topic:"nomenclatura", type:"mc",
  q:"La formula molecolare di un composto ci permette di conoscere:",
  options:[
    "La dimensione della molecola",
    "Solo il tipo degli atomi che lo compongono",
    "Il tipo e il numero di atomi",
    "La geometria della molecola",
    "La struttura della molecola"], correct:2 },

{ id:"nom-08", topic:"nomenclatura", type:"mc",
  q:"L'ossido di magnesio corrisponde alla formula:",
  options:[
    "$MgO$",
    "$MgO_2$",
    "$MnO$",
    "$Mn_2O_2$",
    "$Mg(OH)_2$"], correct:0 },

{ id:"nom-09", topic:"nomenclatura", type:"mc",
  q:"La formula del bicarbonato di calcio è:",
  options:[
    "$CaCO_3$",
    "$Ca(HCO_3)_2$",
    "$Ca(HCO_2)_2$",
    "$CaHCO_3$",
    "$Ca_3(CO_3)_2$"], correct:1 },

{ id:"nom-10", topic:"nomenclatura", type:"mc",
  q:"L'anidride dell'acido carbonico è:",
  options:[
    "$HCOOH$",
    "$CO_2$",
    "$CH_3COOH$",
    "$CO_3$",
    "$CO$"], correct:1 },

{ id:"nom-11", topic:"nomenclatura", type:"mc",
  q:"Il fluoruro di magnesio corrisponde alla formula:",
  options:[
    "$MnF$",
    "$MgF_2$",
    "$MgF$",
    "$Mg(FO)_2$",
    "$Mn_2F$"], correct:1 },

{ id:"nom-12", topic:"nomenclatura", type:"mc",
  q:"Indicare il catione alcalino.",
  options:[
    "$Cl^-$",
    "$Mg^{2+}$",
    "$F^-$",
    "$Ca^{2+}$",
    "$Li^+$"], correct:4 },

{ id:"nom-13", topic:"nomenclatura", type:"mc",
  q:"L'anidride fosforosa corrisponde alla formula:",
  options:[
    "$P_2O_3$",
    "$P_2O_5$",
    "$P_2O_2$",
    "$FO_2$",
    "$FO$"], correct:0 },

{ id:"nom-14", topic:"nomenclatura", type:"mc",
  q:"Il composto $MgH_2$ è:",
  options:[
    "Idruro di manganese",
    "Idrossido di magnesio",
    "Acido magnesidrico",
    "Idruro di magnesio",
    "Un idracido"], correct:3 },

{ id:"nom-15", topic:"nomenclatura", type:"mc",
  q:"Quanti atomi di idrogeno sono presenti in una molecola di solfato d'ammonio, $(NH_4)_2SO_4$?",
  options:[
    "10",
    "9",
    "8",
    "12",
    "6"], correct:2,
  explain:"Ci sono due gruppi $NH_4$, ciascuno con 4 atomi di H: $2\\times 4 = 8$." },

{ id:"nom-16", topic:"nomenclatura", type:"mc",
  q:"Una sola delle seguenti associazioni è ERRATA. Indicare quale:",
  options:[
    "$NH_4B$ = ammonio bromuro",
    "$HNO_2$ = acido nitroso",
    "$H_2SO_4$ = acido solforico",
    "$H_2SO_3$ = acido solforoso",
    "$H_3PO_4$ = acido ortofosforico"], correct:0,
  explain:"Il bromuro di ammonio ha formula $NH_4Br$ (Br = bromo), non $NH_4B$ (B = boro); inoltre in italiano si dice \"bromuro di ammonio\", non \"ammonio bromuro\"." },

{ id:"nom-17", topic:"nomenclatura", type:"mc",
  q:"Gli ossidi basici sono formati da:",
  options:[
    "Un non metallo e l'ossigeno",
    "Un non metallo, lo zolfo e l'ossigeno",
    "Un metallo, lo zolfo e l'ossigeno",
    "Un metallo e l'ossigeno",
    "Un elemento di transizione, ossigeno e idrogeno"], correct:3 },

{ id:"nom-18", topic:"nomenclatura", type:"mc",
  q:"Il composto $Cl_2O_7$ è:",
  options:[
    "Anidride ipoclorosa",
    "Anidride clorosa",
    "Anidride perclorica",
    "Ossido ipocloroso",
    "Ossido clorico"], correct:2 },

{ id:"nom-19", topic:"nomenclatura", type:"mc",
  q:"L'acido solforico corrisponde alla formula:",
  options:[
    "$H_2S$",
    "$H_2SO_3$",
    "$HSO_3$",
    "$H_2SO_4$",
    "$HSO_4$"], correct:3 },

{ id:"nom-20", topic:"nomenclatura", type:"mc",
  q:"L'acido (orto)fosforico corrisponde alla formula:",
  options:[
    "$H_2P_2O_7$",
    "$H_3PO_3$",
    "$HPO_2$",
    "$H_3PO_4$",
    "$HPO_3$"], correct:3 },

{ id:"nom-21", topic:"nomenclatura", type:"mc",
  q:"Secondo la teoria VSEPR, qual è il principio fondamentale che determina la geometria di una molecola covalente?",
  options:[
    "Gli atomi tendono a disporsi in modo da massimizzare il numero di legami doppi",
    "Gli elettroni non condivisi non influenzano la forma della molecola",
    "Le coppie di elettroni di valenza si dispongono intorno al nucleo in modo da minimizzare la repulsione reciproca",
    "Gli atomi tendono a disporsi in modo da massimizzare il numero di legami tripli",
    "La geometria è determinata esclusivamente dal numero di protoni nel nucleo centrale"], correct:2 },

{ id:"nom-22", topic:"nomenclatura", type:"mc",
  q:"Quale tra le seguenti molecole presenta una geometria angolare, secondo la teoria VSEPR?",
  options:[
    "$CO_2$",
    "$CH_4$",
    "$H_2O$",
    "$BF_3$",
    "$PCl_5$"], correct:2 },

{ id:"nom-23", topic:"nomenclatura", type:"mc",
  q:"Qual è l'angolo di legame ideale in una geometria tetraedrica?",
  options:[
    "104,5°",
    "90°",
    "109,5°",
    "180°",
    "120°"], correct:2 },

{ id:"nom-24", topic:"nomenclatura", type:"mc",
  q:"Secondo la teoria VSEPR, come si confronta l'angolo di legame di $H_2O$ con quello di $NH_3$?",
  options:[
    "L'angolo di $CH_4$ è minore di quello di $NH_3$",
    "L'angolo di $NH_3$ è maggiore di quello di $CH_4$",
    "L'angolo di $H_2O$ è maggiore di quello di $CH_4$",
    "L'angolo di $H_2O$ è maggiore di quello di $NH_3$",
    "L'angolo di $H_2O$ è minore di quello di $NH_3$"], correct:4,
  explain:"$H_2O$ ha due coppie di elettroni non condivise (angolo 104,5°), $NH_3$ ne ha una sola (angolo 107,5°): più coppie solitarie comprimono maggiormente l'angolo di legame." },

{ id:"nom-25", topic:"nomenclatura", type:"mc",
  q:"Il numero di ossidazione dell'ossigeno nella maggior parte dei composti è:",
  options:[
    "-1",
    "+1",
    "+2",
    "-2",
    "0"], correct:3 },

{ id:"nom-26", topic:"nomenclatura", type:"mc",
  q:"Il numero di ossidazione dell'ossigeno nei perossidi (es. $H_2O_2$) è:",
  options:[
    "-1",
    "+1",
    "-2",
    "+2",
    "0"], correct:0 },

{ id:"nom-27", topic:"nomenclatura", type:"mc",
  q:"Il numero di ossidazione dell'idrogeno negli idruri metallici (es. NaH) è:",
  options:[
    "-2",
    "-1",
    "+1",
    "+2",
    "0"], correct:1 },

{ id:"nom-28", topic:"nomenclatura", type:"mc",
  q:"La somma dei numeri di ossidazione degli elementi in un composto neutro è:",
  options:[
    "Uguale a 0",
    "Uguale alla carica del catione",
    "Uguale al numero di atomi",
    "Sempre negativa",
    "Sempre positiva"], correct:0 },

{ id:"nom-29", topic:"nomenclatura", type:"mc",
  q:"La somma dei numeri di ossidazione degli elementi in uno ione poliatomico è uguale a:",
  options:[
    "Il numero atomico dell'elemento centrale",
    "Il numero di atomi presenti",
    "La carica dello ione",
    "La massa molecolare dello ione",
    "Zero sempre"], correct:2 },

{ id:"nom-30", topic:"nomenclatura", type:"mc",
  q:"Il numero di ossidazione del fluoro in tutti i suoi composti è:",
  options:[
    "-1",
    "+1",
    "+2",
    "Variabile",
    "0"], correct:0 },

{ id:"nom-31", topic:"nomenclatura", type:"fill",
  q:"Gli idruri sono composti binari tra idrogeno e un ________.",
  answer:"METALLO" },

{ id:"nom-32", topic:"nomenclatura", type:"fill",
  q:"Le anidridi sono composti binari tra ossigeno e un ________.",
  answer:"NON METALLO" },

{ id:"nom-33", topic:"nomenclatura", type:"fill",
  q:"Gli idrossidi contengono l'anione ________ ($OH^-$).",
  answer:"OSSIDRILE", answerAlt:["IDROSSIDO","OSSIDRILIONE"] },

{ id:"nom-34", topic:"nomenclatura", type:"fill",
  q:"Gli acidi binari formati da idrogeno e un non metallo si chiamano ________.",
  answer:"IDRACIDI" },

{ id:"nom-35", topic:"nomenclatura", type:"fill",
  q:"Gli acidi ternari contenenti un non metallo, ossigeno e idrogeno si chiamano ________.",
  answer:"OSSIACIDI" },

{ id:"nom-36", topic:"nomenclatura", type:"fill",
  q:"Il suffisso utilizzato per l'anione di un sale che deriva da un idracido è ________.",
  answer:"URO" },

{ id:"nom-37", topic:"nomenclatura", type:"fill",
  q:"Il suffisso utilizzato per l'anione di un sale che deriva da un ossiacido terminante in -ico è ________.",
  answer:"ATO" },

{ id:"nom-38", topic:"nomenclatura", type:"fill",
  q:"Il suffisso utilizzato per l'anione di un sale che deriva da un ossiacido terminante in -oso è ________.",
  answer:"ITO" },

/* ============================= STRUTTURA E GEOMETRIA MOLECOLARE ============================= */

{ id:"geom-01", topic:"geometria", type:"mc",
  q:"La struttura di Lewis di una molecola rappresenta:",
  options:[
    "La temperatura di fusione e di ebollizione del composto in esame",
    "Esclusivamente la carica nucleare effettiva dell'atomo centrale",
    "La velocità media con cui si muovono gli elettroni di valenza",
    "La disposizione degli elettroni di valenza e dei legami tra gli atomi",
    "Solo la posizione degli atomi centrali nella molecola"], correct:3 },

{ id:"geom-02", topic:"geometria", type:"mc",
  q:"Nella costruzione della struttura di Lewis, l'atomo centrale di una molecola è generalmente:",
  options:[
    "Sempre l'atomo di ossigeno, qualunque sia la molecola",
    "Quello con la minore affinità elettronica",
    "Sempre l'atomo di idrogeno, se presente nella molecola",
    "Quello con la maggiore affinità elettronica",
    "Scelto in modo casuale tra gli atomi della molecola"], correct:1 },

{ id:"geom-03", topic:"geometria", type:"mc",
  q:"Nella struttura di Lewis, l'atomo di idrogeno:",
  options:[
    "È sempre terminale, perché si lega a un solo atomo",
    "Forma sempre e soltanto legami dativi con l'atomo centrale",
    "Può essere sia centrale che terminale",
    "Non compare mai nelle strutture di Lewis",
    "È sempre l'atomo centrale, mai terminale, nella molecola"], correct:0 },

{ id:"geom-04", topic:"geometria", type:"mc",
  q:"La geometria molecolare del metano ($CH_4$), secondo la teoria VSEPR, è:",
  options:[
    "Tetraedrica",
    "Planare",
    "Piramidale a base triangolare",
    "Angolare",
    "Lineare"], correct:0 },

{ id:"geom-05", topic:"geometria", type:"mc",
  q:"La geometria molecolare dell'ammoniaca ($NH_3$), secondo la teoria VSEPR, è:",
  options:[
    "Piramidale a base triangolare",
    "Lineare, con angolo di 180°",
    "Angolare, come nella molecola d'acqua",
    "Planare quadrata, con angoli di 90°",
    "Tetraedrica, con angoli di 109,5°"], correct:0 },

{ id:"geom-06", topic:"geometria", type:"mc",
  q:"Perché l'angolo di legame in $NH_3$ (107,5°) è inferiore a quello ideale tetraedrico (109,5°)?",
  options:[
    "Perché la coppia di elettroni non condivisa sull'azoto occupa più spazio e respinge maggiormente le coppie di legame",
    "Per un errore sperimentale nella misurazione degli angoli di legame in laboratorio",
    "Perché l'idrogeno è troppo piccolo per occupare correttamente la posizione tetraedrica",
    "Perché l'azoto è molto elettronegativo e attrae fortemente le coppie di legame verso di sé",
    "Perché la molecola è ionica e non segue le normali regole della teoria VSEPR"], correct:0 },

{ id:"geom-07", topic:"geometria", type:"mc",
  q:"Perché l'angolo di legame in $H_2O$ (104,5°) è ancora più ridotto rispetto a quello di $NH_3$?",
  options:[
    "Non c'è alcuna differenza reale: i due angoli sono in realtà identici",
    "Perché la molecola d'acqua non rispetta la regola dell'ottetto sull'ossigeno",
    "Perché l'ossigeno ha due coppie di elettroni non condivise, che respingono maggiormente le coppie di legame",
    "Perché l'acqua è una molecola ionica, priva di legami covalenti tra ossigeno e idrogeno",
    "Perché nell'acqua è l'atomo di idrogeno a portare una carica negativa netta"], correct:2 },

{ id:"geom-08", topic:"geometria", type:"mc",
  q:"Nella molecola d'acqua, il numero di regioni di densità elettronica intorno all'atomo di ossigeno è:",
  options:[
    "4",
    "5",
    "3",
    "2",
    "6"], correct:0,
  explain:"2 legami covalenti O–H più 2 coppie solitarie = 4 regioni di densità elettronica." },

{ id:"geom-09", topic:"geometria", type:"mc",
  q:"Una molecola con quattro regioni di densità elettronica, tutte impegnate in legami (nessuna coppia solitaria), ha geometria:",
  options:[
    "Piramidale",
    "Angolare",
    "Planare triangolare",
    "Lineare",
    "Tetraedrica"], correct:4 },

{ id:"geom-10", topic:"geometria", type:"mc",
  q:"Le coppie di elettroni non condivise (di non legame), rispetto alle coppie di legame, generalmente:",
  options:[
    "Si comportano in modo identico alle coppie di legame",
    "Occupano meno spazio e respingono meno",
    "Occupano più spazio e respingono maggiormente le coppie adiacenti",
    "Non hanno alcun effetto sulla geometria molecolare",
    "Eliminano la geometria tetraedrica"], correct:2 },

{ id:"geom-11", topic:"geometria", type:"mc",
  q:"La molecola di $CO_2$ è apolare, nonostante i legami $C=O$ siano polarizzati, perché:",
  options:[
    "Non ci sono legami doppi tra il carbonio e gli atomi di ossigeno",
    "È una molecola ionica, priva di legami covalenti polarizzati",
    "Il carbonio non è affatto elettronegativo, a differenza dell'ossigeno",
    "L'ossigeno non possiede alcuna elettronegatività propria",
    "La sua geometria lineare e simmetrica fa annullare vettorialmente i dipoli di legame"], correct:4 },

{ id:"geom-12", topic:"geometria", type:"mc",
  q:"Quale delle seguenti molecole è polare?",
  options:[
    "$BF_3$",
    "$H_2O$",
    "$CH_4$",
    "$Cl_2$",
    "$CO_2$"], correct:1 },

{ id:"geom-13", topic:"geometria", type:"mc",
  q:"Una molecola con legami covalenti polarizzati può risultare complessivamente apolare se:",
  options:[
    "È sempre una molecola ionica, priva di legami covalenti veri e propri",
    "Ha una geometria molecolare simmetrica che fa annullare vettorialmente i dipoli di legame",
    "Non ha mai legami polarizzati, essendo composta da atomi tutti uguali",
    "Ha un solo tipo di atomo, disposto in una struttura perfettamente simmetrica",
    "Non possiede alcun elettrone di valenza disponibile per formare legami"], correct:1 },

{ id:"geom-14", topic:"geometria", type:"fill",
  q:"La teoria che permette di prevedere la geometria molecolare a partire dalla repulsione tra le coppie di elettroni di valenza si chiama teoria ________.",
  answer:"VSEPR" },

{ id:"geom-15", topic:"geometria", type:"fill",
  q:"La geometria molecolare del metano ($CH_4$) è ________.",
  answer:"TETRAEDRICA" },

{ id:"geom-16", topic:"geometria", type:"fill",
  q:"L'angolo di legame ideale nella geometria tetraedrica è ________ gradi.",
  answer:"109,5", answerAlt:["109.5"] },

{ id:"geom-17", topic:"geometria", type:"fill",
  q:"L'angolo di legame sperimentale nella molecola di ammoniaca è di circa ________ gradi.",
  answer:"107,5", answerAlt:["107.5"] },

{ id:"geom-18", topic:"geometria", type:"fill",
  q:"L'angolo di legame sperimentale nella molecola d'acqua è di circa ________ gradi.",
  answer:"104,5", answerAlt:["104.5"] },

{ id:"geom-19", topic:"geometria", type:"fill",
  q:"Una molecola i cui legami polarizzati si annullano vettorialmente per simmetria si dice ________.",
  answer:"APOLARE" },

/* =========================================================================
   BIOLOGIA
   ========================================================================= */

/* ============================= BASI MOLECOLARI DELLA VITA ============================= */

{ id:"bio-01", topic:"biomolecole", type:"mc",
  q:"Quali sono i quattro elementi chimici più abbondanti nella materia vivente?",
  options:[
    "C, N, P, S",
    "Na, K, Ca, Mg",
    "C, H, O, N",
    "P, S, Cl, I",
    "Fe, Cu, Zn, Mn"], correct:2 },

{ id:"bio-02", topic:"biomolecole", type:"mc",
  q:"Qual è il componente chimico più abbondante delle cellule?",
  options:[
    "Il glucosio",
    "Le proteine",
    "L'acqua",
    "Il DNA",
    "I lipidi"], correct:2 },

{ id:"bio-03", topic:"biomolecole", type:"mc",
  q:"Le macromolecole biologiche sono:",
  options:[
    "Polimeri costituiti da monomeri uniti da legami covalenti",
    "Polimeri di monomeri tenuti insieme esclusivamente da legami a idrogeno",
    "Assemblati di monomeri identici uniti sempre da legami peptidici",
    "Molecole prive di monomeri, sintetizzate in un unico passaggio non ripetitivo",
    "Strutture minerali di natura esclusivamente inorganica, prive di carbonio"], correct:0 },

{ id:"bio-04", topic:"biomolecole", type:"mc",
  q:"Le macromolecole biologiche si formano mediante reazioni di:",
  options:[
    "Precipitazione",
    "Condensazione",
    "Ossidoriduzione",
    "Sublimazione",
    "Neutralizzazione"], correct:1,
  explain:"La condensazione avviene con perdita di una molecola d'acqua; la degradazione avviene invece per idrolisi." },

{ id:"bio-05", topic:"biomolecole", type:"mc",
  q:"La degradazione delle macromolecole biologiche avviene generalmente mediante reazioni di:",
  options:[
    "Fosforilazione",
    "Ossidazione",
    "Condensazione",
    "Polimerizzazione",
    "Idrolisi"], correct:4 },

{ id:"bio-06", topic:"biomolecole", type:"mc",
  q:"Quali sono le quattro principali classi di macromolecole biologiche?",
  options:[
    "Vitamine, sali minerali, acqua, ormoni",
    "Actina, tubulina, miosina, cheratina",
    "Carboidrati, proteine, lipidi, acidi nucleici",
    "Enzimi, recettori, canali, pompe",
    "Glucosio, fruttosio, saccarosio, amido"], correct:2 },

{ id:"bio-07", topic:"biomolecole", type:"mc",
  q:"Quali ioni svolgono un ruolo importante come co-fattori di reazioni enzimatiche?",
  options:[
    "$Ca^{2+}$ e $Mg^{2+}$",
    "Nessuno ione svolge questo ruolo",
    "Solo ioni negativi",
    "$K^+$ esclusivamente",
    "$Na^+$ e $Cl^-$"], correct:0 },

{ id:"bio-08", topic:"biomolecole", type:"mc",
  q:"Gli ioni $Na^+$, $K^+$ e $Cl^-$ svolgono un ruolo cruciale nella regolazione di:",
  options:[
    "Il numero di ossidazione del carbonio",
    "La pressione osmotica",
    "Il codice genetico",
    "La struttura del DNA",
    "La sintesi proteica esclusivamente"], correct:1 },

{ id:"bio-09", topic:"biomolecole", type:"mc",
  q:"La polimerizzazione degli acidi nucleici, a differenza di quella di proteine e polisaccaridi, utilizza come precursori:",
  options:[
    "Amminoacidi liberi attivati da tRNA specifici per ciascun codone",
    "Acidi grassi liberi uniti da legami estere al glicerolo",
    "Ioni metallici bivalenti, cofattori essenziali di molti enzimi cellulari",
    "Zuccheri semplici legati direttamente tra loro da legami glicosidici",
    "Nucleosidi trifosfato, con rilascio di pirofosfato"], correct:4 },

{ id:"bio-10", topic:"biomolecole", type:"mc",
  q:"Il DNA, in base alla sua funzione biologica, è l'acido nucleico deputato principalmente a:",
  options:[
    "Il controllo del traffico di membrana",
    "Il trasporto di ossigeno",
    "La catalisi di reazioni biochimiche",
    "La conservazione dell'informazione genetica",
    "La sintesi diretta di proteine"], correct:3 },

{ id:"bio-11", topic:"biomolecole", type:"mc",
  q:"L'RNA messaggero (mRNA) ha la funzione principale di:",
  options:[
    "Dirigere la sintesi delle proteine",
    "Trasportare ioni attraverso le membrane",
    "Conservare l'informazione genetica a lungo termine",
    "Costituire il citoscheletro",
    "Catalizzare reazioni metaboliche"], correct:0 },

{ id:"bio-12", topic:"biomolecole", type:"mc",
  q:"Quale categoria di RNA è coinvolta nel controllo dell'espressione genica (es. miRNA, siRNA)?",
  options:[
    "RNA ribosomale",
    "RNA di trasporto (tRNA)",
    "DNA",
    "RNA messaggero",
    "RNA regolatori"], correct:4 },

{ id:"bio-13", topic:"biomolecole", type:"mc",
  q:"Il nucleotide dAMP è composto da 2'-deossi-D-ribosio, una base azotata (adenina) e:",
  options:[
    "Un gruppo ossidrilico aggiuntivo",
    "Un gruppo fosfato",
    "Un gruppo solfato",
    "Un gruppo carbossilico",
    "Un gruppo amminico"], correct:1,
  explain:"Domanda ispirata alla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"bio-14", topic:"biomolecole", type:"mc",
  q:"Le proteine, in base alla loro funzione biologica, possono agire come:",
  options:[
    "Esclusivamente come anticorpi del sistema immunitario, senza altre funzioni biologiche",
    "Enzimi, proteine strutturali, di trasporto, recettori e molte altre funzioni",
    "Solo come catalizzatori enzimatici, l'unica funzione svolta dalle proteine cellulari",
    "Esclusivamente come molecole di riserva energetica, analoghe ai lipidi di deposito",
    "Solo come recettori di membrana per il legame di ormoni e neurotrasmettitori"], correct:1 },

{ id:"bio-15", topic:"biomolecole", type:"fill",
  q:"Le macromolecole biologiche sono costituite da unità ripetute chiamate ________.",
  answer:"MONOMERI" },

{ id:"bio-16", topic:"biomolecole", type:"fill",
  q:"Il componente chimico più abbondante delle cellule è ________.",
  answer:"ACQUA", answerAlt:["L'ACQUA"] },

{ id:"bio-17", topic:"biomolecole", type:"fill",
  q:"Le reazioni che uniscono i monomeri in una macromolecola, con perdita di una molecola d'acqua, sono dette reazioni di ________.",
  answer:"CONDENSAZIONE" },

{ id:"bio-18", topic:"biomolecole", type:"fill",
  q:"Le reazioni che degradano le macromolecole per aggiunta di acqua sono dette reazioni di ________.",
  answer:"IDROLISI" },

{ id:"bio-19", topic:"biomolecole", type:"fill",
  q:"Gli ioni $Ca^{2+}$ e $Mg^{2+}$ agiscono spesso come ________ di reazioni enzimatiche.",
  answer:"COFATTORI", answerAlt:["CO-FATTORI"] },

{ id:"bio-20", topic:"biomolecole", type:"fill",
  q:"L'unità monomerica degli acidi nucleici è il ________.",
  answer:"NUCLEOTIDE" },

{ id:"bio-21", topic:"biomolecole", type:"mc",
  q:"I carboidrati sono molecole polari la cui formula generale approssimata è:",
  options:[
    "$COOH$",
    "$C_2H_5OH$",
    "$CH_2O$",
    "$NH_2CHRCOOH$",
    "$C_nH_{2n}$"], correct:2 },

{ id:"bio-22", topic:"biomolecole", type:"mc",
  q:"I gruppi funzionali caratteristici dei carboidrati sono:",
  options:[
    "Il gruppo amminico e il gruppo carbossilico, tipici degli amminoacidi",
    "Il gruppo carbonilico (aldeidico o chetonico) e il gruppo ossidrilico",
    "Il gruppo carbossilico e il gruppo estereo, caratteristici degli acidi grassi",
    "Il gruppo solfidrilico e il gruppo fosfato, tipici di alcuni amminoacidi",
    "Il gruppo fosfato e la base azotata, caratteristici dei nucleotidi"], correct:1 },

{ id:"bio-23", topic:"biomolecole", type:"mc",
  q:"I monosaccaridi vengono classificati in base alla posizione del gruppo carbonilico in:",
  options:[
    "Aldosi e chetosi",
    "Alfa e beta",
    "Riducenti e non riducenti",
    "Furani e pirani",
    "Ciclici e lineari"], correct:0 },

{ id:"bio-24", topic:"biomolecole", type:"mc",
  q:"In soluzione acquosa, un monosaccaride come il glucosio ciclizza spontaneamente formando un centro chirale addizionale, detto:",
  options:[
    "Carbonio terminale",
    "Carbonio asimmetrico primario",
    "Carbonio anomerico beta soltanto",
    "Carbonio anomerico",
    "Centro racemico"], correct:3 },

{ id:"bio-25", topic:"biomolecole", type:"mc",
  q:"I due stereoisomeri che il glucosio può assumere dopo la ciclizzazione, a seconda dell'orientazione dell'ossidrile sul carbonio anomerico, si chiamano:",
  options:[
    "Furanosio e glucosio",
    "Forma cis e forma trans",
    "Aldosio e chetosio",
    "Isomero D e isomero L",
    "Anomero α e anomero β"], correct:4 },

{ id:"bio-26", topic:"biomolecole", type:"mc",
  q:"Il legame che unisce due monosaccaridi, formatosi con perdita di una molecola d'acqua, si chiama:",
  options:[
    "Legame fosfodiesterico",
    "Legame a idrogeno",
    "Legame estere semplice",
    "Legame peptidico",
    "Legame glicosidico"], correct:4 },

{ id:"bio-27", topic:"biomolecole", type:"mc",
  q:"Il disaccaride saccarosio (zucchero da cucina) è formato dall'unione, tramite legame α1-2, di:",
  options:[
    "Glucosio e galattosio",
    "Due molecole di fruttosio",
    "Glucosio e fruttosio",
    "Galattosio e fruttosio",
    "Due molecole di glucosio"], correct:2 },

{ id:"bio-28", topic:"biomolecole", type:"mc",
  q:"Il disaccaride lattosio, presente nel latte, è costituito da:",
  options:[
    "Due molecole di galattosio",
    "Due molecole di glucosio legate α1-4",
    "Glucosio e fruttosio legati α1-2",
    "Fruttosio legato al galattosio",
    "Galattosio legato con legame β1-4 al glucosio"], correct:4 },

{ id:"bio-29", topic:"biomolecole", type:"mc",
  q:"Gli oligosaccaridi, legati a proteine o lipidi di membrana per formare rispettivamente glicoproteine e glicolipidi, svolgono principalmente una funzione di:",
  options:[
    "Riserva energetica primaria, accumulata come il glicogeno nel fegato e nei muscoli",
    "Trasmissione dell'informazione genetica da una generazione cellulare alla successiva",
    "Riconoscimento cellulare (es. determinazione dei gruppi sanguigni nel sistema AB0)",
    "Trasporto di ossigeno nel sangue, come svolto dall'emoglobina nei globuli rossi",
    "Catalisi delle reazioni metaboliche, funzione tipica degli enzimi proteici"], correct:2 },

{ id:"bio-30", topic:"biomolecole", type:"mc",
  q:"I polisaccaridi costituiti da un unico tipo di monosaccaride ripetuto si dicono:",
  options:[
    "Disaccaridi",
    "Glicoproteine",
    "Oligosaccaridi",
    "Omopolisaccaridi",
    "Eteropolisaccaridi"], correct:3 },

{ id:"bio-31", topic:"biomolecole", type:"mc",
  q:"L'amido, polisaccaride di riserva delle piante, è costituito da:",
  options:[
    "Unità alternate di glucosio e galattosio, unite da legami glicosidici β1-4, come nel disaccaride lattosio",
    "Esclusivamente amilopectina: un'unica catena fortemente ramificata con legami α1-4 e diramazioni α1-6",
    "Catene lineari di glucosio unite unicamente da legami β1-4, come nella cellulosa vegetale",
    "Amilosio (catena lineare, legami α1-4) e amilopectina (ramificata, legami α1-4 con ramificazioni α1-6)",
    "Un'unica catena lineare non ramificata di fruttosio, priva di qualunque ramificazione α1-6"], correct:3 },

{ id:"bio-32", topic:"biomolecole", type:"mc",
  q:"Il glicogeno, principale polisaccaride di riserva energetica negli animali, è accumulato soprattutto in:",
  options:[
    "Tessuto adiposo ed encefalo",
    "Reni e polmoni",
    "Pelle e ossa",
    "Fegato e muscoli",
    "Sangue e linfa"], correct:3 },

{ id:"bio-33", topic:"biomolecole", type:"mc",
  q:"La cellulosa, a differenza dell'amido e del glicogeno, è formata da unità di glucosio unite da legami:",
  options:[
    "Fosfodiesterici, tipici del legame tra i nucleotidi degli acidi nucleici",
    "β1-4, che generano una catena lineare rigida non digeribile dall'uomo",
    "α1-4, che generano una catena facilmente digeribile come nell'amido",
    "Peptidici, gli stessi legami che uniscono gli amminoacidi nelle proteine",
    "α1-6, tipici delle ramificazioni dell'amilopectina e del glicogeno"], correct:1,
  explain:"L'uomo non possiede l'enzima in grado di idrolizzare il legame β1-4 della cellulosa, che per questo risulta indigeribile (fibra alimentare)." },

{ id:"bio-34", topic:"biomolecole", type:"fill",
  q:"L'unità più semplice dei carboidrati, non ulteriormente idrolizzabile, è il ________.",
  answer:"MONOSACCARIDE" },

/* ============================= AMMINOACIDI E PROTEINE ============================= */

{ id:"prot-01", topic:"proteine", type:"mc",
  q:"Le proteine sono polimeri costituiti da monomeri chiamati:",
  options:[
    "Nucleotidi",
    "Basi azotate",
    "Monosaccaridi",
    "Acidi grassi",
    "Amminoacidi"], correct:4 },

{ id:"prot-02", topic:"proteine", type:"mc",
  q:"Quanti amminoacidi standard compongono le proteine?",
  options:[
    "15",
    "10",
    "25",
    "30",
    "20"], correct:4 },

{ id:"prot-03", topic:"proteine", type:"mc",
  q:"Ogni amminoacido presenta un gruppo amminico, un gruppo carbossilico, un atomo di idrogeno e:",
  options:[
    "Un secondo gruppo carbossilico legato allo stesso atomo di carbonio",
    "Sempre un anello aromatico, presente in ogni amminoacido standard",
    "Un gruppo ossidrilico, sempre legato al carbonio α",
    "Un gruppo fosfato, indispensabile per il legame peptidico",
    "Un gruppo funzionale R (catena laterale) variabile"], correct:4 },

{ id:"prot-04", topic:"proteine", type:"mc",
  q:"A pH fisiologico, il gruppo amminico di un amminoacido è tipicamente:",
  options:[
    "Carico negativamente",
    "Assente",
    "Legato covalentemente a un fosfato",
    "Neutro e non dissociato",
    "Carico positivamente ($NH_3^+$)"], correct:4 },

{ id:"prot-05", topic:"proteine", type:"mc",
  q:"A pH fisiologico, il gruppo carbossilico di un amminoacido è tipicamente:",
  options:[
    "Neutro",
    "Carico negativamente ($COO^-$)",
    "Carico positivamente",
    "Assente",
    "Sempre legato al gruppo amminico di un altro amminoacido"], correct:1 },

{ id:"prot-06", topic:"proteine", type:"mc",
  q:"Gli amminoacidi si possono classificare, in base alla catena laterale, in:",
  options:[
    "Solo in acidi e basici, in base alla carica del gruppo amminico",
    "Solo in essenziali e non essenziali, in base alla dieta",
    "Solo in aromatici e non aromatici, in base all'anello benzenico",
    "Polari con carica, polari senza carica e non polari",
    "Solo in isomeri di tipo L e di tipo D, in base alla chiralità"], correct:3 },

{ id:"prot-07", topic:"proteine", type:"mc",
  q:"Quale amminoacido, privo di un centro chirale, non presenta isomeria ottica?",
  options:[
    "Leucina",
    "Valina",
    "Alanina",
    "Glicina",
    "Serina"], correct:3 },

{ id:"prot-08", topic:"proteine", type:"mc",
  q:"Gli amminoacidi tipicamente presenti nelle proteine appartengono alla serie:",
  options:[
    "Meso",
    "Sia D che L in ugual misura",
    "D",
    "Racemica",
    "L"], correct:4 },

{ id:"prot-09", topic:"proteine", type:"mc",
  q:"Il legame peptidico si forma tra:",
  options:[
    "Due gruppi carbossilici di amminoacidi adiacenti, con formazione di un legame anidridico",
    "Due catene laterali R adiacenti, tramite un ponte disolfuro covalente",
    "Un gruppo fosfato di un nucleotide e un gruppo ossidrilico dello zucchero",
    "Due gruppi amminici di amminoacidi adiacenti, con perdita di ammoniaca",
    "Il gruppo carbossilico di un amminoacido e il gruppo amminico di un altro, con perdita di acqua"], correct:4 },

{ id:"prot-10", topic:"proteine", type:"mc",
  q:"Il legame peptidico si forma tramite una reazione di:",
  options:[
    "Ossidoriduzione",
    "Fosforilazione",
    "Idrolisi",
    "Decarbossilazione",
    "Condensazione"], correct:4 },

{ id:"prot-11", topic:"proteine", type:"mc",
  q:"Una catena polipeptidica cresce in direzione:",
  options:[
    "Casuale",
    "Dal centro verso le estremità",
    "Dal C-terminale verso l'N-terminale",
    "Dall'N-terminale verso il C-terminale",
    "Non ha una direzionalità definita"], correct:3 },

{ id:"prot-12", topic:"proteine", type:"mc",
  q:"La struttura primaria di una proteina è definita da:",
  options:[
    "La sequenza di amminoacidi nella catena polipeptidica",
    "Il ripiegamento tridimensionale complessivo della catena polipeptidica",
    "I legami a idrogeno tra i gruppi C=O e N-H dello scheletro peptidico",
    "Le interazioni idrofobiche tra catene laterali non polari",
    "L'associazione non covalente di più subunità proteiche"], correct:0 },

{ id:"prot-13", topic:"proteine", type:"mc",
  q:"Quale forza chimica mantiene la struttura primaria di una proteina?",
  options:[
    "Interazioni idrofobiche",
    "Ponti disolfuro",
    "Legami a idrogeno",
    "Il legame peptidico covalente",
    "Forze di van der Waals"], correct:3 },

{ id:"prot-14", topic:"proteine", type:"mc",
  q:"La struttura secondaria di una proteina è stabilizzata principalmente da:",
  options:[
    "Interazioni elettrostatiche tra le catene laterali cariche",
    "Legami a idrogeno tra i gruppi C=O e N–H dello scheletro peptidico",
    "Legami covalenti tra i gruppi tiolici di residui di cisteina",
    "Esclusivamente forze di van der Waals tra le catene laterali apolari",
    "Ponti disolfuro tra residui di cisteina non adiacenti"], correct:1 },

{ id:"prot-15", topic:"proteine", type:"mc",
  q:"L'α-elica è una struttura secondaria che si avvolge generalmente in senso:",
  options:[
    "Non ha una chiralità definita",
    "Orizzontale",
    "Variabile in modo casuale",
    "Destrorso",
    "Sinistrorso"], correct:3 },

{ id:"prot-16", topic:"proteine", type:"mc",
  q:"Quanti amminoacidi per giro caratterizzano tipicamente l'α-elica?",
  options:[
    "Circa 10",
    "Circa 5",
    "Circa 2",
    "Circa 8",
    "Circa 3,6"], correct:4 },

{ id:"prot-17", topic:"proteine", type:"mc",
  q:"Nel foglietto β antiparallelo, i filamenti adiacenti procedono:",
  options:[
    "Solo in direzione C→N",
    "Non hanno una direzione definita",
    "In direzioni opposte",
    "In modo perpendicolare tra loro",
    "Nella stessa direzione N→C"], correct:2 },

{ id:"prot-18", topic:"proteine", type:"mc",
  q:"I 'turn' o ripiegamenti β, che permettono alla catena polipeptidica di cambiare bruscamente direzione, sono frequentemente costituiti da:",
  options:[
    "Triptofano e fenilalanina",
    "Cisteina e metionina",
    "Lisina e arginina",
    "Glicina e prolina",
    "Leucina e valina"], correct:3 },

{ id:"prot-19", topic:"proteine", type:"mc",
  q:"La struttura terziaria di una proteina rappresenta:",
  options:[
    "Un tipo di modificazione post-traduzionale, come la fosforilazione",
    "La sequenza lineare di amminoacidi lungo la catena polipeptidica",
    "L'associazione non covalente di più catene polipeptidiche distinte",
    "La composizione percentuale dei singoli amminoacidi nella proteina",
    "La forma tridimensionale complessiva di una singola catena polipeptidica"], correct:4 },

{ id:"prot-20", topic:"proteine", type:"mc",
  q:"Quale forza NON contribuisce alla stabilizzazione della struttura terziaria delle proteine?",
  options:[
    "Legami a idrogeno",
    "Il legame fosfodiestere",
    "Interazioni elettrostatiche (ponti salini)",
    "Interazioni idrofobiche",
    "Ponti disolfuro"], correct:1,
  explain:"Il legame fosfodiestere è tipico degli acidi nucleici (DNA/RNA), non delle proteine." },

{ id:"prot-21", topic:"proteine", type:"mc",
  q:"I ponti disolfuro si formano tra i gruppi sulfidrilici (–SH) delle catene laterali di:",
  options:[
    "Istidina",
    "Serina",
    "Treonina",
    "Metionina",
    "Cisteina"], correct:4 },

{ id:"prot-22", topic:"proteine", type:"mc",
  q:"La struttura quaternaria di una proteina si riferisce a:",
  options:[
    "La sequenza di amminoacidi",
    "L'associazione di più catene polipeptidiche (subunità)",
    "Il ripiegamento di una singola catena polipeptidica",
    "La localizzazione cellulare della proteina",
    "Le sole modificazioni post-traduzionali"], correct:1 },

{ id:"prot-23", topic:"proteine", type:"mc",
  q:"Le amminoacil-tRNA sintetasi catalizzano il legame tra un amminoacido e il tRNA coinvolgendo:",
  options:[
    "Il gruppo $NH_2$ dell'amminoacido con l'estremità 5' del tRNA",
    "Due molecole di tRNA diverse",
    "Il codone dell'mRNA direttamente",
    "Il gruppo $NH_2$ dell'amminoacido con l'estremità 3'-OH del tRNA",
    "Il gruppo $COOH$ dell'amminoacido con l'estremità 3'-OH del tRNA"], correct:4,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"prot-24", topic:"proteine", type:"fill",
  q:"Il legame peptidico si forma tra il gruppo carbossilico dell'amminoacido donatore e il gruppo amminico dell'amminoacido accettore, con liberazione di una molecola di ________.",
  answer:"ACQUA", answerAlt:["H2O","H₂O"],
  explain:"Domanda ispirata alla prova ufficiale del semestre filtro 2025 (secondo appello)." },

{ id:"prot-25", topic:"proteine", type:"fill",
  q:"Il motivo strutturale 'coiled-coil' è costituito tipicamente da due o più ________ che si avvolgono l'una attorno all'altra.",
  answer:"ALFA-ELICHE", answerAlt:["Α-ELICHE","ELICHE"],
  explain:"Domanda ispirata alla prova ufficiale del semestre filtro 2025 (secondo appello)." },

{ id:"prot-26", topic:"proteine", type:"fill",
  q:"L'emoglobina, formata da due subunità α e due subunità β, è un esempio di proteina con struttura ________.",
  answer:"QUATERNARIA" },

{ id:"prot-27", topic:"proteine", type:"fill",
  q:"Le subunità identiche in una proteina a struttura quaternaria formano un ________.",
  answer:"OMOOLIGOMERO" },

{ id:"prot-28", topic:"proteine", type:"fill",
  q:"La modificazione post-traduzionale che consiste nell'aggiunta di un gruppo fosfato è detta ________.",
  answer:"FOSFORILAZIONE" },

{ id:"prot-29", topic:"proteine", type:"fill",
  q:"L'enzima che rimuove un gruppo fosfato da una proteina è detto ________.",
  answer:"FOSFATASI" },

{ id:"prot-30", topic:"proteine", type:"fill",
  q:"La modificazione post-traduzionale che aggiunge un gruppo acetile a una proteina è detta ________.",
  answer:"ACETILAZIONE" },

{ id:"prot-31", topic:"proteine", type:"fill",
  q:"L'ubiquitinazione consiste nel legame covalente di una piccola proteina di 76 amminoacidi chiamata ________ a una proteina bersaglio.",
  answer:"UBIQUITINA" },

{ id:"prot-32", topic:"proteine", type:"fill",
  q:"Le regioni globulari, compatte e strutturalmente indipendenti che costituiscono le unità funzionali di una proteina sono dette ________.",
  answer:"DOMINI" },

{ id:"prot-33", topic:"proteine", type:"fill",
  q:"Gli amminoacidi non polari come leucina e valina tendono a raggrupparsi all'interno di una proteina ripiegata, formando un core ________.",
  answer:"IDROFOBICO" },

{ id:"prot-34", topic:"proteine", type:"mc",
  q:"Gli amminoacidi con catena laterale prevalentemente idrofobica, che nelle proteine globulari si trovano spesso all'interno della molecola, si dicono:",
  options:[
    "Polari carichi positivamente (es. lisina, arginina, istidina)",
    "Polari carichi negativamente (es. aspartato, glutammato)",
    "Apolari (es. glicina, alanina, valina, leucina, isoleucina, metionina, prolina)",
    "Essenziali, cioè non sintetizzabili dall'organismo",
    "Aromatici soltanto (es. fenilalanina, tirosina, triptofano)"], correct:2 },

{ id:"prot-35", topic:"proteine", type:"mc",
  q:"Gli amminoacidi in grado di interagire con l'acqua e di formare legami idrogeno, spesso esposti sulla superficie della proteina, sono detti:",
  options:[
    "Apolari (es. glicina, alanina, valina, leucina, isoleucina)",
    "Acidi, cioè carichi negativamente (es. aspartato, glutammato)",
    "Essenziali soltanto, indipendentemente dalla polarità",
    "Basici, cioè carichi positivamente (es. lisina, arginina)",
    "Polari non carichi (es. serina, treonina, asparagina, glutammina, tirosina, cisteina)"], correct:4 },

{ id:"prot-36", topic:"proteine", type:"mc",
  q:"Gli amminoacidi carichi negativamente a pH fisiologico, come l'acido aspartico e l'acido glutammico, si dicono amminoacidi:",
  options:[
    "Apolari",
    "Aromatici",
    "Essenziali",
    "Acidi",
    "Basici"], correct:3 },

{ id:"prot-37", topic:"proteine", type:"mc",
  q:"Lisina, arginina e istidina, capaci di accettare protoni e presentare carica positiva, appartengono alla classe degli amminoacidi:",
  options:[
    "Acidi",
    "Polari non carichi",
    "Aromatici soltanto",
    "Apolari",
    "Basici"], correct:4 },

{ id:"prot-38", topic:"proteine", type:"mc",
  q:"Gli amminoacidi essenziali sono quelli che:",
  options:[
    "L'organismo non è in grado di sintetizzare e devono essere assunti con la dieta",
    "Sono presenti soltanto negli organismi vegetali, mai in quelli animali",
    "Non partecipano mai alla struttura primaria delle proteine cellulari",
    "Vengono sintetizzati dall'organismo a partire da altri intermedi metabolici",
    "Non possiedono mai un centro chirale, a differenza degli altri amminoacidi"], correct:0,
  explain:"Nell'uomo sono nove: fenilalanina, valina, treonina, triptofano, metionina, leucina, isoleucina, lisina e istidina." },

{ id:"prot-39", topic:"proteine", type:"mc",
  q:"Un amminoacido si definisce anfotero perché:",
  options:[
    "Non presenta mai un gruppo carbossilico, ma solo il gruppo amminico protonato",
    "Possiede sia un gruppo acido (-COOH) sia un gruppo basico (-NH₂) e può comportarsi come acido o come base a seconda del pH",
    "Non ha mai carica netta, indipendentemente dal pH della soluzione in cui si trova",
    "È sempre carico positivamente, indipendentemente dal pH della soluzione circostante",
    "Non può mai dissociarsi in acqua, poiché i suoi gruppi funzionali sono inerti"], correct:1 },

{ id:"prot-40", topic:"proteine", type:"mc",
  q:"Al pH fisiologico, detto punto isoelettrico, un amminoacido si trova prevalentemente nella forma di:",
  options:[
    "Zwitterione, con gruppo carbossilico dissociato (-COO⁻) e gruppo amminico protonato (-NH₃⁺), a carica netta nulla",
    "Forma completamente neutra, priva di qualunque gruppo ionizzabile o carica parziale",
    "Forma radicalica instabile, con un elettrone spaiato sul carbonio α centrale",
    "Forma completamente cationica, con entrambi i gruppi funzionali protonati, a carica netta +1",
    "Forma completamente anionica, con entrambi i gruppi funzionali deprotonati, a carica netta -1"], correct:0 },

{ id:"prot-41", topic:"proteine", type:"mc",
  q:"Il 'dogma di Anfisen', formulato in seguito a esperimenti sulla ribonucleasi, afferma che:",
  options:[
    "Il corretto ripiegamento di una proteina richiede sempre l'intervento di uno chaperone molecolare specifico",
    "Tutta l'informazione necessaria per il corretto ripiegamento tridimensionale di una proteina è già contenuta nella sua sequenza di amminoacidi (struttura primaria)",
    "La struttura primaria di una proteina viene modificata dal ripiegamento tridimensionale successivo",
    "Le proteine denaturate non sono mai in grado di recuperare spontaneamente la loro struttura originale",
    "Il corretto ripiegamento di una proteina dipende esclusivamente dalla temperatura dell'ambiente cellulare"], correct:1 },

{ id:"prot-42", topic:"proteine", type:"mc",
  q:"Lo chaperone molecolare Hsp70 (heat shock protein 70) assiste il ripiegamento di una proteina nascente:",
  options:[
    "Aggiungendo gruppi fosfato alla catena nascente per stabilizzarne il ripiegamento",
    "Tagliando la catena polipeptidica in frammenti più piccoli da riassemblare correttamente",
    "Marcando con ubiquitina la proteina non ancora ripiegata, per la sua degradazione",
    "Isolando la proteina in una cavità chiusa a barile, dove si ripiega usando energia (ATP)",
    "Legandosi temporaneamente ai tratti idrofobici esposti mentre la catena esce dal ribosoma, impedendo aggregazioni scorrette"], correct:4 },

{ id:"prot-43", topic:"proteine", type:"mc",
  q:"Il sistema chaperonina GroEL/GroES assiste il folding di proteine che faticano a ripiegarsi da sole:",
  options:[
    "Marcandola con catene di ubiquitina, destinandola alla degradazione immediata da parte del proteasoma 26S",
    "Tagliando la proteina in frammenti più piccoli, che vengono poi riassemblati casualmente nel citosol",
    "Isolandole in una cavità simile a un 'barile' chiuso da un coperchio, dove possono esplorare le conformazioni possibili usando energia (ATP)",
    "Legandosi soltanto ai tratti idrofilici esposti sulla superficie della catena nascente, senza consumo di ATP",
    "Trasportandola direttamente al nucleo attraverso i pori dell'involucro nucleare, senza ripiegarla"], correct:2 },

{ id:"prot-44", topic:"proteine", type:"mc",
  q:"Molte proteine vengono sintetizzate come precursori inattivi (pro-proteine): un esempio è la proinsulina, che contiene un tratto in più (il peptide C) rimosso da un taglio proteolitico prima che la proteina assuma la forma attiva dell'ormone. Questo meccanismo serve principalmente a:",
  options:[
    "Evitare che la proteina sia già attiva, e quindi potenzialmente dannosa, all'interno della cellula che la produce",
    "Aumentare la stabilità termica della proteina durante la sua sintesi nel citosol",
    "Aumentare in modo permanente la massa molecolare complessiva della proteina matura",
    "Impedire che la proteina venga riconosciuta e degradata dal proteasoma 26S",
    "Facilitarne il trasporto attivo attraverso i pori dell'involucro nucleare"], correct:0 },

{ id:"prot-45", topic:"proteine", type:"mc",
  q:"I ponti disolfuro tra residui di cisteina si formano tipicamente:",
  options:[
    "Solo in ambiente ossidante, come il lume del reticolo endoplasmatico, e sono quindi frequenti nelle proteine extracellulari o di membrana",
    "Solo durante la fase di trascrizione del gene che codifica per la proteina interessata, prima ancora che venga sintetizzata",
    "Solo all'interno della matrice mitocondriale, un compartimento fortemente riducente dove gli enzimi catalizzano la reazione",
    "Solo nel citoplasma, un ambiente riducente che ne impedisce completamente la formazione durante la traduzione",
    "In qualunque compartimento cellulare indifferentemente, incluso il citosol riducente dove non servirebbe alcun enzima specifico"], correct:0 },

{ id:"prot-46", topic:"proteine", type:"mc",
  q:"Le proteine destinate al reticolo endoplasmatico possiedono, all'estremità N-terminale, una breve sequenza di amminoacidi chiamata:",
  options:[
    "Cappuccio 5', aggiunto durante la maturazione dell'mRNA nel nucleo",
    "Anticodone, la tripletta complementare al codone sul tRNA",
    "Peptide C, rimosso per proteolisi durante la maturazione dell'ormone",
    "Peptide segnale, riconosciuto dalla particella SRP (Signal Recognition Particle)",
    "Codone di stop, che segnala la fine della traduzione sul ribosoma"], correct:3 },

{ id:"prot-47", topic:"proteine", type:"mc",
  q:"Le proteine mal ripiegate, riconosciute dal sistema di sorveglianza cellulare, vengono marcate per la degradazione tramite legame covalente ripetuto a piccole molecole di ubiquitina, in una cascata a tre enzimi indicati come:",
  options:[
    "A1, A2, A3",
    "U1, U2, U3",
    "K1, K2, K3",
    "P1, P2, P3",
    "E1, E2, E3"], correct:4 },

{ id:"prot-48", topic:"proteine", type:"mc",
  q:"La catena di poliubiquitina che marca una proteina bersaglio per la degradazione viene riconosciuta ed elaborata da:",
  options:[
    "Il reticolo endoplasmatico liscio",
    "Il proteasoma 26S",
    "I ribosomi liberi",
    "I perossisomi",
    "Il nucleolo"], correct:1 },

{ id:"prot-49", topic:"proteine", type:"mc",
  q:"In base alla forma generale e alla funzione biologica, le proteine si distinguono in:",
  options:[
    "Proteine primarie, definite dalla sola sequenza amminoacidica, e proteine secondarie, con struttura ad α-elica o foglietto β",
    "Proteine acide, con punto isoelettrico basso, e proteine basiche, con punto isoelettrico alto, in base alla sola carica netta",
    "Proteine essenziali, che l'organismo non è in grado di sintetizzare, e proteine non essenziali, sintetizzate autonomamente dai tessuti",
    "Solo proteine di membrana, integrali o periferiche, e proteine citosoliche libere nel citoplasma, escludendo ogni altra categoria",
    "Proteine fibrose (allungate, spesso insolubili, funzioni strutturali, es. collagene, cheratina) e proteine globulari (compatte, solubili, funzioni dinamiche, es. emoglobina, enzimi)"], correct:4 },

{ id:"prot-50", topic:"proteine", type:"fill",
  q:"A pH molto acido, un amminoacido assume la forma cationica, con carica netta pari a ________.",
  answer:"+1" },

{ id:"prot-51", topic:"proteine", type:"fill",
  q:"L'addizione di catene di zuccheri alla superficie di una proteina, che ne favorisce il riconoscimento, la stabilità e la funzione, si chiama ________.",
  answer:"GLICOSILAZIONE" },

/* ============================= ENZIMI E METABOLISMO ============================= */

{ id:"enz-01", topic:"enzimi", type:"mc",
  q:"Gli enzimi sono definiti biologicamente come:",
  options:[
    "Catalizzatori biologici",
    "Zuccheri complessi",
    "Componenti strutturali della membrana",
    "Ormoni steroidei",
    "Acidi nucleici catalitici esclusivamente"], correct:0 },

{ id:"enz-02", topic:"enzimi", type:"mc",
  q:"Una delle principali caratteristiche degli enzimi è che:",
  options:[
    "Vengono consumati e trasformati in prodotto ad ogni singolo ciclo catalitico",
    "Agiscono soltanto se presenti in concentrazioni molto superiori al substrato",
    "Catalizzano indifferentemente qualunque tipo di reazione chimica cellulare",
    "Spostano l'equilibrio della reazione a favore della formazione di prodotto",
    "Non vengono modificati permanentemente durante la reazione e sono riutilizzabili"], correct:4 },

{ id:"enz-03", topic:"enzimi", type:"mc",
  q:"Gli enzimi accelerano una reazione chimica agendo su:",
  options:[
    "La temperatura ambiente",
    "L'energia di attivazione della reazione",
    "La costante di equilibrio della reazione",
    "La pressione del sistema",
    "La quantità di prodotto finale ottenibile"], correct:1,
  explain:"Gli enzimi abbassano l'energia di attivazione, rendendo la reazione più veloce, senza alterarne l'equilibrio." },

{ id:"enz-04", topic:"enzimi", type:"mc",
  q:"Il sito attivo di un enzima ha un'affinità particolarmente elevata per:",
  options:[
    "Lo stato di transizione del substrato",
    "L'acqua",
    "Gli ioni metallici esclusivamente",
    "Il prodotto finale della reazione",
    "Qualsiasi molecola presente nella cellula"], correct:0 },

{ id:"enz-05", topic:"enzimi", type:"mc",
  q:"Nella cinetica enzimatica, $V_{max}$ rappresenta:",
  options:[
    "La velocità massima di reazione, raggiunta quando l'enzima è saturo di substrato",
    "La velocità iniziale della reazione, misurata quando il substrato è ancora scarso",
    "La concentrazione di substrato necessaria per raggiungere metà della velocità massima",
    "La costante di equilibrio della reazione catalizzata dall'enzima",
    "Il numero massimo di molecole di substrato legate contemporaneamente da un enzima"], correct:0 },

{ id:"enz-06", topic:"enzimi", type:"mc",
  q:"$K_m$ rappresenta:",
  options:[
    "La temperatura ottimale dell'enzima",
    "Il numero di turnover dell'enzima",
    "La costante di equilibrio della reazione catalizzata",
    "La velocità massima della reazione enzimatica",
    "La concentrazione di substrato che corrisponde a $V_{max}/2$"], correct:4 },

{ id:"enz-07", topic:"enzimi", type:"mc",
  q:"Un basso valore di $K_m$ indica che l'enzima lega il substrato:",
  options:[
    "Solo in presenza di inibitori competitivi",
    "Con affinità molto bassa, in modo inefficiente",
    "Solo a temperature superiori all'optimum enzimatico",
    "In modo indipendente dalla concentrazione di substrato",
    "Molto efficientemente (alta affinità)"], correct:4 },

{ id:"enz-08", topic:"enzimi", type:"mc",
  q:"Il catabolismo è un processo:",
  options:[
    "Che avviene sempre senza l'intervento di alcun enzima",
    "Che richiede sempre l'idrolisi preliminare di ATP",
    "Endoenergetico, che sintetizza molecole complesse consumando energia",
    "Che avviene esclusivamente all'interno del nucleo cellulare",
    "Esoenergetico, che degrada molecole complesse per ottenere energia"], correct:4 },

{ id:"enz-09", topic:"enzimi", type:"mc",
  q:"L'anabolismo è un processo:",
  options:[
    "Endoenergetico, che costruisce molecole complesse a partire da molecole semplici",
    "Che non richiede alcun apporto di energia dall'ambiente esterno",
    "Che libera sempre $CO_2$ e $H_2O$ come prodotti finali di scarto",
    "Che avviene soltanto durante le reazioni di degradazione cataboliche",
    "Esoenergetico, che degrada molecole complesse liberando energia"], correct:0 },

{ id:"enz-10", topic:"enzimi", type:"mc",
  q:"Durante la degradazione del glucosio a $CO_2$ e $H_2O$, l'energia liberata viene recuperata dalla cellula principalmente sotto forma di:",
  options:[
    "Ioni inorganici come $Na^+$ e $K^+$",
    "ATP e coenzimi ridotti come NADH e $FADH_2$",
    "Unicamente sotto forma di calore disperso",
    "Esclusivamente come nuove molecole di glucosio",
    "Semplicemente come molecole d'acqua"], correct:1 },

{ id:"enz-11", topic:"enzimi", type:"mc",
  q:"Le reazioni anaboliche, come la sintesi proteica a partire dagli amminoacidi, richiedono energia generalmente fornita da:",
  options:[
    "Il glucosio direttamente",
    "Nessuna fonte di energia è richiesta",
    "NADH esclusivamente",
    "ATP",
    "La luce solare"], correct:3 },

{ id:"enz-12", topic:"enzimi", type:"mc",
  q:"Il potere riducente necessario per molte reazioni anaboliche è fornito soprattutto sotto forma di:",
  options:[
    "ATP esclusivamente",
    "$CO_2$",
    "NADPH",
    "NADH",
    "Acqua"], correct:2 },

{ id:"enz-13", topic:"enzimi", type:"mc",
  q:"L'alcol deidrogenasi, durante la fermentazione, catalizza la riduzione di:",
  options:[
    "Il piruvato a lattato",
    "L'ATP ad ADP",
    "Il glucosio a piruvato",
    "L'etanolo ad acido acetico",
    "L'acetaldeide a etanolo"], correct:4 },

{ id:"enz-14", topic:"enzimi", type:"mc",
  q:"Le vie metaboliche cellulari sono generalmente:",
  options:[
    "Sempre esclusivamente cataboliche",
    "Completamente isolate e indipendenti tra loro",
    "Indipendenti dagli enzimi",
    "Attive solo negli organismi unicellulari",
    "Interconnesse tra loro"], correct:4 },

{ id:"enz-15", topic:"enzimi", type:"fill",
  q:"Gli enzimi sono catalizzatori di natura ________.",
  answer:"PROTEICA", answerAlt:["PROTEINE","PROTEICI"] },

{ id:"enz-16", topic:"enzimi", type:"fill",
  q:"La reazione E + S ⇌ ES ⇌ E + P descrive il meccanismo generale dell'azione ________.",
  answer:"ENZIMATICA" },

{ id:"enz-17", topic:"enzimi", type:"fill",
  q:"Il valore di concentrazione di substrato corrispondente a $V_{max}/2$ si chiama costante di ________.",
  answer:"MICHAELIS-MENTEN", answerAlt:["MICHAELIS","KM"] },

{ id:"enz-18", topic:"enzimi", type:"fill",
  q:"Il catabolismo è un processo che degrada molecole complesse per ________ energia.",
  answer:"OTTENERE", answerAlt:["LIBERARE","RICAVARE"] },

{ id:"enz-19", topic:"enzimi", type:"fill",
  q:"L'anabolismo è un processo che ________ energia per costruire molecole complesse.",
  answer:"CONSUMA", answerAlt:["RICHIEDE","UTILIZZA"] },

{ id:"enz-20", topic:"enzimi", type:"fill",
  q:"Gli enzimi che catalizzano il trasferimento di un gruppo fosfato da ATP a un substrato sono detti ________.",
  answer:"CHINASI" },

{ id:"enz-21", topic:"enzimi", type:"mc",
  q:"Molti enzimi necessitano, per la loro attività catalitica, di molecole più piccole chiamate cofattori, spesso costituite da:",
  options:[
    "Molecole d'acqua strutturale intrappolate permanentemente nel sito attivo, che ne stabilizzano da sole la geometria tridimensionale",
    "Ioni metallici (es. $Zn^{2+}$, $Mg^{2+}$, $Fe^{2+}$), che stabilizzano cariche nel sito attivo o partecipano a trasferimenti di elettroni",
    "Acidi grassi a catena lunga (es. acido palmitico, acido oleico), che si inseriscono nel sito attivo alterandone la polarità",
    "Zuccheri semplici come glucosio e fruttosio, legati covalentemente al sito attivo per aumentarne l'affinità per il substrato",
    "Frammenti di altre proteine enzimatiche, uniti covalentemente al sito catalitico per stabilizzarne la struttura terziaria"], correct:1 },

{ id:"enz-22", topic:"enzimi", type:"mc",
  q:"I coenzimi organici, come il NADH e il FAD/FADH₂, svolgono principalmente la funzione di:",
  options:[
    "Trasportare elettroni nelle reazioni di ossidoriduzione",
    "Inibire irreversibilmente l'enzima",
    "Sostituire il substrato nella reazione",
    "Fornire energia meccanica diretta",
    "Formare il sito attivo dell'enzima da soli"], correct:0 },

{ id:"enz-23", topic:"enzimi", type:"mc",
  q:"Se manca il coenzima necessario, ad esempio per una carenza vitaminica, un enzima può risultare:",
  options:[
    "Marcato con ubiquitina e degradato dal proteasoma",
    "Convertito spontaneamente in un inibitore competitivo",
    "Privo della propria sequenza amminoacidica primaria",
    "Più attivo del normale, per compensare la carenza",
    "Strutturalmente intatto ma funzionalmente inattivo"], correct:4 },

{ id:"enz-24", topic:"enzimi", type:"mc",
  q:"Nel modello 'chiave-serratura' dell'interazione enzima-substrato:",
  options:[
    "Il sito attivo cambia forma per adattarsi al substrato",
    "Il substrato modifica permanentemente la struttura primaria dell'enzima",
    "L'enzima si lega solo a substrati carichi negativamente",
    "Non è previsto alcun legame specifico enzima-substrato",
    "Il sito attivo ha una forma rigida, complementare a quella del substrato"], correct:4 },

{ id:"enz-25", topic:"enzimi", type:"mc",
  q:"Nel modello dell'adattamento indotto (induced fit):",
  options:[
    "L'enzima perde irreversibilmente la propria struttura terziaria nativa",
    "Il sito attivo mantiene una forma rigida e invariata, come una serratura",
    "Il substrato deve avere già una forma perfettamente complementare al sito attivo",
    "Il legame col substrato può avvenire solo in totale assenza di cofattori",
    "Il sito attivo dell'enzima si adatta alla forma del substrato al momento del legame"], correct:4 },

{ id:"enz-26", topic:"enzimi", type:"mc",
  q:"Il pH influenza l'attività enzimatica principalmente perché:",
  options:[
    "Determina lo stato di protonazione dei gruppi chimici coinvolti nel legame col substrato, e un pH troppo diverso dall'optimum può denaturare l'enzima",
    "Agisce esclusivamente sugli enzimi extracellulari secreti nei fluidi corporei, senza mai influenzare quelli intracellulari",
    "Modifica direttamente e permanentemente la sequenza amminoacidica dell'enzima, alterandone la struttura primaria",
    "Influenza esclusivamente la temperatura della soluzione in cui avviene la reazione, senza toccare la struttura proteica",
    "Non ha alcun effetto sull'attività catalitica dell'enzima, che dipende solo dalla temperatura ambientale"], correct:0 },

{ id:"enz-27", topic:"enzimi", type:"mc",
  q:"Aumentando la temperatura oltre l'optimum di un enzima, l'attività enzimatica:",
  options:[
    "Aumenta ulteriormente solo se l'enzima possiede cofattori metallici che ne stabilizzano la struttura",
    "Continua ad aumentare indefinitamente, poiché l'energia cinetica favorisce sempre la catalisi",
    "Crolla, perché l'energia termica rompe i legami deboli che tengono in piedi la struttura terziaria, denaturando la proteina",
    "Resta sempre costante, perché la struttura terziaria è stabilizzata da legami covalenti irreversibili",
    "Diventa del tutto indipendente dalla concentrazione di substrato disponibile"], correct:2 },

{ id:"enz-28", topic:"enzimi", type:"mc",
  q:"Aumentando la concentrazione di substrato oltre un certo valore, la velocità di una reazione enzimatica:",
  options:[
    "Diventa negativa, poiché un eccesso di substrato inverte il verso della reazione catalizzata",
    "Diminuisce sempre, perché il substrato in eccesso inibisce l'enzima",
    "Continua ad aumentare linearmente, senza mai raggiungere un plateau",
    "Raggiunge un massimo (Vmax) perché tutti i siti attivi disponibili sono occupati contemporaneamente",
    "Si azzera immediatamente, perché l'eccesso di substrato denatura irreversibilmente l'enzima"], correct:3 },

{ id:"enz-29", topic:"enzimi", type:"mc",
  q:"Nell'inibizione competitiva, l'inibitore:",
  options:[
    "Aumenta sempre la Vmax dell'enzima, migliorandone l'efficienza catalitica complessiva",
    "Si lega sempre in un sito allosterico diverso dal sito attivo, alterandone la conformazione",
    "Distrugge permanentemente il sito attivo formando un legame covalente irreversibile",
    "Non può mai essere spiazzato, indipendentemente dalla concentrazione di substrato",
    "Assomiglia chimicamente al substrato e compete con esso per il sito attivo, senza essere trasformato"], correct:4 },

{ id:"enz-30", topic:"enzimi", type:"mc",
  q:"Nell'inibizione non competitiva, l'inibitore:",
  options:[
    "Viene sempre spiazzato dal sito attivo aumentando semplicemente la concentrazione di substrato disponibile",
    "Compete direttamente con il substrato, legandosi in modo reversibile allo stesso identico sito attivo",
    "Agisce esclusivamente legandosi ai cofattori metallici dell'enzima, senza mai toccare la struttura proteica",
    "Si lega in un sito diverso dal sito attivo, deformando leggermente la struttura terziaria e alterando la conformazione del sito attivo a distanza",
    "Non ha alcun effetto sulla struttura dell'enzima, riducendone la velocità solo per semplice diluizione del substrato"], correct:3 },

{ id:"enz-31", topic:"enzimi", type:"mc",
  q:"Nella regolazione allosterica, un enzima 'chiave' all'inizio di una via metabolica viene tipicamente inibito da:",
  options:[
    "Un coenzima strutturalmente non correlato alla via metabolica in questione",
    "Un semplice e generico aumento della temperatura corporea nella cellula",
    "Un gene regolatore che si lega direttamente al sito attivo dell'enzima chiave",
    "Il primo substrato della via, tramite un meccanismo di feedback positivo",
    "Il prodotto finale della via stessa, tramite legame a un sito allosterico (feedback negativo)"], correct:4,
  explain:"Questo meccanismo di controllo intelligente evita sprechi di risorse quando il prodotto finale è già presente in quantità sufficiente." },

{ id:"enz-32", topic:"enzimi", type:"fill",
  q:"Le molecole organiche come il NADH, che assistono l'attività catalitica di molti enzimi trasportando elettroni, si chiamano ________.",
  answer:"COENZIMI" },

{ id:"enz-33", topic:"enzimi", type:"fill",
  q:"Un inibitore che si lega allo stesso sito attivo del substrato, competendo con esso, dà luogo a un'inibizione di tipo ________.",
  answer:"COMPETITIVA" },

/* ============================= LIPIDI ============================= */

{ id:"lip-01", topic:"lipidi", type:"mc",
  q:"Gli acidi grassi sono costituiti da:",
  options:[
    "Anelli aromatici complessi legati a un gruppo amminico",
    "Catene lineari di carbonio con un gruppo carbossilico terminale",
    "Sequenze di amminoacidi unite da legami peptidici",
    "Catene ramificate composte solo da azoto e fosforo",
    "Basi azotate legate covalentemente a uno zucchero pentoso"], correct:1 },

{ id:"lip-02", topic:"lipidi", type:"mc",
  q:"In un acido grasso, il gruppo carbossilico è:",
  options:[
    "Idrofobico",
    "Assente",
    "Sempre esterificato",
    "Privo di carica in ogni condizione",
    "Idrofilico"], correct:4 },

{ id:"lip-03", topic:"lipidi", type:"mc",
  q:"La catena idrocarburica di un acido grasso è:",
  options:[
    "Idrofobica",
    "Carica negativamente",
    "Sempre ramificata",
    "Carica positivamente",
    "Idrofilica"], correct:0 },

{ id:"lip-04", topic:"lipidi", type:"mc",
  q:"Un acido grasso si definisce insaturo quando:",
  options:[
    "È sempre legato covalentemente a una molecola di glicerolo",
    "Contiene un gruppo fosfato legato all'estremità della catena",
    "Non contiene alcun atomo di idrogeno nella catena carboniosa",
    "È privo del gruppo carbossilico terminale caratteristico",
    "Contiene uno o più doppi legami carbonio-carbonio"], correct:4 },

{ id:"lip-05", topic:"lipidi", type:"mc",
  q:"I trigliceridi si formano dall'esterificazione del glicerolo con:",
  options:[
    "Tre gruppi fosfato",
    "Tre catene di acidi grassi",
    "Tre molecole di glucosio",
    "Tre basi azotate",
    "Tre amminoacidi"], correct:1 },

{ id:"lip-06", topic:"lipidi", type:"mc",
  q:"I trigliceridi si accumulano principalmente:",
  options:[
    "Nel tessuto adiposo, come goccioline di grasso",
    "Nei ribosomi liberi del citoplasma",
    "Nei filamenti del citoscheletro cellulare",
    "All'interno del nucleo cellulare",
    "Diffusi nella matrice extracellulare"], correct:0 },

{ id:"lip-07", topic:"lipidi", type:"mc",
  q:"I fosfolipidi sono molecole:",
  options:[
    "Completamente idrofiliche, prive di regioni apolari",
    "Anfipatiche (con una parte idrofila e una idrofoba)",
    "Organizzate sempre in una struttura ciclica ad anello",
    "Completamente idrofobiche, prive di gruppi polari",
    "Prive del gruppo fosfato caratteristico della classe"], correct:1 },

{ id:"lip-08", topic:"lipidi", type:"mc",
  q:"Lo scheletro dei glicerofosfolipidi è costituito da:",
  options:[
    "Colesterolo",
    "Un anello aromatico",
    "Sfingosina",
    "Un amminoacido",
    "Glicerolo"], correct:4 },

{ id:"lip-09", topic:"lipidi", type:"mc",
  q:"Lo scheletro degli sfingolipidi è costituito da:",
  options:[
    "Colesterolo",
    "Glicerolo",
    "Un acido grasso libero",
    "Sfingosina",
    "Glucosio"], correct:3 },

{ id:"lip-10", topic:"lipidi", type:"mc",
  q:"Il colesterolo è il precursore biologico di:",
  options:[
    "I carboidrati",
    "Le vitamine idrosolubili",
    "Gli ormoni steroidei",
    "Tutti gli amminoacidi",
    "Gli acidi nucleici"], correct:2 },

{ id:"lip-11", topic:"lipidi", type:"mc",
  q:"Il colesterolo, oltre a essere un componente delle membrane cellulari, funge da substrato per la sintesi di:",
  options:[
    "Enzimi digestivi",
    "Ormoni steroidei",
    "Polisaccaridi",
    "Proteine strutturali",
    "Acidi nucleici"], correct:1 },

{ id:"lip-12", topic:"lipidi", type:"mc",
  q:"Quale organello rappresenta il principale sito di sintesi dei lipidi nella cellula?",
  options:[
    "Il reticolo endoplasmatico",
    "Il nucleo",
    "Il lisosoma",
    "Il perossisoma esclusivamente",
    "Il citoscheletro"], correct:0 },

{ id:"lip-13", topic:"lipidi", type:"mc",
  q:"I glicolipidi, come i glicosfingolipidi, derivano strutturalmente da:",
  options:[
    "Il colesterolo",
    "Il glicerolo",
    "La sfingosina",
    "Un nucleotide",
    "Un amminoacido"], correct:2 },

{ id:"lip-14", topic:"lipidi", type:"mc",
  q:"La fosforilazione del fosfatidilinositolo produce una serie di molecole chiamate:",
  options:[
    "Fosfoproteine",
    "Fosfoinositidi",
    "Fosfocreatine",
    "Fosfolipasi",
    "Fosfatasi"], correct:1,
  explain:"I fosfoinositidi modulano il signalling cellulare e il traffico di membrana." },

{ id:"lip-15", topic:"lipidi", type:"fill",
  q:"Un acido grasso in cui tutti i legami carbonio-carbonio sono singoli si dice ________.",
  answer:"SATURO" },

{ id:"lip-16", topic:"lipidi", type:"fill",
  q:"Gli acidi grassi con uno o più doppi legami si dicono ________.",
  answer:"INSATURI", answerAlt:["INSATURO"] },

{ id:"lip-17", topic:"lipidi", type:"fill",
  q:"L'esterificazione di tre acidi grassi con il glicerolo forma un ________.",
  answer:"TRIGLICERIDE" },

{ id:"lip-18", topic:"lipidi", type:"fill",
  q:"Le molecole con una parte idrofila e una idrofoba nella stessa molecola si dicono ________.",
  answer:"ANFIPATICHE", answerAlt:["ANFIPATICI","ANFIPATICA"] },

{ id:"lip-19", topic:"lipidi", type:"fill",
  q:"Il precursore biologico degli ormoni steroidei è il ________.",
  answer:"COLESTEROLO" },

{ id:"lip-20", topic:"lipidi", type:"fill",
  q:"L'idrolisi del $PI(4,5)P_2$ produce due principali messaggeri chimici, tra cui il diacilglicerolo e l'________.",
  answer:"IP3", answerAlt:["INOSITOLO TRIFOSFATO","IP₃"] },

{ id:"lip-21", topic:"lipidi", type:"mc",
  q:"Nella nomenclatura omega degli acidi grassi polinsaturi, il numero (es. omega-3, omega-6) indica:",
  options:[
    "La posizione del primo doppio legame, contando dal metile terminale della catena",
    "La posizione esatta del gruppo carbossilico lungo la catena",
    "Il numero totale di atomi di ossigeno presenti nella molecola lipidica",
    "Il numero complessivo di doppi legami presenti nella catena",
    "Il numero totale di atomi di carbonio che compongono la catena"], correct:0 },

{ id:"lip-22", topic:"lipidi", type:"mc",
  q:"L'acido linoleico (serie omega-6) e l'acido linolenico (serie omega-3) sono definiti acidi grassi essenziali perché:",
  options:[
    "L'organismo umano non è in grado di sintetizzarli e devono essere assunti con la dieta",
    "Non svolgono alcuna funzione biologica rilevante nell'organismo",
    "Sono acidi grassi completamente saturi, privi di doppi legami",
    "Vengono sintetizzati abbondantemente dal fegato a partire dal glucosio",
    "Sono gli unici acidi grassi presenti nei fosfolipidi di membrana"], correct:0 },

{ id:"lip-23", topic:"lipidi", type:"mc",
  q:"In base alla funzione svolta nell'organismo, i lipidi si distinguono in:",
  options:[
    "Solo in lipidi saturi, privi di doppi legami, e lipidi insaturi, che ne possiedono uno o più",
    "Lipidi di deposito (es. trigliceridi negli adipociti), lipidi strutturali (membrane) e lipidi regolatori (precursori di vitamine e ormoni)",
    "Solo in lipidi polari, dotati di una parte idrofila, e lipidi apolari, completamente idrofobici",
    "Solo in lipidi essenziali, che vanno assunti con la dieta, e lipidi non essenziali sintetizzabili dall'organismo",
    "Solo in lipidi di origine animale e lipidi di origine vegetale, in base alla loro provenienza"], correct:1 },

{ id:"lip-24", topic:"lipidi", type:"mc",
  q:"In base al numero di acidi grassi esterificati con il glicerolo, si distinguono, in ordine crescente:",
  options:[
    "Digliceride, trigliceride, tetragliceride",
    "Monogliceride, digliceride, trigliceride",
    "Non esiste tale classificazione",
    "Solo mono- e trigliceridi",
    "Trigliceride, digliceride, monogliceride"], correct:1 },

{ id:"lip-25", topic:"lipidi", type:"mc",
  q:"Poiché i lipidi sono poco solubili in acqua, per essere trasportati nel sangue devono associarsi a una proteina, formando complessi chiamati:",
  options:[
    "Metalloproteine",
    "Lipoproteine",
    "Fosfoproteine",
    "Glicoproteine",
    "Nucleoproteine"], correct:1 },

{ id:"lip-26", topic:"lipidi", type:"mc",
  q:"Gli acidi grassi liberi non esterificati (NEFA), mobilizzati dal tessuto adiposo durante il digiuno o l'esercizio fisico, circolano nel sangue legati principalmente a:",
  options:[
    "L'emoglobina",
    "Le immunoglobuline",
    "Il glicogeno",
    "L'albumina",
    "Il colesterolo"], correct:3 },

{ id:"lip-27", topic:"lipidi", type:"mc",
  q:"I chilomicroni, la lipoproteina di maggiori dimensioni, hanno origine intestinale e trasportano principalmente:",
  options:[
    "Trigliceridi di origine alimentare verso i tessuti",
    "Colesterolo endogeno sintetizzato dal fegato verso i tessuti",
    "Esclusivamente fosfolipidi di membrana intestinale",
    "Solo acidi grassi liberi, trasportati legati all'albumina plasmatica",
    "Trigliceridi endogeni, sintetizzati dal fegato, verso i tessuti periferici"], correct:0,
  explain:"I chilomicroni sono presenti nel sangue solo dopo i pasti." },

{ id:"lip-28", topic:"lipidi", type:"mc",
  q:"Le VLDL (lipoproteine a densità molto bassa), di origine epatica, trasportano principalmente:",
  options:[
    "Esclusivamente colesterolo esterificato",
    "Trigliceridi endogeni sintetizzati dal fegato",
    "Trigliceridi di provenienza alimentare, assorbiti a livello intestinale",
    "Proteine plasmatiche libere, non associate a lipidi",
    "Glucosio libero destinato ai tessuti periferici"], correct:1 },

{ id:"lip-29", topic:"lipidi", type:"mc",
  q:"Le LDL (lipoproteine a bassa densità), spesso chiamate 'colesterolo cattivo', trasportano il colesterolo:",
  options:[
    "Esclusivamente ai reni, per la sua eliminazione urinaria",
    "Solo nelle ore immediatamente successive ai pasti",
    "Solo dall'intestino al fegato, subito dopo l'assorbimento",
    "Dal fegato ai tessuti, ed è responsabile del danno arterioso se in eccesso",
    "Dai tessuti periferici al fegato, per essere eliminato"], correct:3 },

{ id:"lip-30", topic:"lipidi", type:"mc",
  q:"Le HDL (lipoproteine ad alta densità), spesso chiamate 'colesterolo buono', hanno la funzione di:",
  options:[
    "Depositarsi nelle pareti arteriose, favorendo la formazione di placche",
    "Sintetizzare nuovi acidi grassi direttamente nel fegato",
    "Trasportare i trigliceridi alimentari ai tessuti subito dopo i pasti",
    "Trasportare glucosio dal sangue verso i muscoli scheletrici",
    "Trasportare il colesterolo in eccesso dai tessuti verso il fegato per la sua eliminazione"], correct:4 },

{ id:"lip-31", topic:"lipidi", type:"mc",
  q:"La β-ossidazione, il principale processo di degradazione degli acidi grassi per produrre energia, avviene principalmente:",
  options:[
    "Nell'apparato del Golgi",
    "Nella matrice mitocondriale",
    "Nel nucleo",
    "Nel citosol",
    "Nel reticolo endoplasmatico liscio"], correct:1 },

{ id:"lip-32", topic:"lipidi", type:"mc",
  q:"Poiché l'acil-CoA non può attraversare la membrana mitocondriale interna, il suo ingresso nel mitocondrio per la β-ossidazione è mediato da una molecola 'navetta' chiamata:",
  options:[
    "Coenzima A soltanto",
    "Carnitina",
    "Albumina",
    "Ubiquitina",
    "Clatrina"], correct:1 },

{ id:"lip-33", topic:"lipidi", type:"mc",
  q:"L'enzima CPT-I (carnitina palmitoiltransferasi I), localizzato sulla membrana mitocondriale esterna, è fondamentale per:",
  options:[
    "Avviare la degradazione del glicogeno epatico",
    "Formare i legami disolfuro delle lipoproteine plasmatiche",
    "Regolare l'ingresso degli acidi grassi nel mitocondrio",
    "Sintetizzare nuovi acidi grassi a partire dall'acetil-CoA",
    "Trasportare il colesterolo libero nel plasma sanguigno"], correct:2 },

{ id:"lip-34", topic:"lipidi", type:"mc",
  q:"Al termine della β-ossidazione, l'acetil-CoA prodotto entra nel ciclo di Krebs, mentre il NADH e il $FADH_2$ prodotti cedono i loro elettroni:",
  options:[
    "Alla catena respiratoria, permettendo la produzione di ATP",
    "Ai ribosomi mitocondriali, per la sintesi proteica locale",
    "All'acido piruvico, rigenerandolo per un nuovo ciclo",
    "Alla carnitina, che li riporta nel citoplasma",
    "Direttamente a una molecola di glucosio neoformata"], correct:0 },

{ id:"lip-35", topic:"lipidi", type:"fill",
  q:"La sostanza che funziona da 'navetta' per il trasporto degli acidi grassi attivati all'interno del mitocondrio si chiama ________.",
  answer:"CARNITINA" },

/* ============================= MEMBRANE CELLULARI ============================= */

{ id:"membr-01", topic:"membrane", type:"mc",
  q:"Il modello che descrive la struttura delle membrane biologiche è detto:",
  options:[
    "Modello a canale unico",
    "Modello a doppio strato rigido",
    "Modello a micella",
    "Modello a reticolo cristallino",
    "Modello del mosaico fluido"], correct:4 },

{ id:"membr-02", topic:"membrane", type:"mc",
  q:"Secondo il modello del mosaico fluido, le membrane cellulari sono costituite da:",
  options:[
    "Esclusivamente proteine disposte in un singolo strato rigido, senza lipidi",
    "Un reticolo cristallino di ioni immerso in una matrice proteica statica",
    "Un singolo strato proteico rigido, privo di componente lipidica",
    "Un doppio strato lipidico fluido in cui le proteine sono incastrate come tessere di un mosaico",
    "Fibre di collagene intrecciate, prive di doppio strato lipidico"], correct:3 },

{ id:"membr-03", topic:"membrane", type:"mc",
  q:"Il modello del mosaico fluido delle membrane cellulari fu proposto da:",
  options:[
    "Mendel",
    "Singer e Nicolson",
    "Darwin",
    "Watson e Crick",
    "Pauling"], correct:1 },

{ id:"membr-04", topic:"membrane", type:"mc",
  q:"I fosfolipidi formano spontaneamente doppi strati in ambiente acquoso grazie alla loro natura:",
  options:[
    "Completamente idrofobica",
    "Ionica",
    "Radioattiva",
    "Completamente idrofilica",
    "Anfipatica"], correct:4 },

{ id:"membr-05", topic:"membrane", type:"mc",
  q:"La chiusura di un doppio strato fosfolipidico a formare un compartimento sigillato è, dal punto di vista energetico:",
  options:[
    "Energeticamente favorevole",
    "Sempre sfavorevole",
    "Indipendente dall'energia",
    "Impossibile in ambiente acquoso",
    "Possibile solo con l'apporto di ATP"], correct:0 },

{ id:"membr-06", topic:"membrane", type:"mc",
  q:"Le tre principali classi di molecole lipidiche delle membrane cellulari sono:",
  options:[
    "Amminoacidi, zuccheri e nucleotidi",
    "Fosfolipidi, steroli e glicolipidi",
    "Solo fosfolipidi",
    "Vitamine liposolubili esclusivamente",
    "Trigliceridi, cere, terpeni"], correct:1 },

{ id:"membr-07", topic:"membrane", type:"mc",
  q:"Le proteine di membrana si distinguono principalmente in:",
  options:[
    "Proteine acide e basiche esclusivamente",
    "Solo proteine integrali",
    "Proteine cataboliche e anaboliche",
    "Proteine integrali e proteine periferiche",
    "Solo proteine periferiche"], correct:3 },

{ id:"membr-08", topic:"membrane", type:"mc",
  q:"Le proteine integrali di membrana vengono rilasciate dalla membrana solo:",
  options:[
    "In seguito all'azione di detergenti",
    "Mai, in nessuna condizione",
    "Per azione della luce",
    "Per semplice lavaggio con acqua",
    "Spontaneamente a temperatura ambiente"], correct:0 },

{ id:"membr-09", topic:"membrane", type:"mc",
  q:"Le proteine transmembrana attraversano il doppio strato lipidico tipicamente mediante:",
  options:[
    "Un legame ionico con i fosfolipidi",
    "Un foglietto β esteso",
    "Un ponte disolfuro",
    "Un segmento ad α-elica",
    "Un anello aromatico planare"], correct:3 },

{ id:"membr-10", topic:"membrane", type:"mc",
  q:"Un esempio di proteina di membrana ancorata tramite un lipide è quella con ancora:",
  options:[
    "Disolfuro",
    "Ionica",
    "Covalente con ubiquitina",
    "Peptidica",
    "GPI"], correct:4 },

{ id:"membr-11", topic:"membrane", type:"mc",
  q:"In quali proporzioni relative si trovano generalmente proteine e lipidi nelle membrane cellulari?",
  options:[
    "Quasi equivalenti, nella maggior parte delle membrane",
    "Sempre e comunque il 100% proteine, senza componente lipidica",
    "Il rapporto è fisso e identico in tutte le membrane cellulari",
    "Le membrane cellulari non contengono mai proteine integrali",
    "Sempre e comunque il 100% lipidi, senza alcuna proteina"], correct:0 },

{ id:"membr-12", topic:"membrane", type:"mc",
  q:"Una membrana con un alto rapporto proteine/lipidi è tipicamente associata a:",
  options:[
    "Funzioni specializzate (es. membrana mitocondriale interna)",
    "Nessuna correlazione tra il rapporto proteine/lipidi e la funzione",
    "Totale assenza di proteine di membrana in quel distretto cellulare",
    "Esclusivamente le membrane delle cellule vegetali, mai quelle animali",
    "Funzione di isolamento elettrico, come nella guaina mielinica"], correct:0,
  explain:"La mielina, ad esempio, ha un basso rapporto proteine/lipidi ed è specializzata nell'isolamento elettrico; la membrana mitocondriale interna ha invece un alto rapporto proteine/lipidi." },

{ id:"membr-13", topic:"membrane", type:"mc",
  q:"Le membrane biologiche sono pochissimo permeabili a:",
  options:[
    "$H_2O$",
    "$O_2$",
    "Ioni $Ca^{2+}$",
    "$CO_2$",
    "$N_2$"], correct:2,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). Gas apolari come $N_2$, $O_2$, $CO_2$ e piccole molecole come l'acqua attraversano facilmente il doppio strato lipidico; gli ioni carichi, come $Ca^{2+}$, richiedono invece canali o trasportatori specifici." },

{ id:"membr-14", topic:"membrane", type:"mc",
  q:"La fibronectina è:",
  options:[
    "Una proteina del citoscheletro che si associa ai microfilamenti di actina",
    "Una glicoproteina della matrice extracellulare che collega le integrine a componenti della matrice come il collagene",
    "Un enzima proteolitico che degrada il collagene della matrice extracellulare",
    "Un polisaccaride della matrice extracellulare privo di funzione adesiva",
    "Una proteina integrale di membrana priva di qualsiasi funzione adesiva"], correct:1,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello)." },

{ id:"membr-15", topic:"membrane", type:"mc",
  q:"La matrice extracellulare è composta principalmente da:",
  options:[
    "Molecole di tubulina organizzate in microtubuli del citoscheletro",
    "Fosfolipidi e colesterolo tipici del doppio strato di membrana",
    "Filamenti di actina organizzati nel citoscheletro corticale",
    "Proteoglicani, glicosamminoglicani e proteine strutturali e di adesione",
    "Proteine istoniche che compattano il DNA nel nucleo"], correct:3,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"membr-16", topic:"membrane", type:"mc",
  q:"L'ancoraggio delle cellule alla matrice extracellulare avviene principalmente tramite:",
  options:[
    "Le integrine",
    "Le DNA polimerasi",
    "I tRNA",
    "Gli istoni",
    "I ribosomi"], correct:0 },

{ id:"membr-17", topic:"membrane", type:"fill",
  q:"Il modello che descrive la struttura delle membrane biologiche è detto modello del mosaico ________.",
  answer:"FLUIDO" },

{ id:"membr-18", topic:"membrane", type:"fill",
  q:"Le molecole che hanno sia una parte idrofila che una idrofoba, come i fosfolipidi di membrana, sono dette ________.",
  answer:"ANFIPATICHE" },

{ id:"membr-19", topic:"membrane", type:"fill",
  q:"Le proteine di membrana rilasciate solo dall'azione di detergenti sono dette proteine ________ di membrana.",
  answer:"INTEGRALI" },

{ id:"membr-20", topic:"membrane", type:"fill",
  q:"Le proteine legate alla membrana solo superficialmente, senza attraversarla, sono dette proteine ________.",
  answer:"PERIFERICHE" },

{ id:"membr-21", topic:"membrane", type:"fill",
  q:"Le proteine che attraversano il doppio strato lipidico più volte sono dette proteine ________.",
  answer:"MULTIPASSO" },

{ id:"membr-22", topic:"membrane", type:"fill",
  q:"La glicoproteina della matrice extracellulare che collega le integrine al collagene è la ________.",
  answer:"FIBRONECTINA" },

{ id:"membr-23", topic:"membrane", type:"fill",
  q:"Le cellule si ancorano alla matrice extracellulare tramite proteine transmembrana chiamate ________.",
  answer:"INTEGRINE" },

{ id:"membr-24", topic:"membrane", type:"fill",
  q:"Le membrane cellulari sono pochissimo permeabili agli ________, che richiedono canali o trasportatori specifici per attraversarle.",
  answer:"IONI" },

{ id:"membr-25", topic:"membrane", type:"mc",
  q:"Quali sono le tre proprietà fondamentali delle membrane biologiche?",
  options:[
    "Sono rigide, simmetriche e impermeabili",
    "Sono asimmetriche, fluide/dinamiche e semipermeabili",
    "Sono cristalline, anisotrope e permeabili a tutto",
    "Sono statiche, omogenee e impermeabili",
    "Sono solide, simmetriche e selettive solo per l'acqua"], correct:1 },

{ id:"membr-26", topic:"membrane", type:"mc",
  q:"Il passaggio di un fosfolipide da un foglietto all'altro della membrana (flip-flop) è un evento:",
  options:[
    "Caratteristico solo delle membrane procariotiche, assente negli eucarioti",
    "Frequente e spontaneo, molto più veloce della diffusione laterale dei lipidi",
    "Raro, perché richiede il passaggio della testa polare attraverso l'interno idrofobico; è catalizzato dalle flippasi",
    "Impossibile in ogni condizione, anche in presenza di enzimi specifici",
    "Indipendente dall'energia e altrettanto rapido della diffusione laterale"], correct:2 },

{ id:"membr-27", topic:"membrane", type:"mc",
  q:"Cosa dimostrò l'esperimento di fusione cellulare topo-uomo di Frey ed Edidin, con anticorpi fluorescenti contro le proteine di membrana?",
  options:[
    "Che le proteine di membrana possono diffondere lateralmente e mescolarsi nella membrana plasmatica",
    "Che il DNA nucleare si ricombina tra cellule di specie diverse",
    "Che le cellule di specie diverse non sono in grado di fondersi tra loro",
    "Che i lipidi di membrana restano fissi nella posizione originaria",
    "Che le membrane cellulari sono strutture rigide e completamente immobili"], correct:0,
  explain:"Dopo la fusione tra una cellula di topo e una umana, le proteine di membrana marcate con anticorpi diversi (fluoresceina/rodamina) si mescolano progressivamente sulla superficie dell'eterocarionte, dimostrando la mobilità laterale delle proteine." },

{ id:"membr-28", topic:"membrane", type:"mc",
  q:"Quali fattori influenzano la fluidità delle membrane biologiche?",
  options:[
    "Solo la presenza di ioni calcio nel liquido extracellulare che circonda la membrana plasmatica",
    "Esclusivamente la pressione osmotica esercitata sui due lati della membrana plasmatica",
    "Solo la concentrazione di glucosio disciolto nel liquido extracellulare che bagna la cellula",
    "La temperatura, la lunghezza e il grado di saturazione delle catene idrocarburiche dei fosfolipidi, e il livello di colesterolo",
    "Solo il valore del pH del liquido extracellulare che circonda la membrana plasmatica"], correct:3 },

{ id:"membr-29", topic:"membrane", type:"mc",
  q:"Catene idrocarburiche insature, con doppi legami cis, rispetto a catene sature di pari lunghezza:",
  options:[
    "Rendono la membrana completamente impermeabile all'acqua",
    "Impediscono la formazione del doppio strato lipidico",
    "Introducono un piegamento nella catena che aumenta la fluidità di membrana",
    "Rendono la membrana meno fluida, impacchettandosi più strettamente",
    "Non hanno alcun effetto sulla fluidità di membrana"], correct:2 },

{ id:"membr-30", topic:"membrane", type:"mc",
  q:"L'asimmetria delle membrane biologiche, cioè la diversa composizione dei due foglietti del doppio strato, dipende da:",
  options:[
    "Esclusivamente dalla pressione osmotica esercitata sui due versanti della membrana cellulare",
    "Il sito di sintesi dei lipidi, le loro proprietà biofisiche, la presenza di specifici traslocatori (flippasi) e meccanismi di ritenzione",
    "Solo dalla temperatura ambientale in cui si trova immersa la cellula in quel preciso momento",
    "La sola presenza di colesterolo, distribuito sempre in eguale quantità nei due foglietti opposti",
    "Il pH del citosol, che ne determina da solo la composizione lipidica complessiva dei due foglietti"], correct:1 },

{ id:"membr-31", topic:"membrane", type:"mc",
  q:"Durante l'apoptosi, l'esposizione della fosfatidilserina (PS) sul foglietto esterno della membrana plasmatica funge da:",
  options:[
    "Segnale di proliferazione cellulare, che innesca l'ingresso in mitosi",
    "Attivatore della sintesi proteica ribosomiale nella cellula apoptotica",
    "Barriera che impedisce il riconoscimento e la fagocitosi da parte dei macrofagi",
    "'Eat-me signal' che favorisce il riconoscimento e la fagocitosi della cellula apoptotica da parte dei macrofagi",
    "Segnale che induce l'ingresso della cellula danneggiata nel ciclo mitotico"], correct:3,
  explain:"L'esposizione della PS è dovuta alla disattivazione di una flippasi specifica per la PS e all'attivazione di una scramblasi, che trasferisce fosfolipidi in entrambe le direzioni." },

{ id:"membr-32", topic:"membrane", type:"mc",
  q:"Il glicocalice, il rivestimento glucidico che si affaccia sul lato esterno della membrana plasmatica, è composto da:",
  options:[
    "Esclusivamente molecole di DNA legate covalentemente ai fosfolipidi",
    "Solo colesterolo libero, inserito tra le teste polari dei fosfolipidi",
    "Catene di zuccheri legate a proteine (glicoproteine) e a lipidi (glicolipidi) di membrana",
    "Filamenti di actina del citoscheletro ancorati alla faccia esterna",
    "Ioni calcio legati direttamente alle teste polari dei fosfolipidi"], correct:2 },

{ id:"membr-33", topic:"membrane", type:"mc",
  q:"Tra le funzioni del glicocalice NON rientra:",
  options:[
    "L'isolamento elettrico (es. a livello dei nodi di Ranvier)",
    "La catalisi diretta della duplicazione del DNA",
    "La funzione antigenica (es. sistema AB0)",
    "Il riconoscimento tra cellule",
    "La protezione della superficie cellulare (es. epiteli)"], correct:1 },

{ id:"membr-34", topic:"membrane", type:"mc",
  q:"Il sistema AB0 dei gruppi sanguigni si basa su differenze strutturali in:",
  options:[
    "Differenze nella sequenza del DNA mitocondriale, ereditato esclusivamente per via materna",
    "Concentrazioni diverse di ormoni steroidei circolanti nel plasma di ciascun individuo",
    "Varianti delle proteine del citoscheletro (spettrina) presenti negli eritrociti maturi",
    "Il diverso numero di mitocondri presenti all'interno di ciascun globulo rosso maturo",
    "Glicolipidi di membrana dei globuli rossi, che espongono zuccheri terminali diversi a seconda dell'antigene (A, B, 0)"], correct:4 },

{ id:"membr-35", topic:"membrane", type:"mc",
  q:"In base al coefficiente di permeabilità della membrana, quale categoria di molecole la attraversa più facilmente per diffusione semplice?",
  options:[
    "Macromolecole proteiche di grandi dimensioni",
    "Molecole idrofobe e piccoli gas apolari come $O_2$",
    "Piccole molecole polari cariche, come gli ioni",
    "Grosse molecole polari, come glucosio e saccarosio",
    "Ioni monovalenti come $Na^+$ e $K^+$"], correct:1 },

{ id:"membr-36", topic:"membrane", type:"mc",
  q:"Il trasporto attivo di membrana si distingue da quello passivo perché:",
  options:[
    "Riguarda esclusivamente il trasporto di piccoli gas apolari come l'ossigeno",
    "Non richiede mai l'intervento di una proteina di membrana specifica",
    "Avviene sempre più lentamente della diffusione semplice attraverso il doppio strato",
    "Avviene contro gradiente (di concentrazione o elettrochimico) e richiede consumo di energia",
    "Non può mai essere mediato da una pompa ionica ATP-dipendente"], correct:3 },

{ id:"membr-37", topic:"membrane", type:"mc",
  q:"La diffusione facilitata, a differenza della diffusione semplice:",
  options:[
    "Non presenta mai un fenomeno di saturazione, essendo del tutto indipendente dal numero di proteine coinvolte",
    "È mediata da proteine di trasporto (canali o trasportatori), ma come la diffusione semplice avviene secondo gradiente senza consumo diretto di energia",
    "Avviene sempre contro gradiente di concentrazione, con dispendio diretto di energia cellulare sotto forma di ATP",
    "Riguarda esclusivamente il trasporto di ioni metallici attraverso canali regolati da voltaggio di membrana",
    "Richiede sempre il consumo diretto di ATP da parte della proteina di trasporto che media il processo"], correct:1 },

{ id:"membr-38", topic:"membrane", type:"mc",
  q:"I trasportatori (carrier) di membrana muovono il soluto attraverso:",
  options:[
    "La formazione di una vescicola di endocitosi che ingloba il soluto disciolto",
    "Un cambiamento conformazionale che alterna l'esposizione del sito di legame verso l'esterno e verso l'interno della cellula",
    "Un poro transmembrana sempre aperto, privo di qualsiasi meccanismo di regolazione",
    "La rottura temporanea e localizzata del doppio strato lipidico circostante",
    "Un legame covalente permanente che immobilizza il soluto all'interno del carrier"], correct:1 },

{ id:"membr-39", topic:"membrane", type:"mc",
  q:"Un trasportatore di membrana che muove due soluti diversi in direzioni opposte, accoppiandone il trasporto, è detto:",
  options:[
    "Antiporto",
    "Simporto",
    "Canale a diffusione semplice",
    "Uniporto",
    "Pompa protonica passiva"], correct:0 },

{ id:"membr-40", topic:"membrane", type:"mc",
  q:"I canali ionici agiscono come filtri selettivi per specifici ioni e:",
  options:[
    "Restano sempre in uno stato aperto, indipendentemente dagli stimoli ricevuti",
    "Trasportano esclusivamente molecole d'acqua per osmosi attraverso la membrana",
    "Funzionano esclusivamente come enzimi ossidoriduttivi ancorati alla membrana",
    "Oscillano tra uno stato aperto e uno chiuso, regolati da meccanismi diversi (voltaggio, ligando, stimoli meccanici)",
    "Restano sempre in uno stato chiuso, indipendentemente dagli stimoli ricevuti"], correct:3 },

{ id:"membr-41", topic:"membrane", type:"mc",
  q:"I canali ionici regolati da voltaggio (voltage-gated) si aprono o chiudono in risposta a:",
  options:[
    "Variazioni di temperatura ambientale rilevate da un dominio termosensibile",
    "Variazioni del potenziale di membrana, rilevate da un dominio sensore (elica S4)",
    "Il pH del citosol esclusivamente, rilevato da un sensore intracellulare",
    "La concentrazione di glucosio extracellulare rilevata da un dominio recettoriale",
    "Il legame diretto con un ormone steroideo circolante nel plasma sanguigno"], correct:1,
  explain:"I canali regolati da ligando extracellulare o intracellulare e quelli regolati meccanicamente sono gli altri tre principali meccanismi di apertura dei canali ionici." },

{ id:"membr-42", topic:"membrane", type:"mc",
  q:"La pompa $Na^+/K^+$-ATPasi, a ogni ciclo catalitico e con consumo di un ATP, trasporta:",
  options:[
    "Un numero variabile e non fisso di ioni ad ogni ciclo",
    "2 ioni $Na^+$ fuori e 3 ioni $K^+$ dentro la cellula",
    "3 ioni $Na^+$ dentro e 2 ioni $K^+$ fuori dalla cellula",
    "Solo ioni $Na^+$, senza coinvolgere il $K^+$",
    "3 ioni $Na^+$ fuori e 2 ioni $K^+$ dentro la cellula"], correct:4 },

{ id:"membr-43", topic:"membrane", type:"mc",
  q:"L'attività della pompa $Na^+/K^+$-ATPasi è cruciale per:",
  options:[
    "Fornire l'energia diretta necessaria alla sintesi proteica sui ribosomi liberi del citosol cellulare",
    "Attivare ed accelerare la glicolisi anaerobica nel citosol in condizioni di carenza di ossigeno",
    "Fornire i protoni necessari alla fotosintesi nei cloroplasti delle cellule vegetali fotosintetiche",
    "Fornire l'energia necessaria alla duplicazione del DNA nucleare durante la fase S del ciclo cellulare",
    "Generare e mantenere il potenziale di membrana a riposo, regolare il volume cellulare e fornire il gradiente di $Na^+$ sfruttato dal trasporto secondario"], correct:4 },

{ id:"membr-44", topic:"membrane", type:"mc",
  q:"I trasportatori ABC (ATP-Binding Cassette), di cui fanno parte MDR e CFTR, sono proteine di trasporto attivo che:",
  options:[
    "Trasportano esclusivamente molecole d'acqua attraverso pori sempre aperti",
    "Sono presenti soltanto nei batteri, del tutto assenti negli organismi eucarioti",
    "Legano e idrolizzano ATP per pompare piccole molecole (amminoacidi, peptidi, steroli) attraverso la membrana",
    "Non legano né idrolizzano mai l'ATP, sfruttando solo il gradiente elettrochimico",
    "Sono canali ionici regolati da voltaggio, privi di attività ATPasica"], correct:2 },

{ id:"membr-45", topic:"membrane", type:"mc",
  q:"Una cellula immersa in una soluzione ipotonica rispetto al suo citoplasma:",
  options:[
    "Perde immediatamente ioni $Na^+$ per trasporto attivo",
    "Perde acqua netta per osmosi e si raggrinzisce progressivamente",
    "Guadagna acqua netta per osmosi e tende a rigonfiarsi",
    "Non subisce alcun movimento netto di acqua attraverso la membrana",
    "Va incontro immediatamente a un ciclo di mitosi cellulare"], correct:2 },

{ id:"membr-46", topic:"membrane", type:"mc",
  q:"Una soluzione isotonica rispetto al citoplasma di una cellula determina:",
  options:[
    "Una perdita netta di acqua e il raggrinzimento della cellula",
    "La lisi immediata della cellula",
    "La denaturazione delle proteine di membrana",
    "Né un guadagno né una perdita netta di acqua",
    "Un guadagno netto di acqua e il rigonfiamento della cellula"], correct:3 },

{ id:"membr-47", topic:"membrane", type:"fill",
  q:"Il passaggio di un fosfolipide da un foglietto all'altro della membrana è detto ________ ed è un evento raro.",
  answer:"FLIP-FLOP", answerAlt:["FLIP FLOP"] },

{ id:"membr-48", topic:"membrane", type:"fill",
  q:"Le proteine che catalizzano il flip-flop dei fosfolipidi in maniera energia-dipendente e unidirezionale sono dette ________.",
  answer:"FLIPPASI" },

{ id:"membr-49", topic:"membrane", type:"fill",
  q:"Il rivestimento di zuccheri legati a proteine e lipidi sul lato esterno della membrana plasmatica è detto ________.",
  answer:"GLICOCALICE" },

{ id:"membr-50", topic:"membrane", type:"fill",
  q:"Un trasportatore di membrana che muove un solo tipo di soluto in una direzione è detto ________.",
  answer:"UNIPORTO" },

{ id:"membr-51", topic:"membrane", type:"fill",
  q:"Un trasportatore che muove due soluti nella stessa direzione, accoppiando il moto di uno al gradiente elettrochimico dell'altro, è detto ________.",
  answer:"SIMPORTO" },

{ id:"membr-52", topic:"membrane", type:"fill",
  q:"La pompa $Na^+/K^+$-ATPasi trasporta 3 ioni sodio fuori e 2 ioni ________ dentro la cellula, con consumo di ATP.",
  answer:"POTASSIO" },

{ id:"membr-53", topic:"membrane", type:"fill",
  q:"Il fenomeno fisico per cui il solvente fluisce attraverso una membrana semipermeabile è detto ________.",
  answer:"OSMOSI" },

{ id:"membr-54", topic:"membrane", type:"fill",
  q:"Una soluzione con concentrazione di soluti maggiore rispetto al citoplasma cellulare è detta ________ rispetto alla cellula.",
  answer:"IPERTONICA" },

/* ============================= TEORIA CELLULARE E CELLULA PROCARIOTICA ============================= */

{ id:"proc-01", topic:"procarioti", type:"mc",
  q:"Chi enunciò il principio secondo cui ogni cellula deriva da una cellula preesistente (\"Omnis cellula e cellula\")?",
  options:[
    "Theodor Schwann",
    "Rudolf Virchow",
    "Robert Hooke",
    "Louis Pasteur",
    "Matthias Schleiden"], correct:1 },

{ id:"proc-02", topic:"procarioti", type:"mc",
  q:"Chi utilizzò per primo il termine \"cellula\", osservando al microscopio sezioni di sughero?",
  options:[
    "Rudolf Virchow",
    "Robert Hooke",
    "Louis Pasteur",
    "Matthias Schleiden",
    "Theodor Schwann"], correct:1 },

{ id:"proc-03", topic:"procarioti", type:"mc",
  q:"Quale delle seguenti affermazioni NON fa parte dei principi della teoria cellulare?",
  options:[
    "Le cellule si formano per generazione spontanea dalla materia inanimata",
    "Tutti gli esseri viventi sono costituiti da una o più cellule",
    "Le cellule contengono le informazioni ereditarie dell'organismo",
    "Le reazioni chimiche di un organismo vivente hanno luogo dentro le cellule",
    "Le cellule si originano da altre cellule preesistenti"], correct:0 },

{ id:"proc-04", topic:"procarioti", type:"mc",
  q:"Secondo la teoria cellulare, le reazioni chimiche di un organismo vivente, compresi i meccanismi di liberazione dell'energia e le reazioni di biosintesi, hanno luogo:",
  options:[
    "Dentro le cellule",
    "Nello spazio extracellulare",
    "Solo nei cloroplasti",
    "Solo nei mitocondri",
    "Esclusivamente nel nucleo"], correct:0 },

{ id:"proc-05", topic:"procarioti", type:"mc",
  q:"A differenza di una singola cellula di un organismo pluricellulare, un organismo unicellulare è in grado di:",
  options:[
    "Dividersi soltanto, senza svolgere alcuna altra funzione vitale",
    "Accrescersi in dimensioni, senza potersi mai riprodurre",
    "Sintetizzare proteine, ma solo se coordinata da cellule vicine",
    "Vivere e riprodursi autonomamente come organismo indipendente",
    "Contenere DNA, pur dipendendo da altre cellule per sopravvivere"], correct:3 },

{ id:"proc-06", topic:"procarioti", type:"mc",
  q:"Quali sono, in ordine crescente di complessità, i livelli di organizzazione di un organismo pluricellulare?",
  options:[
    "Sistemi, cellule, tessuti, organi, molecole, organismo",
    "Cellule, molecole, tessuti, organi, organismo, sistemi",
    "Molecole, cellule, tessuti, organi, sistemi, organismo",
    "Tessuti, organi, cellule, sistemi, molecole, organismo",
    "Organismo, sistemi, organi, tessuti, cellule, molecole"], correct:2 },

{ id:"proc-07", topic:"procarioti", type:"mc",
  q:"La principale differenza strutturale tra cellula procariotica ed eucariotica riguarda:",
  options:[
    "La diversa capacità di riprodursi per via sessuata",
    "Le dimensioni e la forma dei ribosomi citoplasmatici",
    "La presenza di un vero nucleo delimitato da membrana",
    "Lo spessore della membrana plasmatica esterna",
    "La quantità totale di DNA contenuto nella cellula"], correct:2 },

{ id:"proc-08", topic:"procarioti", type:"mc",
  q:"Le dimensioni tipiche di una cellula batterica sono dell'ordine di:",
  options:[
    "Pochi nanometri",
    "Pochi micrometri",
    "Alcuni centimetri",
    "Alcuni decimetri",
    "Pochi millimetri"], correct:1 },

{ id:"proc-09", topic:"procarioti", type:"mc",
  q:"La parete cellulare dei batteri è costituita principalmente da:",
  options:[
    "Peptidoglicano",
    "Cheratina",
    "Cellulosa",
    "Chitina",
    "Fosfolipidi"], correct:0 },

{ id:"proc-10", topic:"procarioti", type:"mc",
  q:"Considerando le principali differenze strutturali tra le pareti cellulari dei batteri Gram-positivi e Gram-negativi, quale delle seguenti affermazioni è corretta?",
  options:[
    "L'assenza totale di pili e flagelli nei batteri Gram-negativi, sempre presenti nei Gram-positivi",
    "La presenza di acido teicoico nella parete dei Gram-negativi anziché in quella dei Gram-positivi",
    "Il diverso spessore dello strato di peptidoglicano e l'assenza della membrana esterna nei Gram-positivi e la sua presenza nei Gram-negativi",
    "La diversa disposizione spaziale di flagelli e pili sulla superficie cellulare esterna",
    "La presenza di lipopolisaccaridi nei Gram-positivi e di acido teicoico nei Gram-negativi"], correct:2,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"proc-11", topic:"procarioti", type:"mc",
  q:"Nella colorazione di Gram, i batteri Gram-positivi trattengono il colorante violetto di genziana grazie a:",
  options:[
    "La presenza di lipopolisaccaridi",
    "L'assenza di parete cellulare",
    "La capsula",
    "Uno spesso strato di peptidoglicano",
    "Una spessa membrana esterna"], correct:3 },

{ id:"proc-12", topic:"procarioti", type:"mc",
  q:"I batteri Gram-negativi possiedono, a differenza dei Gram-positivi:",
  options:[
    "Uno strato di peptidoglicano molto più spesso della parete",
    "Una membrana esterna contenente lipopolisaccaridi",
    "Una parete cellulare composta prevalentemente di chitina",
    "Un nucleo cellulare vero, delimitato da membrana propria",
    "Una capsula polisaccaridica, assente invece nei Gram-positivi"], correct:1 },

{ id:"proc-13", topic:"procarioti", type:"mc",
  q:"Le appendici filiformi utilizzate dai batteri per il movimento sono:",
  options:[
    "Il glicocalice",
    "I pili comuni",
    "La capsula",
    "I flagelli",
    "Le fimbrie"], correct:3 },

{ id:"proc-14", topic:"procarioti", type:"mc",
  q:"Le fimbrie (o pili comuni) nei batteri svolgono principalmente una funzione:",
  options:[
    "Respiratoria",
    "Di movimento",
    "Fotosintetica",
    "Riproduttiva",
    "Adesiva"], correct:4 },

{ id:"proc-15", topic:"procarioti", type:"mc",
  q:"Il pilo sessuale è coinvolto principalmente:",
  options:[
    "Nel movimento del batterio attraverso l'ambiente liquido",
    "Nella formazione del setto durante la scissione binaria",
    "Nella respirazione cellulare a livello della membrana plasmatica",
    "Nel trasferimento di materiale genetico durante la coniugazione",
    "Nella fotosintesi dei cianobatteri fotoautotrofi"], correct:3 },

{ id:"proc-16", topic:"procarioti", type:"mc",
  q:"La struttura mucosa esterna che protegge alcuni batteri dalla fagocitosi è:",
  options:[
    "La capsula",
    "Lo spazio periplasmico",
    "Il nucleoide",
    "Il pilo sessuale",
    "Il flagello"], correct:0 },

{ id:"proc-17", topic:"procarioti", type:"mc",
  q:"Il trasferimento genico orizzontale in cui un batterio capta direttamente frammenti di DNA nudo dall'ambiente è detto:",
  options:[
    "Trascrizione",
    "Ricombinazione sito-specifica",
    "Trasduzione",
    "Trasformazione",
    "Coniugazione"], correct:3 },

{ id:"proc-18", topic:"procarioti", type:"mc",
  q:"Il trasferimento di materiale genetico tra due batteri mediante contatto diretto e pilo sessuale è detto:",
  options:[
    "Endocitosi",
    "Esocitosi",
    "Coniugazione",
    "Trasformazione",
    "Trasduzione"], correct:2 },

{ id:"proc-19", topic:"procarioti", type:"mc",
  q:"Il trasferimento di DNA batterico mediato da un batteriofago è detto:",
  options:[
    "Traduzione",
    "Trasformazione",
    "Trasduzione",
    "Replicazione",
    "Coniugazione"], correct:2 },

{ id:"proc-20", topic:"procarioti", type:"mc",
  q:"Il mondo vivente è oggi suddiviso in tre domini principali, ovvero:",
  options:[
    "Monere, Protisti, Metazoi",
    "Animalia, Plantae, Fungi",
    "Procarioti, Eucarioti, Virus",
    "Procarioti, Protisti, Animalia",
    "Bacteria, Archaea, Eukarya"], correct:4 },

{ id:"proc-21", topic:"procarioti", type:"mc",
  q:"Secondo la teoria endosimbiontica, i mitocondri delle cellule eucariotiche deriverebbero da:",
  options:[
    "Virus a DNA integrati stabilmente nel genoma dell'ospite",
    "Vescicole derivate dal reticolo endoplasmatico liscio",
    "Batteri endosimbionti inglobati da una cellula ospite ancestrale",
    "Frammenti staccati dall'involucro nucleare",
    "Invaginazioni ripiegate della membrana plasmatica originaria"], correct:2 },

{ id:"proc-22", topic:"procarioti", type:"mc",
  q:"Nei procarioti, l'RNA ribosomale è rappresentato da molecole con i seguenti coefficienti di sedimentazione:",
  options:[
    "16 e 23 Svedberg",
    "23, 16 e 5 Svedberg",
    "12 e 16 Svedberg",
    "18, 28, 5.8 e 5 Svedberg",
    "18, 28 e 5 Svedberg"], correct:1,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello)." },

{ id:"proc-23", topic:"procarioti", type:"fill",
  q:"Il principio secondo cui ogni cellula deriva da una cellula preesistente (\"Omnis cellula e cellula\") fu enunciato da ________.",
  answer:"VIRCHOW" },

{ id:"proc-24", topic:"procarioti", type:"fill",
  q:"Un gruppo di cellule simili che svolgono una funzione comune costituisce un ________.",
  answer:"TESSUTO" },

{ id:"proc-25", topic:"procarioti", type:"fill",
  q:"La cellula priva di un vero nucleo delimitato da membrana è detta cellula ________.",
  answer:"PROCARIOTE" },

{ id:"proc-26", topic:"procarioti", type:"fill",
  q:"Lo spazio compreso tra la membrana plasmatica e la membrana esterna nei batteri Gram-negativi è detto spazio ________.",
  answer:"PERIPLASMICO" },

{ id:"proc-27", topic:"procarioti", type:"fill",
  q:"Il processo di captazione di DNA libero dall'ambiente da parte di un batterio è detto ________.",
  answer:"TRASFORMAZIONE" },

{ id:"proc-28", topic:"procarioti", type:"fill",
  q:"Il processo di trasferimento genico mediato da un virus batterico è detto ________.",
  answer:"TRASDUZIONE" },

{ id:"proc-29", topic:"procarioti", type:"fill",
  q:"L'acronimo ________ indica l'ultimo antenato comune universale di tutti gli organismi viventi.",
  answer:"LUCA" },

{ id:"proc-30", topic:"procarioti", type:"fill",
  q:"Secondo la teoria endosimbiontica, i mitocondri deriverebbero da ________ endosimbionti inglobati da una cellula ospite ancestrale.",
  answer:"BATTERI" },

{ id:"proc-31", topic:"procarioti", type:"fill",
  q:"I batteri si riproducono in modo asessuato tramite un processo chiamato scissione ________.",
  answer:"BINARIA" },

{ id:"proc-32", topic:"procarioti", type:"mc",
  q:"I mesosomi, invaginazioni della membrana plasmatica batterica, hanno la funzione di:",
  options:[
    "Sintetizzare esclusivamente le proteine di membrana neoformate",
    "Digerire macromolecole extracellulari tramite enzimi idrolitici",
    "Aumentare la superficie disponibile per la respirazione e la replicazione del DNA",
    "Catturare l'energia luminosa per la fotosintesi batterica",
    "Racchiudere il materiale genetico in un compartimento delimitato da membrana"], correct:2 },

{ id:"proc-33", topic:"procarioti", type:"mc",
  q:"I plasmidi sono:",
  options:[
    "Molecole di RNA messaggero, prodotte transitoriamente durante la trascrizione e degradate rapidamente dopo la traduzione",
    "Proteine strutturali che compongono lo strato di peptidoglicano della parete cellulare batterica",
    "Organelli delimitati da doppia membrana, tipici esclusivamente delle cellule eucariotiche complesse",
    "Molecole di DNA extracromosomico circolare, a replicazione indipendente, non essenziali alla sopravvivenza ma spesso vantaggiose (es. resistenza agli antibiotici)",
    "Il cromosoma principale e unico del batterio, indispensabile alla sua sopravvivenza e replicazione"], correct:3 },

{ id:"proc-34", topic:"procarioti", type:"mc",
  q:"Nella scissione binaria batterica, la replicazione del cromosoma circolare parte da un'unica origine (ori) e procede:",
  options:[
    "Da più origini di replicazione simultanee e indipendenti",
    "Senza l'intervento di alcuna DNA polimerasi, per semplice appaiamento",
    "Solo dopo che si è già formato il setto divisorio",
    "In modo unidirezionale, tramite un'unica forcella di replicazione",
    "In modo bidirezionale, tramite due forcelle, fino al punto opposto (ter)"], correct:4 },

{ id:"proc-35", topic:"procarioti", type:"mc",
  q:"La proteina batterica FtsZ, omologa procariotica della tubulina, è responsabile della:",
  options:[
    "Sintesi esclusiva dei precursori del peptidoglicano parietale",
    "Ritenzione del colorante violetto durante la colorazione di Gram",
    "Formazione dell'anello contrattile a livello del futuro punto di divisione cellulare",
    "Formazione dei pili sessuali coinvolti nella coniugazione",
    "Replicazione autonoma del DNA plasmidico extracromosomico"], correct:2 },

{ id:"proc-36", topic:"procarioti", type:"mc",
  q:"Nella fase finale della scissione binaria, detta citodieresi:",
  options:[
    "Avviene la coniugazione con un'altra cellula, tramite il pilo sessuale, senza che si verifichi alcuna divisione cellulare vera e propria",
    "Si formano numerosi mesosomi che sostituiscono completamente la funzione del setto divisorio nella separazione del citoplasma",
    "Il DNA cromosomico appena replicato viene degradato dalle nucleasi prima che la cellula possa completare la divisione",
    "L'anello contrattile si restringe e membrana e parete si chiudono verso l'interno, separando il citoplasma in due cellule figlie geneticamente identiche",
    "La cellula si arresta definitivamente in questa fase, entrando in uno stato di quiescenza permanente simile alla sporulazione"], correct:3 },

{ id:"proc-37", topic:"procarioti", type:"fill",
  q:"Le invaginazioni della membrana plasmatica batterica che aumentano la superficie per la respirazione e la replicazione del DNA si chiamano ________.",
  answer:"MESOSOMI" },

{ id:"proc-38", topic:"procarioti", type:"fill",
  q:"Il DNA extracromosomico circolare batterico, non essenziale ma spesso vantaggioso (es. geni di resistenza agli antibiotici), è detto ________.",
  answer:"PLASMIDE", answerAlt:["PLASMIDI"] },

/* ============================= VIRUS E CICLI REPLICATIVI ============================= */

{ id:"vir-01", topic:"virus", type:"mc",
  q:"I virus sono:",
  options:[
    "Organismi eucarioti unicellulari",
    "Organelli cellulari",
    "Parassiti endocellulari obbligati",
    "Organismi procarioti",
    "Organismi cellulari autonomi"], correct:2 },

{ id:"vir-02", topic:"virus", type:"mc",
  q:"Tutti i virus….",
  options:[
    "Infettano solo cellule animali",
    "Hanno come acido nucleico il DNA",
    "Hanno come acido nucleico l'RNA",
    "Infettano cellule",
    "Infettano solo cellule eucariotiche"], correct:3,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"vir-03", topic:"virus", type:"mc",
  q:"Il rivestimento proteico che racchiude l'acido nucleico di un virus è detto:",
  options:[
    "Pericapside",
    "Capside",
    "Glicocalice",
    "Tegumento",
    "Envelope"], correct:1 },

{ id:"vir-04", topic:"virus", type:"mc",
  q:"L'involucro membranoso, derivato dalla membrana della cellula ospite, che alcuni virus possiedono esternamente al capside è detto:",
  options:[
    "Parete cellulare rigida",
    "Spazio periplasmico",
    "Nucleocapside",
    "Glicocalice cellulare",
    "Envelope (pericapside)"], correct:4 },

{ id:"vir-05", topic:"virus", type:"mc",
  q:"I virus privi di envelope sono detti:",
  options:[
    "Virus difettivi",
    "Virus litici",
    "Virus temperati",
    "Virus nudi",
    "Virioni maturi"], correct:3 },

{ id:"vir-06", topic:"virus", type:"mc",
  q:"Le dimensioni dei virus sono generalmente comprese tra:",
  options:[
    "1 e 10 µm",
    "1 e 5 mm",
    "100 µm e 1 mm",
    "10 nm e 250-300 nm",
    "0,1 e 1 nm"], correct:3 },

{ id:"vir-07", topic:"virus", type:"mc",
  q:"La struttura a simmetria icosaedrica e quella a simmetria elicoidale sono due tipi di:",
  options:[
    "Organizzazione del nucleo",
    "Organizzazione della parete batterica",
    "Morfologia del capside virale",
    "Disposizione dei ribosomi",
    "Struttura della membrana plasmatica"], correct:2 },

{ id:"vir-08", topic:"virus", type:"mc",
  q:"I virus animali vengono classificati principalmente in base:",
  options:[
    "Al tipo di acido nucleico e alla modalità di replicazione",
    "Alla presenza o assenza di una parete cellulare rigida",
    "Alla presenza di flagelli o pili sulla superficie",
    "Alla loro dimensione e forma del capside soltanto",
    "Alla loro capacità fotosintetica autonoma"], correct:0 },

{ id:"vir-09", topic:"virus", type:"mc",
  q:"Il ciclo di un batteriofago in cui il virus si replica immediatamente, causando la lisi della cellula ospite, è detto ciclo:",
  options:[
    "Di latenza",
    "Di coniugazione",
    "Lisogenico",
    "Di trasformazione",
    "Litico"], correct:4 },

{ id:"vir-10", topic:"virus", type:"mc",
  q:"Nel ciclo lisogenico, il genoma del batteriofago:",
  options:[
    "Si integra nel cromosoma batterico come profago e viene replicato passivamente con esso",
    "Viene immediatamente replicato in modo attivo, portando alla lisi della cellula",
    "Resta sempre all'esterno, senza mai penetrare nella cellula ospite",
    "Viene rapidamente degradato dalle nucleasi della cellula ospite",
    "Fuoriesce immediatamente dalla cellula per gemmazione"], correct:0 },

{ id:"vir-11", topic:"virus", type:"mc",
  q:"Un batteriofago il cui genoma è integrato, in forma silente, nel cromosoma batterico è detto:",
  options:[
    "Profago",
    "Capside",
    "Plasmide",
    "Episoma virale",
    "Virione"], correct:0 },

{ id:"vir-12", topic:"virus", type:"mc",
  q:"Le fasi del ciclo litico di un batteriofago, nel corretto ordine, sono:",
  options:[
    "Attacco, replicazione e biosintesi, penetrazione, assemblaggio, rilascio finale",
    "Biosintesi, attacco, penetrazione, assemblaggio, liberazione dell'acido nucleico",
    "Attacco, penetrazione, liberazione dell'acido nucleico, replicazione e biosintesi, assemblaggio, rilascio",
    "Rilascio, attacco, penetrazione, liberazione dell'acido nucleico, replicazione",
    "Penetrazione, attacco, rilascio, biosintesi, assemblaggio finale"], correct:2 },

{ id:"vir-13", topic:"virus", type:"mc",
  q:"Il rilascio dei nuovi virioni da una cellula ospite può avvenire per:",
  options:[
    "Lisi (virus nudi) o gemmazione/esocitosi (virus con envelope)",
    "Fagocitosi diretta dell'intera cellula ospite da parte del virione",
    "Mitosi della cellula ospite, indotta dall'infezione virale",
    "Sporulazione, con formazione di una spora resistente",
    "Scissione binaria del virione, come nei batteri"], correct:0 },

{ id:"vir-14", topic:"virus", type:"mc",
  q:"I retrovirus sono caratterizzati dal possesso di:",
  options:[
    "Peptidoglicano",
    "RNA polimerasi DNA-dipendente soltanto",
    "DNA polimerasi soltanto",
    "Lisozima",
    "Trascrittasi inversa e integrasi"], correct:4 },

{ id:"vir-15", topic:"virus", type:"mc",
  q:"La trascrittasi inversa, enzima tipico dei retrovirus, catalizza:",
  options:[
    "La duplicazione delle proteine strutturali del capside",
    "La sintesi proteica direttamente sui ribosomi virali",
    "La sintesi di DNA a partire da uno stampo di RNA",
    "La completa degradazione del genoma a RNA virale",
    "La sintesi di RNA a partire da uno stampo di DNA"], correct:2 },

{ id:"vir-16", topic:"virus", type:"mc",
  q:"Molti virus animali entrano nella cellula ospite sfruttando:",
  options:[
    "La fagocitosi esclusiva, tipica solo dei macrofagi ospiti",
    "La coniugazione, un meccanismo mediato da un pilo sessuale",
    "La scissione binaria, un processo tipico solo dei batteri",
    "La trasformazione, incorporando DNA libero dall'ambiente",
    "L'endocitosi, mediante il macchinario molecolare della cellula ospite"], correct:4 },

{ id:"vir-17", topic:"virus", type:"mc",
  q:"Il tropismo cellulare di un virus, cioè la sua selettività d'ingresso in un determinato tipo cellulare, dipende dal legame con:",
  options:[
    "L'involucro nucleare della cellula ospite",
    "I filamenti del citoscheletro cellulare",
    "I ribosomi liberi nel citoplasma",
    "I lipidi di membrana, in modo del tutto aspecifico",
    "Recettori specifici della cellula ospite"], correct:4 },

{ id:"vir-18", topic:"virus", type:"mc",
  q:"Quali di queste affermazioni sugli oggetti biologici NON è corretta?",
  options:[
    "Il citoscheletro è una componente strutturale presente in tutte le cellule eucariotiche",
    "I virus hanno un citoscheletro ancestrale",
    "Le cellule procariotiche sono prive di citoscheletro complesso ma hanno un sistema di proteine strutturali con funzioni analoghe a quelle del citoscheletro eucariotico",
    "Alcuni organismi monocellulari sintetizzano molecole di ATP utilizzando l'energia liberata dalla fermentazione",
    "Alcune cellule procariotiche possono operare la fotosintesi"], correct:1,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello)." },

{ id:"vir-19", topic:"virus", type:"fill",
  q:"Il rivestimento proteico che racchiude l'acido nucleico di un virus è detto ________.",
  answer:"CAPSIDE" },

{ id:"vir-20", topic:"virus", type:"fill",
  q:"L'involucro membranoso esterno al capside, presente in alcuni virus, è detto ________ o pericapside.",
  answer:"ENVELOPE" },

{ id:"vir-21", topic:"virus", type:"fill",
  q:"I virus privi di involucro membranoso esterno sono detti virus ________.",
  answer:"NUDI" },

{ id:"vir-22", topic:"virus", type:"fill",
  q:"Nel ciclo ________, il genoma del batteriofago si integra nel cromosoma batterico come profago.",
  answer:"LISOGENICO" },

{ id:"vir-23", topic:"virus", type:"fill",
  q:"Un batteriofago il cui genoma è integrato, in forma silente, nel cromosoma batterico è detto ________.",
  answer:"PROFAGO" },

{ id:"vir-24", topic:"virus", type:"fill",
  q:"I retrovirus possiedono l'enzima ________, che sintetizza DNA a partire da uno stampo di RNA.",
  answer:"TRASCRITTASI INVERSA", answerAlt:["RETROTRASCRITTASI"] },

{ id:"vir-25", topic:"virus", type:"fill",
  q:"I virus che infettano specificamente i batteri sono detti ________ (o fagi).",
  answer:"BATTERIOFAGI" },

{ id:"vir-26", topic:"virus", type:"mc",
  q:"Lo schema di classificazione di Baltimore raggruppa i virus in base a:",
  options:[
    "Il solo tipo di cellula ospite che il virus è in grado di infettare",
    "La sola presenza o assenza dell'envelope pericapsidico",
    "La sola forma geometrica assunta dal capside proteico",
    "Quanti e quali passaggi servono per arrivare dal genoma virale a un mRNA funzionante",
    "Le sole dimensioni complessive del virione maturo"], correct:3,
  explain:"Il criterio è centrato sull'mRNA perché i ribosomi leggono solo RNA a singolo filamento con polarità positiva, l'unico vero punto di contatto obbligato tra genoma virale e macchinario cellulare." },

{ id:"vir-27", topic:"virus", type:"mc",
  q:"Un filamento di acido nucleico virale si definisce a polarità positiva quando:",
  options:[
    "Può essere letto solo dalla trascrittasi inversa",
    "Non contiene informazione genetica",
    "È complementare all'mRNA e deve essere trascritto prima di poter essere tradotto",
    "Ha la stessa sequenza dell'mRNA e può essere tradotto direttamente",
    "È sempre a doppio filamento"], correct:3 },

{ id:"vir-28", topic:"virus", type:"mc",
  q:"Nella classificazione di Baltimore, i retrovirus (es. HIV), dotati di genoma a RNA a singolo filamento e dell'enzima trascrittasi inversa, appartengono alla classe:",
  options:[
    "III",
    "VI",
    "IV",
    "I",
    "VII"], correct:1 },

{ id:"vir-29", topic:"virus", type:"mc",
  q:"Nella classificazione di Baltimore, virus a DNA a doppio filamento come Adenovirus e Herpesvirus appartengono alla classe:",
  options:[
    "VII",
    "VI",
    "I",
    "IV",
    "V"], correct:2 },

{ id:"vir-30", topic:"virus", type:"mc",
  q:"Le sei fasi principali del ciclo replicativo di un virus eucariotico, nel loro ordine, sono:",
  options:[
    "Attacco, penetrazione, liberazione dell'acido nucleico, replicazione e biosintesi, assemblaggio, rilascio",
    "Penetrazione, attacco, assemblaggio, rilascio, biosintesi, liberazione",
    "Assemblaggio, penetrazione, attacco, rilascio, biosintesi, liberazione",
    "Rilascio, attacco, penetrazione, assemblaggio, biosintesi, liberazione",
    "Biosintesi, attacco, liberazione, rilascio, penetrazione, assemblaggio"], correct:0 },

{ id:"vir-31", topic:"virus", type:"mc",
  q:"La penetrazione di un virus con envelope nella cellula ospite può avvenire per fusione (processo pH-indipendente, in cui l'involucro virale si fonde con la membrana plasmatica) oppure per:",
  options:[
    "Diffusione semplice attraverso i pori della membrana plasmatica",
    "Endocitosi (processo pH-dipendente, mediata da una vescicola rivestita di clatrina)",
    "Osmosi diretta del virione attraverso il doppio strato lipidico",
    "Fagocitosi attiva, compiuta autonomamente dal virione stesso",
    "Trasporto attivo ATP-dipendente, mediato da pompe di membrana"], correct:1 },

{ id:"vir-32", topic:"virus", type:"mc",
  q:"La fase del ciclo virale in cui le proteine capsidiche vengono degradate e il genoma virale viene liberato nel citoplasma è detta:",
  options:[
    "Assemblaggio del capside maturo",
    "Attacco ai recettori cellulari",
    "Gemmazione dalla membrana plasmatica",
    "Lisogenia del genoma virale",
    "Uncoating (liberazione dell'acido nucleico)"], correct:4 },

{ id:"vir-33", topic:"virus", type:"mc",
  q:"L'auto-assemblaggio dei nuovi virioni, dopo la sintesi di acido nucleico e proteine virali, è favorito da proteine chiamate:",
  options:[
    "Ligasi",
    "Primasi",
    "Chaperonine",
    "Integrasi",
    "Topoisomerasi"], correct:2 },

{ id:"vir-34", topic:"virus", type:"mc",
  q:"I virus dotati di involucro membranoso vengono tipicamente rilasciati dalla cellula ospite tramite:",
  options:[
    "Gemmazione o esocitosi",
    "Scissione binaria",
    "Fagocitosi",
    "Coniugazione",
    "Solo ed esclusivamente lisi cellulare"], correct:0 },

{ id:"vir-35", topic:"virus", type:"mc",
  q:"In alcune cellule dette 'non permissive', l'infezione virale può innescare una trasformazione cellulare con crescita incontrollata e potenziale di crescita prolungato, detta:",
  options:[
    "Sporulazione",
    "Uncoating",
    "Gemmazione",
    "Lisogenia",
    "Immortalizzazione"], correct:4 },

{ id:"vir-36", topic:"virus", type:"mc",
  q:"I virus oncogeni 'trasformatori' (oncogeni diretti), come alcuni ceppi ad alto rischio di HPV, favoriscono il cancro principalmente perché:",
  options:[
    "Non hanno mai alcuna interazione diretta con il genoma o il ciclo cellulare dell'ospite infettato",
    "Non sono mai in grado di integrarsi stabilmente nel genoma della cellula ospite infettata",
    "Agiscono esclusivamente per via extracellulare, senza mai penetrare all'interno della cellula",
    "Possiedono geni che codificano proteine virali capaci di interferire direttamente con il controllo del ciclo cellulare e la stabilità genomica",
    "Causano soltanto infezioni acute e autolimitanti, che si risolvono senza lasciare conseguenze"], correct:3 },

{ id:"vir-37", topic:"virus", type:"mc",
  q:"I virus oncogeni 'non trasformanti' (oncogeni indiretti), come HCV e HBV, favoriscono il cancro (es. carcinoma epatocellulare) principalmente:",
  options:[
    "Solo tramite l'azione diretta e immediata della propria trascrittasi inversa virale",
    "Creando nel tempo un contesto patologico favorevole, con infiammazione cronica e cicli ripetuti di danno e rigenerazione tissutale",
    "Tramite un singolo oncogene virale dominante, integrato stabilmente nel genoma ospite",
    "Solo attraverso il contatto fisico diretto tra il virione e il DNA della cellula ospite",
    "Non essendo in realtà mai associati in alcun modo allo sviluppo di neoplasie umane"], correct:1 },

{ id:"vir-38", topic:"virus", type:"mc",
  q:"I geni v-src, v-ras e v-myc, trasportati da alcuni retrovirus acutamente trasformanti, derivano originariamente da:",
  options:[
    "Proto-oncogeni cellulari (c-onc), acquisiti dal virus durante cicli di infezione e ricombinazione con il genoma ospite",
    "Geni oncosoppressori mutati, presenti esclusivamente nel genoma originario della cellula ospite",
    "Frammenti di RNA ribosomiale (rRNA), incorporati per errore durante l'assemblaggio del virione",
    "Geni batterici, trasferiti al virus per trasduzione da un batteriofago infettante",
    "Sequenze non codificanti del genoma virale, prive di qualunque funzione codificante nota"], correct:0 },

{ id:"vir-39", topic:"virus", type:"mc",
  q:"Il genoma di un retrovirus come HIV contiene almeno tre geni principali: gag (proteine strutturali interne), env (proteine dell'envelope) e:",
  options:[
    "Tat, gene regolatore che attiva la trascrizione virale",
    "Rev, gene regolatore per l'esportazione dell'mRNA virale",
    "Pol (proteine enzimatiche: trascrittasi inversa, proteasi, integrasi)",
    "Ori, la sola origine di replicazione del genoma virale",
    "LTR, le sole sequenze ripetute alle estremità del provirus"], correct:2 },

{ id:"vir-40", topic:"virus", type:"mc",
  q:"Le sequenze LTR (long terminal repeats), presenti alle estremità del DNA provirale integrato di un retrovirus, sono fondamentali per:",
  options:[
    "La colorazione di Gram dei batteri ospiti infettati dal fago",
    "Il controllo della trascrizione virale, contenendo siti promotori e enhancer",
    "La formazione dei pili sessuali utilizzati nella coniugazione",
    "Il taglio proteolitico delle proteine strutturali del capside",
    "La sintesi esclusiva dell'RNA ribosomiale della cellula ospite"], correct:1 },

{ id:"vir-41", topic:"virus", type:"mc",
  q:"Nel ciclo litico di un batteriofago, le proteine fagiche sintetizzate nella prima parte del ciclo (early proteins) servono, tra l'altro, a:",
  options:[
    "Integrare stabilmente il profago nel cromosoma batterico, avviando la lisogenia",
    "Sintetizzare nuovi componenti della parete cellulare batterica dell'ospite",
    "Lisare immediatamente la cellula ospite, ancor prima che avvenga la replicazione",
    "Assemblare direttamente le proteine strutturali del capside virale maturo",
    "Degradare il DNA della cellula ospite e modificare l'RNA polimerasi batterica per favorire l'espressione dei geni fagici"], correct:4 },

{ id:"vir-42", topic:"virus", type:"mc",
  q:"Nel ciclo lisogenico, le proteine di repressione prodotte da pochi geni del profago:",
  options:[
    "Vengono espresse esclusivamente durante la fase di lisi cellulare",
    "Attivano immediatamente e direttamente il ciclo litico del fago",
    "Distruggono progressivamente il cromosoma batterico ospite",
    "Non hanno alcuna funzione regolatoria sull'espressione genica fagica",
    "Impediscono la trascrizione di tutti gli altri geni del profago, mantenendolo silente"], correct:4 },

{ id:"vir-43", topic:"virus", type:"fill",
  q:"Lo schema di classificazione dei virus basato sui passaggi necessari per produrre mRNA funzionante a partire dal genoma virale è detto schema di ________.",
  answer:"BALTIMORE" },

/* ============================= ACIDI NUCLEICI E CROMATINA ============================= */

{ id:"acnu-01", topic:"acidinucleici", type:"mc",
  q:"Nella doppia elica del DNA, i due filamenti sono:",
  options:[
    "Antiparalleli: un filamento è orientato 5'→3', l'altro 3'→5'",
    "Legati tra loro solo da legami covalenti diretti tra le basi",
    "Privi di una polarità definita",
    "Paralleli, con la stessa polarità 5'→3'",
    "Sempre presenti a singolo filamento"], correct:0 },

{ id:"acnu-02", topic:"acidinucleici", type:"mc",
  q:"Nell'appaiamento delle basi del DNA, quanti legami idrogeno si formano in una coppia G≡C rispetto a una coppia A=T?",
  options:[
    "Nessun legame idrogeno: solo legami covalenti",
    "3 legami H per G≡C, 2 legami H per A=T",
    "2 legami H in entrambi i casi",
    "2 legami H per G≡C, 3 legami H per A=T",
    "4 legami H in entrambi i casi"], correct:1 },

{ id:"acnu-03", topic:"acidinucleici", type:"mc",
  q:"Una molecola di DNA ricca in coppie G-C, rispetto a una di pari lunghezza ricca in coppie A-T, presenta una temperatura di fusione ($T_m$):",
  options:[
    "Più alta, perché le coppie G-C formano più legami idrogeno e richiedono più energia per separarsi",
    "Non misurabile sperimentalmente, poiché la denaturazione del DNA avviene in modo istantaneo",
    "Più bassa, perché l'impilamento delle basi G-C destabilizza maggiormente la doppia elica",
    "Indipendente dalla composizione in basi, poiché dipende solo dalla lunghezza della molecola",
    "Identica a quella di una molecola ricca in A-T, perché il numero di legami idrogeno non varia"], correct:0 },

{ id:"acnu-04", topic:"acidinucleici", type:"mc",
  q:"La denaturazione del DNA consiste in:",
  options:[
    "La sintesi di un nuovo filamento di DNA complementare a partire da un primer di RNA",
    "La separazione delle due eliche per rottura dei legami idrogeno tra le basi appaiate",
    "La formazione di nuovi legami covalenti tra le basi complementari delle due eliche",
    "La metilazione delle citosine del DNA, un meccanismo di regolazione epigenetica",
    "La rottura dei legami fosfodiestere dello scheletro zucchero-fosfato di entrambi i filamenti"], correct:1 },

{ id:"acnu-05", topic:"acidinucleici", type:"mc",
  q:"Il nucleosoma, unità di base della cromatina, è costituito da DNA avvolto attorno a:",
  options:[
    "Un tetramero di tubulina, la stessa proteina che forma i microtubuli",
    "Nessuna proteina, poiché nel nucleosoma il DNA rimane completamente nudo",
    "Una molecola di RNA polimerasi legata stabilmente al DNA stampo",
    "Un ottamero di istoni (2 copie ciascuno di H2A, H2B, H3, H4)",
    "Un singolo istone H1, che si lega al DNA linker tra nucleosomi consecutivi"], correct:3 },

{ id:"acnu-06", topic:"acidinucleici", type:"mc",
  q:"Il ruolo dell'istone H1 nella struttura della cromatina è:",
  options:[
    "Legare il DNA linker in entrata e in uscita dal nucleosoma, favorendo il compattamento nella fibra da 30 nm",
    "Formare, insieme a due copie ciascuna di H2A, H2B, H3 e H4, l'ottamero proteico centrale del nucleosoma",
    "Digerire enzimaticamente il DNA danneggiato nell'ambito dei meccanismi di riparazione cellulare",
    "Trasportare attivamente il DNA neosintetizzato dal nucleo al citoplasma durante l'interfase",
    "Catalizzare la sintesi del nuovo filamento di DNA durante la fase S del ciclo cellulare"], correct:0 },

{ id:"acnu-07", topic:"acidinucleici", type:"mc",
  q:"Nell'ordine corretto, i livelli di compattamento del DNA eucariotico, dal meno al più condensato, sono:",
  options:[
    "Nucleosoma (10 nm) → DNA nudo (2 nm) → fibra da 30 nm → domini ad ansa (300 nm) → cromosoma metafasico (1400 nm) → eterocromatina (700 nm)",
    "DNA nudo (2 nm) → nucleosoma (10 nm) → fibra da 30 nm/solenoide → domini ad ansa (300 nm) → eterocromatina (700 nm) → cromosoma metafasico (1400 nm)",
    "Cromosoma metafasico (1400 nm) → eterocromatina (700 nm) → domini ad ansa (300 nm) → fibra da 30 nm → nucleosoma (10 nm) → DNA nudo (2 nm)",
    "DNA nudo (2 nm) → fibra da 30 nm → nucleosoma (10 nm) → eterocromatina (700 nm) → domini ad ansa (300 nm) → cromosoma metafasico (1400 nm)",
    "DNA nudo (2 nm) → nucleosoma (10 nm) → domini ad ansa (300 nm) → fibra da 30 nm/solenoide → cromosoma metafasico (1400 nm) → eterocromatina (700 nm)"], correct:1 },

{ id:"acnu-08", topic:"acidinucleici", type:"mc",
  q:"L'eucromatina, rispetto all'eterocromatina, è:",
  options:[
    "Più condensata e trascrizionalmente sempre inattiva, come la cromatina centromerica",
    "Meno condensata (lassa) e generalmente trascrizionalmente attiva",
    "Identica all'eterocromatina per grado di condensazione e attività trascrizionale",
    "Priva di istoni associati, legata al DNA solo da proteine non istoniche",
    "Presente esclusivamente nelle cellule procariotiche, che non possiedono istoni"], correct:1 },

{ id:"acnu-09", topic:"acidinucleici", type:"mc",
  q:"L'eterocromatina facoltativa, a differenza di quella costitutiva:",
  options:[
    "È composta esclusivamente da RNA regolatorio, senza alcun filamento di DNA associato",
    "È inattivata solo in specifiche fasi dello sviluppo o in determinati tipi cellulari, potendo tornare attiva",
    "Non è mai presente nel genoma eucariotico, essendo tipica solo dei procarioti",
    "Si trova esclusivamente nel DNA mitocondriale, mai nei cromosomi nucleari",
    "Resta sempre condensata e trascrizionalmente silente in ogni tipo cellulare, come quella costitutiva"], correct:1 },

{ id:"acnu-10", topic:"acidinucleici", type:"mc",
  q:"Alla metafase, i due cromatidi fratelli di un cromosoma sono tenuti insieme, a livello del centromero, da:",
  options:[
    "La lamina nucleare",
    "I telomeri",
    "I ribosomi",
    "Le DNA polimerasi",
    "Le proteine coesine"], correct:4 },

{ id:"acnu-11", topic:"acidinucleici", type:"mc",
  q:"Un cromosoma con il centromero in posizione centrale, con bracci p e q di lunghezza simile, è classificato come:",
  options:[
    "Metacentrico",
    "Poliploide",
    "Aneuploide",
    "Telocentrico",
    "Acrocentrico"], correct:0 },

{ id:"acnu-12", topic:"acidinucleici", type:"mc",
  q:"La dimensione del genoma di un organismo:",
  options:[
    "È identica in tutti gli organismi eucarioti, indipendentemente dal numero di cellule, tessuti e organi",
    "È sempre direttamente proporzionale alla complessità biologica dell'organismo, aumentando insieme al numero dei suoi geni funzionali",
    "Dipende esclusivamente dal numero di cromosomi presenti nel cariotipo, indipendentemente dalla loro lunghezza",
    "Non è necessariamente proporzionale alla complessità dell'organismo, poiché gran parte del DNA eucariotico è costituito da sequenze ripetute non codificanti",
    "Determina univocamente sia la posizione filogenetica sia il numero totale di specie appartenenti a un dato taxon"], correct:3 },

{ id:"acnu-13", topic:"acidinucleici", type:"fill",
  q:"Nell'appaiamento delle basi del DNA, l'adenina forma legami idrogeno con la ________.",
  answer:"TIMINA" },

{ id:"acnu-14", topic:"acidinucleici", type:"fill",
  q:"L'unità di base della cromatina, costituita da DNA avvolto attorno a un ottamero di istoni, è detta ________.",
  answer:"NUCLEOSOMA" },

{ id:"acnu-15", topic:"acidinucleici", type:"fill",
  q:"La temperatura alla quale il 50% del DNA a doppia elica risulta denaturato è detta temperatura di ________.",
  answer:"FUSIONE" },

{ id:"acnu-16", topic:"acidinucleici", type:"fill",
  q:"Il tratto di DNA compreso fra due nucleosomi successivi è detto DNA ________.",
  answer:"LINKER" },

{ id:"acnu-17", topic:"acidinucleici", type:"fill",
  q:"Le proteine che tengono uniti i due cromatidi fratelli di un cromosoma sono dette ________.",
  answer:"COESINE" },

{ id:"acnu-18", topic:"acidinucleici", type:"fill",
  q:"Un cromosoma con il centromero quasi all'estremità, il cui braccio corto è molto ridotto, è detto ________.",
  answer:"ACROCENTRICO" },

{ id:"acnu-19", topic:"acidinucleici", type:"mc",
  q:"Un nucleotide, unità di base degli acidi nucleici, è composto da tre parti:",
  options:[
    "Solo una base azotata e un gruppo fosfato, privo di qualunque zucchero",
    "Uno zucchero pentoso, un gruppo fosfato e una base azotata",
    "Uno zucchero esoso, due basi azotate e un gruppo fosfato",
    "Un amminoacido, un gruppo fosfato e uno zucchero pentoso",
    "Due zuccheri pentosi legati a un'unica base azotata"], correct:1 },

{ id:"acnu-20", topic:"acidinucleici", type:"mc",
  q:"La differenza chimica fondamentale tra ribosio (RNA) e desossiribosio (DNA) riguarda il carbonio 2', che nel ribosio presenta:",
  options:[
    "Un doppio legame aggiuntivo rispetto al desossiribosio",
    "Un gruppo -OH, assente nel desossiribosio (che ha solo -H)",
    "Un atomo di azoto in più, assente nella struttura del desossiribosio",
    "Un gruppo amminico, assente invece nel carbonio 2' del desossiribosio",
    "Un gruppo fosfato aggiuntivo, legato covalentemente al carbonio 2'"], correct:1 },

{ id:"acnu-21", topic:"acidinucleici", type:"mc",
  q:"Il gruppo -OH aggiuntivo del ribosio, rispetto al desossiribosio, rende l'RNA:",
  options:[
    "Più stabile del DNA, grazie alla presenza del gruppo -OH aggiuntivo sul carbonio 2'",
    "Chimicamente inerte e praticamente insensibile a qualsiasi processo di idrolisi",
    "Incapace di formare legami fosfodiesterici tra nucleotidi successivi",
    "Chimicamente più reattivo e strutturalmente meno stabile, più soggetto a idrolisi spontanea",
    "Privo di carica elettrica netta, a differenza dello scheletro fosfato del DNA"], correct:3 },

{ id:"acnu-22", topic:"acidinucleici", type:"mc",
  q:"Le basi azotate puriniche, caratterizzate da un anello doppio (un anello a 6 e uno a 5 atomi fusi), sono:",
  options:[
    "Timina e uracile",
    "Adenina e guanina",
    "Guanina e uracile",
    "Adenina e citosina",
    "Citosina e timina"], correct:1 },

{ id:"acnu-23", topic:"acidinucleici", type:"mc",
  q:"Le basi azotate pirimidiniche, con un anello singolo a sei termini, sono citosina, timina e:",
  options:[
    "Il ribosio, uno zucchero pentoso",
    "Il desossiribosio, uno zucchero pentoso",
    "Uracile (presente solo nell'RNA)",
    "La guanina, base purinica a doppio anello",
    "L'adenina, base purinica a doppio anello"], correct:2 },

{ id:"acnu-24", topic:"acidinucleici", type:"mc",
  q:"La base azotata si lega allo zucchero pentoso tramite un legame:",
  options:[
    "N-glicosidico, tra il carbonio 1' dello zucchero e un azoto della base",
    "Peptidico, lo stesso legame che unisce due amminoacidi consecutivi",
    "Estere, tra il carbonio 3' dello zucchero e il gruppo fosfato successivo",
    "Fosfodiesterico, tra il fosfato in 5' e l'ossidrile in 3' di due nucleotidi",
    "A idrogeno, tra il carbonio 1' dello zucchero e l'azoto della base"], correct:0 },

{ id:"acnu-25", topic:"acidinucleici", type:"mc",
  q:"In termini di nomenclatura, l'unione di sola base azotata e zucchero (senza fosfato) prende il nome di:",
  options:[
    "Nucleoside",
    "Nucleolo",
    "Nucleina",
    "Nucleotide",
    "Nucleosoma"], correct:0 },

{ id:"acnu-26", topic:"acidinucleici", type:"mc",
  q:"Il legame che unisce due nucleotidi successivi nella catena di un acido nucleico, formatosi tra il gruppo -OH in 3' di uno zucchero e il gruppo fosfato in 5' del nucleotide successivo, si chiama legame:",
  options:[
    "Glicosidico O",
    "A idrogeno",
    "N-glicosidico",
    "Fosfodiesterico",
    "Peptidico"], correct:3 },

{ id:"acnu-27", topic:"acidinucleici", type:"mc",
  q:"Gli enzimi che sintetizzano acidi nucleici (DNA e RNA polimerasi) allungano la catena in crescita esclusivamente in direzione:",
  options:[
    "In entrambe le direzioni indifferentemente, a seconda dell'enzima coinvolto",
    "3' → 5', aggiungendo nucleotidi all'estremità 5'-fosfato libera",
    "Solo in direzione 3' → 3', unendo due estremità 3'-OH tra loro",
    "5' → 3', aggiungendo nuovi nucleotidi all'estremità 3'-OH libera",
    "Dal centro della molecola verso le due estremità contemporaneamente"], correct:3 },

{ id:"acnu-28", topic:"acidinucleici", type:"mc",
  q:"Le due estremità di un filamento di acido nucleico sono chimicamente diverse: l'estremità 5' termina con un gruppo fosfato libero, mentre l'estremità 3' termina con:",
  options:[
    "Un gruppo ossidrile (-OH) libero",
    "Un secondo gruppo fosfato",
    "Un'altra base azotata libera",
    "Un gruppo amminico libero",
    "Un legame peptidico"], correct:0 },

{ id:"acnu-29", topic:"acidinucleici", type:"mc",
  q:"Griffith (1928), studiando ceppi di Streptococcus pneumoniae, scoprì il cosiddetto 'principio trasformante' osservando che:",
  options:[
    "Il principio trasformante era sicuramente di natura proteica, come dimostrato dai suoi esperimenti del 1928",
    "I batteri S da soli, privati della capsula polisaccaridica, non risultavano mai virulenti nel topo",
    "I batteri R, per quanto a lungo coltivati insieme a batteri S morti, non potevano mai essere trasformati",
    "Batteri R vivi, iniettati insieme a batteri S morti per calore, acquisivano la capacità di essere virulenti come i batteri S",
    "Il topo iniettato sopravviveva sempre, indipendentemente dalla combinazione di batteri utilizzata"], correct:3,
  explain:"Griffith dimostrò che un'informazione ereditaria poteva essere trasferita da una cellula batterica a un'altra, senza però identificare la natura chimica del principio trasformante." },

{ id:"acnu-30", topic:"acidinucleici", type:"mc",
  q:"Avery, McLeod e McCarty (1944), trattando selettivamente l'estratto di batteri S morti con enzimi che distruggevano proteine, RNA o DNA, dimostrarono che il principio trasformante di Griffith era:",
  options:[
    "I polisaccaridi della capsula",
    "Il DNA",
    "Le proteine",
    "I lipidi di membrana",
    "L'RNA"], correct:1 },

{ id:"acnu-31", topic:"acidinucleici", type:"mc",
  q:"Chargaff (1950), analizzando la composizione in basi del DNA di organismi diversi, scoprì la regolarità secondo cui:",
  options:[
    "La quantità di adenina è sempre uguale a quella di timina, e quella di guanina a quella di citosina (A=T, G=C)",
    "La composizione percentuale delle quattro basi è identica in tutti gli organismi viventi",
    "Tutte e quattro le basi azotate sono sempre presenti in eguale quantità tra loro",
    "La quantità di basi puriniche è sempre doppia rispetto a quella delle basi pirimidiniche",
    "Il DNA contiene sempre più uracile che timina, indipendentemente dalla specie considerata"], correct:0 },

{ id:"acnu-32", topic:"acidinucleici", type:"mc",
  q:"Hershey e Chase (1952), utilizzando un batteriofago marcato con isotopi radioattivi ($^{32}P$ per il DNA e $^{35}S$ per le proteine), dimostrarono definitivamente che:",
  options:[
    "Il materiale genetico trasmesso alla progenie virale è il DNA, non le proteine",
    "I batteriofagi non contengono acidi nucleici, ma solo un involucro proteico esterno",
    "Il fosforo radioattivo si ritrovava esclusivamente nel rivestimento proteico del fago",
    "Il materiale genetico trasmesso alla progenie è costituito dalle proteine capsulari del fago",
    "Il DNA e le proteine contribuiscono in egual misura al materiale genetico trasmesso"], correct:0 },

{ id:"acnu-33", topic:"acidinucleici", type:"mc",
  q:"Le immagini di diffrazione a raggi X ottenute da Franklin e Wilkins sul DNA, caratterizzate da una tipica forma a X, fornirono una forte indicazione della presenza di:",
  options:[
    "Una struttura a foglietto piatto",
    "Una struttura globulare compatta priva di simmetria",
    "Una struttura elicoidale, con gruppi fosfato rivolti verso l'esterno",
    "Un'assenza totale di periodicità nella molecola",
    "Una struttura completamente lineare e non ripetitiva"], correct:2 },

{ id:"acnu-34", topic:"acidinucleici", type:"mc",
  q:"Watson e Crick (1953) proposero un modello di DNA costituito da due filamenti antiparalleli avvolti l'uno attorno all'altro, con le basi appaiate secondo il principio di complementarità: adenina con timina (2 legami idrogeno) e guanina con:",
  options:[
    "Guanina stessa",
    "Citosina, tramite 3 legami idrogeno",
    "Adenina, tramite 1 legame idrogeno",
    "Timina, tramite 4 legami idrogeno",
    "Uracile, tramite 2 legami idrogeno"], correct:1 },

{ id:"acnu-35", topic:"acidinucleici", type:"mc",
  q:"Nella struttura B-DNA, la conformazione fisiologica predominante nella cellula, un giro completo dell'elica misura circa 3,4 nm e contiene:",
  options:[
    "10 paia di basi",
    "1000 paia di basi",
    "1 paio di basi",
    "100 paia di basi",
    "2 paia di basi"], correct:0 },

{ id:"acnu-36", topic:"acidinucleici", type:"mc",
  q:"Sulla superficie della doppia elica del DNA sono presenti due solchi di ampiezza diversa; è all'interno del solco maggiore che:",
  options:[
    "Avviene sempre e comunque la denaturazione locale del DNA, con apertura permanente dell'elica",
    "Le proteine regolatrici (fattori di trascrizione, enzimi) leggono la sequenza di basi senza dover aprire l'elica",
    "Si legano esclusivamente gli istoni, che qui trovano il loro unico sito di aggancio al DNA",
    "Si formano preferenzialmente i nucleosomi, grazie alla maggiore accessibilità del solco maggiore",
    "Ha luogo la sintesi e l'assemblaggio delle subunità ribosomiali all'interno del nucleolo"], correct:1 },

{ id:"acnu-37", topic:"acidinucleici", type:"mc",
  q:"Nella denaturazione del DNA, il riscaldamento o il pH estremo rompono:",
  options:[
    "I legami idrogeno tra le basi appaiate, lasciando intatto lo scheletro zucchero-fosfato",
    "Sia i legami idrogeno sia i legami fosfodiesterici, in modo irreversibile e permanente",
    "Nessun legame chimico, ma solo le interazioni idrofobiche di impilamento tra le basi",
    "Solo i legami N-glicosidici tra lo zucchero e le basi azotate di entrambi i filamenti",
    "I legami fosfodiesterici covalenti dello scheletro zucchero-fosfato di entrambe le eliche"], correct:0 },

{ id:"acnu-38", topic:"acidinucleici", type:"mc",
  q:"A parità di lunghezza, una molecola di DNA con un contenuto maggiore di coppie G-C, rispetto a una ricca in coppie A-T, denatura a una temperatura di melting:",
  options:[
    "Indipendente dalla lunghezza della molecola, poiché dipende solo dal pH della soluzione",
    "Più bassa, perché le coppie G-C richiedono meno energia per separare le due eliche",
    "Uguale a quella di una molecola ricca in A-T, perché la Tm non dipende dalla composizione in basi",
    "Pari a 0 °C in ogni caso, indipendentemente dalla composizione e dalla lunghezza",
    "Più alta, perché le coppie G-C sono tenute insieme da 3 legami idrogeno invece di 2"], correct:4 },

{ id:"acnu-39", topic:"acidinucleici", type:"mc",
  q:"L'effetto ipercromico osservato durante la denaturazione del DNA consiste in:",
  options:[
    "Una perdita totale e irreversibile della capacità del DNA di assorbire luce UV a 260 nm, dovuta alla distruzione completa dei nucleotidi",
    "Un cambiamento di colore visibile a occhio nudo, che fa virare la soluzione di DNA dal trasparente a un giallo intenso",
    "Una diminuzione dell'assorbanza a 260 nm, perché la separazione dei filamenti riduce l'esposizione delle basi alla radiazione UV",
    "Un aumento dell'assorbanza a 260 nm, perché le basi impilate nel doppio filamento assorbivano meno UV rispetto a quando sono libere in un singolo filamento",
    "Un aumento della fluorescenza visibile a occhio nudo, dovuto al distacco degli agenti intercalanti fluorescenti dalle basi appaiate"], correct:3 },

{ id:"acnu-40", topic:"acidinucleici", type:"mc",
  q:"Se, dopo denaturazione, due filamenti complementari provenienti da fonti diverse (es. specie diverse, o DNA ed RNA) si riappaiano, il processo prende il nome di:",
  options:[
    "Trascrizione",
    "Rinaturazione semplice",
    "Ibridazione",
    "Traduzione",
    "Ricombinazione"], correct:2 },

{ id:"acnu-41", topic:"acidinucleici", type:"mc",
  q:"A differenza del DNA, l'RNA utilizza come base pirimidinica l'uracile al posto della timina; questa scelta, nel DNA, permette al sistema di riparazione cellulare di:",
  options:[
    "Riconoscere come errore l'uracile generato dalla deaminazione spontanea della citosina, distinguendolo da una base corretta",
    "Impedire completamente la trascrizione dei geni situati nelle regioni di eterocromatina costitutiva",
    "Formare più facilmente i nucleosomi, poiché il gruppo metile della timina riduce l'ingombro sterico",
    "Aumentare la velocità della forcella di replicazione durante la fase S del ciclo cellulare",
    "Stabilizzare ulteriormente i legami idrogeno tra la timina e l'adenina appaiata"], correct:0 },

{ id:"acnu-42", topic:"acidinucleici", type:"mc",
  q:"L'RNA, a differenza del DNA, è generalmente:",
  options:[
    "A singolo filamento, ma capace di ripiegarsi su se stesso formando strutture secondarie (anse, forcine, strutture a stelo)",
    "Sempre a doppio filamento rigido, organizzato in una doppia elica stabile del tutto simile a quella del DNA",
    "Privo del gruppo fosfato nello scheletro portante, sostituito da un legame diretto tra zuccheri",
    "Incapace di legare proteine o di interagire con esse, a differenza del DNA nucleosomiale",
    "Privo di basi puriniche, contenendo esclusivamente le basi pirimidiniche citosina e uracile"], correct:0 },

{ id:"acnu-43", topic:"acidinucleici", type:"mc",
  q:"L'RNA messaggero (mRNA), unico tra i principali tipi di RNA a portare un'informazione diversa a ogni sintesi, presenta tipicamente:",
  options:[
    "Solo un anticodone in 5', complementare al codone da tradurre sul ribosoma",
    "Una struttura permanente a trifoglio, tipica invece del tRNA maturo",
    "Un cappuccio (cap) in 5' e una coda poli-A in 3', che ne aumentano la stabilità e ne regolano l'espressione",
    "Una sequenza identica in ogni cellula dell'organismo, indipendentemente dal gene trascritto",
    "Nessuna modificazione alle estremità 5' e 3', che restano libere e non protette"], correct:2 },

{ id:"acnu-44", topic:"acidinucleici", type:"mc",
  q:"Il tRNA (transfer), che fa da adattatore tra il linguaggio dei codoni e quello degli amminoacidi, si ripiega in una tipica struttura a due dimensioni detta:",
  options:[
    "Trifoglio (cloverleaf), che nello spazio si avvolge in una forma a L",
    "Anello semplice privo di qualunque struttura secondaria appaiata",
    "Foglietto β continuo, tipico invece delle proteine strutturali",
    "Struttura globulare compatta, del tutto priva di basi appaiate",
    "Doppia elica rigida, identica per forma a quella del DNA genomico"], correct:0 },

{ id:"acnu-45", topic:"acidinucleici", type:"mc",
  q:"L'rRNA (ribosomiale), componente strutturale e catalitico dei ribosomi, è responsabile della catalisi della formazione del legame peptidico durante la sintesi proteica: questo rende il ribosoma un esempio di:",
  options:[
    "Ribozima, cioè un enzima costituito da RNA",
    "Complesso SRP, che riconosce il peptide segnale",
    "Chaperonina, che assiste il ripiegamento proteico",
    "Spliceosoma, che rimuove gli introni dal pre-mRNA",
    "Proteasoma, che degrada le proteine mal ripiegate"], correct:0,
  explain:"Il fatto che l'RNA possa sia conservare informazione sia catalizzare reazioni è una delle prove più forti a sostegno dell'ipotesi del mondo a RNA (RNA world)." },

{ id:"acnu-46", topic:"acidinucleici", type:"mc",
  q:"La replicazione del DNA è definita semiconservativa, in base al modello confermato dall'esperimento di Meselson e Stahl, perché:",
  options:[
    "Entrambi i filamenti figli sono completamente nuovi",
    "I filamenti si mescolano in segmenti alternati casuali (modello dispersivo)",
    "Solo metà delle molecole figlie contiene DNA nuovo",
    "Ogni molecola di DNA figlia contiene un filamento parentale (stampo) e uno di nuova sintesi",
    "Entrambi i filamenti figli sono completamente conservati dal genitore"], correct:3 },

{ id:"acnu-47", topic:"acidinucleici", type:"mc",
  q:"L'enzima che apre la doppia elica rompendo i legami idrogeno tra le basi, durante la replicazione del DNA, è:",
  options:[
    "L'elicasi",
    "La ligasi",
    "La topoisomerasi soltanto",
    "La primasi",
    "La DNA polimerasi"], correct:0 },

{ id:"acnu-48", topic:"acidinucleici", type:"mc",
  q:"Le proteine SSB (single-strand binding proteins), durante la replicazione del DNA, hanno la funzione di:",
  options:[
    "Saldare covalentemente i frammenti di Okazaki formando il legame fosfodiesterico mancante",
    "Legarsi ai filamenti singoli appena separati, impedendo che si riappaino prematuramente",
    "Correggere gli errori di appaiamento delle basi tramite attività esonucleasica 3'→5'",
    "Tagliare e risaldare il DNA a monte della forcella per rilasciare la tensione torsionale",
    "Sintetizzare un breve primer di RNA necessario per l'innesco della DNA polimerasi"], correct:1 },

{ id:"acnu-49", topic:"acidinucleici", type:"mc",
  q:"La tensione torsionale generata dall'apertura della doppia elica durante la replicazione viene rilasciata dall'azione di:",
  options:[
    "La topoisomerasi, che taglia e risalda il DNA a monte della forcella",
    "La DNA ligasi, che salda i frammenti di Okazaki neosintetizzati",
    "La telomerasi, che allunga le estremità telomeriche dei cromosomi",
    "Le proteine SSB, che si legano ai filamenti singoli appena separati",
    "La proteina FtsZ, coinvolta nella divisione delle cellule batteriche"], correct:0 },

{ id:"acnu-50", topic:"acidinucleici", type:"mc",
  q:"Poiché la DNA polimerasi non è in grado di iniziare la sintesi di una nuova catena da zero, ma solo di allungarne una già esistente, è necessaria la sintesi preliminare di un breve primer a RNA, ad opera dell'enzima:",
  options:[
    "Topoisomerasi",
    "Esonucleasi",
    "Ligasi",
    "Primasi",
    "Elicasi"], correct:3 },

{ id:"acnu-51", topic:"acidinucleici", type:"mc",
  q:"Poiché la DNA polimerasi sintetizza solo in direzione 5'→3' e i due filamenti stampo sono antiparalleli, uno dei due nuovi filamenti (leading strand) viene sintetizzato in modo continuo, mentre l'altro (lagging strand) viene sintetizzato in modo discontinuo, a piccoli tratti chiamati:",
  options:[
    "Codoni",
    "Anticodoni",
    "Introni",
    "Frammenti di Okazaki",
    "Nucleosomi"], correct:3 },

{ id:"acnu-52", topic:"acidinucleici", type:"mc",
  q:"Dopo la rimozione dei primer di RNA e il loro completamento con DNA, l'interruzione (nick) residua nello scheletro zucchero-fosfato tra un frammento di Okazaki e il successivo viene saldata dall'enzima:",
  options:[
    "Primasi, che sintetizza un nuovo primer di RNA in quel punto",
    "DNA polimerasi, che riavvia da zero la sintesi del filamento",
    "Topoisomerasi, che rilascia la tensione torsionale a monte",
    "DNA ligasi, formando il legame fosfodiesterico mancante",
    "Elicasi, che riapre localmente la doppia elica del DNA"], correct:3 },

{ id:"acnu-53", topic:"acidinucleici", type:"mc",
  q:"L'elevata fedeltà della replicazione del DNA è garantita anche dall'attività esonucleasica di correzione di bozze (proofreading) della DNA polimerasi, che agisce in direzione:",
  options:[
    "3' → 5', controllando e correggendo ogni base appena aggiunta",
    "In direzione casuale",
    "Solo dopo il completamento dell'intera molecola",
    "5' → 3' soltanto, nella stessa direzione della sintesi",
    "Solo sui frammenti di Okazaki, mai sul filamento veloce"], correct:0 },

{ id:"acnu-54", topic:"acidinucleici", type:"fill",
  q:"Il legame che unisce la base azotata al carbonio 1' dello zucchero pentoso in un nucleotide è detto legame ________.",
  answer:"N-GLICOSIDICO", answerAlt:["GLICOSIDICO"] },

{ id:"acnu-55", topic:"acidinucleici", type:"fill",
  q:"L'unione di sola base azotata e zucchero pentoso, senza il gruppo fosfato, si chiama ________.",
  answer:"NUCLEOSIDE" },

{ id:"acnu-56", topic:"acidinucleici", type:"fill",
  q:"L'esperimento del 1952 che, marcando DNA e proteine di un batteriofago con isotopi radioattivi diversi, dimostrò che il materiale genetico è il DNA, fu condotto da Hershey e ________.",
  answer:"CHASE" },

{ id:"acnu-57", topic:"acidinucleici", type:"fill",
  q:"Il modello a doppia elica del DNA, basato sui dati di diffrazione a raggi X di Franklin, fu proposto nel 1953 da Watson e ________.",
  answer:"CRICK" },

{ id:"acnu-58", topic:"acidinucleici", type:"fill",
  q:"L'enzima che sintetizza il breve primer di RNA necessario per l'avvio della sintesi di un nuovo filamento di DNA si chiama ________.",
  answer:"PRIMASI" },

{ id:"acnu-59", topic:"acidinucleici", type:"fill",
  q:"I brevi frammenti di DNA con cui viene sintetizzato in modo discontinuo il filamento lento (lagging strand) durante la replicazione si chiamano frammenti di ________.",
  answer:"OKAZAKI" },

{ id:"acnu-60", topic:"acidinucleici", type:"mc",
  q:"A differenza del cromosoma procariotico, circolare, i cromosomi eucariotici sono:",
  options:[
    "Lineari, il che pone due problemi biologici: la vulnerabilità delle estremità libere e la difficoltà di replicarle completamente",
    "Sempre presenti in un'unica copia per ogni cellula, senza possibilità di replicazione durante l'interfase",
    "Costituiti da RNA anziché DNA, e per questo privi dei legami fosfodiesterici tipici dello scheletro",
    "Circolari, esattamente come il cromosoma dei procarioti, e privi quindi di veri telomeri",
    "Privi di DNA a doppio filamento, organizzati come singole eliche legate a proteine istoniche"], correct:0 },

{ id:"acnu-61", topic:"acidinucleici", type:"mc",
  q:"Le estremità libere di un cromosoma lineare sono un potenziale bersaglio perché possono essere erroneamente riconosciute come un danno al DNA (una rottura a doppio filamento), rischiando di attivare:",
  options:[
    "La trascrizione di tutto il genoma",
    "Solo la duplicazione immediata del cromosoma",
    "L'attivazione della telomerasi in ogni cellula",
    "Nessuna risposta cellulare",
    "L'arresto del ciclo cellulare o l'apoptosi"], correct:4 },

{ id:"acnu-62", topic:"acidinucleici", type:"mc",
  q:"Il 'problema della replicazione terminale' nasce dal fatto che:",
  options:[
    "I telomeri, legandosi stabilmente alla telomerasi fin dalla prima divisione, impediscono completamente l'avvio della forcella di replicazione a ogni ciclo",
    "Il cromosoma si allunga progressivamente a ogni ciclo di replicazione, perché la telomerasi aggiunge più nucleotidi di quanti la DNA polimerasi ne rimuova",
    "La DNA ligasi, assente nelle cellule eucariotiche a differenza di quelle procariotiche, non riesce mai a saldare i frammenti di Okazaki del filamento lento",
    "La DNA polimerasi, sintetizzando solo in direzione 5'→3' e richiedendo sempre un primer, non può colmare il piccolo tratto lasciato scoperto dalla rimozione dell'ultimo primer di RNA vicino all'estremità del filamento lento",
    "La DNA polimerasi, priva della necessaria attività esonucleasica di proofreading, introduce errori sistematici proprio in prossimità delle estremità telomeriche"], correct:3,
  explain:"Il risultato è che, a ogni ciclo di replicazione, il cromosoma si accorcia leggermente alle estremità — problema che nei procarioti non esiste, poiché il cromosoma circolare non ha estremità libere da replicare." },

{ id:"acnu-63", topic:"acidinucleici", type:"mc",
  q:"I telomeri, sequenze ripetute non codificanti alle estremità dei cromosomi lineari (nell'uomo, ripetizioni di TTAGGG), risolvono il problema della replicazione terminale principalmente perché:",
  options:[
    "Si allungano indefinitamente a ogni ciclo di replicazione, grazie all'azione costante della telomerasi",
    "Fungono da 'tampone' sacrificabile: il loro progressivo accorciamento non intacca, almeno fino a un certo limite, i geni essenziali",
    "Codificano proteine essenziali per la sopravvivenza cellulare, la cui perdita risulterebbe sempre letale",
    "Sono identici, per sequenza ripetuta e funzione, alle regioni centromeriche che ancorano il fuso mitotico",
    "Impediscono in modo assoluto qualunque accorciamento del cromosoma a ogni ciclo di divisione cellulare"], correct:1 },

{ id:"acnu-64", topic:"acidinucleici", type:"mc",
  q:"L'enzima telomerasi, capace di allungare i telomeri contrastandone l'accorciamento, è una trascrittasi inversa particolare perché:",
  options:[
    "Sintetizza DNA senza mai utilizzare alcuno stampo, né proprio né esogeno",
    "Agisce esclusivamente sul filamento veloce (leading strand) durante la replicazione",
    "Porta con sé un proprio stampo a RNA interno, che usa per sintetizzare nuovo DNA telomerico",
    "Non richiede alcuna componente a RNA, funzionando come una normale DNA polimerasi",
    "È attiva allo stesso livello in tutte le cellule somatiche adulte differenziate"], correct:2,
  explain:"Nella maggior parte delle cellule somatiche adulte la telomerasi è inattiva, e il progressivo accorciamento dei telomeri è collegato alla senescenza cellulare (limite di Hayflick); resta attiva in cellule germinali, staminali e nella maggior parte delle cellule tumorali." },

{ id:"acnu-65", topic:"acidinucleici", type:"mc",
  q:"Un cromosoma eucariotico funzionale richiede tre elementi strutturali minimi e indispensabili: origine di replicazione, centromero e:",
  options:[
    "Un solo gene codificante",
    "Telomeri",
    "Un ribosoma associato",
    "Un promotore genico",
    "Una sola coppia di basi"], correct:1,
  explain:"La dimostrazione sperimentale di questa necessità venne dai cromosomi artificiali di lievito (YAC): un frammento di DNA lineare a cui si aggiungono solo un'origine di replicazione, un centromero e due telomeri si comporta come un vero cromosoma funzionale." },

{ id:"acnu-66", topic:"acidinucleici", type:"mc",
  q:"Il nucleosoma, unità fondamentale di impacchettamento del DNA, è costituito da circa 147 coppie di basi di DNA avvolte attorno a un ottamero istonico formato da due copie ciascuno di:",
  options:[
    "Istoni H2A, H2B, H3 e H4",
    "Istoni H1 soltanto",
    "Proteine non istoniche di membrana",
    "Quattro tipi diversi di RNA istonico",
    "Un solo tipo di istone, ripetuto otto volte"], correct:0 },

{ id:"acnu-67", topic:"acidinucleici", type:"mc",
  q:"L'interazione tra il DNA (carico negativamente per lo scheletro fosfato) e gli istoni del nucleosoma è resa possibile dal fatto che gli istoni sono:",
  options:[
    "Costituite prevalentemente da acidi grassi saturi, con code idrofobiche esposte al DNA",
    "Proteine acide, cariche negativamente come lo scheletro fosfato del DNA stesso",
    "Prive di carica elettrica netta, e quindi incapaci di interagire elettrostaticamente con il DNA",
    "Proteine fortemente basiche, ricche di residui di lisina e arginina, carichi positivamente a pH fisiologico",
    "Solubili solo in ambiente fortemente acido, condizione assente nel nucleo cellulare"], correct:3 },

{ id:"acnu-68", topic:"acidinucleici", type:"mc",
  q:"Quando l'istone linker H1 si lega al punto in cui il DNA entra ed esce dal nucleosoma, la particella risultante prende il nome di:",
  options:[
    "Nucleosoma nudo",
    "Cromatosoma",
    "Centromero",
    "Solenoide",
    "Telomero"], correct:1 },

{ id:"acnu-69", topic:"acidinucleici", type:"mc",
  q:"La presenza sistematica dell'istone H1 su nucleosomi consecutivi fa ripiegare la fibra da 11 nm ('collana di perle') in una struttura più compatta, di circa 30 nm di diametro; due modelli geometrici sono stati proposti per questa fibra:",
  options:[
    "Il modello planetario, in cui i nucleosomi orbitano attorno a un asse proteico centrale",
    "Il modello a foglietto β, tipico invece del ripiegamento secondario delle proteine",
    "Il modello a solenoide (elica continua) e il modello a zig-zag (due file di nucleosomi intrecciate)",
    "Il modello a doppia elica, identico nella forma a quello della molecola di DNA nudo",
    "Il modello del mare di elettroni, tipico dei legami metallici e non della cromatina"], correct:2 },

{ id:"acnu-70", topic:"acidinucleici", type:"mc",
  q:"L'eterocromatina costitutiva, a differenza di quella facoltativa:",
  options:[
    "Resta sempre condensata e trascrizionalmente silente, in ogni tipo cellulare e in ogni fase del ciclo, e corrisponde soprattutto a DNA satellite ripetuto (regioni centromeriche e telomeriche)",
    "Può alternarsi tra uno stato condensato e uno decondensato a seconda del tipo cellulare e della fase dello sviluppo, in modo del tutto analogo al corpo di Barr",
    "È presente esclusivamente nelle cellule tumorali, dove sostituirebbe completamente l'eucromatina normalmente funzionale",
    "Si trova esclusivamente nel citoplasma, associata ai ribosomi liberi e alle membrane del reticolo endoplasmatico rugoso, mai in prossimità del nucleo",
    "Contiene la maggior parte dei geni codificanti attivamente trascritti, risultando quindi la componente più abbondante nelle cellule differenziate e specializzate"], correct:0 },

{ id:"acnu-71", topic:"acidinucleici", type:"mc",
  q:"L'eterocromatina facoltativa può alternarsi tra uno stato condensato (silente) e uno decondensato (attivo) a seconda del tipo cellulare; l'esempio classico nei mammiferi è:",
  options:[
    "Il cromosoma Y, inattivato casualmente in circa metà delle cellule dei soggetti maschili",
    "Il corpo di Barr, cioè uno dei due cromosomi X delle cellule femminili, inattivato casualmente e condensato in eterocromatina",
    "Il centromero di tutti i cromosomi, sempre condensato in eterocromatina in ogni fase del ciclo cellulare",
    "Il nucleolo, la regione nucleare specializzata nella sintesi delle subunità ribosomiali",
    "Il DNA mitocondriale, trasmesso per via materna e privo di istoni associati al genoma"], correct:1 },

{ id:"acnu-72", topic:"acidinucleici", type:"mc",
  q:"I complessi di rimodellamento della cromatina (es. famiglia SWI/SNF), a differenza delle modificazioni chimiche come acetilazione e metilazione:",
  options:[
    "Aggiungono gruppi acetile ai residui di lisina delle code istoniche N-terminali, come fa l'enzima HAT",
    "Non richiedono alcun apporto energetico, agendo per semplice diffusione passiva lungo la fibra di cromatina",
    "Degradano enzimaticamente il DNA in frammenti più piccoli, in modo analogo alle endonucleasi di restrizione",
    "Usano l'energia dell'idrolisi dell'ATP per spostare, spaziare o sostituire fisicamente i nucleosomi, senza aggiungere o rimuovere gruppi chimici",
    "Agiscono esclusivamente sul DNA mitocondriale, che è privo di una vera associazione con gli istoni"], correct:3 },

{ id:"acnu-73", topic:"acidinucleici", type:"mc",
  q:"Il meccanismo dell'acetilazione degli istoni, catalizzato dagli enzimi istone-acetiltransferasi (HAT), favorisce una cromatina più aperta e trascrizionalmente attiva perché:",
  options:[
    "Aggiunge una carica negativa aggiuntiva al DNA, rafforzando ulteriormente il legame elettrostatico con gli istoni basici",
    "Non produce alcun effetto misurabile sulla struttura o sul grado di compattazione della cromatina",
    "Taglia enzimaticamente il DNA in frammenti più corti, rendendolo così più accessibile ai fattori di trascrizione",
    "Rimuove fisicamente gli istoni dal DNA, lasciando la doppia elica completamente nuda e despiralizzata",
    "Il gruppo acetile neutralizza la carica positiva della lisina, indebolendo l'interazione elettrostatica tra istone e DNA carico negativamente"], correct:4,
  explain:"L'enzima opposto, l'istone-deacetilasi (HDAC), rimuove il gruppo acetile, ripristinando la carica positiva e favorendo una cromatina più condensata e silente." },

{ id:"acnu-74", topic:"acidinucleici", type:"fill",
  q:"L'enzima che allunga i telomeri contrastandone l'accorciamento progressivo, portando con sé un proprio stampo a RNA, si chiama ________.",
  answer:"TELOMERASI" },

{ id:"acnu-75", topic:"acidinucleici", type:"fill",
  q:"Le sequenze ripetute non codificanti che proteggono le estremità dei cromosomi lineari dalla degradazione e dalla fusione si chiamano ________.",
  answer:"TELOMERI" },

{ id:"acnu-76", topic:"acidinucleici", type:"fill",
  q:"Gli enzimi che aggiungono un gruppo acetile ai residui di lisina delle code istoniche, rendendo la cromatina più accessibile, si chiamano istone-________.",
  answer:"ACETILTRANSFERASI", answerAlt:["HAT"] },

/* ============================= ORGANELLI E CITOSCHELETRO ============================= */

{ id:"org-01", topic:"organelli", type:"mc",
  q:"L'involucro nucleare è costituito da una doppia membrana che è in continuità con:",
  options:[
    "I perossisomi",
    "Il reticolo endoplasmatico",
    "L'apparato del Golgi",
    "I lisosomi",
    "La membrana plasmatica"], correct:1 },

{ id:"org-02", topic:"organelli", type:"mc",
  q:"Il trasporto selettivo di proteine di grandi dimensioni attraverso i pori nucleari richiede:",
  options:[
    "Un legame covalente permanente con il DNA",
    "Una sequenza segnale di localizzazione nucleare (NLS)",
    "Solo la presenza di flippasi",
    "Nessun segnale specifico: avviene sempre per diffusione libera",
    "L'idrolisi diretta di NADH"], correct:1 },

{ id:"org-03", topic:"organelli", type:"mc",
  q:"La lamina nucleare, che sostiene la forma del nucleo e ancora la cromatina, è costituita da una rete di:",
  options:[
    "Microfilamenti di actina corticale",
    "Fosfolipidi della membrana nucleare interna",
    "Filamenti intermedi (lamine A, B, C)",
    "Microtubuli del fuso mitotico",
    "Molecole di rRNA neosintetizzato"], correct:2 },

{ id:"org-04", topic:"organelli", type:"mc",
  q:"Il nucleolo è la sede principale:",
  options:[
    "Della sintesi proteica sui ribosomi liberi nel citoplasma cellulare",
    "Della glicolisi anaerobica, con produzione netta di ATP",
    "Della trascrizione dei geni per l'rRNA e del primo assemblaggio delle subunità ribosomali",
    "Della duplicazione del DNA durante la fase S del ciclo cellulare",
    "Della β-ossidazione degli acidi grassi a catena molto lunga"], correct:2 },

{ id:"org-05", topic:"organelli", type:"mc",
  q:"Il reticolo endoplasmatico ruvido (RER), grazie ai ribosomi adesi alla sua superficie citosolica, è specializzato nella:",
  options:[
    "Digestione di macromolecole a pH acido, tipica dei lisosomi",
    "Sintesi di lipidi e steroidi, priva di ribosomi adesi",
    "Stoccaggio esclusivo del $Ca^{2+}$ nel lume cisternale",
    "Detossificazione da farmaci e xenobiotici via citocromo P450",
    "Sintesi e N-glicosilazione di proteine di membrana o destinate alla secrezione"], correct:4 },

{ id:"org-06", topic:"organelli", type:"mc",
  q:"Il reticolo endoplasmatico liscio (SER) è coinvolto principalmente in:",
  options:[
    "L'assemblaggio delle subunità ribosomali maggiore e minore nel nucleolo",
    "La sintesi e la N-glicosilazione di proteine destinate alla secrezione",
    "La sintesi di lipidi/steroidi, la detossificazione (citocromo P450) e lo stoccaggio del $Ca^{2+}$",
    "La fagocitosi di particelle estranee introdotte dall'esterno",
    "La duplicazione del DNA mitocondriale circolare prima della divisione"], correct:2 },

{ id:"org-07", topic:"organelli", type:"mc",
  q:"I ribosomi liberi nel citoplasma delle cellule eucariotiche sono di tipo:",
  options:[
    "70S, come i ribosomi dei mitocondri e dei procarioti",
    "Presenti esclusivamente nel nucleolo, mai nel citoplasma",
    "80S, costituiti da una subunità maggiore 60S e una minore 40S",
    "Privi di qualunque componente di RNA ribosomiale",
    "Costituiti da un'unica subunità priva di RNA"], correct:2 },

{ id:"org-08", topic:"organelli", type:"mc",
  q:"I mitocondri sono definiti organelli 'semiautonomi' perché:",
  options:[
    "Possiedono un proprio DNA circolare e ribosomi di tipo 70S, ma dipendono comunque dal nucleo per la maggior parte delle loro proteine",
    "Non contengono mai alcuna proteina codificata dal proprio DNA circolare mitocondriale interno",
    "Sono completamente indipendenti dal genoma nucleare per la sintesi di tutte le loro proteine",
    "Derivano per gemmazione diretta dalle cisterne dell'apparato del Golgi della stessa cellula",
    "Non sono mai in grado di dividersi autonomamente per scissione binaria del proprio genoma"], correct:0 },

{ id:"org-09", topic:"organelli", type:"mc",
  q:"Le creste mitocondriali sono ripiegamenti:",
  options:[
    "Della membrana esterna del mitocondrio, priva di ripiegamenti apprezzabili in condizioni normali",
    "Della membrana dei perossisomi, che ne aumentano il volume interno disponibile per la catalasi",
    "Della membrana plasmatica dell'enterocita, che aumentano l'assorbimento intestinale dei nutrienti",
    "Dell'involucro nucleare, che aumentano la superficie occupata dai complessi del poro nucleare",
    "Della membrana interna del mitocondrio, che aumentano la superficie disponibile per la fosforilazione ossidativa"], correct:4 },

{ id:"org-10", topic:"organelli", type:"mc",
  q:"Nell'apparato del Golgi, le vescicole provenienti dal reticolo endoplasmatico arrivano sulla faccia:",
  options:[
    "Trans, da cui il materiale viene poi smistato verso i lisosomi",
    "Non esiste alcuna polarità funzionale tra le cisterne del Golgi",
    "Basale, priva di qualunque connessione con il reticolo endoplasmatico",
    "Cis, da cui il materiale procede attraverso le cisterne mediali verso la faccia trans",
    "Laterale, opposta rispetto all'ingresso delle vescicole dal RE"], correct:3 },

{ id:"org-11", topic:"organelli", type:"mc",
  q:"Gli enzimi idrolitici contenuti nei lisosomi sono attivi a:",
  options:[
    "Temperature superiori a 60 °C, tipiche della febbre alta",
    "pH acido, circa 5, mantenuto da una pompa protonica di membrana",
    "pH basico, circa 9, mantenuto da una pompa protonica inversa",
    "Completa assenza di acqua nel lume della vescicola",
    "pH neutro, uguale a quello del citosol circostante"], correct:1 },

{ id:"org-12", topic:"organelli", type:"mc",
  q:"I perossisomi, che contengono l'enzima catalasi, sono coinvolti principalmente in:",
  options:[
    "La sintesi esclusiva di ormoni steroidei nel reticolo liscio",
    "La β-ossidazione degli acidi grassi a catena molto lunga e in reazioni di detossificazione",
    "La glicolisi anaerobica, con produzione netta di due molecole di ATP",
    "La sintesi di rRNA e il primo assemblaggio dei ribosomi",
    "La duplicazione del DNA nucleare durante la fase S del ciclo cellulare"], correct:1 },

{ id:"org-13", topic:"organelli", type:"mc",
  q:"Il citoscheletro delle cellule eucariotiche è costituito da tre tipi di filamenti proteici:",
  options:[
    "Solo filamenti di miosina, associati esclusivamente al muscolo",
    "Solo filamenti di cheratina, tipici delle cellule epiteliali",
    "Microfilamenti di actina, microtubuli e filamenti intermedi",
    "Fibre di collagene secrete nella matrice extracellulare",
    "Solo microtubuli, privi di actina e filamenti intermedi"], correct:2 },

{ id:"org-14", topic:"organelli", type:"mc",
  q:"Lungo i microtubuli si muovono le proteine motrici chinesina e dineina, dirette rispettivamente verso l'estremità:",
  options:[
    "'+' la chinesina e '−' la dineina, nella maggior parte dei casi",
    "Nessuna delle due si muove lungo i microfilamenti di actina",
    "'+' entrambe, indipendentemente dal carico trasportato",
    "'−' la chinesina e '+' la dineina, contrariamente a quanto avviene realmente",
    "'−' entrambe, verso l'estremità meno delle proteine tubuliniche"], correct:0 },

{ id:"org-15", topic:"organelli", type:"fill",
  q:"Il trasporto selettivo di macromolecole tra nucleo e citoplasma avviene attraverso i ________ nucleari.",
  answer:"PORI" },

{ id:"org-16", topic:"organelli", type:"fill",
  q:"La sede della trascrizione dei geni per l'rRNA e del primo assemblaggio dei ribosomi è il ________.",
  answer:"NUCLEOLO" },

{ id:"org-17", topic:"organelli", type:"fill",
  q:"Il reticolo endoplasmatico privo di ribosomi, specializzato nella sintesi lipidica, è detto reticolo endoplasmatico ________.",
  answer:"LISCIO" },

{ id:"org-18", topic:"organelli", type:"fill",
  q:"Gli organelli a singola membrana contenenti enzimi idrolitici attivi a pH acido, coinvolti nella digestione intracellulare, sono i ________.",
  answer:"LISOSOMI" },

{ id:"org-19", topic:"organelli", type:"fill",
  q:"Le strutture cilindriche del citoscheletro, di circa 25 nm di diametro, costituite da dimeri di tubulina, sono i ________.",
  answer:"MICROTUBULI" },

{ id:"org-20", topic:"organelli", type:"fill",
  q:"Il fascio di microtubuli che sostiene internamente ciglia e flagelli è detto ________.",
  answer:"ASSONEMA" },

/* ============================= SOLUZIONI E PROPRIETÀ COLLIGATIVE ============================= */

{ id:"sol-01", topic:"soluzioni", type:"mc",
  q:"Un elettrolita forte, sciolto in acqua:",
  options:[
    "Si dissocia solo parzialmente in ioni",
    "Forma sempre un precipitato insolubile",
    "Si dissocia completamente in ioni",
    "Non si dissocia affatto",
    "Conduce corrente solo allo stato fuso, mai in soluzione"], correct:2,
  explain:"NaCl, HCl e NaOH sono esempi tipici di elettroliti forti, con grado di dissociazione α = 1." },

{ id:"sol-02", topic:"soluzioni", type:"mc",
  q:"Un elettrolita debole, come l'acido acetico $CH_3COOH$, in soluzione acquosa:",
  options:[
    "È completamente insolubile in acqua, per la sua natura apolare",
    "Non conduce affatto corrente elettrica, essendo un composto molecolare puro",
    "Si dissocia solo parzialmente in ioni, stabilendo un equilibrio con la forma indissociata",
    "Si dissocia completamente in ioni, comportandosi come un elettrolita forte",
    "Ha grado di dissociazione α = 1, come gli acidi forti in soluzione diluita"], correct:2 },

{ id:"sol-03", topic:"soluzioni", type:"mc",
  q:"Una sostanza come il glucosio, che in soluzione acquosa non si dissocia in ioni, si definisce:",
  options:[
    "Elettrolita anfotero",
    "Non elettrolita",
    "Anfolita",
    "Elettrolita forte",
    "Elettrolita debole"], correct:1 },

{ id:"sol-04", topic:"soluzioni", type:"mc",
  q:"Il grado di dissociazione α di un elettrolita esprime:",
  options:[
    "La frazione di moli di soluto che si dissocia in ioni rispetto al totale disciolto",
    "La massa molare del soluto espressa in grammi per mole di sostanza",
    "La solubilità massima del soluto esprimibile in grammi per litro di solvente",
    "La conducibilità elettrica assoluta misurata nella soluzione a una data temperatura",
    "Il numero di ioni prodotti dalla dissociazione di ciascuna formula unitaria del sale"], correct:0 },

{ id:"sol-05", topic:"soluzioni", type:"fill",
  q:"Il grado di dissociazione di un elettrolita forte, completamente dissociato, vale α = ________ (in forma decimale).",
  answer:"1", answerAlt:["1,0","100%"] },

{ id:"sol-06", topic:"soluzioni", type:"mc",
  q:"L'indice di dissociazione (o dislocazione) n di un sale indica:",
  options:[
    "La solubilità massima del sale esprimibile in grammi per litro d'acqua",
    "Il numero di ioni in cui si dissocia una singola formula unitaria del sale",
    "Il grado di dissociazione percentuale, cioè la frazione di sale che si ionizza",
    "La massa molare del sale, calcolata sommando le masse atomiche dei suoi elementi",
    "Il coefficiente isotonico della soluzione, che lega grado e indice di dissociazione"], correct:1,
  explain:"Es. NaCl → n = 2 (Na⁺ e Cl⁻); CaCl₂ → n = 3 (Ca²⁺ e 2 Cl⁻)." },

{ id:"sol-07", topic:"soluzioni", type:"mc",
  q:"Il coefficiente isotonico (fattore di van't Hoff) i è legato al grado di dissociazione α e all'indice di dissociazione n dalla relazione:",
  options:[
    "$i = n - \\alpha$",
    "$i = \\alpha \\cdot n$",
    "$i = \\dfrac{n}{\\alpha}$",
    "$i = 1 - \\alpha(n-1)$",
    "$i = 1 + \\alpha(n-1)$"], correct:4 },

{ id:"sol-08", topic:"soluzioni", type:"mc",
  q:"Per un non elettrolita (α = 0), il coefficiente isotonico i vale:",
  options:[
    "n",
    "2",
    "1",
    "n − 1",
    "0"], correct:2,
  explain:"Con α = 0: $i=1+0\\cdot(n-1)=1$, quindi la concentrazione effettiva coincide con quella teorica." },

{ id:"sol-09", topic:"soluzioni", type:"mc",
  q:"Per un elettrolita forte completamente dissociato (α = 1), il coefficiente isotonico i coincide con:",
  options:[
    "Il grado di dissociazione α",
    "La molarità della soluzione",
    "Sempre 1, indipendentemente da n",
    "Zero",
    "L'indice di dissociazione n"], correct:4,
  explain:"Con α = 1: $i=1+1\\cdot(n-1)=n$." },

{ id:"sol-10", topic:"soluzioni", type:"mc",
  q:"Calcolare il coefficiente isotonico di una soluzione di CsBr (elettrolita forte, n = 2):",
  options:[
    "4",
    "1,5",
    "0,5",
    "1",
    "2"], correct:4 },

{ id:"sol-11", topic:"soluzioni", type:"mc",
  q:"Calcolare il coefficiente isotonico di $HNO_2$ (acido debole, α = 30%, n = 2):",
  options:[
    "0,7",
    "2,0",
    "1,0",
    "1,3",
    "0,3"], correct:3,
  explain:"$i=1+0{,}30\\times(2-1)=1{,}3$." },

{ id:"sol-12", topic:"soluzioni", type:"fill",
  q:"Il coefficiente isotonico dell'acido acetico $CH_3COOH$, con grado di dissociazione α = 10%, vale i = ________.",
  answer:"1,1", answerAlt:["1.1"] },

{ id:"sol-13", topic:"soluzioni", type:"mc",
  q:"La concentrazione effettiva (osmoticamente attiva) di una soluzione si ottiene moltiplicando la concentrazione molare teorica per:",
  options:[
    "L'indice di dissociazione n",
    "Il grado di dissociazione α",
    "Il coefficiente isotonico i",
    "Il volume della soluzione",
    "La costante crioscopica"], correct:2 },

{ id:"sol-14", topic:"soluzioni", type:"fill",
  q:"L'unità che contiene un numero di Avogadro di particelle osmoticamente attive (ioni o molecole indissociate) si chiama ________.",
  answer:"OSMOLE", answerAlt:["OSMOLI"] },

{ id:"sol-15", topic:"soluzioni", type:"mc",
  q:"L'osmolarità (osM) di una soluzione è definita come:",
  options:[
    "Numero di osmoli per litro di soluzione",
    "Numero di ioni per mole di soluto",
    "Numero di osmoli per kg di solvente",
    "Massa di soluto per litro di soluzione",
    "Numero di moli per litro di soluzione"], correct:0,
  explain:"Da non confondere con la molalità (mol soluto/kg solvente): l'osmolarità è riferita al litro di soluzione." },

{ id:"sol-16", topic:"soluzioni", type:"mc",
  q:"La relazione tra osmolarità (osM) e molarità (M) di una soluzione è:",
  options:[
    "$osM = M \\cdot i$",
    "$osM = M - i$",
    "$osM = M + i$",
    "$osM = i / M$",
    "$osM = M / i$"], correct:0 },

{ id:"sol-17", topic:"soluzioni", type:"mc",
  q:"Per le soluzioni non elettrolitiche (i = 1), l'osmolarità:",
  options:[
    "È sempre doppia della molarità",
    "È indipendente dalla concentrazione",
    "Coincide numericamente con la molarità",
    "Dipende dalla temperatura, non dalla molarità",
    "È sempre nulla"], correct:2 },

{ id:"sol-18", topic:"soluzioni", type:"mc",
  q:"L'osmolarità del plasma sanguigno umano è approssimativamente:",
  options:[
    "310 mosM",
    "50 mosM",
    "1000 mosM",
    "750 mosM",
    "100 mosM"], correct:0 },

{ id:"sol-19", topic:"soluzioni", type:"mc",
  q:"Una soluzione fisiologica di NaCl allo 0,9% (p/V) ha un'osmolarità di circa:",
  options:[
    "90 mosM, fortemente ipotonica al plasma",
    "616 mosM, nettamente ipertonica al plasma",
    "900 mosM, fortemente ipertonica al plasma",
    "308 mosM, sostanzialmente isotonica al plasma",
    "154 mosM, moderatamente ipotonica al plasma"], correct:3,
  explain:"$M\\approx0{,}154\\ \\text{mol/L}$; poiché NaCl è un elettrolita forte con i = 2, $osM=0{,}154\\times2=0{,}308\\ \\text{osM/L}=308$ mosM." },

{ id:"sol-20", topic:"soluzioni", type:"mc",
  q:"Rispetto a una soluzione di riferimento, una soluzione con osmolarità inferiore si definisce:",
  options:[
    "Satura",
    "Ipertonica",
    "Sovrassatura",
    "Ipotonica",
    "Isotonica"], correct:3 },

{ id:"sol-21", topic:"soluzioni", type:"mc",
  q:"Rispetto a una soluzione di riferimento, una soluzione con osmolarità superiore si definisce:",
  options:[
    "Neutra",
    "Isotonica",
    "Ipertonica",
    "Diluita",
    "Ipotonica"], correct:2 },

{ id:"sol-22", topic:"soluzioni", type:"mc",
  q:"Se un eritrocita viene immerso in una soluzione ipotonica rispetto al citoplasma, si osserva:",
  options:[
    "Plasmolisi: raggrinzimento della cellula per uscita netta di acqua verso l'esterno",
    "Emolisi: rottura della cellula per rigonfiamento, causato dall'ingresso netto di acqua",
    "Solidificazione della membrana plasmatica per la bassa temperatura della soluzione",
    "Nessuna variazione di volume, perché la soluzione è isotonica al citoplasma",
    "Un aumento dell'osmolarità intracellulare, dovuto alla fuoriuscita netta di acqua"], correct:1 },

{ id:"sol-23", topic:"soluzioni", type:"mc",
  q:"Se un eritrocita viene immerso in una soluzione ipertonica rispetto al citoplasma, si osserva:",
  options:[
    "Emolisi: rottura della cellula per rigonfiamento, dovuta all'ingresso di acqua",
    "Nessuna variazione di volume, perché la soluzione è isotonica al citoplasma",
    "Plasmolisi: raggrinzimento della cellula per uscita netta di acqua",
    "Un aumento del volume cellulare, causato dall'ingresso netto di acqua",
    "La fusione della cellula con le cellule circostanti nel tessuto"], correct:2 },

{ id:"sol-24", topic:"soluzioni", type:"fill",
  q:"La rottura del globulo rosso per rigonfiamento, causata dall'ingresso netto di acqua in seguito a trattamento con soluzioni ipotoniche, si chiama ________.",
  answer:"EMOLISI" },

{ id:"sol-25", topic:"soluzioni", type:"fill",
  q:"Il raggrinzimento del globulo rosso, causato dall'uscita netta di acqua in seguito a trattamento con soluzioni ipertoniche, si chiama ________.",
  answer:"PLASMOLISI" },

{ id:"sol-26", topic:"soluzioni", type:"mc",
  q:"La legge di Raoult afferma che, in una soluzione, la tensione di vapore del solvente:",
  options:[
    "Resta invariata rispetto al solvente puro",
    "Dipende solo dalla temperatura, non dal soluto",
    "Aumenta in proporzione alla frazione molare del soluto",
    "È indipendente dalla natura del solvente",
    "Diminuisce in proporzione alla frazione molare del soluto disciolto"], correct:4 },

{ id:"sol-27", topic:"soluzioni", type:"mc",
  q:"Le proprietà colligative di una soluzione (abbassamento crioscopico, innalzamento ebullioscopico, pressione osmotica, abbassamento della tensione di vapore) dipendono:",
  options:[
    "Dalla massa molare del solvente utilizzato per preparare la soluzione",
    "Solo dal volume totale di solvente impiegato nella soluzione",
    "Solo dalla temperatura a cui viene misurata la soluzione",
    "Esclusivamente dalla natura chimica specifica del soluto disciolto",
    "Dal numero di particelle di soluto disciolte, non dalla loro natura chimica"], correct:4 },

{ id:"sol-28", topic:"soluzioni", type:"mc",
  q:"L'abbassamento crioscopico di una soluzione è dato dalla relazione:",
  options:[
    "$\\Delta T_{cr} = K_{cr} + m + i$",
    "$\\Delta T_{cr} = K_{cr} / (m \\cdot i)$",
    "$\\Delta T_{cr} = K_{cr} \\cdot m^2$",
    "$\\Delta T_{cr} = K_{cr} \\cdot m \\cdot i$",
    "$\\Delta T_{cr} = K_{cr} \\cdot M \\cdot i$ (con M molarità)"], correct:3,
  explain:"La costante crioscopica va moltiplicata per la molalità m (non la molarità) e per il coefficiente isotonico i." },

{ id:"sol-29", topic:"soluzioni", type:"mc",
  q:"L'innalzamento ebullioscopico di una soluzione è dato dalla relazione:",
  options:[
    "$\\Delta T_{eb} = K_{eb} - m \\cdot i$",
    "$\\Delta T_{eb} = K_{eb} / m$",
    "$\\Delta T_{eb} = K_{eb} \\cdot M$",
    "$\\Delta T_{eb} = K_{eb} \\cdot i / m$",
    "$\\Delta T_{eb} = K_{eb} \\cdot m \\cdot i$"], correct:4 },

{ id:"sol-30", topic:"soluzioni", type:"mc",
  q:"Calcolare l'innalzamento ebullioscopico di una soluzione ottenuta sciogliendo 3,20 g di metanolo (non elettrolita, $PM=32{,}0\\ \\text{g/mol}$) in 100 g di acqua ($K_{eb}=0{,}56\\ °\\text{C}\\cdot\\text{m}^{-1}$):",
  options:[
    "1,12 °C",
    "5,6 °C",
    "0,056 °C",
    "0,28 °C",
    "0,56 °C"], correct:4,
  explain:"$n=3{,}20/32{,}0=0{,}10\\ \\text{mol}$; $m=0{,}10\\ \\text{mol}/0{,}100\\ \\text{kg}=1{,}0\\ m$; $\\Delta T_{eb}=0{,}56\\times1{,}0\\times1=0{,}56\\ °\\text{C}$." },

{ id:"sol-31", topic:"soluzioni", type:"mc",
  q:"Secondo la legge di Fick, la diffusione di un soluto attraverso una membrana è direttamente proporzionale a:",
  options:[
    "Il quadrato della differenza di concentrazione tra i due lati della membrana semipermeabile",
    "La viscosità del solvente, indipendentemente dal gradiente di concentrazione presente",
    "Solo alla temperatura assoluta della soluzione, indipendentemente dalla concentrazione",
    "La differenza di concentrazione tra i due lati della membrana, e inversamente proporzionale allo spessore",
    "Solo alla superficie della membrana, indipendentemente dalla differenza di concentrazione"], correct:3 },

{ id:"sol-32", topic:"soluzioni", type:"mc",
  q:"Secondo la legge di Graham, la velocità di diffusione di un gas è:",
  options:[
    "Indipendente dalla massa molecolare del gas considerato",
    "Proporzionale al quadrato della massa molecolare del gas",
    "Inversamente proporzionale alla radice quadrata della sua massa molecolare",
    "Direttamente proporzionale alla sua massa molecolare, non inversamente",
    "Inversamente proporzionale alla temperatura assoluta del sistema"], correct:2,
  explain:"$v_1/v_2=\\sqrt{PM_2/PM_1}$: a parità di condizioni, i gas più leggeri diffondono più velocemente." },

{ id:"sol-33", topic:"soluzioni", type:"mc",
  q:"L'osmosi è definita come:",
  options:[
    "Il passaggio netto di soluto attraverso una membrana semipermeabile, dal comparto più concentrato verso quello meno concentrato",
    "Il passaggio di ioni attraverso canali proteici specifici, regolato da gradienti elettrochimici",
    "Il passaggio netto di solvente attraverso una membrana semipermeabile, dal comparto meno concentrato verso quello più concentrato di soluto",
    "Un tipo particolare di diffusione che riguarda esclusivamente le molecole allo stato gassoso",
    "La formazione di un precipitato insolubile quando la soluzione supera il punto di saturazione"], correct:2 },

{ id:"sol-34", topic:"soluzioni", type:"fill",
  q:"Una membrana che lascia passare il solvente ma non (o solo in parte) il soluto si dice membrana ________.",
  answer:"SEMIPERMEABILE" },

{ id:"sol-35", topic:"soluzioni", type:"mc",
  q:"La pressione osmotica π di una soluzione, secondo l'equazione di van't Hoff, si calcola come:",
  options:[
    "$\\pi = i \\cdot M \\cdot R / T$",
    "$\\pi = i \\cdot M \\cdot T$",
    "$\\pi = i \\cdot M \\cdot R + T$",
    "$\\pi = i \\cdot M \\cdot R \\cdot T$",
    "$\\pi = M \\cdot R \\cdot T$"], correct:3 },

{ id:"sol-36", topic:"soluzioni", type:"mc",
  q:"La pressione osmotica si definisce operativamente come:",
  options:[
    "La pressione che deve essere applicata al comparto più concentrato per impedire il passaggio netto di solvente per osmosi",
    "La pressione di vapore che il solvente puro esercita a una data temperatura, in assenza di soluto",
    "La pressione osmotica generata esclusivamente dalle proteine plasmatiche, che non attraversano l'endotelio",
    "La pressione atmosferica esercitata sulla superficie libera della soluzione in esame",
    "La pressione esterna a cui la tensione di vapore della soluzione eguaglia quella atmosferica"], correct:0 },

{ id:"sol-37", topic:"soluzioni", type:"mc",
  q:"Se si applica a una soluzione una pressione maggiore della sua pressione osmotica, si provoca:",
  options:[
    "Nessun effetto misurabile, poiché il sistema resta comunque all'equilibrio osmotico",
    "L'osmosi inversa, cioè il passaggio di solvente contro il gradiente di concentrazione",
    "Un ulteriore aumento della pressione osmotica della soluzione più concentrata",
    "La precipitazione immediata del soluto disciolto nella soluzione",
    "Un rapido aumento della tensione di vapore del solvente puro"], correct:1 },

{ id:"sol-38", topic:"soluzioni", type:"mc",
  q:"La pressione oncotica (colloido-osmotica) del plasma è la pressione osmotica dovuta:",
  options:[
    "Alle sole proteine plasmatiche (es. albumina, globuline), che non attraversano l'endotelio capillare",
    "Ai globuli rossi in sospensione, che sedimentano per gravità nel plasma centrifugato",
    "A tutti i soluti plasmatici, inclusi elettroliti e piccole molecole liberamente diffusibili",
    "Alla componente gassosa disciolta nel plasma, come ossigeno e anidride carbonica",
    "Esclusivamente al glucosio ematico, la cui concentrazione regola l'osmolarità plasmatica"], correct:0 },

{ id:"sol-39", topic:"soluzioni", type:"mc",
  q:"L'emodialisi è una pratica medica che sfrutta principalmente:",
  options:[
    "La diffusione e l'osmosi attraverso una membrana semipermeabile, per rimuovere dal sangue prodotti di scarto (es. urea, creatinina) e acqua in eccesso",
    "La centrifugazione ad alta velocità del sangue intero, per separare meccanicamente plasma e cellule",
    "Una reazione chimica di neutralizzazione acido-base condotta direttamente all'interno del circolo sanguigno",
    "L'elettrolisi dell'acqua plasmatica, con produzione di gas idrogeno e ossigeno ai due elettrodi",
    "La sola azione della forza di gravità sul sangue, senza l'impiego di alcuna membrana semipermeabile"], correct:0 },

{ id:"sol-40", topic:"soluzioni", type:"fill",
  q:"Il passaggio di particelle attraverso una membrana semipermeabile, causato da un agente esterno come una pressione applicata anziché da un gradiente di concentrazione, si chiama ________.",
  answer:"ULTRAFILTRAZIONE" },

{ id:"sol-41", topic:"soluzioni", type:"mc",
  q:"Per calcolare la massa molare (PM) di un soluto incognito a partire da una misura di pressione osmotica π, si usa la relazione:",
  options:[
    "$PM=\\dfrac{V\\cdot\\pi}{R\\cdot T}$",
    "$PM=\\dfrac{R\\cdot T}{g_{sostanza}\\cdot\\pi}$",
    "$PM=\\dfrac{g_{sostanza}\\cdot R\\cdot T}{V\\cdot\\pi}$",
    "$PM=\\dfrac{g_{sostanza}\\cdot\\pi}{R\\cdot T\\cdot V}$",
    "$PM=\\pi\\cdot V\\cdot R\\cdot T$"], correct:2 },

{ id:"sol-42", topic:"soluzioni", type:"mc",
  q:"Circa il 60% del peso corporeo umano è costituito da acqua, per il 40% nel liquido intracellulare e per il 20% nel liquido extracellulare. Quest'ultimo, a sua volta, è distribuito per circa:",
  options:[
    "Per metà nel liquido intracellulare e per metà nel plasma",
    "Il 15% nel liquido interstiziale e il 5% nel liquido plasmatico",
    "Il 5% nel liquido interstiziale e il 15% nel liquido plasmatico",
    "Interamente nel liquido interstiziale, senza alcuna quota plasmatica",
    "Interamente nel plasma, senza alcuna componente interstiziale"], correct:1 },

{ id:"sol-43", topic:"soluzioni", type:"mc",
  q:"La membrana plasmatica è fisiologicamente impermeabile al sodio, il cui gradiente di concentrazione è mantenuto attivamente da:",
  options:[
    "La sola diffusione semplice",
    "L'osmosi passiva",
    "I canali per l'acqua (acquaporine)",
    "La pompa sodio-potassio",
    "Il trasportatore del glucosio"], correct:3 },

{ id:"sol-44", topic:"soluzioni", type:"mc",
  q:"Una miscela si definisce omogenea quando:",
  options:[
    "Coesistono più fasi distinguibili a occhio nudo o al microscopio ottico",
    "Non può contenere sali o altre sostanze ioniche disciolte al suo interno",
    "Si presenta come un'unica fase, con composizione identica in ogni suo punto",
    "È sempre allo stato liquido, indipendentemente dai componenti disciolti",
    "Contiene un solo componente chimicamente puro, senza alcun soluto"], correct:2 },

{ id:"sol-45", topic:"soluzioni", type:"mc",
  q:"In una miscela, la componente più abbondante è detta fase disperdente, mentre la componente in minore quantità è detta:",
  options:[
    "Fase colloidale",
    "Fase dispersa",
    "Fase continua",
    "Fase disperdente",
    "Fase satura"], correct:1 },

{ id:"sol-46", topic:"soluzioni", type:"mc",
  q:"In base alle dimensioni delle particelle della fase dispersa, una sospensione (es. il sangue) è caratterizzata da particelle di diametro:",
  options:[
    "Sempre nullo, come nelle vere soluzioni molecolari",
    "Compreso tra 1 nm e 1 µm, tipico dei colloidi",
    "Uguale a quello delle singole molecole di solvente",
    "Maggiore di 1 µm, separabili per gravità",
    "Minore di 1 nm, come negli ioni disciolti"], correct:3 },

{ id:"sol-47", topic:"soluzioni", type:"mc",
  q:"Un colloide, a differenza di una sospensione, è caratterizzato da particelle di diametro:",
  options:[
    "Sempre maggiore di 1 µm, come nelle sospensioni sedimentabili",
    "Uguale a quello degli ioni disciolti in una vera soluzione",
    "Sempre minore di 1 nm, come nelle soluzioni molecolari",
    "Minore di 1 µm e maggiore di 1 nm, che non sedimentano",
    "Non misurabile con le tecniche di laboratorio disponibili"], correct:3 },

{ id:"sol-48", topic:"soluzioni", type:"mc",
  q:"Un sistema colloidale costituito da particelle liquide o solide disperse in un gas si definisce:",
  options:[
    "Sospensione",
    "Emulsione",
    "Soluzione vera",
    "Aerosol",
    "Schiuma"], correct:3 },

{ id:"sol-49", topic:"soluzioni", type:"mc",
  q:"In una soluzione vera (sistema omogeneo), il diametro delle particelle della fase dispersa è:",
  options:[
    "Variabile e non definibile",
    "Uguale a quello di un colloide",
    "Inferiore a 1 nm",
    "Sempre superiore a 1 µm",
    "Compreso tra 1 e 100 µm"], correct:2 },

{ id:"sol-50", topic:"soluzioni", type:"mc",
  q:"In una soluzione liquida, il solvente è definito come:",
  options:[
    "Sempre e solo l'acqua",
    "Il componente in eccesso (fase disperdente)",
    "La sostanza allo stato solido",
    "Il componente che non può mai dissociarsi",
    "Il componente in minore quantità"], correct:1 },

{ id:"sol-51", topic:"soluzioni", type:"mc",
  q:"In una soluzione possono essere presenti più soluti, ma:",
  options:[
    "Un solo tipo di legame chimico",
    "Sempre esattamente due soluti",
    "Un unico solvente",
    "Sempre un solvente organico",
    "Nessun elettrolita"], correct:2 },

{ id:"sol-52", topic:"soluzioni", type:"mc",
  q:"L'elevato potere solvente dell'acqua nei confronti di sostanze ioniche e polari è dovuto principalmente a:",
  options:[
    "L'assenza pressoché totale di legami a idrogeno tra le sue molecole",
    "La sua elevata costante dielettrica e alla capacità di idratare le particelle di soluto",
    "La sua bassa capacità termica, che ne favorisce il rapido riscaldamento",
    "La sua elevata viscosità, che rallenta il movimento delle particelle disciolte",
    "La sua bassa polarità, che riduce le interazioni con le particelle ioniche"], correct:1 },

{ id:"sol-53", topic:"soluzioni", type:"mc",
  q:"La solubilità di un soluto è definita come:",
  options:[
    "La densità di una soluzione, cioè il rapporto tra la sua massa e il suo volume totale",
    "Il numero totale di legami covalenti presenti nella struttura molecolare del soluto",
    "La velocità con cui un soluto si scioglie completamente in un dato volume di solvente",
    "Il volume totale occupato da una soluzione preparata a una determinata temperatura",
    "La quantità massima di soluto che può essere disciolta in una data quantità di solvente, a una data temperatura"], correct:4 },

{ id:"sol-54", topic:"soluzioni", type:"mc",
  q:"Una soluzione satura è una soluzione che:",
  options:[
    "Non può più essere diluita ulteriormente senza formare un precipitato",
    "È sempre mantenuta a una temperatura di esattamente 25 gradi Celsius",
    "Contiene disciolta la massima quantità di soluto possibile a quella temperatura",
    "Non contiene alcun soluto disciolto, essendo costituita dal solo solvente",
    "Contiene soltanto soluti allo stato gassoso disciolti nel solvente"], correct:2 },

{ id:"sol-55", topic:"soluzioni", type:"mc",
  q:"La solubilità di un soluto in un dato solvente dipende da:",
  options:[
    "Solo dal volume del recipiente utilizzato per contenere la soluzione",
    "Solo dal colore che la soluzione assume una volta preparata",
    "Esclusivamente dalla massa molare del solvente impiegato nella preparazione",
    "Natura di soluto e solvente, temperatura e, per i soluti gassosi, pressione",
    "Esclusivamente dal pH della soluzione finale ottenuta"], correct:3 },

{ id:"sol-56", topic:"soluzioni", type:"mc",
  q:"La solubilità di solidi e liquidi in un solvente, in genere:",
  options:[
    "Aumenta con la temperatura, essendo un processo endotermico",
    "Diminuisce sempre con la temperatura, essendo un processo esotermico",
    "Aumenta solo se il soluto è un elettrolita forte completamente dissociato",
    "Dipende solo dalla pressione esterna applicata al sistema",
    "È del tutto indipendente dalla temperatura della soluzione"], correct:0,
  explain:"Esistono eccezioni, come il solfato di litio (Li₂SO₄), la cui solubilità decresce con la temperatura perché il processo di dissoluzione è esotermico." },

{ id:"sol-57", topic:"soluzioni", type:"mc",
  q:"A differenza di solidi e liquidi, la solubilità dei gas in un liquido, all'aumentare della temperatura:",
  options:[
    "In genere aumenta",
    "Dipende solo dalla pressione osmotica",
    "Diventa infinita",
    "In genere decresce",
    "Resta sempre costante"], correct:3,
  explain:"Questo effetto ha conseguenze importanti per gli organismi acquatici: acque più calde contengono meno ossigeno disciolto." },

{ id:"sol-58", topic:"soluzioni", type:"mc",
  q:"La legge di Henry afferma che, a temperatura costante:",
  options:[
    "La legge si applica esclusivamente a soluzioni di liquidi puri privi di qualsiasi soluto disciolto",
    "La quantità di un gas che si scioglie in un liquido è direttamente proporzionale alla pressione parziale del gas",
    "La solubilità di un gas in un liquido è completamente indipendente dalla pressione applicata",
    "La solubilità di un gas in un liquido diminuisce progressivamente all'aumentare della pressione",
    "Solo i gas nobili, per la loro inerzia chimica, obbediscono a questa legge di proporzionalità"], correct:1 },

{ id:"sol-59", topic:"soluzioni", type:"mc",
  q:"La legge di Henry spiega perché un sommozzatore che risale troppo rapidamente in superficie può incorrere:",
  options:[
    "In un'acidosi metabolica improvvisa, dovuta all'accumulo di acido lattico",
    "In una crisi ipoglicemica acuta, per il rapido consumo di glucosio ematico",
    "Nell'embolia gassosa, per formazione di bolle di azoto nel sangue",
    "In un aumento improvviso della pressione osmotica del plasma sanguigno",
    "In una disidratazione acuta, per eccessiva perdita di liquidi corporei"], correct:2 },

{ id:"sol-60", topic:"soluzioni", type:"mc",
  q:"La $CO_2$ ha una solubilità in acqua molto maggiore di quella prevista in base alla sola legge di Henry, perché:",
  options:[
    "È un gas insolitamente leggero rispetto all'aria atmosferica",
    "È completamente insolubile in acqua, a differenza dell'ossigeno",
    "Non obbedisce affatto alle leggi generali dei gas ideali",
    "Si lega covalentemente all'emoglobina, spiazzando l'ossigeno legato",
    "Reagisce con l'acqua formando acido carbonico ($H_2CO_3$)"], correct:4 },

{ id:"sol-61", topic:"soluzioni", type:"mc",
  q:"Secondo la legge di Dalton delle pressioni parziali, la pressione totale di una miscela di gas è:",
  options:[
    "Il prodotto matematico delle pressioni parziali di ciascun gas",
    "Uguale alla pressione parziale del solo gas più abbondante",
    "Del tutto indipendente dalla composizione chimica della miscela",
    "Sempre pari a esattamente 1 atmosfera, qualunque sia la miscela",
    "La somma delle pressioni parziali di ciascun gas componente"], correct:4 },

{ id:"sol-62", topic:"soluzioni", type:"mc",
  q:"La pressione parziale di un componente di una miscela di gas si ottiene moltiplicando la pressione totale per:",
  options:[
    "Il numero totale di moli presenti nell'intera miscela gassosa",
    "La sua massa molare, espressa in grammi per mole di gas",
    "Il suo volume assoluto, misurato indipendentemente dagli altri gas",
    "La temperatura assoluta a cui si trova la miscela gassosa",
    "La frazione molare (o la percentuale in volume, %V/V) del componente"], correct:4 },

{ id:"sol-63", topic:"soluzioni", type:"mc",
  q:"Nell'aria inspirata a livello del mare (1 atm ≈ 760 mmHg), composta per circa il 21% da ossigeno, la pressione parziale dell'ossigeno è di circa:",
  options:[
    "21 mmHg",
    "78 mmHg",
    "160 mmHg",
    "400 mmHg",
    "760 mmHg"], correct:2 },

{ id:"sol-64", topic:"soluzioni", type:"mc",
  q:"Negli scambi gassosi a livello degli alveoli polmonari, il movimento di ossigeno e anidride carbonica tra alveoli e sangue avviene:",
  options:[
    "Solo durante la fase di espirazione, quando il volume toracico diminuisce progressivamente",
    "Solo per trasporto attivo ATP-dipendente, contro il gradiente di concentrazione dei gas",
    "Secondo un gradiente di pressione parziale, dalle zone a pressione parziale più alta a quelle a pressione parziale più bassa",
    "In modo del tutto indipendente dalla pressione parziale dei gas presenti nei due comparti",
    "Esclusivamente per osmosi, cioè per il passaggio netto di solvente attraverso la membrana alveolare"], correct:2 },

{ id:"sol-65", topic:"soluzioni", type:"mc",
  q:"La frazione molare $X_A$ di un componente A in una soluzione è definita come:",
  options:[
    "Il rapporto tra le moli di A e i grammi totali di solvente presente",
    "Il rapporto tra la massa di A e la massa totale del solo solvente puro",
    "Il rapporto tra le moli di A e le moli totali di tutti i componenti della soluzione",
    "Sempre uguale a 1 per ogni componente, indipendentemente dalla composizione",
    "Il rapporto tra i grammi di A e il volume totale della soluzione"], correct:2 },

{ id:"sol-66", topic:"soluzioni", type:"mc",
  q:"La percentuale peso/peso (% p/p) di una soluzione indica:",
  options:[
    "Le moli di soluto per litro di soluzione",
    "I grammi di soluto presenti in 100 mL di soluzione",
    "I millilitri di soluto in 100 mL di soluzione",
    "I grammi di soluto presenti in 100 g di soluzione",
    "Le moli di soluto per kg di solvente"], correct:3 },

{ id:"sol-67", topic:"soluzioni", type:"mc",
  q:"La percentuale peso/volume (% p/V) di una soluzione indica:",
  options:[
    "I grammi di soluto presenti in 100 mL di soluzione",
    "Gli equivalenti di soluto per litro di soluzione",
    "I grammi di soluto presenti in 100 g di solvente",
    "Le moli di soluto per kg di solvente",
    "I millilitri di soluto in 100 g di soluzione"], correct:0 },

{ id:"sol-68", topic:"soluzioni", type:"mc",
  q:"La molalità (m) di una soluzione è definita come:",
  options:[
    "Il numero di grammi di soluto per litro di soluzione",
    "Il numero di moli di soluto per kg di solvente",
    "Il numero di moli di soluto per litro di soluzione",
    "Il numero di moli di solvente per litro di soluzione",
    "Il numero di equivalenti di soluto per litro di soluzione"], correct:1,
  explain:"A differenza della molarità, la molalità è un rapporto tra masse e per questo non è influenzata dalla temperatura." },

{ id:"sol-69", topic:"soluzioni", type:"mc",
  q:"La normalità (N) di una soluzione è definita come:",
  options:[
    "Il numero di grammi di soluto per 100 g di soluzione",
    "Il numero di osmoli per litro di soluzione",
    "Il numero di moli di soluto per kg di solvente",
    "Il numero di moli di soluto per litro di soluzione",
    "Il numero di equivalenti di soluto per litro di soluzione"], correct:4 },

{ id:"sol-70", topic:"soluzioni", type:"mc",
  q:"Il numero di equivalenti di uno ione si calcola come:",
  options:[
    "Numero di moli dello ione moltiplicato per la sua carica",
    "Numero di moli moltiplicato per la massa molare",
    "Numero di moli dello ione diviso per la sua carica",
    "Sempre uguale al numero di moli, indipendentemente dalla carica",
    "Numero di grammi dello ione diviso per la sua carica"], correct:0 },

{ id:"sol-71", topic:"soluzioni", type:"mc",
  q:"In ambito clinico, la concentrazione degli elettroliti plasmatici viene spesso espressa in milliequivalenti per litro (mEq/L); il Sistema Internazionale raccomanda invece, per uniformità, l'uso di:",
  options:[
    "Normalità",
    "Millimoli per litro (mmol/L)",
    "Grammi per decilitro esclusivamente",
    "Osmoli per kg di solvente",
    "Percentuale peso/volume"], correct:1 },

{ id:"sol-72", topic:"soluzioni", type:"mc",
  q:"La molarità (M) di una soluzione, la misura di concentrazione più utilizzata in chimica, è definita come:",
  options:[
    "Il numero di moli di soluto per litro di soluzione",
    "Il numero di equivalenti di soluto per kg di solvente",
    "Il numero di moli di soluto per kg di solvente",
    "Il numero di osmoli per kg di solvente",
    "Il numero di grammi di soluto per litro di solvente"], correct:0 },

{ id:"sol-73", topic:"soluzioni", type:"mc",
  q:"In una soluzione ideale, le interazioni tra le molecole di soluto e quelle di solvente sono:",
  options:[
    "Presenti unicamente quando il soluto disciolto è un elettrolita forte completamente dissociato in ioni",
    "Sempre nulle, poiché le molecole di soluto e di solvente non interagiscono affatto tra loro",
    "Sempre più forti delle interazioni esistenti tra le molecole nei rispettivi componenti puri",
    "Indipendenti dalla composizione della soluzione, ma variabili unicamente con la pressione",
    "Uguali alle interazioni tra le molecole dello stesso tipo nei rispettivi componenti puri, con entalpia di dissoluzione nulla"], correct:4 },

{ id:"sol-74", topic:"soluzioni", type:"mc",
  q:"Nello spazio intracellulare, i soluti non si comportano in modo ideale principalmente a causa:",
  options:[
    "Della temperatura corporea, mantenuta costantemente troppo bassa per l'omeostasi",
    "Dell'assenza pressoché totale di membrane semipermeabili nel compartimento",
    "Della pressione atmosferica esercitata sui tessuti dell'organismo",
    "Dell'alta concentrazione di macromolecole e della limitata acqua libera",
    "Dell'assenza quasi completa di elettroliti disciolti nel citoplasma"], correct:3 },

{ id:"sol-75", topic:"soluzioni", type:"mc",
  q:"Il coefficiente di attività (γ) di una soluzione, che corregge la concentrazione molale o molare per ottenere l'attività chimica (a = γm), assume valore γ = 1 quando:",
  options:[
    "La soluzione si comporta in modo ideale, e la concentrazione equivale all'attività",
    "La temperatura della soluzione è mantenuta esattamente a 0 gradi Celsius",
    "La soluzione ha raggiunto la massima concentrazione di soluto possibile",
    "Il soluto disciolto è sempre un elettrolita forte completamente dissociato",
    "Il pH della soluzione risulta esattamente neutro, pari a 7"], correct:0 },

{ id:"sol-76", topic:"soluzioni", type:"fill",
  q:"Una miscela in cui coesistono più fasi distinguibili, con composizione variabile da punto a punto, si dice miscela ________.",
  answer:"ETEROGENEA" },

{ id:"sol-77", topic:"soluzioni", type:"fill",
  q:"Le soluzioni solide formate da due o più metalli mescolati allo stato fuso, come l'acciaio o l'ottone, si chiamano ________.",
  answer:"LEGHE" },

{ id:"sol-78", topic:"soluzioni", type:"fill",
  q:"Nel rapporto peso/volume, la percentuale (% p/V) indica i grammi di soluto presenti in 100 ________ di soluzione.",
  answer:"ML", answerAlt:["MILLILITRI"] },

{ id:"sol-79", topic:"soluzioni", type:"fill",
  q:"A temperatura costante, la quantità di gas che si scioglie in un liquido è direttamente proporzionale alla pressione parziale del gas: è la legge di ________.",
  answer:"HENRY" },

{ id:"sol-80", topic:"soluzioni", type:"fill",
  q:"Secondo la legge di ________, la pressione totale di una miscela di gas è la somma delle pressioni parziali dei singoli gas componenti.",
  answer:"DALTON" },

/* ============================= LAVORO, ENERGIA E POTENZA (integrazione) ============================= */

{ id:"en-31", topic:"energia", type:"mc",
  q:"Un corpo di massa $m=50\\ \\text{kg}$ viene lasciato cadere da fermo da un'altezza $h=10\\ \\text{m}$ (attrito trascurabile). Con quale velocità tocca terra? ($g=9{,}8\\ \\text{m/s}^2$)",
  options:[
    "9,8 m/s",
    "98 m/s",
    "19,6 m/s",
    "14 m/s",
    "4,9 m/s"], correct:3,
  explain:"Per conservazione dell'energia meccanica: $\\tfrac12 mv_f^2=mgh \\Rightarrow v_f=\\sqrt{2gh}=\\sqrt{2\\times9{,}8\\times10}\\approx14\\ \\text{m/s}$ (indipendente dalla massa)." },

{ id:"en-32", topic:"energia", type:"mc",
  q:"In un sistema massa-molla orizzontale senza attrito, quando la molla è compressa di x e il blocco è ancora fermo, l'energia meccanica del sistema è:",
  options:[
    "Nulla, perché il blocco non si sta muovendo",
    "Metà cinetica e metà potenziale elastica",
    "Dipendente dalla massa del blocco, $E=\\tfrac12 mv^2$",
    "Interamente cinetica, $E_c=\\tfrac12 mv^2$",
    "Interamente potenziale elastica, $U_{el}=\\tfrac12 kx^2$"], correct:4,
  explain:"A blocco fermo $K=0$: tutta l'energia è immagazzinata come energia potenziale elastica della molla compressa; al rilascio si converte gradualmente in energia cinetica." },

{ id:"en-33", topic:"energia", type:"fill",
  q:"Nel teorema di conservazione dell'energia meccanica, un sistema si dice chiuso e isolato quando non vi sono scambi di ________ e di materia con l'esterno.",
  answer:"ENERGIA" },

{ id:"en-34", topic:"energia", type:"mc",
  q:"Se su un corpo agisce, oltre a forze conservative, anche una forza di attrito (non conservativa), l'energia meccanica del sistema:",
  options:[
    "Resta nulla per tutta la durata del moto",
    "Si conserva comunque, come in assenza di attrito",
    "Si conserva solo se il corpo è fermo o in quiete",
    "Aumenta sempre, a causa del lavoro dell'attrito",
    "Non si conserva: diminuisce a causa della dissipazione"], correct:4 },

{ id:"en-35", topic:"energia", type:"mc",
  q:"Un motore solleva verticalmente, a velocità costante, un carico di 200 N per 15 m in 10 s. Qual è la potenza sviluppata dal motore?",
  options:[
    "13,3 W",
    "30 W",
    "3000 W",
    "2000 W",
    "300 W"], correct:4,
  explain:"$P=\\dfrac{W}{t}=\\dfrac{Fd}{t}=\\dfrac{200\\times15}{10}=300\\ \\text{W}$." },

/* ============================= QUANTITÀ DI MOTO, URTI E CENTRO DI MASSA ============================= */

{ id:"qm-01", topic:"quantita_moto", type:"mc",
  q:"La quantità di moto di un corpo di massa m che si muove con velocità v è la grandezza vettoriale:",
  options:[
    "$\\vec{q}=\\tfrac12 mv^2$",
    "$\\vec{q}=m\\vec{v}$",
    "$\\vec{q}=m/v$",
    "$\\vec{q}=mg$",
    "$\\vec{q}=v/m$"], correct:1 },

{ id:"qm-02", topic:"quantita_moto", type:"mc",
  q:"L'unità di misura della quantità di moto nel Sistema Internazionale è:",
  options:[
    "m/s²",
    "N",
    "kg·m/s",
    "kg·m²/s²",
    "kg/s"], correct:2 },

{ id:"qm-03", topic:"quantita_moto", type:"mc",
  q:"Partendo dal secondo principio della dinamica, si definisce impulso di una forza costante applicata per un intervallo di tempo Δt la grandezza:",
  options:[
    "$I=\\Delta t/F$",
    "$I=F\\cdot m$",
    "$I=F/\\Delta t$",
    "$I=m\\Delta t$",
    "$I=F\\Delta t$"], correct:4 },

{ id:"qm-04", topic:"quantita_moto", type:"mc",
  q:"Il teorema dell'impulso afferma che l'impulso di una forza applicata a un corpo è uguale a:",
  options:[
    "La variazione della quantità di moto del corpo, $I=\\Delta q$",
    "La variazione di velocità del corpo, indipendentemente dalla sua massa",
    "Il lavoro compiuto dalla forza lungo lo spostamento",
    "Zero, sempre, indipendentemente dalla forza applicata",
    "La variazione di energia cinetica subita dal corpo"], correct:0 },

{ id:"qm-05", topic:"quantita_moto", type:"mc",
  q:"L'unità di misura dell'impulso nel Sistema Internazionale è:",
  options:[
    "N·s (equivalente a kg·m/s)",
    "kg·m² (unità del momento d'inerzia)",
    "W (equivalente a J/s)",
    "N/s (equivalente a kg·m/s²)",
    "J (equivalente a kg·m²/s²)"], correct:0 },

{ id:"qm-06", topic:"quantita_moto", type:"mc",
  q:"Il principio di conservazione della quantità di moto è diretta conseguenza:",
  options:[
    "Del terzo principio della dinamica (azione e reazione)",
    "Della legge di gravitazione universale di Newton",
    "Del primo principio della dinamica (principio d'inerzia)",
    "Del teorema dell'energia cinetica applicato al sistema",
    "Della legge di Hooke sulla forza elastica"], correct:0 },

{ id:"qm-07", topic:"quantita_moto", type:"mc",
  q:"In un sistema isolato, cioè soggetto a sole forze interne:",
  options:[
    "La massa totale del sistema diminuisce",
    "Le forze interne producono un'accelerazione del centro di massa",
    "La quantità di moto totale del sistema si conserva",
    "L'energia cinetica totale si conserva sempre, in ogni tipo di urto",
    "Ogni corpo del sistema si ferma"], correct:2 },

{ id:"qm-08", topic:"quantita_moto", type:"mc",
  q:"Considerando due corpi A e B che interagiscono in un sistema isolato, per il terzo principio della dinamica $F_{AB}=-F_{BA}$, da cui segue che:",
  options:[
    "Le masse di A e B devono necessariamente essere uguali tra loro",
    "Le velocità di A e B restano sempre costanti durante l'interazione",
    "L'energia cinetica di A è sempre uguale a quella di B durante l'urto",
    "La variazione della quantità di moto di A è uguale e opposta a quella di B: $\\Delta q_A+\\Delta q_B=0$",
    "A e B non possono mai interagire, essendo un sistema isolato"], correct:3 },

{ id:"qm-09", topic:"quantita_moto", type:"mc",
  q:"Un urto tra due corpi si definisce elastico quando:",
  options:[
    "Oltre alla quantità di moto, si conserva anche l'energia cinetica totale del sistema",
    "Nessuna delle due grandezze, né quantità di moto né energia, si conserva",
    "Si conserva solo l'energia cinetica, mentre la quantità di moto varia",
    "I due corpi restano uniti dopo l'urto, formando un unico corpo",
    "L'energia cinetica totale del sistema aumenta durante l'urto"], correct:0 },

{ id:"qm-10", topic:"quantita_moto", type:"mc",
  q:"Un urto tra due corpi si definisce anelastico quando:",
  options:[
    "I due corpi si respingono a distanza infinita, senza mai giungere al contatto reciproco",
    "Nessuna delle due grandezze, né la quantità di moto né l'energia cinetica, si conserva durante l'urto",
    "L'energia cinetica totale non si conserva (in parte si trasforma in altre forme di energia), mentre la quantità di moto si conserva comunque",
    "Sia la quantità di moto sia l'energia cinetica totale del sistema si conservano esattamente",
    "Si conserva solo l'energia cinetica totale, mentre la quantità di moto si trasforma in calore"], correct:2 },

{ id:"qm-11", topic:"quantita_moto", type:"mc",
  q:"In un urto completamente anelastico, in cui le due masse restano unite dopo l'urto, la conservazione della quantità di moto si scrive come:",
  options:[
    "$m_1v_{1i}=m_2v_{2i}$",
    "$m_1v_{1i}+m_2v_{2i}=(m_1+m_2)v_f$",
    "$\\tfrac12m_1v_{1i}^2=\\tfrac12(m_1+m_2)v_f^2$",
    "$m_1v_{1i}+m_2v_{2i}=m_1v_{1f}+m_2v_{2f}$ con $v_{1f}\\ne v_{2f}$",
    "$v_{1i}=v_{2i}=v_f$ sempre"], correct:1 },

{ id:"qm-12", topic:"quantita_moto", type:"fill",
  q:"In un urto elastico unidimensionale tra due particelle si conservano sia la quantità di moto sia l'energia ________.",
  answer:"CINETICA" },

{ id:"qm-13", topic:"quantita_moto", type:"fill",
  q:"Negli urti anelastici, a differenza di quelli elastici, la grandezza che NON si conserva è l'energia ________.",
  answer:"CINETICA" },

{ id:"qm-14", topic:"quantita_moto", type:"mc",
  q:"Il centro di massa (CM) di un sistema di particelle è definito dal vettore posizione:",
  options:[
    "$\\vec{r}_{CM}=\\dfrac{M}{\\sum_i m_i \\vec{r}_i}$",
    "$\\vec{r}_{CM}=\\sum_i m_i \\vec{r}_i$",
    "$\\vec{r}_{CM}=\\dfrac{\\sum_i m_i \\vec{r}_i}{M}$",
    "$\\vec{r}_{CM}=M\\cdot\\sum_i \\vec{r}_i$",
    "$\\vec{r}_{CM}=\\dfrac{\\sum_i \\vec{r}_i}{\\sum_i m_i}$"], correct:2 },

{ id:"qm-15", topic:"quantita_moto", type:"mc",
  q:"Per un sistema di due particelle di masse $m_1$ e $m_2$ poste rispettivamente in $r_1$ e $r_2$, la posizione del centro di massa è:",
  options:[
    "$r_{CM}=\\dfrac{m_1r_2+m_2r_1}{2}$",
    "$r_{CM}=m_1r_1+m_2r_2$",
    "$r_{CM}=\\dfrac{m_1+m_2}{r_1+r_2}$",
    "$r_{CM}=\\dfrac{r_1+r_2}{m_1+m_2}$",
    "$r_{CM}=\\dfrac{m_1r_1+m_2r_2}{m_1+m_2}$"], correct:4 },

{ id:"qm-16", topic:"quantita_moto", type:"mc",
  q:"Il centro di massa di un sistema di particelle:",
  options:[
    "Coincide sempre con il centro geometrico del sistema, anche se le masse sono diverse",
    "Non è definibile per sistemi di più di due corpi",
    "Dipende solo dalla distribuzione della massa, non dalle forze esterne applicate",
    "Cambia posizione se cambiano le forze interne",
    "Dipende dalle forze esterne, non dalla distribuzione di massa"], correct:2 },

{ id:"qm-17", topic:"quantita_moto", type:"mc",
  q:"Il moto del centro di massa di un sistema di particelle è descritto dalla relazione:",
  options:[
    "$\\sum_i \\vec{F}_i = M\\vec{a}_{CM}$: il CM si muove come un corpo di massa M soggetto alla risultante delle sole forze esterne",
    "Il centro di massa non accelera mai, indipendentemente dalle forze esterne applicate",
    "$\\sum_i \\vec{F}_i = 0$ sempre, indipendentemente dalle forze esterne applicate al sistema",
    "$\\sum_i \\vec{F}_i = m_i\\vec{a}_{CM}$, con $m_i$ la massa di ciascuna particella",
    "Il centro di massa si muove solo quando tutte le forze interne del sistema sono nulle"], correct:0,
  explain:"Le forze interne, nella sommatoria di tutte le forze del sistema, si elidono a vicenda per il terzo principio della dinamica: solo le forze esterne determinano l'accelerazione del CM." },

{ id:"qm-18", topic:"quantita_moto", type:"fill",
  q:"La grandezza vettoriale $\\vec{q}=m\\vec{v}$, associata al moto di un corpo, si chiama quantità di ________.",
  answer:"MOTO" },

{ id:"qm-19", topic:"quantita_moto", type:"mc",
  q:"Un carrello di massa 2 kg che si muove a 3 m/s si scontra e si unisce a un carrello fermo di massa 1 kg (urto completamente anelastico). Qual è la velocità finale del sistema?",
  options:[
    "6 m/s",
    "1,5 m/s",
    "1 m/s",
    "3 m/s",
    "2 m/s"], correct:4,
  explain:"$m_1v_{1i}=(m_1+m_2)v_f \\Rightarrow v_f=\\dfrac{2\\times3}{2+1}=2\\ \\text{m/s}$." },

{ id:"qm-20", topic:"quantita_moto", type:"mc",
  q:"Durante un urto, l'intervallo di tempo dell'interazione tra i due corpi è considerato:",
  options:[
    "Molto breve rispetto al tempo di osservazione del moto complessivo",
    "Irrilevante ai fini della conservazione della quantità di moto",
    "Sempre trascurabile per il calcolo della quantità di moto scambiata",
    "Sempre uguale a un secondo",
    "Uguale per ogni tipo di urto, elastico o anelastico"], correct:0 },

/* ============================= DINAMICA ROTAZIONALE, STATICA E LEVE ============================= */

{ id:"cr-01", topic:"corpirigidi", type:"mc",
  q:"Un corpo rigido è un oggetto ideale:",
  options:[
    "Privo di massa propria, trattato come una pura astrazione geometrica senza densità",
    "Che si deforma sempre, anche in modo minimo, sotto l'azione di qualunque forza applicata",
    "Privo di volume, assimilabile in ogni caso a un punto geometrico privo di estensione",
    "La cui forma e le cui dimensioni non cambiano, indipendentemente dalle forze applicate",
    "Il cui stato di aggregazione è necessariamente gassoso, mai solido o liquido"], correct:3 },

{ id:"cr-02", topic:"corpirigidi", type:"mc",
  q:"Nel moto traslatorio di un corpo rigido:",
  options:[
    "Tutti i punti del corpo compiono la stessa traiettoria e hanno la velocità del centro di massa",
    "I punti descrivono traiettorie circolari attorno a un asse fisso di rotazione",
    "Ogni punto ha una velocità diversa, proporzionale alla propria distanza dall'asse di rotazione",
    "La velocità angolare ω è la stessa per tutti i punti del corpo rigido",
    "Solo il centro di massa si sposta, mentre gli altri punti del corpo restano fermi"], correct:0 },

{ id:"cr-03", topic:"corpirigidi", type:"mc",
  q:"Nel moto rotatorio di un corpo rigido attorno a un asse fisso:",
  options:[
    "La velocità angolare ω di ciascun punto dipende dalla sua distanza dall'asse, mentre la velocità lineare resta costante",
    "Tutti i punti hanno la stessa velocità lineare v, indipendentemente dalla distanza dall'asse di rotazione",
    "I punti più vicini all'asse hanno una velocità lineare maggiore rispetto a quelli più lontani dall'asse",
    "Tutti i punti hanno la stessa velocità angolare ω, mentre la velocità lineare dipende dalla distanza dall'asse: $v_i=r_i\\omega$",
    "Non esiste un asse di rotazione definito, e ogni punto si muove con traiettoria indipendente"], correct:3 },

{ id:"cr-04", topic:"corpirigidi", type:"mc",
  q:"Il momento di una forza (momento torcente) rispetto a un punto O è definito dal prodotto vettoriale:",
  options:[
    "$\\vec{M}=\\vec{r}\\wedge\\vec{F}$, con modulo $|M|=rF\\sin\\varphi$",
    "$\\vec{M}=m\\vec{r}$, con modulo $|M|=mr$",
    "$\\vec{M}=\\vec{F}/\\vec{r}$, con modulo $|M|=F/r$",
    "$\\vec{M}=\\vec{r}\\cdot\\vec{F}$, definito come prodotto scalare tra i due vettori",
    "$\\vec{M}=\\vec{r}+\\vec{F}$, con modulo $|M|=r+F$"], correct:0 },

{ id:"cr-05", topic:"corpirigidi", type:"mc",
  q:"L'unità di misura del momento di una forza nel Sistema Internazionale è:",
  options:[
    "N·m",
    "J",
    "N/m",
    "N",
    "kg·m²"], correct:0,
  explain:"Dimensionalmente coincide con il joule (N·m), ma per convenzione il momento di una forza si esprime in N·m e non in joule, perché forza e braccio non sono paralleli come nel lavoro." },

{ id:"cr-06", topic:"corpirigidi", type:"mc",
  q:"A parità di forza applicata, il momento (e quindi l'effetto rotatorio) risulta maggiore quando:",
  options:[
    "La distanza r dal punto di applicazione all'asse di rotazione è minore",
    "La distanza r dal punto di applicazione all'asse di rotazione (braccio) è maggiore",
    "Il corpo su cui la forza è applicata ha una massa maggiore",
    "La forza è applicata parallelamente al braccio, anziché perpendicolarmente",
    "La forza applicata al corpo risulta nulla in ogni istante"], correct:1 },

{ id:"cr-07", topic:"corpirigidi", type:"mc",
  q:"Il momento di inerzia I di un corpo rigido rispetto a un asse è definito come:",
  options:[
    "$I=\\tfrac12\\sum_i m_i v_i^2$",
    "$I=\\sum_i m_i v_i$",
    "$I=\\sum_i m_i r_i$",
    "$I=\\sum_i m_i r_i^2$",
    "$I=Mr$"], correct:3 },

{ id:"cr-08", topic:"corpirigidi", type:"mc",
  q:"Il momento di inerzia di un corpo rigido:",
  options:[
    "Ha le stesse unità di misura della quantità di moto lineare $mv$",
    "È una grandezza vettoriale, con direzione coincidente con l'asse di rotazione",
    "Dipende dalla distribuzione della massa rispetto all'asse e dalla scelta dell'asse stesso",
    "È indipendente dalla scelta dell'asse di rotazione, dipende solo dalla massa totale",
    "Dipende solo dalla massa totale del corpo, non dalla sua distribuzione spaziale"], correct:2 },

{ id:"cr-09", topic:"corpirigidi", type:"mc",
  q:"Il momento di inerzia di una sfera omogenea di massa m e raggio r, che ruota attorno a un proprio asse, vale:",
  options:[
    "$I=mr^2$",
    "$I=2mr^2$",
    "$I=\\tfrac13 mr^2$",
    "$I=\\tfrac{2}{5}mr^2$",
    "$I=\\tfrac12 mr^2$"], correct:3 },

{ id:"cr-10", topic:"corpirigidi", type:"mc",
  q:"Il momento di inerzia di un cilindro (o disco) omogeneo di massa m e raggio r, che ruota attorno al proprio asse principale, vale:",
  options:[
    "$I=\\tfrac14 mr^2$",
    "$I=mr^2$",
    "$I=\\tfrac12 mr^2$",
    "$I=\\tfrac13 mr^2$",
    "$I=\\tfrac{2}{5}mr^2$"], correct:2 },

{ id:"cr-11", topic:"corpirigidi", type:"mc",
  q:"Il momento angolare $\\vec{L}$ di un corpo rigido rispetto all'asse di rotazione è legato al momento di inerzia dalla relazione:",
  options:[
    "$L=I/\\omega$",
    "$L=I\\omega$",
    "$L=I+\\omega$",
    "$L=\\omega/I$",
    "$L=I\\alpha$"], correct:1 },

{ id:"cr-12", topic:"corpirigidi", type:"mc",
  q:"In dinamica rotazionale, la relazione tra il momento delle forze applicate e il momento angolare, analoga al secondo principio della dinamica traslazionale, è:",
  options:[
    "$M=I\\omega$ (analoga a $q=mv$)",
    "$M=\\dfrac{d\\omega}{I}$ (analoga a $a=\\dfrac{F}{m}$)",
    "$M=L\\cdot t$ (analoga a $q=F\\cdot t$)",
    "$M=\\dfrac{dv}{dt}$ (analoga a $F=ma$ traslazionale)",
    "$M=\\dfrac{dL}{dt}=I\\alpha$ (analoga a $F=ma$)"], correct:4 },

{ id:"cr-13", topic:"corpirigidi", type:"mc",
  q:"Se il momento totale delle forze esterne applicate a un corpo rigido è nullo ($M_{TOT}=0$):",
  options:[
    "L'energia cinetica rotazionale aumenta indefinitamente",
    "Il momento di inerzia diventa nullo",
    "Il corpo si ferma istantaneamente",
    "Il momento angolare L si conserva",
    "La velocità angolare aumenta indefinitamente"], correct:3 },

{ id:"cr-14", topic:"corpirigidi", type:"mc",
  q:"Un disco ruota con momento di inerzia $I=6\\times10^4\\ \\text{kg}\\cdot\\text{m}^2$ e velocità angolare $\\omega=0{,}2\\ \\text{rad/s}$. Se, a momento angolare costante, il momento di inerzia aumenta del 10%, la nuova velocità angolare vale circa:",
  options:[
    "0,10 rad/s",
    "0,22 rad/s",
    "0,20 rad/s",
    "0,182 rad/s",
    "0,242 rad/s"], correct:3,
  explain:"Per conservazione del momento angolare: $I\\omega=I'\\omega' \\Rightarrow \\omega'=\\dfrac{I}{I'}\\omega=\\dfrac{1}{1{,}1}\\times0{,}2\\approx0{,}182\\ \\text{rad/s}$." },

{ id:"cr-15", topic:"corpirigidi", type:"mc",
  q:"Le condizioni di equilibrio (statica) di un corpo rigido richiedono che siano contemporaneamente nulle:",
  options:[
    "Solo la somma vettoriale dei momenti delle forze, non quella delle forze stesse",
    "La somma vettoriale di tutte le forze applicate e la somma vettoriale dei loro momenti",
    "Solo l'accelerazione angolare, anche se le forze applicate non sono nulle",
    "Solo la somma vettoriale delle forze, non quella dei loro momenti",
    "Solo il momento di inerzia rispetto all'asse di rotazione considerato"], correct:1 },

{ id:"cr-16", topic:"corpirigidi", type:"mc",
  q:"Una leva è schematizzabile come:",
  options:[
    "Una molla ideale priva di massa, la cui deformazione è direttamente proporzionale alla forza applicata, secondo la legge di Hooke",
    "Un'asta rigida vincolata in un punto (fulcro), soggetta a una forza motrice (potenza) e a una forza resistente (resistenza), che ruota attorno al fulcro",
    "Un sistema privo di punti fissi, i cui elementi si muovono liberamente nello spazio, senza alcun vincolo che ne limiti il moto",
    "Un fluido in equilibrio idrostatico, la cui pressione interna dipende unicamente dalla profondità e dalla densità del fluido",
    "Un corpo in caduta libera, soggetto esclusivamente all'accelerazione di gravità g, senza alcun vincolo meccanico esterno"], correct:1 },

{ id:"cr-17", topic:"corpirigidi", type:"mc",
  q:"Il guadagno meccanico G di una leva, in condizione di equilibrio ($F_M b_M = F_R b_R$), è definito come:",
  options:[
    "$G=F_M\\cdot F_R=b_M\\cdot b_R$",
    "G è sempre uguale a 1, in ogni tipo di leva",
    "$G=\\dfrac{F_R}{F_M}=\\dfrac{b_M}{b_R}$",
    "$G=\\dfrac{F_M}{b_M}=\\dfrac{b_R}{F_R}$",
    "$G=b_M+b_R$, somma dei due bracci"], correct:2 },

{ id:"cr-18", topic:"corpirigidi", type:"mc",
  q:"Una leva si dice vantaggiosa quando il guadagno meccanico G è:",
  options:[
    "Maggiore di 1 (la forza motrice necessaria è minore della resistenza)",
    "Minore di 1, quando la forza motrice necessaria supera la resistenza",
    "Uguale a 0, condizione che non si verifica mai in una leva reale",
    "Uguale a 1 (leva indifferente, forza motrice e resistenza si equivalgono)",
    "Sempre negativo, poiché bracci e forze hanno verso opposto"], correct:0 },

{ id:"cr-19", topic:"corpirigidi", type:"mc",
  q:"Nelle leve di primo genere, il fulcro si trova:",
  options:[
    "Mai tra le due forze, ma sempre a un'estremità della leva",
    "In posizione intermedia tra la forza motrice e quella resistente",
    "Tra le due forze solo se il guadagno meccanico è minore di 1",
    "Sempre a un'estremità della leva, mai in posizione intermedia",
    "Sempre a coincidere con il punto di applicazione della forza resistente"], correct:1 },

{ id:"cr-20", topic:"corpirigidi", type:"mc",
  q:"Le articolazioni del corpo umano, considerate come leve, hanno tipicamente il ruolo di:",
  options:[
    "Forza resistente, opposta alla forza motrice esercitata dai muscoli che agiscono attorno ad essa",
    "Fulcro, mentre i muscoli forniscono la forza motrice (potenza) e le ossa, per il loro peso, la forza resistente",
    "Forza motrice, ruolo che in realtà è svolto dai muscoli che agiscono sulle ossa circostanti",
    "Asse di simmetria del corpo umano, privo di qualunque funzione meccanica nella leva articolare",
    "Contrappeso, elemento che bilancia passivamente il peso della resistenza senza fornire forza motrice"], correct:1 },

{ id:"cr-21", topic:"corpirigidi", type:"mc",
  q:"L'articolazione della testa sull'atlante (leva di 1° genere) è, dal punto di vista meccanico, tipicamente:",
  options:[
    "Priva di fulcro, e quindi non descrivibile come una leva vera e propria",
    "Indifferente, con guadagno meccanico G esattamente uguale a 1",
    "Svantaggiosa: richiede una forza muscolare maggiore del peso della testa",
    "Non descrivibile come leva, poiché manca una forza resistente definita",
    "Vantaggiosa: richiede una forza muscolare minore del peso della testa"], correct:2 },

{ id:"cr-22", topic:"corpirigidi", type:"mc",
  q:"In un materiale sottoposto a una forza esterna, lo sforzo (stress) σ è definito come:",
  options:[
    "$\\sigma=F/L$: forza interna per unità di lunghezza",
    "$\\sigma=F\\cdot A$: prodotto tra forza e superficie",
    "$\\sigma=F/A$: forza interna per unità di superficie",
    "$\\sigma=\\Delta L/L$: allungamento relativo del materiale",
    "$\\sigma=E/F$: rapporto tra modulo di Young e forza"], correct:2 },

{ id:"cr-23", topic:"corpirigidi", type:"mc",
  q:"La deformazione (strain) $\\varepsilon=\\Delta L/L$ di un materiale è una grandezza:",
  options:[
    "Espressa in newton",
    "Espressa in metri",
    "Espressa in pascal",
    "Adimensionale",
    "Vettoriale"], correct:3 },

{ id:"cr-24", topic:"corpirigidi", type:"mc",
  q:"La legge di Hooke generalizzata, valida per un materiale elastico, si esprime come:",
  options:[
    "$\\sigma=\\varepsilon/E$, con E modulo di Young",
    "$\\sigma=E\\varepsilon$, con E modulo di Young",
    "$\\varepsilon=E\\sigma^2$, relazione quadratica",
    "$E=\\sigma+\\varepsilon$, somma di sforzo e deformazione",
    "$\\sigma=k\\varepsilon^2$, con k costante elastica"], correct:1 },

{ id:"cr-25", topic:"corpirigidi", type:"mc",
  q:"Una deformazione si dice elastica quando:",
  options:[
    "Avviene solo nei liquidi e nei gas, mai nei materiali solidi e rigidi come i metalli",
    "È indipendente dal limite elastico del materiale, che in questo caso non ha alcuna influenza",
    "Il corpo ritorna alla forma originale dopo la rimozione della forza applicata (deformazione reversibile)",
    "Il corpo resta permanentemente deformato, anche molto tempo dopo la rimozione della forza",
    "Il materiale si rompe immediatamente, non appena viene applicata una qualsiasi forza esterna"], correct:2 },

{ id:"cr-26", topic:"corpirigidi", type:"fill",
  q:"Il limite oltre il quale un corpo deformato non recupera più la propria forma originale si chiama limite ________.",
  answer:"ELASTICO" },

{ id:"cr-27", topic:"corpirigidi", type:"fill",
  q:"La costante di proporzionalità E che compare nella legge di Hooke generalizzata $\\sigma=E\\varepsilon$ si chiama modulo di ________.",
  answer:"YOUNG" },

{ id:"cr-28", topic:"corpirigidi", type:"fill",
  q:"Nell'analogia tra moto traslatorio e rotazionale, alla massa m corrisponde, in dinamica rotazionale, il ________ di inerzia I.",
  answer:"MOMENTO" },

{ id:"cr-29", topic:"corpirigidi", type:"fill",
  q:"Nella leva di secondo genere (es. schiaccianoci), la resistenza R è intermedia tra il ________ e la forza motrice.",
  answer:"FULCRO" }

];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTIONS, TOPICS, AREAS, SYLLABUS };
}
