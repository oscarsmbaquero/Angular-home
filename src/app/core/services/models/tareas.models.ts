
export interface ITareas {
    descripcion: string;
    fecha:Date;
    prioridad: TypePrioridad;    
    tipo: TypeTarea;
}
 export enum TypeTarea {
    "personal" ="personal",
    "trabajo" = "trabajo",
    "ocio" = "ocio",    
}

export enum TypePrioridad {
    "alta" = "alta",
    "media"= "media",
    "baja" = "baja" ,
}
export const TypeOfTarea = Object.values(TypeTarea);
export const TypeOfPrioridad = Object.values(TypePrioridad);



