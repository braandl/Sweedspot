import { createSlice } from '@reduxjs/toolkit'
import {LegalState} from '../defs/legalstate'
import { Platform } from 'react-native'


export const legal = createSlice({
  name: 'legal',
  initialState: {
    legalState: Platform.OS === "web" ? LegalState.legal : LegalState.unknown,
  },
  reducers: {
    setLegalStateTo: (state, action) => {
        state.legalState = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLegalStateTo } = legal.actions

export default legal.reducer