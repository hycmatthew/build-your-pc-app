import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CPUType from '../../constant/objectTypes/CPUType'
import GPUType from '../../constant/objectTypes/GPUType'
import MotherboardType from '../../constant/objectTypes/MotherboardType'
import PSUType from '../../constant/objectTypes/PSUType'
import RAMType from '../../constant/objectTypes/RAMType'
import { RawDataAPI } from '../../utils/HttpHelper'

export interface SelectedItemType {
  cpu: CPUType | null
  motherboard: MotherboardType | null
  gpu: GPUType | null
  ram: RAMType | null
  psu: PSUType | null
}

export interface DataState {
  selectedItems: SelectedItemType
  cpuList: CPUType[]
  gpuList: GPUType[]
  motherboardList: MotherboardType[]
  ramList: RAMType[]
  psuList: PSUType[]
  isLoading: boolean
}

const initialState: DataState = {
  selectedItems: {
    cpu: null,
    motherboard: null,
    gpu: null,
    ram: null,
    psu: null,
  },
  cpuList: [],
  gpuList: [],
  motherboardList: [],
  ramList: [],
  psuList: [],
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

export const getPSUDataList = createAsyncThunk(
  'psuList/fetchData',
  async () => {
    const response = await RawDataAPI.get('/PSUList')
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
      state.selectedItems.ram = action.payload
    },
    updateSelectedPSU: (state, action) => {
      state.selectedItems.psu = action.payload
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
    builder.addCase(getRAMDataList.pending, (state: DataState, { payload }) => {
      console.log('isLoading')
      state.isLoading = true
    })
    builder.addCase(
      getRAMDataList.rejected,
      (state: DataState, { payload }) => {
        console.log('rejected')
        state.isLoading = false
      }
    )
    // GET PSU
    builder.addCase(
      getPSUDataList.fulfilled,
      (state: DataState, { payload }) => {
        state.isLoading = false
        state.psuList = payload
      }
    )
    builder.addCase(getPSUDataList.pending, (state: DataState, { payload }) => {
      console.log('isLoading')
      state.isLoading = true
    })
    builder.addCase(
      getPSUDataList.rejected,
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
