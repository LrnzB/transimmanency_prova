let isFirstResize = true;

var div_videos;

var divGenitoreCerchio;

let percentualeX = [];
let percentualeY = [];
var larghezzaSchermo = window.innerWidth; // Larghezza del viewport
var altezzaSchermo = window.innerHeight; // Altezza del viewport

percEllX = [];
percEllY = [];

let beginX = []; // Initial x-coordinate
let beginY = []; // Initial y-coordinate
let endX = []; // Final x-coordinate
let endY = []; // Final y-coordinate
let distX = []; // X-axis distance to move
let distY = []; // Y-axis distance to move
let x = [];
let y = [];
let exponent = []; // Determines the curve
let step = []; // Size of each step along the path
let pct = []; // Percentage traveled (0.0 to 1.0)

// N. Oggetti
let n_obj = 9; 

// grandezza videos
let videos_width = 70;

// uso per dividere in radianti e dare uno spazio preciso a tutti gli oggetti
var rX;    //radius
var rY;    //radius
var angle;
var step_angle;  //distance between steps in radians

//percorso video
let vidFolder = 'contents';
let vidName = 'vid_';
let vidFormat = '.mp4';
let vidPath = vidFolder + '/' + vidName
let numVideo = 56;

let videoPathUser;
let video_controllo = [];

let myButton
let div

let videlem
let videlem_2 = [];
let video_width
let rect_width
let rect_height
let button_width



function setup() {
/*
createCanvas(windowWidth, windowHeight);
//P5 crea un canvas che è inutile per adesso quindi cancello, sotto resize per avere canvas responsive!
var bCanvas = document.getElementById('defaultCanvas0');
bCanvas.style.width = "100%";
bCanvas.style.height = "100%";
*/
 // background(20);

 //Event listener per reload intera pagina se viene ridimensionata (andrebbe migliorato)
 //gestisciRidimensionamento();

 divGenitoreCerchio = document.createElement('div');
 
 document.body.appendChild(divGenitoreCerchio);

  step_angle  = TWO_PI/n_obj - (TWO_PI/n_obj/15); //in radians equivalent of 360/6 in degrees (+ levo 1/15 di angolo per dare un pò di spostamento)
  
  for(let i = 0; i < n_obj; i++){
 
  angle = step_angle * (i+1);
  beginX[i] = windowWidth/2; //random(0, width)
  beginY[i] = windowHeight/2; //random(0, height)
  
  //raggio per distanza dal centro
  rX = random(windowWidth/5, windowWidth/2.5 );
  rY = random(windowHeight/5, windowHeight/2.5 );
  
 // r * sin/cos(angle) da anche numeri negativi, quindi devio sommare width / 2 e height / 2 
  endX[i] = windowWidth/2 + rX * sin(angle);
  endY[i] = windowHeight/2 + rY * cos(angle);

percentualeX[i] = (endX[i] / larghezzaSchermo) * 100;
percentualeY[i] = (endY[i] / altezzaSchermo) * 100;

console.log('Percentuale X:', percentualeX + '%');
console.log('Percentuale Y:', percentualeY + '%');

  console.log(step_angle);
  console.log(endY[i]);
  
  step[i] = random(0.01, 0.015)
  pct[i] = 0;
  exponent[i] = random(1, 5)
  
  distX[i] = endX[i] - beginX[i];
  distY[i] = endY[i] - beginY[i];
  
  //console.log(endX[i]);
  //console.log(endY[i]);
   
  }

  console.log(windowWidth);
  console.log(windowHeight);

  if(windowWidth > 1000){

    video_width = 400;
    rect_width = 500;
    rect_height = 600;
    button_width = 70;

  }
  else{

    video_width = windowWidth*0.6;
    rect_width = windowWidth*0.7;
    rect_height = windowHeight*0.7;
    button_width = 70;

  }
/*
div = createDiv();
div.id('rect_1');
div.style('width', rect_width+"px");
div.style('height', rect_height+"px");
div.class("rect");
//div.position(0, 0, 'absolute');
div.style('background-color', 'rgba(30, 30, 30, 0.8)');
//div.style('opacity', opacity);
//div.center();
*/

crVideo_2()

div_videos = document.createElement("div");
div_videos.id = 'videosContainer';
div_videos.className = "videoContainer";
div_videos.style.opacity = "0";
document.body.appendChild(div_videos);
crVideo_3(0) //lo 0 mi serve per inizializzare variabile iterazione per loop (espediente per creare loop con timeout specifico, al posto di for)

var video_back = document.createElement('video');
/*
    // Impostazione degli attributi
    video_back.setAttribute('id', 'video_back');
    video_back.setAttribute('src', 'cont_back/vid_back_2.mp4');
    video_back.setAttribute('hidden', 'true');
    video_back.setAttribute('playsinline', 'true');

    // Aggiunta dell'elemento video al DOM
    document.body.appendChild(video_back);
*/
/*
  button = createButton('Book');
  button.id('button');
  button.class('my-button');
  //button.style('position', "absolute");
  //button.center();
*/
  myButton = document.getElementById("myButton");
  var container_btn_txt = document.getElementById("container_btn_txt");


  myButton.addEventListener("click", function() {
    // Richiama la tua nuova funzione
    //myButton.remove();
    container_btn_txt.remove();
    window.addEventListener('resize', handleResize);


    //myButton.style.opacity = 0;
   // myButton.style.transition = "opacity 2.5s ease";
       // Per IOS dovrei darlo solo dopo un gesto dell'user...mettere dopo click Partecipa
    playVideo();
  });


  //button.mousePressed(playVideo);

}

