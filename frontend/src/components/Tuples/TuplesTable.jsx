import React from 'react';
import './TuplesTable.css'

const TuplesTable = ({ tuples }) => {
    if (!tuples) return null;

    return (
        <div>
            <h2>Tuples Table</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>States (Q)</th>
                        <th>Alphabet (Σ)</th>
                        <th>Transitions (Δ)</th>
                        <th>Start State (q₀)</th>
                        <th>Final States (F)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{tuples.Q.join(", ")}</td>
                        <td>{tuples.Sigma.join(", ")}</td>
                        <td>
                            {tuples.Delta.map((transition, index) => (
                                <div key={index}>{`(${transition.join(", ")})`}</div>
                            ))}
                        </td>
                        <td>{tuples.q0}</td>
                        <td>{tuples.F.join(", ")}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TuplesTable;
