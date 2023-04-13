import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import MainPage from './pages/MainPage'
import './index.scss'
import NotFound from './pages/NotFound';
import ProductPage from './pages/ProductPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/:id' element={<ProductPage/>} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
