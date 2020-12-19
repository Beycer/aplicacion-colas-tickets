//toda la logica para manejar los nuevos tickets

//comando para establecer la comunicacion activo - activo con el servidor
var socket = io();

//jquery buscate en el dom por el id algo llamado lblNuevoTicket
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectado al servidor');
});


socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});


//todos los botones al hacer click en esta pantalla van a dispara esta función
$('button').on('click', function() {
    //console.log('click');

    //no voy a mandar ningun parametro null, pero si me interesa que se ejecute
    //esa función cuando termines, va recibir lo que es el siguienteTicket
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        //mostrar el ticket en el label
        label.text(siguienteTicket);
        //tambien necesito que el servidor ejecute ese callback

    });



});