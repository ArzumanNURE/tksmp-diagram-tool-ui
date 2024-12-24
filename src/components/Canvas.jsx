import React from 'react';
import { observer } from 'mobx-react-lite';
import { useDrop } from 'react-dnd';
import { store } from '../models/DiagramStore';
import DiagramElement from './DiagramElement';

const Canvas = observer(() => {
  const [, drop] = useDrop({
    accept: 'element',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.x + delta.x);
      const top = Math.round(item.y + delta.y);
      store.elements.find(e => e.id === item.id)?.move(left, top);
      return undefined;
    }
  });

  return (
    <div 
      ref={drop} 
      style={{ 
        width: '100%', 
        height: '600px', 
        border: '1px solid black',
        position: 'relative' 
      }}
      onClick={() => store.setSelectedElement(null)}
    >
      {store.elements
        .map(element => (
          <DiagramElement 
            key={element.id} 
            element={element} 
          />
        ))}
    </div>
  );
});

export default Canvas;