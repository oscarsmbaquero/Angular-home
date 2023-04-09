
export interface IGasto{
    descripcion: string;
    importe: number;
    fecha: string;
    tipo: TypeGasto;
}
 export enum TypeGasto {
    "personal" = "personal",
    "casa"= "casa",
    "moto"= "moto",
}
export const TypeOfGasto = Object.values(TypeGasto);
// export interface ISong{
//     title:string
// }

