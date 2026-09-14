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
  options:["Sublimazione","Brinamento","Evaporazione","Fusione","Ebollizione"], correct:0,
  explain:"La sublimazione è il passaggio diretto solido→vapore; il brinamento è il passaggio opposto vapore→solido." },

{ id:"agg-02", topic:"aggregazione", type:"mc",
  q:"In quale dei seguenti composti si osserva tipicamente il passaggio di fase della sublimazione?",
  options:["$CO_2$ solida (ghiaccio secco)","CO solido","Ghiaccio ($H_2O$ solida)","$Br_2$","NO solido"], correct:0,
  explain:"La $CO_2$ solida (ghiaccio secco) è l'esempio classico citato nelle slide, insieme a iodio e naftalina." },

{ id:"agg-03", topic:"aggregazione", type:"mc",
  q:"Indicare la differenza tra evaporazione ed ebollizione:",
  options:[
    "L'evaporazione interessa solo gli strati superficiali del liquido, mentre l'ebollizione l'intero volume",
    "L'ebollizione interessa solo gli strati superficiali del liquido, mentre l'evaporazione l'intero volume",
    "Evaporazione ed ebollizione interessano entrambe solo gli strati superficiali del liquido",
    "Evaporazione ed ebollizione interessano entrambe l'intero volume di liquido",
    "Nessuna delle precedenti risposte è corretta"], correct:0 },

{ id:"agg-04", topic:"aggregazione", type:"mc",
  q:"I solidi cristallini presentano:",
  options:[
    "Atomi con una disposizione disordinata",
    "Atomi con una disposizione periodica",
    "Atomi immobili a temperatura ambiente nelle loro posizioni reticolari",
    "Isotropia",
    "Nessuna delle altre risposte è corretta"], correct:1,
  explain:"I solidi cristallini hanno una disposizione periodica a lungo raggio (reticolo cristallino) e sono anisotropi, non isotropi." },

{ id:"agg-05", topic:"aggregazione", type:"mc",
  q:"Durante il processo di fusione di una data sostanza allo stato solido, quale delle seguenti grandezze NON cambia?",
  options:["L'energia interna","La velocità media delle particelle","La temperatura","Il volume","La densità"], correct:2,
  explain:"Durante un passaggio di stato la temperatura resta costante: il calore fornito serve a vincere le forze di coesione, non a scaldare la sostanza." },

{ id:"agg-07", topic:"aggregazione", type:"mc",
  q:"Da cosa dipende lo stato fisico della materia a una data temperatura?",
  options:[
    "Solo dall'energia cinetica delle particelle",
    "Solo dalle forze di attrazione tra le particelle",
    "Dal bilancio tra l'energia cinetica delle particelle e le forze di attrazione tra esse",
    "Dalla massa molare della sostanza",
    "Esclusivamente dalla pressione atmosferica"], correct:2 },

{ id:"agg-08", topic:"aggregazione", type:"mc",
  q:"Negli stati solido e liquido, le forze di coesione tra le molecole sono:",
  options:["Inferiori all'energia cinetica delle molecole","Superiori all'energia cinetica delle molecole","Uguali all'energia cinetica delle molecole","Nulle","Non influenzano lo stato fisico"], correct:1,
  explain:"Per questo motivo solidi e liquidi hanno bassa comprimibilità, a differenza dei gas." },

{ id:"agg-09", topic:"aggregazione", type:"mc",
  q:"Quale proprietà NON è influenzata dalle forze di coesione (forze intermolecolari)?",
  options:["Il punto di ebollizione","Il punto di liquefazione","La solubilità di gas, liquidi e solidi nei solventi","La struttura di acidi nucleici e proteine","La massa atomica degli elementi"], correct:4 },

{ id:"agg-10", topic:"aggregazione", type:"mc",
  q:"Come si chiama il passaggio di stato da liquido a solido?",
  options:["Fusione","Sublimazione","Solidificazione (o cristallizzazione)","Condensazione","Brinamento"], correct:2,
  explain:"È il processo opposto alla fusione; la temperatura di congelamento coincide con quella di fusione." },

{ id:"agg-12", topic:"aggregazione", type:"mc",
  q:"Il termine \"liquefazione\" (gas→liquido) si usa per le sostanze che a temperatura ambiente sono:",
  options:["Liquide","Solide","Gassose","Plasma","Sia solide che liquide"], correct:2 },

{ id:"agg-13", topic:"aggregazione", type:"mc",
  q:"Un solido amorfo si distingue da uno cristallino perché:",
  options:[
    "Ha una temperatura di fusione netta",
    "Presenta un reticolo cristallino ordinato",
    "Fonde in un intervallo di temperatura e non ha periodicità a lungo raggio",
    "È sempre anisotropo",
    "È costituito solo da ioni"], correct:2 },

{ id:"agg-14", topic:"aggregazione", type:"mc",
  q:"I solidi covalenti, come il diamante, sono caratterizzati da:",
  options:[
    "Punti di fusione molto bassi",
    "Legami intermolecolari deboli tipo forze di London",
    "Un reticolo tenuto insieme da legami covalenti, con punti di fusione altissimi",
    "Una nuvola di elettroni delocalizzati come nei metalli",
    "Assenza di periodicità nel reticolo"], correct:2,
  explain:"Il cristallo covalente può essere visto come un'unica grande molecola (\"solido covalente a rete\")." },

{ id:"agg-15", topic:"aggregazione", type:"mc",
  q:"Nei solidi metallici il legame è dovuto a:",
  options:[
    "Legami ionici tra cationi e anioni",
    "Legami covalenti direzionali",
    "Cationi metallici circondati da una nuvola delocalizzata di elettroni di valenza",
    "Forze di London esclusivamente",
    "Legami a idrogeno"], correct:2 },

{ id:"agg-16", topic:"aggregazione", type:"mc",
  q:"I solidi molecolari sono tenuti insieme da:",
  options:[
    "Legami ionici",
    "Legami covalenti a rete",
    "Forze intermolecolari come forze di London, interazioni dipolo-dipolo e legami a idrogeno",
    "Legame metallico",
    "Nessuna forza: sono libere di muoversi"], correct:2,
  explain:"Essendo forze più deboli dei legami ionici, i solidi molecolari hanno generalmente punti di fusione più bassi dei cristalli ionici." },

{ id:"agg-19", topic:"aggregazione", type:"mc",
  q:"I solidi ionici sono formati da:",
  options:[
    "Molecole neutre tenute insieme da forze di London",
    "Ioni positivi e negativi disposti in un reticolo cristallino tenuto insieme da legami ionici",
    "Atomi metallici immersi in una nuvola elettronica",
    "Atomi legati covalentemente in una rete tridimensionale",
    "Particelle prive di carica elettrica"], correct:1 },

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
    "Il volume di un gas è direttamente proporzionale alla pressione applicata",
    "Il volume di un gas è inversamente proporzionale alla pressione applicata",
    "Un aumento di pressione provoca un aumento di volume",
    "Volume e pressione non sono grandezze correlate",
    "Se il volume del gas viene dimezzato la pressione quadruplica"], correct:1 },

{ id:"gas-02", topic:"gas", type:"mc",
  q:"Se un gas viene riscaldato a volume costante, in base alla legge di Gay-Lussac la sua pressione:",
  options:["Aumenta","Diminuisce","Rimane costante","Prima aumenta e poi diminuisce","Prima diminuisce e poi aumenta"], correct:0 },

{ id:"gas-03", topic:"gas", type:"mc",
  q:"Da quale funzione matematica è rappresentata graficamente la legge di Boyle (P in funzione di V)?",
  options:["Da un ramo d'iperbole","Da una parabola","Da una porzione di circonferenza","Da una retta parallela all'asse delle X","Da una retta parallela all'asse delle Y"], correct:0 },

{ id:"gas-04", topic:"gas", type:"mc",
  q:"Un campione di gas è tenuto in un recipiente flessibile a pressione costante. Se la temperatura assoluta raddoppia:",
  options:["Il volume resta costante","Il volume dimezza","Il volume raddoppia","Il volume triplica","Il volume si riduce a un terzo"], correct:2,
  explain:"Legge di Charles: a $P$ costante, $V$ è direttamente proporzionale a $T$." },

{ id:"gas-05", topic:"gas", type:"mc",
  q:"Quale delle seguenti affermazioni descrive correttamente la legge di Charles?",
  options:[
    "Il volume di un gas è direttamente proporzionale alla sua temperatura, a pressione costante",
    "Il volume di un gas è direttamente proporzionale alla sua pressione, a temperatura costante",
    "La temperatura di un gas è direttamente proporzionale alla sua pressione, a volume costante",
    "La pressione di un gas è direttamente proporzionale alla sua temperatura, a volume costante",
    "Il volume di un gas è inversamente proporzionale alla sua temperatura, a pressione costante"], correct:0 },

{ id:"gas-06", topic:"gas", type:"mc",
  q:"Un campione di gas occupa un volume di 6,00 L alla pressione di 1,50 atm. Calcolare il suo volume se la pressione è portata a 3,00 atm a temperatura costante:",
  options:["5,00 L","2,50 L","10,0 L","2,00 L","3,00 L"], correct:4,
  explain:"Legge di Boyle: $P_1V_1 = P_2V_2$ → $1{,}50\\times 6{,}00 = 3{,}00\\times V_2$ → $V_2 = 3{,}00\\text{ L}$." },

{ id:"gas-07", topic:"gas", type:"mc",
  q:"Un campione di gas è tenuto a 200 K a una pressione di 2,00 atm. Viene poi riscaldato a volume costante fino a raggiungere una pressione di 6,00 atm. Quale sarà la sua temperatura finale?",
  options:["600 K","100 K","200 K","150 K","250 K"], correct:0,
  explain:"Legge di Gay-Lussac: $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$ → $\\dfrac{2{,}00}{200} = \\dfrac{6{,}00}{T_2}$ → $T_2 = 600\\text{ K}$." },

{ id:"gas-08", topic:"gas", type:"mc",
  q:"Un gas ideale subisce una trasformazione isocora dallo stato A ($P_A=1$ atm; $T_A=200$ K) allo stato B ($V_B=5$ L; $T_B=400$ K), e poi una trasformazione isoterma che lo porta allo stato C ($V_C=8$ L). Calcolare $P_C$.",
  options:["1,25 atm","2,00 atm","1,00 atm","4,00 atm","3,00 atm"], correct:0,
  explain:"$A\\to B$ (isocora, $V_A=V_B=5\\text{ L}$): $\\dfrac{P_A}{T_A}=\\dfrac{P_B}{T_B}$ → $P_B=\\dfrac{1\\times 400}{200}=2\\text{ atm}$. $B\\to C$ (isoterma): $P_BV_B=P_CV_C$ → $2\\times 5=P_C\\times 8$ → $P_C=1{,}25\\text{ atm}$." },

{ id:"gas-09", topic:"gas", type:"mc",
  q:"In un gas il prodotto della pressione per il volume (a quantità di gas costante):",
  options:["È proporzionale alla temperatura assoluta","È indipendente dalla densità","Raddoppia se la T passa da 10 a 20 °C","Resta costante all'aumentare della temperatura","È indipendente dalla quantità di gas"], correct:0,
  explain:"Dalla legge dei gas ideali $PV=nRT$, a $n$ costante $PV$ è direttamente proporzionale a $T$ (attenzione: raddoppiare la $T$ in °C da 10 a 20 non raddoppia $T$ in kelvin)." },

{ id:"gas-10", topic:"gas", type:"mc",
  q:"Due recipienti dello stesso volume contengono rispettivamente $N_2$ e $O_2$, nelle stesse condizioni di temperatura e pressione. La quantità di $N_2$ è pari a 2,8 g; calcolare la quantità di $O_2$ (gas perfetti, $M(N_2)=28$ g/mol, $M(O_2)=32$ g/mol).",
  options:["2,8 g","3,0 g","3,2 g","1,4 g","2,0 g"], correct:2,
  explain:"Per la legge di Avogadro, stesso $V$, $T$, $P$ → stesse moli: $n(N_2)=\\dfrac{2{,}8}{28}=0{,}1\\text{ mol}$ → massa $O_2 = 0{,}1\\times 32 = 3{,}2\\text{ g}$." },

{ id:"gas-11", topic:"gas", type:"mc",
  q:"Il volume di 22,414 litri è quello occupato da:",
  options:["1 mole di azoto liquido","1 kg di acqua allo stato di vapore","1 mole di qualunque gas alle condizioni standard (0°C, 1 atm)","1 mmol di qualunque gas alle condizioni standard","1 kg di azoto liquido"], correct:2 },

{ id:"gas-12", topic:"gas", type:"mc",
  q:"A 0°C e alla pressione di 1 atmosfera, due moli di gas $N_2$:",
  options:[
    "Contengono $6{,}022\\times 10^{23}$ molecole di $N_2$",
    "Occupano un volume minore di due moli di gas $H_2$",
    "Occupano un volume maggiore rispetto a quello di due moli di gas $H_2$",
    "Contengono $12{,}044\\times 10^{23}$ molecole di $N_2$",
    "Hanno una massa complessiva di 28 g"], correct:3,
  explain:"2 moli contengono $2\\times N_A = 12{,}044\\times 10^{23}$ molecole. Per la legge di Avogadro il volume, a parità di $T$, $P$ e moli, è uguale a quello di $H_2$ (non maggiore né minore). La massa di 2 moli di $N_2$ è 56 g, non 28 g." },

{ id:"gas-13", topic:"gas", type:"mc",
  q:"La legge di Avogadro afferma che volumi uguali di gas diversi, nelle stesse condizioni di temperatura e pressione, contengono:",
  options:["Un numero differente di molecole a seconda del gas","Lo stesso numero di molecole","Un numero di molecole che varia in base al tipo di gas","Un numero di molecole che dipende solo dalla pressione","Un numero di molecole che dipende solo dalla temperatura"], correct:1 },

{ id:"gas-14", topic:"gas", type:"mc",
  q:"Quale tra le seguenti assunzioni NON è alla base della teoria cinetica dei gas?",
  options:[
    "Le molecole sono assimilate a punti materiali (volume trascurabile)",
    "Il moto delle molecole avviene in un'unica direzione",
    "Le molecole non interagiscono tra loro tra una collisione e l'altra (traiettorie rettilinee)",
    "Le collisioni tra le molecole sono perfettamente elastiche",
    "Le molecole possiedono esclusivamente energia cinetica"], correct:1,
  explain:"Le molecole si muovono casualmente in tutte le direzioni con velocità diverse, non in un'unica direzione." },

{ id:"gas-15", topic:"gas", type:"mc",
  q:"Qual è la formula della legge dei gas ideali?",
  options:["$PV = nRT$","$PV = \\dfrac{nR}{T}$","$P = \\dfrac{nRT}{V^2}$","$PV^2 = nRT$","$\\dfrac{P}{V} = nRT$"], correct:0 },

{ id:"gas-16", topic:"gas", type:"mc",
  q:"Qual è il valore della costante universale dei gas $R$, espressa in $\\text{L}\\cdot\\text{atm}/(\\text{mol}\\cdot\\text{K})$?",
  options:["8,314","0,0821","22,4","273,15","$6{,}022\\times 10^{23}$"], correct:1 },

{ id:"gas-17", topic:"gas", type:"mc",
  q:"Secondo la teoria cinetica dei gas, il volume occupato dalle singole molecole di un gas:",
  options:["È uguale al volume totale del gas","È trascurabile rispetto al volume totale occupato dal gas","Aumenta con la pressione","È sempre costante indipendentemente dal gas","Coincide con il volume molare"], correct:1,
  explain:"La maggior parte del volume occupato da un gas è spazio vuoto: per questo i gas si comprimono facilmente." },

{ id:"gas-18", topic:"gas", type:"mc",
  q:"Durante le collisioni tra le molecole di un gas ideale, secondo la teoria cinetica:",
  options:[
    "L'energia cinetica totale del gas diminuisce progressivamente",
    "Le molecole si fondono tra loro",
    "Le collisioni sono perfettamente elastiche e l'energia cinetica totale del gas resta costante",
    "Le molecole si fermano",
    "Le traiettorie diventano curve anche tra una collisione e l'altra"], correct:2 },

{ id:"gas-19", topic:"gas", type:"mc",
  q:"Qual è l'origine della pressione esercitata da un gas sulle pareti del recipiente che lo contiene?",
  options:["L'attrazione gravitazionale delle molecole","Le collisioni delle molecole di gas con le pareti del recipiente","La temperatura assoluta del recipiente","Le reazioni chimiche tra le molecole","La densità del gas"], correct:1 },

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
  options:["Si raffredda","Si riscalda","Bolle","Congela","È alla temperatura critica"], correct:2 },

{ id:"liq-02", topic:"liquido", type:"mc",
  q:"Se aumentiamo la pressione esercitata su un liquido, la sua temperatura di ebollizione:",
  options:["Aumenta","Diminuisce","Non varia","Varia con il quadrato della pressione","Varia con il cubo della pressione"], correct:0 },

{ id:"liq-03", topic:"liquido", type:"mc",
  q:"Se aumentiamo la pressione esercitata su un campione di acqua liquida, la sua temperatura di congelamento:",
  options:["Aumenta","Diminuisce","Non varia","Varia con il quadrato della pressione","Varia con il cubo della pressione"], correct:1,
  explain:"L'acqua è anomala: il ghiaccio è meno denso dell'acqua liquida (curva di fusione a pendenza negativa), quindi un aumento di pressione abbassa la temperatura di congelamento." },

{ id:"liq-04", topic:"liquido", type:"mc",
  q:"Come varia la tensione di vapore di un liquido all'aumentare della temperatura?",
  options:["Diminuisce linearmente","Resta costante","Aumenta in maniera esponenziale","Diminuisce in maniera esponenziale","Non dipende dalla temperatura"], correct:2 },

{ id:"liq-05", topic:"liquido", type:"mc",
  q:"Il calore latente di evaporazione è definito come:",
  options:[
    "L'energia necessaria per aumentare di 1°C la temperatura di 1 g di liquido",
    "La quantità di energia necessaria, a temperatura costante, per far evaporare un grammo di liquido",
    "L'energia rilasciata quando un vapore condensa completamente",
    "La differenza di energia tra stato liquido e stato solido",
    "La pressione esercitata dal vapore sulla superficie del liquido"], correct:1 },

{ id:"liq-06", topic:"liquido", type:"mc",
  q:"Durante l'evaporazione, le molecole che abbandonano il liquido sono quelle con:",
  options:["Minore energia cinetica, per cui il liquido si riscalda","Maggiore energia cinetica, per cui il liquido si raffredda","Energia cinetica media, senza effetti sulla temperatura","Carica elettrica negativa","Minore massa molecolare"], correct:1,
  explain:"Allontanandosi le molecole più energetiche, l'energia media (e quindi la temperatura) del liquido rimasto diminuisce." },

{ id:"liq-07", topic:"liquido", type:"mc",
  q:"Il raffreddamento del corpo umano dovuto alla sudorazione è spiegato principalmente da:",
  options:["L'elevato calore di evaporazione dell'acqua","L'elevata tensione superficiale dell'acqua","La bassa densità del sudore","L'elevata viscosità del sudore","La capacità termica delle ghiandole sudoripare"], correct:0 },

{ id:"liq-08", topic:"liquido", type:"mc",
  q:"Qual è il valore approssimativo del calore di evaporazione dell'acqua a 40°C, citato nelle slide?",
  options:["4,184 J/g","22,4 J/g","2402 J/g","0,0821 J/g","100 J/g"], correct:2 },

{ id:"liq-09", topic:"liquido", type:"mc",
  q:"In un diagramma di fase, il punto triplo rappresenta:",
  options:["Le condizioni in cui il liquido bolle","Le condizioni di temperatura e pressione in cui coesistono le tre fasi solida, liquida e gassosa","Il punto di massima densità di una sostanza","Le condizioni oltre le quali si forma un fluido supercritico","Il punto in cui la tensione superficiale è nulla"], correct:1 },

{ id:"liq-10", topic:"liquido", type:"mc",
  q:"Il punto triplo dell'acqua si trova approssimativamente a:",
  options:["100°C e 1 atm","0°C e 1 atm","0,01°C e circa 0,006 atm","-56,6°C e circa 5,1 atm","374,13°C e 217 atm"], correct:2 },

{ id:"liq-11", topic:"liquido", type:"mc",
  q:"Oltre il punto critico di una sostanza:",
  options:["Non esiste più distinzione tra fase liquida e gassosa: si parla di fluido supercritico","La sostanza diventa sempre solida","Coesistono sempre le tre fasi","La tensione di vapore diventa nulla","La sostanza si decompone chimicamente"], correct:0 },

{ id:"liq-12", topic:"liquido", type:"mc",
  q:"Perché nel diagramma di fase dell'acqua la curva di fusione solido-liquido ha pendenza negativa?",
  options:[
    "Perché l'acqua, solidificando, aumenta di volume: un aumento di pressione favorisce quindi il passaggio da solido a liquido",
    "Perché l'acqua, solidificando, diminuisce di volume",
    "Perché l'acqua non ha un punto triplo",
    "Perché il ghiaccio è più denso dell'acqua liquida",
    "È un errore: la curva ha sempre pendenza positiva"], correct:0 },

{ id:"liq-13", topic:"liquido", type:"mc",
  q:"Nel diagramma di fase della $CO_2$, un aumento di pressione (in prossimità della curva di fusione) favorisce:",
  options:[
    "Il passaggio da liquido a solido, poiché la curva di fusione ha pendenza positiva",
    "Il passaggio da solido a liquido, come nell'acqua",
    "La sublimazione diretta",
    "La formazione di fluido supercritico indipendentemente dalla temperatura",
    "Nessun cambiamento di fase"], correct:0 },

{ id:"liq-14", topic:"liquido", type:"mc",
  q:"Il punto critico dell'acqua si trova approssimativamente a:",
  options:["0,01°C e 0,006 atm","374,13°C e 217 atm","-56,6°C e 5,1 atm","31,1°C e 73 atm","100°C e 1 atm"], correct:1 },

{ id:"liq-15", topic:"liquido", type:"mc",
  q:"La tensione superficiale di un liquido è dovuta al fatto che:",
  options:[
    "Le molecole in superficie sono attratte maggiormente verso l'interno del liquido rispetto alla fase gassosa sovrastante",
    "Le molecole in superficie non subiscono alcuna forza intermolecolare",
    "Le molecole all'interno del liquido sono più mobili di quelle in superficie",
    "Il liquido perde continuamente massa dalla superficie",
    "La pressione di vapore è nulla in superficie"], correct:0 },

{ id:"liq-16", topic:"liquido", type:"mc",
  q:"L'effetto della tensione superficiale su un liquido è quello di:",
  options:["Espandere la superficie del liquido il più possibile","Creare uno strato superficiale simile a un film elastico, che tende a contrarsi ed è difficile da penetrare","Aumentare la comprimibilità del liquido","Annullare le forze di coesione tra le molecole","Ridurre a zero il volume del liquido"], correct:1 },

{ id:"liq-17", topic:"liquido", type:"mc",
  q:"Perché i liquidi, a differenza dei gas, sono difficilmente comprimibili?",
  options:["Perché tra le molecole di un liquido c'è poco spazio vuoto","Perché le molecole di un liquido non si muovono","Perché i liquidi hanno sempre densità minore dei gas","Perché i liquidi occupano tutto lo spazio disponibile","Perché le molecole di un liquido sono cariche elettricamente"], correct:0 },

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

/* ============================= TERMODINAMICA ============================= */

{ id:"term-01", topic:"termodinamica", type:"mc",
  q:"Un sistema chiuso:",
  options:["Non può scambiare calore e materia con l'ambiente","Può scambiare calore e materia con l'ambiente","Può scambiare solo calore (energia) con l'ambiente","Può scambiare solo materia con l'ambiente","Nessuna delle precedenti"], correct:2 },

{ id:"term-02", topic:"termodinamica", type:"mc",
  q:"A 37°C, una reazione con $\\Delta H = -10\\text{ kJ/mol}$ e $\\Delta S = -0{,}05\\text{ kJ/mol}\\cdot\\text{K}$ è definita:",
  options:["Endotermica","Esoergonica","Endoergonica","Spontanea","All'equilibrio"], correct:2,
  explain:"$\\Delta G = \\Delta H - T\\Delta S = -10 - (310{,}15)(-0{,}05) \\approx -10 + 15{,}5 = +5{,}5\\text{ kJ/mol} > 0$ → reazione endoergonica (non spontanea)." },

{ id:"term-03", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione spontanea è esotermica?",
  options:["$\\Delta H > 0$","$\\Delta G > 0$","$\\Delta S < 0$","$\\Delta H < 0$","$\\Delta S > 0$"], correct:3 },

{ id:"term-04", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione spontanea è endotermica?",
  options:["$\\Delta H > 0$","$\\Delta G > 0$","$\\Delta S < 0$","$\\Delta H < 0$","$\\Delta S > 0$"], correct:0 },

{ id:"term-05", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione spontanea è entropicamente favorita?",
  options:["$\\Delta H > 0$","$\\Delta G > 0$","$\\Delta S < 0$","$\\Delta H < 0$","$\\Delta S > 0$"], correct:4 },

{ id:"term-06", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione è esoergonica?",
  options:["$\\Delta H > 0$","$\\Delta G < 0$","$\\Delta G > 0$","$\\Delta H < 0$","$\\Delta G = 0$"], correct:1 },

{ id:"term-07", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione è endoergonica?",
  options:["$\\Delta H > 0$","$\\Delta G < 0$","$\\Delta G > 0$","$\\Delta H < 0$","$\\Delta G = 0$"], correct:2 },

{ id:"term-08", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione è all'equilibrio?",
  options:["$\\Delta H > 0$","$\\Delta G < 0$","$\\Delta G > 0$","$\\Delta H < 0$","$\\Delta G = 0$"], correct:4 },

{ id:"term-09", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti coppie di relazioni caratterizza con certezza una reazione spontanea a qualunque temperatura $T > 0$?",
  options:["$\\Delta H<0;\\ \\Delta S<0$","$\\Delta H=0;\\ \\Delta S<0$","$\\Delta H>0;\\ \\Delta S>0$","$\\Delta H>0;\\ \\Delta S=0$","$\\Delta H<0;\\ \\Delta S>0$"], correct:4,
  explain:"Con $\\Delta H<0$ e $\\Delta S>0$, $\\Delta G=\\Delta H-T\\Delta S$ è sempre negativo per qualunque $T>0$: la reazione è spontanea a tutte le temperature." },

{ id:"term-10", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti coppie di valori indica una reazione spontanea a $T=300\\text{ K}$?",
  options:[
    "$\\Delta H=-30\\text{ kJ/mol};\\ \\Delta S=-0{,}1\\text{ kJ/mol}\\cdot\\text{K}$",
    "$\\Delta H=0;\\ \\Delta S=-0{,}1\\text{ kJ/mol}\\cdot\\text{K}$",
    "$\\Delta H=+30\\text{ kJ/mol};\\ \\Delta S=+0{,}1\\text{ kJ/mol}\\cdot\\text{K}$",
    "$\\Delta H=+30\\text{ kJ/mol};\\ \\Delta S=0$",
    "$\\Delta H=-30\\text{ kJ/mol};\\ \\Delta S=+0{,}1\\text{ kJ/mol}\\cdot\\text{K}$"], correct:4,
  explain:"$\\Delta G = \\Delta H - T\\Delta S = -30 - 300\\times 0{,}1 = -60\\text{ kJ/mol} < 0$ → spontanea. Le altre opzioni danno $\\Delta G \\ge 0$." },

{ id:"term-11", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti affermazioni NON descrive correttamente il I principio della termodinamica?",
  options:[
    "L'energia non può essere né creata né distrutta, ma solo trasformata",
    "La quantità totale di energia nell'universo è costante",
    "L'energia può trasformarsi da una forma all'altra senza che la somma totale cambi",
    "In un sistema isolato la somma delle energie rimane invariata nel tempo",
    "La trasformazione dell'energia da una forma all'altra determina un aumento dell'energia totale dell'universo"], correct:4 },

{ id:"term-12", topic:"termodinamica", type:"mc",
  q:"Un sistema si definisce aperto se scambia con l'esterno:",
  options:["Materia ma non energia","Energia ma non materia","Sia materia che energia","Solo calore e lavoro","Solo calore ma non lavoro"], correct:2 },

{ id:"term-13", topic:"termodinamica", type:"mc",
  q:"Un sistema si definisce chiuso se scambia con l'esterno:",
  options:["Materia ma non energia","Energia ma non materia","Sia materia che energia","Solo calore e lavoro","Solo calore ma non lavoro"], correct:1 },

{ id:"term-14", topic:"termodinamica", type:"mc",
  q:"Una \"funzione di stato\":",
  options:[
    "Dipende solo dallo stato iniziale e finale, indipendentemente dal cammino seguito",
    "Varia a seconda del percorso seguito dal sistema",
    "Si conserva in qualunque trasformazione termodinamica",
    "Dipende direttamente dal tempo di evoluzione del sistema",
    "Descrive solo i sistemi isolati e non quelli aperti o chiusi"], correct:0 },

{ id:"term-15", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti affermazioni è coerente con il secondo principio della termodinamica?",
  options:[
    "L'energia non può essere né creata né distrutta, ma solo trasformata",
    "L'entropia dell'universo è zero allo zero assoluto",
    "La somma delle energie dell'universo è costante",
    "La somma delle energie dell'universo è zero",
    "Le reazioni entropicamente favorite hanno una $\\Delta S > 0$"], correct:4,
  explain:"Il II principio riguarda l'aumento di entropia nei processi spontanei: una reazione entropicamente favorita ha, per definizione, $\\Delta S>0$. Le opzioni A e C descrivono invece il I principio." },

{ id:"term-16", topic:"termodinamica", type:"mc",
  q:"Indicare la risposta NON corretta:",
  options:[
    "L'entropia è il rapporto tra il calore scambiato $Q$ e la temperatura $T$ ($\\Delta S = Q/T$)",
    "L'entropia è legata al concetto di disordine del sistema",
    "Un aumento del disordine di un sistema corrisponde a una variazione positiva dell'entropia",
    "Un aumento del disordine di un sistema corrisponde a una variazione negativa dell'entropia",
    "Una diminuzione del disordine di un sistema corrisponde a una variazione negativa dell'entropia"], correct:3 },

{ id:"term-17", topic:"termodinamica", type:"mc",
  q:"L'entalpia ($H$) di un sistema è definita come:",
  options:["La somma dell'energia cinetica e potenziale","La quantità di calore scambiata in una trasformazione","La differenza tra energia interna e lavoro compiuto dal sistema","Una funzione che dipende esclusivamente dal calore specifico","La misura dell'energia cinetica media delle molecole"], correct:1 },

{ id:"term-18", topic:"termodinamica", type:"mc",
  q:"Una reazione si dice esotermica se:",
  options:["Procede sempre spontaneamente","L'entalpia dei prodotti è uguale a quella dei reagenti","È accompagnata da assorbimento di calore","È accompagnata da sviluppo (rilascio) di calore","Si svolge senza assorbimento né emissione di calore"], correct:3 },

{ id:"term-19", topic:"termodinamica", type:"mc",
  q:"La variazione di entropia per un processo non dipende dal percorso attraverso il quale il processo avviene. L'entropia è quindi una funzione:",
  options:["Di stato","Variabile","Costante","Positiva","Negativa"], correct:0 },

{ id:"term-20", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti è l'unità di misura dell'energia nel Sistema Internazionale?",
  options:["La caloria","Il joule","L'atmosfera","Il kelvin","La mole"], correct:1 },

{ id:"term-21", topic:"termodinamica", type:"mc",
  q:"A quanti joule corrisponde una caloria?",
  options:["1 J","4,184 J","0,0821 J","22,4 J","273,15 J"], correct:1 },

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
  options:["$\\text{kg/s}^2$","watt","joule","N/m","$\\text{m/s}^2$"], correct:2,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). L'energia cinetica, come ogni forma di energia, si misura in joule nel Sistema Internazionale." },

{ id:"mis-02", topic:"misure", type:"mc",
  q:"Un volume di $10\\text{ dm}^3$ corrisponde a:",
  options:["100 millilitri","100 litri","10 litri","1 litro","10 millilitri"], correct:2,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). $1\\text{ dm}^3 = 1$ litro, quindi $10\\text{ dm}^3 = 10$ litri." },

{ id:"mis-03", topic:"misure", type:"mc",
  q:"Quale delle seguenti affermazioni è corretta?",
  options:["$10^{-9}\\text{ km} = 1\\text{ dm}$","$10^{-9}\\text{ km} = 1\\text{ nm}$","$10^{-9}\\text{ km} = 1\\ \\mu\\text{m}$","$10^{-9}\\text{ km} = 1\\text{ mm}$","$10^{-9}\\text{ km} = 1\\text{ cm}$"], correct:2,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello). $10^{-9}\\text{ km} = 10^{-9}\\times 1000\\text{ m} = 10^{-6}\\text{ m} = 1\\ \\mu\\text{m}$." },

