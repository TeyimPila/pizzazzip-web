// IMPORT PACKAGES

import React from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from './state/stores/AppStore';
import { AppRouter } from './routers/AppRouter';

// IMPORT STORE

// IMPORT COMPONENTS


// COMPONENT

export const App = () => (
    <Provider store={createAppStore()}>
        {/*<div className="container">*/}
        <AppRouter />
        {/*</div>*/}
    </Provider>
);
