//Array con el listado de canciones a mostrar en el reprodutor
const canciones = [
"bensound-anewbeginning.mp3",
"bensound-creativeminds.mp3",
"bensound-house.mp3",
"bensound-littleidea.mp3",
"bensound-ukulele.mp3",
"bensound-happyrock.mp3"
]
//Array con el listado de estaciones a mostrar en el reprodutor
const estaciones = [
	"https://nl1.streamingpulse.com/ssl/flowerpowerradio"
]

const name = [
	"Flower Power"
]

var indiceActual = new Array(1)
//Funcion para crear mediante javascript el listado de canciones
function crearPlayList(){
	const listado = document.createElement('ol')
	listado.setAttribute("id", 'listadoMusica')
	for (let i = 0; i<estaciones.length; i++){
		const item = document.createElement('li')
		item.appendChild(document.createTextNode(name[i])) 
		item.setAttribute("id", estaciones.indexOf(estaciones[i]))
		listado.appendChild(item)
	}
	return listado
}
document.getElementById('playList').appendChild(crearPlayList())
 
var listadoMusica= document.getElementById('listadoMusica')
listadoMusica.onclick = (e) =>{
	const itemClick = e.target
	
	removeActive()
	itemClick.classList.add("active");
	reproduccionActual(itemClick.innerText)
	let index = name.indexOf(itemClick.innerText)
	loadMusic(estaciones[index])
	player.play()
	indiceActual[0]= e.target.id
	classIconPlay();
 
}
//Funcion para cambiar el icono del reprodutor
function classIconPlay(){
	var element = document.getElementById("iconPlay")
	element.classList.remove("fa-play");
    element.classList.add("fa-pause");
}
//Funcion para control del volumen
const volumen= document.getElementById("volumen")
volumen.oninput= (e) =>{
	const vol = e.target.value
	player.volume = vol
}

//Funcion para actualizar la barra de progreso del reprodutor
const updateProgress = () =>{
	
	if (player.currentTime >0){
		const barra = document.getElementById('progress')
		if(isFinite(player.duration)){
			barra.value = (player.currentTime / player.duration) * 100
			if(player.currentTime <= 240){
				document.getElementById("barra").style.width = player.currentTime+"px";
			}
			var duracionSegundos= player.duration.toFixed(0);
			dura=secondsToString(duracionSegundos);
			var actualSegundos = player.currentTime.toFixed(0)
			actual=secondsToString(actualSegundos);
			
			duracion= actual +' / '+ dura
			document.getElementById('timer').innerText=duracion 
		}else{
			barra.value = (player.currentTime) * 100
			if(player.currentTime <= 240){
			 document.getElementById("barra").style.width = player.currentTime+"px";
			}
			var actualSegundos = player.currentTime.toFixed(0)
			actual=secondsToString(actualSegundos);
			
			duracion = actual
			document.getElementById('timer').innerText = duracion 
		}
	}
	if (player.ended){
		nextMusic();//Reproducir la siguiente pista
	} 
}
//Funcion para reproducir la proxima cancion
function nextMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (estaciones.length == (musicaActual+1)){
		var siguiente = 0
	} else {
		var siguiente = musicaActual + 1
	}
	removeActive()
	var item=document.getElementById(siguiente)
	item.classList.add("active");
	loadMusic(estaciones[siguiente]);
	player.play()
	indiceActual[0]= siguiente
	classIconPlay()
}
//Funcion para reproducir la cancion anterior
function prevMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (musicaActual==0){
		var anterior= estaciones.length - 1
	} else {
		var anterior = musicaActual - 1
	}
	removeActive()
	var item=document.getElementById(anterior)
	item.classList.add("active");
	loadMusic(estaciones[anterior]);
	player.play()
	indiceActual[0]= anterior
	classIconPlay()
}
//Funcion para remover todas las clases css activas
function removeActive(){
	var elems = document.querySelectorAll(".active");
 	 [].forEach.call(elems, function(el) {
    	el.classList.remove("active");
 	 });
 	 return elems
}
//Funcion para mostrar el nombre del arhivo actual en reproduccion
function reproduccionActual(texto){
	document.getElementById('currentPlay').innerText=texto
}
//Funcion para cargar las canciones en el reproductor
/*function loadMusic(ruta){
	var source = document.getElementById('source')
	var folder ="audio";//Carpeta donde tenemos almancenada la musica
	source.src= folder+"/"+ruta
	var index= indiceActual[0]= canciones.indexOf(ruta)
	removeActive()
	var item=document.getElementById(index)
	item.classList.add("active");
	reproduccionActual("Reproduciendo: "+ ruta)
	player.load()
}*/
function loadMusic(ruta){
	var source = document.getElementById('source')
	source.src = ruta
	var index = indiceActual[0] = estaciones.indexOf(ruta)
	removeActive()
	var item=document.getElementById(index)
	item.classList.add("active");
	reproduccionActual(name[index])
	player.load()
}
//Funcion para pausar o darle play 
function togglePlay() {
	if (player.paused){
		toggleIcon();
		return player.play();
	} else {
		toggleIcon();
		return player.pause();
	}
}
//Funcion para cambiar el icono play o pause
function toggleIcon() {
   var element = document.getElementById("iconPlay");
   element.classList.toggle("fa-play");
   element.classList.toggle("fa-pause");
}
//Funcion para que al dar click sobre la barra de progeso se permita adelantar
progress.addEventListener('click', adelantar);
function adelantar(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
	player.currentTime = scrubTime;
	sonsole.log(e);
}
//Funcion para convertir segundos a minutos y horas
function secondsToString(seconds) {
	var hour="";
	if (seconds>3600){
		hour = Math.floor(seconds / 3600);
		hour = (hour < 10)? '0' + hour : hour;
		hour+=":"
	}
   var minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  var second = seconds % 60;
  second = (second < 10)? '0' + second : second;
  return hour  + minute + ':' + second;
}
loadMusic(estaciones[0])
