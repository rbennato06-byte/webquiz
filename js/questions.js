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
 * metabolismo, lipidi, membrane cellulari) + domande ufficiali delle prove del semestre filtro
 * 2025 (primo e secondo appello) + Syllabus ufficiale Biologia 2026/27 (MUR).
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
  misure:       { name: "Unità di misura e grandezze fisiche", color: "#e11d48", area: "fisica" },
  cinematica:   { name: "Cinematica",                          color: "#ea580c", area: "fisica" },
  dinamica:     { name: "Dinamica",                            color: "#7c3aed", area: "fisica" },
  energia:      { name: "Lavoro, energia e potenza",           color: "#059669", area: "fisica" },
  biomolecole:  { name: "Basi molecolari della vita",          color: "#16a34a", area: "biologia", unit: 1 },
  proteine:     { name: "Amminoacidi e proteine",               color: "#0d9488", area: "biologia", unit: 1 },
  enzimi:       { name: "Enzimi e metabolismo",                 color: "#ca8a04", area: "biologia", unit: 1 },
  lipidi:       { name: "Lipidi",                               color: "#be123c", area: "biologia", unit: 1 },
  membrane:     { name: "Membrane cellulari",                   color: "#7c3aed", area: "biologia", unit: 5 }
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
  explain:"Domanda dalla prova ufficiale del semestre filtro 2025 (secondo appello). Gli isotopi hanno lo stesso $Z$ ma diverso numero di massa $A$, perché differiscono per il numero di neutroni." },

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
  answer:"IONI" }

];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTIONS, TOPICS, AREAS, SYLLABUS };
}
