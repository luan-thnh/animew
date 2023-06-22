import React, { useState, useContext } from 'react';
import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { appBlack, appRed } from 'constants/colors';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from 'components/Contexts';
import authAPI from 'api/authApi';
import profileApi from 'api/profileApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MESSAGES, VALIDATE } from 'constants/validate';

interface IUserInput {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required(MESSAGES.EMAIL_REQUIRED).email(MESSAGES.INVALID_EMAIL),
  password: yup
    .string()
    .required(MESSAGES.PASSWORD_REQUIRED)
    .min(VALIDATE.MINIMUM_PASSWORD_LENGTH, MESSAGES.INVALID_PASSWORD)
    .matches(VALIDATE.PASSWORD_VALIDATION_REGEX, MESSAGES.INVALID_PASSWORD),
});

const LoginPage = () => {
  document.title = `Login || AnimeW`;

  const { dispatch } = useContext(AppContext);
  const [message, setMessage] = useState({ status: '', message: '' });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const handleFormSubmit: SubmitHandler<IUserInput> = async (data) => {
    try {
      const resLogin = await authAPI.login(data);
      const { token, username } = resLogin.data;
      localStorage.setItem('token', token);
      dispatch({ type: 'CURRENT_USER', payload: { username } });
      setOpen(true);
      setMessage({
        status: resLogin.statusText,
        message: 'Register successful! Welcome to AnimeW.',
      });

      const resProfile = await profileApi.getProfile();

      if (resProfile) {
        const { avatar } = resProfile.data;
        dispatch({ type: 'CURRENT_USER', payload: { username, avatar } });
      }

      navigate('/');
    } catch (error: any) {
      setOpen(true);
      setMessage({ status: error.statusText, message: error.message });
    }
  };

  return (
    <Stack
      width="400px"
      margin="0 auto"
      gap="24px"
      my={5}
      py="80px"
      px={3}
      borderRadius={3}
      bgcolor={appBlack[800]}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        boxShadow:
          '3px 3px rgba(229, 57, 53, 0.6), 6px 6px rgba(229, 57, 53, 0.4), 9px 9px rgba(229, 57, 53, 0.2)',
      }}
    >
      <Typography align="center" variant="h4" color="primary">
        Login
      </Typography>
      <TextField
        label="Email"
        variant="standard"
        error={!!errors.email}
        helperText={errors.email?.message || ''}
        {...register('email')}
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
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message || ''}
        {...register('password')}
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
        <Button type="submit" variant="contained" sx={{ width: '150px', margin: '0 auto' }}>
          Login
        </Button>
        {Object.keys(message).length > 0 && message.message && (
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
  );
};

export default LoginPage;
