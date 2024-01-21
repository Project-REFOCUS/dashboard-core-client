import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.v2';
import appStore from './v2/stores/appStore';
import { Provider } from 'mobx-react';

const root = ReactDOM.createRoot(
    document.getElementById('root') //as HTMLElement
);

root.render(
    <Provider appStore={appStore}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
