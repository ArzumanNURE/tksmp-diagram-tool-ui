import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import './App.css';

const App = () => (
  <DndProvider backend={HTML5Backend}>
    <div>
      <Toolbar />
      <Canvas />
    </div>
  </DndProvider>
);

export default App;