//$ funzione che genera il singolo quadrato
function createSquare(number, cellsPerRow) {
    let cell = document.createElement('div');
    // cell.className = ('square');
    cell.classList.add('box');
    cell.style.width = `calc(100% / ${cellsPerRow})`
    cell.style.height = cell.style.width;
    cell.innerHTML = number;
    //ritorno del valore chiamato cella
    return cell;
}

//$funzione per creare bombe nelle celle
function generateBombList(bombs, numberOfCells) {
    // dati il numero di bombe da generare "bombs"
    // ed il numero di celle disponibili (generate) "numberOfCells"
    // inizializzo a vuoto un nuovo array
    const bombList = [];
    // per ogni bomba
    for (i = 0; i < bombs; i++) {
        // ne genero una nuova che non sia già presente e la aggiungo alla lista delle bombe
        bombList.push(generateUniqueRandomNumber(bombList, 1, numberOfCells));
    }
    // restituisco la lista delle bombe
    return bombList;
}

//$funzione pr generare un numero randomico non ripetuto
function generateUniqueRandomNumber(numsBlacklist, min, max) {
    // mi creo una variabile inizializzata a false, che mi controlla se ho generato un numero
    // valido oppure no
    let check = false;
    let randomInt;

    // creo un ciclo che continua finché non ho trovato un numero valido (assente in blacklist)
    while (!check) {
        //  genero randomicamente un numero intero tra il min e il max passati come argomenti
        randomInt = Math.floor(Math.random() * ((max + 1) - min) + min);
        // se il numero non è presente nella blacklist allora
        if (!numsBlacklist.includes(randomInt)) {
            // informo il resto della funzione che il numero è stato trovato ed è valido
            // ==> esco dal ciclo while
            check = true;
        }
    }

    // restituisco il numero valido che ho trovato
    return randomInt;
}

//$funzione che serve per far vedere tutte le bombe appena ne clicco una
function checkAndAddClass(parentElementId, bombList, classToAdd) {
    //variabile che prende i figli della griglia
    const squares = document.getElementById(parentElementId).children;
    // per ogni quadrato presente
    for (let i = 0; i < squares.length; i++) {
        // se è anche una bomba
        if (bombList.includes(parseInt(squares[i].innerHTML))) {
            // la faccio esplodere
            squares[i].classList.add(classToAdd);
        }
    }
}

//$ Funzione che scrive in un elemento del dom preso da id "elementId" sovrascrivendo ciò che è presente
function writeInElementById(elementId, stringToWrite) {
    document.getElementById(elementId).innerHTML = stringToWrite;
}

//£ funzione per generare una nuova partita con all'interno altre funzioni
function createNewGame() {
    // Reset generale per il contenitore interno della grid
    document.querySelector('#grid').innerHTML = "";

    // domanda, il gioco è finito?
    let isGameOver = false;

    // prima di tutto recupero il livello selezionato dall'utente
    const level = parseInt(document.getElementById('input-level').value);
    console.log(level);

    // numero di celle per riga e numero di celle totali
    let cellsPerRow;
    let cellsNumber;

    let points = 0;
    const NUMBER_OF_BOMBS = 16;

    //  prendere il valore in base alla difficoltà
    switch (level) {
        case 1:
            cellsNumber = 100;
            // cellsPerRow = 10;
            break;
        case 2:
            cellsNumber = 81;
            // cellsPerRow = 9;
            break;
        case 3:
            cellsNumber = 49;
            // cellsPerRow = 7;
            break;
    }

    //$  cellsPerRow = radice quadrata di cellsNumber
    cellsPerRow = Math.sqrt(cellsNumber);

    // genero la lista delle bombe casuali
    const bombs = generateBombList(NUMBER_OF_BOMBS, cellsNumber);
    console.log(bombs);

    //  ciclo per tutti gli elementi che voglio creare
    for (let i = 1; i <= cellsNumber; i++) {
        //  prendo il parent
        const cell = createSquare(i, cellsPerRow);

        //  aggiungo un event listener per far colorare il bottone
        cell.addEventListener('click', function () {

            // se il gioco non è finito allora
            if (!isGameOver) {
                if (!bombs.includes(i)) {
                    this.classList.add('box-clicked');

                    //aggiungo un contatore
                    points++;

                    //£Funzione che scrive in un elemento del dom sovrascrivendo ciò che è presente
                    writeInElementById('points', `Il tuo punteggio è: <h3>${points}</h3>`);
                } else {
                    this.classList.add('box-bomber');
                    writeInElementById('points', `Mi dispiace, hai perso, il tuo punteggio è: <h3>${points}</h3>`);

                    //£funzione per uscire tutte le bombe
                    checkAndAddClass('grid', bombs, 'box-bomber');
                    isGameOver = true;
                }
            }
        });
        // inserisco come elementi figli del parent
        document.querySelector('#grid').appendChild(cell);
    }
}

//£ evento per creare la griglia
document.getElementById('button').addEventListener("click", function () {
    createNewGame();
});