import { Provider as StoreProvider } from 'jotai';
import React from 'react';
import { ActionsBar } from '@/components/ActionsBar';
import { DrawingDesk } from '@/components/DrawingDesk';
import { Toaster } from '@/components/ui/Sonner';
import { store } from '@/store';

export const App = React.memo(() => {
  return (
    <StoreProvider store={store}>
      <DrawingDesk />
      <ActionsBar />
      <Toaster richColors position='top-right' />
    </StoreProvider>
  );
});
