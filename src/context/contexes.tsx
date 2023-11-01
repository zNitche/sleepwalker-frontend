import { createContext } from 'react';
import { IAuthContext } from '../interfaces/context/IAuthContext';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

