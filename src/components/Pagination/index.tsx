import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Pagination } from '@mui/material';

const PaginationAnime = (props: {
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}) => {
  const { totalPages, handlePageChange } = props;

  return (
    <Stack spacing={2} justifyContent="center" mt="32px">
      <Pagination
        count={totalPages}
        shape="rounded"
        color="primary"
        onChange={handlePageChange}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    </Stack>
  );
};

PaginationAnime.propTypes = {
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

PaginationAnime.defaultProps = {
  handlePageChange: null,
};

export default PaginationAnime;
