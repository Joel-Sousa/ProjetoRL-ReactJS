
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

export type UserType = {
    id?: number; 
    name: string; 
    email: string; 
    password: string;
}

export type ListUserType = {
    idUserData: string;
    name: string;
    user: {
        id: number;
        email: string;
        role: {
            name: string;
        }
    }
}