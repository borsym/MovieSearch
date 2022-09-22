import { Grid, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { options } from '../constans';

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
    <Grid container spacing={2}>
      <Grid
        container
        item
        xs={12}
        md={6}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
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
          <Typography variant="h3" align="center">
            {details.titleText?.text}
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant="overline" display="block" align="center">
            {details.plot.language?.id} / {details.titleType?.text} /{' '}
            {details.releaseYear?.year}
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          Stars
          <Rating
            name="read-only"
            value={Math.round(details.ratingsSummary?.aggregateRating) / 2}
            readOnly
          />
          {details.ratingsSummary?.aggregateRating}
        </Box>
        <Box>
          <Typography>
            {details.genres?.genres.map((genre: any) => genre.text + '/')}
          </Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="h6" component="div">
            {description ? description : 'No documentation'}
          </Typography>
        </Box>
        {/* <Grid>Ratings/ language</Grid>
          <Grid>Genreken vegig menni es / jelekkel kiirni</Grid>
          <Grid>relase/ language</Grid>
          <Grid>Title type tv series vagy movie</Grid>
          <Grid>long description</Grid> */}
      </Grid>
    </Grid>
  );
};

export default Details;
