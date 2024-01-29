import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.v2';
import AppStore from './v2/stores/AppStore';
import { Provider } from 'mobx-react';

const root = ReactDOM.createRoot(
    document.getElementById('root') //as HTMLElement
);

root.render(
    <Provider AppStore={AppStore}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
