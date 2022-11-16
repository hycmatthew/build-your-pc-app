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
  selectRAMLogic,
} from '../../../logic/SelectComponent'
import selectSSDLogic from '../../../logic/SelectComponent/selectSSDLogic'
import selectPSULogic from '../../../logic/SelectComponent/selectPSULogic'

type ResultComponentProps = {
  logicState: BuildLogicState
  rawData: DataState
}

function ResultComponent({ logicState, rawData }: ResultComponentProps) {
  const dispatch = useAppDispatch()

  const getResult = () => {
    const selectCPU = selectCPULogic(logicState, rawData.cpuList)
    dispatch(sliceActions.updatePreSelectedCPU(selectCPU))
    const selectMotherboard = selectMotherboardLogic(
      logicState,
      rawData.motherboardList
    )
    dispatch(sliceActions.updatePreSelectedMotherboard(selectMotherboard))
    const selectRAM = selectRAMLogic(logicState, rawData.ramList)
    dispatch(sliceActions.updatePreSelectedRAM(selectRAM))
    const selectSSD = selectSSDLogic(logicState, rawData.ssdList)
    dispatch(sliceActions.updatePreSelectedSSD(selectSSD))
    const selectPSU = selectPSULogic(logicState, rawData.psuList)
    dispatch(sliceActions.updatePreSelectedSSD(selectPSU))
  }

  useEffect(() => {
    getResult()
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
        {logicState.preSelectedItem.ram && (
          <SelectedItemCard
            name={logicState.preSelectedItem.ram?.model}
            price={logicState.preSelectedItem.ram?.priceHK.toString()}
            img={logicState.preSelectedItem.ram?.img}
          />
        )}
        {logicState.preSelectedItem.ssd && (
          <SelectedItemCard
            name={logicState.preSelectedItem.ssd?.model}
            price={logicState.preSelectedItem.ssd?.priceHK.toString()}
            img={logicState.preSelectedItem.ssd?.img}
          />
        )}
        {logicState.preSelectedItem.psu && (
          <SelectedItemCard
            name={logicState.preSelectedItem.psu?.model}
            price={logicState.preSelectedItem.psu?.priceHK.toString()}
            img={logicState.preSelectedItem.psu?.img}
          />
        )}
      </Grid>
    </Card>
  )
}

export default ResultComponent
