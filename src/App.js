import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { ToasterContext } from './component/common/toastAlertContext';

const ContextEngineList = lazy(() => import('./page/contextEngineList'));
const ContextEngineAdd = lazy(() => import('./page/contextEngineAdd'));
const ContextEngineEdit = lazy(() => import('./page/contextEngineEdit'));
const ContextEngineView = lazy(() => import('./page/contextEngineView'));
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
          <div class="loader"></div>
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
              <Route path="/context-engine" element={<ContextEngineList />} />
              <Route path="/context-engine-add" element={<ContextEngineAdd />} />
              <Route path="/context-engine-edit" element={<ContextEngineEdit />} />
              <Route path="/context-engine-view" element={<ContextEngineView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ToasterContext.Provider>

  );
}

export default App;
