import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { persistor, store } from './state/stores/AppStore';
import { PersistGate } from 'redux-persist/lib/integration/react';

export const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
        </PersistGate>
    </Provider>
);
