import React from 'react';

interface ErrorContextType {
    errors: string[] | null;
    addError: (error: string) => void;
    clearAll: () => void;
}

export const ErrorContext = React.createContext<ErrorContextType>({
    errors: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    addError: (error: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    clearAll: () => {},
});
