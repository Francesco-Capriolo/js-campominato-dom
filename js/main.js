//funzione per creare una nuova griglia
function createGame() {
    //prima bisogna resettare ogni volta che si crea una nuova griglia
    document.querySelector("#grid").innerHTML = "";
    //recupero il livello selezionato
    const level = parseInt(document.getElementById("input-level").value);
    // prima di generare le varie celle devo assegnare una variabile
    // da poter dare le varie gradezze in maniera omogenea
    let cellsNumber = 0;
    let cellsRow = 0;
    //generare i vari tipi di livello con lo switch
    switch (level) {
        case 1:
            cellsNumber = 100;
            //^ oppure fare cellsRow=10;
            break;
        case 2:
            cellsNumber = 81;
            //^ oppure fare cellsRow=9;
            break;
        case 3:
            cellsNumber = 49;
            //^ oppure fare cellsRow=7;
            break;
    }
    //$ sqrt significa la radice quadrata di cellsNumber
    cellsRow = Math.sqrt(cellsNumber);

    //genera le bombe casuali
    const bombs = generateBomb(16, cellsNumber);
    console.warn(bombs);

    //ciclo per in vari numeri delle celle
    for (let i = 1; i <= cellsNumber; i++) {
        const gridSquare = createSquare(i, cellsRow);
        //aggiungo un figlio lla griglia grande
        document.querySelector("#grid").appendChild(gridSquare);
    }

}

//function che restituisce un div 
function createSquare(i, cellsRow) {
    //creo un elemento
    const currentGrid = document.createElement("div");
    //aggiungo il css box
    currentGrid.classList.add("box");
    //aggiungo lo stile e mi calcolo la width
    currentGrid.style.width = `calc(100% / ${cellsRow})`;
    //la height è uguale alla width
    currentGrid.style.height = currentGrid.style.width;
    //inserisco il numero della cella
    currentGrid.innerHTML += [i];
    //appena premo un quadrato della griglia gli do un colore
    currentGrid.addEventListener('click', function () {
        if (bombs.includes(i)) {
            this.classList.add("box-bomber");

            writeInElementById('points', `mi dispiace il tuo punteggio è: ${points}`)
        } else {
            this.classList.add('box-clicked');
            points++;
            writeInElementById("points", ` il tuo punteggio è: ${points}`)
        }
    })
    // restituisce il valore
    return currentGrid;
}

/* //funzione per randomicizzare le bombe 

function randomInteger(min, max) {
    if (isNaN.parseInt(min) || isNaN.parseInt(max)) {
        console.error("randominte(min,max) ha bisogno di due numeri per argomento");
    }
    return (Math.floor(Math.random() * ((max + 1) - min) + max));
}
 */


//funzione per generare in modo non ripetitivo le bombe

function generateRandomUnique(blacklist, min, max) {
    //crezione della variabile che controlla il numero valido
    let check = true;
    let randomInt;
    //il ciclo continua finchè trova un numero valido
    while (check) {
        //genero un numero
        randomInt = (Math.floor(Math.random() * ((max + 1) - min) + min));
        //se il numero è presente nella lista
        if (blacklist.includes(randomInt)) {
            //se trovo un numero presente esco dal ciclo while
            check = false;
        }
    }
    return randomInt;
}

//funziona che genera le 16 bombe
function generateBomb(bombs, cellsNumber) {
    //creo un array per contenere le bombe
    const bombList = [];
    //per ogni bomba ne genero una nuova in un'altra cella
    for (let i = 0; i < bombs; i++) {
        //aggiungo la funzione che crea le bombe
        bombList.push(generateRandomUnique(bombList, 1, cellsNumber));
    }
    return bombList;
}

document.getElementById("button").addEventListener("click", function () {
    createGame()
})

















/*                 creare griglie con for            */

/* //creo una variabile e la prendo dalla griglia grande
const gridElement = document.getElementById("grid");

//arrow function che restituisce un div 
const createSquare = () => {
    const currentGrid = document.createElement("div");
    currentGrid.classList.add("box");
    return currentGrid;
}
// ogni volta che premo il bottone mi crea  le griglie
document.getElementById('button').addEventListener('click', function () {
    //resetto prima
    gridElement.innerHTML = "";
    //inizializzo il valore una variabile prendendolo dall'id html(select)
    let grid = document.getElementById("input-level").value;
    //se il select è uguale all'input che ho dato allora mi creo...
    if (grid == "easy") {
        for (i = 1; i <= 100; i++) {
            //creo una variabile uguale alla funzione
            const gridSquare = createSquare();
            //aggiungo il numero alla griglia
            gridSquare.innerHTML += [i];
            //appena premo un quadrato della griglia gli do un colore diverso(alternando con troggle)
            gridSquare.addEventListener('click', function () {
                this.classList.toggle('box-clicked');
            })
            //aggiungo un figlio lla griglia grande
            gridElement.appendChild(gridSquare);
        }
        //uguale ma meno i
    } else if (grid == "medium") {
        for (i = 1; i <= 81; i++) {
            const gridSquare = createSquare();
            gridSquare.innerHTML += [i];

            gridSquare.addEventListener('click', function () {
                this.classList.toggle('box-clicked');
            })
            gridElement.appendChild(gridSquare);

        }
    } else { //uguale ma meno i
        for (i = 1; i <= 49; i++) {
            const gridSquare = createSquare();
            gridSquare.innerHTML += [i];

            gridSquare.addEventListener('click', function () {
                this.classList.toggle('box-clicked');
            })
            gridElement.appendChild(gridSquare);

        }
    }
}); */