{ id:"mis-04", topic:"misure", type:"mc",
  q:"Quali sono le dimensioni fisiche di una forza nel Sistema Internazionale?",
  options:["$[M][L][T]^{-1}$","$[M][L]^2[T]^{-2}$","$[L][T]^{-2}$","$[M][L][T]$","$[M][L][T]^{-2}$"], correct:4,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello). Da $F = ma$: $[M]\\times[L][T]^{-2} = [M][L][T]^{-2}$." },

{ id:"mis-05", topic:"misure", type:"mc",
  q:"Quale delle seguenti NON è una grandezza fondamentale del Sistema Internazionale?",
  options:["Lunghezza","Massa","Tempo","Forza","Temperatura"], correct:3,
  explain:"La forza è una grandezza derivata ($F = ma$), non una delle sette grandezze fondamentali del SI." },

{ id:"mis-06", topic:"misure", type:"mc",
  q:"L'unità di misura della pressione nel Sistema Internazionale è:",
  options:["Il newton","Il pascal","Il joule","Il watt","L'atmosfera"], correct:1 },

{ id:"mis-07", topic:"misure", type:"mc",
  q:"Quale delle seguenti è una grandezza derivata (non fondamentale) nel Sistema Internazionale?",
  options:["Il tempo","La massa","La velocità","La lunghezza","La temperatura"], correct:2,
  explain:"La velocità si ottiene dal rapporto tra una lunghezza e un tempo, quindi è una grandezza derivata." },

{ id:"mis-08", topic:"misure", type:"mc",
  q:"Il prefisso \"nano\" (n) indica un fattore moltiplicativo pari a:",
  options:["$10^3$","$10^{-3}$","$10^6$","$10^{-9}$","$10^9$"], correct:3 },

{ id:"mis-09", topic:"misure", type:"mc",
  q:"Il prefisso \"mega\" (M) indica un fattore moltiplicativo pari a:",
  options:["$10^3$","$10^6$","$10^{-6}$","$10^9$","$10^{-3}$"], correct:1 },

{ id:"mis-10", topic:"misure", type:"mc",
  q:"Una misura si dice diretta quando:",
  options:[
    "Si ottiene confrontando direttamente la grandezza con un campione dello stesso tipo (es. una lunghezza con un righello)",
    "Si ottiene esclusivamente tramite calcolo matematico a partire da altre grandezze",
    "Si ottiene sempre con uno strumento elettronico",
    "Non richiede alcuno strumento",
    "È sempre meno precisa di una misura indiretta"], correct:0 },

{ id:"mis-11", topic:"misure", type:"mc",
  q:"Una misura si dice indiretta quando:",
  options:[
    "Si ottiene tramite calcolo a partire da altre grandezze misurate direttamente",
    "Si ottiene con un solo strumento tarato",
    "Coincide sempre con una misura diretta",
    "È indipendente dalle unità di misura utilizzate",
    "Non può mai essere espressa con cifre significative"], correct:0,
  explain:"Ad esempio, la velocità media è una misura indiretta: si calcola a partire dalle misure dirette di spazio e tempo." },

{ id:"mis-12", topic:"misure", type:"mc",
  q:"L'analisi dimensionale di una formula fisica serve a:",
  options:[
    "Verificare che i due membri di un'equazione abbiano le stesse dimensioni fisiche",
    "Calcolare esclusivamente il valore numerico di una grandezza",
    "Sostituire la misura sperimentale",
    "Determinare il colore di un fenomeno fisico",
    "Eliminare la necessità delle unità di misura"], correct:0 },

{ id:"mis-13", topic:"misure", type:"mc",
  q:"Quante sono le grandezze fondamentali del Sistema Internazionale?",
  options:["4","5","6","7","9"], correct:3,
  explain:"Le sette grandezze fondamentali sono: lunghezza, massa, tempo, corrente elettrica, temperatura, quantità di sostanza, intensità luminosa." },

{ id:"mis-14", topic:"misure", type:"mc",
  q:"L'unità di misura dell'energia nel Sistema Internazionale è:",
  options:["Il newton","Il watt","Il joule","La caloria","Il pascal"], correct:2 },

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

/* ============================= CINEMATICA ============================= */

{ id:"cin-01", topic:"cinematica", type:"mc",
  q:"La cinematica è la branca della meccanica che studia:",
  options:["Le cause del moto dei corpi","Il movimento dei corpi analizzandone le caratteristiche, senza occuparsi delle cause","L'equilibrio dei corpi fermi","Esclusivamente le forze agenti su un corpo","La trasformazione dell'energia"], correct:1 },

{ id:"cin-02", topic:"cinematica", type:"mc",
  q:"La traiettoria di un punto materiale è definita come:",
  options:["La distanza percorsa nel tempo","L'insieme dei punti dello spazio occupati dal punto materiale durante il suo moto","La velocità media del punto","Il tempo impiegato a percorrere un tragitto","L'accelerazione subita dal corpo"], correct:1 },

{ id:"cin-03", topic:"cinematica", type:"mc",
  q:"Quando la traiettoria di un punto materiale è una retta, il moto si definisce:",
  options:["Circolare","Parabolico","Rettilineo","Armonico","Curvilineo"], correct:2 },

{ id:"cin-04", topic:"cinematica", type:"mc",
  q:"Il sistema di riferimento, in cinematica, è definito come:",
  options:["La traiettoria del corpo in esame","Un luogo fisico rispetto al quale sono effettuate le misure delle grandezze cinematiche","La velocità istantanea del corpo","Un tipo particolare di moto","L'accelerazione di un corpo"], correct:1 },

{ id:"cin-05", topic:"cinematica", type:"mc",
  q:"La relazione che lega la posizione di un corpo al tempo è detta:",
  options:["Legge oraria del moto","Traiettoria","Sistema di riferimento","Accelerazione media","Tensione superficiale"], correct:0 },

{ id:"cin-06", topic:"cinematica", type:"mc",
  q:"La velocità media è definita come:",
  options:["Il prodotto tra spazio percorso e tempo impiegato","Il rapporto tra lo spazio percorso $\\Delta s$ e l'intervallo di tempo $\\Delta t$ in cui è stato percorso","Il rapporto tra accelerazione e tempo","Il prodotto tra la massa e la posizione","Il rapporto tra tempo e spazio percorso"], correct:1 },

{ id:"cin-07", topic:"cinematica", type:"mc",
  q:"Per convertire una velocità da m/s a km/h occorre:",
  options:["Dividere per 3,6","Moltiplicare per 3,6","Moltiplicare per 10","Dividere per 10","Moltiplicare per 1000"], correct:1 },

{ id:"cin-09", topic:"cinematica", type:"mc",
  q:"Il moto rettilineo uniforme è caratterizzato da:",
  options:["Accelerazione costante e diversa da zero","Velocità media costante lungo un'unica dimensione","Traiettoria circolare","Velocità che varia linearmente nel tempo","Assenza di spostamento"], correct:1 },

{ id:"cin-10", topic:"cinematica", type:"mc",
  q:"Nella legge oraria del moto rettilineo uniforme $s = s_0 + vt$, il termine $s_0$ rappresenta:",
  options:["La velocità iniziale","L'accelerazione","Lo spazio iniziale percorso dal corpo","Il tempo iniziale","Lo spazio totale percorso"], correct:2 },

{ id:"cin-11", topic:"cinematica", type:"mc",
  q:"Il grafico spazio-tempo del moto rettilineo uniforme è rappresentato da:",
  options:["Una parabola","Una retta il cui coefficiente angolare coincide con la velocità","Una retta orizzontale","Una circonferenza","Una curva esponenziale"], correct:1 },

{ id:"cin-12", topic:"cinematica", type:"mc",
  q:"L'accelerazione media è definita come:",
  options:["Il rapporto tra spazio percorso e tempo","Il rapporto tra la variazione di velocità $\\Delta v$ e l'intervallo di tempo $\\Delta t$ in cui avviene", "Il prodotto tra velocità e tempo","La variazione di posizione nel tempo","Il rapporto tra forza e tempo"], correct:1 },

{ id:"cin-13", topic:"cinematica", type:"mc",
  q:"L'unità di misura dell'accelerazione nel Sistema Internazionale è:",
  options:["m/s","$\\text{m/s}^2$","km/h","N/kg","$\\text{m}^2\\text{/s}$"], correct:1 },

{ id:"cin-14", topic:"cinematica", type:"mc",
  q:"Un moto rettilineo si definisce uniformemente accelerato se:",
  options:["La velocità è sempre nulla","L'accelerazione media risulta costante in tutto l'intervallo di tempo considerato","La traiettoria è una parabola","L'accelerazione varia nel tempo","Il corpo è fermo"], correct:1 },

{ id:"cin-15", topic:"cinematica", type:"mc",
  q:"Nel moto uniformemente accelerato, la velocità dipende dal tempo secondo la relazione $v = v_0 + at$. In un grafico velocità-tempo, il coefficiente angolare della retta rappresenta:",
  options:["La velocità iniziale","Lo spazio percorso","L'accelerazione","Il tempo totale","La posizione iniziale"], correct:2 },

{ id:"cin-17", topic:"cinematica", type:"mc",
  q:"Il moto di un punto materiale con curvatura costante della traiettoria e velocità scalare costante è:",
  options:["Uniformemente accelerato","Elicoidale","Armonico","Un quesito senza soluzione univoca","Circolare uniforme"], correct:4,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"cin-18", topic:"cinematica", type:"mc",
  q:"Una nave percorre in successione 10 km verso Nord, 6 km verso Est e infine 18 km verso Sud. Quanto vale il modulo dello spostamento risultante?",
  options:["15 km","10 km","5 km","25 km","20 km"], correct:1,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). Componente Nord-Sud: $10-18 = -8\\text{ km}$; componente Est: $6\\text{ km}$. Modulo $= \\sqrt{8^2+6^2} = \\sqrt{100} = 10\\text{ km}$." },

{ id:"cin-20", topic:"cinematica", type:"mc",
  q:"Se il grafico spazio-tempo di un corpo è una retta con pendenza nulla (parallela all'asse dei tempi), il corpo:",
  options:["Si muove di moto uniformemente accelerato","È fermo (velocità nulla)","Si muove a velocità costante e diversa da zero","Sta accelerando","Sta decelerando"], correct:1 },

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

/* ============================= DINAMICA ============================= */

{ id:"din-01", topic:"dinamica", type:"mc",
  q:"Il primo principio della dinamica (principio d'inerzia) afferma che:",
  options:[
    "Un corpo soggetto a una forza netta nulla persevera nel suo stato di quiete o di moto rettilineo uniforme",
    "Ogni corpo accelera in modo indipendente dalla forza applicata",
    "Ad ogni azione corrisponde una reazione uguale e contraria",
    "La quantità di moto di un sistema isolato aumenta nel tempo",
    "L'energia meccanica si conserva sempre, anche in presenza di attrito"], correct:0 },

{ id:"din-02", topic:"dinamica", type:"mc",
  q:"Il secondo principio della dinamica si esprime matematicamente come:",
  options:["$F = mv$","$F = ma$","$F = m/a$","$F = ma^2$","$F = a/m$"], correct:1 },

{ id:"din-03", topic:"dinamica", type:"mc",
  q:"Il terzo principio della dinamica (principio di azione e reazione) afferma che:",
  options:[
    "Un corpo fermo rimane fermo se non sollecitato",
    "La forza è proporzionale all'accelerazione",
    "Se un corpo A esercita una forza su un corpo B, allora B esercita su A una forza uguale in modulo e direzione ma di verso opposto",
    "L'energia si conserva sempre in un sistema isolato",
    "La quantità di moto totale di un sistema aumenta nel tempo"], correct:2 },

{ id:"din-04", topic:"dinamica", type:"mc",
  q:"Le forze di azione e reazione del terzo principio della dinamica:",
  options:["Si annullano a vicenda perché agiscono sullo stesso corpo","Agiscono su corpi diversi e quindi non si annullano","Hanno sempre natura diversa tra loro","Agiscono solo se i due corpi sono a contatto diretto","Sono sempre nulle in un sistema in equilibrio"], correct:1 },

{ id:"din-05", topic:"dinamica", type:"mc",
  q:"Applicando una forza di uguale intensità a due corpi di massa diversa, i due corpi acquistano:",
  options:["La stessa accelerazione","Un quesito senza soluzione univoca","Accelerazioni direttamente proporzionali alle masse","La stessa velocità","Accelerazioni inversamente proporzionali alle masse"], correct:4,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello). Dal secondo principio, $a=F/m$: a parità di $F$, l'accelerazione è inversamente proporzionale alla massa." },

{ id:"din-06", topic:"dinamica", type:"mc",
  q:"L'unità di misura della forza nel Sistema Internazionale è:",
  options:["Il joule","Il newton","Il watt","Il pascal","Il kilogrammo"], correct:1 },

{ id:"din-07", topic:"dinamica", type:"mc",
  q:"Un newton (N) equivale a:",
  options:["$1\\ \\text{kg}\\cdot\\text{m/s}$","$1\\ \\text{kg}\\cdot\\text{m/s}^2$","$1\\ \\text{kg/m}^2$","$1\\ \\text{kg}\\cdot\\text{m}^2\\text{/s}$","$1\\ \\text{kg/s}^2$"], correct:1 },

{ id:"din-08", topic:"dinamica", type:"mc",
  q:"La forza peso di un corpo di massa $m$ è data da:",
  options:["$P = m/g$","$P = mg$","$P = m + g$","$P = g/m$","$P = m^2g$"], correct:1 },

{ id:"din-09", topic:"dinamica", type:"mc",
  q:"La massa di un corpo, a differenza del peso:",
  options:["Dipende dall'accelerazione di gravità del luogo","È una quantità vettoriale espressa in newton","È una proprietà intrinseca del corpo e non varia con la posizione","Aumenta quando il corpo accelera","Si misura in newton"], correct:2 },

{ id:"din-10", topic:"dinamica", type:"mc",
  q:"La forza d'attrito che si oppone al moto di un corpo che striscia su una superficie è chiamata attrito:",
  options:["Statico","Dinamico (o radente)","Viscoso","Elastico","Gravitazionale"], correct:1 },

{ id:"din-11", topic:"dinamica", type:"mc",
  q:"La forza di attrito statico massima, tra le stesse superfici, rispetto a quella dinamica è generalmente:",
  options:["Minore","Uguale","Maggiore o uguale","Nulla","Non confrontabile"], correct:2 },

{ id:"din-12", topic:"dinamica", type:"mc",
  q:"La forza elastica esercitata da una molla è descritta dalla legge di Hooke:",
  options:["$F = kx$","$F = mx$","$F = k/x$","$F = kx^2$","$F = mgx$"], correct:0,
  explain:"$k$ è la costante elastica della molla, $x$ l'allungamento (o la compressione) rispetto alla posizione di riposo." },

{ id:"din-13", topic:"dinamica", type:"mc",
  q:"La forza normale esercitata da un piano di appoggio su un corpo è diretta:",
  options:["Parallelamente al piano","Perpendicolarmente al piano di appoggio","Sempre verso il basso","Nella direzione del moto","In verso opposto alla forza peso solo se il corpo è in moto"], correct:1 },

{ id:"din-14", topic:"dinamica", type:"mc",
  q:"Un corpo si trova in equilibrio (statico) quando:",
  options:["La sua accelerazione è massima","La risultante delle forze agenti su di esso è nulla","È soggetto a una sola forza","La sua velocità è massima","La sua massa è nulla"], correct:1 },

{ id:"din-15", topic:"dinamica", type:"mc",
  q:"Il momento di una forza rispetto a un punto è dato dal prodotto tra:",
  options:["La forza e la massa","La forza e il suo braccio (distanza dalla retta d'azione al punto)","La forza e il tempo","La massa e l'accelerazione","La forza e la velocità"], correct:1 },

{ id:"din-16", topic:"dinamica", type:"mc",
  q:"Un pendolo che oscilla si smorza progressivamente nel tempo a causa di:",
  options:["Forze conservative","Forze dissipative","Un aumento della sua massa","Una diminuzione della forza peso","Assenza totale di attrito"], correct:1,
  explain:"Le forze dissipative (attrito dell'aria, attriti interni) sottraggono energia meccanica al sistema, smorzando l'oscillazione." },

{ id:"din-17", topic:"dinamica", type:"mc",
  q:"Due o più forze applicate a uno stesso corpo si compongono secondo:",
  options:["La somma algebrica dei loro moduli, indipendentemente dalla direzione","La regola del parallelogramma (somma vettoriale)","La loro differenza","Il prodotto dei moduli","Nessuna regola particolare"], correct:1 },

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

/* ============================= LAVORO, ENERGIA E POTENZA ============================= */

{ id:"en-01", topic:"energia", type:"mc",
  q:"Il lavoro $L$ compiuto da una forza $F$ costante durante uno spostamento $s$ è definito come:",
  options:["Il prodotto vettoriale tra $F$ e $s$","Il prodotto scalare tra $F$ e $s$","La somma tra $F$ e $s$","Il rapporto tra $F$ e $s$","La differenza tra $F$ e $s$"], correct:1 },

{ id:"en-02", topic:"energia", type:"mc",
  q:"L'unità di misura del lavoro nel Sistema Internazionale è:",
  options:["Il newton","Il watt","Il joule","Il pascal","La caloria"], correct:2 },

{ id:"en-03", topic:"energia", type:"mc",
  q:"Il lavoro $L = |F||s|\\cos\\alpha$ si definisce motore quando:",
  options:["L'angolo $\\alpha$ è ottuso","Il lavoro $L$ è negativo","L'angolo $\\alpha$ è acuto (o nullo) e quindi $L$ è positivo","$F$ e $s$ sono perpendicolari","Il lavoro $L$ è sempre nullo"], correct:2 },

{ id:"en-04", topic:"energia", type:"mc",
  q:"Il lavoro si definisce resistente quando:",
  options:["$F$ e $s$ sono paralleli e concordi","L'angolo tra $F$ e $s$ è acuto","L'angolo tra $F$ e $s$ è ottuso (o piatto) e quindi $L$ è negativo","La forza $F$ è nulla","Lo spostamento $s$ è nullo"], correct:2 },

{ id:"en-05", topic:"energia", type:"mc",
  q:"La potenza è definita come:",
  options:["Il prodotto tra lavoro e tempo","Il rapporto tra il lavoro compiuto e l'intervallo di tempo impiegato","La variazione di energia cinetica","Il rapporto tra forza e spostamento","Il prodotto tra forza e velocità al quadrato"], correct:1 },

{ id:"en-06", topic:"energia", type:"mc",
  q:"L'unità di misura della potenza nel Sistema Internazionale è:",
  options:["Il joule","Il newton","Il watt","Il kWh","Il pascal"], correct:2 },

{ id:"en-07", topic:"energia", type:"mc",
  q:"Il watt (W), unità di misura della potenza, corrisponde a:",
  options:["1 joule al minuto","1 joule al secondo","1 newton al secondo","1 joule per metro","1 newton per metro"], correct:1 },

{ id:"en-08", topic:"energia", type:"mc",
  q:"A quanti joule corrisponde 1 kWh?",
  options:["1000 J","3600 J","36.000 J","3.600.000 J","860 J"], correct:3,
  explain:"$1\\text{ kWh} = 1000\\text{ W} \\times 3600\\text{ s} = 3.600.000\\text{ J}$." },

{ id:"en-09", topic:"energia", type:"mc",
  q:"Una forza si definisce conservativa quando:",
  options:["Dipende dalla velocità del corpo","Il lavoro compiuto per spostare un corpo da A a B dipende dal percorso seguito","Il lavoro compiuto lungo un qualsiasi tragitto chiuso è sempre nullo","È sempre diretta verso il basso","Produce sempre un lavoro negativo"], correct:2 },

{ id:"en-10", topic:"energia", type:"mc",
  q:"Quali delle seguenti sono forze conservative?",
  options:["La forza di attrito e la forza peso","La forza peso e la forza elastica","La forza elastica e la forza di attrito","Solo la forza di attrito","Nessuna forza in meccanica è conservativa"], correct:1 },

{ id:"en-11", topic:"energia", type:"mc",
  q:"La forza di attrito è un tipico esempio di forza:",
  options:["Conservativa","Dissipativa (non conservativa)","Elastica","Gravitazionale","Centripeta"], correct:1 },

{ id:"en-12", topic:"energia", type:"mc",
  q:"L'energia cinetica di un corpo è l'energia associata:",
  options:["Alla sua posizione nello spazio","Al suo movimento","Alla sua temperatura","Alla sua carica elettrica","Esclusivamente alla sua massa a riposo"], correct:1 },

{ id:"en-13", topic:"energia", type:"mc",
  q:"Il teorema dell'energia cinetica afferma che il lavoro compiuto su un corpo è pari:",
  options:["Alla sua energia potenziale","Alla variazione di energia cinetica subita dal corpo","Alla sua massa moltiplicata per la velocità","Alla potenza media sviluppata","Al quadrato della sua velocità"], correct:1 },

{ id:"en-14", topic:"energia", type:"mc",
  q:"L'energia potenziale è definita in relazione a:",
  options:["Qualsiasi tipo di forza","Esclusivamente le forze conservative","Esclusivamente le forze dissipative","La sola massa del corpo","Il tempo di applicazione della forza"], correct:1,
  explain:"Se la forza non fosse conservativa, il lavoro dipenderebbe dal percorso e la definizione di energia potenziale non sarebbe univoca." },

{ id:"en-15", topic:"energia", type:"mc",
  q:"L'energia potenziale gravitazionale di una massa $m$ posta a un'altezza $h$ rispetto a un riferimento è data da:",
  options:["$U = mgh$","$U = \\tfrac{1}{2}mv^2$","$U = mg/h$","$U = \\tfrac{1}{2}kh^2$","$U = mh/g$"], correct:0 },

{ id:"en-16", topic:"energia", type:"mc",
  q:"L'energia potenziale elastica immagazzinata da una molla allungata di una quantità $x$, con costante elastica $k$, è data da:",
  options:["$U = kx$","$U = \\tfrac{1}{2}kx^2$","$U = kx^2$","$U = \\tfrac{1}{2}k^2x$","$U = mgx$"], correct:1 },

{ id:"en-17", topic:"energia", type:"mc",
  q:"L'energia meccanica $E$ di un corpo è definita come:",
  options:["Il prodotto tra energia cinetica ed energia potenziale","La somma dell'energia cinetica e dell'energia potenziale","La differenza tra energia cinetica ed energia potenziale","Il rapporto tra lavoro e tempo","La sola energia cinetica"], correct:1 },

{ id:"en-18", topic:"energia", type:"mc",
  q:"Il principio di conservazione dell'energia meccanica afferma che l'energia meccanica di un sistema si mantiene costante quando:",
  options:["Agiscono solo forze dissipative","Agiscono sia forze conservative che dissipative","Agiscono esclusivamente forze conservative","Il sistema è fermo","La massa del sistema è costante"], correct:2 },

{ id:"en-19", topic:"energia", type:"mc",
  q:"Se su un sistema agiscono anche forze dissipative (come l'attrito), la variazione di energia meccanica $\\Delta E$ è pari a:",
  options:["Zero","Il lavoro compiuto dalle forze dissipative agenti sul sistema","L'energia cinetica iniziale","L'energia potenziale finale","Sempre un valore positivo"], correct:1,
  explain:"$\\Delta E = L_{att}$, dove $L_{att}$ è il lavoro (negativo) delle forze dissipative agenti sul sistema." },

{ id:"en-20", topic:"energia", type:"mc",
  q:"Una molla orizzontale, di costante elastica $k$, ha attaccato un blocco di massa $m = 7$ kg che oscilla con periodo $T = \\pi/3$ s. Usando la relazione $T = 2\\pi\\sqrt{m/k}$, quanto vale $k$?",
  options:["$28\\text{ N/m}$","$126\\text{ N/m}$","$252\\text{ N/m}$","$4\\text{ N/m}$","$252\\pi\\text{ N/m}$"], correct:2,
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
  options:["La somma del numero di protoni ed elettroni","La somma del numero di protoni e neutroni","Il numero totale di elettroni","Il numero di protoni contenuti nel nucleo","Il numero di neutroni contenuti nel nucleo"], correct:3,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"atom-02", topic:"atomo", type:"mc",
  q:"Gli isotopi di un elemento sono atomi che hanno lo stesso numero:",
  options:["Atomico","Di massa","Di elettroni e neutroni","Di elettroni nel nucleo","Di neutroni"], correct:0,
  explain:"Domanda ispirata alla prova ufficiale del semestre filtro 2025 (secondo appello), che chiedeva di completare: \"Negli isotopi diverso numero di ________\" (neutroni). Gli isotopi hanno infatti lo stesso $Z$ ma diverso numero di massa $A$, perché differiscono per il numero di neutroni." },

{ id:"atom-03", topic:"atomo", type:"mc",
  q:"L'atomo con struttura elettronica $1s^2\\,2s^2\\,2p^5$ è:",
  options:["Ossigeno","Azoto","Neon","Fluoro","Argon"], correct:3,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). Il numero totale di elettroni è $2+2+5=9$, che corrisponde al fluoro ($Z=9$)." },

{ id:"atom-04", topic:"atomo", type:"mc",
  q:"Il numero massimo di elettroni presenti in un orbitale con $l = 1$ è:",
  options:["6","1","2","4","3"], correct:2,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello). Ogni singolo orbitale, indipendentemente dalla sua forma, può contenere al massimo 2 elettroni con spin antiparallelo (principio di Pauli)." },

{ id:"atom-05", topic:"atomo", type:"mc",
  q:"Le particelle subatomiche con carica positiva sono chiamate:",
  options:["Elettroni","Neutroni","Protoni","Fotoni","Nuclidi"], correct:2 },

{ id:"atom-06", topic:"atomo", type:"mc",
  q:"Quale particella subatomica è priva di carica elettrica?",
  options:["Protone","Elettrone","Neutrone","Positrone","Nucleone"], correct:2 },

{ id:"atom-07", topic:"atomo", type:"mc",
  q:"Dove si trovano protoni e neutroni in un atomo?",
  options:["Distribuiti uniformemente in tutto il volume atomico","Nel nucleo","Negli orbitali più esterni","Nello spazio tra nucleo ed elettroni","Non hanno una posizione definita"], correct:1 },

{ id:"atom-08", topic:"atomo", type:"mc",
  q:"La massa di un elettrone rispetto a quella di un protone è circa:",
  options:["Uguale","Il doppio","2000 volte più piccola","2000 volte più grande","La metà"], correct:2 },

{ id:"atom-09", topic:"atomo", type:"mc",
  q:"La somma del numero di protoni e neutroni in un atomo costituisce:",
  options:["Il numero atomico ($Z$)","Il numero di massa ($A$)","Il numero quantico principale","Il peso molecolare","Il numero di Avogadro"], correct:1 },

{ id:"atom-10", topic:"atomo", type:"mc",
  q:"Due atomi con lo stesso numero atomico ma diverso numero di massa sono detti:",
  options:["Isomeri","Isotopi","Isobari","Ioni","Radicali"], correct:1 },

{ id:"atom-11", topic:"atomo", type:"mc",
  q:"Gli isotopi di uno stesso elemento hanno:",
  options:["Le stesse proprietà chimiche ma diverse proprietà fisiche","Diverse proprietà chimiche ma le stesse proprietà fisiche","Proprietà chimiche e fisiche identiche","Un diverso numero atomico","Un diverso numero di protoni"], correct:0 },

{ id:"atom-12", topic:"atomo", type:"mc",
  q:"Il numero quantico principale $n$ definisce principalmente:",
  options:["La forma dell'orbitale","L'energia e la dimensione dell'orbitale","L'orientamento dell'orbitale nello spazio","Il verso di rotazione dell'elettrone","La carica del nucleo"], correct:1 },

{ id:"atom-13", topic:"atomo", type:"mc",
  q:"Il numero quantico secondario $l$ definisce:",
  options:["L'energia totale dell'atomo","La forma dell'orbitale","Il numero atomico","L'orientamento dell'orbitale nello spazio","Lo spin dell'elettrone"], correct:1 },

{ id:"atom-14", topic:"atomo", type:"mc",
  q:"A quale tipo di orbitale corrisponde il numero quantico secondario $l = 2$?",
  options:["Orbitale s","Orbitale p","Orbitale d","Orbitale f","Nessun orbitale esiste per $l=2$"], correct:2 },

{ id:"atom-15", topic:"atomo", type:"mc",
  q:"Quanti orbitali p esistono in un dato livello energetico ($l = 1$)?",
  options:["1","2","3","5","7"], correct:2,
  explain:"Il numero quantico magnetico $m$ va da $-l$ a $+l$: per $l=1$, $m=-1,0,+1$, quindi 3 orbitali." },

{ id:"atom-16", topic:"atomo", type:"mc",
  q:"Quanti orbitali d esistono in un dato livello energetico ($l = 2$)?",
  options:["3","5","7","1","9"], correct:1 },

{ id:"atom-17", topic:"atomo", type:"mc",
  q:"Il numero quantico magnetico di spin $s$ può assumere:",
  options:["Solo valori interi da 0 a $n-1$","Solo i valori $+1/2$ e $-1/2$","Valori da $-l$ a $+l$","Solo valori positivi","Valori multipli di $n$"], correct:1 },

{ id:"atom-18", topic:"atomo", type:"mc",
  q:"Il principio di esclusione di Pauli afferma che in un atomo:",
  options:["Tutti gli elettroni devono avere spin parallelo","Non possono esistere due elettroni con la stessa sequenza dei quattro numeri quantici","Gli orbitali si riempiono partendo da quelli a maggiore energia","Ogni orbitale può contenere al massimo un elettrone","Gli elettroni occupano sempre l'orbitale con $n$ più alto"], correct:1 },

{ id:"atom-19", topic:"atomo", type:"mc",
  q:"Secondo la regola di Hund, quando sono disponibili orbitali isoenergetici, gli elettroni si dispongono:",
  options:["Tutti nello stesso orbitale con spin opposto","Occupando il maggior numero di orbitali possibile con spin parallelo","Solo negli orbitali s","In ordine casuale","Sempre a coppie con spin antiparallelo"], correct:1 },

{ id:"atom-20", topic:"atomo", type:"mc",
  q:"Qual è la configurazione elettronica del carbonio ($Z = 6$)?",
  options:["$1s^2\\,2s^2\\,2p^2$","$1s^2\\,2s^2\\,2p^4$","$1s^2\\,2s^4$","$1s^2\\,2s^2\\,2p^6$","$1s^6$"], correct:0 },

{ id:"atom-21", topic:"atomo", type:"mc",
  q:"In un orbitale atomico possono trovarsi al massimo:",
  options:["1 elettrone","2 elettroni con spin antiparallelo","3 elettroni","8 elettroni","Un numero illimitato di elettroni"], correct:1 },

{ id:"atom-22", topic:"atomo", type:"mc",
  q:"L'orbitale di tipo s ha forma:",
  options:["Sferica","A quadrifoglio","Elicoidale (a manubrio)","A ciambella","Cubica"], correct:0 },

{ id:"atom-23", topic:"atomo", type:"mc",
  q:"Qual è il massimo valore del numero quantico principale $n$ riscontrato sperimentalmente negli atomi in natura?",
  options:["4","5","6","7","9"], correct:3 },

{ id:"atom-24", topic:"atomo", type:"mc",
  q:"La teoria quantistica moderna descrive l'elettrone come dotato di:",
  options:["Solo proprietà di particella","Solo proprietà di onda","Proprietà contemporanee di particella e di onda","Nessuna proprietà definita","Una traiettoria perfettamente calcolabile"], correct:2,
  explain:"È il principio di indeterminazione: non è possibile conoscere con la stessa precisione posizione e velocità dell'elettrone." },

{ id:"atom-25", topic:"atomo", type:"mc",
  q:"L'orbitale atomico è definito come:",
  options:["La traiettoria esatta di un elettrone attorno al nucleo","La regione di spazio attorno al nucleo in cui è massima la probabilità di trovare un elettrone","Il nucleo dell'atomo","La somma di protoni e neutroni","Un particolare tipo di legame chimico"], correct:1 },

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

/* ============================= TAVOLA PERIODICA DEGLI ELEMENTI ============================= */

{ id:"tav-01", topic:"tavola", type:"mc",
  q:"Nella tavola periodica gli elementi sono ordinati secondo:",
  options:["Il numero di massa crescente","Il numero atomico crescente","Il peso atomico decrescente","L'ordine alfabetico","Il numero di elettroni di valenza decrescente"], correct:1 },

{ id:"tav-02", topic:"tavola", type:"mc",
  q:"Quante sono le righe orizzontali (periodi) della tavola periodica?",
  options:["6","7","8","9","18"], correct:1 },

