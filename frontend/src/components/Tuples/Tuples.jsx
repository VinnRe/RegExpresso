import React from "react";

const TupleTable = ({ tuples }) => {
  if (!tuples) {
    return <div>Loading...</div>; // Show loading if data is not available
  }

  const { Delta = [], F = [], Q = [], Sigma = [], q0 = 0 } = tuples;

  const generateTableRows = () => {
    const rows = [];
    const maxLength = Math.max(
      Delta.length,
      F.length,
      Q.length,
      Sigma.length
    );

    for (let i = 0; i < maxLength; i++) {
      rows.push(
        <tr key={i}>
          {/* Q */}
          <td>{Q[i] !== undefined ? Q[i] : ""}</td>

          {/* Sigma */}
          <td>{Sigma[i] !== undefined ? Sigma[i] : ""}</td>

          {/* Delta (an array of states) */}
          <td>{Delta[i] ? Delta[i].join(", ") : ""}</td>

          {/* F */}
          <td>{F[i] !== undefined ? F[i] : ""}</td>

          {/* q0 */}
          <td>{i === 0 ? q0 : ""}</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div>
      <h3>Tuples Table</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Q</th>
            <th>Sigma</th>
            <th>Delta</th>
            <th>F</th>
            <th>q0</th>
          </tr>
        </thead>
        <tbody>{generateTableRows()}</tbody>
      </table>
    </div>
  );
};

export default TupleTable;
