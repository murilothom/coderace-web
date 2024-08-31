import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement<any>;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Muito insatisfeito',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Insatisfeito',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutro',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfeito',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Muito satisfeito',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

interface RadioGroupRatingProps {
  onChange: (newValue: number | null) => void;
}

interface RadioGroupRatingProps {
  onChange: (newValue: number | null) => void;
}

export function RadioGroupRating({ onChange }: RadioGroupRatingProps) {
  const [ratingValue, setRatingValue] = useState<number | null>(3);

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => {
    setRatingValue(newValue);
    onChange(newValue);
  };

  // Use ratingValue para manter o estado atualizado e valor inicial
  return (
    <StyledRating
      value={ratingValue}
      onChange={handleRatingChange}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}
