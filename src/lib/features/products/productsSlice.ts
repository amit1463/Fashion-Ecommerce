import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Color = {
  name: string;
  code: string;
};

export type FilterState = {
  priceRange: [number, number];
  selectedColors: string[];
  selectedSizes: string[];
  selectedCategories: string[];
};

// Define a type for the slice state
interface ProductsState {
  colorSelection: Color;
  sizeSelection: string;
  filters: FilterState;
}

// Define the initial state using that type
const initialState: ProductsState = {
  colorSelection: {
    name: "Brown",
    code: "bg-[#4F4631]",
  },
  sizeSelection: "Large",
  filters: {
    priceRange: [0, 500],
    selectedColors: [],
    selectedSizes: [],
    selectedCategories: [],
  },
};

export const productsSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setColorSelection: (state, action: PayloadAction<Color>) => {
      state.colorSelection = action.payload;
    },
    setSizeSelection: (state, action: PayloadAction<string>) => {
      state.sizeSelection = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    toggleColorFilter: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      const index = state.filters.selectedColors.indexOf(color);
      if (index > -1) {
        state.filters.selectedColors.splice(index, 1);
      } else {
        state.filters.selectedColors.push(color);
      }
    },
    toggleSizeFilter: (state, action: PayloadAction<string>) => {
      const size = action.payload;
      const index = state.filters.selectedSizes.indexOf(size);
      if (index > -1) {
        state.filters.selectedSizes.splice(index, 1);
      } else {
        state.filters.selectedSizes.push(size);
      }
    },
    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.filters.selectedCategories.indexOf(category);
      if (index > -1) {
        state.filters.selectedCategories.splice(index, 1);
      } else {
        state.filters.selectedCategories.push(category);
      }
    },
    resetFilters: (state) => {
      state.filters = {
        priceRange: [0, 500],
        selectedColors: [],
        selectedSizes: [],
        selectedCategories: [],
      };
    },
  },
});

export const {
  setColorSelection,
  setSizeSelection,
  setPriceRange,
  toggleColorFilter,
  toggleSizeFilter,
  toggleCategoryFilter,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
