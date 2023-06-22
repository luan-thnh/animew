import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { appBlack, appRed } from 'constants/colors';

const Banner = (props: { title: string }) => {
  const { title } = props;
  return (
    <Box
      sx={{
        my: '24px',
        borderBottom: `2px solid ${appRed[900]}`,
        fontWeight: 700,
        color: appBlack[50],
      }}
    >
      <Typography
        color="text"
        fontWeight="700"
        letterSpacing="1px"
        p="16px"
        pr="48px"
        display="inline-block"
        sx={{
          borderTopRightRadius: '999px',
          bgcolor: 'rgba(229, 57, 53, 0.4)',
          border: `2px solid ${appRed[900]}`,
          borderBottom: 0,
          boxShadow:
            '-2px -2px rgba(229, 57, 53, 0.6), -4px -4px rgba(229, 57, 53, 0.4), -6px -6px rgba(229, 57, 53, 0.2)',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Banner;
