import {victory, defeat, arrImgNum, iClosed, iOpened, iBomba, iBombed, iFlaged, noBomb, myImages, loader, randomImage} from "./loader.js";

let cvs = document.getElementById("canvas");  // получение canvas
let ctx = cvs.getContext("2d"); // вид игры

let  numberOfcellsInRow = 10; // количество строк
let  numberOfcellsInColumns = 10; // количество ячеек в колонке

let cellSizeHeight = cvs.height / numberOfcellsInRow; // размер ячейки по высоте
let cellSizeWidth = cvs.width / numberOfcellsInColumns; // размер ячейки по ширине
let colBomba = 10; // количество бомб
let arrBackground = [[], []]; // массив заднего фона
let iarrBomb = 10; // бомба в массиве
let arrFlaged = [[],[]]; // массив флагов
let iarrFlag = 10; // флаг в массиве

let MouseX = 0;
let MouseY = 0;

let gameover = false;

let victoryHeght = cvs.height;

let numberOfAttempts = 3;// количество попыток после которой идёт увеличение сложности
let attempt =  0;        // попытки

function drawClosed(){
  arrFlaged = [[], []];
  // Создание массива флагов
  arrFlaged = new Array (numberOfcellsInRow); // numberOfcellsInRow строк таблицы

  for (let i=0; i < arrFlaged.length; i++) {
        arrFlaged[i] = new Array(numberOfcellsInColumns); // numberOfcellsInColumns столбцов
    }

  for (let i = 0; i< numberOfcellsInRow; i++ ) {
        for (let j = 0; j < numberOfcellsInColumns; j++) {
            arrFlaged[i][j] = 0;
        }
  }


  let posX = 0;
  let posY = 0;
  for (let x = 1; x <= numberOfcellsInColumns; x++){
      posX = (x - 1) * cellSizeWidth;
      for (let y = 1; y <= numberOfcellsInRow; y++) {
          posY = (y - 1) * cellSizeHeight;
          ctx.drawImage(iClosed, posX, posY, cellSizeWidth, cellSizeHeight);
      }
  }
}

function createNDimArray(dimensions) {
    if (dimensions.length > 0) {
        let dim = dimensions[0];
        let rest = dimensions.slice(1);
        let newArray = new Array();
        for (var i = 0; i < dim; i++) {
            newArray[i] = createNDimArray(rest);
        }
        return newArray;
    } else {
        return undefined;
    }
}

function randomXY(colImg) {
    let count = Math.floor(Math.random() * (colImg+1));
        if (count >= colImg) {
            count = colImg-1;
    }
    return count;
}

function initBackground(){

    arrBackground = [[], []];
    // Создание массива
    arrBackground = new Array (numberOfcellsInRow); // numberOfcellsInRow строк таблицы

    for (let i=0; i < arrBackground.length; i++) {
        arrBackground[i] = new Array(numberOfcellsInColumns); // numberOfcellsInColumns столбцов
    }

    // заполнение заднего фона
    for (let i = 0; i< numberOfcellsInRow; i++ ) {
        for (let j = 0; j < numberOfcellsInColumns; j++) {
            arrBackground[i][j] = 0;
        }
    }
    console.log("Обнулили");
    let str = "";
    for (let i = 0; i < numberOfcellsInRow; i++ ) {
        for (let j = 0; j < numberOfcellsInColumns; j++) {
            str = str + arrBackground[i][j] + ", ";
        }
        // console.log("i=" + i);
        // console.log(str);
        str = "";
    }
    // alert("Прописали 0");

    // растановка бомб
    let x = 0;
    let y = 0;
    let ifBomba = true;
    let ib = 0;
    while (ifBomba){
         x = randomXY(numberOfcellsInRow);
         y = randomXY(numberOfcellsInColumns);

         if (arrBackground[x][y] === 0) {
             arrBackground[x][y] = iarrBomb;
             ib++;
             if (ib >= colBomba) {
                 ifBomba = false;
                 break;
             }
             // alert("Установил бомбу=" + ib+" Координаты бомбы X=" + x + " Y=" + y + " arrBackground[x, y]=" + arrBackground[x][y]);
         }

    }
    console.log("Расставил бомбы");
    str = "";
    for (let i = 0; i < numberOfcellsInRow; i++ ) {
        for (let j = 0; j < numberOfcellsInColumns; j++) {
            str = str + arrBackground[i][j] + ", ";
        }
        // console.log("i=" + i);
        // console.log(str);
        str = "";
    }

    // alert("Расставил бомбы");
    // расстановка номеров
    let i0 = 0;
    let ik = 0;
    let j0 = 0;
    let jk = 0;

    for (let i = 0; i< numberOfcellsInRow; i++ ){
        for (let j = 0; j < numberOfcellsInColumns; j++){
            if (arrBackground[i][j] == iarrBomb){
                i0 = i - 1;
                if (i == 0) {i0 = 0;}
                ik = i + 1;
                if (i == (numberOfcellsInRow-1)) {ik = (numberOfcellsInRow-1);}
                j0 = j - 1;
                if (j == 0) {j0 = 0;}
                jk = j + 1;
                if (j == (numberOfcellsInColumns-1)) {jk = (numberOfcellsInColumns-1);}
                for (let i1 = i0; i1 <= ik; i1++){
                    for (let j1 = j0; j1 <= jk; j1++){

                        // console.log("i1=" + i1 + " j1=" + j1);

                        if (arrBackground[i1][j1] != iarrBomb){
                            arrBackground[i1][j1]++;
                        }
                    }
                }
            }
        }
    }
    console.log("Вся матрица");
    str = "";
    for (let i = 0; i < numberOfcellsInRow; i++ ) {
        for (let j = 0; j < numberOfcellsInColumns; j++) {
            str = str + arrBackground[i][j] + ", ";
        }
        // console.log("i=" + i);
        // console.log(str);
        str = "";
    }
}

