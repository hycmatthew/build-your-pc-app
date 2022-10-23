import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Button,
} from '@mui/material'
import { useAppDispatch } from '../../store/store'
import { aiLogicSlice } from '../store/aiLogicReducer'

type UsageComponentProps = {
  currectStep: number
  updateStep: (newStep: number) => void
}

function UsageComponent({ currectStep, updateStep }: UsageComponentProps) {
  const dispatch = useAppDispatch()
  const [buildUsage, setBuildUsage] = useState(100)

  const submitButtonOnClick = () => {
    dispatch(aiLogicSlice.actions.updateBuildUsage(buildUsage))

    if (currectStep === 1) {
      updateStep(2)
    }
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Button size="small">Learn More</Button>
        <Button size="small">Learn More</Button>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={submitButtonOnClick}>Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default UsageComponent
