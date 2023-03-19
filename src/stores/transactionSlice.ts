import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransactionPayloadObject } from '../interfaces'

interface TransactionState {
  pageNumber: number
  startDate: null | string
  endDate: null | string
  
}

const initialState: TransactionState = {
  /* User */
  pageNumber: 0,
  startDate: null,
  endDate: null,

}

export const transactionlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransaction: (state, action: PayloadAction<TransactionPayloadObject>) => {
      state.pageNumber = action.payload.pageNumber
      state.startDate = action.payload.startDate
      state.endDate = action.payload.endDate
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTransaction } = transactionlice.actions

export default transactionlice.reducer
