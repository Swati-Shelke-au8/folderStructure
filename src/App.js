// import React from "react";
// import { FolderProvider } from "./FolderContext";
// import FolderTree from "./FolderTree";
// import "./App.css";

// function App() {
//   return (
//     <FolderProvider>
//       <div className="App">
//         <h1>Folder Structure Manager</h1>
//         <FolderTree />
//       </div>
//     </FolderProvider>
//   );
// }

// export default App;

import React from "react";
import FolderTree from "./components/FolderTree";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Folder Structure Manager</h1>
      <FolderTree />
    </div>
  );
}

export default App;
