import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formateurService from "../services/formateurService";
import { toast } from "react-toastify";

const initialState = {
    formateurs: [],
    loading: false,
    formateur: null,
    error: "",
    message: "",
  };
  
  // Generates pending, fulfilled and rejected action types
  export const getFormateur = createAsyncThunk(
    "formateur/getFormateur",
    async (thunkAPI) => {
      try {
        return await formateurService.getFormateur();
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  /*export const getNombreFormateur = createAsyncThunk(
    "formateur/getNombreFormateur",
    async (thunkAPI) => {
      try {
        return await formateurService.getNombreFormateur();
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );*/
  export const getFormateurById= createAsyncThunk(
    "formateur/getFormateurById",
    async (formateurId, thunkAPI) => {
      try {
       
      const res=  await formateurService.getFormateurById(formateurId);
      
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
  export const addFormateur = createAsyncThunk(
    "formateur/addFormateur",
    async (formateurData, thunkAPI) => {
      try {
      
        return await formateurService.addFormateur(formateurData);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  export const editFormateur = createAsyncThunk(
    "formateur/editFormateur",
    async ({ formateurId, formateur }, thunkAPI) => {
      try {
       
        
        await formateurService.editFormateur(formateurId, formateur);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  export const deletFormateur= createAsyncThunk(
    "formateur/deletFormateur",
    async (formateurId, thunkAPI) => {
      try {
        await formateurService.deletFormateur(formateurId);
        return formateurId;
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  const formateurSlice = createSlice({
    
    name: "formateur",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getFormateur.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getFormateur.fulfilled, (state, action) => {
        state.loading = false;
        state.formateurs = action.payload;
        state.error = "";
      });
      builder.addCase(getFormateur.rejected, (state, action) => {
        state.loading = false;
        state.formateurs = [];
        state.error = action.error.message;
      });


      builder.addCase(getFormateurById.pending, (state) => {
        state.loading = true;
       
      });
      builder.addCase(getFormateurById.fulfilled, (state, action) => {
         
        state.loading = false;
        
        state.formateur = action.payload;
        state.error = "";
      });

      builder.addCase(getFormateurById.rejected, (state, action) => {
        state.loading = false;
        state.formateur = null;
        state.error = action.error.message;
      });
    
     
    

builder.addCase(addFormateur.pending, (state) => {
    state.loading = true;
    
  });
  builder.addCase(addFormateur.fulfilled, (state, action) => {
    state.loading = false;
    state.formateurs.push(action.payload);
    toast.success("A new formateur is added !", {
      position: "bottom-left",
    });
    state.error = "";
   //  window.location.reload();

  });
  builder.addCase(addFormateur.rejected, (state, action) => {
    state.loading = false;
    state.formateurs = [];
    state.message = action.payload;
    state.error = action.error.message;
  });
  builder.addCase(editFormateur.pending, (state) => {
    state.status = "loading";
    state.error = null;
  });
  builder.addCase(editFormateur.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.formateur = action.payload;
   // window.location.reload();
    toast.info("Formateur updated !", {
      position: "bottom-left",
    });
  });
  builder.addCase(editFormateur.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.payload;
  });

  builder.addCase(deletFormateur.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(deletFormateur.fulfilled, (state, action) => {
    state.loading = false;
    // Filter out the deleted formateur from the state
    state.formateurs= state.formateurs.filter(
      (formateur) => formateur.id !== action.payload
    );
    toast.error("Formateur removed !", {
        positeur: "bottom-left",
      });
    window.location.reload();
    state.error = "";
  });

  builder.addCase(deletFormateur.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });


    },
})




  
  
  

  export default formateurSlice.reducer;