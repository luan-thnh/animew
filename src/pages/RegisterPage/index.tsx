import React, { useState, useContext } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import authAPI from 'api/authApi';
import Banner from 'components/Banner';
import { appBlack, appRed } from 'constants/colors';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from 'components/Contexts';

interface IUserInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  // document.body.style.overflow = 'hidden';
  document.title = `Register || AnimeW`;

  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState<IUserInput>({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await authAPI.register(userInput);

      console.log(res);

      const { token, username } = res.data;

      localStorage.setItem('token', JSON.stringify(token));

      dispatch({ type: 'CURRENT_USER', payload: { username } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Banner title="Register" />
      <Stack width="400px" margin="0 auto" gap="24px" py="80px">
        <TextField
          label="Username"
          name="username"
          variant="standard"
          value={userInput.username}
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
        <TextField
          label="Email"
          name="email"
          variant="standard"
          value={userInput.email}
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
          <Typography color={appBlack[100]}>Already have an account ?</Typography>{' '}
          <Typography
            component={Link}
            to="/login"
            sx={{ color: appRed[600], '&:hover': { textDecoration: 'underline' } }}
          >
            Login
          </Typography>
        </Stack>

        <Stack>
          <Button
            variant="contained"
            sx={{ width: '150px', margin: '0 auto' }}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default RegisterPage;
