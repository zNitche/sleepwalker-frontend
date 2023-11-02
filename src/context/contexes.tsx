import { createContext } from 'react';
import { IAuthContext } from '../interfaces/context/IAuthContext';
import { INotificationsContext } from '../interfaces/context/INotificationsContext';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)
export const NotificationsContext = createContext<INotificationsContext>({} as INotificationsContext)
