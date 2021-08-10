import React from 'react'
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import "react-datetime/css/react-datetime.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-input-range/lib/css/index.css'
import 'react-tridi/dist/index.css';
import './index.css';
import './App.scss'
import 'react-image-lightbox/style.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';

import history from './utils/history'
import store from './redux/configureStore'
import LanguageProviderDefault from './pages/LanguageProvider'
import CommonLayout from './layout/CommonLayout'

function App() {
  return (
    <Provider store={store}>
      <LanguageProviderDefault>
        <ConnectedRouter history={history}>
          <div className="appContainer">
            <CommonLayout />
          </div>
        </ConnectedRouter>
      </LanguageProviderDefault>
    </Provider>
  );
}

export default App;
