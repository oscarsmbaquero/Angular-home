
export interface IGasto {
    descripcion: string;
    fecha:Date;
    importe: number;    
    modoPago: string; 
    tipo: TypeGasto;
}
 export enum TypeGasto {
    "casa" = "casa",
    "finca" = "finca",
    "moto" = "moto",
    "coche" = "coche",
    
}
export const TypeOfCar = Object.values(TypeGasto);
// export interface ISong{
//     title:string
// }


