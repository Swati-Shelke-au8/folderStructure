// import React, { useContext, useState } from "react";
// import { FolderContext } from "./FolderContext";
// import FolderDetails from "./FolderDetails";
// import {
//   Menu,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField,
//   Typography,
//   Breadcrumbs,
//   Link,
// } from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";

// const FolderTree = () => {
//   const { folders, setFolders, currentFolder, setCurrentFolder } =
//     useContext(FolderContext);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [contextMenu, setContextMenu] = useState(null);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [editFolderName, setEditFolderName] = useState("");
//   const [editFolderColor, setEditFolderColor] = useState("");

//   const handleFolderClick = (folder) => {
//     setCurrentFolder(folder);
//   };

//   const handleContextMenu = (event, folder) => {
//     event.preventDefault();
//     setSelectedFolder(folder);
//     setContextMenu({
//       mouseX: event.clientX - 2,
//       mouseY: event.clientY - 4,
//     });
//   };

//   const handleEditFolder = () => {
//     setFolders((prevFolders) => {
//       const updateFolder = (folders) =>
//         folders.map((folder) =>
//           folder.id === selectedFolder.id
//             ? { ...folder, name: editFolderName, color: editFolderColor }
//             : { ...folder, children: updateFolder(folder.children) }
//         );
//       return updateFolder(prevFolders);
//     });
//     handleCloseEditDialog();
//   };

//   const handleDeleteFolder = () => {
//     setFolders((prevFolders) => {
//       const deleteFolder = (folders) =>
//         folders
//           .filter((folder) => folder.id !== selectedFolder.id)
//           .map((folder) => ({
//             ...folder,
//             children: deleteFolder(folder.children),
//           }));
//       return deleteFolder(prevFolders);
//     });
//     setContextMenu(null);
//   };

//   const handleOpenEditDialog = () => {
//     setEditFolderName(selectedFolder.name);
//     setEditFolderColor(selectedFolder.color);
//     setOpenEditDialog(true);
//     setContextMenu(null);
//   };

//   const handleCloseEditDialog = () => {
//     setOpenEditDialog(false);
//   };

//   const findFolderById = (folders, id) => {
//     for (const folder of folders) {
//       if (folder.id === id) {
//         return folder;
//       }
//       const found = findFolderById(folder.children, id);
//       if (found) return found;
//     }
//     return null;
//   };

//   const getFolderPath = (folders, id, path = []) => {
//     for (const folder of folders) {
//       if (folder.id === id) {
//         return [...path, folder];
//       }
//       const found = getFolderPath(folder.children, id, [...path, folder]);
//       if (found.length) return found;
//     }
//     return [];
//   };

//   const rootFolder = currentFolder || { children: folders };
//   const folderPath = currentFolder
//     ? getFolderPath(folders, currentFolder.id)
//     : [];

//   const renderTree = (nodes) => (
//     <div className="folder-structure">
//       {nodes.map((node) => (
//         <div
//           className="folder-info"
//           key={node.id}
//           onContextMenu={(e) => handleContextMenu(e, node)}
//           onClick={() => handleFolderClick(node)}
//         >
//           <FolderIcon
//             style={{
//               fill: node.color,
//               verticalAlign: "middle",
//               height: "10vw",
//               width: "10vw",
//             }}
//           />
//           <Typography>{node.name}</Typography>
//           {node.children.length > 0 ? (
//             <Typography>{node.children.length} items</Typography>
//           ) : (
//             <></>
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div>
//       <Breadcrumbs>
//         <Link color="inherit" onClick={() => setCurrentFolder(null)}>
//           Root
//         </Link>
//         {folderPath.map((folder, index) => (
//           <Link
//             key={folder.id}
//             color="inherit"
//             onClick={() => setCurrentFolder(folder)}
//           >
//             {folder.name}
//           </Link>
//         ))}
//       </Breadcrumbs>
//       {renderTree(rootFolder.children)}
//       {selectedFolder && <FolderDetails folder={selectedFolder} />}
//       <Menu
//         open={contextMenu !== null}
//         onClose={() => setContextMenu(null)}
//         anchorReference="anchorPosition"
//         anchorPosition={
//           contextMenu !== null
//             ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
//             : undefined
//         }
//       >
//         <MenuItem onClick={handleOpenEditDialog}>Edit</MenuItem>
//         <MenuItem onClick={handleDeleteFolder}>Delete</MenuItem>
//       </Menu>
//       <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
//         <DialogTitle>Edit Folder</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Folder Name"
//             type="text"
//             fullWidth
//             value={editFolderName}
//             onChange={(e) => setEditFolderName(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Folder Color"
//             type="color"
//             fullWidth
//             value={editFolderColor}
//             onChange={(e) => setEditFolderColor(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditDialog}>Cancel</Button>
//           <Button onClick={handleEditFolder}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default FolderTree;

import React, { useContext, useState } from "react";
import { FolderContext } from "./FolderContext";
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
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

const FolderTree = () => {
  const { folders, setFolders, currentFolder, setCurrentFolder } =
    useContext(FolderContext);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFolderName, setEditFolderName] = useState("");
  const [editFolderColor, setEditFolderColor] = useState("");

  const handleFolderClick = (folder) => {
    setCurrentFolder(folder);
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
    setFolders((prevFolders) => {
      const updateFolder = (folders) =>
        folders.map((folder) =>
          folder.id === selectedFolder.id
            ? { ...folder, name: editFolderName, color: editFolderColor }
            : { ...folder, children: updateFolder(folder.children) }
        );
      return updateFolder(prevFolders);
    });
    handleCloseEditDialog();
  };

  const handleDeleteFolder = () => {
    setFolders((prevFolders) => {
      const deleteFolder = (folders) =>
        folders
          .filter((folder) => folder.id !== selectedFolder.id)
          .map((folder) => ({
            ...folder,
            children: deleteFolder(folder.children),
          }));
      return deleteFolder(prevFolders);
    });
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
          <Typography>{node.name}</Typography>
          {node.children.length > 0 ? (
            <Typography>{node.children.length} items</Typography>
          ) : null}
        </div>
      ))}
    </div>
  );

  const rootFolder = currentFolder || { children: folders };
  const folderPath = currentFolder
    ? getFolderPath(folders, currentFolder.id)
    : [];

  return (
    <div>
      <div className="folder-tree">
        <Breadcrumbs separator=">">
          <Link
            className="folder-Breadcrumbs-Links"
            color="inherit"
            onClick={() => setCurrentFolder(null)}
          >
            Home
          </Link>
          {folderPath.map((folder, index) => (
            <Link
              className="folder-Breadcrumbs-Links"
              key={folder.id}
              color="inherit"
              onClick={() => setCurrentFolder(folder)}
            >
              {folder.name}
            </Link>
          ))}
        </Breadcrumbs>
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
            onChange={(e) => setEditFolderName(e.target.value)}
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
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditFolder}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FolderTree;
