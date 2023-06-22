import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Stack, Typography } from '@mui/material';
import { colorOptions } from 'layouts/Header';
import { appBlack, appBlue, appRed } from 'constants/colors';
import Avatar from 'react-avatar';

const CommentItem = (props: {
  avatar: string;
  content: string;
  createdAt: string;
  level: number;
  username: string;
}) => {
  const { avatar, content, createdAt, level, username } = props;

  const date = new Date(createdAt);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - date.getTime();
  const minutesDifference = Math.floor(timeDifference / 1000 / 60);

  let timeString = '';
  let months = 0;
  let years = 0;

  if (minutesDifference < 60) {
    timeString = `${minutesDifference} minute`;
  } else if (minutesDifference < 1440) {
    const hoursDifference = Math.floor(minutesDifference / 60);
    timeString = `${hoursDifference} hour`;
  } else if (minutesDifference < 43200) {
    const daysDifference = Math.floor(minutesDifference / 60 / 24);
    timeString = `${daysDifference} day`;
  } else {
    const monthsDifference = Math.floor(minutesDifference / 60 / 24 / 30);
    if (monthsDifference < 12) {
      months = monthsDifference;
      timeString = `${months} month`;
    } else {
      years = Math.floor(monthsDifference / 12);
      timeString = `${years} year`;
    }
  }

  return (
    <Stack bgcolor={appBlack[900]} p="8px" borderRadius="10px" direction="row" gap="8px">
      <Avatar
        src={avatar ? avatar : ''}
        name={username}
        size="50px"
        style={{
          display: 'flex',
          borderRadius: '10px',
          overflow: 'hidden',
          border: `3px solid ${appBlack[700]}`,
        }}
      />
      <Stack>
        <Stack direction="row" gap="4px">
          <Typography variant="body2" fontWeight="700" color={appBlue[600]}>
            {username}
          </Typography>
          <Typography variant="caption" fontWeight="700" color={appRed[800]}>
            Lv.{level}
          </Typography>
        </Stack>

        <Typography variant="body2" color={appBlack[100]}>
          {content}
        </Typography>

        <Typography
          variant="body2"
          color={appBlack[500]}
          component={Stack}
          direction="row"
          gap="4px"
        >
          <Typography
            variant="caption"
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Reply
          </Typography>
          <Typography variant="caption">{timeString} ago</Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

CommentItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default CommentItem;
