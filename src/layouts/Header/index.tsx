import React, { useState, useEffect, useRef, ChangeEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from 'components/Contexts';
import {
  Stack,
  Autocomplete,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Skeleton,
} from '@mui/material';
import { appBlack, appOrange, appRed } from 'constants/colors';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LoginIcon from '@mui/icons-material/Login';
import animeApi from 'api/animeApi';
import LogoAnimew from 'assets/logo-animew.png';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import Avatar from 'react-avatar';

interface IAnime {
  _id?: string;
  title: string;
}

const settings = [
  {
    title: 'Profile',
    icon: <SettingsIcon />,
  },
  {
    title: 'Change password',
    icon: <KeyIcon />,
  },
  {
    title: 'Logout',
    icon: <LogoutTwoToneIcon />,
  },
];

export const colorOptions: string[] = [
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'orange',
  'pink',
  'teal',
  'gray',
  'brown',
];

const Header = () => {
  const [animeSearch, setAnimeSearch] = useState<IAnime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserState, setIsUserState] = useState(false);
  const [params, setParams] = useState<IAnime>({ title: '' });
  const [inputValue, setInputValue] = useState('');
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const autocompleteRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent, id: string, title: string) => {
    navigate(
      `/anime/details/${title
        .toLocaleLowerCase()
        .replace(/ |: |- |\. /g, '-')
        .replace(/-{2,} |\.{2,} |:{2,}/g, '-')}`,
      {
        state: { id },
      },
    );
  };

  const { state, dispatch } = useContext(AppContext);
  const { username, avatar } = state.user || {};

  useEffect(() => {
    if (state && state.user) {
      setIsUserState(true);
    }
  }, [state]);

  const handleSearch = (event: ChangeEvent<{}>, value: string) => {
    clearTimeout(typingTimeoutRef.current);
    setInputValue(value);
    setParams((prevParams) => ({
      ...prevParams,
      title: value,
    }));
  };

  const handleSubmitSearch = (event: React.KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      setInputValue('');
      navigate(`/anime/search`, { state: { keyW: params.title, data: animeSearch } });
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleMenuItemClick = (title: string) => {
    if (title === 'Profile') navigate('/profile');
    if (title === 'Change password') navigate('/change-password');
    if (title === 'Logout') {
      localStorage.removeItem('token');

      dispatch({ type: 'CURRENT_USER', payload: null });
      navigate('/');
    }

    setAnchorElUser(null);
  };

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const data = await animeApi.getSearch(params);
        setAnimeSearch(data?.data.animes || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.title) {
      setIsLoading(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(loadAnime, 500);
    } else {
      setAnimeSearch([]);
    }
  }, [params]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap="32px"
      my="24px"
      pb="24px"
      borderBottom={`thick double ${appRed[900]}`}
    >
      <Link to="/">
        <img src={LogoAnimew} alt="" width="180" />
      </Link>
      <Autocomplete
        freeSolo
        sx={{ width: 500 }}
        ref={autocompleteRef}
        options={animeSearch}
        renderOption={(props, option) => (
          <li key={option._id || option.title} {...props}>
            <span onClick={(e) => handleClick(e, option._id || '', option.title)}>
              {option.title}
            </span>
          </li>
        )}
        loading={isLoading}
        inputValue={inputValue}
        onInputChange={handleSearch}
        onKeyDown={handleSubmitSearch}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          return option.title;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Anime"
            variant="filled"
            sx={{
              '& .MuiInputBase-root': {
                bgcolor: appBlack[800],
                borderTopRightRadius: '48px',

                '&:hover': {
                  bgcolor: 'rgba(229, 57, 53, 0.1)',
                },
              },
              '& .MuiAutocomplete-clearIndicator': {
                color: appBlack[100],
              },
              '& .MuiFormLabel-root': {
                color: appBlack[100],

                '&.Mui-focused': {
                  color: appRed[600],
                },
              },
            }}
          />
        )}
        PaperComponent={({ children }) => (
          <Paper
            sx={{
              '& .MuiAutocomplete-listbox': {
                bgcolor: appBlack[800],
                '& .MuiAutocomplete-option:hover': {
                  bgcolor: 'rgba(229, 57, 53, 0.2)',
                },
              },
            }}
          >
            {children}
          </Paper>
        )}
      />
      <Stack gap="16px" direction="row">
        <Button
          variant="outlined"
          sx={{
            minWidth: 0,
            padding: '5px 7.2px',
            borderRadius: '8px',
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          }}
        >
          <MenuIcon />
        </Button>
        <Tooltip title="History">
          <Button
            variant="outlined"
            component={Link}
            to="/history"
            sx={{
              minWidth: 0,
              padding: '5px 7.2px',
              borderRadius: '8px',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            <HistoryIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Watch list">
          <Button
            variant="outlined"
            sx={{
              minWidth: 0,
              padding: '5px 7.2px',
              borderRadius: '8px',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            <BookmarksIcon />
          </Button>
        </Tooltip>
        {state.user ? (
          <>
            {isUserState ? (
              <Toolbar disableGutters sx={{ minHeight: '0 !important' }}>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        src={!!avatar ? avatar : ''}
                        name={username}
                        size="40px"
                        round={true}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: '45px',
                      '& .MuiPaper-root': { minWidth: '250px', bgcolor: appBlack[800] },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Stack direction="row" p="16px" gap="8px" alignItems="center">
                      <Avatar
                        src={avatar ? avatar : ''}
                        name={username}
                        size="40px"
                        round={true}
                        textSizeRatio={2}
                      />
                      <Typography
                        variant="body1"
                        fontWeight="700"
                        textAlign="center"
                        color={appOrange[600]}
                      >
                        {username}
                      </Typography>
                    </Stack>
                    {settings.map(({ title, icon }) => (
                      <MenuItem
                        key={title}
                        onClick={() => handleMenuItemClick(title)}
                        sx={{ display: 'flex', gap: '8px' }}
                      >
                        {icon}
                        <Typography textAlign="center">{title}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            ) : (
              <Skeleton animation="wave" variant="circular" width="40px" height="40px" />
            )}
          </>
        ) : (
          <Button
            variant="outlined"
            component={Link}
            to="/login"
            sx={{
              minWidth: 0,
              padding: '5px 7.2px',
              borderRadius: '8px',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            <LoginIcon />
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
