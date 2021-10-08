
var gateway = `ws://${window.location.hostname}/ws`; //adresa IP a serverului web/
var websocket; //creare variabila noua pentru utilizare protocol/
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket(); //functie ce initializeaza conexiunea WebSocket/
}

function getValues(){ //se trimite mesaj catre server/
    websocket.send("Valoare curenta"); //se obtine valoarea curenta/
}

function initWebSocket() { //se initializeaza conexiunea/
    console.log('Se încearca conexiunea cu WebSocket…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage; //atribuirea functiilor de apel pentru tipul de conexiune/
}

function onOpen(event) {
    console.log('Conexiune deschisă');
    getValues();
}

function onClose(event) {
    console.log('Conexiune închisă');
    setTimeout(initWebSocket, 1000);
}

function updateSliderPWM(element) { //functie definite pentru rularea slider-urului/
    var sliderNumber = element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
    console.log(sliderValue);
    websocket.send(sliderNumber+"s"+sliderValue.toString()); //ESP8266 primeste mesaj si se modifica luminozitate led/
}
 
function onMessage(event) { //editarea mesajelor primite prin protocol/
    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);

    for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        document.getElementById(key).innerHTML = myObj[key];
        document.getElementById("slider"+ (i+1).toString()).value = myObj[key];
    }
}
