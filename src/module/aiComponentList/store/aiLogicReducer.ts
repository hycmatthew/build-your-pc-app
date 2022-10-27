import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { SelectedItemType } from '../../store/rawDataReducer'

export interface BuildLogicState {
  budget: number
  gamingUsage: number
  normalUsage: number
  preSelectedItem: SelectedItemType
}

const initialState: BuildLogicState = {
  budget: 0,
  gamingUsage: 0,
  normalUsage: 0,
  preSelectedItem: {
    cpu: null,
    motherboard: null,
    gpu: null,
    ram: null,
    psu: null,
    pcCase: null,
    aio: null,
    ssd: null,
    airCooler: null
  }
}

export const aiLogicSlice = createSlice({
  name: 'aiLogic',
  initialState,
  reducers: {
    updateBudget: (state, action) => {
      state.budget = action.payload
    },
    updateBuildUsage: (state, action) => {
      state.gamingUsage = action.payload
    },
    updatePreSelectedCPU: (state, action) => {
      state.preSelectedItem.cpu = action.payload
    },
    updatePreSelectedMotherboard: (state, action) => {
      state.preSelectedItem.motherboard = action.payload
    },
    updatePreSelectedGPU: (state, action) => {
      state.preSelectedItem.gpu = action.payload
    },
    updatePreSelectedRAM: (state, action) => {
      state.preSelectedItem.ram = action.payload
    },
    updatePreSelectedSSD: (state, action) => {
      state.preSelectedItem.ssd = action.payload
    },
    updatePreSelectedPSU: (state, action) => {
      state.preSelectedItem.psu = action.payload
    },
    updatePreSelectedAIO: (state, action) => {
      state.preSelectedItem.aio = action.payload
    },
    updatePreSelectedCase: (state, action) => {
      state.preSelectedItem.pcCase = action.payload
    },
    updatePreSelectedAirCooler: (state, action) => {
      state.preSelectedItem.airCooler = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const sliceActions = aiLogicSlice.actions

export default aiLogicSlice.reducer
