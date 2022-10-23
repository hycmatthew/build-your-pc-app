import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'

import AppLayout from '../../common/AppLayout'
import BudgetComponent from '../components/BudgetComponent'
import UsageComponent from '../components/UsageComponent'
import SpecificComponent from '../components/SpecificComponent'
import {
  AIOType,
  AirCoolerType,
  CaseType,
  CPUType,
  GPUType,
  MotherboardType,
  PSUType,
  SSDType,
  RAMType,
} from '../../../constant/objectTypes'
import ResultComponent from '../components/ResultComponent'

function AILogicPage() {
  const dataState = useSelector((state: any) => {
    return state
  })

  const [step, setStep] = useState(0)

  const updateStep = (newStep: number) => {
    setStep(newStep)
  }

  return (
    <AppLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BudgetComponent currectStep={step} updateStep={updateStep} />
        </Grid>
        <Grid item xs={12} sx={{ display: step > 0 ? 'block' : 'none' }}>
          <UsageComponent currectStep={step} updateStep={updateStep} />
        </Grid>
        <Grid item xs={12} sx={{ display: step > 1 ? 'block' : 'none' }}>
          <SpecificComponent
            rawData={dataState.rawData}
            currectStep={step}
            updateStep={updateStep}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: step > 2 ? 'block' : 'none' }}>
          <ResultComponent
            logicState={dataState.aiLogic}
            rawData={dataState.rawData}
            currectStep={step}
            updateStep={updateStep}
          />
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default AILogicPage
