import { createSlice } from '@reduxjs/toolkit'
import { distance } from '../utils';

const dist = distance;

export const location = createSlice({
  name: 'legal',
  initialState: {
    location: {
      coords: {
        latitude: undefined,
        longitude: undefined,
        altitude: null,
        accuracy: -1,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: -1
    },
  },
  reducers: {
    setLocation: (state, action) => {
      try {
        if (state.location?.coords?.latitude == null || dist(action.payload?.coords, state.location?.coords) > 5) {
          if (action.payload != undefined) {
            state.location = action.payload
          }
        }
      } catch (e) {
        console.warn(e)
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLocation } = location.actions

export default location.reducer