{ id:"tav-03", topic:"tavola", type:"mc",
  q:"Il numero del periodo a cui appartiene un elemento corrisponde:",
  options:["Al numero atomico dell'elemento","Al numero di elettroni di valenza","Al massimo valore del numero quantico principale $n$ occupato","Al numero di protoni nel nucleo","Al numero del gruppo"], correct:2 },

{ id:"tav-04", topic:"tavola", type:"mc",
  q:"Gli elementi di uno stesso gruppo della tavola periodica hanno in comune:",
  options:["Lo stesso numero di massa","Una configurazione elettronica esterna simile","Lo stesso numero di neutroni","Le stesse dimensioni atomiche","Lo stesso periodo"], correct:1 },

{ id:"tav-05", topic:"tavola", type:"mc",
  q:"Il gruppo 8A della tavola periodica corrisponde a:",
  options:["I metalli alcalini","I metalli alcalino-terrosi","Gli alogeni","I gas nobili","I metalli di transizione"], correct:3 },

{ id:"tav-06", topic:"tavola", type:"mc",
  q:"Perché i gas nobili non formano legami chimici in condizioni normali?",
  options:["Perché hanno un solo elettrone di valenza","Perché possiedono già la configurazione elettronica esterna più stabile (ottetto completo)","Perché sono privi di elettroni","Perché hanno un numero atomico molto basso","Perché sono tutti radioattivi"], correct:1 },

{ id:"tav-07", topic:"tavola", type:"mc",
  q:"Gli elementi di transizione compaiono a partire dal:",
  options:["1° periodo","2° periodo","3° periodo","4° periodo","7° periodo"], correct:3,
  explain:"Con gli elementi di transizione iniziano a riempirsi gli orbitali di tipo d." },

{ id:"tav-08", topic:"tavola", type:"mc",
  q:"Lantanidi e attinidi occupano orbitali di tipo:",
  options:["s","p","d","f","Nessun orbitale specifico"], correct:3 },

{ id:"tav-09", topic:"tavola", type:"mc",
  q:"Quale delle seguenti è una proprietà tipica dei metalli?",
  options:["Scarsa conducibilità elettrica","Tendenza ad acquistare elettroni","Formazione di anioni","Tendenza a cedere elettroni","Formazione di anidridi"], correct:3 },

{ id:"tav-10", topic:"tavola", type:"mc",
  q:"Quale delle seguenti è una proprietà tipica dei non metalli?",
  options:["Sono tutti allo stato solido a temperatura ambiente","Sono buoni conduttori di calore ed elettricità","Tendono ad acquistare elettroni formando anioni","Formano ossidi basici","Sono malleabili e duttili"], correct:2 },

{ id:"tav-11", topic:"tavola", type:"mc",
  q:"Il raggio atomico degli elementi, scendendo lungo un gruppo:",
  options:["Diminuisce","Aumenta","Resta costante","Diventa nullo","Varia in modo casuale"], correct:1 },

{ id:"tav-12", topic:"tavola", type:"mc",
  q:"Il raggio atomico degli elementi, procedendo lungo un periodo (da sinistra a destra):",
  options:["Aumenta","Diminuisce","Resta costante","Raddoppia","Non è definibile"], correct:1 },

{ id:"tav-13", topic:"tavola", type:"mc",
  q:"L'energia di ionizzazione è definita come l'energia necessaria per:",
  options:["Formare un legame chimico","Allontanare un elettrone da un atomo in fase gassosa","Rompere il nucleo di un atomo","Far fondere un solido","Ionizzare un composto in soluzione"], correct:1 },

{ id:"tav-14", topic:"tavola", type:"mc",
  q:"Lungo un periodo, l'energia di ionizzazione degli elementi:",
  options:["Aumenta","Diminuisce","Resta costante","Diventa negativa","Non è definita"], correct:0 },

{ id:"tav-15", topic:"tavola", type:"mc",
  q:"Scendendo lungo un gruppo, l'energia di ionizzazione degli elementi:",
  options:["Aumenta","Diminuisce","Resta costante","Raddoppia","Non varia in modo prevedibile"], correct:1 },

{ id:"tav-16", topic:"tavola", type:"mc",
  q:"L'affinità elettronica è definita come:",
  options:["L'energia necessaria per allontanare un elettrone da un atomo","L'energia che si libera quando un atomo in fase gassosa acquista un elettrone","La capacità di un atomo di formare legami covalenti","Il numero di elettroni di valenza di un atomo","La massa atomica di un elemento"], correct:1 },

{ id:"tav-17", topic:"tavola", type:"mc",
  q:"L'elettronegatività misura:",
  options:["La massa di un atomo","La tendenza di un atomo ad attirare su di sé gli elettroni di legame","Il numero di protoni nel nucleo","La dimensione del nucleo atomico","La carica totale di un atomo neutro"], correct:1 },

{ id:"tav-18", topic:"tavola", type:"mc",
  q:"Lungo un periodo l'elettronegatività degli elementi:",
  options:["Aumenta","Diminuisce","Resta costante","Diventa negativa","Dipende solo dal numero di massa"], correct:0 },

{ id:"tav-19", topic:"tavola", type:"mc",
  q:"Scendendo lungo un gruppo, l'elettronegatività degli elementi:",
  options:["Aumenta","Diminuisce","Resta costante","Diventa nulla","Raddoppia"], correct:1 },

{ id:"tav-20", topic:"tavola", type:"mc",
  q:"Per quali elementi non è possibile definire un valore di elettronegatività?",
  options:["I metalli alcalini","Gli alogeni","I gas nobili","I metalli di transizione","Il carbonio e l'azoto"], correct:2 },

{ id:"tav-21", topic:"tavola", type:"mc",
  q:"L'unità di massa atomica (u.m.a.) è definita come:",
  options:["La massa di un atomo di idrogeno","1/12 della massa dell'isotopo 12 del carbonio","La massa di una mole di elettroni","Il peso di un protone","La massa di un atomo di ossigeno-16"], correct:1 },

{ id:"tav-22", topic:"tavola", type:"mc",
  q:"Una mole di una sostanza contiene sempre:",
  options:["6,022 g di sostanza","Un numero di particelle pari al numero di Avogadro","Esattamente 1 g di sostanza","22,4 particelle","Un numero di particelle variabile in base alla sostanza"], correct:1 },

{ id:"tav-23", topic:"tavola", type:"mc",
  q:"Il numero di Avogadro è definito come il numero di atomi di carbonio contenuti in:",
  options:["1 g dell'isotopo 12 del carbonio","12 g dell'isotopo 12 del carbonio","1 mole di idrogeno","22,4 L di gas","6,022 g di carbonio"], correct:1 },

{ id:"tav-24", topic:"tavola", type:"mc",
  q:"Qual è la relazione corretta tra peso molecolare (P.M.) e mole?",
  options:["Il P.M. espresso in grammi corrisponde alla massa di una mole della sostanza","Il P.M. non ha alcuna relazione con la mole","Una mole corrisponde sempre a 1 g, indipendentemente dal P.M.","Il P.M. si misura in litri","Il P.M. è sempre uguale al numero di Avogadro"], correct:0 },

{ id:"tav-25", topic:"tavola", type:"mc",
  q:"Calcolare il numero di moli presenti in 0,093 g di Zn (massa atomica 65,41 u):",
  options:["$1{,}42\\times 10^{-3}$ mol","$1{,}42\\times 10^{-2}$ mol","$7{,}04\\times 10^{2}$ mol","$6{,}08\\times 10^{-4}$ mol","65,41 mol"], correct:0,
  explain:"$n = \\dfrac{m}{M} = \\dfrac{0{,}093}{65{,}41} \\approx 1{,}42\\times 10^{-3}\\text{ mol}$." },

{ id:"tav-26", topic:"tavola", type:"mc",
  q:"Quante moli sono contenute in 3,4 g di $H_2SO_4$ ($H=1$, $S=32$, $O=16$)?",
  options:["$3{,}47\\times 10^{-2}$ mol","0,34 mol","3,4 mol","$9{,}8\\times 10^{-2}$ mol","98 mol"], correct:0,
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

/* ============================= LEGAMI CHIMICI ============================= */

{ id:"leg-01", topic:"legami", type:"mc",
  q:"La regola dell'ottetto afferma che, nella formazione di un legame chimico, un elemento tende a circondarsi di:",
  options:["2 elettroni","4 elettroni","6 elettroni","8 elettroni","10 elettroni"], correct:3 },

{ id:"leg-02", topic:"legami", type:"mc",
  q:"Quale dei seguenti elementi, per la regola dell'ottetto, tende a raggiungere la configurazione dell'elio (2 elettroni)?",
  options:["Il sodio","Il cloro","L'idrogeno","Il calcio","Lo zolfo"], correct:2 },

{ id:"leg-03", topic:"legami", type:"mc",
  q:"L'energia di legame è definita come:",
  options:["L'energia cinetica media degli elettroni di legame","L'energia necessaria per rompere un legame chimico","La distanza tra i nuclei di due atomi legati","Il numero di legami tra due atomi","L'energia totale della molecola"], correct:1 },

{ id:"leg-04", topic:"legami", type:"mc",
  q:"L'ordine di legame indica:",
  options:["La distanza tra i nuclei degli atomi legati","Il numero di legami (singoli, doppi, tripli) tra due atomi","L'energia totale della molecola","Il tipo di ibridazione degli orbitali","La polarità del legame"], correct:1 },

{ id:"leg-05", topic:"legami", type:"mc",
  q:"A un maggiore ordine di legame corrisponde generalmente:",
  options:["Maggiore energia di legame e maggiore lunghezza di legame","Minore energia di legame e minore lunghezza di legame","Maggiore energia di legame e minore lunghezza di legame","Nessuna relazione con energia e lunghezza di legame","Minore energia di legame e maggiore lunghezza di legame"], correct:2 },

{ id:"leg-06", topic:"legami", type:"mc",
  q:"Secondo la teoria del legame di valenza (VB), il legame covalente si forma per:",
  options:["Cessione definitiva di elettroni tra due atomi","Condivisione di elettroni tra orbitali sovrapposti di atomi diversi","Attrazione elettrostatica tra ioni di carica opposta","Formazione di un mare di elettroni delocalizzati","Emissione di radiazione elettromagnetica"], correct:1 },

{ id:"leg-07", topic:"legami", type:"mc",
  q:"Un legame covalente tra due atomi con la stessa elettronegatività (es. H–H) si definisce:",
  options:["Eteropolare","Ionico","Omeopolare","Dativo","Metallico"], correct:2 },

{ id:"leg-08", topic:"legami", type:"mc",
  q:"Un legame covalente tra due atomi con diversa elettronegatività si definisce:",
  options:["Omeopolare","Eteropolare (o polarizzato)","Ionico puro","Metallico","Dativo"], correct:1 },

{ id:"leg-09", topic:"legami", type:"mc",
  q:"In un legame covalente polarizzato, l'atomo più elettronegativo:",
  options:["Cede completamente il suo elettrone","Attira maggiormente la coppia di elettroni di legame","Non partecipa al legame","Diventa un catione","Perde la sua identità chimica"], correct:1 },

{ id:"leg-10", topic:"legami", type:"mc",
  q:"Nel legame dativo (di coordinazione), la coppia di elettroni condivisa proviene:",
  options:["In parti uguali da entrambi gli atomi","Da un solo atomo (il donatore)","Sempre dall'atomo più elettronegativo","Da nessuno dei due atomi","Da un terzo atomo esterno"], correct:1 },

{ id:"leg-11", topic:"legami", type:"mc",
  q:"Nel legame dativo, l'atomo che riceve la coppia di elettroni è chiamato:",
  options:["Donatore","Accettore","Catione","Radicale","Nucleofilo"], correct:1 },

{ id:"leg-12", topic:"legami", type:"mc",
  q:"Secondo la teoria degli orbitali molecolari (MO), un orbitale molecolare legante, rispetto agli orbitali atomici di partenza, ha:",
  options:["Energia maggiore","Energia minore","La stessa energia","Energia nulla","Energia negativa"], correct:1 },

{ id:"leg-13", topic:"legami", type:"mc",
  q:"Secondo la teoria degli orbitali molecolari, il numero totale di orbitali molecolari che si formano è:",
  options:["Sempre il doppio degli orbitali atomici di partenza","Uguale al numero degli orbitali atomici che si combinano","Sempre pari a 2","Indipendente dal numero di orbitali atomici","Sempre dispari"], correct:1 },

{ id:"leg-14", topic:"legami", type:"mc",
  q:"La molecola di ossigeno ($O_2$) presenta un comportamento paramagnetico perché, secondo la teoria degli orbitali molecolari, possiede:",
  options:["Tutti gli elettroni appaiati","Elettroni spaiati negli orbitali di antilegame","Un legame covalente singolo","Solo legami ionici","Nessun elettrone di valenza"], correct:1 },

{ id:"leg-15", topic:"legami", type:"mc",
  q:"Il legame ionico si instaura tipicamente tra:",
  options:["Due non metalli","Due metalli","Un metallo e un non metallo","Due gas nobili","Due atomi identici"], correct:2 },

{ id:"leg-16", topic:"legami", type:"mc",
  q:"Nella formazione di un legame ionico, il metallo tende a:",
  options:["Acquistare elettroni","Cedere elettroni","Condividere elettroni in parti uguali","Formare un legame dativo","Non reagire"], correct:1 },

{ id:"leg-17", topic:"legami", type:"mc",
  q:"I composti ionici, allo stato solido:",
  options:["Conducono bene la corrente elettrica","Non conducono corrente elettrica, perché gli ioni occupano posizioni fisse nel reticolo","Sono sempre gassosi","Hanno basse temperature di fusione","Non formano strutture cristalline"], correct:1 },

{ id:"leg-18", topic:"legami", type:"mc",
  q:"I composti ionici fusi o disciolti in acqua:",
  options:["Non conducono comunque corrente elettrica","Diventano conduttori di corrente elettrica","Perdono la loro carica","Si trasformano in composti covalenti","Diventano gassosi"], correct:1 },

{ id:"leg-19", topic:"legami", type:"mc",
  q:"Il legame metallico è dovuto all'attrazione tra:",
  options:["Due nuclei atomici","Cationi metallici disposti in un reticolo e gli elettroni di valenza delocalizzati","Due anioni","Molecole polari e apolari","Ioni positivi e negativi in un composto binario"], correct:1 },

{ id:"leg-20", topic:"legami", type:"mc",
  q:"Quale proprietà dei metalli è spiegata direttamente dalla mobilità degli elettroni nel legame metallico?",
  options:["L'elevata temperatura di fusione","La bassa densità","La buona conducibilità elettrica e termica","La fragilità","L'elevata elettronegatività"], correct:2 },

{ id:"leg-21", topic:"legami", type:"mc",
  q:"Il legame a idrogeno si forma tipicamente quando l'idrogeno è legato covalentemente a:",
  options:["Carbonio","Zolfo","Fosforo","Un atomo piccolo e molto elettronegativo come F, O o N","Qualsiasi elemento della tavola periodica"], correct:3 },

{ id:"leg-22", topic:"legami", type:"mc",
  q:"Rispetto al legame covalente, il legame a idrogeno è generalmente:",
  options:["Più forte e più corto","Più debole e più lungo","Di intensità identica","Privo di energia","Impossibile da rompere"], correct:1 },

{ id:"leg-23", topic:"legami", type:"mc",
  q:"La particolare struttura del ghiaccio, meno densa dell'acqua liquida, è dovuta a:",
  options:["Legami ionici tra le molecole d'acqua","Legami a idrogeno che dispongono le molecole in una struttura aperta","L'assenza di legami tra le molecole","Legami metallici","Un'elevata pressione interna"], correct:1 },

{ id:"leg-24", topic:"legami", type:"mc",
  q:"Le forze di London (o forze di dispersione) sono forze attrattive che si instaurano tra:",
  options:["Ioni di carica opposta","Molecole polari con dipolo permanente","Molecole non polari, tramite dipoli istantanei","Atomi legati covalentemente nella stessa molecola","Cationi metallici"], correct:2 },

{ id:"leg-25", topic:"legami", type:"mc",
  q:"L'intensità delle forze di London è inversamente proporzionale:",
  options:["Alla prima potenza della distanza","Al quadrato della distanza","Alla sesta potenza della distanza","Alla temperatura assoluta","Alla massa molecolare"], correct:2 },

{ id:"leg-26", topic:"legami", type:"mc",
  q:"Il legame idrofobico è la forza che tiene unite tra loro:",
  options:["Molecole polari in acqua","Ioni di carica opposta","Molecole non polari, per minimizzare il contatto con l'acqua","Atomi dello stesso elemento tramite legame covalente","Cationi metallici in un reticolo"], correct:2 },

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
  options:["Solfuro di potassio","Solfato di potassio","Solfito di potassio","Idrogeno solfato di potassio","Idrogeno solfuro di potassio"], correct:0 },

{ id:"nom-02", topic:"nomenclatura", type:"mc",
  q:"Il nitrito di cadmio corrisponde a:",
  options:["$CdNO_2$","$Cd(NO_2)_2$","$Ca(NO_2)_2$","$Cd(NO_3)_2$","$Ca(NO_3)_2$"], correct:1,
  explain:"Il cadmio forma tipicamente lo ione $Cd^{2+}$; il nitrito è $NO_2^-$, quindi la formula è $Cd(NO_2)_2$." },

{ id:"nom-03", topic:"nomenclatura", type:"mc",
  q:"Il nome del composto $KMnO_4$ è:",
  options:["Permanganato di potassio","Manganato di potassio","Ipomanganito di potassio","Manganito di potassio","Ipomanganato di potassio"], correct:0 },

{ id:"nom-04", topic:"nomenclatura", type:"mc",
  q:"I sali sono composti che si formano dalla reazione di:",
  options:["Un ossidante e un riducente","Un ossido e un metallo","Un non metallo con ossigeno","Un acido e una base","Un idruro e un metallo"], correct:3 },

{ id:"nom-05", topic:"nomenclatura", type:"mc",
  q:"L'anione derivante dall'atomo di idrogeno è detto:",
  options:["Idrogenione","Ione idrogeno","Ione idruro","Ione ossidrilico","Radicale ossidrile"], correct:2 },

{ id:"nom-06", topic:"nomenclatura", type:"mc",
  q:"La formula del nitrato di ammonio è:",
  options:["$NH_3NO_3$","$NH_4NO_3$","$NH_2NO_3$","$(NH_4)_2NO_3$","$NH_4NO_2$"], correct:1 },

{ id:"nom-07", topic:"nomenclatura", type:"mc",
  q:"La formula molecolare di un composto ci permette di conoscere:",
  options:["La geometria della molecola","Solo il tipo degli atomi che lo compongono","Il tipo e il numero di atomi","La struttura della molecola","La dimensione della molecola"], correct:2 },

{ id:"nom-08", topic:"nomenclatura", type:"mc",
  q:"L'ossido di magnesio corrisponde alla formula:",
  options:["$Mg(OH)_2$","$MgO_2$","$MgO$","$Mn_2O_2$","$MnO$"], correct:2 },

{ id:"nom-09", topic:"nomenclatura", type:"mc",
  q:"La formula del bicarbonato di calcio è:",
  options:["$CaCO_3$","$Ca(HCO_3)_2$","$CaHCO_3$","$Ca_3(CO_3)_2$","$Ca(HCO_2)_2$"], correct:1 },

{ id:"nom-10", topic:"nomenclatura", type:"mc",
  q:"L'anidride dell'acido carbonico è:",
  options:["$HCOOH$","$CO_3$","$CO_2$","$CO$","$CH_3COOH$"], correct:2 },

{ id:"nom-11", topic:"nomenclatura", type:"mc",
  q:"Il fluoruro di magnesio corrisponde alla formula:",
  options:["$MgF$","$Mg(FO)_2$","$Mn_2F$","$MgF_2$","$MnF$"], correct:3 },

{ id:"nom-12", topic:"nomenclatura", type:"mc",
  q:"Indicare il catione alcalino.",
  options:["$Li^+$","$Ca^{2+}$","$Cl^-$","$Mg^{2+}$","$F^-$"], correct:0 },

{ id:"nom-13", topic:"nomenclatura", type:"mc",
  q:"L'anidride fosforosa corrisponde alla formula:",
  options:["$P_2O_5$","$P_2O_3$","$P_2O_2$","$FO$","$FO_2$"], correct:1 },

{ id:"nom-14", topic:"nomenclatura", type:"mc",
  q:"Il composto $MgH_2$ è:",
  options:["Acido magnesidrico","Idrossido di magnesio","Un idracido","Idruro di magnesio","Idruro di manganese"], correct:3 },

{ id:"nom-15", topic:"nomenclatura", type:"mc",
  q:"Quanti atomi di idrogeno sono presenti in una molecola di solfato d'ammonio, $(NH_4)_2SO_4$?",
  options:["8","10","9","12","6"], correct:0,
  explain:"Ci sono due gruppi $NH_4$, ciascuno con 4 atomi di H: $2\\times 4 = 8$." },

{ id:"nom-16", topic:"nomenclatura", type:"mc",
  q:"Una sola delle seguenti associazioni è ERRATA. Indicare quale:",
  options:["$HNO_2$ = acido nitroso","$NH_4B$ = ammonio bromuro","$H_3PO_4$ = acido ortofosforico","$H_2SO_3$ = acido solforoso","$H_2SO_4$ = acido solforico"], correct:1,
  explain:"Il bromuro di ammonio ha formula $NH_4Br$ (Br = bromo), non $NH_4B$ (B = boro); inoltre in italiano si dice \"bromuro di ammonio\", non \"ammonio bromuro\"." },

{ id:"nom-17", topic:"nomenclatura", type:"mc",
  q:"Gli ossidi basici sono formati da:",
  options:["Un elemento di transizione, ossigeno e idrogeno","Un non metallo, lo zolfo e l'ossigeno","Un metallo, lo zolfo e l'ossigeno","Un non metallo e l'ossigeno","Un metallo e l'ossigeno"], correct:4 },

{ id:"nom-18", topic:"nomenclatura", type:"mc",
  q:"Il composto $Cl_2O_7$ è:",
  options:["Anidride ipoclorosa","Anidride clorosa","Anidride perclorica","Ossido ipocloroso","Ossido clorico"], correct:2 },

{ id:"nom-19", topic:"nomenclatura", type:"mc",
  q:"L'acido solforico corrisponde alla formula:",
  options:["$H_2SO_4$","$H_2SO_3$","$H_2S$","$HSO_4$","$HSO_3$"], correct:0 },

{ id:"nom-20", topic:"nomenclatura", type:"mc",
  q:"L'acido (orto)fosforico corrisponde alla formula:",
  options:["$HPO_3$","$H_2P_2O_7$","$H_3PO_4$","$HPO_2$","$H_3PO_3$"], correct:2 },

{ id:"nom-21", topic:"nomenclatura", type:"mc",
  q:"Secondo la teoria VSEPR, qual è il principio fondamentale che determina la geometria di una molecola covalente?",
  options:["Gli atomi tendono a disporsi in modo da massimizzare il numero di legami doppi","Le coppie di elettroni di valenza si dispongono intorno al nucleo in modo da minimizzare la repulsione reciproca","La geometria è determinata esclusivamente dal numero di protoni nel nucleo centrale","Gli atomi tendono a disporsi in modo da massimizzare il numero di legami tripli","Gli elettroni non condivisi non influenzano la forma della molecola"], correct:1 },

{ id:"nom-22", topic:"nomenclatura", type:"mc",
  q:"Quale tra le seguenti molecole presenta una geometria angolare, secondo la teoria VSEPR?",
  options:["$CH_4$","$CO_2$","$H_2O$","$BF_3$","$PCl_5$"], correct:2 },

{ id:"nom-23", topic:"nomenclatura", type:"mc",
  q:"Qual è l'angolo di legame ideale in una geometria tetraedrica?",
  options:["90°","109,5°","120°","180°","104,5°"], correct:1 },

{ id:"nom-24", topic:"nomenclatura", type:"mc",
  q:"Secondo la teoria VSEPR, come si confronta l'angolo di legame di $H_2O$ con quello di $NH_3$?",
  options:["L'angolo di $H_2O$ è maggiore di quello di $NH_3$","L'angolo di $H_2O$ è maggiore di quello di $CH_4$","L'angolo di $CH_4$ è minore di quello di $NH_3$","L'angolo di $H_2O$ è minore di quello di $NH_3$","L'angolo di $NH_3$ è maggiore di quello di $CH_4$"], correct:3,
  explain:"$H_2O$ ha due coppie di elettroni non condivise (angolo 104,5°), $NH_3$ ne ha una sola (angolo 107,5°): più coppie solitarie comprimono maggiormente l'angolo di legame." },

{ id:"nom-25", topic:"nomenclatura", type:"mc",
  q:"Il numero di ossidazione dell'ossigeno nella maggior parte dei composti è:",
  options:["+1","-1","-2","+2","0"], correct:2 },

{ id:"nom-26", topic:"nomenclatura", type:"mc",
  q:"Il numero di ossidazione dell'ossigeno nei perossidi (es. $H_2O_2$) è:",
  options:["-2","-1","+1","+2","0"], correct:1 },

{ id:"nom-27", topic:"nomenclatura", type:"mc",
  q:"Il numero di ossidazione dell'idrogeno negli idruri metallici (es. NaH) è:",
  options:["+1","-1","+2","0","-2"], correct:1 },

{ id:"nom-28", topic:"nomenclatura", type:"mc",
  q:"La somma dei numeri di ossidazione degli elementi in un composto neutro è:",
  options:["Sempre positiva","Sempre negativa","Uguale a 0","Uguale al numero di atomi","Uguale alla carica del catione"], correct:2 },

{ id:"nom-29", topic:"nomenclatura", type:"mc",
  q:"La somma dei numeri di ossidazione degli elementi in uno ione poliatomico è uguale a:",
  options:["Zero sempre","La carica dello ione","Il numero di atomi presenti","Il numero atomico dell'elemento centrale","La massa molecolare dello ione"], correct:1 },

{ id:"nom-30", topic:"nomenclatura", type:"mc",
  q:"Il numero di ossidazione del fluoro in tutti i suoi composti è:",
  options:["+1","0","-1","+2","Variabile"], correct:2 },

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
  options:["Solo gli atomi centrali","La disposizione degli elettroni di valenza e dei legami tra gli atomi","Esclusivamente la carica nucleare","La velocità degli elettroni","La temperatura di fusione del composto"], correct:1 },

{ id:"geom-02", topic:"geometria", type:"mc",
  q:"Nella costruzione della struttura di Lewis, l'atomo centrale di una molecola è generalmente:",
  options:["Quello con la maggiore affinità elettronica","Quello con la minore affinità elettronica","Sempre l'idrogeno","Sempre l'ossigeno","Scelto casualmente"], correct:1 },

{ id:"geom-03", topic:"geometria", type:"mc",
  q:"Nella struttura di Lewis, l'atomo di idrogeno:",
  options:["È sempre l'atomo centrale","Può essere sia centrale che terminale","È sempre terminale, perché si lega a un solo atomo","Non compare mai nelle strutture di Lewis","Forma sempre legami dativi"], correct:2 },

{ id:"geom-04", topic:"geometria", type:"mc",
  q:"La geometria molecolare del metano ($CH_4$), secondo la teoria VSEPR, è:",
  options:["Lineare","Angolare","Piramidale a base triangolare","Tetraedrica","Planare"], correct:3 },

{ id:"geom-05", topic:"geometria", type:"mc",
  q:"La geometria molecolare dell'ammoniaca ($NH_3$), secondo la teoria VSEPR, è:",
  options:["Tetraedrica","Piramidale a base triangolare","Lineare","Angolare","Planare quadrata"], correct:1 },

{ id:"geom-06", topic:"geometria", type:"mc",
  q:"Perché l'angolo di legame in $NH_3$ (107,5°) è inferiore a quello ideale tetraedrico (109,5°)?",
  options:["Perché l'azoto è molto elettronegativo","Perché la coppia di elettroni non condivisa sull'azoto occupa più spazio e respinge maggiormente le coppie di legame","Perché l'idrogeno è troppo piccolo","Perché la molecola è ionica","Per un errore sperimentale"], correct:1 },

{ id:"geom-07", topic:"geometria", type:"mc",
  q:"Perché l'angolo di legame in $H_2O$ (104,5°) è ancora più ridotto rispetto a quello di $NH_3$?",
  options:["Perché l'ossigeno ha due coppie di elettroni non condivise, che respingono maggiormente le coppie di legame","Perché l'acqua è una molecola ionica","Perché l'idrogeno nell'acqua ha carica negativa","Perché la molecola d'acqua non rispetta la regola dell'ottetto","Non c'è alcuna differenza reale"], correct:0 },

{ id:"geom-08", topic:"geometria", type:"mc",
  q:"Nella molecola d'acqua, il numero di regioni di densità elettronica intorno all'atomo di ossigeno è:",
  options:["2","3","4","5","6"], correct:2,
  explain:"2 legami covalenti O–H più 2 coppie solitarie = 4 regioni di densità elettronica." },

{ id:"geom-09", topic:"geometria", type:"mc",
  q:"Una molecola con quattro regioni di densità elettronica, tutte impegnate in legami (nessuna coppia solitaria), ha geometria:",
  options:["Angolare","Piramidale","Tetraedrica","Lineare","Planare triangolare"], correct:2 },

{ id:"geom-10", topic:"geometria", type:"mc",
  q:"Le coppie di elettroni non condivise (di non legame), rispetto alle coppie di legame, generalmente:",
  options:["Occupano meno spazio e respingono meno","Occupano più spazio e respingono maggiormente le coppie adiacenti","Non hanno alcun effetto sulla geometria molecolare","Si comportano in modo identico alle coppie di legame","Eliminano la geometria tetraedrica"], correct:1 },

{ id:"geom-11", topic:"geometria", type:"mc",
  q:"La molecola di $CO_2$ è apolare, nonostante i legami $C=O$ siano polarizzati, perché:",
  options:["Il carbonio non è elettronegativo","La sua geometria lineare e simmetrica fa annullare vettorialmente i dipoli di legame","Non ci sono legami doppi","L'ossigeno non ha elettronegatività","È una molecola ionica"], correct:1 },

{ id:"geom-12", topic:"geometria", type:"mc",
  q:"Quale delle seguenti molecole è polare?",
  options:["$CO_2$","$CH_4$","$H_2O$","$BF_3$","$Cl_2$"], correct:2 },

{ id:"geom-13", topic:"geometria", type:"mc",
  q:"Una molecola con legami covalenti polarizzati può risultare complessivamente apolare se:",
  options:["Ha una geometria molecolare simmetrica che fa annullare vettorialmente i dipoli di legame","Ha un solo tipo di atomo","Non possiede elettroni di valenza","È sempre ionica","Non ha mai legami polarizzati"], correct:0 },

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
  options:["Na, K, Ca, Mg","C, H, O, N","Fe, Cu, Zn, Mn","P, S, Cl, I","C, N, P, S"], correct:1 },

{ id:"bio-02", topic:"biomolecole", type:"mc",
  q:"Qual è il componente chimico più abbondante delle cellule?",
  options:["Le proteine","I lipidi","L'acqua","Il DNA","Il glucosio"], correct:2 },

{ id:"bio-03", topic:"biomolecole", type:"mc",
  q:"Le macromolecole biologiche sono:",
  options:["Atomi isolati privi di legami","Polimeri costituiti da monomeri uniti da legami covalenti","Esclusivamente ioni inorganici","Molecole prive di carbonio","Sempre di natura lipidica"], correct:1 },

{ id:"bio-04", topic:"biomolecole", type:"mc",
  q:"Le macromolecole biologiche si formano mediante reazioni di:",
  options:["Ossidoriduzione","Condensazione","Sublimazione","Neutralizzazione","Precipitazione"], correct:1,
  explain:"La condensazione avviene con perdita di una molecola d'acqua; la degradazione avviene invece per idrolisi." },

{ id:"bio-05", topic:"biomolecole", type:"mc",
  q:"La degradazione delle macromolecole biologiche avviene generalmente mediante reazioni di:",
  options:["Condensazione","Idrolisi","Fosforilazione","Ossidazione","Polimerizzazione"], correct:1 },

{ id:"bio-06", topic:"biomolecole", type:"mc",
  q:"Quali sono le quattro principali classi di macromolecole biologiche?",
  options:["Vitamine, sali minerali, acqua, ormoni","Carboidrati, proteine, lipidi, acidi nucleici","Enzimi, recettori, canali, pompe","Actina, tubulina, miosina, cheratina","Glucosio, fruttosio, saccarosio, amido"], correct:1 },

{ id:"bio-07", topic:"biomolecole", type:"mc",
  q:"Quali ioni svolgono un ruolo importante come co-fattori di reazioni enzimatiche?",
  options:["$Na^+$ e $Cl^-$","$Ca^{2+}$ e $Mg^{2+}$","$K^+$ esclusivamente","Nessuno ione svolge questo ruolo","Solo ioni negativi"], correct:1 },

