import React from 'react';
import { observer } from 'mobx-react-lite';
import { useDrag } from 'react-dnd';
import { store } from '../models/DiagramStore';

const DiagramElement = observer(({ element }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: { id: element.id, x: element.x, y: element.y },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const isSelected = store.selectedElement === element;

  const getShape = () => {
    switch (element.type) {
      case 'text':
        return <textarea style={{ border: 'none', outline: 'none'}}></textarea>
      case 'rectangle':
        return <div style={{ width: '100%', height: '100%', border: '1px solid black' }} />;
      case 'circle':
        return <div style={{ width: '100%', height: '100%', border: '1px solid black', borderRadius: '50%' }} />;
      case 'diamond':
        return <div style={{ width: '100%', height: '100%', border: '1px solid black', transform: 'rotate(45deg)' }} />;
      case 'arrow':
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
            <svg width="100%" height="20" viewBox="0 0 150 20">
              <defs>
                <marker
                  id={`arrow-${element.id}`}
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="black"/>
                </marker>
              </defs>
              <line
                x1="0"
                y1="10"
                x2="140"
                y2="10"
                stroke="black"
                strokeWidth="2"
                markerEnd={`url(#arrow-${element.id})`}
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        width: element.width,
        height: element.height,
        left: element.x,
        top: element.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: isSelected ? '2px solid blue' : 'none',
      }}
      onClick={(e) => {
        e.stopPropagation();
        store.setSelectedElement(element);
      }}
    >
      {getShape()}
    </div>
  );
});
export default DiagramElement