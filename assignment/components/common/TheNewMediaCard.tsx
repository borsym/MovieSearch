import Link from 'next/link';
import React, { useContext } from 'react';

import { TitlesContext, TitlesContextType } from '../../contexts/TitlesContext';

import {
  Card,
  CardActions,
  CardMedia,
  CardActionArea,
  Button,
  IconButton,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/system';

const TheNewMediaCard = (props: any) => {
  const { titles, favourites, updateTiltes, updateFavourites } = useContext(
    TitlesContext
  ) as TitlesContextType;

  const imgUrl = props.data.primaryImage
    ? props.data.primaryImage.url
    : 'not-found.png';
  const year = props.data?.releaseYear?.year
    ? props.data?.releaseYear?.year
    : 'No data';
  const titleType = props.data?.titleType?.text
    ? props.data?.titleType?.text
    : 'No title type';
  const alt = props.data.primaryImage?.caption
    ? props.data.primaryImage.caption.plainText
    : 'Image';
  const runTime = parseInt(props.data?.runtime?.seconds)
    ? `${parseInt(props.data?.runtime?.seconds) / 60} min`
    : 'Not available';
  const rating = props.data?.ratingsSummary?.aggregateRating
    ? `${props.data?.ratingsSummary?.aggregateRating}/10`
    : 'No data';

  const onClickFavourite = () => {
    // meg majd reorderelni kene
    const copiedMovies = Array.from(titles);
    const copiedFavourites = Array.from(favourites);

    if (props.droppableId !== 'movies') {
      const index = copiedFavourites.findIndex((object) => {
        return object.id === props.data.id;
      });
      copiedFavourites.splice(index, 1);
      copiedMovies.splice(index, 0, props.data);
    } else {
      const index = copiedMovies.findIndex((object) => {
        return object.id === props.data.id;
      });
      copiedMovies.splice(index, 1);
      copiedFavourites.splice(index, 0, props.data);
    }

    updateTiltes(copiedMovies);
    updateFavourites(copiedFavourites);
  };
  return (
    <Card sx={{ maxWidth: 400 }}>
      <Box>
        <Box>
          <CardMedia component="img" height="200" image={imgUrl} alt={alt} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">{props.data?.titleText?.text}</Typography>
          <Typography variant="h5">{rating}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption">Release Year</Typography>
          <Typography variant="caption">{year}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption">Title Type</Typography>
          <Typography variant="caption">{titleType}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption">Running time</Typography>
          <Typography variant="caption">{runTime}</Typography>
        </Box>
        <Box>
          <IconButton aria-label="add to favorites" onClick={onClickFavourite}>
            <FavoriteIcon
              style={{ color: props.droppableId !== 'movies' ? 'red' : '' }}
            />
          </IconButton>
          <Link href={'/' + props.data.id}>
            <CardActionArea>
              <CardActions
                sx={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <Box>Learn More</Box>
              </CardActions>
            </CardActionArea>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default TheNewMediaCard;