{ id:"bio-08", topic:"biomolecole", type:"mc",
  q:"Gli ioni $Na^+$, $K^+$ e $Cl^-$ svolgono un ruolo cruciale nella regolazione di:",
  options:["La pressione osmotica","Il numero di ossidazione del carbonio","La struttura del DNA","La sintesi proteica esclusivamente","Il codice genetico"], correct:0 },

{ id:"bio-09", topic:"biomolecole", type:"mc",
  q:"La polimerizzazione degli acidi nucleici, a differenza di quella di proteine e polisaccaridi, utilizza come precursori:",
  options:["Amminoacidi liberi","Zuccheri semplici","Nucleosidi trifosfato, con rilascio di pirofosfato","Acidi grassi liberi","Ioni metallici"], correct:2 },

{ id:"bio-10", topic:"biomolecole", type:"mc",
  q:"Il DNA, in base alla sua funzione biologica, è l'acido nucleico deputato principalmente a:",
  options:["La sintesi diretta di proteine","La conservazione dell'informazione genetica","Il controllo del traffico di membrana","La catalisi di reazioni biochimiche","Il trasporto di ossigeno"], correct:1 },

{ id:"bio-11", topic:"biomolecole", type:"mc",
  q:"L'RNA messaggero (mRNA) ha la funzione principale di:",
  options:["Conservare l'informazione genetica a lungo termine","Dirigere la sintesi delle proteine","Catalizzare reazioni metaboliche","Trasportare ioni attraverso le membrane","Costituire il citoscheletro"], correct:1 },

{ id:"bio-12", topic:"biomolecole", type:"mc",
  q:"Quale categoria di RNA è coinvolta nel controllo dell'espressione genica (es. miRNA, siRNA)?",
  options:["RNA messaggero","RNA ribosomale","RNA regolatori","RNA di trasporto (tRNA)","DNA"], correct:2 },

{ id:"bio-13", topic:"biomolecole", type:"mc",
  q:"Il nucleotide dAMP è composto da 2'-deossi-D-ribosio, una base azotata (adenina) e:",
  options:["Un gruppo amminico","Un gruppo fosfato","Un gruppo carbossilico","Un gruppo ossidrilico aggiuntivo","Un gruppo solfato"], correct:1,
  explain:"Domanda ispirata alla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"bio-14", topic:"biomolecole", type:"mc",
  q:"Le proteine, in base alla loro funzione biologica, possono agire come:",
  options:["Esclusivamente strutture di deposito","Solo come enzimi","Enzimi, proteine strutturali, di trasporto, recettori e molte altre funzioni","Solo come recettori di membrana","Esclusivamente come anticorpi"], correct:2 },

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
  options:["$CH_2O$","$C_2H_5OH$","$COOH$","$NH_2CHRCOOH$","$C_nH_{2n}$"], correct:0 },

{ id:"bio-22", topic:"biomolecole", type:"mc",
  q:"I gruppi funzionali caratteristici dei carboidrati sono:",
  options:["Il gruppo carbonilico (aldeidico o chetonico) e il gruppo ossidrilico","Il gruppo amminico e il gruppo carbossilico","Il gruppo fosfato e la base azotata","Il gruppo solfidrilico","Il gruppo carbossilico soltanto"], correct:0 },

{ id:"bio-23", topic:"biomolecole", type:"mc",
  q:"I monosaccaridi vengono classificati in base alla posizione del gruppo carbonilico in:",
  options:["Aldosi e chetosi","Furani e pirani","Alfa e beta","Ciclici e lineari","Riducenti e non riducenti"], correct:0 },

{ id:"bio-24", topic:"biomolecole", type:"mc",
  q:"In soluzione acquosa, un monosaccaride come il glucosio ciclizza spontaneamente formando un centro chirale addizionale, detto:",
  options:["Carbonio anomerico","Carbonio asimmetrico primario","Carbonio anomerico beta soltanto","Centro racemico","Carbonio terminale"], correct:0 },

{ id:"bio-25", topic:"biomolecole", type:"mc",
  q:"I due stereoisomeri che il glucosio può assumere dopo la ciclizzazione, a seconda dell'orientazione dell'ossidrile sul carbonio anomerico, si chiamano:",
  options:["Anomero α e anomero β","Isomero D e isomero L","Forma cis e forma trans","Aldosio e chetosio","Furanosio e glucosio"], correct:0 },

{ id:"bio-26", topic:"biomolecole", type:"mc",
  q:"Il legame che unisce due monosaccaridi, formatosi con perdita di una molecola d'acqua, si chiama:",
  options:["Legame glicosidico","Legame peptidico","Legame fosfodiesterico","Legame estere semplice","Legame a idrogeno"], correct:0 },

{ id:"bio-27", topic:"biomolecole", type:"mc",
  q:"Il disaccaride saccarosio (zucchero da cucina) è formato dall'unione, tramite legame α1-2, di:",
  options:["Glucosio e fruttosio","Glucosio e galattosio","Due molecole di glucosio","Galattosio e fruttosio","Due molecole di fruttosio"], correct:0 },

{ id:"bio-28", topic:"biomolecole", type:"mc",
  q:"Il disaccaride lattosio, presente nel latte, è costituito da:",
  options:["Galattosio legato con legame β1-4 al glucosio","Due molecole di glucosio legate α1-4","Glucosio e fruttosio legati α1-2","Due molecole di galattosio","Fruttosio legato al galattosio"], correct:0 },

{ id:"bio-29", topic:"biomolecole", type:"mc",
  q:"Gli oligosaccaridi, legati a proteine o lipidi di membrana per formare rispettivamente glicoproteine e glicolipidi, svolgono principalmente una funzione di:",
  options:["Riconoscimento cellulare (es. determinazione dei gruppi sanguigni nel sistema AB0)","Riserva energetica primaria","Catalisi enzimatica","Trasmissione dell'informazione genetica","Trasporto di ossigeno"], correct:0 },

{ id:"bio-30", topic:"biomolecole", type:"mc",
  q:"I polisaccaridi costituiti da un unico tipo di monosaccaride ripetuto si dicono:",
  options:["Omopolisaccaridi","Eteropolisaccaridi","Oligosaccaridi","Disaccaridi","Glicoproteine"], correct:0 },

{ id:"bio-31", topic:"biomolecole", type:"mc",
  q:"L'amido, polisaccaride di riserva delle piante, è costituito da:",
  options:["Amilosio (catena lineare, legami α1-4) e amilopectina (ramificata, legami α1-4 con ramificazioni α1-6)","Solo amilosio ramificato","Catene di glucosio unite da legami β1-4","Un'unica catena non ramificata di fruttosio","Unità alternate di glucosio e galattosio"], correct:0 },

{ id:"bio-32", topic:"biomolecole", type:"mc",
  q:"Il glicogeno, principale polisaccaride di riserva energetica negli animali, è accumulato soprattutto in:",
  options:["Fegato e muscoli","Tessuto adiposo ed encefalo","Reni e polmoni","Sangue e linfa","Pelle e ossa"], correct:0 },

{ id:"bio-33", topic:"biomolecole", type:"mc",
  q:"La cellulosa, a differenza dell'amido e del glicogeno, è formata da unità di glucosio unite da legami:",
  options:["β1-4, che generano una catena lineare rigida non digeribile dall'uomo","α1-4, facilmente digeribili","α1-6, tipici delle ramificazioni","Peptidici","Fosfodiesterici"], correct:0,
  explain:"L'uomo non possiede l'enzima in grado di idrolizzare il legame β1-4 della cellulosa, che per questo risulta indigeribile (fibra alimentare)." },

{ id:"bio-34", topic:"biomolecole", type:"fill",
  q:"L'unità più semplice dei carboidrati, non ulteriormente idrolizzabile, è il ________.",
  answer:"MONOSACCARIDE" },

/* ============================= AMMINOACIDI E PROTEINE ============================= */

{ id:"prot-01", topic:"proteine", type:"mc",
  q:"Le proteine sono polimeri costituiti da monomeri chiamati:",
  options:["Nucleotidi","Amminoacidi","Monosaccaridi","Acidi grassi","Basi azotate"], correct:1 },

{ id:"prot-02", topic:"proteine", type:"mc",
  q:"Quanti amminoacidi standard compongono le proteine?",
  options:["10","15","20","25","30"], correct:2 },

{ id:"prot-03", topic:"proteine", type:"mc",
  q:"Ogni amminoacido presenta un gruppo amminico, un gruppo carbossilico, un atomo di idrogeno e:",
  options:["Un secondo gruppo carbossilico","Un gruppo funzionale R (catena laterale) variabile","Sempre un anello aromatico","Un gruppo fosfato","Un gruppo ossidrilico obbligatorio"], correct:1 },

{ id:"prot-04", topic:"proteine", type:"mc",
  q:"A pH fisiologico, il gruppo amminico di un amminoacido è tipicamente:",
  options:["Carico negativamente","Neutro e non dissociato","Carico positivamente ($NH_3^+$)","Assente","Legato covalentemente a un fosfato"], correct:2 },

{ id:"prot-05", topic:"proteine", type:"mc",
  q:"A pH fisiologico, il gruppo carbossilico di un amminoacido è tipicamente:",
  options:["Carico positivamente","Neutro","Carico negativamente ($COO^-$)","Sempre legato al gruppo amminico di un altro amminoacido","Assente"], correct:2 },

{ id:"prot-06", topic:"proteine", type:"mc",
  q:"Gli amminoacidi si possono classificare, in base alla catena laterale, in:",
  options:["Solo acidi e basici","Polari con carica, polari senza carica e non polari","Solo essenziali e non essenziali","Solo di tipo L e D","Solo aromatici e alifatici"], correct:1 },

{ id:"prot-07", topic:"proteine", type:"mc",
  q:"Quale amminoacido, privo di un centro chirale, non presenta isomeria ottica?",
  options:["Alanina","Valina","Glicina","Leucina","Serina"], correct:2 },

{ id:"prot-08", topic:"proteine", type:"mc",
  q:"Gli amminoacidi tipicamente presenti nelle proteine appartengono alla serie:",
  options:["D","L","Sia D che L in ugual misura","Meso","Racemica"], correct:1 },

{ id:"prot-09", topic:"proteine", type:"mc",
  q:"Il legame peptidico si forma tra:",
  options:["Due gruppi carbossilici","Due gruppi amminici","Il gruppo carbossilico di un amminoacido e il gruppo amminico di un altro, con perdita di acqua","Due catene laterali R","Un gruppo fosfato e un gruppo ossidrilico"], correct:2 },

{ id:"prot-10", topic:"proteine", type:"mc",
  q:"Il legame peptidico si forma tramite una reazione di:",
  options:["Idrolisi","Condensazione","Ossidoriduzione","Fosforilazione","Decarbossilazione"], correct:1 },

{ id:"prot-11", topic:"proteine", type:"mc",
  q:"Una catena polipeptidica cresce in direzione:",
  options:["Dal C-terminale verso l'N-terminale","Dall'N-terminale verso il C-terminale","Casuale","Dal centro verso le estremità","Non ha una direzionalità definita"], correct:1 },

{ id:"prot-12", topic:"proteine", type:"mc",
  q:"La struttura primaria di una proteina è definita da:",
  options:["Il ripiegamento tridimensionale della catena","La sequenza di amminoacidi nella catena polipeptidica","L'associazione di più subunità","Le interazioni idrofobiche","I legami a idrogeno tra foglietti β"], correct:1 },

{ id:"prot-13", topic:"proteine", type:"mc",
  q:"Quale forza chimica mantiene la struttura primaria di una proteina?",
  options:["Legami a idrogeno","Interazioni idrofobiche","Il legame peptidico covalente","Forze di van der Waals","Ponti disolfuro"], correct:2 },

{ id:"prot-14", topic:"proteine", type:"mc",
  q:"La struttura secondaria di una proteina è stabilizzata principalmente da:",
  options:["Ponti disolfuro","Legami a idrogeno tra i gruppi C=O e N–H dello scheletro peptidico","Interazioni elettrostatiche tra catene laterali","Legami covalenti tra amminoacidi non adiacenti","Forze di van der Waals esclusivamente"], correct:1 },

{ id:"prot-15", topic:"proteine", type:"mc",
  q:"L'α-elica è una struttura secondaria che si avvolge generalmente in senso:",
  options:["Sinistrorso","Destrorso","Non ha una chiralità definita","Orizzontale","Variabile in modo casuale"], correct:1 },

{ id:"prot-16", topic:"proteine", type:"mc",
  q:"Quanti amminoacidi per giro caratterizzano tipicamente l'α-elica?",
  options:["Circa 2","Circa 3,6","Circa 5","Circa 8","Circa 10"], correct:1 },

{ id:"prot-17", topic:"proteine", type:"mc",
  q:"Nel foglietto β antiparallelo, i filamenti adiacenti procedono:",
  options:["Nella stessa direzione N→C","In direzioni opposte","In modo perpendicolare tra loro","Solo in direzione C→N","Non hanno una direzione definita"], correct:1 },

{ id:"prot-18", topic:"proteine", type:"mc",
  q:"I 'turn' o ripiegamenti β, che permettono alla catena polipeptidica di cambiare bruscamente direzione, sono frequentemente costituiti da:",
  options:["Leucina e valina","Glicina e prolina","Lisina e arginina","Triptofano e fenilalanina","Cisteina e metionina"], correct:1 },

{ id:"prot-19", topic:"proteine", type:"mc",
  q:"La struttura terziaria di una proteina rappresenta:",
  options:["La sola sequenza amminoacidica","L'associazione di più catene polipeptidiche","La forma tridimensionale complessiva di una singola catena polipeptidica","Un tipo di modificazione post-traduzionale","La composizione percentuale in amminoacidi"], correct:2 },

{ id:"prot-20", topic:"proteine", type:"mc",
  q:"Quale forza NON contribuisce alla stabilizzazione della struttura terziaria delle proteine?",
  options:["Interazioni idrofobiche","Legami a idrogeno","Interazioni elettrostatiche (ponti salini)","Ponti disolfuro","Il legame fosfodiestere"], correct:4,
  explain:"Il legame fosfodiestere è tipico degli acidi nucleici (DNA/RNA), non delle proteine." },

{ id:"prot-21", topic:"proteine", type:"mc",
  q:"I ponti disolfuro si formano tra i gruppi sulfidrilici (–SH) delle catene laterali di:",
  options:["Metionina","Cisteina","Serina","Treonina","Istidina"], correct:1 },

{ id:"prot-22", topic:"proteine", type:"mc",
  q:"La struttura quaternaria di una proteina si riferisce a:",
  options:["La sequenza di amminoacidi","Il ripiegamento di una singola catena polipeptidica","L'associazione di più catene polipeptidiche (subunità)","Le sole modificazioni post-traduzionali","La localizzazione cellulare della proteina"], correct:2 },

{ id:"prot-23", topic:"proteine", type:"mc",
  q:"Le amminoacil-tRNA sintetasi catalizzano il legame tra un amminoacido e il tRNA coinvolgendo:",
  options:["Il gruppo $NH_2$ dell'amminoacido con l'estremità 5' del tRNA","Il gruppo $COOH$ dell'amminoacido con l'estremità 3'-OH del tRNA","Il gruppo $NH_2$ dell'amminoacido con l'estremità 3'-OH del tRNA","Due molecole di tRNA diverse","Il codone dell'mRNA direttamente"], correct:1,
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
  options:["Apolari (es. glicina, alanina, valina, leucina, isoleucina, metionina, prolina)","Polari carichi negativamente","Polari carichi positivamente","Aromatici soltanto","Essenziali"], correct:0 },

{ id:"prot-35", topic:"proteine", type:"mc",
  q:"Gli amminoacidi in grado di interagire con l'acqua e di formare legami idrogeno, spesso esposti sulla superficie della proteina, sono detti:",
  options:["Polari non carichi (es. serina, treonina, asparagina, glutammina, tirosina, cisteina)","Apolari","Basici","Essenziali soltanto","Acidi"], correct:0 },

{ id:"prot-36", topic:"proteine", type:"mc",
  q:"Gli amminoacidi carichi negativamente a pH fisiologico, come l'acido aspartico e l'acido glutammico, si dicono amminoacidi:",
  options:["Acidi","Basici","Apolari","Aromatici","Essenziali"], correct:0 },

{ id:"prot-37", topic:"proteine", type:"mc",
  q:"Lisina, arginina e istidina, capaci di accettare protoni e presentare carica positiva, appartengono alla classe degli amminoacidi:",
  options:["Basici","Acidi","Apolari","Polari non carichi","Aromatici soltanto"], correct:0 },

{ id:"prot-38", topic:"proteine", type:"mc",
  q:"Gli amminoacidi essenziali sono quelli che:",
  options:["L'organismo non è in grado di sintetizzare e devono essere assunti con la dieta","Vengono sintetizzati a partire da altri intermedi metabolici","Non partecipano mai alla struttura delle proteine","Sono presenti solo negli organismi vegetali","Non possiedono un centro chirale"], correct:0,
  explain:"Nell'uomo sono nove: fenilalanina, valina, treonina, triptofano, metionina, leucina, isoleucina, lisina e istidina." },

{ id:"prot-39", topic:"proteine", type:"mc",
  q:"Un amminoacido si definisce anfotero perché:",
  options:["Possiede sia un gruppo acido (-COOH) sia un gruppo basico (-NH₂) e può comportarsi come acido o come base a seconda del pH","Non ha mai carica netta","Non può dissociarsi in acqua","È sempre carico positivamente","Non presenta un gruppo carbossilico"], correct:0 },

{ id:"prot-40", topic:"proteine", type:"mc",
  q:"Al pH fisiologico, detto punto isoelettrico, un amminoacido si trova prevalentemente nella forma di:",
  options:["Zwitterione, con gruppo carbossilico dissociato (-COO⁻) e gruppo amminico protonato (-NH₃⁺), a carica netta nulla","Forma completamente anionica, a carica netta -1","Forma completamente cationica, a carica netta +1","Forma neutra priva di cariche parziali","Forma radicalica"], correct:0 },

{ id:"prot-41", topic:"proteine", type:"mc",
  q:"Il 'dogma di Anfisen', formulato in seguito a esperimenti sulla ribonucleasi, afferma che:",
  options:["Tutta l'informazione necessaria per il corretto ripiegamento tridimensionale di una proteina è già contenuta nella sua sequenza di amminoacidi (struttura primaria)", "Il ripiegamento di una proteina richiede sempre un manuale di istruzioni esterno", "Le proteine denaturate non possono mai recuperare la loro struttura originale", "Il ripiegamento proteico dipende esclusivamente dalla temperatura", "Ogni proteina ha una struttura primaria diversa da quella codificata dal gene"], correct:0 },

{ id:"prot-42", topic:"proteine", type:"mc",
  q:"Lo chaperone molecolare Hsp70 (heat shock protein 70) assiste il ripiegamento di una proteina nascente:",
  options:["Legandosi temporaneamente ai tratti idrofobici esposti mentre la catena esce dal ribosoma, impedendo aggregazioni scorrette","Tagliando la catena polipeptidica in frammenti più piccoli","Isolando la proteina in un compartimento cavo chiuso da un coperchio","Aggiungendo gruppi fosfato alla catena nascente","Degradando la proteina non ripiegata correttamente"], correct:0 },

{ id:"prot-43", topic:"proteine", type:"mc",
  q:"Il sistema chaperonina GroEL/GroES assiste il folding di proteine che faticano a ripiegarsi da sole:",
  options:["Isolandole in una cavità simile a un 'barile' chiuso da un coperchio, dove possono esplorare le conformazioni possibili usando energia (ATP)","Legandosi solo ai tratti idrofilici della proteina","Tagliando la proteina in pezzi più piccoli e riassemblandola casualmente","Marcandola con ubiquitina per la degradazione","Trasportandola direttamente al nucleo"], correct:0 },

{ id:"prot-44", topic:"proteine", type:"mc",
  q:"Molte proteine vengono sintetizzate come precursori inattivi (pro-proteine): un esempio è la proinsulina, che contiene un tratto in più (il peptide C) rimosso da un taglio proteolitico prima che la proteina assuma la forma attiva dell'ormone. Questo meccanismo serve principalmente a:",
  options:["Evitare che la proteina sia già attiva, e quindi potenzialmente dannosa, all'interno della cellula che la produce","Aumentare la stabilità termica della proteina","Facilitarne il trasporto nel nucleo","Aumentare la sua massa molecolare in modo permanente","Impedirne la degradazione da parte del proteasoma"], correct:0 },

{ id:"prot-45", topic:"proteine", type:"mc",
  q:"I ponti disolfuro tra residui di cisteina si formano tipicamente:",
  options:["Solo in ambiente ossidante, come il lume del reticolo endoplasmatico, e sono quindi frequenti nelle proteine extracellulari o di membrana","Solo nel citoplasma, ambiente riducente","In qualunque compartimento cellulare indifferentemente","Solo nei mitocondri","Solo durante la trascrizione del gene"], correct:0 },

{ id:"prot-46", topic:"proteine", type:"mc",
  q:"Le proteine destinate al reticolo endoplasmatico possiedono, all'estremità N-terminale, una breve sequenza di amminoacidi chiamata:",
  options:["Peptide segnale, riconosciuto dalla particella SRP (Signal Recognition Particle)","Codone di stop","Anticodone","Peptide C","Cappuccio 5'"], correct:0 },

{ id:"prot-47", topic:"proteine", type:"mc",
  q:"Le proteine mal ripiegate, riconosciute dal sistema di sorveglianza cellulare, vengono marcate per la degradazione tramite legame covalente ripetuto a piccole molecole di ubiquitina, in una cascata a tre enzimi indicati come:",
  options:["E1, E2, E3","A1, A2, A3","P1, P2, P3","K1, K2, K3","U1, U2, U3"], correct:0 },

{ id:"prot-48", topic:"proteine", type:"mc",
  q:"La catena di poliubiquitina che marca una proteina bersaglio per la degradazione viene riconosciuta ed elaborata da:",
  options:["Il proteasoma 26S","I ribosomi liberi","Il reticolo endoplasmatico liscio","I perossisomi","Il nucleolo"], correct:0 },

{ id:"prot-49", topic:"proteine", type:"mc",
  q:"In base alla forma generale e alla funzione biologica, le proteine si distinguono in:",
  options:["Proteine fibrose (allungate, spesso insolubili, funzioni strutturali, es. collagene, cheratina) e proteine globulari (compatte, solubili, funzioni dinamiche, es. emoglobina, enzimi)","Solo proteine di membrana e proteine citosoliche","Proteine acide e proteine basiche soltanto","Proteine primarie e proteine secondarie","Proteine essenziali e non essenziali"], correct:0 },

{ id:"prot-50", topic:"proteine", type:"fill",
  q:"A pH molto acido, un amminoacido assume la forma cationica, con carica netta pari a ________.",
  answer:"+1" },

{ id:"prot-51", topic:"proteine", type:"fill",
  q:"L'addizione di catene di zuccheri alla superficie di una proteina, che ne favorisce il riconoscimento, la stabilità e la funzione, si chiama ________.",
  answer:"GLICOSILAZIONE" },

/* ============================= ENZIMI E METABOLISMO ============================= */

{ id:"enz-01", topic:"enzimi", type:"mc",
  q:"Gli enzimi sono definiti biologicamente come:",
  options:["Ormoni steroidei","Catalizzatori biologici","Acidi nucleici catalitici esclusivamente","Componenti strutturali della membrana","Zuccheri complessi"], correct:1 },

{ id:"enz-02", topic:"enzimi", type:"mc",
  q:"Una delle principali caratteristiche degli enzimi è che:",
  options:["Vengono consumati durante la reazione catalizzata","Non vengono modificati permanentemente durante la reazione e sono riutilizzabili","Modificano l'equilibrio della reazione chimica","Funzionano solo ad altissime concentrazioni","Sono privi di specificità"], correct:1 },

{ id:"enz-03", topic:"enzimi", type:"mc",
  q:"Gli enzimi accelerano una reazione chimica agendo su:",
  options:["La costante di equilibrio della reazione","L'energia di attivazione della reazione","La quantità di prodotto finale ottenibile","La temperatura ambiente","La pressione del sistema"], correct:1,
  explain:"Gli enzimi abbassano l'energia di attivazione, rendendo la reazione più veloce, senza alterarne l'equilibrio." },

{ id:"enz-04", topic:"enzimi", type:"mc",
  q:"Il sito attivo di un enzima ha un'affinità particolarmente elevata per:",
  options:["Il prodotto finale della reazione","Lo stato di transizione del substrato","Qualsiasi molecola presente nella cellula","Gli ioni metallici esclusivamente","L'acqua"], correct:1 },

{ id:"enz-05", topic:"enzimi", type:"mc",
  q:"Nella cinetica enzimatica, $V_{max}$ rappresenta:",
  options:["La concentrazione di substrato a metà della velocità massima","La velocità massima di reazione, raggiunta quando l'enzima è saturo di substrato","La velocità minima possibile della reazione","La costante di equilibrio della reazione","Il numero di siti attivi dell'enzima"], correct:1 },

{ id:"enz-06", topic:"enzimi", type:"mc",
  q:"$K_m$ rappresenta:",
  options:["La velocità massima della reazione enzimatica","La concentrazione di substrato che corrisponde a $V_{max}/2$","Il numero di turnover dell'enzima","La costante di equilibrio della reazione catalizzata","La temperatura ottimale dell'enzima"], correct:1 },

{ id:"enz-07", topic:"enzimi", type:"mc",
  q:"Un basso valore di $K_m$ indica che l'enzima lega il substrato:",
  options:["Molto inefficientemente","Molto efficientemente (alta affinità)","In modo indipendente dalla concentrazione","Solo a temperature elevate","Mai"], correct:1 },

{ id:"enz-08", topic:"enzimi", type:"mc",
  q:"Il catabolismo è un processo:",
  options:["Endoenergetico che costruisce molecole complesse","Esoenergetico, che degrada molecole complesse per ottenere energia","Che avviene solo nel nucleo","Indipendente dagli enzimi","Che richiede sempre ATP come substrato iniziale"], correct:1 },

{ id:"enz-09", topic:"enzimi", type:"mc",
  q:"L'anabolismo è un processo:",
  options:["Esoenergetico di degradazione","Endoenergetico, che costruisce molecole complesse a partire da molecole semplici","Che libera sempre $CO_2$ e $H_2O$","Indipendente dall'energia","Tipico solo delle reazioni cataboliche"], correct:1 },

{ id:"enz-10", topic:"enzimi", type:"mc",
  q:"Durante la degradazione del glucosio a $CO_2$ e $H_2O$, l'energia liberata viene recuperata dalla cellula principalmente sotto forma di:",
  options:["Solo calore disperso","ATP e coenzimi ridotti come NADH e $FADH_2$","Esclusivamente altro glucosio","Acqua pura","Ioni inorganici"], correct:1 },

{ id:"enz-11", topic:"enzimi", type:"mc",
  q:"Le reazioni anaboliche, come la sintesi proteica a partire dagli amminoacidi, richiedono energia generalmente fornita da:",
  options:["NADH esclusivamente","ATP","Il glucosio direttamente","La luce solare","Nessuna fonte di energia è richiesta"], correct:1 },

{ id:"enz-12", topic:"enzimi", type:"mc",
  q:"Il potere riducente necessario per molte reazioni anaboliche è fornito soprattutto sotto forma di:",
  options:["NADH","NADPH","ATP esclusivamente","$CO_2$","Acqua"], correct:1 },

{ id:"enz-13", topic:"enzimi", type:"mc",
  q:"L'alcol deidrogenasi, durante la fermentazione, catalizza la riduzione di:",
  options:["Il glucosio a piruvato","L'acetaldeide a etanolo","L'etanolo ad acido acetico","Il piruvato a lattato","L'ATP ad ADP"], correct:1 },

{ id:"enz-14", topic:"enzimi", type:"mc",
  q:"Le vie metaboliche cellulari sono generalmente:",
  options:["Completamente isolate e indipendenti tra loro","Interconnesse tra loro","Attive solo negli organismi unicellulari","Indipendenti dagli enzimi","Sempre esclusivamente cataboliche"], correct:1 },

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
  options:["Ioni metallici (es. $Zn^{2+}$, $Mg^{2+}$, $Fe^{2+}$), che stabilizzano cariche nel sito attivo o partecipano a trasferimenti di elettroni","Solo altre proteine","Solo carboidrati semplici","Solo acidi grassi","Solo acqua"], correct:0 },

{ id:"enz-22", topic:"enzimi", type:"mc",
  q:"I coenzimi organici, come il NADH e il FAD/FADH₂, svolgono principalmente la funzione di:",
  options:["Trasportare elettroni nelle reazioni di ossidoriduzione","Fornire energia meccanica diretta","Formare il sito attivo dell'enzima da soli","Sostituire il substrato nella reazione","Inibire irreversibilmente l'enzima"], correct:0 },

{ id:"enz-23", topic:"enzimi", type:"mc",
  q:"Se manca il coenzima necessario, ad esempio per una carenza vitaminica, un enzima può risultare:",
  options:["Strutturalmente intatto ma funzionalmente inattivo","Immediatamente degradato dal proteasoma","Più attivo del normale","Trasformato in un inibitore competitivo","Privo di struttura primaria"], correct:0 },

{ id:"enz-24", topic:"enzimi", type:"mc",
  q:"Nel modello 'chiave-serratura' dell'interazione enzima-substrato:",
  options:["Il sito attivo ha una forma rigida, complementare a quella del substrato","Il sito attivo cambia forma per adattarsi al substrato","L'enzima si lega solo a substrati carichi negativamente","Non è previsto alcun legame specifico enzima-substrato","Il substrato modifica permanentemente la struttura primaria dell'enzima"], correct:0 },

{ id:"enz-25", topic:"enzimi", type:"mc",
  q:"Nel modello dell'adattamento indotto (induced fit):",
  options:["Il sito attivo dell'enzima si adatta alla forma del substrato al momento del legame","Il substrato deve avere già una forma identica al sito attivo","Non avviene alcun cambiamento conformazionale","L'enzima perde la sua struttura terziaria","Il legame avviene solo in assenza di cofattori"], correct:0 },

{ id:"enz-26", topic:"enzimi", type:"mc",
  q:"Il pH influenza l'attività enzimatica principalmente perché:",
  options:["Determina lo stato di protonazione dei gruppi chimici coinvolti nel legame col substrato, e un pH troppo diverso dall'optimum può denaturare l'enzima","Non ha alcun effetto sull'enzima","Modifica solo la temperatura della soluzione","Cambia la sequenza amminoacidica dell'enzima","Agisce solo sugli enzimi extracellulari"], correct:0 },

{ id:"enz-27", topic:"enzimi", type:"mc",
  q:"Aumentando la temperatura oltre l'optimum di un enzima, l'attività enzimatica:",
  options:["Crolla, perché l'energia termica rompe i legami deboli che tengono in piedi la struttura terziaria, denaturando la proteina","Continua ad aumentare indefinitamente","Resta sempre costante","Aumenta solo se l'enzima ha cofattori metallici","Diventa indipendente dalla concentrazione di substrato"], correct:0 },

{ id:"enz-28", topic:"enzimi", type:"mc",
  q:"Aumentando la concentrazione di substrato oltre un certo valore, la velocità di una reazione enzimatica:",
  options:["Raggiunge un massimo (Vmax) perché tutti i siti attivi disponibili sono occupati contemporaneamente","Continua ad aumentare linearmente senza limite","Diminuisce sempre","Diventa negativa","Si azzera immediatamente"], correct:0 },

{ id:"enz-29", topic:"enzimi", type:"mc",
  q:"Nell'inibizione competitiva, l'inibitore:",
  options:["Assomiglia chimicamente al substrato e compete con esso per il sito attivo, senza essere trasformato","Si lega sempre in un sito diverso dal sito attivo","Non può mai essere spiazzato aumentando la concentrazione di substrato","Distrugge permanentemente il sito attivo","Aumenta sempre la Vmax dell'enzima"], correct:0 },

{ id:"enz-30", topic:"enzimi", type:"mc",
  q:"Nell'inibizione non competitiva, l'inibitore:",
  options:["Si lega in un sito diverso dal sito attivo, deformando leggermente la struttura terziaria e alterando la conformazione del sito attivo a distanza","Compete direttamente con il substrato per lo stesso sito","Viene sempre spiazzato aumentando la concentrazione di substrato","Non ha alcun effetto sulla struttura dell'enzima","Agisce solo sui cofattori metallici"], correct:0 },

{ id:"enz-31", topic:"enzimi", type:"mc",
  q:"Nella regolazione allosterica, un enzima 'chiave' all'inizio di una via metabolica viene tipicamente inibito da:",
  options:["Il prodotto finale della via stessa, tramite legame a un sito allosterico (feedback negativo)", "Il primo substrato della via", "Un coenzima non correlato", "Un gene regolatore direttamente", "La temperatura corporea"], correct:0,
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
  options:["Anelli aromatici complessi","Catene lineari di carbonio con un gruppo carbossilico terminale","Solo atomi di azoto e fosforo","Basi azotate legate a zuccheri","Amminoacidi legati covalentemente"], correct:1 },

