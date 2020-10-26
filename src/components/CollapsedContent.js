import React from "react";

const CollapsedContent = ({ data }) => {
  return (
    <div className="collapsable">
      <h2>{data.ogType}</h2>
      <h2 className="pane-description">{data.ogDescription}</h2>
    </div>
  );
};

export default CollapsedContent;
