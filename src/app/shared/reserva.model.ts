export class ReservaModel {
    constructor(
        public id_reserva: number,
        public id_habitacion: number,
        public fecha_entrada: Date,
        public fecha_salida: Date,
    ) { }
}