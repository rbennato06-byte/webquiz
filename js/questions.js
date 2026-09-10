/*
 * Banca dati domande - Quiz Semestre Filtro: Chimica (Stati della materia e Termodinamica)
 * Fonti: slide del corso (Stati di aggregazione della materia, Stato aeriforme, Stato liquido,
 * Termodinamica delle reazioni chimiche) + quiz proposti nelle slide stesse.
 * Formato coerente con le prove ufficiali del semestre filtro 2025/26: domande a risposta
 * multipla (5 opzioni A-E, una sola corretta) e domande a completamento.
 */

const TOPICS = {
  aggregazione: { name: "Stati di aggregazione della materia", color: "#6366f1" },
  gas:          { name: "Stato aeriforme (i gas)",             color: "#0ea5e9" },
  liquido:      { name: "Stato liquido",                       color: "#14b8a6" },
  termodinamica:{ name: "Termodinamica",                       color: "#f59e0b" }
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
  options:["CO2 solida (ghiaccio secco)","CO solido","Ghiaccio (H2O solida)","Br2","NO solido"], correct:0,
  explain:"La CO2 solida (ghiaccio secco) è l'esempio classico citato nelle slide, insieme a iodio e naftalina." },

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
  explain:"Legge di Charles: a P costante, V è direttamente proporzionale a T." },

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
  explain:"Legge di Boyle: P1V1 = P2V2 → 1,50×6,00 = 3,00×V2 → V2 = 3,00 L." },

{ id:"gas-07", topic:"gas", type:"mc",
  q:"Un campione di gas è tenuto a 200 K a una pressione di 2,00 atm. Viene poi riscaldato a volume costante fino a raggiungere una pressione di 6,00 atm. Quale sarà la sua temperatura finale?",
  options:["600 K","100 K","200 K","150 K","250 K"], correct:0,
  explain:"Legge di Gay-Lussac: P1/T1 = P2/T2 → 2,00/200 = 6,00/T2 → T2 = 600 K." },

{ id:"gas-08", topic:"gas", type:"mc",
  q:"Un gas ideale subisce una trasformazione isocora dallo stato A (PA=1 atm; TA=200 K) allo stato B (VB=5 L; TB=400 K), e poi una trasformazione isoterma che lo porta allo stato C (VC=8 L). Calcolare PC.",
  options:["1,25 atm","2,00 atm","1,00 atm","4,00 atm","3,00 atm"], correct:0,
  explain:"A→B (isocora, VA=VB=5L): PA/TA=PB/TB → PB=1×400/200=2 atm. B→C (isoterma): PBVB=PCVC → 2×5=PC×8 → PC=1,25 atm." },

{ id:"gas-09", topic:"gas", type:"mc",
  q:"In un gas il prodotto della pressione per il volume (a quantità di gas costante):",
  options:["È proporzionale alla temperatura assoluta","È indipendente dalla densità","Raddoppia se la T passa da 10 a 20 °C","Resta costante all'aumentare della temperatura","È indipendente dalla quantità di gas"], correct:0,
  explain:"Dalla legge dei gas ideali PV=nRT, a n costante PV è direttamente proporzionale a T (attenzione: raddoppiare la T in °C da 10 a 20 non raddoppia T in kelvin)." },

{ id:"gas-10", topic:"gas", type:"mc",
  q:"Due recipienti dello stesso volume contengono rispettivamente N2 e O2, nelle stesse condizioni di temperatura e pressione. La quantità di N2 è pari a 2,8 g; calcolare la quantità di O2 (gas perfetti, MM N2=28, MM O2=32).",
  options:["2,8 g","3,0 g","3,2 g","1,4 g","2,0 g"], correct:2,
  explain:"Per la legge di Avogadro, stesso V, T, P → stesse moli: n(N2)=2,8/28=0,1 mol → massa O2 = 0,1×32 = 3,2 g." },

{ id:"gas-11", topic:"gas", type:"mc",
  q:"Il volume di 22,414 litri è quello occupato da:",
  options:["1 mole di azoto liquido","1 kg di acqua allo stato di vapore","1 mole di qualunque gas alle condizioni standard (0°C, 1 atm)","1 mmol di qualunque gas alle condizioni standard","1 kg di azoto liquido"], correct:2 },

{ id:"gas-12", topic:"gas", type:"mc",
  q:"A 0°C e alla pressione di 1 atmosfera, due moli di gas N2:",
  options:[
    "Contengono 6,022×10²³ molecole di N2",
    "Occupano un volume minore di due moli di gas H2",
    "Occupano un volume maggiore rispetto a quello di due moli di gas H2",
    "Contengono 12,044×10²³ molecole di N2",
    "Hanno una massa complessiva di 28 g"], correct:3,
  explain:"2 moli contengono 2×NA = 12,044×10²³ molecole. Per la legge di Avogadro il volume, a parità di T, P e moli, è uguale a quello di H2 (non maggiore né minore). La massa di 2 moli di N2 è 56 g, non 28 g." },

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
  options:["PV = nRT","PV = nR/T","P = nRT/V²","PV² = nRT","P/V = nRT"], correct:0 },

