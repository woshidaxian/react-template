import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home'
import reportWebVitals from './reportWebVitals';
import './assets/css/mixin.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 严格模式， 帮助在开发过程中尽早地发现组件中的常见错误
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();