import { ToastContainer } from 'react-toastify';
import { DrawingDesk } from './components';
import { ToolsPanel, ZoomPanel, ActionsPanel } from './components/panels';

import { DrawingProvider } from './contexts/drawingContext';
import { ZoomProvider } from './contexts/zoomContext';
import { Tooltip } from 'react-tooltip';

function App() {
  return (
    <ZoomProvider>
      <DrawingProvider>
        <DrawingDesk />
        <div className="w-full h-full">
          <ToolsPanel />
          <ZoomPanel />
          <ActionsPanel />
        </div>

        <ToastContainer position="bottom-right" />
        <Tooltip id="btn-tooltip" className="z-[9999] !text-[12px]" />
      </DrawingProvider>
    </ZoomProvider>
  );
}

export default App;
