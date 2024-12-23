import { ToastContainer } from 'react-toastify';
import { DrawingDesk } from './components';
import { ToolsPanel, ActionsPanel, ZoomPanel } from './components/panels';

import { DrawingProvider, ZoomProvider } from './contexts';
import { Tooltip } from 'react-tooltip';

function App() {
  return (
    <ZoomProvider>
      <DrawingProvider>
        <DrawingDesk />
        <ToolsPanel />
        <ActionsPanel />
        <ZoomPanel />

        <ToastContainer position="bottom-right" />
        <Tooltip id="btn-tooltip" className="z-[9999] !text-[12px]" />
      </DrawingProvider>
    </ZoomProvider>
  );
}

export default App;
