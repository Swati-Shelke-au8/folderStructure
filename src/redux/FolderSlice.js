import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [],
  currentFolder: null,
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action) => {
      const { parentFolderId, newFolder } = action.payload;
      if (parentFolderId === null) {
        state.folders.push(newFolder);
      } else {
        const parentFolder = findFolderById(state.folders, parentFolderId);
        if (parentFolder) {
          parentFolder.children.push(newFolder);
        }
      }
    },
    editFolder: (state, action) => {
      const { folderId, updatedFolder } = action.payload;
      const folder = findFolderById(state.folders, folderId);
      if (folder) {
        folder.name = updatedFolder.name;
        folder.color = updatedFolder.color;
      }
    },
    deleteFolder: (state, action) => {
      const { folderId } = action.payload;
      state.folders = deleteFolderById(state.folders, folderId);
    },
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
  },
});

const findFolderById = (folders, id) => {
  for (const folder of folders) {
    if (folder.id === id) {
      return folder;
    }
    const found = findFolderById(folder.children, id);
    if (found) return found;
  }
  return null;
};

const deleteFolderById = (folders, id) => {
  return folders.filter((folder) => {
    if (folder.id === id) {
      return false;
    }
    folder.children = deleteFolderById(folder.children, id);
    return true;
  });
};

export const { addFolder, editFolder, deleteFolder, setCurrentFolder } =
  folderSlice.actions;

export default folderSlice.reducer;