{ id:"lip-02", topic:"lipidi", type:"mc",
  q:"In un acido grasso, il gruppo carbossilico è:",
  options:["Idrofobico","Idrofilico","Privo di carica in ogni condizione","Assente","Sempre esterificato"], correct:1 },

{ id:"lip-03", topic:"lipidi", type:"mc",
  q:"La catena idrocarburica di un acido grasso è:",
  options:["Idrofilica","Idrofobica","Carica positivamente","Carica negativamente","Sempre ramificata"], correct:1 },

{ id:"lip-04", topic:"lipidi", type:"mc",
  q:"Un acido grasso si definisce insaturo quando:",
  options:["Non contiene atomi di idrogeno","Contiene uno o più doppi legami carbonio-carbonio","È privo del gruppo carbossilico","È legato al glicerolo","Contiene un gruppo fosfato"], correct:1 },

{ id:"lip-05", topic:"lipidi", type:"mc",
  q:"I trigliceridi si formano dall'esterificazione del glicerolo con:",
  options:["Tre molecole di glucosio","Tre catene di acidi grassi","Tre basi azotate","Tre gruppi fosfato","Tre amminoacidi"], correct:1 },

{ id:"lip-06", topic:"lipidi", type:"mc",
  q:"I trigliceridi si accumulano principalmente:",
  options:["Nel nucleo cellulare","Nel tessuto adiposo, come goccioline di grasso","Nei ribosomi","Nel citoscheletro","Nella matrice extracellulare"], correct:1 },

{ id:"lip-07", topic:"lipidi", type:"mc",
  q:"I fosfolipidi sono molecole:",
  options:["Completamente idrofobiche","Completamente idrofiliche","Anfipatiche (con una parte idrofila e una idrofoba)","Prive di gruppi fosfato","Sempre a struttura ciclica"], correct:2 },

{ id:"lip-08", topic:"lipidi", type:"mc",
  q:"Lo scheletro dei glicerofosfolipidi è costituito da:",
  options:["Sfingosina","Glicerolo","Colesterolo","Un anello aromatico","Un amminoacido"], correct:1 },

{ id:"lip-09", topic:"lipidi", type:"mc",
  q:"Lo scheletro degli sfingolipidi è costituito da:",
  options:["Glicerolo","Sfingosina","Colesterolo","Un acido grasso libero","Glucosio"], correct:1 },

{ id:"lip-10", topic:"lipidi", type:"mc",
  q:"Il colesterolo è il precursore biologico di:",
  options:["Tutti gli amminoacidi","Gli ormoni steroidei","I carboidrati","Gli acidi nucleici","Le vitamine idrosolubili"], correct:1 },

{ id:"lip-11", topic:"lipidi", type:"mc",
  q:"Il colesterolo, oltre a essere un componente delle membrane cellulari, funge da substrato per la sintesi di:",
  options:["Proteine strutturali","Ormoni steroidei","Acidi nucleici","Polisaccaridi","Enzimi digestivi"], correct:1 },

{ id:"lip-12", topic:"lipidi", type:"mc",
  q:"Quale organello rappresenta il principale sito di sintesi dei lipidi nella cellula?",
  options:["Il nucleo","Il reticolo endoplasmatico","Il lisosoma","Il perossisoma esclusivamente","Il citoscheletro"], correct:1 },

{ id:"lip-13", topic:"lipidi", type:"mc",
  q:"I glicolipidi, come i glicosfingolipidi, derivano strutturalmente da:",
  options:["Il glicerolo","La sfingosina","Il colesterolo","Un amminoacido","Un nucleotide"], correct:1 },

{ id:"lip-14", topic:"lipidi", type:"mc",
  q:"La fosforilazione del fosfatidilinositolo produce una serie di molecole chiamate:",
  options:["Fosfolipasi","Fosfoinositidi","Fosfatasi","Fosfocreatine","Fosfoproteine"], correct:1,
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
  options:["La posizione del primo doppio legame, contando dal metile terminale della catena","Il numero totale di doppi legami presenti","Il numero di atomi di carbonio della catena","La posizione del gruppo carbossilico","Il numero di atomi di ossigeno"], correct:0 },

{ id:"lip-22", topic:"lipidi", type:"mc",
  q:"L'acido linoleico (serie omega-6) e l'acido linolenico (serie omega-3) sono definiti acidi grassi essenziali perché:",
  options:["L'organismo umano non è in grado di sintetizzarli e devono essere assunti con la dieta","Sono gli unici acidi grassi presenti nelle membrane cellulari","Vengono sintetizzati esclusivamente dal fegato","Non hanno alcuna funzione biologica nota","Sono sempre saturi"], correct:0 },

{ id:"lip-23", topic:"lipidi", type:"mc",
  q:"In base alla funzione svolta nell'organismo, i lipidi si distinguono in:",
  options:["Lipidi di deposito (es. trigliceridi negli adipociti), lipidi strutturali (membrane) e lipidi regolatori (precursori di vitamine e ormoni)","Solo lipidi saturi e insaturi","Solo lipidi animali e vegetali","Lipidi polari e lipidi acidi soltanto","Lipidi essenziali e lipidi tossici"], correct:0 },

{ id:"lip-24", topic:"lipidi", type:"mc",
  q:"In base al numero di acidi grassi esterificati con il glicerolo, si distinguono, in ordine crescente:",
  options:["Monogliceride, digliceride, trigliceride","Trigliceride, digliceride, monogliceride","Solo mono- e trigliceridi","Digliceride, trigliceride, tetragliceride","Non esiste tale classificazione"], correct:0 },

{ id:"lip-25", topic:"lipidi", type:"mc",
  q:"Poiché i lipidi sono poco solubili in acqua, per essere trasportati nel sangue devono associarsi a una proteina, formando complessi chiamati:",
  options:["Lipoproteine","Glicoproteine","Metalloproteine","Fosfoproteine","Nucleoproteine"], correct:0 },

{ id:"lip-26", topic:"lipidi", type:"mc",
  q:"Gli acidi grassi liberi non esterificati (NEFA), mobilizzati dal tessuto adiposo durante il digiuno o l'esercizio fisico, circolano nel sangue legati principalmente a:",
  options:["L'albumina","L'emoglobina","Il colesterolo","Il glicogeno","Le immunoglobuline"], correct:0 },

{ id:"lip-27", topic:"lipidi", type:"mc",
  q:"I chilomicroni, la lipoproteina di maggiori dimensioni, hanno origine intestinale e trasportano principalmente:",
  options:["Trigliceridi di origine alimentare verso i tessuti", "Colesterolo endogeno verso il fegato", "Trigliceridi endogeni sintetizzati dal fegato", "Solo fosfolipidi", "Solo acidi grassi liberi"], correct:0,
  explain:"I chilomicroni sono presenti nel sangue solo dopo i pasti." },

{ id:"lip-28", topic:"lipidi", type:"mc",
  q:"Le VLDL (lipoproteine a densità molto bassa), di origine epatica, trasportano principalmente:",
  options:["Trigliceridi endogeni sintetizzati dal fegato", "Trigliceridi alimentari", "Solo colesterolo", "Proteine plasmatiche", "Glucosio"], correct:0 },

{ id:"lip-29", topic:"lipidi", type:"mc",
  q:"Le LDL (lipoproteine a bassa densità), spesso chiamate 'colesterolo cattivo', trasportano il colesterolo:",
  options:["Dal fegato ai tessuti, ed è responsabile del danno arterioso se in eccesso","Dai tessuti al fegato, per essere eliminato","Solo dall'intestino al fegato","Solo dopo i pasti","Esclusivamente ai reni"], correct:0 },

{ id:"lip-30", topic:"lipidi", type:"mc",
  q:"Le HDL (lipoproteine ad alta densità), spesso chiamate 'colesterolo buono', hanno la funzione di:",
  options:["Trasportare il colesterolo in eccesso dai tessuti verso il fegato per la sua eliminazione","Trasportare i trigliceridi alimentari ai tessuti subito dopo i pasti","Danneggiare le pareti arteriose","Sintetizzare acidi grassi nel fegato","Trasportare glucosio nei muscoli"], correct:0 },

{ id:"lip-31", topic:"lipidi", type:"mc",
  q:"La β-ossidazione, il principale processo di degradazione degli acidi grassi per produrre energia, avviene principalmente:",
  options:["Nella matrice mitocondriale","Nel nucleo","Nel reticolo endoplasmatico liscio","Nel citosol","Nell'apparato del Golgi"], correct:0 },

{ id:"lip-32", topic:"lipidi", type:"mc",
  q:"Poiché l'acil-CoA non può attraversare la membrana mitocondriale interna, il suo ingresso nel mitocondrio per la β-ossidazione è mediato da una molecola 'navetta' chiamata:",
  options:["Carnitina","Ubiquitina","Coenzima A soltanto","Albumina","Clatrina"], correct:0 },

{ id:"lip-33", topic:"lipidi", type:"mc",
  q:"L'enzima CPT-I (carnitina palmitoiltransferasi I), localizzato sulla membrana mitocondriale esterna, è fondamentale per:",
  options:["Regolare l'ingresso degli acidi grassi nel mitocondrio", "Sintetizzare acidi grassi de novo", "Degradare il glicogeno", "Trasportare il colesterolo nel sangue", "Formare i ponti disolfuro delle lipoproteine"], correct:0 },

{ id:"lip-34", topic:"lipidi", type:"mc",
  q:"Al termine della β-ossidazione, l'acetil-CoA prodotto entra nel ciclo di Krebs, mentre il NADH e il $FADH_2$ prodotti cedono i loro elettroni:",
  options:["Alla catena respiratoria, permettendo la produzione di ATP","Direttamente al glucosio","Alla carnitina, per essere riciclati","Ai ribosomi mitocondriali","All'acido piruvico"], correct:0 },

{ id:"lip-35", topic:"lipidi", type:"fill",
  q:"La sostanza che funziona da 'navetta' per il trasporto degli acidi grassi attivati all'interno del mitocondrio si chiama ________.",
  answer:"CARNITINA" },

/* ============================= MEMBRANE CELLULARI ============================= */

{ id:"membr-01", topic:"membrane", type:"mc",
  q:"Il modello che descrive la struttura delle membrane biologiche è detto:",
  options:["Modello a doppio strato rigido","Modello del mosaico fluido","Modello a canale unico","Modello a micella","Modello a reticolo cristallino"], correct:1 },

{ id:"membr-02", topic:"membrane", type:"mc",
  q:"Secondo il modello del mosaico fluido, le membrane cellulari sono costituite da:",
  options:["Un singolo strato proteico rigido","Un doppio strato lipidico fluido in cui le proteine sono incastrate come tessere di un mosaico","Esclusivamente proteine, senza lipidi","Un reticolo cristallino di ioni","Fibre di collagene intrecciate"], correct:1 },

{ id:"membr-03", topic:"membrane", type:"mc",
  q:"Il modello del mosaico fluido delle membrane cellulari fu proposto da:",
  options:["Watson e Crick","Singer e Nicolson","Mendel","Pauling","Darwin"], correct:1 },

{ id:"membr-04", topic:"membrane", type:"mc",
  q:"I fosfolipidi formano spontaneamente doppi strati in ambiente acquoso grazie alla loro natura:",
  options:["Completamente idrofobica","Completamente idrofilica","Anfipatica","Ionica","Radioattiva"], correct:2 },

{ id:"membr-05", topic:"membrane", type:"mc",
  q:"La chiusura di un doppio strato fosfolipidico a formare un compartimento sigillato è, dal punto di vista energetico:",
  options:["Sempre sfavorevole","Energeticamente favorevole","Indipendente dall'energia","Possibile solo con l'apporto di ATP","Impossibile in ambiente acquoso"], correct:1 },

{ id:"membr-06", topic:"membrane", type:"mc",
  q:"Le tre principali classi di molecole lipidiche delle membrane cellulari sono:",
  options:["Trigliceridi, cere, terpeni","Fosfolipidi, steroli e glicolipidi","Amminoacidi, zuccheri e nucleotidi","Solo fosfolipidi","Vitamine liposolubili esclusivamente"], correct:1 },

{ id:"membr-07", topic:"membrane", type:"mc",
  q:"Le proteine di membrana si distinguono principalmente in:",
  options:["Solo proteine integrali","Proteine integrali e proteine periferiche","Solo proteine periferiche","Proteine cataboliche e anaboliche","Proteine acide e basiche esclusivamente"], correct:1 },

{ id:"membr-08", topic:"membrane", type:"mc",
  q:"Le proteine integrali di membrana vengono rilasciate dalla membrana solo:",
  options:["Spontaneamente a temperatura ambiente","In seguito all'azione di detergenti","Mai, in nessuna condizione","Per semplice lavaggio con acqua","Per azione della luce"], correct:1 },

{ id:"membr-09", topic:"membrane", type:"mc",
  q:"Le proteine transmembrana attraversano il doppio strato lipidico tipicamente mediante:",
  options:["Un foglietto β esteso","Un segmento ad α-elica","Un legame ionico con i fosfolipidi","Un ponte disolfuro","Un anello aromatico planare"], correct:1 },

{ id:"membr-10", topic:"membrane", type:"mc",
  q:"Un esempio di proteina di membrana ancorata tramite un lipide è quella con ancora:",
  options:["Disolfuro","GPI","Peptidica","Ionica","Covalente con ubiquitina"], correct:1 },

{ id:"membr-11", topic:"membrane", type:"mc",
  q:"In quali proporzioni relative si trovano generalmente proteine e lipidi nelle membrane cellulari?",
  options:["Sempre il 100% proteine","Quasi equivalenti, nella maggior parte delle membrane","Sempre il 100% lipidi","Le membrane non contengono mai proteine","Il rapporto è fisso e identico in tutte le membrane"], correct:1 },

{ id:"membr-12", topic:"membrane", type:"mc",
  q:"Una membrana con un alto rapporto proteine/lipidi è tipicamente associata a:",
  options:["Funzione di isolamento elettrico","Funzioni specializzate (es. membrana mitocondriale interna)","Assenza di funzione","Solo membrane vegetali","Nessuna correlazione con la funzione"], correct:1,
  explain:"La mielina, ad esempio, ha un basso rapporto proteine/lipidi ed è specializzata nell'isolamento elettrico; la membrana mitocondriale interna ha invece un alto rapporto proteine/lipidi." },

{ id:"membr-13", topic:"membrane", type:"mc",
  q:"Le membrane biologiche sono pochissimo permeabili a:",
  options:["$N_2$","$O_2$","$H_2O$","$CO_2$","Ioni $Ca^{2+}$"], correct:4,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). Gas apolari come $N_2$, $O_2$, $CO_2$ e piccole molecole come l'acqua attraversano facilmente il doppio strato lipidico; gli ioni carichi, come $Ca^{2+}$, richiedono invece canali o trasportatori specifici." },

{ id:"membr-14", topic:"membrane", type:"mc",
  q:"La fibronectina è:",
  options:["Un polisaccaride presente nella matrice extracellulare","Una glicoproteina della matrice extracellulare che collega le integrine a componenti della matrice come il collagene","Un enzima che degrada le proteine della matrice extracellulare","Una proteina integrale di membrana priva di funzione adesiva","Una proteina del citoscheletro"], correct:1,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello)." },

{ id:"membr-15", topic:"membrane", type:"mc",
  q:"La matrice extracellulare è composta principalmente da:",
  options:["Proteine istoniche","Proteoglicani, glicosamminoglicani e proteine strutturali e di adesione","Fosfolipidi e colesterolo","Molecole di tubulina","Filamenti di actina"], correct:1,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"membr-16", topic:"membrane", type:"mc",
  q:"L'ancoraggio delle cellule alla matrice extracellulare avviene principalmente tramite:",
  options:["I ribosomi","Le integrine","Gli istoni","Le DNA polimerasi","I tRNA"], correct:1 },

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
  options:["Sono rigide, simmetriche e impermeabili","Sono asimmetriche, fluide/dinamiche e semipermeabili","Sono statiche, omogenee e impermeabili","Sono cristalline, anisotrope e permeabili a tutto","Sono solide, simmetriche e selettive solo per l'acqua"], correct:1 },

{ id:"membr-26", topic:"membrane", type:"mc",
  q:"Il passaggio di un fosfolipide da un foglietto all'altro della membrana (flip-flop) è un evento:",
  options:["Frequente e spontaneo, più veloce della diffusione laterale","Raro, perché richiede il passaggio della testa polare attraverso l'interno idrofobico; è catalizzato dalle flippasi","Impossibile in ogni condizione","Caratteristico solo delle membrane procariotiche","Indipendente dall'energia e molto rapido"], correct:1 },

{ id:"membr-27", topic:"membrane", type:"mc",
  q:"Cosa dimostrò l'esperimento di fusione cellulare topo-uomo di Frey ed Edidin, con anticorpi fluorescenti contro le proteine di membrana?",
  options:["Che il DNA si trasferisce tra cellule di specie diverse","Che le proteine di membrana possono diffondere lateralmente e mescolarsi nella membrana plasmatica","Che le membrane sono completamente rigide e immobili","Che i lipidi di membrana non si muovono mai","Che le cellule di specie diverse non possono fondersi"], correct:1,
  explain:"Dopo la fusione tra una cellula di topo e una umana, le proteine di membrana marcate con anticorpi diversi (fluoresceina/rodamina) si mescolano progressivamente sulla superficie dell'eterocarionte, dimostrando la mobilità laterale delle proteine." },

{ id:"membr-28", topic:"membrane", type:"mc",
  q:"Quali fattori influenzano la fluidità delle membrane biologiche?",
  options:["Solo il pH extracellulare","La temperatura, la lunghezza e il grado di saturazione delle catene idrocarburiche dei fosfolipidi, e il livello di colesterolo","Solo la concentrazione di glucosio extracellulare","Esclusivamente la pressione osmotica","Solo la presenza di ioni calcio"], correct:1 },

{ id:"membr-29", topic:"membrane", type:"mc",
  q:"Catene idrocarburiche insature, con doppi legami cis, rispetto a catene sature di pari lunghezza:",
  options:["Rendono la membrana meno fluida, impacchettandosi più strettamente","Introducono un piegamento nella catena che aumenta la fluidità di membrana","Non hanno alcun effetto sulla fluidità di membrana","Impediscono la formazione del doppio strato lipidico","Rendono la membrana completamente impermeabile all'acqua"], correct:1 },

{ id:"membr-30", topic:"membrane", type:"mc",
  q:"L'asimmetria delle membrane biologiche, cioè la diversa composizione dei due foglietti del doppio strato, dipende da:",
  options:["Solo dalla temperatura ambientale","Il sito di sintesi dei lipidi, le loro proprietà biofisiche, la presenza di specifici traslocatori (flippasi) e meccanismi di ritenzione","Esclusivamente dalla pressione osmotica","La sola presenza di colesterolo","Il pH del citosol"], correct:1 },

{ id:"membr-31", topic:"membrane", type:"mc",
  q:"Durante l'apoptosi, l'esposizione della fosfatidilserina (PS) sul foglietto esterno della membrana plasmatica funge da:",
  options:["Segnale di proliferazione cellulare","'Eat-me signal' che favorisce il riconoscimento e la fagocitosi della cellula apoptotica da parte dei macrofagi","Segnale che induce la mitosi","Barriera che impedisce la fagocitosi","Attivatore della sintesi proteica ribosomiale"], correct:1,
  explain:"L'esposizione della PS è dovuta alla disattivazione di una flippasi specifica per la PS e all'attivazione di una scramblasi, che trasferisce fosfolipidi in entrambe le direzioni." },

{ id:"membr-32", topic:"membrane", type:"mc",
  q:"Il glicocalice, il rivestimento glucidico che si affaccia sul lato esterno della membrana plasmatica, è composto da:",
  options:["Solo colesterolo libero","Catene di zuccheri legate a proteine (glicoproteine) e a lipidi (glicolipidi) di membrana","Esclusivamente molecole di DNA","Filamenti di actina del citoscheletro","Ioni calcio legati direttamente ai fosfolipidi"], correct:1 },

{ id:"membr-33", topic:"membrane", type:"mc",
  q:"Tra le funzioni del glicocalice NON rientra:",
  options:["La protezione della superficie cellulare (es. epiteli)","Il riconoscimento tra cellule","La funzione antigenica (es. sistema AB0)","L'isolamento elettrico (es. a livello dei nodi di Ranvier)","La catalisi diretta della duplicazione del DNA"], correct:4 },

{ id:"membr-34", topic:"membrane", type:"mc",
  q:"Il sistema AB0 dei gruppi sanguigni si basa su differenze strutturali in:",
  options:["Proteine del citoscheletro degli eritrociti","Glicolipidi di membrana dei globuli rossi, che espongono zuccheri terminali diversi a seconda dell'antigene (A, B, 0)","Ormoni steroidei circolanti nel plasma","La sequenza del DNA mitocondriale","Il numero di mitocondri presenti nei globuli rossi"], correct:1 },

{ id:"membr-35", topic:"membrane", type:"mc",
  q:"In base al coefficiente di permeabilità della membrana, quale categoria di molecole la attraversa più facilmente per diffusione semplice?",
  options:["Ioni come $Na^+$ e $K^+$","Molecole idrofobe e piccoli gas apolari come $O_2$","Grosse molecole polari come il glucosio","Piccole molecole polari cariche","Macromolecole proteiche"], correct:1 },

{ id:"membr-36", topic:"membrane", type:"mc",
  q:"Il trasporto attivo di membrana si distingue da quello passivo perché:",
  options:["Avviene sempre più lentamente","Avviene contro gradiente (di concentrazione o elettrochimico) e richiede consumo di energia","Non richiede mai una proteina di membrana","Riguarda esclusivamente il trasporto dei gas respiratori","Non può mai essere mediato da una pompa"], correct:1 },

{ id:"membr-37", topic:"membrane", type:"mc",
  q:"La diffusione facilitata, a differenza della diffusione semplice:",
  options:["Richiede il consumo diretto di ATP","È mediata da proteine di trasporto (canali o trasportatori), ma come la diffusione semplice avviene secondo gradiente senza consumo diretto di energia","Avviene sempre contro gradiente di concentrazione","Non presenta mai un fenomeno di saturazione","Riguarda solo il trasporto di ioni metallici"], correct:1 },

{ id:"membr-38", topic:"membrane", type:"mc",
  q:"I trasportatori (carrier) di membrana muovono il soluto attraverso:",
  options:["Un poro sempre aperto, privo di regolazione","Un cambiamento conformazionale che alterna l'esposizione del sito di legame verso l'esterno e verso l'interno della cellula","La formazione di una vescicola di endocitosi","Un legame covalente permanente con il soluto trasportato","La rottura temporanea del doppio strato lipidico"], correct:1 },

{ id:"membr-39", topic:"membrane", type:"mc",
  q:"Un trasportatore di membrana che muove due soluti diversi in direzioni opposte, accoppiandone il trasporto, è detto:",
  options:["Uniporto","Simporto","Antiporto","Canale a diffusione semplice","Pompa protonica passiva"], correct:2 },

{ id:"membr-40", topic:"membrane", type:"mc",
  q:"I canali ionici agiscono come filtri selettivi per specifici ioni e:",
  options:["Restano sempre in uno stato aperto","Restano sempre in uno stato chiuso","Oscillano tra uno stato aperto e uno chiuso, regolati da meccanismi diversi (voltaggio, ligando, stimoli meccanici)","Trasportano solo acqua per osmosi","Funzionano esclusivamente per ossidoriduzione"], correct:2 },

{ id:"membr-41", topic:"membrane", type:"mc",
  q:"I canali ionici regolati da voltaggio (voltage-gated) si aprono o chiudono in risposta a:",
  options:["Variazioni del potenziale di membrana, rilevate da un dominio sensore (elica S4)","Il legame con un ormone steroideo","Variazioni di temperatura ambientale","La concentrazione di glucosio extracellulare","Il pH del citosol esclusivamente"], correct:0,
  explain:"I canali regolati da ligando extracellulare o intracellulare e quelli regolati meccanicamente sono gli altri tre principali meccanismi di apertura dei canali ionici." },

{ id:"membr-42", topic:"membrane", type:"mc",
  q:"La pompa $Na^+/K^+$-ATPasi, a ogni ciclo catalitico e con consumo di un ATP, trasporta:",
  options:["2 ioni $Na^+$ fuori e 3 ioni $K^+$ dentro la cellula","3 ioni $Na^+$ fuori e 2 ioni $K^+$ dentro la cellula","3 ioni $Na^+$ dentro e 2 ioni $K^+$ fuori dalla cellula","Solo ioni $Na^+$, senza coinvolgere il $K^+$","Un numero variabile e non fisso di ioni ad ogni ciclo"], correct:1 },

{ id:"membr-43", topic:"membrane", type:"mc",
  q:"L'attività della pompa $Na^+/K^+$-ATPasi è cruciale per:",
  options:["La sintesi proteica ribosomiale","Generare e mantenere il potenziale di membrana a riposo, regolare il volume cellulare e fornire il gradiente di $Na^+$ sfruttato dal trasporto secondario","La duplicazione del DNA nucleare","La fotosintesi nei cloroplasti","La glicolisi anaerobica nel citosol"], correct:1 },

{ id:"membr-44", topic:"membrane", type:"mc",
  q:"I trasportatori ABC (ATP-Binding Cassette), di cui fanno parte MDR e CFTR, sono proteine di trasporto attivo che:",
  options:["Non legano mai l'ATP","Legano e idrolizzano ATP per pompare piccole molecole (amminoacidi, peptidi, steroli) attraverso la membrana","Trasportano esclusivamente molecole d'acqua","Sono presenti solo nei batteri, mai negli eucarioti","Sono canali ionici regolati da voltaggio"], correct:1 },

{ id:"membr-45", topic:"membrane", type:"mc",
  q:"Una cellula immersa in una soluzione ipotonica rispetto al suo citoplasma:",
  options:["Perde acqua netta e si raggrinzisce","Guadagna acqua netta per osmosi e tende a rigonfiarsi","Non subisce alcun movimento netto di acqua","Perde immediatamente ioni $Na^+$","Va incontro a mitosi immediata"], correct:1 },

{ id:"membr-46", topic:"membrane", type:"mc",
  q:"Una soluzione isotonica rispetto al citoplasma di una cellula determina:",
  options:["Un guadagno netto di acqua e il rigonfiamento della cellula","Una perdita netta di acqua e il raggrinzimento della cellula","Né un guadagno né una perdita netta di acqua","La lisi immediata della cellula","La denaturazione delle proteine di membrana"], correct:2 },

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
  options:["Robert Hooke","Theodor Schwann","Matthias Schleiden","Rudolf Virchow","Louis Pasteur"], correct:3 },

{ id:"proc-02", topic:"procarioti", type:"mc",
  q:"Chi utilizzò per primo il termine \"cellula\", osservando al microscopio sezioni di sughero?",
  options:["Theodor Schwann","Matthias Schleiden","Rudolf Virchow","Robert Hooke","Louis Pasteur"], correct:3 },

{ id:"proc-03", topic:"procarioti", type:"mc",
  q:"Quale delle seguenti affermazioni NON fa parte dei principi della teoria cellulare?",
  options:["Tutti gli esseri viventi sono costituiti da una o più cellule","Le cellule si originano da altre cellule preesistenti","Le cellule contengono le informazioni ereditarie dell'organismo","Le reazioni chimiche di un organismo vivente hanno luogo dentro le cellule","Le cellule si formano per generazione spontanea dalla materia inanimata"], correct:4 },

{ id:"proc-04", topic:"procarioti", type:"mc",
  q:"Secondo la teoria cellulare, le reazioni chimiche di un organismo vivente, compresi i meccanismi di liberazione dell'energia e le reazioni di biosintesi, hanno luogo:",
  options:["Esclusivamente nel nucleo","Dentro le cellule","Nello spazio extracellulare","Solo nei mitocondri","Solo nei cloroplasti"], correct:1 },

{ id:"proc-05", topic:"procarioti", type:"mc",
  q:"A differenza di una singola cellula di un organismo pluricellulare, un organismo unicellulare è in grado di:",
  options:["Dividersi soltanto","Accrescersi soltanto","Vivere e riprodursi autonomamente come organismo indipendente","Sintetizzare proteine soltanto","Contenere DNA soltanto"], correct:2 },

{ id:"proc-06", topic:"procarioti", type:"mc",
  q:"Quali sono, in ordine crescente di complessità, i livelli di organizzazione di un organismo pluricellulare?",
  options:["Molecole, cellule, tessuti, organi, sistemi, organismo","Organismo, sistemi, organi, tessuti, cellule, molecole","Cellule, molecole, tessuti, organi, organismo, sistemi","Tessuti, organi, cellule, sistemi, molecole, organismo","Sistemi, cellule, tessuti, organi, molecole, organismo"], correct:0 },

{ id:"proc-07", topic:"procarioti", type:"mc",
  q:"La principale differenza strutturale tra cellula procariotica ed eucariotica riguarda:",
  options:["La presenza della membrana plasmatica","La presenza di un vero nucleo delimitato da membrana","La presenza di DNA","La capacità di riprodursi","La presenza di ribosomi"], correct:1 },

{ id:"proc-08", topic:"procarioti", type:"mc",
  q:"Le dimensioni tipiche di una cellula batterica sono dell'ordine di:",
  options:["Pochi nanometri","Pochi micrometri","Pochi millimetri","Alcuni centimetri","Alcuni decimetri"], correct:1 },

{ id:"proc-09", topic:"procarioti", type:"mc",
  q:"La parete cellulare dei batteri è costituita principalmente da:",
  options:["Cellulosa","Chitina","Peptidoglicano","Cheratina","Fosfolipidi"], correct:2 },

{ id:"proc-10", topic:"procarioti", type:"mc",
  q:"Considerando le principali differenze strutturali tra le pareti cellulari dei batteri Gram-positivi e Gram-negativi, quale delle seguenti affermazioni è corretta?",
  options:["La disposizione di flagelli e pili","La presenza di lipopolisaccaridi nei Gram positivi e di acido teicoico nei Gram negativi","Nessuna delle affermazioni enunciate è corretta","Il diverso spessore dello strato di peptidoglicano e l'assenza della membrana esterna nei Gram-positivi e la sua presenza nei Gram-negativi","L'assenza di pili e flagelli nei Gram-negativi e la presenza nei Gram positivi"], correct:3,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"proc-11", topic:"procarioti", type:"mc",
  q:"Nella colorazione di Gram, i batteri Gram-positivi trattengono il colorante violetto di genziana grazie a:",
  options:["Una spessa membrana esterna","Uno spesso strato di peptidoglicano","L'assenza di parete cellulare","La presenza di lipopolisaccaridi","La capsula"], correct:1 },

{ id:"proc-12", topic:"procarioti", type:"mc",
  q:"I batteri Gram-negativi possiedono, a differenza dei Gram-positivi:",
  options:["Uno strato di peptidoglicano più spesso","Una membrana esterna contenente lipopolisaccaridi","L'assenza di membrana plasmatica","Una parete di chitina","Nessuna delle precedenti"], correct:1 },

{ id:"proc-13", topic:"procarioti", type:"mc",
  q:"Le appendici filiformi utilizzate dai batteri per il movimento sono:",
  options:["I pili comuni","Le fimbrie","I flagelli","La capsula","Il glicocalice"], correct:2 },

{ id:"proc-14", topic:"procarioti", type:"mc",
  q:"Le fimbrie (o pili comuni) nei batteri svolgono principalmente una funzione:",
  options:["Di movimento","Adesiva","Fotosintetica","Riproduttiva","Respiratoria"], correct:1 },

{ id:"proc-15", topic:"procarioti", type:"mc",
  q:"Il pilo sessuale è coinvolto principalmente:",
  options:["Nel movimento del batterio","Nel trasferimento di materiale genetico durante la coniugazione","Nella fotosintesi","Nella divisione per scissione binaria","Nella respirazione cellulare"], correct:1 },

{ id:"proc-16", topic:"procarioti", type:"mc",
  q:"La struttura mucosa esterna che protegge alcuni batteri dalla fagocitosi è:",
  options:["Il flagello","Il pilo sessuale","La capsula","Lo spazio periplasmico","Il nucleoide"], correct:2 },

{ id:"proc-17", topic:"procarioti", type:"mc",
  q:"Il trasferimento genico orizzontale in cui un batterio capta direttamente frammenti di DNA nudo dall'ambiente è detto:",
  options:["Coniugazione","Trasduzione","Trasformazione","Trascrizione","Ricombinazione sito-specifica"], correct:2 },

