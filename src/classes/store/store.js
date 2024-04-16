
import { configureStore } from '@reduxjs/toolkit'

import legal from './legal'
import location from './location'

export const baseReducer = {
    legal: legal,
    location: location,
}

export default configureStore({
    reducer: baseReducer
});