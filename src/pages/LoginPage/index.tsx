import React, { useState, useContext, FormEvent } from 'react';
import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { appBlack, appRed } from 'constants/colors';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from 'components/Contexts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Banner from 'components/Banner';
import authAPI from 'api/authApi';
import profileApi from 'api/profileApi';

interface IUserInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  document.title = `Login || AnimeW`;

  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState<IUserInput>({ email: '', password: '' });
  const [message, setMessage] = useState({ status: '', message: '' });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resLogin = await authAPI.login(userInput);
      const { token, username } = resLogin.data;

      localStorage.setItem('token', JSON.stringify(token));
      dispatch({ type: 'CURRENT_USER', payload: { username } });
      setMessage({
        status: resLogin.statusText,
        message: 'Login successful! Welcome back to your account.',
      });

      const resProfile = await profileApi.getProfile();

      if (resProfile) {
        const { avatar } = resProfile.data;
        dispatch({ type: 'CURRENT_USER', payload: { username, avatar } });
      }

      navigate('/');
    } catch (error: any) {
      setMessage({ status: error.statusText, message: error.message });
    }
  };

  console.log(message);

  return (
    <>
      <Banner title="Login" />
      <Stack
        width="400px"
        margin="0 auto"
        gap="24px"
        py="80px"
        component="form"
        onSubmit={handleFormSubmit}
      >
        <TextField
          label="Email"
          name="email"
          variant="standard"
          value={userInput.email}
          onChange={handleOnChange}
          sx={{
            '& .MuiAutocomplete-clearIndicator': {
              color: appBlack[100],
            },
            '& .MuiFormLabel-root': {
              color: appBlack[100],

              '&.Mui-focused': {
                color: appRed[600],
              },
            },
            '.MuiInputBase-root.MuiInput-root:before': {
              borderBottom: '1px solid #FFFFFF !important',
            },
            '.MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid rgba(229, 57, 53, 0.4)',
            },
          }}
        />
        <TextField
          label="Password"
          variant="standard"
          name="password"
          type="password"
          value={userInput.password}
          onChange={handleOnChange}
          sx={{
            '& .MuiInputBase-root': {},
            '& .MuiAutocomplete-clearIndicator': {
              color: appBlack[100],
            },
            '& .MuiFormLabel-root': {
              color: appBlack[100],

              '&.Mui-focused': {
                color: appRed[600],
              },
            },
            '.MuiInputBase-root.MuiInput-root:before': {
              borderBottom: '1px solid #FFFFFF !important',
            },
            '.MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid rgba(229, 57, 53, 0.4)',
            },
          }}
        />
        <Stack direction="row" gap="8px" justifyContent="center">
          <Typography
            component={Link}
            to="/forgot-password"
            sx={{ '&:hover': { textDecoration: 'underline' } }}
          >
            Forgot password ?
          </Typography>{' '}
          <Typography
            component={Link}
            to="/register"
            sx={{ color: appRed[600], '&:hover': { textDecoration: 'underline' } }}
          >
            Register
          </Typography>
        </Stack>
        <Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '150px', margin: '0 auto' }}
            onClick={() => setOpen(true)}
          >
            Login
          </Button>
          {message && message.message && (
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={1000}
              open={open}
              onClose={() => setOpen(false)}
              key={'top' + 'center'}
            >
              <Alert severity={message.status === 'Failed!' ? 'error' : 'success'}>
                {message.message}
              </Alert>
            </Snackbar>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default LoginPage;
