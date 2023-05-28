
export interface IGasto {
    id?:any;
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
  "sua"= "sua",
  personal = "personal"
}
export const TypeOfCar = Object.values(TypeGasto);
// export interface ISong{
//     title:string
// }


