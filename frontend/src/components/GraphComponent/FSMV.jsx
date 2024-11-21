import { useEffect, useRef } from "react";
import { graphviz } from 'd3-graphviz';

const FSMV = ({ dotScript }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (graphRef.current && dotScript) {
      const graph = graphviz(graphRef.current);

      graph.renderDot(dotScript); // Correct method to render a DOT script
      graph.zoom(true); // Enables zoom and pan functionality
    }
  }, [dotScript]);

  return (
    <div
      ref={graphRef}
      className="graph"
      style={{
        width: '100%',
        height: '500px', // Ensure the container has a visible height
        border: '1px solid #ccc',
      }}
    ></div>
  );
};

export default FSMV;
