import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Button,
} from '@mui/material'
import { current } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../store/store'

type BudgetComponentProps = {
  currectStep: number
  updateStep: (newStep: number) => void
}

function BudgetComponent({ currectStep, updateStep }: BudgetComponentProps) {
  const dispatch = useAppDispatch()
  const [budget, setBudget] = useState(0)

  const submitButtonOnClick = () => {
    if (currectStep === 0) {
      updateStep(1)
    }
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Budget
        </Typography>
        <TextField label="Budget" variant="outlined" type="number" />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={submitButtonOnClick}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default BudgetComponent
