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
import { aiLogicSlice, BuildLogicState } from '../store/aiLogicReducer'
import { DataState } from '../../store/rawDataReducer'
import SelectedItemCard from './SelectedItemCard'

type ResultComponentProps = {
  logicState: BuildLogicState
  rawData: DataState
  currectStep: number
  updateStep: (newStep: number) => void
}

function ResultComponent({
  logicState,
  rawData,
  currectStep,
  updateStep,
}: ResultComponentProps) {
  const dispatch = useAppDispatch()

  const submitButtonOnClick = () => {
    if (currectStep === 0) {
      updateStep(1)
    }
  }

  const buildLogic = () => {}

  return (
    <Card sx={{ minWidth: 275 }}>
      <SelectedItemCard />
      <SelectedItemCard />
      <SelectedItemCard />
      <SelectedItemCard />
    </Card>
  )
}

export default ResultComponent
