import React, { useContext } from "react";
import { FolderContext } from "./FolderContext";

const FolderTree = () => {
  const { folders } = useContext(FolderContext);

  const renderTree = (nodes) => (
    <div>
      {nodes.map((node) => (
        <div key={node.id}>
          <span style={{ color: node.color }}>{node.name}</span>
          {node.children &&
            node.children.length > 0 &&
            renderTree(node.children)}
        </div>
      ))}
    </div>
  );

  return <div>{renderTree(folders)}</div>;
};

export default FolderTree;
