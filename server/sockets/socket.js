const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

//con solo hacer esto se dispara el contructor de esa funcion, clase
const ticketControl = new TicketControl();


io.on('connection', (client) => {

    //recibo la data que es null y el segundo es el callback
    //para mostrar los ticket en pantall
    client.on('siguienteTicket', (data, callback) => {
        
        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente);

        //para evitar que nodemon reinicie el servidor cada que se graba algo en el 
        //data.js levantarlo con esta linea de comando
        //nodemon server/server -e js,html
        //para que solo este pendiente al cambio en esas extensiones
    });


    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {
        
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });


    });



});