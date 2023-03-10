import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InternetPayloadObject } from '../interfaces'

interface InternetState {
  serviceId: { [key: string]: any }[]
  //serviceIdV: string
  isFieldFocusRegistered: boolean
}

const initialState: InternetState = {
  /* Internet */
  serviceId: [{}],
  //serviceIdV: '',

  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
}

export const internetSlice = createSlice({
  name: 'internet',
  initialState,
  reducers: {
    setServiceId: (state, action: PayloadAction<InternetPayloadObject>) => {
      state.serviceId = action.payload.serviceId
      //state.serviceIdV = action.payload.serviceIdV
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { setServiceId } = internetSlice.actions

export default internetSlice.reducer
