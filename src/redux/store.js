import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./FolderSlice";

const store = configureStore({
  reducer: {
    folders: folderReducer,
  },
});

export default store;
