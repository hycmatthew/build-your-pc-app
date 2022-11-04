import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from '@mui/material'

type SelectedItemCardProps = {
  name: string
  price: string
  img: string
}

function SelectedItemCard({ name, price, img }: SelectedItemCardProps) {
  return (
    <Grid item xs={6} md={4}>
      <Card>
        <CardMedia component="img" height="auto" image={img} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default SelectedItemCard