function showBombs(){
    // Рисуем все бомбы
    let posX = 0;
    let posY = 0;
    for (let x = 1; x <= numberOfcellsInColumns; x++){
        posX = (x - 1) * cellSizeWidth;
        for (let y = 1; y <= numberOfcellsInRow; y++) {
            if (arrBackground[x-1][y-1] == iarrBomb) {
                posY = (y - 1) * cellSizeHeight;
                ctx.drawImage(iBomba, posX, posY, cellSizeWidth, cellSizeHeight);
            }
        }
    }
}

function drawAnArrayCell( x, y ){
    if ((x < 0) || (x>= numberOfcellsInColumns)){ return false;}
    if ((y < 0) || (y>= numberOfcellsInRow)){ return false;}

    // нарисовать ячейку массива x,y начинаются с 0
    let posX = x * cellSizeWidth;
    let posY = y * cellSizeHeight;

    if (arrFlaged[x][y] == 0 ){arrFlaged[x][y] = 1;}

    switch (arrBackground[x][y]) {
        case iarrBomb: {
            ctx.drawImage(iBomba, posX, posY, cellSizeWidth, cellSizeHeight);
            break;
        }
        case 0:{
            ctx.drawImage(iOpened, posX, posY, cellSizeWidth, cellSizeHeight);
            break;
        }
        default:{
            let num = arrBackground[x][y]-1;

            // console.log("Num=" + num);

            let ImgNum = new Image();
            ImgNum = arrImgNum[num];

            ctx.drawImage(ImgNum, posX, posY, cellSizeWidth, cellSizeHeight);
        }
    }

}

function foreground(){
    // Рисуем весь передний фон
    for (let x = 1; x <= numberOfcellsInColumns; x++){
        for (let y = 1; y <= numberOfcellsInRow; y++) {
            drawAnArrayCell( x-1, y-1 );
        }
    }
}

function start() {

    // alert("Старт. Количество бомб=" + colBomba);

    gameover = false;
    // начало игры. инициализация
    initBackground();

    // рисуем закрытые
    drawClosed();
    // alert("Нарисовали всё закрытими");

    // рисуем расставленные бомбы
    // showBombs();
    // alert("Нарисовали всё бомбы");

    // foreground();
    // alert("Нарисовали всё");
}

function emptyCellEnvironment(x, y){
    // проверить окружение ячейки на пусто
    console.log("Проверяем на пустую ячейку");

    if ((x < 0) || (x>= numberOfcellsInColumns)){ return false;}
    if ((y < 0) || (y>= numberOfcellsInRow)){ return false;}

    if (arrBackground[x][y] != 0) {
        return false;
    }
    if (x > 1) {
        if (arrBackground[x-1][y] != 0) { return false; }}
    if (x < (numberOfcellsInColumns-1)){
        if (arrBackground[x+1][y] != 0) { return false; }}
    if (y > 1) {
        if (arrBackground[x][y-1] != 0) { return false; }}
    if (y <(numberOfcellsInRow-1)) {
        if (arrBackground[x][y+1] != 0) { return false; }}
    if ((x > 1)&&(y>1)) {
        if (arrBackground[x-1][y-1] != 0) { return false; }}
    if ((x>1) && (y<(numberOfcellsInRow-1))) {
        if (arrBackground[x-1][y+1] != 0) { return false; }}
    if ((x<(numberOfcellsInColumns-1)) && (y>1)) {
        if (arrBackground[x+1][y-1] != 0) { return false; }}
    if ((x<(numberOfcellsInColumns-1)) && (y<(numberOfcellsInRow-1))) {
        if (arrBackground[x+1][y+1] != 0) { return false; }}
    return true;
}
function getPositionInArrayX(x){
    return Math.floor(x / cellSizeWidth);
}

