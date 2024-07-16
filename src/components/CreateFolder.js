import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <Button
              className="create-btn"
              variant="outlined"
              onClick={handleClickOpen}
            >
              Create Folder
            </Button>
            <Dialog
              className="create-folder-popup"
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>Create Folder</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Folder Name"
                  type="text"
                  fullWidth
                  value={folderName}
                  onChange={(e) => {
                    setFolderName(e.target.value);
                    setError(!e.target.value.trim());
                  }}
                  error={error}
                  helperText={error ? "Folder Name is required" : ""}
                />
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
                <Button className="cancle-btn" onClick={handleClose}>
                  Cancel
                </Button>
                <Button className="create-btn" onClick={handleCreateFolder}>
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CreateFolder;
