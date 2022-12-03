import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Modal,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { ComparisonObject, ComparisonSubItem } from '../data/ComparisonObject'

type ComparisonModalProp = {
  comparisonObjects: ComparisonObject[]
  isOpen: boolean
  handleClose: () => void
  handleRemove: (name: string) => void
}

type ComparisonTypographyProps = {
  item: ComparisonSubItem
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: '65%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const boxStyle = {
  textAlign: 'center',
  height: '60px',
  borderTop: 1,
  borderColor: '#d9d9d9'
}

const topTypographyStyle = {
  fontSize: '9px',
  color: '#808080',
  verticalAlign: 'top',
  paddingTop: '4px'
}

const mainpTypographyStyle = {
  fontSize: '15px',
}

function ComparisonTypography({ item }: ComparisonTypographyProps) {
  const { t } = useTranslation()
  const { label, value, isHighlight } = item
  return (
    <Grid item xs={12}>
      <Box sx={boxStyle}>
        <Typography sx={topTypographyStyle}>{t(label)}</Typography>
        <Typography
          sx={mainpTypographyStyle}
          color={isHighlight ? '#00b359' : '#000'}
        >
          {value}
        </Typography>
      </Box>
    </Grid>
  )
}

const comparisonGrid = (comparisonObject: ComparisonObject, handleRemove: (name: string) => void) => {
  return (
    <Grid key={comparisonObject.name} item xs={3} height="100%">
      <Button onClick={() => handleRemove(comparisonObject.name)}>Remove</Button>
      <CardMedia
        component="img"
        height="140"
        image={comparisonObject.img}
        alt={comparisonObject.name}
      />
      <Typography gutterBottom component="div">
        {comparisonObject.name}
      </Typography>
      <CardContent>
        <Grid container direction="row" spacing={2} alignItems="stretch">
          {comparisonObject.items.map((item) => (
            <ComparisonTypography item={item} />
          ))}
        </Grid>
      </CardContent>
    </Grid>
  )
}

const ComparisonModal = ({
  comparisonObjects,
  isOpen,
  handleClose,
  handleRemove,
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
          {comparisonObjects.map((element) => comparisonGrid(element, handleRemove))}
        </Grid>
      </Box>
    </Modal>
  )
}

export default ComparisonModal
