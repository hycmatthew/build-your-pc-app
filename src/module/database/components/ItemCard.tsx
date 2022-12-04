import React, { useState } from 'react'
import {
  Button,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'
import { EMPTY_IMG_DATA } from '../../../constant/EmptyImage'

const style = {
  textAlign: 'center'
}

type ItemCardProps = {
  itemLabel: string
  imgSrc: string
  addComparsion: () => void
}

const ItemCard = ({ itemLabel, imgSrc, addComparsion }: ItemCardProps) => {
  return (
    <Grid sx={style} key={itemLabel} item xs={3}>
      <CardMedia component="img" image={imgSrc || EMPTY_IMG_DATA} alt={itemLabel} />
      <CardContent>
        <Typography gutterBottom component="div">
          {itemLabel}
        </Typography>
        <Button size="small" onClick={addComparsion}>
          Compare
        </Button>
      </CardContent>
    </Grid>
  )
}

export default ItemCard
