import { ToastContainer } from 'react-toastify';
import { DrawingDesk } from './components';
import { ToolsPanel } from './components/panels';

import { DrawingProvider } from './contexts/drawingContext';

function App() {
  return (
    <DrawingProvider>
      <DrawingDesk />
      <ToolsPanel />
      <ToastContainer position="bottom-right" />
    </DrawingProvider>
  );
}

export default App;
