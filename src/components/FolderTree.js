import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateFolder from "./CreateFolder";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Grid,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import {
  editFolder,
  deleteFolder,
  setCurrentFolder,
} from "../redux/FolderSlice";

const FolderTree = () => {
  const dispatch = useDispatch();
  const { folders, currentFolder } = useSelector((state) => state.folders);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFolderName, setEditFolderName] = useState("");
  const [editFolderColor, setEditFolderColor] = useState("");
  const [editError, setEditError] = useState(false);

  const handleFolderClick = (folder) => {
    dispatch(setCurrentFolder(folder));
  };

  const handleContextMenu = (event, folder) => {
    event.preventDefault();
    setSelectedFolder(folder);
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleEditFolder = () => {
    dispatch(
      editFolder({
        folderId: selectedFolder.id,
        updatedFolder: { name: editFolderName, color: editFolderColor },
      })
    );
    handleCloseEditDialog();
  };

  const handleDeleteFolder = () => {
    dispatch(deleteFolder({ folderId: selectedFolder.id }));
    setContextMenu(null);
  };

  const handleOpenEditDialog = () => {
    setEditFolderName(selectedFolder.name);
    setEditFolderColor(selectedFolder.color);
    setOpenEditDialog(true);
    setContextMenu(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // eslint-disable-next-line no-unused-vars
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

  const getFolderPath = (folders, id, path = []) => {
    for (const folder of folders) {
      if (folder.id === id) {
        return [...path, folder];
      }
      const found = getFolderPath(folder.children, id, [...path, folder]);
      if (found.length) return found;
    }
    return [];
  };

  const renderTree = (nodes) => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <div className="folder-structure">
            {nodes.map((node) => (
              <div
                className="folder-info"
                key={node.id}
                onContextMenu={(e) => handleContextMenu(e, node)}
                onClick={() => handleFolderClick(node)}
              >
                <FolderIcon
                  style={{
                    fill: node.color,
                    verticalAlign: "middle",
                    height: "10vw",
                    width: "10vw",
                  }}
                />
                <Typography
                  style={{
                    height: "20px",
                  }}
                >
                  {node.name}
                </Typography>
                <Typography style={{ height: "20px" }}>
                  {node.children.length > 0 ? (
                    <Typography className="inner-child">
                      {node.children.length} items
                    </Typography>
                  ) : null}
                </Typography>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );

  const rootFolder = currentFolder || { children: folders };
  const folderPath = currentFolder
    ? getFolderPath(folders, currentFolder.id)
    : [];

  return (
    <div>
      <div className="folder-tree">
        <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <Breadcrumbs separator=">">
                <Link
                  className="folder-Breadcrumbs-Links"
                  color="inherit"
                  onClick={() => dispatch(setCurrentFolder(null))}
                >
                  Home
                </Link>
                {folderPath.map((folder, index) => (
                  <Link
                    className="folder-Breadcrumbs-Links"
                    key={folder.id}
                    color={
                      index === folderPath.length - 1 ? "#0758e8" : "#101840"
                    }
                    onClick={() => dispatch(setCurrentFolder(folder))}
                  >
                    {folder.name}
                  </Link>
                ))}
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Box>
        <CreateFolder parentFolder={currentFolder} />
      </div>
      {renderTree(rootFolder.children)}
      <Menu
        open={contextMenu !== null}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleOpenEditDialog}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteFolder}>Delete</MenuItem>
      </Menu>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            type="text"
            fullWidth
            value={editFolderName}
            onChange={(e) => {
              setEditFolderName(e.target.value);
              setEditError(!e.target.value.trim());
            }}
            error={editError}
            helperText={editError ? "Folder Name is required" : ""}
          />
          <TextField
            margin="dense"
            label="Folder Color"
            type="color"
            fullWidth
            value={editFolderColor}
            onChange={(e) => setEditFolderColor(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button className="cancle-btn" onClick={handleCloseEditDialog}>
            Cancel
          </Button>
          <Button className="create-btn" onClick={handleEditFolder}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FolderTree;
