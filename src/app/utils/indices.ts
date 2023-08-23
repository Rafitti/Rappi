export interface User {
    id: number;
    estado: string;
    habilitado: string;
    nombre: string;
    apellido: string;
    legajo: string;
    usuariont: string;
    password?: string;
    token: string;
    foto?: string;
    qr?: string;
    accesos: Access[];
    operaciones: Operation[];
}
export interface Access {
    pagina: string;
    descripcion: string;
    nivel: number;
    subpagina: Access[]
}
export interface Operation {
    id: string;
    descripcion: string;
}


export interface LogInResponse{
    data: User;
    status: any;
} 


export interface UserIn {
    username: string | null;
    password: string | null;
}