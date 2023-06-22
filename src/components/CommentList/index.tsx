import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Skeleton, Stack, TextareaAutosize, Typography } from '@mui/material';
import { appBlack, appOrange, appRed } from 'constants/colors';
import { AppContext } from 'components/Contexts';
import styled from '@emotion/styled';
import CommentIcon from '@mui/icons-material/Comment';
import CommentItem from './CommentItem';
import commentApi from 'api/commentApi';
import { Link } from 'react-router-dom';

const StyledTextarea = styled(TextareaAutosize)(
  () => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 10px 10px 0 10px;
    background: ${appBlack[900]};
    color: ${appBlack[0]};
    border: 1px solid ${appRed[600]};
    resize: none;
    box-shadow: 0px 2px 5px ${appBlack[900]};
    transition: 0.2s

    &:hover {
      border-color: ${appRed[900]};
    }
  
    &:focus {
      border-color: ${appRed[900]};
      box-shadow: 0 0 0 3px ${appRed[900]};
    }
  
    &:focus-visible {
      outline: 0;
    }
`,
);

const CommentList = (props: { animeId: string }) => {
  const { animeId } = props;

  console.log(animeId);

  const { state } = useContext(AppContext);
  const { user } = state;

  const [commentInput, setCommentInput] = useState({ animeId, content: '' });
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput({ ...commentInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await commentApi.createComment(commentInput);
      const res = await commentApi.getComments(commentInput.animeId);

      setComments(res.data.comments);
      setCommentInput((prev) => ({ ...prev, content: '' }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadingComment = async () => {
      try {
        const res = await commentApi.getComments(commentInput.animeId);

        setComments(res.data.comments);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    loadingComment();
  }, [commentInput.animeId]);

  return (
    <Stack mt="16px" p="14px" borderRadius="10px" bgcolor={appBlack[800]} gap="16px">
      <Typography
        fontWeight="700"
        color={appOrange[500]}
        component={Stack}
        direction="row"
        alignItems="center"
        gap="8px"
      >
        <CommentIcon /> Comments ({comments ? comments.length : 0})
      </Typography>
      {user ? (
        <Stack>
          <Stack>
            <StyledTextarea
              minRows={4}
              maxRows={4}
              placeholder="Enter comment here ..."
              name="content"
              value={commentInput.content}
              onChange={handleOnChange}
            />
          </Stack>
          <Box mt="16px" textAlign="end">
            <Button
              variant="contained"
              sx={{ width: 'fit-content', textTransform: 'capitalize' }}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </Box>
        </Stack>
      ) : (
        <Box textAlign="center">
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{ width: 'fit-content', textTransform: 'capitalize' }}
          >
            Login to Comments
          </Button>
        </Box>
      )}

      <Stack gap="8px">
        {comments.map(
          ({
            _id,
            content,
            createdAt,
            author,
          }: {
            _id: string;
            content: string;
            createdAt: string;
            author: {
              username: string;
              profile: {
                level: number;
                avatar: string;
              };
            };
          }) => {
            const username = author ? author.username : 'Anonymous';
            const level = author ? author?.profile?.level : NaN;
            const avatar = author?.profile?.avatar || '';

            return isLoading ? (
              <CommentItem
                key={_id}
                avatar={avatar}
                content={content}
                createdAt={createdAt}
                username={username}
                level={level}
              />
            ) : (
              <Skeleton variant="rectangular" width="100%" height={70} animation="wave" />
            );
          },
        )}
      </Stack>
    </Stack>
  );
};

CommentList.propTypes = {
  animeId: PropTypes.string.isRequired,
};

export default CommentList;
