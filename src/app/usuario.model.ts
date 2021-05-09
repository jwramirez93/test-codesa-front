import { Rol } from "./rol.model";

export interface Usuario{
    id?: number;
    rol: Rol;
    nombre: string;
    activo: string;
}