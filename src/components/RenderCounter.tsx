import React, { useRef } from "react";

export const RenderCounter: React.FC = () => {
  const renderCounter = useRef(0);

  renderCounter.current += 1;
  console.log("RenderCounter rendered!");

  return (
    <p className="RenderCounter">{`I'm the counter's sibling! I've been rendered ${renderCounter.current} times!`}</p>
  );
};