function getPositionInArrayY(y){
    return Math.floor(y / cellSizeHeight);
}

function CalculateOpenedX(x, y){
    // Открытие соседних пустых ячеек по строке X
    if (arrBackground[x][y] != 0) {
        drawAnArrayCell( x, y );
        return false;
    }
    for (let i = x; i >=0; i--) {
        if (arrBackground[i][y] == 0) {
            drawAnArrayCell(i, y);
        } else {
            drawAnArrayCell(i, y);
            break;
        }
    }
    for (let i = x; i < numberOfcellsInColumns; i++) {
        if (arrBackground[i][y] == 0) {
            drawAnArrayCell(i, y);
        } else {
            drawAnArrayCell(i, y);
            break;
        }
    }
    return true;
}

function drawCellRange(x, y){
    // функция рисования ячейки и отметки что нарисовали
    if ((x < 0) || (x>= numberOfcellsInColumns)){ return false;}
    if ((y < 0) || (y>= numberOfcellsInRow)){ return false;}

    console.log("X="+x + " Y="+y);

    if ((arrBackground[x][y] == 0) && (arrFlaged[x][y] == 0)) {
        // arrFlaged[x][y] = 1;
        drawAnArrayCell( x, y );
        return true;
    }
    else {
        if (arrFlaged[x][y] == 0){
            // arrFlaged[x][y] = 1;
            drawAnArrayCell( x, y );
            return true;
        }
    }
    return false;
}

function CalculateOpened(x , y){
    console.log("Открываем X="+x+" Y="+y);

    // Открытие соседних пустых ячеек
    if (arrBackground[x][y] != 0) {
        return false;
    }
    if (arrFlaged[x][y] == 0) {
        if (drawCellRange(x,y) == false){return false}}

    if (drawCellRange(x-1,y)) {CalculateOpened(x-1, y);}

    if (drawCellRange(x+1,y)) {CalculateOpened(x+1, y);}

    if (drawCellRange(x,y-1)) {CalculateOpened(x, y-1);}

    if (drawCellRange(x,y+1)) {CalculateOpened(x, y+1);}

    if (drawCellRange(x-1,y-1)) {CalculateOpened(x-1, y-1);}

    if (drawCellRange(x-1,y+1)) {CalculateOpened(x-1, y+1);}

    if (drawCellRange(x+1,y-1)) {CalculateOpened(x+1, y-1);}

    if (drawCellRange(x+1,y+1)) {CalculateOpened(x+1, y+1);}

    return true;


    // for (let j = y; j >= 0; j--){
    //     if (CalculateOpenedX(x,j) != true){ break; }
    // }
    // for (let j = y; j < numberOfcellsInRow; j++){
    //     if (CalculateOpenedX(x,j) != true){ break; }
    // }
}

function checkingTheCell(){
    // Проверка открытия всех ячеек кроме бомб
    let emptyCells = 0;
    let countflaged = 0;
    for (let x = 0; x < numberOfcellsInColumns; x++){
        for (let y = 0; y < numberOfcellsInRow; y++){
            if (arrFlaged[x][y] == 0) {
                emptyCells ++;
                // alert("Пустая и неоткрытая ячейка. X=" + x + " Y=" + y);
            }
            else {
                if (arrFlaged[x][y] == iarrFlag) {
                    countflaged ++;
                }
            }
        }
    }
    // alert("Все ячейки открыты");
    if ((emptyCells + countflaged) != colBomba) {
        return false;
    }
    else { return true;}
}

function checkingTheCellBombed() {
    // проверка правильности расстановки флагов
    for (let x = 0; x < numberOfcellsInColumns; x++){
        for (let y = 0; y < numberOfcellsInRow; y++){
            if (arrFlaged[x][y] == iarrFlag) {
                if (arrBackground[x][y] != iarrBomb){
                   let posX = x * cellSizeWidth;
                   let posY = y * cellSizeHeight;
                   ctx.drawImage(noBomb, posX, posY, cellSizeWidth, cellSizeHeight);
                }
            }
        }
    }

}

