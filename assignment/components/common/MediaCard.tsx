import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from 'next/link';

const MediaCard = (props: any) => {
// a react-beautiful-dnd fele kartyakat kene csinalnom
  const imgUrl = props.data.primaryImage
    ? props.data.primaryImage.url
    : 'https://i.picsum.photos/id/504/536/354.jpg?hmac=zZqkNcPlphLOPXp316SfRWkNFXoyGEh2elLvfSptGcQ';
  const description = props.data.plot?.plotText?.plainText;
  const alt = props.data.primaryImage?.caption
    ? props.data.primaryImage.caption.plainText
    : 'Image';
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia component="img" height="140" image={imgUrl} alt={alt} /> */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {description ? description : 'No documentation'}
        </Typography>
      </CardContent>
      <CardActionArea>
        <CardActions>
          <Link href={'/' + props.data.id}>
            {/* ide id vagy valami ilyesmi */}
            <Button size="small">Learn More</Button>
          </Link>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default MediaCard;