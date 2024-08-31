import { isAxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useAlertContext } from '../../shared/contexts/alert-context';
import feedbackService from '../../shared/services/feedback';
import recordTimesService from '../../shared/services/record-times-service';
import { Question } from '../../shared/types/Question';
import { Feedback } from './feedback';
import { RegisterRecordTime } from './register-record-time';

export const Home = () => {
  const [isRegisteringRecordTime, setIsRegisteringRecordTime] = useState(false);
  const [recordTimesToday, setRecordTimesToday] = useState<number>(0);
  const { showAlert } = useAlertContext();
  const [openModal, setOpenModal] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(true);
  const [isFetchingRecordTimes, setIsFetchingRecordTimes] = useState(true);
  const [hasFeedbacked, setHasFeedbacked] = useState(false);

  const handleChangeFeedbacked = () => {
    setHasFeedbacked(true);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = async () => {
    try {
      setIsRegisteringRecordTime(true);
      await recordTimesService.registerRecordTime();
      showAlert('Registro de ponto efetuado com sucesso!');
      await getRecordTimesToday();
      setOpenModal(false);
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error?.response?.data?.message, 'error');
      }
    } finally {
      setIsRegisteringRecordTime(false);
    }
  };

  const getRecordTimesToday = useCallback(async () => {
    try {
      setIsFetchingRecordTimes(true);
      const response = await recordTimesService.getRecordTimesToday();
      setRecordTimesToday(response);
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error?.response?.data?.message, 'error');
      }
    } finally {
      setIsFetchingRecordTimes(false);
    }
  }, []);

  const getQuestions = useCallback(async () => {
    try {
      setIsFetchingQuestions(true);
      const questions = await feedbackService.getQuestions();
      setQuestions(questions);
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error?.response?.data?.message, 'error');
      }
    } finally {
      setIsFetchingQuestions(false);
    }
  }, []);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  useEffect(() => {
    getRecordTimesToday();
  }, [getRecordTimesToday]);

  return isFetchingQuestions || isFetchingRecordTimes ? (
    <div />
  ) : (recordTimesToday === 0 || recordTimesToday === 3) && !hasFeedbacked ? (
    <Feedback
      isFinal={recordTimesToday === 3}
      questions={questions.filter((question) =>
        recordTimesToday === 3
          ? question.journey === 'fim'
          : question.journey === 'inicio',
      )}
      setFeedbacked={handleChangeFeedbacked}
    />
  ) : (
    <RegisterRecordTime
      closeModal={handleCloseModal}
      openModal={handleOpenModal}
      isModalOpen={openModal}
      isLoading={isRegisteringRecordTime}
      handleConfirm={handleConfirm}
    />
  );
};
