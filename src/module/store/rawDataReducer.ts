import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CPUType from '../../constant/objectTypes/CPUType'
import { RawDataAPI } from '../../utils/HttpHelper'

export interface SelectedItemType {
  cpu: CPUType | null
  cpu1: CPUType | null
  cpu2: CPUType | null
  cpu3: CPUType | null
}

export interface DataState {
  selectedItems: SelectedItemType
  cpuList: CPUType[]
  isLoading: boolean
}

const initialState: DataState = {
  selectedItems: {
    cpu: null,
    cpu1: null,
    cpu2: null,
    cpu3: null,
  },
  cpuList: [],
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

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateSelectedCPU: (state, action) => {
      state.selectedItems.cpu = action.payload
    },
    updateSelectedMotherBoard: (state, action) => {
      state.selectedItems.cpu1 = action.payload
    },
    updateSelectedRAM: (state, action) => {
      state.selectedItems.cpu2 = action.payload
    },
  },
  extraReducers: (builder) => {
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
  },
})

// Action creators are generated for each case reducer function
export const sliceActions = counterSlice.actions

export default counterSlice.reducer