{ id:"gas-16", topic:"gas", type:"mc",
  q:"Qual è il valore della costante universale dei gas R, espressa in L·atm/(mol·K)?",
  options:["8,314","0,0821","22,4","273,15","6,022×10²³"], correct:1 },

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
  q:"Nel diagramma di fase della CO2, un aumento di pressione (in prossimità della curva di fusione) favorisce:",
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
  q:"A 37°C, una reazione con ΔH = –10 kJ/mol e ΔS = –0,05 kJ/mol·K è definita:",
  options:["Endotermica","Esoergonica","Endoergonica","Spontanea","All'equilibrio"], correct:2,
  explain:"ΔG = ΔH – TΔS = –10 – (310,15)(–0,05) ≈ –10 + 15,5 = +5,5 kJ/mol > 0 → reazione endoergonica (non spontanea)." },

{ id:"term-03", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione spontanea è esotermica?",
  options:["ΔH > 0","ΔG > 0","ΔS < 0","ΔH < 0","ΔS > 0"], correct:3 },

{ id:"term-04", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione spontanea è endotermica?",
  options:["ΔH > 0","ΔG > 0","ΔS < 0","ΔH < 0","ΔS > 0"], correct:0 },

{ id:"term-05", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione spontanea è entropicamente favorita?",
  options:["ΔH > 0","ΔG > 0","ΔS < 0","ΔH < 0","ΔS > 0"], correct:4 },

{ id:"term-06", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione è esoergonica?",
  options:["ΔH > 0","ΔG < 0","ΔG > 0","ΔH < 0","ΔG = 0"], correct:1 },

{ id:"term-07", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione è endoergonica?",
  options:["ΔH > 0","ΔG < 0","ΔG > 0","ΔH < 0","ΔG = 0"], correct:2 },

{ id:"term-08", topic:"termodinamica", type:"mc",
  q:"In quale dei seguenti casi una reazione è all'equilibrio?",
  options:["ΔH > 0","ΔG < 0","ΔG > 0","ΔH < 0","ΔG = 0"], correct:4 },

{ id:"term-09", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti coppie di relazioni caratterizza con certezza una reazione spontanea a qualunque temperatura T > 0?",
  options:["ΔH<0; ΔS<0","ΔH=0; ΔS<0","ΔH>0; ΔS>0","ΔH>0; ΔS=0","ΔH<0; ΔS>0"], correct:4,
  explain:"Con ΔH<0 e ΔS>0, ΔG=ΔH–TΔS è sempre negativo per qualunque T>0: la reazione è spontanea a tutte le temperature." },

{ id:"term-10", topic:"termodinamica", type:"mc",
  q:"Quale delle seguenti coppie di valori indica una reazione spontanea a T=300 K?",
  options:[
    "ΔH=-30 kJ/mol; ΔS=-0,1 kJ/mol·K",
    "ΔH=0; ΔS=-0,1 kJ/mol·K",
    "ΔH=+30 kJ/mol; ΔS=+0,1 kJ/mol·K",
    "ΔH=+30 kJ/mol; ΔS=0",
    "ΔH=-30 kJ/mol; ΔS=+0,1 kJ/mol·K"], correct:4,
  explain:"ΔG = ΔH – TΔS = –30 – 300×0,1 = –60 kJ/mol < 0 → spontanea. Le altre opzioni danno ΔG ≥ 0." },

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
    "Le reazioni entropicamente favorite hanno una ΔS > 0"], correct:4,
  explain:"Il II principio riguarda l'aumento di entropia nei processi spontanei: una reazione entropicamente favorita ha, per definizione, ΔS>0. Le opzioni A e C descrivono invece il I principio." },

{ id:"term-16", topic:"termodinamica", type:"mc",
  q:"Indicare la risposta NON corretta:",
  options:[
    "L'entropia è il rapporto tra il calore scambiato Q e la temperatura T",
    "L'entropia è legata al concetto di disordine del sistema",
    "Un aumento del disordine di un sistema corrisponde a una variazione positiva dell'entropia",
    "Un aumento del disordine di un sistema corrisponde a una variazione negativa dell'entropia",
    "Una diminuzione del disordine di un sistema corrisponde a una variazione negativa dell'entropia"], correct:3 },

{ id:"term-17", topic:"termodinamica", type:"mc",
  q:"L'entalpia (H) di un sistema è definita come:",
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
  answer:"CALORE" }

];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTIONS, TOPICS };
}
