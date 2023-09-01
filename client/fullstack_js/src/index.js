import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { GlobalStyles, GridSystem } from './components';
import { store } from './store';

import './fontawesomeIcons/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
   <Provider store={store}>
      <GridSystem>
         <GlobalStyles>
            <App />
         </GlobalStyles>
      </GridSystem>
   </Provider>
   </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
