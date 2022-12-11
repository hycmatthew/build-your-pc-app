import React, { useEffect, useState } from 'react'
import { Box, Card, Grid } from '@mui/material'
import { useAppDispatch } from '../../store/store'
import { sliceActions, BuildLogicState } from '../store/aiLogicReducer'
import { DataState, SelectedItemType } from '../../store/rawDataReducer'
import ResultCard from './ResultCard'
import {
  selectCPULogic,
  selectGPULogic,
  selectMotherboardLogic,
  selectRAMLogic,
  selectSSDLogic,
  selectPSULogic
} from '../../../logic/SelectComponent'

type ResultComponentProps = {
  logicState: BuildLogicState
  rawData: DataState
}

function ResultComponent({ logicState, rawData }: ResultComponentProps) {
  const dispatch = useAppDispatch()
  const [result, setResult] = useState<SelectedItemType>(
    logicState.preSelectedItem
  )

  const getResult = () => {
    const selectCPU = logicState.preSelectedItem.cpu || selectCPULogic(logicState, rawData.cpuList)
    dispatch(sliceActions.updatePreSelectedCPU(selectCPU))
    const selectMotherboard = logicState.preSelectedItem.motherboard || selectMotherboardLogic(logicState, rawData.motherboardList)
    dispatch(sliceActions.updatePreSelectedMotherboard(selectMotherboard))
    const selectRAM = logicState.preSelectedItem.ram || selectRAMLogic(logicState, rawData.ramList)
    dispatch(sliceActions.updatePreSelectedRAM(selectRAM))
    const selectSSD = logicState.preSelectedItem.ssd || selectSSDLogic(logicState, rawData.ssdList)
    dispatch(sliceActions.updatePreSelectedSSD(selectSSD))
    const selectPSU = logicState.preSelectedItem.psu || selectPSULogic(logicState, rawData.psuList)
    dispatch(sliceActions.updatePreSelectedPSU(selectPSU))
    const selectGPU = logicState.preSelectedItem.gpu || selectGPULogic(logicState, rawData.gpuList)
    dispatch(sliceActions.updatePreSelectedGPU(selectGPU))
    setResult({
      ...result,
      cpu: selectCPU,
      motherboard: selectMotherboard,
      ram: selectRAM,
      ssd: selectSSD,
      psu: selectPSU,
      gpu: selectGPU
    })
  }

  useEffect(() => {
    getResult()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ paddingTop: 5 }}>
      <Grid container spacing={2} columns={{ xs: 6, md: 12 }}>
        {result.cpu && (
          <ResultCard
            nameLabel={result.cpu.name}
            priceLabel={result.cpu.priceHK.toString()}
            imgSrc={result.cpu.img}
          />
        )}
        {result.motherboard && (
          <ResultCard
            nameLabel={result.motherboard.model}
            priceLabel={result.motherboard.priceHK.toString()}
            imgSrc={result.motherboard.img}
          />
        )}
        {result.gpu && (
          <ResultCard
            nameLabel={result.gpu.model}
            priceLabel={result.gpu.priceHK.toString()}
            imgSrc={result.gpu.img}
          />
        )}
        {result.ram && (
          <ResultCard
            nameLabel={result.ram.model}
            priceLabel={result.ram.priceHK.toString()}
            imgSrc={result.ram.img}
          />
        )}
        {result.ssd && (
          <ResultCard
            nameLabel={result.ssd.model}
            priceLabel={result.ssd.priceHK.toString()}
            imgSrc={result.ssd.img}
          />
        )}
        {result.psu && (
          <ResultCard
            nameLabel={result.psu.model}
            priceLabel={result.psu.priceHK.toString()}
            imgSrc={result.psu.img}
          />
        )}
      </Grid>
    </Box>
  )
}

export default ResultComponent
