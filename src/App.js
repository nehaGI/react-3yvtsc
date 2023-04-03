import React from 'react';
import './style.css';
import './ruf-menubar.js';

export default function App() {
  return (
    <div>
      <h1>RUF Menubar</h1>
      <ruf-menubar items="item1,item2,item3"></ruf-menubar>
    </div>
  );
}
