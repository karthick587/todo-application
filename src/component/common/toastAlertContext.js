import { createContext, useContext } from 'react';

export const ToasterContext = createContext();

export const useToaster = () => {
    return useContext(ToasterContext);
};