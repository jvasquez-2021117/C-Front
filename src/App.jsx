import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}