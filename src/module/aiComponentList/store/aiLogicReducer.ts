import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CPUType, MotherboardType, GPUType, RAMType, SSDType, PSUType, AIOType, CaseType, AirCoolerType } from '../../../constant/objectTypes'


export interface BuildLogicState {
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

const initialState: BuildLogicState = {
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

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updatePreSelectedCPU: (state, action) => {
      state.preSelectedCPU = action.payload
    },
    updatePreSelectedMotherboard: (state, action) => {
      state.preSelectedMotherboard = action.payload
    },
    updatePreSelectedGPU: (state, action) => {
      state.preSelectedGPU = action.payload
    },
    updatePreSelectedRAM: (state, action) => {
      state.preSelectedRAM = action.payload
    },
    updatePreSelectedSSD: (state, action) => {
      state.preSelectedSSD = action.payload
    },
    updatePreSelectedPSU: (state, action) => {
      state.preSelectedPSU = action.payload
    },
    updatePreSelectedAIO: (state, action) => {
      state.preSelectedAIO = action.payload
    },
    updatePreSelectedCase: (state, action) => {
      state.preSelectedCase = action.payload
    },
    updatePreSelectedAirCooler: (state, action) => {
      state.preSelectedAirCooler = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const sliceActions = counterSlice.actions

export default counterSlice.reducer
