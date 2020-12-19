//Comando para establecer la conexión
var socket = io();

socket.on('connect', function(){
    console.log('Conectado al servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
});


//saber que escritorio estoy
//para obtner los parametros por el url
//esta es una forma
var serachParams = new URLSearchParams(window.location.search);
//has para saber si viene el escritorio
//console.log(serachParams);

//si no existe el escritorio, me salgo de esa ventana
if(!serachParams.has('escritorio')){
    window.location= 'index.html';
    throw new Error('El escritorio es necesario');
}

//Si viene información sobre el escirtorio
var escritorio = serachParams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio: ' + escritorio);


//llamar al socket
$('button').on('click', function() {

    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp) {

        if(resp === 'No hay tickets'){
            label.text(resp);
            alert(resp);
            return;
        }

        //console.log(resp);
        label.text('Ticket '+ resp.numero);

    });
 
});