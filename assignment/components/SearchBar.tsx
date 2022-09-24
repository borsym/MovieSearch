import { Button, IconButton, TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useContext, useState } from 'react';
import { TitlesContext, TitlesContextType } from '../contexts/TitlesContext';
import { GenreContextType, GenresContext } from '../contexts/GenresContext';

const SearchBar = () => {
  const { search } = useContext(TitlesContext) as TitlesContextType;
  const { genres } = useContext(GenresContext) as GenreContextType;
  const [title, setTitle] = useState<string>('');

  return (
    <Box sx={{ px: 8, pt: 5, pb: 2, display: 'flex' }}>
      <TextField
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            search(title, genres);
          }
        }}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label="Search for a title..."
        id="fullWidth"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon
                  onClick={() => {
                    search(title, genres);
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
