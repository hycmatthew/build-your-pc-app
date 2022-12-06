import React, { useState } from 'react'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { EMPTY_IMG_DATA } from '../../../constant/EmptyImage'

type ItemCardProps = {
  itemLabel: string
  priceLabel: string
  imgSrc: string
  addComparsion: () => void
}

const AddButton = styled(IconButton)({
  marginLeft: 'auto',
})

const PriceTypography = styled(Typography)({
  textAlign: 'left',
  fontSize: '11px',
  paddingLeft: 3,
})

const ItemCard = ({
  itemLabel,
  priceLabel,
  imgSrc,
  addComparsion,
}: ItemCardProps) => {
  return (
    <Grid key={itemLabel} item xs={3} style={{ display: 'flex' }}>
      <Card
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <CardHeader subheader={itemLabel} />
        <CardMedia
          component="img"
          image={imgSrc || EMPTY_IMG_DATA}
          alt={itemLabel}
        />
        <CardActions>
          <PriceTypography>{priceLabel}</PriceTypography>
          <AddButton onClick={addComparsion}>
            <AddRoundedIcon />
          </AddButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ItemCard
