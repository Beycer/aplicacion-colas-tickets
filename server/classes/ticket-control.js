const fs = require('fs');

class Ticket {
    
    //en el contructor necesito saber cual es el numero de ticket que voy atender
    //y que escritorio la va atender
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}



class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        //este arreglo va vontener todos los tickes pendientes de revision
        //los que no han sido atendidos por nadie
        this.tickets = [];
        this.ultimos4 = [];

        //leer informacion de un archivo json, cuando es un archivo json lo puedo hacer
        //directamente a si
        let data = require('../data/data.json');
        //console.log(data);

        //Cada que empezemos un nuevo dia, reinicio todo el proceso
        //si en el archivo de texto json hoy es igual a la fecha actual
        //tengo que leer el archivo y continuo el proceso, ticekts
        //si son diferentes quiere decir que es otro dia de trabajo y tengo que reiniciar
        //todo
        if(data.hoy === this.hoy){

            //si son iguales this.ultimo va ser igual a la informacion que venga en la data
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        }else{//funcion para reiniciar todo
            this.reiniciarConteo();
        }





    }

    siguiente(){
        //debe incrementar en 1 cual el ultimo ticket
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        //agregar ese ticket al arreglo de tickets
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }


    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        //Si no hay tickets pendientes, no hago nada
        if(this.tickets.length === 0){
            return 'No hay tickets';
        }

        //Tengo que tomar el primer ticket que se encuentr en ese arreglo de tickets
        //Obtener el numero del primer ticket que tengo pendiente
        let numeroTicket = this.tickets[0].numero;
        //Una vez con el numero del ticket, yo voy a eliminar inmediatamente 
        //el primer ticket del arreglo
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //poner ese ticket al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        //si llega a mas de 4, tengo que ir borrando los que ya van saliendo
        if(this.ultimos4.length > 4){
            //borrar el ultimo elemento
            this.ultimos4.splice(-1,1);
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        //regreso el ticket que tengo que atender
        return atenderTicket;

    }


    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo(){

        //información que quiero grabar
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            //grabar cuales son los pendientes
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        //tengo que mandarlo como un string
        let jsonDataString = JSON.stringify(jsonData);

        //grabar en el archivo de texto
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    
    }





}


module.exports = {
    TicketControl
}