{ id:"proc-18", topic:"procarioti", type:"mc",
  q:"Il trasferimento di materiale genetico tra due batteri mediante contatto diretto e pilo sessuale è detto:",
  options:["Trasformazione","Trasduzione","Coniugazione","Endocitosi","Esocitosi"], correct:2 },

{ id:"proc-19", topic:"procarioti", type:"mc",
  q:"Il trasferimento di DNA batterico mediato da un batteriofago è detto:",
  options:["Trasformazione","Coniugazione","Trasduzione","Traduzione","Replicazione"], correct:2 },

{ id:"proc-20", topic:"procarioti", type:"mc",
  q:"Il mondo vivente è oggi suddiviso in tre domini principali, ovvero:",
  options:["Animalia, Plantae, Fungi","Bacteria, Archaea, Eukarya","Procarioti, Eucarioti, Virus","Monere, Protisti, Metazoi","Procarioti, Protisti, Animalia"], correct:1 },

{ id:"proc-21", topic:"procarioti", type:"mc",
  q:"Secondo la teoria endosimbiontica, i mitocondri delle cellule eucariotiche deriverebbero da:",
  options:["Invaginazioni della membrana plasmatica","Frammenti del nucleo","Batteri endosimbionti inglobati da una cellula ospite ancestrale","Vescicole del reticolo endoplasmatico","Virus integrati nel genoma dell'ospite"], correct:2 },

{ id:"proc-22", topic:"procarioti", type:"mc",
  q:"Nei procarioti, l'RNA ribosomale è rappresentato da molecole con i seguenti coefficienti di sedimentazione:",
  options:["23, 16 e 5 Svedberg","18, 28 e 5 Svedberg","18, 28, 5.8 e 5 Svedberg","12 e 16 Svedberg","16 e 23 Svedberg"], correct:0,
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
  options:["Aumentare la superficie disponibile per la respirazione e la replicazione del DNA","Racchiudere il materiale genetico in un compartimento separato","Sintetizzare proteine di membrana","Produrre energia luminosa","Digerire macromolecole extracellulari"], correct:0 },

{ id:"proc-33", topic:"procarioti", type:"mc",
  q:"I plasmidi sono:",
  options:["Molecole di DNA extracromosomico circolare, a replicazione indipendente, non essenziali alla sopravvivenza ma spesso vantaggiose (es. resistenza agli antibiotici)","Il cromosoma principale del batterio","Organelli membranosi tipici degli eucarioti","Proteine strutturali della parete cellulare","RNA messaggeri batterici"], correct:0 },

{ id:"proc-34", topic:"procarioti", type:"mc",
  q:"Nella scissione binaria batterica, la replicazione del cromosoma circolare parte da un'unica origine (ori) e procede:",
  options:["In modo bidirezionale, tramite due forcelle, fino al punto opposto (ter)","In modo unidirezionale soltanto","Da più origini simultanee sempre","Solo dopo la formazione del setto","Senza l'intervento di alcuna DNA polimerasi"], correct:0 },

{ id:"proc-35", topic:"procarioti", type:"mc",
  q:"La proteina batterica FtsZ, omologa procariotica della tubulina, è responsabile della:",
  options:["Formazione dell'anello contrattile a livello del futuro punto di divisione cellulare","Replicazione del DNA plasmidico","Sintesi della parete cellulare soltanto","Colorazione di Gram","Formazione dei pili sessuali"], correct:0 },

{ id:"proc-36", topic:"procarioti", type:"mc",
  q:"Nella fase finale della scissione binaria, detta citodieresi:",
  options:["L'anello contrattile si restringe e membrana e parete si chiudono verso l'interno, separando il citoplasma in due cellule figlie geneticamente identiche","La cellula si arresta definitivamente senza dividersi","Il DNA viene degradato","Si formano solo mesosomi","Avviene la coniugazione con un'altra cellula"], correct:0 },

{ id:"proc-37", topic:"procarioti", type:"fill",
  q:"Le invaginazioni della membrana plasmatica batterica che aumentano la superficie per la respirazione e la replicazione del DNA si chiamano ________.",
  answer:"MESOSOMI" },

{ id:"proc-38", topic:"procarioti", type:"fill",
  q:"Il DNA extracromosomico circolare batterico, non essenziale ma spesso vantaggioso (es. geni di resistenza agli antibiotici), è detto ________.",
  answer:"PLASMIDE", answerAlt:["PLASMIDI"] },

/* ============================= VIRUS E CICLI REPLICATIVI ============================= */

{ id:"vir-01", topic:"virus", type:"mc",
  q:"I virus sono:",
  options:["Organismi cellulari autonomi","Parassiti endocellulari obbligati","Organismi procarioti","Organismi eucarioti unicellulari","Organelli cellulari"], correct:1 },

{ id:"vir-02", topic:"virus", type:"mc",
  q:"Tutti i virus….",
  options:["Hanno come acido nucleico il DNA","Infettano cellule","Infettano solo cellule eucariotiche","Hanno come acido nucleico l'RNA","Infettano solo cellule animali"], correct:1,
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (primo appello)." },

{ id:"vir-03", topic:"virus", type:"mc",
  q:"Il rivestimento proteico che racchiude l'acido nucleico di un virus è detto:",
  options:["Envelope","Capside","Pericapside","Tegumento","Glicocalice"], correct:1 },

{ id:"vir-04", topic:"virus", type:"mc",
  q:"L'involucro membranoso, derivato dalla membrana della cellula ospite, che alcuni virus possiedono esternamente al capside è detto:",
  options:["Capside","Envelope (pericapside)","Periplasma","Parete","Glicocalice"], correct:1 },

{ id:"vir-05", topic:"virus", type:"mc",
  q:"I virus privi di envelope sono detti:",
  options:["Virus temperati","Virus nudi","Virus litici","Virioni maturi","Virus difettivi"], correct:1 },

{ id:"vir-06", topic:"virus", type:"mc",
  q:"Le dimensioni dei virus sono generalmente comprese tra:",
  options:["10 nm e 250-300 nm","1 e 10 µm","100 µm e 1 mm","1 e 5 mm","0,1 e 1 nm"], correct:0 },

{ id:"vir-07", topic:"virus", type:"mc",
  q:"La struttura a simmetria icosaedrica e quella a simmetria elicoidale sono due tipi di:",
  options:["Organizzazione della parete batterica","Morfologia del capside virale","Disposizione dei ribosomi","Struttura della membrana plasmatica","Organizzazione del nucleo"], correct:1 },

{ id:"vir-08", topic:"virus", type:"mc",
  q:"I virus animali vengono classificati principalmente in base:",
  options:["Alla loro dimensione soltanto","Al tipo di acido nucleico e alla modalità di replicazione","Alla presenza di flagelli","Alla loro capacità fotosintetica","Alla presenza di parete cellulare"], correct:1 },

{ id:"vir-09", topic:"virus", type:"mc",
  q:"Il ciclo di un batteriofago in cui il virus si replica immediatamente, causando la lisi della cellula ospite, è detto ciclo:",
  options:["Lisogenico","Litico","Di latenza","Di trasformazione","Di coniugazione"], correct:1 },

{ id:"vir-10", topic:"virus", type:"mc",
  q:"Nel ciclo lisogenico, il genoma del batteriofago:",
  options:["Viene immediatamente replicato e la cellula viene lisata","Si integra nel cromosoma batterico come profago e viene replicato passivamente con esso","Viene degradato dagli enzimi batterici","Esce subito dalla cellula","Non entra mai nella cellula ospite"], correct:1 },

{ id:"vir-11", topic:"virus", type:"mc",
  q:"Un batteriofago il cui genoma è integrato, in forma silente, nel cromosoma batterico è detto:",
  options:["Virione","Capside","Profago","Plasmide","Episoma virale"], correct:2 },

{ id:"vir-12", topic:"virus", type:"mc",
  q:"Le fasi del ciclo litico di un batteriofago, nel corretto ordine, sono:",
  options:["Attacco, penetrazione, liberazione dell'acido nucleico, replicazione e biosintesi, assemblaggio, rilascio","Attacco, replicazione, rilascio, penetrazione","Rilascio, attacco, penetrazione, replicazione","Biosintesi, attacco, assemblaggio, penetrazione","Penetrazione, rilascio, attacco, biosintesi"], correct:0 },

{ id:"vir-13", topic:"virus", type:"mc",
  q:"Il rilascio dei nuovi virioni da una cellula ospite può avvenire per:",
  options:["Fagocitosi o pinocitosi","Lisi (virus nudi) o gemmazione/esocitosi (virus con envelope)","Mitosi","Scissione binaria","Sporulazione"], correct:1 },

{ id:"vir-14", topic:"virus", type:"mc",
  q:"I retrovirus sono caratterizzati dal possesso di:",
  options:["DNA polimerasi soltanto","Trascrittasi inversa e integrasi","RNA polimerasi DNA-dipendente soltanto","Lisozima","Peptidoglicano"], correct:1 },

{ id:"vir-15", topic:"virus", type:"mc",
  q:"La trascrittasi inversa, enzima tipico dei retrovirus, catalizza:",
  options:["La sintesi di DNA a partire da uno stampo di RNA","La sintesi di RNA a partire da uno stampo di DNA","La degradazione dell'RNA virale","La sintesi proteica","La duplicazione del capside"], correct:0 },

{ id:"vir-16", topic:"virus", type:"mc",
  q:"Molti virus animali entrano nella cellula ospite sfruttando:",
  options:["La fagocitosi esclusivamente","L'endocitosi, mediante il macchinario molecolare della cellula ospite","La scissione binaria","La coniugazione","La trasformazione"], correct:1 },

{ id:"vir-17", topic:"virus", type:"mc",
  q:"Il tropismo cellulare di un virus, cioè la sua selettività d'ingresso in un determinato tipo cellulare, dipende dal legame con:",
  options:["I lipidi di membrana in modo aspecifico","Recettori specifici della cellula ospite","Il nucleo cellulare","I ribosomi","Il citoscheletro"], correct:1 },

{ id:"vir-18", topic:"virus", type:"mc",
  q:"Quali di queste affermazioni sugli oggetti biologici NON è corretta?",
  options:["I virus hanno un citoscheletro ancestrale","Le cellule procariotiche sono prive di citoscheletro complesso ma hanno un sistema di proteine strutturali con funzioni analoghe a quelle del citoscheletro eucariotico","Il citoscheletro è una componente strutturale presente in tutte le cellule eucariotiche","Alcuni organismi monocellulari sintetizzano molecole di ATP utilizzando l'energia liberata dalla fermentazione","Alcune cellule procariotiche possono operare la fotosintesi"], correct:0,
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
  options:["Quanti e quali passaggi servono per arrivare dal genoma virale a un mRNA funzionante","La sola forma del capside","Le sole dimensioni del virione","Il solo tipo di cellula ospite infettata","La presenza o assenza di envelope soltanto"], correct:0,
  explain:"Il criterio è centrato sull'mRNA perché i ribosomi leggono solo RNA a singolo filamento con polarità positiva, l'unico vero punto di contatto obbligato tra genoma virale e macchinario cellulare." },

{ id:"vir-27", topic:"virus", type:"mc",
  q:"Un filamento di acido nucleico virale si definisce a polarità positiva quando:",
  options:["Ha la stessa sequenza dell'mRNA e può essere tradotto direttamente","È complementare all'mRNA e deve essere trascritto prima di poter essere tradotto","Non contiene informazione genetica","È sempre a doppio filamento","Può essere letto solo dalla trascrittasi inversa"], correct:0 },

{ id:"vir-28", topic:"virus", type:"mc",
  q:"Nella classificazione di Baltimore, i retrovirus (es. HIV), dotati di genoma a RNA a singolo filamento e dell'enzima trascrittasi inversa, appartengono alla classe:",
  options:["VI","I","III","IV","VII"], correct:0 },

{ id:"vir-29", topic:"virus", type:"mc",
  q:"Nella classificazione di Baltimore, virus a DNA a doppio filamento come Adenovirus e Herpesvirus appartengono alla classe:",
  options:["I","IV","V","VI","VII"], correct:0 },

{ id:"vir-30", topic:"virus", type:"mc",
  q:"Le sei fasi principali del ciclo replicativo di un virus eucariotico, nel loro ordine, sono:",
  options:["Attacco, penetrazione, liberazione dell'acido nucleico, replicazione e biosintesi, assemblaggio, rilascio","Rilascio, attacco, penetrazione, assemblaggio, biosintesi, liberazione","Penetrazione, attacco, assemblaggio, rilascio, biosintesi, liberazione","Biosintesi, attacco, liberazione, rilascio, penetrazione, assemblaggio","Assemblaggio, penetrazione, attacco, rilascio, biosintesi, liberazione"], correct:0 },

{ id:"vir-31", topic:"virus", type:"mc",
  q:"La penetrazione di un virus con envelope nella cellula ospite può avvenire per fusione (processo pH-indipendente, in cui l'involucro virale si fonde con la membrana plasmatica) oppure per:",
  options:["Endocitosi (processo pH-dipendente, mediata da una vescicola rivestita di clatrina)","Osmosi diretta","Diffusione semplice attraverso la parete cellulare","Fagocitosi da parte del virus stesso","Trasporto attivo ATP-dipendente del virus"], correct:0 },

{ id:"vir-32", topic:"virus", type:"mc",
  q:"La fase del ciclo virale in cui le proteine capsidiche vengono degradate e il genoma virale viene liberato nel citoplasma è detta:",
  options:["Uncoating (liberazione dell'acido nucleico)","Attacco","Assemblaggio","Gemmazione","Lisogenia"], correct:0 },

{ id:"vir-33", topic:"virus", type:"mc",
  q:"L'auto-assemblaggio dei nuovi virioni, dopo la sintesi di acido nucleico e proteine virali, è favorito da proteine chiamate:",
  options:["Chaperonine","Integrasi","Topoisomerasi","Primasi","Ligasi"], correct:0 },

{ id:"vir-34", topic:"virus", type:"mc",
  q:"I virus dotati di involucro membranoso vengono tipicamente rilasciati dalla cellula ospite tramite:",
  options:["Gemmazione o esocitosi","Solo ed esclusivamente lisi cellulare","Fagocitosi","Scissione binaria","Coniugazione"], correct:0 },

{ id:"vir-35", topic:"virus", type:"mc",
  q:"In alcune cellule dette 'non permissive', l'infezione virale può innescare una trasformazione cellulare con crescita incontrollata e potenziale di crescita prolungato, detta:",
  options:["Immortalizzazione","Lisogenia","Uncoating","Gemmazione","Sporulazione"], correct:0 },

{ id:"vir-36", topic:"virus", type:"mc",
  q:"I virus oncogeni 'trasformatori' (oncogeni diretti), come alcuni ceppi ad alto rischio di HPV, favoriscono il cancro principalmente perché:",
  options:["Possiedono geni che codificano proteine virali capaci di interferire direttamente con il controllo del ciclo cellulare e la stabilità genomica","Non hanno alcuna interazione con la cellula ospite","Causano solo infezioni acute autolimitanti","Non sono mai in grado di integrarsi nel genoma ospite","Agiscono esclusivamente per via extracellulare"], correct:0 },

{ id:"vir-37", topic:"virus", type:"mc",
  q:"I virus oncogeni 'non trasformanti' (oncogeni indiretti), come HCV e HBV, favoriscono il cancro (es. carcinoma epatocellulare) principalmente:",
  options:["Creando nel tempo un contesto patologico favorevole, con infiammazione cronica e cicli ripetuti di danno e rigenerazione tissutale","Tramite un oncogene virale dominante diretto","Solo tramite trascrittasi inversa","Solo per contatto diretto con il DNA ospite","Non essendo in alcun modo associati a neoplasie"], correct:0 },

{ id:"vir-38", topic:"virus", type:"mc",
  q:"I geni v-src, v-ras e v-myc, trasportati da alcuni retrovirus acutamente trasformanti, derivano originariamente da:",
  options:["Proto-oncogeni cellulari (c-onc), acquisiti dal virus durante cicli di infezione e ricombinazione con il genoma ospite","Geni batterici","Sequenze non codificanti del genoma virale","Geni oppressori tumorali mutati soltanto nell'ospite","Frammenti di rRNA"], correct:0 },

{ id:"vir-39", topic:"virus", type:"mc",
  q:"Il genoma di un retrovirus come HIV contiene almeno tre geni principali: gag (proteine strutturali interne), env (proteine dell'envelope) e:",
  options:["Pol (proteine enzimatiche: trascrittasi inversa, proteasi, integrasi)","Tat soltanto","LTR","Rev soltanto","Ori"], correct:0 },

{ id:"vir-40", topic:"virus", type:"mc",
  q:"Le sequenze LTR (long terminal repeats), presenti alle estremità del DNA provirale integrato di un retrovirus, sono fondamentali per:",
  options:["Il controllo della trascrizione virale, contenendo siti promotori e enhancer","Il taglio del capside","La sintesi del solo RNA ribosomiale","La colorazione di Gram","La formazione dei pili batterici"], correct:0 },

{ id:"vir-41", topic:"virus", type:"mc",
  q:"Nel ciclo litico di un batteriofago, le proteine fagiche sintetizzate nella prima parte del ciclo (early proteins) servono, tra l'altro, a:",
  options:["Degradare il DNA della cellula ospite e modificare l'RNA polimerasi batterica per favorire l'espressione dei geni fagici","Assemblare direttamente il capside maturo","Lisare immediatamente la cellula","Integrare il profago nel cromosoma batterico","Sintetizzare la parete cellulare batterica"], correct:0 },

{ id:"vir-42", topic:"virus", type:"mc",
  q:"Nel ciclo lisogenico, le proteine di repressione prodotte da pochi geni del profago:",
  options:["Impediscono la trascrizione di tutti gli altri geni del profago, mantenendolo silente","Attivano immediatamente il ciclo litico","Distruggono il cromosoma batterico","Vengono espresse solo durante la lisi","Non hanno alcuna funzione regolatoria"], correct:0 },

{ id:"vir-43", topic:"virus", type:"fill",
  q:"Lo schema di classificazione dei virus basato sui passaggi necessari per produrre mRNA funzionante a partire dal genoma virale è detto schema di ________.",
  answer:"BALTIMORE" },

/* ============================= ACIDI NUCLEICI E CROMATINA ============================= */

{ id:"acnu-01", topic:"acidinucleici", type:"mc",
  q:"Nella doppia elica del DNA, i due filamenti sono:",
  options:["Paralleli, con la stessa polarità 5'→3'","Antiparalleli: un filamento è orientato 5'→3', l'altro 3'→5'","Privi di una polarità definita","Legati tra loro solo da legami covalenti diretti tra le basi","Sempre presenti a singolo filamento"], correct:1 },

{ id:"acnu-02", topic:"acidinucleici", type:"mc",
  q:"Nell'appaiamento delle basi del DNA, quanti legami idrogeno si formano in una coppia G≡C rispetto a una coppia A=T?",
  options:["2 legami H in entrambi i casi","3 legami H per G≡C, 2 legami H per A=T","2 legami H per G≡C, 3 legami H per A=T","Nessun legame idrogeno: solo legami covalenti","4 legami H in entrambi i casi"], correct:1 },

{ id:"acnu-03", topic:"acidinucleici", type:"mc",
  q:"Una molecola di DNA ricca in coppie G-C, rispetto a una di pari lunghezza ricca in coppie A-T, presenta una temperatura di fusione ($T_m$):",
  options:["Più bassa, perché le coppie G-C sono meno stabili","Più alta, perché le coppie G-C formano più legami idrogeno e richiedono più energia per separarsi","Identica in ogni caso","Non misurabile sperimentalmente","Indipendente dalla composizione in basi"], correct:1 },

{ id:"acnu-04", topic:"acidinucleici", type:"mc",
  q:"La denaturazione del DNA consiste in:",
  options:["La rottura dei legami fosfodiestere dello scheletro zucchero-fosfato","La separazione delle due eliche per rottura dei legami idrogeno tra le basi appaiate","La sintesi di un nuovo filamento di DNA complementare","La metilazione delle citosine del DNA","La formazione di nuovi legami covalenti tra le due eliche"], correct:1 },

{ id:"acnu-05", topic:"acidinucleici", type:"mc",
  q:"Il nucleosoma, unità di base della cromatina, è costituito da DNA avvolto attorno a:",
  options:["Un singolo istone H1","Un ottamero di istoni (2 copie ciascuno di H2A, H2B, H3, H4)","Una molecola di RNA polimerasi","Un tetramero di tubulina","Nessuna proteina: è DNA nudo"], correct:1 },

{ id:"acnu-06", topic:"acidinucleici", type:"mc",
  q:"Il ruolo dell'istone H1 nella struttura della cromatina è:",
  options:["Formare l'ottamero centrale del nucleosoma","Legare il DNA linker in entrata e in uscita dal nucleosoma, favorendo il compattamento nella fibra da 30 nm","Catalizzare la duplicazione del DNA","Digerire il DNA danneggiato","Trasportare il DNA fuori dal nucleo"], correct:1 },

{ id:"acnu-07", topic:"acidinucleici", type:"mc",
  q:"Nell'ordine corretto, i livelli di compattamento del DNA eucariotico, dal meno al più condensato, sono:",
  options:["Cromosoma metafasico → fibra da 30 nm → DNA nudo → nucleosoma","DNA nudo (2 nm) → nucleosoma (10 nm) → fibra da 30 nm/solenoide → domini ad ansa (300 nm) → eterocromatina (700 nm) → cromosoma metafasico (1400 nm)","Nucleosoma → DNA nudo → cromosoma metafasico → fibra da 30 nm","Eterocromatina → eucromatina → DNA nudo, senza altri passaggi","Il DNA passa direttamente da nudo a cromosoma metafasico"], correct:1 },

{ id:"acnu-08", topic:"acidinucleici", type:"mc",
  q:"L'eucromatina, rispetto all'eterocromatina, è:",
  options:["Più condensata e sempre trascrizionalmente inattiva","Meno condensata (lassa) e generalmente trascrizionalmente attiva","Identica per grado di condensazione","Presente solo nelle cellule procariotiche","Priva di istoni associati"], correct:1 },

{ id:"acnu-09", topic:"acidinucleici", type:"mc",
  q:"L'eterocromatina facoltativa, a differenza di quella costitutiva:",
  options:["Resta sempre condensata e non trascritta in tutte le cellule","È inattivata solo in specifiche fasi dello sviluppo o in determinati tipi cellulari, potendo tornare attiva","Non è mai presente nel genoma eucariotico","È composta esclusivamente da RNA, senza DNA","Si trova solo nel DNA mitocondriale"], correct:1 },

{ id:"acnu-10", topic:"acidinucleici", type:"mc",
  q:"Alla metafase, i due cromatidi fratelli di un cromosoma sono tenuti insieme, a livello del centromero, da:",
  options:["I telomeri","Le proteine coesine","I ribosomi","La lamina nucleare","Le DNA polimerasi"], correct:1 },

{ id:"acnu-11", topic:"acidinucleici", type:"mc",
  q:"Un cromosoma con il centromero in posizione centrale, con bracci p e q di lunghezza simile, è classificato come:",
  options:["Acrocentrico","Telocentrico","Metacentrico","Aneuploide","Poliploide"], correct:2 },

{ id:"acnu-12", topic:"acidinucleici", type:"mc",
  q:"La dimensione del genoma di un organismo:",
  options:["È sempre direttamente proporzionale alla sua complessità biologica","Non è necessariamente proporzionale alla complessità dell'organismo, poiché gran parte del DNA eucariotico è costituito da sequenze ripetute non codificanti","Determina univocamente il numero di specie di un taxon","È identica in tutti gli organismi eucarioti","Dipende esclusivamente dal numero di cromosomi"], correct:1 },

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
  options:["Uno zucchero pentoso, un gruppo fosfato e una base azotata","Due zuccheri pentosi e una base azotata","Un amminoacido, un fosfato e uno zucchero","Solo una base azotata e un fosfato","Uno zucchero esoso e due basi azotate"], correct:0 },

{ id:"acnu-20", topic:"acidinucleici", type:"mc",
  q:"La differenza chimica fondamentale tra ribosio (RNA) e desossiribosio (DNA) riguarda il carbonio 2', che nel ribosio presenta:",
  options:["Un gruppo -OH, assente nel desossiribosio (che ha solo -H)","Un gruppo fosfato aggiuntivo","Un atomo di azoto in più","Un doppio legame aggiuntivo","Un gruppo amminico"], correct:0 },

{ id:"acnu-21", topic:"acidinucleici", type:"mc",
  q:"Il gruppo -OH aggiuntivo del ribosio, rispetto al desossiribosio, rende l'RNA:",
  options:["Chimicamente più reattivo e strutturalmente meno stabile, più soggetto a idrolisi spontanea","Chimicamente inerte","Più stabile del DNA","Privo di carica elettrica","Incapace di formare legami fosfodiesterici"], correct:0 },

{ id:"acnu-22", topic:"acidinucleici", type:"mc",
  q:"Le basi azotate puriniche, caratterizzate da un anello doppio (un anello a 6 e uno a 5 atomi fusi), sono:",
  options:["Adenina e guanina","Citosina e timina","Timina e uracile","Adenina e citosina","Guanina e uracile"], correct:0 },

{ id:"acnu-23", topic:"acidinucleici", type:"mc",
  q:"Le basi azotate pirimidiniche, con un anello singolo a sei termini, sono citosina, timina e:",
  options:["Uracile (presente solo nell'RNA)","Guanina","Adenina","Ribosio","Desossiribosio"], correct:0 },

{ id:"acnu-24", topic:"acidinucleici", type:"mc",
  q:"La base azotata si lega allo zucchero pentoso tramite un legame:",
  options:["N-glicosidico, tra il carbonio 1' dello zucchero e un azoto della base","Fosfodiesterico","Peptidico","Idrogeno covalente","Estere tra due zuccheri"], correct:0 },

{ id:"acnu-25", topic:"acidinucleici", type:"mc",
  q:"In termini di nomenclatura, l'unione di sola base azotata e zucchero (senza fosfato) prende il nome di:",
  options:["Nucleoside","Nucleotide","Nucleosoma","Nucleolo","Nucleina"], correct:0 },

{ id:"acnu-26", topic:"acidinucleici", type:"mc",
  q:"Il legame che unisce due nucleotidi successivi nella catena di un acido nucleico, formatosi tra il gruppo -OH in 3' di uno zucchero e il gruppo fosfato in 5' del nucleotide successivo, si chiama legame:",
  options:["Fosfodiesterico","N-glicosidico","Peptidico","A idrogeno","Glicosidico O"], correct:0 },

{ id:"acnu-27", topic:"acidinucleici", type:"mc",
  q:"Gli enzimi che sintetizzano acidi nucleici (DNA e RNA polimerasi) allungano la catena in crescita esclusivamente in direzione:",
  options:["5' → 3', aggiungendo nuovi nucleotidi all'estremità 3'-OH libera","3' → 5'","In entrambe le direzioni indifferentemente","Dal centro verso le due estremità","Solo in direzione 3' → 3'"], correct:0 },

{ id:"acnu-28", topic:"acidinucleici", type:"mc",
  q:"Le due estremità di un filamento di acido nucleico sono chimicamente diverse: l'estremità 5' termina con un gruppo fosfato libero, mentre l'estremità 3' termina con:",
  options:["Un gruppo ossidrile (-OH) libero","Un'altra base azotata libera","Un secondo gruppo fosfato","Un gruppo amminico libero","Un legame peptidico"], correct:0 },

{ id:"acnu-29", topic:"acidinucleici", type:"mc",
  q:"Griffith (1928), studiando ceppi di Streptococcus pneumoniae, scoprì il cosiddetto 'principio trasformante' osservando che:",
  options:["Batteri R vivi, iniettati insieme a batteri S morti per calore, acquisivano la capacità di essere virulenti come i batteri S","I batteri S da soli non erano mai virulenti","I batteri R non potevano mai essere trasformati","Il principio trasformante era certamente una proteina","Il topo sopravviveva sempre a qualunque combinazione di batteri"], correct:0,
  explain:"Griffith dimostrò che un'informazione ereditaria poteva essere trasferita da una cellula batterica a un'altra, senza però identificare la natura chimica del principio trasformante." },

{ id:"acnu-30", topic:"acidinucleici", type:"mc",
  q:"Avery, McLeod e McCarty (1944), trattando selettivamente l'estratto di batteri S morti con enzimi che distruggevano proteine, RNA o DNA, dimostrarono che il principio trasformante di Griffith era:",
  options:["Il DNA","Le proteine","L'RNA","I lipidi di membrana","I polisaccaridi della capsula"], correct:0 },

{ id:"acnu-31", topic:"acidinucleici", type:"mc",
  q:"Chargaff (1950), analizzando la composizione in basi del DNA di organismi diversi, scoprì la regolarità secondo cui:",
  options:["La quantità di adenina è sempre uguale a quella di timina, e quella di guanina a quella di citosina (A=T, G=C)","Tutte le basi sono sempre presenti in eguale quantità tra loro","La quantità di purine è sempre doppia rispetto a quella delle pirimidine","Il DNA contiene sempre più uracile che timina","La composizione in basi è identica in tutti gli organismi"], correct:0 },

{ id:"acnu-32", topic:"acidinucleici", type:"mc",
  q:"Hershey e Chase (1952), utilizzando un batteriofago marcato con isotopi radioattivi ($^{32}P$ per il DNA e $^{35}S$ per le proteine), dimostrarono definitivamente che:",
  options:["Il materiale genetico trasmesso alla progenie virale è il DNA, non le proteine","Il materiale genetico è costituito da proteine","DNA e proteine contribuiscono in egual misura al materiale genetico","I batteriofagi non contengono acidi nucleici","Il fosforo non è mai presente negli acidi nucleici"], correct:0 },

{ id:"acnu-33", topic:"acidinucleici", type:"mc",
  q:"Le immagini di diffrazione a raggi X ottenute da Franklin e Wilkins sul DNA, caratterizzate da una tipica forma a X, fornirono una forte indicazione della presenza di:",
  options:["Una struttura elicoidale, con gruppi fosfato rivolti verso l'esterno","Una struttura completamente lineare e non ripetitiva","Una struttura a foglietto piatto","Un'assenza totale di periodicità nella molecola","Una struttura globulare compatta priva di simmetria"], correct:0 },

{ id:"acnu-34", topic:"acidinucleici", type:"mc",
  q:"Watson e Crick (1953) proposero un modello di DNA costituito da due filamenti antiparalleli avvolti l'uno attorno all'altro, con le basi appaiate secondo il principio di complementarità: adenina con timina (2 legami idrogeno) e guanina con:",
  options:["Citosina, tramite 3 legami idrogeno","Adenina, tramite 1 legame idrogeno","Uracile, tramite 2 legami idrogeno","Guanina stessa","Timina, tramite 4 legami idrogeno"], correct:0 },

{ id:"acnu-35", topic:"acidinucleici", type:"mc",
  q:"Nella struttura B-DNA, la conformazione fisiologica predominante nella cellula, un giro completo dell'elica misura circa 3,4 nm e contiene:",
  options:["10 paia di basi","1 paio di basi","100 paia di basi","2 paia di basi","1000 paia di basi"], correct:0 },

{ id:"acnu-36", topic:"acidinucleici", type:"mc",
  q:"Sulla superficie della doppia elica del DNA sono presenti due solchi di ampiezza diversa; è all'interno del solco maggiore che:",
  options:["Le proteine regolatrici (fattori di trascrizione, enzimi) leggono la sequenza di basi senza dover aprire l'elica","Avviene sempre la denaturazione del DNA","Si legano esclusivamente gli istoni","Ha luogo la sintesi dei ribosomi","Si formano i nucleosomi"], correct:0 },

{ id:"acnu-37", topic:"acidinucleici", type:"mc",
  q:"Nella denaturazione del DNA, il riscaldamento o il pH estremo rompono:",
  options:["I legami idrogeno tra le basi appaiate, lasciando intatto lo scheletro zucchero-fosfato","I legami fosfodiesterici covalenti dello scheletro","Sia i legami idrogeno sia quelli fosfodiesterici in modo permanente","Solo i legami tra zucchero e base","Nessun tipo di legame, ma solo interazioni idrofobiche"], correct:0 },

{ id:"acnu-38", topic:"acidinucleici", type:"mc",
  q:"A parità di lunghezza, una molecola di DNA con un contenuto maggiore di coppie G-C, rispetto a una ricca in coppie A-T, denatura a una temperatura di melting:",
  options:["Più alta, perché le coppie G-C sono tenute insieme da 3 legami idrogeno invece di 2","Più bassa","Uguale, perché la Tm non dipende dalla composizione in basi","Pari a 0 °C in ogni caso","Indipendente dalla lunghezza della molecola"], correct:0 },

{ id:"acnu-39", topic:"acidinucleici", type:"mc",
  q:"L'effetto ipercromico osservato durante la denaturazione del DNA consiste in:",
  options:["Un aumento dell'assorbanza a 260 nm, perché le basi impilate nel doppio filamento assorbivano meno UV rispetto a quando sono libere in un singolo filamento","Una diminuzione dell'assorbanza a 260 nm","Un aumento della fluorescenza visibile","Una perdita totale di assorbimento UV","Un cambiamento di colore visibile a occhio nudo"], correct:0 },

