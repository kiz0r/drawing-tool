import { ToastContainer } from 'react-toastify';
import { DrawingDesk } from './components';
import { ToolsPanel, ZoomPanel, ActionsPanel } from './components/panels';

import { DrawingProvider } from './contexts/drawingContext';
import { ZoomProvider } from './contexts/zoomContext';
import { Tooltip } from 'react-tooltip';
// import useCustomModal from './hooks/useCustomModal';
// import { CanvasBgModal, ColorModal, FigureModal } from './components/modals';

// const RenderModals = ({ modalName }: { modalName: string }) => {
//   switch (modalName) {
//     case 'canvas-background':
//       return <CanvasBgModal />;
//     case 'color':
//       return <ColorModal />;
//     case 'figure':
//       return <FigureModal />;
//     default:
//       return null;
//   }
// };

function App() {
  // const { currentModal } = useCustomModal();
  return (
    <ZoomProvider>
      <DrawingProvider>
        <DrawingDesk />
        <ToolsPanel />
        <ZoomPanel />
        <ActionsPanel />

        <ToastContainer position="bottom-right" />
        <Tooltip id="btn-tooltip" className="z-[9999] !text-[12px]" />

        {/* <RenderModals modalName={currentModal} /> */}
      </DrawingProvider>
    </ZoomProvider>
  );
}

export default App;
