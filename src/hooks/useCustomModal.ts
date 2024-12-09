import { useState } from 'react';

type ApplicationModals = 'canvas-background' | 'color' | 'figure';

export default function useCustomModal() {
  const [currentModal, setCurrentModal] = useState<ApplicationModals | null>(
    null
  );

  const toggleModal = (modal: ApplicationModals) =>
    setCurrentModal((prev) => (prev === modal ? null : modal));

  return { currentModal, toggleModal };
}
