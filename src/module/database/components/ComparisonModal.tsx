import React from 'react'
import {
  Modal,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material'
import { generateItemName } from '../../../utils/LabelHelper'
import { ComparisonObject } from '../data/ComparisonObject'

interface ComparisonModalProp {
  comparisonObjects: ComparisonObject[]
  isOpen: boolean
  handleClose: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const comparisonGrid = (comparisonObject: ComparisonObject) => {
  return (
    <Grid key={comparisonObject.name} item xs={3}>
      <CardMedia
        component="img"
        height="140"
        image={comparisonObject.img}
        alt={comparisonObject.name}
      />
      <CardContent>
        {comparisonObject.items.map((item) => (
          <Typography gutterBottom component="div">
            {comparisonObject.name}
          </Typography>
        ))}
      </CardContent>
    </Grid>
  )
}

const ComparisonModal = ({
  comparisonObjects,
  isOpen,
  handleClose,
}: ComparisonModalProp) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={style}>
        <Grid container justifyContent="center" spacing={2}>
          {comparisonObjects.map((element) => comparisonGrid(element))}
        </Grid>
      </Box>
    </Modal>
  )
}

export default ComparisonModal
