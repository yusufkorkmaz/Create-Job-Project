import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { JobsProvider } from './context/jobsContext';
import App from './App';
import { ModalProvider } from './context/modalContext';
import { SnackBarProvider } from './context/snackBarContext';
import { PrioritiesProvider } from './context/prioritiesContext';
import { SearchProvider } from './context/searchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JobsProvider>
      <ModalProvider>
        <SnackBarProvider>
          <PrioritiesProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </PrioritiesProvider>
        </SnackBarProvider>
      </ModalProvider>
    </JobsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
