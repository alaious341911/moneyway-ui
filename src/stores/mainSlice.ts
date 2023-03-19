import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPayloadObject } from '../interfaces'

interface MainState {
  firstName: string
  lastName: string
  email: null | string
  phoneNumber: null | string
  avatar : string | null
  isFieldFocusRegistered: boolean
}

const initialState: MainState = {
  /* User */
  firstName: '',
  lastName: '',
  email: null,
  phoneNumber: '',
  avatar: '',
  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.phoneNumber = action.payload.phoneNumber
      state.avatar = action.payload.avatar
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = mainSlice.actions

export default mainSlice.reducer
