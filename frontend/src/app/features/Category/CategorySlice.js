import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL de l'API
const API_URL = "http://localhost:5000/categories/";

// 🟢 Action asynchrone pour ajouter une catégorie
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur inconnue");
    }
  }
);

// 🟢 Action asynchrone pour récupérer une catégorie par son ID
export const fetchCategoryById = createAsyncThunk(
    "fetchCategoryById",
    async (categoryId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}categoryByid/${categoryId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Erreur inconnue");
      }
    }
  );
  

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    currentCategory: null, // ✅ Ajout de currentCategory pour stocker la catégorie récupérée
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ✅ Correction de fetchCategoryById
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