function crVideo_2(){


videlem = document.createElement("video");
videlem.id = "myVideo";
videlem.className = "myVid";

  //videlem = document.getElementById("myVideo");

  videoPathUser = vidPath + int(random(1, numVideo+1)) + vidFormat;

  videlem.src=videoPathUser;
  

  videlem.setAttribute('playsinline', '');
  videlem.hidden = true;
  videlem.src = videoPathUser;

  document.body.appendChild(videlem);

// Listener per pressione bottone
  let currentDiv_2 = document.getElementById("myVideo");

  
  currentDiv_2.addEventListener('ended', function() {
  console.log('Riproduzione del video terminata');

  downloadVideo()

  setTimeout(function() {
    changeBG()
    play_videos()

    var video_back = document.getElementById("video_back");
    video_back.play();

    gen_points()
  }, 1800);

  setTimeout(function() {

    var vid_1 = document.getElementById("myVideo");
    vid_1.style.opacity=0;
    vid_1.style.transition = "opacity 3s ease";

    var vid_2 = document.getElementById("videosContainer");
    vid_2.style.opacity=0;
    vid_2.style.transition = "opacity 3s ease";

    divGenitoreCerchio.style.opacity=0;
    divGenitoreCerchio.style.transition = "opacity 3s ease";

  }, 15000);

  setTimeout(function() {

    var lst_text = document.getElementById("final_text");
    lst_text.removeAttribute('hidden');
    lst_text.style.opacity=1;
    lst_text.style.transition = "opacity 3s ease";

    //lst_text.classList.add('transition_on');

    var vid_1 = document.getElementById("myVideo");
    vid_1.remove();

    var vid_2 = document.getElementById("videosContainer");
    vid_2.remove();
    

    divGenitoreCerchio.remove();


  }, 19000);



});

}

function crVideo_3(iterazione){

  let i = iterazione;

  let videoPath = vidPath + int(random(1, numVideo+1)) + vidFormat;
  console.log(videoPath);

  videlem[i] = document.createElement("video");
  /// ... some setup like poster image, size, position etc. goes here...

  videlem[i].id = 'myVideo'+i;

  videlem[i].src = videoPath ;
  videlem[i].muted = true;
  
  videlem[i].width = videos_width;
  videlem[i].setAttribute('playsinline', '');
  videlem[i].hidden = true;
  videlem[i].loop = true;
  videlem[i].autoplay = true;
  videlem[i].style.position = "absolute";
  videlem[i].style.left = 0;
  videlem[i].style.top = 0;

  videlem[i].style.left = percentualeX[i]+"%";
  videlem[i].style.top = percentualeY[i]+"%";

  let sourceMP4 = document.createElement("source"); 
  sourceMP4.type = "video/mp4";
  sourceMP4.src = "video/02-hevcmp4.mp4";
  videlem[i].appendChild(sourceMP4);

// li racchiudo tutti in un unico div!
  div_videos.appendChild(videlem[i]);
  
  videlem[i].addEventListener('loadedmetadata', function() {
    console.log('Il video è pronto. Durata:', videlem[i].duration);
  });
  
  videlem[i].addEventListener('error', function() {
    console.log('Si è verificato un errore durante il caricamento del video.');
  });

  //Uso questo invece del ciclo for perchè mi permettere di definire un tempo per il loop (setTimeout)
  if (i < n_obj-1) {  setTimeout(function() {
    crVideo_3(iterazione + 1); // richiama la funzione con l'iterazione successiva
  }, 10); // imposta un ritardo di 1 mstra le iterazioni
  } 
  else {
    return ; // esce dalla funzione
  }

}


