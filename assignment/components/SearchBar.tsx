import { Button, IconButton, TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import React, { useContext, useState, useRef } from 'react';
import { TitlesContext, TitlesContextType } from '../contexts/TitlesContext';
import { GenreContextType, GenresContext } from '../contexts/GenresContext';

const SearchBar = () => {
  const { search } = useContext(TitlesContext) as TitlesContextType;
  const { genres } = useContext(GenresContext) as GenreContextType;
  const [title, setTitle] = useState<string>('');
  const textInput = useRef<React.MutableRefObject<null>>(null);

  return (
    <Box sx={{ px: 8, pt: 5, pb: 2, display: 'flex' }}>
      <TextField
        inputRef={textInput}
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
            <>
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon
                    onClick={() => {
                      search(title, genres);
                    }}
                  />
                </IconButton>
              </InputAdornment>
            </>
          ),
          endAdornment: (
            <>
              <Divider sx={{ height: 35, m: 0.5 }} orientation="vertical" />
              <InputAdornment position="end">
                <IconButton>
                  <ClearIcon
                    onClick={() => {
                      setTitle('');
                      textInput.current.value = '';
                    }}
                  />
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
