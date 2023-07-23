import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formationService from "../services/formationService";
import { toast } from "react-toastify";

const initialState = {
    formations: [],
    loading: false,
    formation: null,
    error: "",
    message: "",
  };
  
  // Generates pending, fulfilled and rejected action types
  export const getFormation = createAsyncThunk(
    " formation/getFormation",
    async (thunkAPI) => {
      try {
        return await formationService.getFormation();
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
 /* export const getNombreFormation = createAsyncThunk(
    " formation/getNombreFormation",
    async (thunkAPI) => {
      try {
        return await formationService.getNombreFormationet();
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );*/
  export const getFormationById= createAsyncThunk(
    "formation/getFormationById",
    async (formationId, thunkAPI) => {
      try {
       
      const res=  await formationService.getFormationById(formationId);
      
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
  export const addFormation = createAsyncThunk(
    "formation/addFormation",
    async (formationData, thunkAPI) => {
      try {
      
        return await formationService.addFormation(formationData);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  export const editFormation = createAsyncThunk(
    "formateur/editFormation",
    async ({ formationId, formation }, thunkAPI) => {
      try {
       
        
        await formationService.editFormation(formationId, formation);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  export const deletFormation= createAsyncThunk(
    "formation/deletFormation",
    async (formationId, thunkAPI) => {
      try {
        await formationService.deletFormation(formationId);
        return formationId;
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  const formationSlice = createSlice({
    
    name: "formation",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getFormation.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getFormation.fulfilled, (state, action) => {
        state.loading = false;
        state.formations = action.payload;
        state.error = "";
      });
      builder.addCase(getFormation.rejected, (state, action) => {
        state.loading = false;
        state.formations = [];
        state.error = action.error.message;
      });


      builder.addCase(getFormationById.pending, (state) => {
        state.loading = true;
       
      });
      builder.addCase(getFormationById.fulfilled, (state, action) => {
         
        state.loading = false;
        
        state.formation = action.payload;

       
        state.error = "";
      });

      builder.addCase(getFormationById.rejected, (state, action) => {
        state.loading = false;
        state.formation = null;
        state.error = action.error.message;
      });
    
     
    

builder.addCase(addFormation.pending, (state) => {
    state.loading = true;
    
  });
  builder.addCase(addFormation.fulfilled, (state, action) => {
    state.loading = false;
    
   
    state.formations.push(action.payload);
    toast.success("A new formation is added !", {
      position: "bottom-left",
    });
    state.error = "";
     window.location.reload();

  });
  builder.addCase(addFormation.rejected, (state, action) => {
    state.loading = false;
    state.formations = [];
    state.message = action.payload;
    state.error = action.error.message;
  });
  builder.addCase(editFormation.pending, (state) => {
    state.status = "loading";
    state.error = null;
  });
  builder.addCase(editFormation.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.formations = action.payload;
    window.location.reload();
    toast.info("Formation updated !", {
      position: "bottom-left",
    });
  });
  builder.addCase(editFormation.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.payload;
  });

  builder.addCase(deletFormation.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(deletFormation.fulfilled, (state, action) => {
    state.loading = false;
    // Filter out the deleted formation from the state
    state.formations= state.formations.filter(
      (formation) => formation.id !== action.payload
    );
    toast.error("Formation removed !", {
        position: "bottom-left",
      });
    window.location.reload();
    state.error = "";
  });

  builder.addCase(deletFormation.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });


    },
})




  
  
  

  export default formationSlice.reducer;