import { Interest } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  cache: {
    [query: string]: Interest[]
  }
}

const initialState: SearchState = {
  cache: {},
}

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    addToCache: (state, action: PayloadAction<{ query: string, interests: Interest[] }>) => {
      state.cache[action.payload.query] = action.payload.interests;
    },
    clearCache: (state) => {
      state.cache = {};
    },
  }
});

export const { addToCache, clearCache } = searchSlice.actions;
export default searchSlice.reducer;