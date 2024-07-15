import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { addFolder } from "../redux/FolderSlice";

const CreateFolder = ({ parentFolder }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("#e0af00");
  const [error, setError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFolderName("");
    setFolderColor("#e0af00");
    setError(false);
  };

  const handleCreateFolder = () => {
    if (!folderName.trim()) {
      setError(true);
      return;
    }
    const newFolder = {
      id: Date.now().toString(),
      name: folderName,
      color: folderColor,
      children: [],
    };
    dispatch(
      addFolder({
        parentFolderId: parentFolder ? parentFolder.id : null,
        newFolder,
      })
    );
    handleClose();
  };

  return (
    <div>
      <Button
        className="create-btn"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Create Folder
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            type="text"
            fullWidth
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            error={error}
          />
          {error && (
            <FormHelperText error>Folder Name is required</FormHelperText>
          )}
          <TextField
            margin="dense"
            label="Folder Color"
            type="color"
            fullWidth
            value={folderColor}
            onChange={(e) => setFolderColor(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateFolder}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateFolder;
