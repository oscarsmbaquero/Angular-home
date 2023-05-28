
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
  "moto" = "moto",
  "coche" = "coche",
  "sua"= "sua",
  "personal" = "personal",
  "otro" = "otro"
}
export const TypeOfCar = Object.values(TypeGasto);



