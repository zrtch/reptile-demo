import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // 注释防止后台报错
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

