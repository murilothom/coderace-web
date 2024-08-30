import { Diversity2 } from '@mui/icons-material';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

export const Logo = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Diversity2 color="inherit" fontSize={mdDown ? 'medium' : 'large'} />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          sx={{ ml: 1, fontSize: { md: 28, xs: 22 } }}
          color={theme.palette.primary.contrastText}
          variant="h5"
          fontWeight={300}
        >
          EMP
        </Typography>
        <Typography
          sx={{ fontSize: { md: 28, xs: 22 } }}
          color={theme.palette.primary.contrastText}
          variant="h5"
          fontWeight={700}
        >
          SOLUÇÕES
        </Typography>
      </Box>
    </Box>
  );
};