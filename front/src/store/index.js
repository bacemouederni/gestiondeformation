import { configureStore } from '@reduxjs/toolkit'
import formationReducer from './formationSlice'
import formateurReducer from './formateurSlice'
import participantReducer from './participantSlice'
// import sessionReducer from './sessionSlice'
export default configureStore({
  reducer: {
    formation : formationReducer,
    formateur : formateurReducer,
    participant : participantReducer,
    // session:sessionReducer,
  }
})