export interface Auth {}

export interface ILoginRequest {
    email: string | undefined;
    password: string | undefined;
}

export interface LoginResponse {
    userId: string;
    userName: string;
    email: string;
    token: string;
    role: number;
}

// ممكن مستقبلاً نضيف هنا RegisterRequest أو ChangePasswordRequest
