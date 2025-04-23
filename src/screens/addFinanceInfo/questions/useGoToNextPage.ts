import {useEffect} from 'react';

type Props = {
  goToNextPage: () => void;
  validate: () => Promise<boolean>;
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
  validate,
  setValidationError,
}: Props) => {
  useEffect(() => {
    const checkInput = async () => {
      if (index === currentIndex && requestedPage > index) {
        const success = await validate();
        setValidationError(!success);
        if (success) {
          goToNextPage();
        }
      }
    };

    checkInput();
  }, [
    currentIndex,
    index,
    requestedPage,
    validate,
    goToNextPage,
    setValidationError,
  ]);
};

export default useGoToNextPage;
