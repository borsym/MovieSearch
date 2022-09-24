import React, { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { options } from '../constans';
import MultipleSelectChip from './common/MultipleSelectChip';
import { GenreContextType, GenresContext } from '../contexts/GenresContext';
import { Box } from '@mui/system';

const GenreReccomendations = () => {
  const urlGenres = new URL(
    'https://moviesdatabase.p.rapidapi.com/titles/utils/genres'
  );
  const { data, loading, error } = useFetch(urlGenres.toString(), options);

  const { genres, removeGenre, addGenre } = useContext(
    GenresContext
  ) as GenreContextType;

  return loading ? (
    <></>
  ) : (
    <MultipleSelectChip
      items={data?.results}
      loading={loading}
      context={genres}
      remove={removeGenre}
      add={addGenre}
      title="Genres"
    />
  );
};

export default GenreReccomendations;
