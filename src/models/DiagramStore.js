import { types } from 'mobx-state-tree';
import axios from 'axios';

const Element = types
  .model('Element', {
    id: types.identifier,
    type: types.string,
    x: types.number,
    y: types.number,
    width: types.optional(types.number, 100),
    height: types.optional(types.number, 50),
    text: types.optional(types.string, ''),
    startElementId: types.maybeNull(types.string),
    endElementId: types.maybeNull(types.string)
  })
  .actions(self => ({
    move(x, y) {
      self.x = x;
      self.y = y;
    },
    updateText(text) {
      self.text = text;
    }
  }));

  const DiagramStore = types
  .model('DiagramStore', {
    elements: types.array(Element),
    selectedElement: types.maybeNull(types.reference(Element)),
    isDrawingArrow: types.optional(types.boolean, false),
    arrowStartElement: types.maybeNull(types.reference(Element))
  })
  .actions(self => ({
    addElement(type, x, y, extra = {}) {
      const element = {
        id: Math.random().toString(),
        type,
        x,
        y,
        width: type === 'arrow' ? 150 : 100,
        height: type === 'arrow' ? 30 : 50,
        ...extra
      };
      self.elements.push(element);
    },
    setSelectedElement(element) {
      self.selectedElement = element;
    },
    startDrawingArrow(element) {
      self.isDrawingArrow = true;
      self.arrowStartElement = element;
    },
    
    finishDrawingArrow(endElement) {
      if (self.arrowStartElement && endElement) {
        self.addElement('arrow', self.arrowStartElement.x, self.arrowStartElement.y, {
          startElementId: self.arrowStartElement.id,
          endElementId: endElement.id
        });
      }
      self.isDrawingArrow = false;
      self.arrowStartElement = null;
    },
    toggleArrowMode() {
      self.isDrawingArrow = !self.isDrawingArrow;
      if (!self.isDrawingArrow) {
        self.arrowStartElement = null;
      }
    },
    async saveDiagram() {
      try {
        await axios.post('http://localhost:3000/api/diagrams', {
          name: 'My Diagram',
          elements: self.elements.toJSON()
        });
      } catch (error) {
        console.error('Failed to save diagram:', error);
      }
    }
  }));

export const store = DiagramStore.create({
  elements: [],
  selectedElement: null
});