import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import participantService from "../services/participantService";
import { toast } from "react-toastify";

const initialState = {
    participants: [],
    loading: false,
    participant: null,
    error: "",
    message: "",
  };
  
  // Generates pending, fulfilled and rejected action types
  export const getParticipant = createAsyncThunk(
    "participant/getParticipant",
    async (thunkAPI) => {
      try {
        return await participantService.getParticipant();
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  /*export const getNombreParticipant = createAsyncThunk(
    "participant/getNombreParticipant",
    async (thunkAPI) => {
      try {
        return await participantService.getNombreParticipant();
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );*/
  export const getParticipantById= createAsyncThunk(
    "participant/getParticipantById",
    async (participantId, thunkAPI) => {
      try {
       
      const res=  await participantService.getParticipantById(participantId);
      
      return(res)
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  export const addParticipant = createAsyncThunk(
    "participant/addParticipant",
    async (participantData, thunkAPI) => {
      try {
      
        return await participantService.addParticipant(participantData);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  export const editParticipant = createAsyncThunk(
    "participant/editParticipant",
    async ({ participantId, participant }, thunkAPI) => {
      try {
       
        
        await participantService.editParticipant(participantId, participant);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  export const deletParticipant= createAsyncThunk(
    "participant/delet",
    async (participantId, thunkAPI) => {
      try {
        await participantService.deletParticipant(participantId);
        return participantId;
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  const participantSlice = createSlice({
    
    name: "participant",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getParticipant.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getParticipant.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload;
        state.error = "";
      });
      builder.addCase(getParticipant.rejected, (state, action) => {
        state.loading = false;
        state.participants = [];
        state.error = action.error.message;
      });


      builder.addCase(getParticipantById.pending, (state) => {
        state.loading = true;
       
      });
      builder.addCase(getParticipantById.fulfilled, (state, action) => {
         
        state.loading = false;
        
        state.participant = action.payload;
        state.error = "";
      });

      builder.addCase(getParticipantById.rejected, (state, action) => {
        state.loading = false;
        state.participant = null;
        state.error = action.error.message;
      });
    
     
    

builder.addCase(addParticipant.pending, (state) => {
    state.loading = true;
    
  });
  builder.addCase(addParticipant.fulfilled, (state, action) => {
    state.loading = false;
    state.participants.push(action.payload);
    toast.success("A new participant is added !", {
      position: "bottom-left",
    });
    state.error = "";
    window.location.reload();

  });
  builder.addCase(addParticipant.rejected, (state, action) => {
    state.loading = false;
    state.participants = [];
    state.message = action.payload;
    state.error = action.error.message;
  });
  builder.addCase(editParticipant.pending, (state) => {
    state.status = "loading";
    state.error = null;
  });
  builder.addCase(editParticipant.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.participant = action.payload;
    window.location.reload();
    toast.info("Participant updated !", {
      position: "bottom-left",
    });
  });
  builder.addCase(editParticipant.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.payload;
  });

  builder.addCase(deletParticipant.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(deletParticipant.fulfilled, (state, action) => {
    state.loading = false;
    // Filter out the deleted participant from the state
    state.participants= state.participants.filter(
      (participant) => participant.id !== action.payload
    );
    toast.error("Participant removed !", {
        positeur: "bottom-left",
      });
     window.location.reload();
    state.error = "";
  });

  builder.addCase(deletParticipant.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });


    },
})




  
  
  

  export default participantSlice.reducer;