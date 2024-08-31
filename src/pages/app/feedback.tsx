import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useState } from 'react';

import { RadioGroupRating } from '../../shared/components/radio-group-rating';
import { useAlertContext } from '../../shared/contexts/alert-context';
import { useEmployeeContext } from '../../shared/contexts/employee-context';
import feedbackService from '../../shared/services/feedback';
import { Question } from '../../shared/types/Question';

interface FeedbackProps {
  isFinal: boolean;
  questions: Question[];
  setFeedbacked: () => void;
}

export const Feedback = ({
  setFeedbacked,
  isFinal,
  questions,
}: FeedbackProps) => {
  const { employee, isFetchingEmployee } = useEmployeeContext();
  const { showAlert } = useAlertContext();
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; rate: number }[]
  >([...questions.map((question) => ({ questionId: question.id, rate: 3 }))]);

  const handleChange = (questionId: string, rate: number) => {
    setAnswers((state) => {
      return state.map((answer) =>
        answer.questionId === questionId ? { questionId, rate } : answer,
      );
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmittingFeedback(true);
      await feedbackService.sendFeedback({ answers });
      setFeedbacked();
      showAlert('Feedback enviado com sucesso!');
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error?.response?.data?.message, 'error');
      }
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {employee && !isFetchingEmployee ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mb: 4,
              }}
            >
              <Typography fontWeight={500} variant="h5" gutterBottom>
                Seu bem-estar importa para nós!
              </Typography>
              <Typography variant="body1">
                Queremos entender como você está se sentindo para criar um
                ambiente mais saudável e produtivo. Reserve um momento para
                compartilhar sua experiência e nos ajudar a melhorar sua jornada
                digital.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {questions
                .filter((question) =>
                  isFinal
                    ? question.journey === 'fim'
                    : question.journey === 'inicio',
                )
                .map((question) => (
                  <Box
                    key={question.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <Typography variant="h6">{question.question}</Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <RadioGroupRating
                        onChange={(value) =>
                          handleChange(question.id, value as number)
                        }
                      />
                    </Box>
                  </Box>
                ))}

              <Button
                sx={{ minWidth: '100%' }}
                variant="contained"
                disabled={isSubmittingFeedback}
                onClick={handleSubmit}
              >
                {isSubmittingFeedback ? (
                  <CircularProgress size={24} />
                ) : (
                  'Enviar feedback'
                )}
              </Button>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};
