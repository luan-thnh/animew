import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';
import PropTypes from 'prop-types';
import profileApi from 'api/profileApi';
import { AppContext } from 'components/Contexts';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { appBlack, appRed } from 'constants/colors';
import Avatar from 'react-avatar';
import { colorOptions } from 'layouts/Header';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

interface IProfile {
  avatar?: string;
  fullName: string;
  age: number;
  address: string;
  description: string;
  level: number;
  author?: {
    email: string;
  };
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { state, dispatch } = useContext(AppContext);

  const username = state.user?.username;
  const avatar = state.user?.avatar;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    description: '',
    level: 0,
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await profileApi.getProfile();
        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const updateAvatar = async () => {
      if (!fileUrl) return;

      try {
        const res = await profileApi.updateAvatar({ avatar: fileUrl });
        const { avatar } = res.data.profile;

        dispatch({ type: 'CURRENT_USER', payload: { ...state.user, avatar } });
      } catch (error) {
        console.error(error);
      }
    };

    updateAvatar();
  }, [dispatch, fileUrl, state.user]);

  useEffect(() => {
    if (!profile) return;

    const { fullName, author, address, description, level } = profile;

    setFormData((prevFormData) => ({
      ...prevFormData,
      fullName,
      email: author?.email || '',
      address,
      description,
      level,
    }));
  }, [username, profile]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdateAvatar = async (e: React.MouseEvent) => {
    e.preventDefault();

    const file = fileInputRef.current?.files?.[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        setFileUrl(fileReader.result as string);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await profileApi.updateProfile(formData);
      setProfile(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack alignItems="start" p="16px 0" direction="row">
      <Typography flex="1" variant="h4" fontWeight="600" letterSpacing="2px">
        <span style={{ textShadow: `1px 1px ${appRed[600]}` }}>Pro</span>
        <span style={{ color: appRed[500], textShadow: `1px 1px ${appBlack[400]}` }}>file</span>
      </Typography>
      <Stack flex="2" alignItems="start">
        <Stack display="inline-flex" justifyContent="center">
          <Stack marginBottom="18px">
            <Stack direction="row" alignItems="center" gap="32px">
              <Box
                sx={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  outline: `1px dashed ${appRed[600]}`,
                  outlineOffset: '5px',
                  boxShadow: `0 2px ${appRed[800]}`,
                  position: 'relative',

                  '&::after': {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    content: "''",
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                    zIndex: 1,
                    opacity: 0,
                    visibility: 'hidden',
                    transition: '0.25s',
                  },

                  '&:hover': {
                    '.avatar__hover': {
                      top: '50%',
                      opacity: 1,
                      visibility: 'visible',
                    },

                    '&::after': {
                      opacity: 1,
                      visibility: 'visible',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    '.avatar__image img': {
                      objectFit: 'cover',
                    },
                  }}
                >
                  <Avatar
                    src={avatar || photoUrl}
                    name={username}
                    round={true}
                    size="100"
                    className="avatar__image"
                  />
                </Box>

                <Stack
                  component="label"
                  htmlFor="avatar"
                  className="avatar__hover"
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                  sx={{
                    position: 'absolute',
                    top: '80%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    opacity: 0,
                    visibility: 'hidden',
                    transition: '0.25s',
                  }}
                >
                  <CameraAltOutlinedIcon />
                  <Typography fontWeight="600">Select</Typography>
                </Stack>
              </Box>
              <Typography fontWeight="600">
                Lv. <span style={{ color: appRed[900] }}>{profile?.level}</span>
              </Typography>
            </Stack>
            <input
              type="file"
              id="avatar"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </Stack>
          <Button
            variant="contained"
            type="button"
            onClick={handleUpdateAvatar}
            sx={{ textTransform: 'capitalize', borderRadius: '10px', width: 'fit-content' }}
          >
            Change
          </Button>
        </Stack>

        <Stack bgcolor={appBlack[800]} width="70%" borderRadius="10px" p="16px" mt="32px" gap="8px">
          <Typography fontWeight="600" variant="body2" color={appRed[800]}>
            Nickname
          </Typography>
          <TextField
            variant="standard"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            sx={{
              maxWidth: '100%',
              '& .MuiInputBase-root:before': {
                borderBottom: '1px solid rgba(0, 0, 0, 0)',
              },
            }}
          />
        </Stack>

        <Stack bgcolor={appBlack[800]} width="70%" borderRadius="10px" p="16px" mt="16px" gap="8px">
          <Typography fontWeight="600" variant="body2" color={appRed[800]}>
            Email
          </Typography>
          <TextField
            variant="standard"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              maxWidth: '100%',
              '& .MuiInputBase-root:before': {
                borderBottom: '1px solid rgba(0, 0, 0, 0)',
              },
            }}
          />
        </Stack>

        <Stack bgcolor={appBlack[800]} width="70%" borderRadius="10px" p="16px" mt="16px" gap="8px">
          <Typography fontWeight="600" variant="body2" color={appRed[800]}>
            Maxim
          </Typography>
          <TextField
            variant="standard"
            name="description"
            value={formData.description}
            onChange={handleChange}
            sx={{
              maxWidth: '100%',
              '& .MuiInputBase-root:before': {
                borderBottom: '1px solid rgba(0, 0, 0, 0)',
              },
            }}
          />
        </Stack>

        <Stack bgcolor={appBlack[800]} width="70%" borderRadius="10px" p="16px" mt="16px" gap="8px">
          <Typography fontWeight="600" variant="body2" color={appRed[800]}>
            Address
          </Typography>
          <TextField
            variant="standard"
            name="address"
            value={formData.address}
            onChange={handleChange}
            sx={{
              maxWidth: '100%',
              '& .MuiInputBase-root:before': {
                borderBottom: '1px solid rgba(0, 0, 0, 0)',
              },
            }}
          />
        </Stack>

        <Button
          variant="contained"
          type="button"
          onClick={handleSubmit}
          sx={{
            textTransform: 'capitalize',
            borderRadius: '10px',
            width: 'fit-content',
            mt: '16px',
          }}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
