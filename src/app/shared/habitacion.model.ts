export class HabitacionModel {

    constructor(
        public id_habitacion: number,
        public numero: number,
        public tipo: string,
        public precio: number,
        public id_hotel: string,
        public nombre_hotel: string,
        public disponible: number
    ) { }
}