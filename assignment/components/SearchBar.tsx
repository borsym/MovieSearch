import { Button, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useContext, useState } from 'react';
import { TitlesContext, TitlesContextType } from '../contexts/TitlesContext';

const SearchBar = () => {
  const { search } = useContext(TitlesContext) as TitlesContextType;
  const [title, setTitle] = useState<string>('');

  return (
    <Box>
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label="Search for a title..."
        id="fullWidth"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        onClick={() => {
          search(title);
        }}
        variant="contained"
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
