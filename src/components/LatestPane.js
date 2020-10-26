import React from "react";

const LatestPane = ({ metaData }) => {
  const {
    data: {
      ogUrl,
      ogTitle,
      ogImage: { url }
    }
  } = metaData;
  return (
    <div className="latest" key={ogUrl}>
      <a href={ogUrl} target="_blank" rel="noopener noreferrer">
        <img className="latest-image" src={url} alt={ogTitle} />
      </a>
      <h1 className="latest-title">{ogTitle}</h1>
    </div>
  );
};

export default LatestPane;
