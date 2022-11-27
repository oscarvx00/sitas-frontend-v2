import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './styles.css'
import Layout from './Layout';
import {Login} from './ components/login/Login'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="app-container">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login/>}/>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);



