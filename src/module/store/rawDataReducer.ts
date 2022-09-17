import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CPUType from '../../constant/objectTypes/CPUType'
import GPUType from '../../constant/objectTypes/GPUType'
import MotherboardType from '../../constant/objectTypes/MotherboardType'
import RAMType from '../../constant/objectTypes/RAMType'
import { RawDataAPI } from '../../utils/HttpHelper'

export interface SelectedItemType {
  cpu: CPUType | null
  motherboard: MotherboardType | null
  gpu: GPUType | null
  ram: RAMType | null
}

export interface DataState {
  selectedItems: SelectedItemType
  cpuList: CPUType[]
  gpuList: GPUType[]
  motherboardList: MotherboardType[]
  ramList: RAMType[]
  isLoading: boolean
}

const initialState: DataState = {
  selectedItems: {
    cpu: null,
    motherboard: null,
    gpu: null,
    ram: null,
  },
  cpuList: [],
  gpuList: [],
  motherboardList: [],
  ramList: [],
  isLoading: false,
}
/*
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
*/

export const getCPUDataList = createAsyncThunk(
  'cpuList/fetchData',
  async () => {
    const response = await RawDataAPI.get('/CPUList')
    return response
  }
)

export const getGPUDataList = createAsyncThunk(
  'gpuList/fetchData',
  async () => {
    const response = await RawDataAPI.get('/GPUList')
    return response
  }
)

export const getMotherboardDataList = createAsyncThunk(
  'motherboardList/fetchData',
  async () => {
    const response = await RawDataAPI.get('/MotherboardList')
    return response
  }
)

export const getRAMDataList = createAsyncThunk(
  'ramList/fetchData',
  async () => {
    const response = await RawDataAPI.get('/RAMList')
    return response
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateSelectedCPU: (state, action) => {
      state.selectedItems.cpu = action.payload
    },
    updateSelectedMotherBoard: (state, action) => {
      state.selectedItems.motherboard = action.payload
    },
    updateSelectedGPU: (state, action) => {
      state.selectedItems.gpu = action.payload
    },
    updateSelectedRAM: (state, action) => {
      state.selectedItems.gpu = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET CPU
    builder.addCase(
      getCPUDataList.fulfilled,
      (state: DataState, { payload }) => {
        state.isLoading = false
        state.cpuList = payload
      }
    )
    builder.addCase(getCPUDataList.pending, (state: DataState, { payload }) => {
      console.log('isLoading')
      state.isLoading = true
    })
    builder.addCase(
      getCPUDataList.rejected,
      (state: DataState, { payload }) => {
        console.log('rejected')
        state.isLoading = false
      }
    )
    // GET GPU
    builder.addCase(
      getGPUDataList.fulfilled,
      (state: DataState, { payload }) => {
        state.isLoading = false
        state.gpuList = payload
      }
    )
    builder.addCase(getGPUDataList.pending, (state: DataState, { payload }) => {
      console.log('isLoading')
      state.isLoading = true
    })
    builder.addCase(
      getGPUDataList.rejected,
      (state: DataState, { payload }) => {
        console.log('rejected')
        state.isLoading = false
      }
    )
    // GET Motherboard
    builder.addCase(
      getMotherboardDataList.fulfilled,
      (state: DataState, { payload }) => {
        state.isLoading = false
        state.motherboardList = payload
      }
    )
    builder.addCase(
      getMotherboardDataList.pending,
      (state: DataState, { payload }) => {
        console.log('isLoading')
        state.isLoading = true
      }
    )
    builder.addCase(
      getMotherboardDataList.rejected,
      (state: DataState, { payload }) => {
        console.log('rejected')
        state.isLoading = false
      }
    )
    // GET RAM
    builder.addCase(
      getRAMDataList.fulfilled,
      (state: DataState, { payload }) => {
        state.isLoading = false
        state.ramList = payload
      }
    )
    builder.addCase(
      getRAMDataList.pending,
      (state: DataState, { payload }) => {
        console.log('isLoading')
        state.isLoading = true
      }
    )
    builder.addCase(
      getRAMDataList.rejected,
      (state: DataState, { payload }) => {
        console.log('rejected')
        state.isLoading = false
      }
    )
  },
})

// Action creators are generated for each case reducer function
export const sliceActions = counterSlice.actions

export default counterSlice.reducer
