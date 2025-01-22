import Rect, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';


interface ProviderProps{
    children: ReactNode; 
}
export const AppProviders:FC<ProviderProps> = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}