import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { ToasterContext } from './component/common/toastAlertContext';

const ContextEngineList = lazy(() => import('./page/contextEngineList'));
const ContextEngineAddEditView = lazy(() => import('./page/contextEngineAddEditView'));
const Home = lazy(() => import('./page/home'));

function App() {
  const [toasts, setToasts] = useState([]);
  const [loader, setLoader] = useState(false);
  const addToast = (message, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter(toast => toast.id !== id));
  };
  return (
    <ToasterContext.Provider value={{ addToast, toasts, setLoader }}>
      {loader &&
        <div className='loader-body'>
          <div className="loader"></div>
        </div>
      }
      <div className='toast-container'>

        {toasts.map(toast => (
          <div key={toast.id} className="toast-alert">
            {toast.message}
          </div>
        ))}
      </div>
      <Suspense
        fallback={<div>Component1 are loading please wait...</div>}
      >
        <BrowserRouter >
          <Routes >
            <Route path="/" >
              <Route index element={<Home />} />
              <Route path="/context-engine-list" element={<ContextEngineList />} />
              <Route path="/context-engine" element={<ContextEngineAddEditView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ToasterContext.Provider>

  );
}

export default App;
