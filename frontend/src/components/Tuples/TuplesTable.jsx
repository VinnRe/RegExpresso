import PropTypes from 'prop-types'; 
import './TuplesTable.css'

const TuplesTable = ({ tuples }) => {
    if (!tuples) return null;

    return (
        <ul className='tuple__list tuple-history__list'>
            <li className="tuple__content-list">
                <span className='tuple__content-title'>States (Q)</span>
                <div className="tuple__content">{tuples.Q.join(", ")}</div>
            </li>
            <li className="tuple__content-list">
                <span className='tuple__content-title'>Alphabet (Σ)</span>
                <div className="tuple__content">{tuples.Sigma.join(", ")}</div>
            </li>
            <li className="tuple__content-list tuple-transition__content">
                <span className='tuple__content-title'>Transitions (Δ)</span>
                <div className="tuple__content">
                    {tuples.Delta.map((transition, index) => (
                        <div key={index}>
                            {`(${transition.join(", ")})`}
                        </div>
                    ))}
                </div>
            </li>
            <li className="tuple__content-list">
                <span className='tuple__content-title'>Start State (q₀)</span>
                <div className="tuple__content">{tuples.q0}</div>
            </li>
            <li className="tuple__content-list">
                <span className='tuple__content-title'>Final States (F)</span>
                <div className="tuple__content">{tuples.F.join(", ")}</div>
            </li>
        </ul>
    );
};

TuplesTable.propTypes = {
    tuples: PropTypes.shape({
        Q: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        ).isRequired,
        Sigma: PropTypes.arrayOf(PropTypes.string).isRequired,
        Delta: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // Allow strings or numbers in Delta
            )
        ).isRequired,
        q0: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        F: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        ).isRequired,
    }).isRequired,
};

export default TuplesTable;
