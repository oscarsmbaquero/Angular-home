
export interface Iingreso{
    descripcion: string;
    importe: number;
    fecha: Date;
    tipo: TypeIngreso;
}
 export enum TypeIngreso {
    "trabajo" = "trabajo",
    "otro"= "otro",
}
export const TypeOfIngreso = Object.values(TypeIngreso);
// export interface ISong{
//     title:string
// }

