
export type ToastType = {
    open: boolean;
    icon: string;
    mensagem: string;
    timer: number;
}

export type LoginType = {
    email: string;
    password: string;
}

export type UsuarioType = {
    id?: number; 
    nome: string; 
    email: string; 
    password: string;
}

export type ListUsuarioType = {
    idUsuario: string;
    nome: string;
    user: {
        id: number;
        email: string;
        role: {
            nome: string;
        }
    }
}