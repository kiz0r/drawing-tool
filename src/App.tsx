import { ToastContainer } from 'react-toastify';
import { DrawingDesk } from './components';
import { ToolsPanel, ActionsPanel } from './components/panels';

import { DrawingProvider } from './contexts';
import { Tooltip } from 'react-tooltip';

function App() {
  return (
    <DrawingProvider>
      <DrawingDesk />
      <ToolsPanel />
      <ActionsPanel />

      <ToastContainer position="bottom-right" />
      <Tooltip id="btn-tooltip" className="z-[9999] !text-[12px]" />
    </DrawingProvider>
  );
}

export default App;
