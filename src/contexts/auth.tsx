import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../service/api';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    Login(user: object): Promise<void>;
    Logout(history: any): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);

    useEffect(() => {
        const storagedUser = sessionStorage.getItem('@App:user');
        const storagedToken = sessionStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, []);

    const Login = async (data: any) => {
        console.log(data)
        const response = await api.post('/login', data);

        setUser(response.data.user);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        sessionStorage.setItem('@App:user', JSON.stringify(response.data.user));
        sessionStorage.setItem('@App:token', response.data.token);
    }

    function Logout(history: any) {
        history.push('/login')
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}