{ id:"acnu-40", topic:"acidinucleici", type:"mc",
  q:"Se, dopo denaturazione, due filamenti complementari provenienti da fonti diverse (es. specie diverse, o DNA ed RNA) si riappaiano, il processo prende il nome di:",
  options:["Ibridazione","Rinaturazione semplice","Trascrizione","Traduzione","Ricombinazione"], correct:0 },

{ id:"acnu-41", topic:"acidinucleici", type:"mc",
  q:"A differenza del DNA, l'RNA utilizza come base pirimidinica l'uracile al posto della timina; questa scelta, nel DNA, permette al sistema di riparazione cellulare di:",
  options:["Riconoscere come errore l'uracile generato dalla deaminazione spontanea della citosina, distinguendolo da una base corretta","Aumentare la velocità di replicazione","Impedire la trascrizione dei geni","Formare più facilmente i nucleosomi","Stabilizzare i legami idrogeno con la guanina"], correct:0 },

{ id:"acnu-42", topic:"acidinucleici", type:"mc",
  q:"L'RNA, a differenza del DNA, è generalmente:",
  options:["A singolo filamento, ma capace di ripiegarsi su se stesso formando strutture secondarie (anse, forcine, strutture a stelo)","Sempre a doppio filamento rigido","Privo di basi azotate","Incapace di legare proteine","Privo di gruppo fosfato"], correct:0 },

{ id:"acnu-43", topic:"acidinucleici", type:"mc",
  q:"L'RNA messaggero (mRNA), unico tra i principali tipi di RNA a portare un'informazione diversa a ogni sintesi, presenta tipicamente:",
  options:["Un cappuccio (cap) in 5' e una coda poli-A in 3', che ne aumentano la stabilità e ne regolano l'espressione","Solo un anticodone in 5'","Una struttura a trifoglio permanente","Una sequenza identica in ogni cellula, indipendentemente dal gene trascritto","Nessuna modificazione alle estremità"], correct:0 },

{ id:"acnu-44", topic:"acidinucleici", type:"mc",
  q:"Il tRNA (transfer), che fa da adattatore tra il linguaggio dei codoni e quello degli amminoacidi, si ripiega in una tipica struttura a due dimensioni detta:",
  options:["Trifoglio (cloverleaf), che nello spazio si avvolge in una forma a L","Doppia elica rigida","Foglietto β continuo","Anello privo di struttura secondaria","Struttura globulare compatta priva di basi appaiate"], correct:0 },

{ id:"acnu-45", topic:"acidinucleici", type:"mc",
  q:"L'rRNA (ribosomiale), componente strutturale e catalitico dei ribosomi, è responsabile della catalisi della formazione del legame peptidico durante la sintesi proteica: questo rende il ribosoma un esempio di:",
  options:["Ribozima, cioè un enzima costituito da RNA","Proteasoma","Spliceosoma","Chaperonina","Complesso SRP"], correct:0,
  explain:"Il fatto che l'RNA possa sia conservare informazione sia catalizzare reazioni è una delle prove più forti a sostegno dell'ipotesi del mondo a RNA (RNA world)." },

{ id:"acnu-46", topic:"acidinucleici", type:"mc",
  q:"La replicazione del DNA è definita semiconservativa, in base al modello confermato dall'esperimento di Meselson e Stahl, perché:",
  options:["Ogni molecola di DNA figlia contiene un filamento parentale (stampo) e uno di nuova sintesi","Entrambi i filamenti figli sono completamente nuovi","Entrambi i filamenti figli sono completamente conservati dal genitore","I filamenti si mescolano in segmenti alternati casuali (modello dispersivo)","Solo metà delle molecole figlie contiene DNA nuovo"], correct:0 },

{ id:"acnu-47", topic:"acidinucleici", type:"mc",
  q:"L'enzima che apre la doppia elica rompendo i legami idrogeno tra le basi, durante la replicazione del DNA, è:",
  options:["L'elicasi","La DNA polimerasi","La ligasi","La primasi","La topoisomerasi soltanto"], correct:0 },

{ id:"acnu-48", topic:"acidinucleici", type:"mc",
  q:"Le proteine SSB (single-strand binding proteins), durante la replicazione del DNA, hanno la funzione di:",
  options:["Legarsi ai filamenti singoli appena separati, impedendo che si riappaino prematuramente","Sintetizzare il primer di RNA","Tagliare e risaldare il DNA per rilasciare la tensione torsionale","Correggere gli errori di appaiamento delle basi","Saldare i frammenti di Okazaki"], correct:0 },

{ id:"acnu-49", topic:"acidinucleici", type:"mc",
  q:"La tensione torsionale generata dall'apertura della doppia elica durante la replicazione viene rilasciata dall'azione di:",
  options:["La topoisomerasi, che taglia e risalda il DNA a monte della forcella","La DNA ligasi","La proteina FtsZ","Le proteine SSB","La telomerasi"], correct:0 },

{ id:"acnu-50", topic:"acidinucleici", type:"mc",
  q:"Poiché la DNA polimerasi non è in grado di iniziare la sintesi di una nuova catena da zero, ma solo di allungarne una già esistente, è necessaria la sintesi preliminare di un breve primer a RNA, ad opera dell'enzima:",
  options:["Primasi","Elicasi","Ligasi","Topoisomerasi","Esonucleasi"], correct:0 },

{ id:"acnu-51", topic:"acidinucleici", type:"mc",
  q:"Poiché la DNA polimerasi sintetizza solo in direzione 5'→3' e i due filamenti stampo sono antiparalleli, uno dei due nuovi filamenti (leading strand) viene sintetizzato in modo continuo, mentre l'altro (lagging strand) viene sintetizzato in modo discontinuo, a piccoli tratti chiamati:",
  options:["Frammenti di Okazaki","Introni","Nucleosomi","Codoni","Anticodoni"], correct:0 },

{ id:"acnu-52", topic:"acidinucleici", type:"mc",
  q:"Dopo la rimozione dei primer di RNA e il loro completamento con DNA, l'interruzione (nick) residua nello scheletro zucchero-fosfato tra un frammento di Okazaki e il successivo viene saldata dall'enzima:",
  options:["DNA ligasi, formando il legame fosfodiesterico mancante","DNA polimerasi soltanto","Elicasi","Primasi","Topoisomerasi"], correct:0 },

{ id:"acnu-53", topic:"acidinucleici", type:"mc",
  q:"L'elevata fedeltà della replicazione del DNA è garantita anche dall'attività esonucleasica di correzione di bozze (proofreading) della DNA polimerasi, che agisce in direzione:",
  options:["3' → 5', controllando e correggendo ogni base appena aggiunta","5' → 3' soltanto, nella stessa direzione della sintesi","In direzione casuale","Solo dopo il completamento dell'intera molecola","Solo sui frammenti di Okazaki, mai sul filamento veloce"], correct:0 },

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

/* ============================= ORGANELLI E CITOSCHELETRO ============================= */

{ id:"org-01", topic:"organelli", type:"mc",
  q:"L'involucro nucleare è costituito da una doppia membrana che è in continuità con:",
  options:["La membrana plasmatica","Il reticolo endoplasmatico","L'apparato del Golgi","I lisosomi","I perossisomi"], correct:1 },

{ id:"org-02", topic:"organelli", type:"mc",
  q:"Il trasporto selettivo di proteine di grandi dimensioni attraverso i pori nucleari richiede:",
  options:["Nessun segnale specifico: avviene sempre per diffusione libera","Una sequenza segnale di localizzazione nucleare (NLS)","Solo la presenza di flippasi","Un legame covalente permanente con il DNA","L'idrolisi diretta di NADH"], correct:1 },

{ id:"org-03", topic:"organelli", type:"mc",
  q:"La lamina nucleare, che sostiene la forma del nucleo e ancora la cromatina, è costituita da una rete di:",
  options:["Microtubuli","Filamenti intermedi (lamine A, B, C)","Microfilamenti di actina","Molecole di rRNA","Fosfolipidi di membrana"], correct:1 },

{ id:"org-04", topic:"organelli", type:"mc",
  q:"Il nucleolo è la sede principale:",
  options:["Della duplicazione del DNA","Della trascrizione dei geni per l'rRNA e del primo assemblaggio delle subunità ribosomali","Della sintesi proteica citoplasmatica","Della glicolisi","Della β-ossidazione degli acidi grassi"], correct:1 },

{ id:"org-05", topic:"organelli", type:"mc",
  q:"Il reticolo endoplasmatico ruvido (RER), grazie ai ribosomi adesi alla sua superficie citosolica, è specializzato nella:",
  options:["Sintesi di lipidi e steroidi","Sintesi e N-glicosilazione di proteine di membrana o destinate alla secrezione","Detossificazione da farmaci e xenobiotici","Stoccaggio esclusivo del $Ca^{2+}$","Digestione di macromolecole a pH acido"], correct:1 },

{ id:"org-06", topic:"organelli", type:"mc",
  q:"Il reticolo endoplasmatico liscio (SER) è coinvolto principalmente in:",
  options:["La sintesi e N-glicosilazione di proteine secrete","La sintesi di lipidi/steroidi, la detossificazione (citocromo P450) e lo stoccaggio del $Ca^{2+}$","L'assemblaggio delle subunità ribosomali","La duplicazione del DNA mitocondriale","La fagocitosi di particelle estranee"], correct:1 },

{ id:"org-07", topic:"organelli", type:"mc",
  q:"I ribosomi liberi nel citoplasma delle cellule eucariotiche sono di tipo:",
  options:["70S, come quelli procariotici","80S, costituiti da una subunità maggiore 60S e una minore 40S","Privi di componente RNA","Presenti solo nel nucleo","Costituiti da un'unica subunità"], correct:1 },

{ id:"org-08", topic:"organelli", type:"mc",
  q:"I mitocondri sono definiti organelli 'semiautonomi' perché:",
  options:["Non contengono alcuna proteina propria","Possiedono un proprio DNA circolare e ribosomi di tipo 70S, ma dipendono comunque dal nucleo per la maggior parte delle loro proteine","Sono completamente indipendenti dal resto della cellula","Derivano direttamente dall'apparato del Golgi","Non sono mai in grado di dividersi"], correct:1 },

{ id:"org-09", topic:"organelli", type:"mc",
  q:"Le creste mitocondriali sono ripiegamenti:",
  options:["Della membrana esterna del mitocondrio","Della membrana interna del mitocondrio, che aumentano la superficie disponibile per la fosforilazione ossidativa","Della membrana plasmatica","Dell'involucro nucleare","Della membrana dei perossisomi"], correct:1 },

{ id:"org-10", topic:"organelli", type:"mc",
  q:"Nell'apparato del Golgi, le vescicole provenienti dal reticolo endoplasmatico arrivano sulla faccia:",
  options:["Trans, da cui il materiale viene poi rispedito al RE","Cis, da cui il materiale procede attraverso le cisterne mediali verso la faccia trans","Non esiste una polarità funzionale nel Golgi","Laterale","Basale"], correct:1 },

{ id:"org-11", topic:"organelli", type:"mc",
  q:"Gli enzimi idrolitici contenuti nei lisosomi sono attivi a:",
  options:["pH basico, circa 9","pH acido, circa 5, mantenuto da una pompa protonica di membrana","pH neutro, uguale a quello del citosol","Temperature superiori a 60 °C","Completa assenza di acqua"], correct:1 },

{ id:"org-12", topic:"organelli", type:"mc",
  q:"I perossisomi, che contengono l'enzima catalasi, sono coinvolti principalmente in:",
  options:["La sintesi di rRNA","La β-ossidazione degli acidi grassi a catena molto lunga e in reazioni di detossificazione","La duplicazione del DNA nucleare","La glicolisi anaerobica","La sintesi esclusiva di ormoni steroidei"], correct:1 },

{ id:"org-13", topic:"organelli", type:"mc",
  q:"Il citoscheletro delle cellule eucariotiche è costituito da tre tipi di filamenti proteici:",
  options:["Solo microtubuli","Microfilamenti di actina, microtubuli e filamenti intermedi","Solo filamenti di miosina","Solo filamenti di cheratina","Fibre di collagene"], correct:1 },

{ id:"org-14", topic:"organelli", type:"mc",
  q:"Lungo i microtubuli si muovono le proteine motrici chinesina e dineina, dirette rispettivamente verso l'estremità:",
  options:["'−' entrambe","'+' entrambe","'+' la chinesina e '−' la dineina, nella maggior parte dei casi","'−' la chinesina e '+' la dineina","Nessuna delle due si muove lungo i microtubuli"], correct:2 },

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
  options:["Si dissocia completamente in ioni","Si dissocia solo parzialmente in ioni","Non si dissocia affatto","Forma sempre un precipitato insolubile","Conduce corrente solo allo stato fuso, mai in soluzione"], correct:0,
  explain:"NaCl, HCl e NaOH sono esempi tipici di elettroliti forti, con grado di dissociazione α = 1." },

{ id:"sol-02", topic:"soluzioni", type:"mc",
  q:"Un elettrolita debole, come l'acido acetico $CH_3COOH$, in soluzione acquosa:",
  options:["Si dissocia solo parzialmente in ioni, stabilendo un equilibrio con la forma indissociata","Si dissocia completamente in ioni","Non conduce affatto corrente elettrica","Ha grado di dissociazione α = 1","È insolubile in acqua"], correct:0 },

{ id:"sol-03", topic:"soluzioni", type:"mc",
  q:"Una sostanza come il glucosio, che in soluzione acquosa non si dissocia in ioni, si definisce:",
  options:["Non elettrolita","Elettrolita forte","Elettrolita debole","Anfolita","Elettrolita anfotero"], correct:0 },

{ id:"sol-04", topic:"soluzioni", type:"mc",
  q:"Il grado di dissociazione α di un elettrolita esprime:",
  options:["La frazione di moli di soluto che si dissocia in ioni rispetto al totale disciolto","La massa molare del soluto","Il numero di ioni prodotti da ciascuna formula unitaria","La solubilità massima del soluto in g/L","La conducibilità elettrica assoluta della soluzione"], correct:0 },

{ id:"sol-05", topic:"soluzioni", type:"fill",
  q:"Il grado di dissociazione di un elettrolita forte, completamente dissociato, vale α = ________ (in forma decimale).",
  answer:"1", answerAlt:["1,0","100%"] },

{ id:"sol-06", topic:"soluzioni", type:"mc",
  q:"L'indice di dissociazione (o dislocazione) n di un sale indica:",
  options:["Il numero di ioni in cui si dissocia una singola formula unitaria del sale","Il grado di dissociazione percentuale","La solubilità del sale in acqua","Il coefficiente isotonico della soluzione","La massa molare del sale"], correct:0,
  explain:"Es. NaCl → n = 2 (Na⁺ e Cl⁻); CaCl₂ → n = 3 (Ca²⁺ e 2 Cl⁻)." },

{ id:"sol-07", topic:"soluzioni", type:"mc",
  q:"Il coefficiente isotonico (fattore di van't Hoff) i è legato al grado di dissociazione α e all'indice di dissociazione n dalla relazione:",
  options:["$i = 1 + \\alpha(n-1)$","$i = \\alpha \\cdot n$","$i = n - \\alpha$","$i = \\dfrac{n}{\\alpha}$","$i = 1 - \\alpha(n-1)$"], correct:0 },

{ id:"sol-08", topic:"soluzioni", type:"mc",
  q:"Per un non elettrolita (α = 0), il coefficiente isotonico i vale:",
  options:["1","0","n","n − 1","2"], correct:0,
  explain:"Con α = 0: $i=1+0\\cdot(n-1)=1$, quindi la concentrazione effettiva coincide con quella teorica." },

{ id:"sol-09", topic:"soluzioni", type:"mc",
  q:"Per un elettrolita forte completamente dissociato (α = 1), il coefficiente isotonico i coincide con:",
  options:["L'indice di dissociazione n","Il grado di dissociazione α","Sempre 1, indipendentemente da n","La molarità della soluzione","Zero"], correct:0,
  explain:"Con α = 1: $i=1+1\\cdot(n-1)=n$." },

{ id:"sol-10", topic:"soluzioni", type:"mc",
  q:"Calcolare il coefficiente isotonico di una soluzione di CsBr (elettrolita forte, n = 2):",
  options:["2","1","0,5","4","1,5"], correct:0 },

{ id:"sol-11", topic:"soluzioni", type:"mc",
  q:"Calcolare il coefficiente isotonico di $HNO_2$ (acido debole, α = 30%, n = 2):",
  options:["1,3","1,0","2,0","0,3","0,7"], correct:0,
  explain:"$i=1+0{,}30\\times(2-1)=1{,}3$." },

{ id:"sol-12", topic:"soluzioni", type:"fill",
  q:"Il coefficiente isotonico dell'acido acetico $CH_3COOH$, con grado di dissociazione α = 10%, vale i = ________.",
  answer:"1,1", answerAlt:["1.1"] },

{ id:"sol-13", topic:"soluzioni", type:"mc",
  q:"La concentrazione effettiva (osmoticamente attiva) di una soluzione si ottiene moltiplicando la concentrazione molare teorica per:",
  options:["Il coefficiente isotonico i","Il grado di dissociazione α","L'indice di dissociazione n","Il volume della soluzione","La costante crioscopica"], correct:0 },

{ id:"sol-14", topic:"soluzioni", type:"fill",
  q:"L'unità che contiene un numero di Avogadro di particelle osmoticamente attive (ioni o molecole indissociate) si chiama ________.",
  answer:"OSMOLE", answerAlt:["OSMOLI"] },

{ id:"sol-15", topic:"soluzioni", type:"mc",
  q:"L'osmolarità (osM) di una soluzione è definita come:",
  options:["Numero di osmoli per litro di soluzione","Numero di moli per litro di soluzione","Numero di osmoli per kg di solvente","Massa di soluto per litro di soluzione","Numero di ioni per mole di soluto"], correct:0,
  explain:"Da non confondere con la molalità (mol soluto/kg solvente): l'osmolarità è riferita al litro di soluzione." },

{ id:"sol-16", topic:"soluzioni", type:"mc",
  q:"La relazione tra osmolarità (osM) e molarità (M) di una soluzione è:",
  options:["$osM = M \\cdot i$","$osM = M / i$","$osM = M + i$","$osM = M - i$","$osM = i / M$"], correct:0 },

{ id:"sol-17", topic:"soluzioni", type:"mc",
  q:"Per le soluzioni non elettrolitiche (i = 1), l'osmolarità:",
  options:["Coincide numericamente con la molarità","È sempre doppia della molarità","È sempre nulla","Dipende dalla temperatura, non dalla molarità","È indipendente dalla concentrazione"], correct:0 },

{ id:"sol-18", topic:"soluzioni", type:"mc",
  q:"L'osmolarità del plasma sanguigno umano è approssimativamente:",
  options:["310 mosM","100 mosM","1000 mosM","50 mosM","750 mosM"], correct:0 },

{ id:"sol-19", topic:"soluzioni", type:"mc",
  q:"Una soluzione fisiologica di NaCl allo 0,9% (p/V) ha un'osmolarità di circa:",
  options:["308 mosM, sostanzialmente isotonica al plasma","154 mosM, ipotonica al plasma","616 mosM, ipertonica al plasma","900 mosM","90 mosM"], correct:0,
  explain:"$M\\approx0{,}154\\ \\text{mol/L}$; poiché NaCl è un elettrolita forte con i = 2, $osM=0{,}154\\times2=0{,}308\\ \\text{osM/L}=308$ mosM." },

{ id:"sol-20", topic:"soluzioni", type:"mc",
  q:"Rispetto a una soluzione di riferimento, una soluzione con osmolarità inferiore si definisce:",
  options:["Ipotonica","Ipertonica","Isotonica","Satura","Sovrassatura"], correct:0 },

{ id:"sol-21", topic:"soluzioni", type:"mc",
  q:"Rispetto a una soluzione di riferimento, una soluzione con osmolarità superiore si definisce:",
  options:["Ipertonica","Ipotonica","Isotonica","Diluita","Neutra"], correct:0 },

{ id:"sol-22", topic:"soluzioni", type:"mc",
  q:"Se un eritrocita viene immerso in una soluzione ipotonica rispetto al citoplasma, si osserva:",
  options:["Emolisi: rottura della cellula per rigonfiamento, causato dall'ingresso netto di acqua","Plasmolisi: raggrinzimento per uscita netta di acqua","Nessuna variazione di volume","Solidificazione della membrana","Un aumento dell'osmolarità intracellulare"], correct:0 },

{ id:"sol-23", topic:"soluzioni", type:"mc",
  q:"Se un eritrocita viene immerso in una soluzione ipertonica rispetto al citoplasma, si osserva:",
  options:["Plasmolisi: raggrinzimento della cellula per uscita netta di acqua","Emolisi: rottura per rigonfiamento","Nessuna variazione di volume","Un aumento del volume cellulare","La fusione con altre cellule"], correct:0 },

{ id:"sol-24", topic:"soluzioni", type:"fill",
  q:"La rottura del globulo rosso per rigonfiamento, causata dall'ingresso netto di acqua in seguito a trattamento con soluzioni ipotoniche, si chiama ________.",
  answer:"EMOLISI" },

{ id:"sol-25", topic:"soluzioni", type:"fill",
  q:"Il raggrinzimento del globulo rosso, causato dall'uscita netta di acqua in seguito a trattamento con soluzioni ipertoniche, si chiama ________.",
  answer:"PLASMOLISI" },

{ id:"sol-26", topic:"soluzioni", type:"mc",
  q:"La legge di Raoult afferma che, in una soluzione, la tensione di vapore del solvente:",
  options:["Diminuisce in proporzione alla frazione molare del soluto disciolto","Aumenta in proporzione alla frazione molare del soluto","Resta invariata rispetto al solvente puro","Dipende solo dalla temperatura, non dal soluto","È indipendente dalla natura del solvente"], correct:0 },

{ id:"sol-27", topic:"soluzioni", type:"mc",
  q:"Le proprietà colligative di una soluzione (abbassamento crioscopico, innalzamento ebullioscopico, pressione osmotica, abbassamento della tensione di vapore) dipendono:",
  options:["Dal numero di particelle di soluto disciolte, non dalla loro natura chimica","Esclusivamente dalla natura chimica del soluto","Solo dalla temperatura della soluzione","Solo dal volume del solvente","Dalla massa molare del solvente"], correct:0 },

{ id:"sol-28", topic:"soluzioni", type:"mc",
  q:"L'abbassamento crioscopico di una soluzione è dato dalla relazione:",
  options:["$\\Delta T_{cr} = K_{cr} \\cdot m \\cdot i$","$\\Delta T_{cr} = K_{cr} / (m \\cdot i)$","$\\Delta T_{cr} = K_{cr} \\cdot M \\cdot i$ (con M molarità)","$\\Delta T_{cr} = K_{cr} + m + i$","$\\Delta T_{cr} = K_{cr} \\cdot m^2$"], correct:0,
  explain:"La costante crioscopica va moltiplicata per la molalità m (non la molarità) e per il coefficiente isotonico i." },

{ id:"sol-29", topic:"soluzioni", type:"mc",
  q:"L'innalzamento ebullioscopico di una soluzione è dato dalla relazione:",
  options:["$\\Delta T_{eb} = K_{eb} \\cdot m \\cdot i$","$\\Delta T_{eb} = K_{eb} \\cdot M$","$\\Delta T_{eb} = K_{eb} / m$","$\\Delta T_{eb} = K_{eb} - m \\cdot i$","$\\Delta T_{eb} = K_{eb} \\cdot i / m$"], correct:0 },

{ id:"sol-30", topic:"soluzioni", type:"mc",
  q:"Calcolare l'innalzamento ebullioscopico di una soluzione ottenuta sciogliendo 3,20 g di metanolo (non elettrolita, $PM=32{,}0\\ \\text{g/mol}$) in 100 g di acqua ($K_{eb}=0{,}56\\ °\\text{C}\\cdot\\text{m}^{-1}$):",
  options:["0,56 °C","1,12 °C","0,28 °C","5,6 °C","0,056 °C"], correct:0,
  explain:"$n=3{,}20/32{,}0=0{,}10\\ \\text{mol}$; $m=0{,}10\\ \\text{mol}/0{,}100\\ \\text{kg}=1{,}0\\ m$; $\\Delta T_{eb}=0{,}56\\times1{,}0\\times1=0{,}56\\ °\\text{C}$." },

{ id:"sol-31", topic:"soluzioni", type:"mc",
  q:"Secondo la legge di Fick, la diffusione di un soluto attraverso una membrana è direttamente proporzionale a:",
  options:["La differenza di concentrazione tra i due lati della membrana, e inversamente proporzionale allo spessore","Solo alla temperatura assoluta","Solo alla superficie della membrana, indipendentemente dalla concentrazione","Il quadrato della differenza di concentrazione","La viscosità del solvente"], correct:0 },

{ id:"sol-32", topic:"soluzioni", type:"mc",
  q:"Secondo la legge di Graham, la velocità di diffusione di un gas è:",
  options:["Inversamente proporzionale alla radice quadrata della sua massa molecolare","Direttamente proporzionale alla sua massa molecolare","Indipendente dalla massa molecolare","Proporzionale al quadrato della massa molecolare","Inversamente proporzionale alla temperatura"], correct:0,
  explain:"$v_1/v_2=\\sqrt{PM_2/PM_1}$: a parità di condizioni, i gas più leggeri diffondono più velocemente." },

{ id:"sol-33", topic:"soluzioni", type:"mc",
  q:"L'osmosi è definita come:",
  options:["Il passaggio netto di solvente attraverso una membrana semipermeabile, dal comparto meno concentrato verso quello più concentrato di soluto","Il passaggio di soluto attraverso una membrana, indipendentemente dal solvente","Un tipo di diffusione che riguarda solo i gas","Il passaggio di ioni attraverso canali proteici","La formazione di un precipitato in soluzione"], correct:0 },

{ id:"sol-34", topic:"soluzioni", type:"fill",
  q:"Una membrana che lascia passare il solvente ma non (o solo in parte) il soluto si dice membrana ________.",
  answer:"SEMIPERMEABILE" },

{ id:"sol-35", topic:"soluzioni", type:"mc",
  q:"La pressione osmotica π di una soluzione, secondo l'equazione di van't Hoff, si calcola come:",
  options:["$\\pi = i \\cdot M \\cdot R \\cdot T$","$\\pi = M / (R \\cdot T)$","$\\pi = i + M + R + T$","$\\pi = M \\cdot R / T$","$\\pi = i \\cdot M$"], correct:0 },

{ id:"sol-36", topic:"soluzioni", type:"mc",
  q:"La pressione osmotica si definisce operativamente come:",
  options:["La pressione che deve essere applicata al comparto più concentrato per impedire il passaggio netto di solvente per osmosi","La pressione atmosferica esercitata sulla soluzione","La pressione di vapore del solvente puro","La pressione a cui avviene l'ebollizione della soluzione","La pressione osmotica delle sole proteine plasmatiche"], correct:0 },

{ id:"sol-37", topic:"soluzioni", type:"mc",
  q:"Se si applica a una soluzione una pressione maggiore della sua pressione osmotica, si provoca:",
  options:["L'osmosi inversa, cioè il passaggio di solvente contro il gradiente di concentrazione","Un aumento della pressione osmotica stessa","La precipitazione del soluto","L'aumento della tensione di vapore","Nessun effetto misurabile"], correct:0 },

{ id:"sol-38", topic:"soluzioni", type:"mc",
  q:"La pressione oncotica (colloido-osmotica) del plasma è la pressione osmotica dovuta:",
  options:["Alle sole proteine plasmatiche (es. albumina, globuline), che non attraversano l'endotelio capillare","A tutti i soluti plasmatici, inclusi gli elettroliti","Esclusivamente al glucosio ematico","Alla componente gassosa disciolta nel plasma","Ai globuli rossi in sospensione"], correct:0 },

{ id:"sol-39", topic:"soluzioni", type:"mc",
  q:"L'emodialisi è una pratica medica che sfrutta principalmente:",
  options:["La diffusione e l'osmosi attraverso una membrana semipermeabile, per rimuovere dal sangue prodotti di scarto (es. urea, creatinina) e acqua in eccesso","Una reazione chimica di neutralizzazione acido-base","La sola forza di gravità, senza membrane","L'elettrolisi dell'acqua plasmatica","La centrifugazione del sangue"], correct:0 },

{ id:"sol-40", topic:"soluzioni", type:"fill",
  q:"Il passaggio di particelle attraverso una membrana semipermeabile, causato da un agente esterno come una pressione applicata anziché da un gradiente di concentrazione, si chiama ________.",
  answer:"ULTRAFILTRAZIONE" },

{ id:"sol-41", topic:"soluzioni", type:"mc",
  q:"Per calcolare la massa molare (PM) di un soluto incognito a partire da una misura di pressione osmotica π, si usa la relazione:",
  options:["$PM=\\dfrac{g_{sostanza}\\cdot R\\cdot T}{V\\cdot\\pi}$","$PM=\\pi\\cdot V\\cdot R\\cdot T$","$PM=\\dfrac{V\\cdot\\pi}{R\\cdot T}$","$PM=\\dfrac{R\\cdot T}{g_{sostanza}\\cdot\\pi}$","$PM=\\dfrac{g_{sostanza}\\cdot\\pi}{R\\cdot T\\cdot V}$"], correct:0 },

{ id:"sol-42", topic:"soluzioni", type:"mc",
  q:"Circa il 60% del peso corporeo umano è costituito da acqua, per il 40% nel liquido intracellulare e per il 20% nel liquido extracellulare. Quest'ultimo, a sua volta, è distribuito per circa:",
  options:["Il 15% nel liquido interstiziale e il 5% nel liquido plasmatico","Il 5% interstiziale e il 15% plasmatico","Interamente nel plasma","Interamente nel liquido interstiziale","Per metà nel liquido intracellulare"], correct:0 },

{ id:"sol-43", topic:"soluzioni", type:"mc",
  q:"La membrana plasmatica è fisiologicamente impermeabile al sodio, il cui gradiente di concentrazione è mantenuto attivamente da:",
  options:["La pompa sodio-potassio","La sola diffusione semplice","I canali per l'acqua (acquaporine)","Il trasportatore del glucosio","L'osmosi passiva"], correct:0 },

{ id:"sol-44", topic:"soluzioni", type:"mc",
  q:"Una miscela si definisce omogenea quando:",
  options:["Si presenta come un'unica fase, con composizione identica in ogni suo punto","Coesistono più fasi distinguibili","Contiene un solo componente puro","È sempre allo stato liquido","Non può contenere sali disciolti"], correct:0 },

{ id:"sol-45", topic:"soluzioni", type:"mc",
  q:"In una miscela, la componente più abbondante è detta fase disperdente, mentre la componente in minore quantità è detta:",
  options:["Fase dispersa","Fase continua","Fase disperdente","Fase satura","Fase colloidale"], correct:0 },

{ id:"sol-46", topic:"soluzioni", type:"mc",
  q:"In base alle dimensioni delle particelle della fase dispersa, una sospensione (es. il sangue) è caratterizzata da particelle di diametro:",
  options:["Maggiore di 1 µm, separabili per gravità","Minore di 1 nm","Compreso tra 1 nm e 1 µm","Sempre nullo","Uguale a quello delle molecole di solvente"], correct:0 },

{ id:"sol-47", topic:"soluzioni", type:"mc",
  q:"Un colloide, a differenza di una sospensione, è caratterizzato da particelle di diametro:",
  options:["Minore di 1 µm e maggiore di 1 nm, che non sedimentano","Sempre maggiore di 1 µm","Sempre minore di 1 nm","Uguale a quello degli ioni","Non misurabile"], correct:0 },

{ id:"sol-48", topic:"soluzioni", type:"mc",
  q:"Un sistema colloidale costituito da particelle liquide o solide disperse in un gas si definisce:",
  options:["Aerosol","Sospensione","Soluzione vera","Emulsione","Schiuma"], correct:0 },

{ id:"sol-49", topic:"soluzioni", type:"mc",
  q:"In una soluzione vera (sistema omogeneo), il diametro delle particelle della fase dispersa è:",
  options:["Inferiore a 1 nm","Sempre superiore a 1 µm","Compreso tra 1 e 100 µm","Variabile e non definibile","Uguale a quello di un colloide"], correct:0 },

{ id:"sol-50", topic:"soluzioni", type:"mc",
  q:"In una soluzione liquida, il solvente è definito come:",
  options:["Il componente in eccesso (fase disperdente)","Il componente in minore quantità","Sempre e solo l'acqua","La sostanza allo stato solido","Il componente che non può mai dissociarsi"], correct:0 },

