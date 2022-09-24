import { Grid, Rating, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';

import React from 'react';
import { options } from '../constans';
import Link from 'next/link';

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const response = await fetch(
    `https://moviesdatabase.p.rapidapi.com/titles/${id}?info=base_info`,
    options
  );
  const data = await response.json();

  return {
    props: { details: data },
  };
};

const Details = (props: any) => {
  const details = props.details?.results;
  const imgUrl = details.primaryImage
    ? details.primaryImage.url
    : 'https://i.picsum.photos/id/504/536/354.jpg?hmac=zZqkNcPlphLOPXp316SfRWkNFXoyGEh2elLvfSptGcQ';

  const alt = details.primaryImage?.caption
    ? details.primaryImage.caption.plainText
    : 'Image';
  const description = details.plot?.plotText?.plainText;
  //https://hu.pinterest.com/pin/421649583858383060/
  return (
    <Grid container spacing={0} sx={{ p: 10 }}>
      <Grid container item xs={12} md={6}>
        <Box
          component="img"
          sx={{
            height: 500,
            width: 500,
            maxHeight: { xs: 500, md: 500 },
            maxWidth: { xs: 500, md: 500 },
          }}
          alt={alt}
          src={imgUrl}
        />
      </Grid>
      <Grid container item xs={12} md={6} direction="column">
        <Box sx={{ width: '100%' }}>
          <Typography variant="h3" align="left" sx={{ p: 0, m: 0 }}>
            {details.titleText?.text}
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="overline"
            display="block"
            align="left"
            sx={{ ml: 1 }}
          >
            {details.plot?.language?.id} / {details.titleType?.text} /{' '}
            {details.releaseYear?.year}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', align: 'left', ml: 1 }}>
          <Typography sx={{ mr: 0.5, fontWeight: 'bold', color: '#FAAF00' }}>
            {details.ratingsSummary?.aggregateRating}{' '}
          </Typography>
          <Rating
            name="read-only"
            value={Math.round(details.ratingsSummary?.aggregateRating) / 2}
            readOnly
          />
        </Box>
        <Box>
          <Typography
            sx={{ ml: 1, opacity: 0.6, lineHeight: 1.9, fontSize: 14 }}
            variant="overline"
            align="left"
          >
            {details.genres?.genres.map((genre: any, idx: number) => {
              return details.genres?.genres.length !== idx + 1
                ? genre.text + ' / '
                : genre.text;
            })}
          </Typography>
        </Box>
        <Box sx={{ pt: 8, ml: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            synopsis
          </Typography>
          <Typography gutterBottom paragraph component="div">
            {description ? description : 'No documentation'}
          </Typography>
        </Box>
      </Grid>
      <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Box>
          <Link href="/">
            <Button variant="contained" color="info">
              Main Page
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Details;
