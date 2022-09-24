import Link from 'next/link';
import React from 'react';

import {
  Card,
  CardActions,
  CardMedia,
  CardActionArea,
  Button,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const TheNewMediaCard = (props: any) => {
  const imgUrl = props.data.primaryImage
    ? props.data.primaryImage.url
    : 'https://i.picsum.photos/id/504/536/354.jpg?hmac=zZqkNcPlphLOPXp316SfRWkNFXoyGEh2elLvfSptGcQ';
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
