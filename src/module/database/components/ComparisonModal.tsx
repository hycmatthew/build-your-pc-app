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
import ClearIcon from '@mui/icons-material/Clear';
import { ComparisonObject, ComparisonSubItem } from '../data/ComparisonObject'
import { EMPTY_IMG_DATA } from '../../../constant/EmptyImage';

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
  bgcolor: 'background.paper',
  boxShadow: 24,
  textAlign: 'center',
  borderRadius: 2,
  p: 3,
  width: 800
}

const boxStyle = {
  height: '60px',
  borderTop: 1,
  borderColor: '#d9d9d9'
}

const nameTypographyStyle = {
  fontSize: '14px',
  color: '#999',
  paddingTop: '4px'
}

const topTypographyStyle = {
  display: 'inline-block',
  fontSize: '9px',
  color: '#808080',
  verticalAlign: 'top',
  paddingTop: '4px'
}

const mainTypographyStyle = {
  fontSize: '15px',
}

function ComparisonTypography({ item }: ComparisonTypographyProps) {
  const { t } = useTranslation()
  const { label, value, isHighlight } = item
  return (
    <Grid item key={item.label} xs={12}>
      <Box sx={boxStyle}>
        <Typography sx={topTypographyStyle}>{t(label)}</Typography>
        <Typography
          sx={mainTypographyStyle}
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
      <CardMedia
        component="img"
        image={comparisonObject.img || EMPTY_IMG_DATA}
        alt={comparisonObject.name}
      />
      <Box sx={{ height: '40px' }} justifyContent="center">
        <Typography sx={nameTypographyStyle}>
          {comparisonObject.name}
        </Typography>
      </Box>
      <CardContent>
        <Grid container direction="row" spacing={2} alignItems="stretch">
          {comparisonObject.items.map((item) => (
            <ComparisonTypography item={item} />
          ))}
        </Grid>
      </CardContent>
      <Button startIcon={<ClearIcon />} color="error" variant="outlined" onClick={() => handleRemove(comparisonObject.model)}>Remove</Button>
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
        <Grid container justifyContent="center" spacing={3}>
          {comparisonObjects.map((element) => comparisonGrid(element, handleRemove))}
        </Grid>
      </Box>
    </Modal>
  )
}

export default ComparisonModal
