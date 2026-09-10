# Quiz Chimica – Semestre Filtro

Sito statico di autovalutazione con **100 domande** di Chimica su:

- Stati di aggregazione della materia
- Stato aeriforme (i gas)
- Stato liquido
- Termodinamica

Le domande sono state ricavate dalle slide del corso (comprese quelle già
proposte come quiz al termine di ciascuna presentazione) e integrate con
domande originali sugli stessi argomenti, nello stesso stile e formato
delle prove ufficiali del **semestre filtro 2025/26** (Chimica e
propedeutica biochimica):

- 31 domande per prova: 21 a risposta multipla (5 opzioni A–E) + 10 a completamento
- 50 minuti di tempo
- Punteggio: +1 risposta corretta, −0,1 risposta errata, 0 risposta omessa
- Soglia di superamento: 18/31

## Modalità

- **Studio**: scelta degli argomenti, ordine casuale opzionale, correzione
  immediata con spiegazione dopo ogni risposta.
- **Esame simulato**: 31 domande estratte a caso rispettando la proporzione
  ufficiale (21 a risposta multipla + 10 a completamento), timer di 50
  minuti con invio automatico, punteggio calcolato con le regole ufficiali
  e revisione finale di tutte le domande sbagliate o omesse.

Le statistiche (risposte corrette in studio, cronologia degli esami
simulati) sono salvate localmente nel browser (`localStorage`), nessun dato
viene inviato altrove.

## Uso locale

Sito statico, nessuna build richiesta:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

Oppure pubblicalo direttamente con GitHub Pages puntando alla root del
repository.

## Struttura

```
index.html        pagina unica (home, quiz, risultati)
css/style.css      stile (chiaro/scuro automatico, responsive)
js/questions.js     banca dati delle 100 domande
js/app.js           logica dell'applicazione
```

## Nota

Materiale di autoproduzione per lo studio, non un prodotto ufficiale
dell'ateneo o del MUR. Verifica sempre il programma sul syllabus
ministeriale ufficiale.
