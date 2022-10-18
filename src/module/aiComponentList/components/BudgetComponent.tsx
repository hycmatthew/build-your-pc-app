import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Button,
} from '@mui/material'

type BudgetComponentProps = {
  currectStep: number
  updateStep: (newStep: number) => void
}

function BudgetComponent({ currectStep, updateStep }: BudgetComponentProps) {
  const submitButtonOnClick = () => {}

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Budget
        </Typography>
        <TextField label="Budget" variant="outlined" type="number" />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default BudgetComponent
