import React, { useState, useEffect } from 'react'
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
import { useSelector } from 'react-redux'

interface BuildLogicType {
  budget: number
  gamingUsage: number
  normalUsage: number
  preSelectedCPU: CPUType | null
  preSelectedMotherboard: MotherboardType | null
  preSelectedGPU: GPUType | null
  preSelectedRAM: RAMType | null
  preSelectedSSD: SSDType | null
  preSelectedPSU: PSUType | null
  preSelectedAIO: AIOType | null
  preSelectedCase: CaseType | null
  preSelectedAirCooler: AirCoolerType | null
}

function AILogicPage() {
  const buildLogicInitValue: BuildLogicType = {
    budget: 0,
    gamingUsage: 0,
    normalUsage: 0,
    preSelectedCPU: null,
    preSelectedMotherboard: null,
    preSelectedGPU: null,
    preSelectedRAM: null,
    preSelectedSSD: null,
    preSelectedPSU: null,
    preSelectedAIO: null,
    preSelectedCase: null,
    preSelectedAirCooler: null,
  }

  const dataState = useSelector((state: any) => {
    return state
  })
  
  const [step, setStep] = useState(0)
  const [buildLogic, setBuildLogic] = useState(buildLogicInitValue)

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
          <SpecificComponent rawData={dataState.rawData} currectStep={step} updateStep={updateStep} />
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default AILogicPage