function clickCanvas(){
    // кликнули левой кнопкой мыши
    if (gameover == true) {

        // alert("gameover=" + gameover);
        clear();
        // location.reload();
        start();

        return;
    }
    // alert("кликнули левой X="+MouseX+" Y="+MouseY);
    let x = getPositionInArrayX(MouseX);
    let y = getPositionInArrayY(MouseY);
    if (arrFlaged[x][y] != 0) {
       // В ячейке стоит флаг или уже открыта
       return;
    }
    drawAnArrayCell( x, y );

    if (arrBackground[x][y] == iarrBomb) {
        // В ячейке стоит бомба
        showBombs();
        // нарисовать несоответствие флагов и бомб
        checkingTheCellBombed();
       // конец игры
       gameover = true;
       // проиграли
        let posX = x * cellSizeWidth;
        let posY = y * cellSizeHeight;
        ctx.drawImage(iBombed, posX, posY, cellSizeWidth, cellSizeHeight);

        attempt =  0;        // попытки

        // alert("X=" + posX + " Y="+posY);
        posX = (cvs.width / 2) - (defeat.width / 2);
        posY = (cvs.height / 2) - (defeat.height / 2);
        let lAlpha = ctx.globalAlpha;
        ctx.globalAlpha = 0.5;
        ctx.drawImage(defeat, posX, posY);
        ctx.globalAlpha = lAlpha;

        // alert("Проиграли");

       return;
    }
    else if (arrBackground[x][y] == 0) {
        // Пустая ячейка. Открыть соседние пустые ячейки
        if (emptyCellEnvironment(x, y)){
            // Открываем смежные пустые ячейки
            CalculateOpened(x, y);
        } else {console.log("Ячейка не пустая");}
    }
    if (checkingTheCell() == true){
        gameover = true;
        // Выиграли
        let posX = (cvs.width / 2) - (victory.width / 2);
        let posY = (cvs.height / 2) - (victory.height / 2);

        let lAlpha = ctx.globalAlpha;
        ctx.globalAlpha = 0.5;

        ctx.drawImage(victory, posX, posY);
        ctx.globalAlpha = lAlpha;

        attempt++;           // попытки
        if (attempt >= numberOfAttempts){
            attempt = 0;
            colBomba++;      // увеличиваем количество бомб
        }

        // alert("Выиграли");

        return;
    }
}

function clickCanvasOncontextmenu(){
    // кликнули правой кнопкой мыши
    if (gameover == true) {
        clear();
        // location.reload();
        start();

        return;
    }
    // alert("кликнули правой X="+MouseX+" Y="+MouseY);
    let x = getPositionInArrayX(MouseX);
    let y = getPositionInArrayY(MouseY);
    let posX = x * cellSizeWidth;
    let posY = y * cellSizeHeight;
    if (arrFlaged[x][y] == 0) {
        arrFlaged[x][y] = iarrFlag;
        ctx.drawImage(iFlaged, posX, posY, cellSizeWidth, cellSizeHeight);
        if (checkingTheCell() == true) {
            gameover = true;
            // Выиграли
            let posX = (cvs.width / 2) - (victory.width / 2);
            let posY = (cvs.height / 2) - (victory.height / 2);

            let lAlpha = ctx.globalAlpha;
            ctx.globalAlpha = 0.5;
            ctx.drawImage(victory, posX, posY);
            ctx.globalAlpha = lAlpha;

            // alert("Выиграли");

            return;
        }
    }
    else {
        if (arrFlaged[x][y] == iarrFlag) {
            arrFlaged[x][y] = 0;
            ctx.drawImage(iClosed, posX, posY, cellSizeWidth, cellSizeHeight);
        }
    }
}

function clear() {
    arrBackground = [[],[]]; // массив заднего фона
    arrFlaged = [[],[]];     // массив флагов

    MouseX = 0;
    MouseY = 0;

    gameover = false;

    attempt =  0;        // попытки

    ctx.clearRect(0, 0, cvs.width, cvs.height);
}

function init(){

    // alert("Количество бомб=" + colBomba);

    window.onload = function(){
        cvs.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clickCanvas();
        });
        cvs.oncontextmenu = function(e){
            e.preventDefault();
            clickCanvasOncontextmenu();
        }
        cvs.onmousemove = function (e) {
            MouseX = e.offsetX;
            MouseY = e.offsetY;
        }
        start();
    }
}

init();