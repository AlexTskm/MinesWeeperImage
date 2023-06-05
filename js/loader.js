console.clear();
export {victory, defeat, arrImgNum, iClosed, iOpened, iBomba, iBombed, iFlaged, noBomb, myImages, loader, randomImage}

let iClosed = new Image(); // изображение закрытой ячейки
let colImgClosed = 4;     // количество изображений закрытой ячейки
let iOpened = new Image(); // массив изображений открытой ячейки
let colImgOpened = 4;      // количество изображений открытой ячейки
let arrImgNum = [];        // массив изображений номера
let colImgNum = 8;         // количество изображений номера
let iBomba = new Image();  // изображение бомбы
let colImgBomb = 4;        // количество изображений бомбы
let iBombed = new Image(); // изображение взрыва
let iFlaged = new Image(); // изображение флага
let noBomb  = new Image(); // изображение отсутствия бомбы
let victory = new Image(); // изображение победы
let defeat  = new Image(); // изображение поражения

// задаем объект перечисления
const myImages = { CLOSED:'CLOSED', OPENED:'OPENED', NUM:'NUM', BOMBA:'BOMBA', BOMBED:'BOMBED', FLAGED:'FLAGED', NOBOMB:'NOBOMB' };

function  loaderClosed(){
 // функция загрузки изображений закрытой ячейки
    let nameFile = "img/" + "Close" + randomImage(colImgClosed) + '.jpg';
     iClosed.src = nameFile;

     console.log("ImgClose=" + nameFile);
}

function  loaderOpened(){
    // функция загрузки изображений открытой ячейки
    let nameFile = "img/" + "Open" + randomImage(colImgOpened) + '.jpg';
    iOpened.src = nameFile;

    console.log("ImgOpened=" + nameFile);
}

function  loaderNum(){
    // функция загрузки изображений номера
    arrImgNum = new Array (colImgNum);
    for (let i = 1; i<= colImgNum; i++){
        let nameFile = "img/" + "Num" + i + '.jpg';
        arrImgNum[i-1] = new Image();
        arrImgNum[i-1].src = nameFile;

        console.log("ImgNum=" + nameFile);
    }
}

function  loaderBomba(){
    // функция загрузки изображений номера
    let nameFile = "img/" + "Asteroid" + randomImage(colImgBomb) + '.jpg';
    iBomba.src = nameFile;

    console.log("ImgBomba=" + nameFile);
}


function randomImage(colImg) {
    let count = Math.floor(Math.random() * (colImg+1));
    if (count == 0) {
        count = 1;
    }
    else {
        if (count > colImg) {
            count = colImgimg;
        }
        }
    return String(count);
}

function loader(){

    loaderClosed();
    loaderOpened();
    loaderNum();
    loaderBomba();

    iBombed.src = "img/Bombed.jpg" ; // изображение взрыва
    iFlaged.src = "img/Flaged.jpg"; // изображение флага
    noBomb.src  = "img/nobomb.jpg";  // изображение отсутствия бомбы
    victory.src = "img/victory.jpg"; // изображение победы
    defeat.src  = "img/defeat.jpg"; // изображение поражения


}

loader();