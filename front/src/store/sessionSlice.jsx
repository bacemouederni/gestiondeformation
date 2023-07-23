// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//  import sessionService from "../services/sessionService";
// import { toast } from "react-toastify";

// const initialState = {
//     sessions: [],
//     loading: false,
//     session: null,
//     error: "",
//     message: "",
//   };
  
//   // Generates pending, fulfilled and rejected action types
//   export const getSession = createAsyncThunk(
//     "session/getSession",
//     async (thunkAPI) => {
//       try {
//         return await sessionService.getSession();
       
//       } catch (error) {
//         const message =
//           (error.response && error.response.data && error.response.data.msg) ||
//           error.message ||
//           error.toString();
//         return thunkAPI.rejectWithValue(message);
//       }
//     }
//   );
//   export const getSessionById= createAsyncThunk(
//     "session/getSessionById",
//     async (sessionId, thunkAPI) => {
//       try {
       
//       const res=  await sessionService.getSessionById(sessionId);
      
//       return(res)
       
//       } catch (error) {
//         const message =
//           (error.response && error.response.data && error.response.data.msg) ||
//           error.message ||
//           error.toString();
//         return thunkAPI.rejectWithValue(message);
//       }
//     }
//   );
//   export const ajoutSession = createAsyncThunk(
//     "session/ajoutSession",
//     async (sessionData, thunkAPI) => {
//       try {
      
//         return await sessionService.ajoutSession(sessionData);
//       } catch (error) {
//         const message =
//           (error.response && error.response.data && error.response.data.msg) ||
//           error.message ||
//           error.toString();
//         return thunkAPI.rejectWithValue(message);
//       }
//     }
//   );
//   export const editSession = createAsyncThunk(
//     "session/editSession",
//     async ({ sessionId, session }, thunkAPI) => {
//       try {
       
        
//         await sessionService.editSession(sessionId, session);
//       } catch (error) {
//         const message =
//           (error.response && error.response.data && error.response.data.msg) ||
//           error.message ||
//           error.toString();
//         return thunkAPI.rejectWithValue(message);
//       }
//     }
//   );
//   export const deletSession= createAsyncThunk(
//     "session/deletSession",
//     async (formateurId, thunkAPI) => {
//       try {
//         await sessionService.deletSession(sessionId);
//         return sessionId;
//       } catch (error) {
//         const message =
//           (error.response && error.response.data && error.response.data.msg) ||
//           error.message ||
//           error.toString();
//         return thunkAPI.rejectWithValue(message);
//       }
//     }
//   );

//   const sessionSlice = createSlice({
    
//     name: "session",
//     initialState,
//     extraReducers: (builder) => {
//       builder.addCase(getSession.pending, (state) => {
//         state.loading = true;
//       });
//       builder.addCase(getSession.fulfilled, (state, action) => {
//         state.loading = false;
//         state.sessions = action.payload;
//         state.error = "";
//       });
//       builder.addCase(getSession.rejected, (state, action) => {
//         state.loading = false;
//         state.sessions = [];
//         state.error = action.error.message;
//       });


//       builder.addCase(getSessionById.pending, (state) => {
//         state.loading = true;
       
//       });
//       builder.addCase(getSessionById.fulfilled, (state, action) => {
         
//         state.loading = false;
        
//         state.session = action.payload;
//         state.error = "";
//       });

//       builder.addCase(getSessionById.rejected, (state, action) => {
//         state.loading = false;
//         state.session = null;
//         state.error = action.error.message;
//       });
    
     
    

// builder.addCase(ajoutSession.pending, (state) => {
//     state.loading = true;
    
//   });
//   builder.addCase(ajoutSession.fulfilled, (state, action) => {
//     state.loading = false;
//     state.sessions.push(action.payload);
//     toast.success("A new session is added !", {
//       position: "bottom-left",
//     });
//     state.error = "";
//     //window.location.reload();

//   });
//   builder.addCase(ajoutSession.rejected, (state, action) => {
//     state.loading = false;
//     state.sessions = [];
//     state.message = action.payload;
//     state.error = action.error.message;
//   });
//   builder.addCase(editSession.pending, (state) => {
//     state.status = "loading";
//     state.error = null;
//   });
//   builder.addCase(editSession.fulfilled, (state, action) => {
//     state.status = "succeeded";
//     state.session = action.payload;
//     window.location.reload();
//     toast.info("session updated !", {
//       position: "bottom-left",
//     });
//   });
//   builder.addCase(editSession.rejected, (state, action) => {
//     state.status = "failed";
//     state.error = action.payload;
//   });

//   builder.addCase(deletSession.pending, (state, action) => {
//     state.loading = true;
//   });
//   builder.addCase(deletSession.fulfilled, (state, action) => {
//     state.loading = false;
//     // Filter out the deleted formateur from the state
//     state.sessions= state.sessions.filter(
//       (session) => session.id !== action.payload
//     );
//     toast.error("Session removed !", {
//         positeur: "bottom-left",
//       });
//     window.location.reload();
//     state.error = "";
//   });

//   builder.addCase(deletSession.rejected, (state, action) => {
//     state.loading = false;
//     state.error = action.error.message;
//   });


//     },
// })




  
  
  

//   export default sessionSlice.reducer;