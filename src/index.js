import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './styles.css'
import Layout from './Layout';
import {Login} from './ components/login/Login'
import { Request } from './ components/request/Request';
import { SongDownload } from './ components/song-download/SongDownload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="app-container">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {<Route index element={<SongDownload/>}/>}
          <Route path="request" element={<Request />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);



