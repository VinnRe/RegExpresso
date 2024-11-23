import { useEffect, useRef } from "react";
import { graphviz } from 'd3-graphviz';
import * as d3 from 'd3'
import './FSMV.css'

const FSMV = ({ dotScript }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (graphRef.current && dotScript) {
      const graph = graphviz(graphRef.current);

      graph.renderDot(dotScript).on("end", () => {
        d3.select(graphRef.current)
          .select("polygon")
          .attr("fill", "none")
        
        const svg = d3.select(graphRef.current).select("svg");
        svg.attr("height", "100%"); 
        svg.attr("width", "100%"); 
      });

      graph.zoom(true);
    }
  }, [dotScript]);

  return (
    <div
      ref={graphRef}
      className="graph"
    ></div>
  );
};

export default FSMV;
