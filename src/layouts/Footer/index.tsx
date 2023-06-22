import React from 'react';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import LogoAnimew from 'assets/logo-animew.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Button, IconButton } from '@mui/material';
import { appBlack } from 'constants/colors';

const Footer = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mt="48px"
      py="16px"
      boxShadow={`0 -3px rgba(229, 57, 53, 0.6), 0 -6px rgba(229, 57, 53, 0.4), 0 -9px rgba(229, 57, 53, 0.2)`}
    >
      <Link to="/">
        <img src={LogoAnimew} alt="" />
      </Link>

      <Stack direction="row" justifyContent="space-between" alignItems="center" gap="8px">
        <Button
          variant="text"
          component="a"
          href="//github.com/luan-thnh"
          sx={{ minWidth: 0, width: '42px', height: '42px', color: appBlack[0] }}
        >
          <GitHubIcon sx={{ width: '32px', height: '32px' }} />
        </Button>
        <Button
          variant="text"
          component="a"
          href="//facebook.com/luanthnh.dev"
          sx={{ minWidth: 0, width: '42px', height: '42px', color: appBlack[0] }}
        >
          <FacebookRoundedIcon sx={{ width: '32px', height: '32px' }} />
        </Button>
        <Button
          variant="text"
          component="a"
          href="//linkedin.com/luanthnh"
          sx={{ minWidth: 0, width: '42px', height: '42px', color: appBlack[0] }}
        >
          <LinkedInIcon sx={{ width: '32px', height: '32px' }} />
        </Button>
      </Stack>
    </Stack>
  );
};

export default Footer;
