import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Button,
  Grid,
} from '@mui/material'
import { useAppDispatch } from '../../store/store'
import {
  aiLogicSlice,
  sliceActions,
  BuildLogicState,
} from '../store/aiLogicReducer'
import { DataState } from '../../store/rawDataReducer'
import SelectedItemCard from './SelectedItemCard'
import {
  selectCPULogic,
  selectMotherboardLogic,
} from '../../../logic/selectComponentLogic'

type ResultComponentProps = {
  logicState: BuildLogicState
  rawData: DataState
}

function ResultComponent({ logicState, rawData }: ResultComponentProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const selectCPU = selectCPULogic(logicState, rawData.cpuList)
    dispatch(sliceActions.updatePreSelectedCPU(selectCPU))
    const selectMotherboard = selectMotherboardLogic(
      logicState,
      rawData.motherboardList
    )
    dispatch(sliceActions.updatePreSelectedMotherboard(selectMotherboard))
    console.log(selectCPU)
    console.log(selectMotherboard)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card sx={{ minWidth: 275, padding: 2 }}>
      <Grid container spacing={1}>
        {logicState.preSelectedItem.cpu && (
          <SelectedItemCard
            name={logicState.preSelectedItem.cpu?.name}
            price={logicState.preSelectedItem.cpu?.priceHK.toString()}
            img={logicState.preSelectedItem.cpu?.img}
          />
        )}
        {logicState.preSelectedItem.motherboard && (
          <SelectedItemCard
            name={logicState.preSelectedItem.motherboard?.model}
            price={logicState.preSelectedItem.motherboard?.priceHK.toString()}
            img={logicState.preSelectedItem.motherboard?.img}
          />
        )}
        {logicState.preSelectedItem.motherboard && (
          <SelectedItemCard
            name={logicState.preSelectedItem.motherboard?.model}
            price={logicState.preSelectedItem.motherboard?.priceHK.toString()}
            img={logicState.preSelectedItem.motherboard?.img}
          />
        )}
      </Grid>
    </Card>
  )
}

export default ResultComponent