function playVideo(){


  //button.addClass("fast_opacity");
  videlem.hidden = false;
  videlem.play();

  //handleResize()

}

function changeBG() {


  div = document.getElementById('rect');
  div.style.opacity=0;
  div.style.transition = "opacity 2.5s ease";

  //div_videos = document.getElementById("videosContainer");

  div_videos.style.opacity = "1"; // Imposta l'opacità al 50%
  div_videos.style.transition = "opacity 2.5s ease";
  
  //div.class("rect_2");

 // const element = document.querySelector('.rect_1');
//element.classList.add('transparent'); // Aggiunge la classe 'transparent'

  //div.class("rect_2");

}


// Download funzionante

function downloadVideo() {

  var downloadLink = document.getElementById('downloadLink');
  downloadLink.href = videoPathUser;
  downloadLink.click();

}

function play_videos(){


  let videlem_3 = document.getElementById('myVideo');

  videlem_3.muted = true;
  videlem_3.play();
  //videlem_3.autoplay = true;
  videlem_3.loop = true;

  videlem_3.className = ("video_transition");
  videlem_3.style.opacity=1;

  

  for (let i = 0; i < n_obj; i++) {
    setTimeout(function() {
      videlem_2[i] = document.getElementById('myVideo'+i);

      videlem_2[i].hidden = false;
      videlem_2[i].hidden = false;
    }, i * 2); // Ritardo di 1 secondo tra ogni iterazione
  }
/*
  for(let i = 0; i < n_obj; i++){

  videlem_2[i] = document.getElementById('myVideo'+i);

  videlem_2[i].hidden = false;

  }
*/

}  

function gen_points(){

  for(let i = 0; i < n_obj; i++){
  //serve per creare un feebback dell'ellissse (se metti background() in function setup
  //fill(30, 20);
  //rect(0, 0, width, height);
    pct[i] += step[i];
  if (pct[i] < 1.0) {
    x[i] = beginX[i] + pct[i] * distX[i];
    y[i] = beginY[i] + pow(pct[i], exponent[i]) * distY[i];

    
    // conversione in percentuale
    percEllX[i] = (x[i] / larghezzaSchermo) * 100;
    percEllY[i] = (y[i] / altezzaSchermo) * 100;

    //console.log(percEllX, percEllY);

  }
  
  //fill(255);
  //ellipse(x[i], y[i], 3, 3);

  var cerchio = document.createElement('div');

  cerchio.style.position = "absolute";
  cerchio.style.left = percEllX[i]+'%';
  cerchio.style.top = percEllY[i]+'%';
  cerchio.style.width = '2px';
  cerchio.style.height = '2px';
  cerchio.style.borderRadius = '50%';
  cerchio.style.backgroundColor = 'white';
  cerchio.style.margin = '1px';

  divGenitoreCerchio.appendChild(cerchio);
  
  }

  const tuttiMaggioriDiUno = pct.every((valore) => valore > 1);

  if (tuttiMaggioriDiUno) {


    fine();
    return;

    }

// loop ogni 15 ms.
  setTimeout(gen_points, 15);



}

function handleResize() {
  if (isFirstResize) {
    const video = document.querySelector('.video_transition');
    video.style.transition = 'none';
    isFirstResize = false;
  }
}


function fine(){
  console.log("Tutti i valori sono maggiori di 1, fine processi");
  
}



