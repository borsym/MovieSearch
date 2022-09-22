import React, { useEffect, useState, useContext } from 'react';

import { auth } from '../firebase';
import { User } from 'firebase/auth';

type LoaderType = (
    id: string,
    path: string,
    // eslint-disable-next-line
    setResult: (result: any) => void
) => Promise<void>;

interface AuthContextInt {
    user?: User | null;
    fetchWithAuth: (
        input: RequestInfo,
        init?: RequestInit
    ) => Promise<Response | null>;
    loader: LoaderType;
    signOut: () => Promise<boolean>;
}

export const AuthContext = React.createContext<AuthContextInt>({
    user: null,
    fetchWithAuth: () =>
        new Promise(() => {
            return;
        }),
    loader: async () => {
        return;
    },
    signOut: async () => {
        return false;
    },
});

export const useAuth = (): AuthContextInt => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC = props => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // eslint-disable-next-line
        auth.onAuthStateChanged(setUser as any);
    }, []);

    const fetchWithAuth = async (input: RequestInfo, init?: RequestInit) => {
        const token = await user?.getIdToken();
        if (token == null) return Promise.reject();
        try {
            return await fetch(input, {
                ...init,
                headers: {
                    ...init?.headers,
                    Authorization: `Bearer ${token}` || '',
                },
            });
        } catch (e) {
            return null;
        }
    };

    const loader: LoaderType = async (id, path, setResult) => {
        try {
            const res = await fetchWithAuth(
                `${process.env.REACT_APP_API_BASE_URL}/${path}/${id}`,
                {
                    method: 'GET',
                }
            );

            if (res?.ok) {
                const json = await res.json();
                setResult(json);
            } else {
                setResult(undefined);
            }
        } catch (e) {
            setResult(undefined);
        }
    };

    const signOut = async () => {
        await auth.signOut();
        return true;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                fetchWithAuth,
                loader,
                signOut,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
