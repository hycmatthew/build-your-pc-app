import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RawDataAPI } from '../../utils/HttpHelper'

export interface DataState {
  cpuList: any[]
  isLoading: boolean
}

const initialState: DataState = {
  cpuList: [],
  isLoading: false,
}

export const getCPUDataList = createAsyncThunk('cpuList/fetchData', async () => {
  const response = await RawDataAPI.get('/CPUList')
  console.log(response)
  return response
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCPUDataList.fulfilled, (state: DataState, { payload }) => {
      state.isLoading = false
      state.cpuList = payload
    })
    builder.addCase(getCPUDataList.pending, (state: DataState, { payload }) => {
      console.log('isLoading')
      state.isLoading = true
    })
    builder.addCase(getCPUDataList.rejected, (state: DataState, { payload }) => {
      console.log('rejected')
      state.isLoading = false
    })
  },
})

// Action creators are generated for each case reducer function
export const sliceActions = counterSlice.actions

export default counterSlice.reducer
