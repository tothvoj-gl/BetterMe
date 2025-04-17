import {useEffect} from 'react';

type Props = {
  goToNextPage: () => void;
  onUpdate: () => boolean;
  setValidationError: (isError: boolean) => void;
  requestedPage: number;
  index: number;
  currentIndex: number;
};

const useGoToNextPage = ({
  index,
  currentIndex,
  requestedPage,
  goToNextPage,
  onUpdate,
  setValidationError,
}: Props) => {
  useEffect(() => {
    if (index === currentIndex && requestedPage > index) {
      const success = onUpdate();
      if (success) {
        goToNextPage();
      } else {
        setValidationError(true);
      }
    }
  }, [
    currentIndex,
    index,
    requestedPage,
    onUpdate,
    goToNextPage,
    setValidationError,
  ]);
};

export default useGoToNextPage;