{ id:"sol-51", topic:"soluzioni", type:"mc",
  q:"In una soluzione possono essere presenti più soluti, ma:",
  options:["Un unico solvente","Sempre esattamente due soluti","Un solo tipo di legame chimico","Nessun elettrolita","Sempre un solvente organico"], correct:0 },

{ id:"sol-52", topic:"soluzioni", type:"mc",
  q:"L'elevato potere solvente dell'acqua nei confronti di sostanze ioniche e polari è dovuto principalmente a:",
  options:["La sua elevata costante dielettrica e alla capacità di idratare le particelle di soluto","La sua bassa polarità","L'assenza di legami a idrogeno","La sua elevata viscosità","La sua bassa capacità termica"], correct:0 },

{ id:"sol-53", topic:"soluzioni", type:"mc",
  q:"La solubilità di un soluto è definita come:",
  options:["La quantità massima di soluto che può essere disciolta in una data quantità di solvente, a una data temperatura","La velocità con cui un soluto si scioglie","Il volume di una soluzione","La densità di una soluzione","Il numero di legami covalenti nel soluto"], correct:0 },

{ id:"sol-54", topic:"soluzioni", type:"mc",
  q:"Una soluzione satura è una soluzione che:",
  options:["Contiene disciolta la massima quantità di soluto possibile a quella temperatura","Non contiene alcun soluto","È sempre a temperatura ambiente","Non può più essere diluita","Contiene soltanto soluti gassosi"], correct:0 },

{ id:"sol-55", topic:"soluzioni", type:"mc",
  q:"La solubilità di un soluto in un dato solvente dipende da:",
  options:["Natura di soluto e solvente, temperatura e, per i soluti gassosi, pressione","Solo dal colore della soluzione","Solo dal volume del recipiente","Esclusivamente dal pH","Esclusivamente dalla massa molare del solvente"], correct:0 },

{ id:"sol-56", topic:"soluzioni", type:"mc",
  q:"La solubilità di solidi e liquidi in un solvente, in genere:",
  options:["Aumenta con la temperatura, essendo un processo endotermico","Diminuisce sempre con la temperatura","È indipendente dalla temperatura","Aumenta solo se il soluto è un elettrolita","Dipende solo dalla pressione"], correct:0,
  explain:"Esistono eccezioni, come il solfato di litio (Li₂SO₄), la cui solubilità decresce con la temperatura perché il processo di dissoluzione è esotermico." },

{ id:"sol-57", topic:"soluzioni", type:"mc",
  q:"A differenza di solidi e liquidi, la solubilità dei gas in un liquido, all'aumentare della temperatura:",
  options:["In genere decresce","In genere aumenta","Resta sempre costante","Diventa infinita","Dipende solo dalla pressione osmotica"], correct:0,
  explain:"Questo effetto ha conseguenze importanti per gli organismi acquatici: acque più calde contengono meno ossigeno disciolto." },

{ id:"sol-58", topic:"soluzioni", type:"mc",
  q:"La legge di Henry afferma che, a temperatura costante:",
  options:["La quantità di un gas che si scioglie in un liquido è direttamente proporzionale alla pressione parziale del gas","La solubilità di un gas è indipendente dalla pressione","La solubilità di un gas diminuisce all'aumentare della pressione","Solo i gas nobili obbediscono a questa legge","La legge si applica solo ai liquidi puri"], correct:0 },

{ id:"sol-59", topic:"soluzioni", type:"mc",
  q:"La legge di Henry spiega perché un sommozzatore che risale troppo rapidamente in superficie può incorrere:",
  options:["Nell'embolia gassosa, per formazione di bolle di azoto nel sangue","In una crisi ipoglicemica","In un'acidosi metabolica improvvisa","In una disidratazione acuta","In un aumento della pressione osmotica plasmatica"], correct:0 },

{ id:"sol-60", topic:"soluzioni", type:"mc",
  q:"La $CO_2$ ha una solubilità in acqua molto maggiore di quella prevista in base alla sola legge di Henry, perché:",
  options:["Reagisce con l'acqua formando acido carbonico ($H_2CO_3$)","È un gas molto pesante","Non obbedisce alle leggi dei gas","È completamente insolubile in acqua pura","Si lega covalentemente all'emoglobina come l'ossigeno"], correct:0 },

{ id:"sol-61", topic:"soluzioni", type:"mc",
  q:"Secondo la legge di Dalton delle pressioni parziali, la pressione totale di una miscela di gas è:",
  options:["La somma delle pressioni parziali di ciascun gas componente","Il prodotto delle pressioni parziali","Sempre uguale a 1 atm","Indipendente dalla composizione della miscela","La pressione parziale del gas più abbondante"], correct:0 },

{ id:"sol-62", topic:"soluzioni", type:"mc",
  q:"La pressione parziale di un componente di una miscela di gas si ottiene moltiplicando la pressione totale per:",
  options:["La frazione molare (o la percentuale in volume, %V/V) del componente","La sua massa molare","Il suo volume assoluto","La temperatura assoluta","Il numero totale di moli della miscela"], correct:0 },

{ id:"sol-63", topic:"soluzioni", type:"mc",
  q:"Nell'aria inspirata a livello del mare (1 atm ≈ 760 mmHg), composta per circa il 21% da ossigeno, la pressione parziale dell'ossigeno è di circa:",
  options:["160 mmHg","760 mmHg","21 mmHg","400 mmHg","78 mmHg"], correct:0 },

{ id:"sol-64", topic:"soluzioni", type:"mc",
  q:"Negli scambi gassosi a livello degli alveoli polmonari, il movimento di ossigeno e anidride carbonica tra alveoli e sangue avviene:",
  options:["Secondo un gradiente di pressione parziale, dalle zone a pressione parziale più alta a quelle a pressione parziale più bassa","Solo per trasporto attivo ATP-dipendente","In modo indipendente dalla pressione parziale dei gas","Solo durante l'espirazione","Esclusivamente per osmosi"], correct:0 },

{ id:"sol-65", topic:"soluzioni", type:"mc",
  q:"La frazione molare $X_A$ di un componente A in una soluzione è definita come:",
  options:["Il rapporto tra le moli di A e le moli totali di tutti i componenti della soluzione","Il rapporto tra i grammi di A e il volume totale","Il rapporto tra le moli di A e i grammi di solvente","Sempre uguale a 1 per ogni componente","Il rapporto tra la massa di A e quella del solvente puro"], correct:0 },

{ id:"sol-66", topic:"soluzioni", type:"mc",
  q:"La percentuale peso/peso (% p/p) di una soluzione indica:",
  options:["I grammi di soluto presenti in 100 g di soluzione","I grammi di soluto presenti in 100 mL di soluzione","I millilitri di soluto in 100 mL di soluzione","Le moli di soluto per litro di soluzione","Le moli di soluto per kg di solvente"], correct:0 },

{ id:"sol-67", topic:"soluzioni", type:"mc",
  q:"La percentuale peso/volume (% p/V) di una soluzione indica:",
  options:["I grammi di soluto presenti in 100 mL di soluzione","I grammi di soluto presenti in 100 g di solvente","I millilitri di soluto in 100 g di soluzione","Le moli di soluto per kg di solvente","Gli equivalenti di soluto per litro di soluzione"], correct:0 },

{ id:"sol-68", topic:"soluzioni", type:"mc",
  q:"La molalità (m) di una soluzione è definita come:",
  options:["Il numero di moli di soluto per kg di solvente","Il numero di moli di soluto per litro di soluzione","Il numero di grammi di soluto per litro di soluzione","Il numero di equivalenti di soluto per litro di soluzione","Il numero di moli di solvente per litro di soluzione"], correct:0,
  explain:"A differenza della molarità, la molalità è un rapporto tra masse e per questo non è influenzata dalla temperatura." },

{ id:"sol-69", topic:"soluzioni", type:"mc",
  q:"La normalità (N) di una soluzione è definita come:",
  options:["Il numero di equivalenti di soluto per litro di soluzione","Il numero di moli di soluto per litro di soluzione","Il numero di moli di soluto per kg di solvente","Il numero di grammi di soluto per 100 g di soluzione","Il numero di osmoli per litro di soluzione"], correct:0 },

{ id:"sol-70", topic:"soluzioni", type:"mc",
  q:"Il numero di equivalenti di uno ione si calcola come:",
  options:["Numero di moli dello ione moltiplicato per la sua carica","Numero di moli dello ione diviso per la sua carica","Numero di grammi dello ione diviso per la sua carica","Sempre uguale al numero di moli, indipendentemente dalla carica","Numero di moli moltiplicato per la massa molare"], correct:0 },

{ id:"sol-71", topic:"soluzioni", type:"mc",
  q:"In ambito clinico, la concentrazione degli elettroliti plasmatici viene spesso espressa in milliequivalenti per litro (mEq/L); il Sistema Internazionale raccomanda invece, per uniformità, l'uso di:",
  options:["Millimoli per litro (mmol/L)","Grammi per decilitro esclusivamente","Percentuale peso/volume","Osmoli per kg di solvente","Normalità"], correct:0 },

{ id:"sol-72", topic:"soluzioni", type:"mc",
  q:"La molarità (M) di una soluzione, la misura di concentrazione più utilizzata in chimica, è definita come:",
  options:["Il numero di moli di soluto per litro di soluzione","Il numero di moli di soluto per kg di solvente","Il numero di grammi di soluto per litro di solvente","Il numero di equivalenti di soluto per kg di solvente","Il numero di osmoli per kg di solvente"], correct:0 },

{ id:"sol-73", topic:"soluzioni", type:"mc",
  q:"In una soluzione ideale, le interazioni tra le molecole di soluto e quelle di solvente sono:",
  options:["Uguali alle interazioni tra le molecole dello stesso tipo nei rispettivi componenti puri, con entalpia di dissoluzione nulla","Sempre nulle","Sempre più forti delle interazioni nei componenti puri","Indipendenti dalla composizione della soluzione","Presenti solo se il soluto è un elettrolita"], correct:0 },

{ id:"sol-74", topic:"soluzioni", type:"mc",
  q:"Nello spazio intracellulare, i soluti non si comportano in modo ideale principalmente a causa:",
  options:["Dell'alta concentrazione di macromolecole e della limitata acqua libera","Della temperatura corporea troppo bassa","Dell'assenza di elettroliti","Della pressione atmosferica","Dell'assenza di membrane semipermeabili"], correct:0 },

{ id:"sol-75", topic:"soluzioni", type:"mc",
  q:"Il coefficiente di attività (γ) di una soluzione, che corregge la concentrazione molale o molare per ottenere l'attività chimica (a = γm), assume valore γ = 1 quando:",
  options:["La soluzione si comporta in modo ideale, e la concentrazione equivale all'attività","La soluzione è satura","Il soluto è un elettrolita forte","La temperatura è 0 °C","Il pH è neutro"], correct:0 },

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
  options:["14 m/s","9,8 m/s","19,6 m/s","4,9 m/s","98 m/s"], correct:0,
  explain:"Per conservazione dell'energia meccanica: $\\tfrac12 mv_f^2=mgh \\Rightarrow v_f=\\sqrt{2gh}=\\sqrt{2\\times9{,}8\\times10}\\approx14\\ \\text{m/s}$ (indipendente dalla massa)." },

{ id:"en-32", topic:"energia", type:"mc",
  q:"In un sistema massa-molla orizzontale senza attrito, quando la molla è compressa di x e il blocco è ancora fermo, l'energia meccanica del sistema è:",
  options:["Interamente potenziale elastica, $U_{el}=\\tfrac12 kx^2$","Interamente cinetica","Nulla","Metà cinetica e metà potenziale","Dipendente dalla massa del blocco"], correct:0,
  explain:"A blocco fermo $K=0$: tutta l'energia è immagazzinata come energia potenziale elastica della molla compressa; al rilascio si converte gradualmente in energia cinetica." },

{ id:"en-33", topic:"energia", type:"fill",
  q:"Nel teorema di conservazione dell'energia meccanica, un sistema si dice chiuso e isolato quando non vi sono scambi di ________ e di materia con l'esterno.",
  answer:"ENERGIA" },

{ id:"en-34", topic:"energia", type:"mc",
  q:"Se su un corpo agisce, oltre a forze conservative, anche una forza di attrito (non conservativa), l'energia meccanica del sistema:",
  options:["Non si conserva: diminuisce a causa della dissipazione","Si conserva comunque","Aumenta sempre","Resta nulla","Si conserva solo se il corpo è fermo"], correct:0 },

{ id:"en-35", topic:"energia", type:"mc",
  q:"Un motore solleva verticalmente, a velocità costante, un carico di 200 N per 15 m in 10 s. Qual è la potenza sviluppata dal motore?",
  options:["300 W","3000 W","30 W","2000 W","13,3 W"], correct:0,
  explain:"$P=\\dfrac{W}{t}=\\dfrac{Fd}{t}=\\dfrac{200\\times15}{10}=300\\ \\text{W}$." },

/* ============================= QUANTITÀ DI MOTO, URTI E CENTRO DI MASSA ============================= */

{ id:"qm-01", topic:"quantita_moto", type:"mc",
  q:"La quantità di moto di un corpo di massa m che si muove con velocità v è la grandezza vettoriale:",
  options:["$\\vec{q}=m\\vec{v}$","$\\vec{q}=\\tfrac12 mv^2$","$\\vec{q}=mg$","$\\vec{q}=m/v$","$\\vec{q}=v/m$"], correct:0 },

{ id:"qm-02", topic:"quantita_moto", type:"mc",
  q:"L'unità di misura della quantità di moto nel Sistema Internazionale è:",
  options:["kg·m/s","kg·m²/s²","N","kg/s","m/s²"], correct:0 },

{ id:"qm-03", topic:"quantita_moto", type:"mc",
  q:"Partendo dal secondo principio della dinamica, si definisce impulso di una forza costante applicata per un intervallo di tempo Δt la grandezza:",
  options:["$I=F\\Delta t$","$I=F/\\Delta t$","$I=m\\Delta t$","$I=F\\cdot m$","$I=\\Delta t/F$"], correct:0 },

{ id:"qm-04", topic:"quantita_moto", type:"mc",
  q:"Il teorema dell'impulso afferma che l'impulso di una forza applicata a un corpo è uguale a:",
  options:["La variazione della quantità di moto del corpo, $I=\\Delta q$","La variazione di energia cinetica del corpo","Il lavoro compiuto dalla forza","La variazione di velocità, indipendentemente dalla massa","Zero, sempre"], correct:0 },

{ id:"qm-05", topic:"quantita_moto", type:"mc",
  q:"L'unità di misura dell'impulso nel Sistema Internazionale è:",
  options:["N·s (equivalente a kg·m/s)","J","W","N/s","kg·m²"], correct:0 },

{ id:"qm-06", topic:"quantita_moto", type:"mc",
  q:"Il principio di conservazione della quantità di moto è diretta conseguenza:",
  options:["Del terzo principio della dinamica (azione e reazione)","Del primo principio della dinamica","Della legge di gravitazione universale","Del teorema dell'energia cinetica","Della legge di Hooke"], correct:0 },

{ id:"qm-07", topic:"quantita_moto", type:"mc",
  q:"In un sistema isolato, cioè soggetto a sole forze interne:",
  options:["La quantità di moto totale del sistema si conserva","L'energia cinetica totale si conserva sempre, in ogni tipo di urto","La massa totale del sistema diminuisce","Ogni corpo del sistema si ferma","Le forze interne producono un'accelerazione del centro di massa"], correct:0 },

{ id:"qm-08", topic:"quantita_moto", type:"mc",
  q:"Considerando due corpi A e B che interagiscono in un sistema isolato, per il terzo principio della dinamica $F_{AB}=-F_{BA}$, da cui segue che:",
  options:["La variazione della quantità di moto di A è uguale e opposta a quella di B: $\\Delta q_A+\\Delta q_B=0$","Le velocità di A e B restano sempre costanti","Le masse di A e B devono essere uguali","L'energia cinetica di A è sempre uguale a quella di B","A e B non possono mai interagire"], correct:0 },

{ id:"qm-09", topic:"quantita_moto", type:"mc",
  q:"Un urto tra due corpi si definisce elastico quando:",
  options:["Oltre alla quantità di moto, si conserva anche l'energia cinetica totale del sistema","Si conserva solo l'energia cinetica, non la quantità di moto","Nessuna delle due grandezze si conserva","I due corpi restano uniti dopo l'urto","L'energia cinetica totale aumenta"], correct:0 },

{ id:"qm-10", topic:"quantita_moto", type:"mc",
  q:"Un urto tra due corpi si definisce anelastico quando:",
  options:["L'energia cinetica totale non si conserva (in parte si trasforma in altre forme di energia), mentre la quantità di moto si conserva comunque","Sia la quantità di moto sia l'energia cinetica si conservano","Nessuna delle due grandezze si conserva","Si conserva solo l'energia cinetica","I due corpi si respingono a distanza infinita"], correct:0 },

{ id:"qm-11", topic:"quantita_moto", type:"mc",
  q:"In un urto completamente anelastico, in cui le due masse restano unite dopo l'urto, la conservazione della quantità di moto si scrive come:",
  options:["$m_1v_{1i}+m_2v_{2i}=(m_1+m_2)v_f$","$m_1v_{1i}+m_2v_{2i}=m_1v_{1f}+m_2v_{2f}$ con $v_{1f}\\ne v_{2f}$","$\\tfrac12m_1v_{1i}^2=\\tfrac12(m_1+m_2)v_f^2$","$m_1v_{1i}=m_2v_{2i}$","$v_{1i}=v_{2i}=v_f$ sempre"], correct:0 },

{ id:"qm-12", topic:"quantita_moto", type:"fill",
  q:"In un urto elastico unidimensionale tra due particelle si conservano sia la quantità di moto sia l'energia ________.",
  answer:"CINETICA" },

{ id:"qm-13", topic:"quantita_moto", type:"fill",
  q:"Negli urti anelastici, a differenza di quelli elastici, la grandezza che NON si conserva è l'energia ________.",
  answer:"CINETICA" },

{ id:"qm-14", topic:"quantita_moto", type:"mc",
  q:"Il centro di massa (CM) di un sistema di particelle è definito dal vettore posizione:",
  options:["$\\vec{r}_{CM}=\\dfrac{\\sum_i m_i \\vec{r}_i}{M}$","$\\vec{r}_{CM}=\\sum_i m_i \\vec{r}_i$","$\\vec{r}_{CM}=\\dfrac{M}{\\sum_i m_i \\vec{r}_i}$","$\\vec{r}_{CM}=\\dfrac{\\sum_i \\vec{r}_i}{\\sum_i m_i}$","$\\vec{r}_{CM}=M\\cdot\\sum_i \\vec{r}_i$"], correct:0 },

{ id:"qm-15", topic:"quantita_moto", type:"mc",
  q:"Per un sistema di due particelle di masse $m_1$ e $m_2$ poste rispettivamente in $r_1$ e $r_2$, la posizione del centro di massa è:",
  options:["$r_{CM}=\\dfrac{m_1r_1+m_2r_2}{m_1+m_2}$","$r_{CM}=\\dfrac{r_1+r_2}{m_1+m_2}$","$r_{CM}=m_1r_1+m_2r_2$","$r_{CM}=\\dfrac{m_1+m_2}{r_1+r_2}$","$r_{CM}=\\dfrac{m_1r_2+m_2r_1}{2}$"], correct:0 },

{ id:"qm-16", topic:"quantita_moto", type:"mc",
  q:"Il centro di massa di un sistema di particelle:",
  options:["Dipende solo dalla distribuzione della massa, non dalle forze esterne applicate","Dipende dalle forze esterne, non dalla distribuzione di massa","Coincide sempre con il centro geometrico del sistema, anche se le masse sono diverse","Non è definibile per sistemi di più di due corpi","Cambia posizione se cambiano le forze interne"], correct:0 },

{ id:"qm-17", topic:"quantita_moto", type:"mc",
  q:"Il moto del centro di massa di un sistema di particelle è descritto dalla relazione:",
  options:["$\\sum_i \\vec{F}_i = M\\vec{a}_{CM}$: il CM si muove come un corpo di massa M soggetto alla risultante delle sole forze esterne","$\\sum_i \\vec{F}_i = m_i\\vec{a}_{CM}$","Il centro di massa non accelera mai","$\\sum_i \\vec{F}_i = 0$ sempre, indipendentemente dalle forze esterne","Il centro di massa si muove solo se tutte le forze interne sono nulle"], correct:0,
  explain:"Le forze interne, nella sommatoria di tutte le forze del sistema, si elidono a vicenda per il terzo principio della dinamica: solo le forze esterne determinano l'accelerazione del CM." },

{ id:"qm-18", topic:"quantita_moto", type:"fill",
  q:"La grandezza vettoriale $\\vec{q}=m\\vec{v}$, associata al moto di un corpo, si chiama quantità di ________.",
  answer:"MOTO" },

{ id:"qm-19", topic:"quantita_moto", type:"mc",
  q:"Un carrello di massa 2 kg che si muove a 3 m/s si scontra e si unisce a un carrello fermo di massa 1 kg (urto completamente anelastico). Qual è la velocità finale del sistema?",
  options:["2 m/s","3 m/s","1,5 m/s","6 m/s","1 m/s"], correct:0,
  explain:"$m_1v_{1i}=(m_1+m_2)v_f \\Rightarrow v_f=\\dfrac{2\\times3}{2+1}=2\\ \\text{m/s}$." },

{ id:"qm-20", topic:"quantita_moto", type:"mc",
  q:"Durante un urto, l'intervallo di tempo dell'interazione tra i due corpi è considerato:",
  options:["Molto breve rispetto al tempo di osservazione del moto complessivo","Sempre uguale a un secondo","Sempre trascurabile per il calcolo della quantità di moto scambiata","Irrilevante ai fini della conservazione della quantità di moto","Uguale per ogni tipo di urto, elastico o anelastico"], correct:0 },

/* ============================= DINAMICA ROTAZIONALE, STATICA E LEVE ============================= */

{ id:"cr-01", topic:"corpirigidi", type:"mc",
  q:"Un corpo rigido è un oggetto ideale:",
  options:["La cui forma e le cui dimensioni non cambiano, indipendentemente dalle forze applicate","Che si deforma sempre sotto l'azione di una forza","Privo di massa","Che può esistere solo allo stato gassoso","Privo di volume"], correct:0 },

{ id:"cr-02", topic:"corpirigidi", type:"mc",
  q:"Nel moto traslatorio di un corpo rigido:",
  options:["Tutti i punti del corpo compiono la stessa traiettoria e hanno la velocità del centro di massa","Ogni punto ha una velocità diversa in base alla distanza dall'asse","I punti descrivono traiettorie circolari attorno a un asse","Solo il centro di massa si muove, gli altri punti restano fermi","La velocità angolare è la stessa per tutti i punti"], correct:0 },

{ id:"cr-03", topic:"corpirigidi", type:"mc",
  q:"Nel moto rotatorio di un corpo rigido attorno a un asse fisso:",
  options:["Tutti i punti hanno la stessa velocità angolare ω, mentre la velocità lineare dipende dalla distanza dall'asse: $v_i=r_i\\omega$","Tutti i punti hanno la stessa velocità lineare","La velocità angolare dipende dalla distanza dall'asse","I punti più vicini all'asse hanno velocità lineare maggiore","Non esiste un asse di rotazione definito"], correct:0 },

{ id:"cr-04", topic:"corpirigidi", type:"mc",
  q:"Il momento di una forza (momento torcente) rispetto a un punto O è definito dal prodotto vettoriale:",
  options:["$\\vec{M}=\\vec{r}\\wedge\\vec{F}$, con modulo $|M|=rF\\sin\\varphi$","$\\vec{M}=\\vec{r}\\cdot\\vec{F}$ (prodotto scalare)","$\\vec{M}=F/r$","$\\vec{M}=\\vec{r}+\\vec{F}$","$\\vec{M}=m\\vec{r}$"], correct:0 },

{ id:"cr-05", topic:"corpirigidi", type:"mc",
  q:"L'unità di misura del momento di una forza nel Sistema Internazionale è:",
  options:["N·m", "N", "J", "N/m", "kg·m²"], correct:0,
  explain:"Dimensionalmente coincide con il joule (N·m), ma per convenzione il momento di una forza si esprime in N·m e non in joule, perché forza e braccio non sono paralleli come nel lavoro." },

{ id:"cr-06", topic:"corpirigidi", type:"mc",
  q:"A parità di forza applicata, il momento (e quindi l'effetto rotatorio) risulta maggiore quando:",
  options:["La distanza r dal punto di applicazione all'asse di rotazione (braccio) è maggiore","La distanza r è minore","La forza è applicata parallelamente al braccio","La forza è nulla","Il corpo è più massiccio"], correct:0 },

{ id:"cr-07", topic:"corpirigidi", type:"mc",
  q:"Il momento di inerzia I di un corpo rigido rispetto a un asse è definito come:",
  options:["$I=\\sum_i m_i r_i^2$","$I=\\sum_i m_i r_i$","$I=\\sum_i m_i v_i$","$I=\\tfrac12\\sum_i m_i v_i^2$","$I=Mr$"], correct:0 },

{ id:"cr-08", topic:"corpirigidi", type:"mc",
  q:"Il momento di inerzia di un corpo rigido:",
  options:["Dipende dalla distribuzione della massa rispetto all'asse e dalla scelta dell'asse stesso","È una grandezza vettoriale","È indipendente dalla scelta dell'asse di rotazione","Dipende solo dalla massa totale, non dalla sua distribuzione","Ha le stesse unità di misura della quantità di moto"], correct:0 },

{ id:"cr-09", topic:"corpirigidi", type:"mc",
  q:"Il momento di inerzia di una sfera omogenea di massa m e raggio r, che ruota attorno a un proprio asse, vale:",
  options:["$I=\\tfrac{2}{5}mr^2$","$I=mr^2$","$I=\\tfrac12 mr^2$","$I=\\tfrac13 mr^2$","$I=2mr^2$"], correct:0 },

{ id:"cr-10", topic:"corpirigidi", type:"mc",
  q:"Il momento di inerzia di un cilindro (o disco) omogeneo di massa m e raggio r, che ruota attorno al proprio asse principale, vale:",
  options:["$I=\\tfrac12 mr^2$","$I=\\tfrac{2}{5}mr^2$","$I=mr^2$","$I=\\tfrac13 mr^2$","$I=\\tfrac14 mr^2$"], correct:0 },

{ id:"cr-11", topic:"corpirigidi", type:"mc",
  q:"Il momento angolare $\\vec{L}$ di un corpo rigido rispetto all'asse di rotazione è legato al momento di inerzia dalla relazione:",
  options:["$L=I\\omega$","$L=I\\alpha$","$L=I/\\omega$","$L=I+\\omega$","$L=\\omega/I$"], correct:0 },

{ id:"cr-12", topic:"corpirigidi", type:"mc",
  q:"In dinamica rotazionale, la relazione tra il momento delle forze applicate e il momento angolare, analoga al secondo principio della dinamica traslazionale, è:",
  options:["$M=\\dfrac{dL}{dt}=I\\alpha$ (analoga a $F=ma$)","$M=I\\omega$ soltanto","$M=\\dfrac{dv}{dt}$","$M=L\\cdot t$","$M=\\dfrac{d\\omega}{I}$"], correct:0 },

{ id:"cr-13", topic:"corpirigidi", type:"mc",
  q:"Se il momento totale delle forze esterne applicate a un corpo rigido è nullo ($M_{TOT}=0$):",
  options:["Il momento angolare L si conserva","Il corpo si ferma istantaneamente","La velocità angolare aumenta indefinitamente","Il momento di inerzia diventa nullo","L'energia cinetica rotazionale aumenta indefinitamente"], correct:0 },

{ id:"cr-14", topic:"corpirigidi", type:"mc",
  q:"Un disco ruota con momento di inerzia $I=6\\times10^4\\ \\text{kg}\\cdot\\text{m}^2$ e velocità angolare $\\omega=0{,}2\\ \\text{rad/s}$. Se, a momento angolare costante, il momento di inerzia aumenta del 10%, la nuova velocità angolare vale circa:",
  options:["0,182 rad/s","0,22 rad/s","0,20 rad/s","0,10 rad/s","0,242 rad/s"], correct:0,
  explain:"Per conservazione del momento angolare: $I\\omega=I'\\omega' \\Rightarrow \\omega'=\\dfrac{I}{I'}\\omega=\\dfrac{1}{1{,}1}\\times0{,}2\\approx0{,}182\\ \\text{rad/s}$." },

{ id:"cr-15", topic:"corpirigidi", type:"mc",
  q:"Le condizioni di equilibrio (statica) di un corpo rigido richiedono che siano contemporaneamente nulle:",
  options:["La somma vettoriale di tutte le forze applicate e la somma vettoriale dei loro momenti","Solo la somma delle forze applicate","Solo la somma dei momenti delle forze","Solo il momento di inerzia del corpo","Solo l'accelerazione angolare"], correct:0 },

{ id:"cr-16", topic:"corpirigidi", type:"mc",
  q:"Una leva è schematizzabile come:",
  options:["Un'asta rigida vincolata in un punto (fulcro), soggetta a una forza motrice (potenza) e a una forza resistente (resistenza), che ruota attorno al fulcro","Una molla ideale priva di massa","Un corpo in caduta libera","Un sistema privo di punti fissi","Un fluido in equilibrio idrostatico"], correct:0 },

{ id:"cr-17", topic:"corpirigidi", type:"mc",
  q:"Il guadagno meccanico G di una leva, in condizione di equilibrio ($F_M b_M = F_R b_R$), è definito come:",
  options:["$G=\\dfrac{F_R}{F_M}=\\dfrac{b_M}{b_R}$","$G=F_M \\cdot F_R$","$G=b_M+b_R$","$G=\\dfrac{F_M}{b_M}$","G è sempre uguale a 1"], correct:0 },

{ id:"cr-18", topic:"corpirigidi", type:"mc",
  q:"Una leva si dice vantaggiosa quando il guadagno meccanico G è:",
  options:["Maggiore di 1 (la forza motrice necessaria è minore della resistenza)","Minore di 1","Uguale a 1","Uguale a 0","Sempre negativo"], correct:0 },

{ id:"cr-19", topic:"corpirigidi", type:"mc",
  q:"Nelle leve di primo genere, il fulcro si trova:",
  options:["In posizione intermedia tra la forza motrice e quella resistente","Sempre a un'estremità della leva","Sempre a coincidere con il punto di applicazione della resistenza","Tra le due forze solo se la leva è svantaggiosa","Mai tra le due forze"], correct:0 },

{ id:"cr-20", topic:"corpirigidi", type:"mc",
  q:"Le articolazioni del corpo umano, considerate come leve, hanno tipicamente il ruolo di:",
  options:["Fulcro, mentre i muscoli forniscono la forza motrice (potenza) e le ossa, per il loro peso, la forza resistente","Forza motrice","Forza resistente","Asse di simmetria, privo di funzione meccanica","Contrappeso"], correct:0 },

{ id:"cr-21", topic:"corpirigidi", type:"mc",
  q:"L'articolazione della testa sull'atlante (leva di 1° genere) è, dal punto di vista meccanico, tipicamente:",
  options:["Svantaggiosa: richiede una forza muscolare maggiore del peso della testa", "Vantaggiosa: richiede una forza muscolare minore del peso della testa","Indifferente, con G = 1","Priva di fulcro","Non descrivibile come leva"], correct:0 },

{ id:"cr-22", topic:"corpirigidi", type:"mc",
  q:"In un materiale sottoposto a una forza esterna, lo sforzo (stress) σ è definito come:",
  options:["$\\sigma=F/A$: forza interna per unità di superficie","$\\sigma=F\\cdot A$","$\\sigma=F/L$","$\\sigma=\\Delta L/L$","$\\sigma=E/F$"], correct:0 },

{ id:"cr-23", topic:"corpirigidi", type:"mc",
  q:"La deformazione (strain) $\\varepsilon=\\Delta L/L$ di un materiale è una grandezza:",
  options:["Adimensionale","Espressa in pascal","Espressa in newton","Espressa in metri","Vettoriale"], correct:0 },

{ id:"cr-24", topic:"corpirigidi", type:"mc",
  q:"La legge di Hooke generalizzata, valida per un materiale elastico, si esprime come:",
  options:["$\\sigma=E\\varepsilon$, con E modulo di Young","$\\sigma=k\\varepsilon^2$","$\\varepsilon=E\\sigma^2$","$\\sigma=\\varepsilon/E$","$E=\\sigma+\\varepsilon$"], correct:0 },

{ id:"cr-25", topic:"corpirigidi", type:"mc",
  q:"Una deformazione si dice elastica quando:",
  options:["Il corpo ritorna alla forma originale dopo la rimozione della forza applicata (deformazione reversibile)","Il corpo resta permanentemente deformato","Il materiale si rompe immediatamente","Avviene solo nei liquidi","È indipendente dal limite elastico del materiale"], correct:0 },

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
