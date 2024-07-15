// import React, { createContext, useState } from "react";
// import folderData from "./folderData";

// export const FolderContext = createContext();

// export const FolderProvider = ({ children }) => {
//   const [folders, setFolders] = useState(folderData);

//   return (
//     <FolderContext.Provider value={{ folders, setFolders }}>
//       {children}
//     </FolderContext.Provider>
//   );
// };

// import React, { createContext, useState } from "react";

// export const FolderContext = createContext();

// export const FolderProvider = ({ children }) => {
//   const [folders, setFolders] = useState([
//     // {
//     //   id: 1,
//     //   name: "Root",
//     //   color: "#FF5733",
//     //   children: [
//     //     {
//     //       id: 2,
//     //       name: "Folder 1",
//     //       color: "#33FF57",
//     //       children: [],
//     //     },
//     //     {
//     //       id: 3,
//     //       name: "Folder 2",
//     //       color: "#3357FF",
//     //       children: [],
//     //     },
//     //   ],
//     // },
//   ]);
//   const [currentFolder, setCurrentFolder] = useState(null);

//   return (
//     <FolderContext.Provider
//       value={{ folders, setFolders, currentFolder, setCurrentFolder }}
//     >
//       {children}
//     </FolderContext.Provider>
//   );
// };

import React, { createContext, useState } from "react";

export const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);

  return (
    <FolderContext.Provider
      value={{ folders, setFolders, currentFolder, setCurrentFolder }}
    >
      {children}
    </FolderContext.Provider>
  );
};
