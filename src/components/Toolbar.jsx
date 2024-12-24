import React from 'react';
import { observer } from 'mobx-react-lite';
import { store } from '../models/DiagramStore';

const Toolbar = observer(() => {
  const shapes = ['rectangle', 'circle', 'diamond', 'arrow', 'text'];

  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      {shapes.map(shape => (
        <button
          key={shape}
          onClick={() => store.addElement(shape, 100, 100)}
          style={{ marginRight: '10px' }}
        >
          Add {shape}
        </button>
      ))}
      <button onClick={() => {
        store.saveDiagram()
        alert('Diagram saved successfully!')
      }}>Save Diagram</button>
      <div style={{ display: 'inline-block', float: "right"}}>Arzuman Torosian Diagram Tool</div>
    </div>
  );
});

export default Toolbar;