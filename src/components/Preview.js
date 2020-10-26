import React from "react";
import LatestPane from "./LatestPane";
import PaneGroup from "./PaneGroup";

const Preview = ({ meta, latest }) => {
  if (meta.length === 7) {
    meta.pop();
  }
  return (
    <div className="pane-container">
      <div className="preview_pane">
        {latest && <LatestPane metaData={latest} />}
        <PaneGroup metaData={meta} />
      </div>
    </div>
  );
};

export default Preview;
