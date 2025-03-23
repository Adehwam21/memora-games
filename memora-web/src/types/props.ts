import { ReactNode } from "react";

export interface FormProps {
    toggleForm: () => void;
}

export interface LoginFormData {
    username: string;
    password: string;
}

export interface SignUpFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
    
export interface FormErrors {
    confirmPassword?: string;
}

export interface ProtectedRouteProps {
    children: ReactNode;
}

export interface Metric {
    level: number;
    attempt: number;
    totalResponseTime: number;
    accuracy: number;
    levelErrors: number;
}