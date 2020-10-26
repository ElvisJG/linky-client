import React from "react";

const Pane = ({ meta }) => {
  const { ogTitle, ogUrl, ogImage } = meta;

  return (
    <div className="pane">
      <a href={ogUrl} target="_blank" rel="noopener noreferrer">
        <img className="pane-image" src={ogImage.url} />
      </a>
      <h1 className="pane-title">{ogTitle}</h1>
    </div>
  );
};

export default Pane;
