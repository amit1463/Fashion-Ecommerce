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
  selectedDressStyles: string[];
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
    selectedDressStyles: [],
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
    toggleFilter: (
      state,
      action: PayloadAction<{
        key: "selectedColors" | "selectedSizes" | "selectedCategories" | "selectedDressStyles";
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      const array = state.filters[key];
      const index = array.indexOf(value);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(value);
      }
    },
    resetFilters: (state) => {
      state.filters = {
        priceRange: [0, 500],
        selectedColors: [],
        selectedSizes: [],
        selectedCategories: [],
        selectedDressStyles: [],
      };
    },
  },
});

const { toggleFilter, ...otherActions } = productsSlice.actions;

// Named action creators that wrap the generic toggleFilter
export const toggleColorFilter = (color: string) =>
  toggleFilter({ key: "selectedColors", value: color });

export const toggleSizeFilter = (size: string) =>
  toggleFilter({ key: "selectedSizes", value: size });

export const toggleCategoryFilter = (category: string) =>
  toggleFilter({ key: "selectedCategories", value: category });

export const toggleDressStyleFilter = (style: string) =>
  toggleFilter({ key: "selectedDressStyles", value: style });

export const {
  setColorSelection,
  setSizeSelection,
  setPriceRange,
  resetFilters,
} = otherActions;

export default productsSlice.reducer;
