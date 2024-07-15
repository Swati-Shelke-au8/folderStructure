// import React, { useState, useContext } from "react";
// import { FolderContext } from "./FolderContext";
// import {
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";

// const CreateFolder = () => {
//   const { folders, setFolders } = useContext(FolderContext);
//   const [open, setOpen] = useState(false);
//   const [folderName, setFolderName] = useState("");
//   const [folderColor, setFolderColor] = useState("#e0af00");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleCreateFolder = () => {
//     const newFolder = {
//       id: Date.now(),
//       name: folderName,
//       color: folderColor,
//       children: [],
//     };
//     setFolders([...folders, newFolder]);
//     setFolderName("");
//     setFolderColor("#e0af00");
//     handleClose();
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Create Folder
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Create Folder</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Folder Name"
//             type="text"
//             fullWidth
//             value={folderName}
//             onChange={(e) => setFolderName(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Folder Color"
//             type="color"
//             fullWidth
//             value={folderColor}
//             onChange={(e) => setFolderColor(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleCreateFolder}>Create</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CreateFolder;

// import React, { useState, useContext } from "react";
// import { FolderContext } from "./FolderContext";
// import {
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";

// const CreateFolder = ({ parentFolder }) => {
//   const { setFolders } = useContext(FolderContext);
//   const [open, setOpen] = useState(false);
//   const [folderName, setFolderName] = useState("");
//   const [folderColor, setFolderColor] = useState("#e0af00");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleCreateFolder = () => {
//     const newFolder = {
//       id: Date.now(),
//       name: folderName,
//       color: folderColor,
//       children: [],
//     };

//     setFolders((prevFolders) => {
//       const addFolder = (folders) =>
//         folders.map((folder) =>
//           folder.id === parentFolder?.id
//             ? { ...folder, children: [...folder.children, newFolder] }
//             : { ...folder, children: addFolder(folder.children) }
//         );
//       return parentFolder
//         ? addFolder(prevFolders)
//         : [...prevFolders, newFolder];
//     });

//     setFolderName("");
//     setFolderColor("#e0af00");
//     handleClose();
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Create Folder
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Create Folder</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Folder Name"
//             type="text"
//             fullWidth
//             value={folderName}
//             onChange={(e) => setFolderName(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Folder Color"
//             type="color"
//             fullWidth
//             value={folderColor}
//             onChange={(e) => setFolderColor(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleCreateFolder}>Create</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CreateFolder;

import React, { useState, useContext } from "react";
import { FolderContext } from "./FolderContext";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from "@mui/material";

const CreateFolder = ({ parentFolder }) => {
  const { setFolders } = useContext(FolderContext);
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("#e0af00");
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleCreateFolder = () => {
    if (!folderName.trim()) {
      setError("Folder name is required.");
      return;
    }

    const newFolder = {
      id: Date.now(),
      name: folderName,
      color: folderColor,
      children: [],
    };

    setFolders((prevFolders) => {
      const addFolder = (folders) =>
        folders.map((folder) =>
          folder.id === parentFolder?.id
            ? { ...folder, children: [...folder.children, newFolder] }
            : { ...folder, children: addFolder(folder.children) }
        );
      return parentFolder
        ? addFolder(prevFolders)
        : [...prevFolders, newFolder];
    });

    setFolderName("");
    setFolderColor("#e0af00");
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
            onChange={(e) => {
              setFolderName(e.target.value);
              if (error) setError("");
            }}
            error={Boolean(error)}
          />
          <FormHelperText error>{error}</FormHelperText>
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
          <Button onClick={handleCreateFolder} disabled={!folderName.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateFolder;
