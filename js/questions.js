/*
 * Banca dati domande - Quiz Semestre Filtro: Chimica e Fisica
 * Chimica: slide del corso (Stati di aggregazione della materia, Stato aeriforme, Stato liquido,
 * Termodinamica delle reazioni chimiche) + quiz proposti nelle slide stesse.
 * Fisica: slide del corso (Cinematica, Lavoro ed energia) + domande ufficiali delle prove del
 * semestre filtro 2025 (primo e secondo appello) su unità di misura, cinematica, dinamica,
 * lavoro-energia-potenza, integrate con domande originali sugli stessi argomenti.
 * Formato coerente con le prove ufficiali del semestre filtro 2025/26: domande a risposta
 * multipla (5 opzioni A-E, una sola corretta) e domande a completamento.
 */

const AREAS = {
  chimica: { name: "Chimica", icon: "🧪", color: "#6366f1" },
  fisica:  { name: "Fisica",  icon: "⚛️", color: "#dc2626" }
};

const TOPICS = {
  aggregazione: { name: "Stati di aggregazione della materia", color: "#6366f1", area: "chimica" },
  gas:          { name: "Stato aeriforme (i gas)",             color: "#0ea5e9", area: "chimica" },
  liquido:      { name: "Stato liquido",                       color: "#14b8a6", area: "chimica" },
  termodinamica:{ name: "Termodinamica",                       color: "#f59e0b", area: "chimica" },
  misure:       { name: "Unità di misura e grandezze fisiche", color: "#e11d48", area: "fisica" },
  cinematica:   { name: "Cinematica",                          color: "#ea580c", area: "fisica" },
  dinamica:     { name: "Dinamica",                            color: "#7c3aed", area: "fisica" },
  energia:      { name: "Lavoro, energia e potenza",           color: "#059669", area: "fisica" }
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
  answer:"MOTORE" }

];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTIONS, TOPICS, AREAS };
}
