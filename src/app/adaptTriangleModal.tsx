import "./adaptTriangleModal.css";
import { formatNumber } from "../../public/formatNumber";

interface AdaptTriangleModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentSides: { side1: number; side2: number; side3: number };
    currentType: string;
}

export function AdaptTriangleModal({ isOpen, onClose, currentSides, currentType }: AdaptTriangleModalProps) {
    if (!isOpen) return null;

    const { side1, side2, side3 } = currentSides;
    const mapSide = { side1 : "side 1", side2 : "side 2", side3 : "side 3"};
    const [shortest, middle, longest] = [side1, side2, side3].sort((a, b) => a - b);
    const uniqueSides = new Set([side1, side2, side3]);

    const calculateAdaptations = () => {
        
        const adaptations: { [key: string]: { changes: string } } = {
            "Right Triangle": {
                changes: calculateRightTriangle(currentType, shortest, middle, longest)
            },
            "Equilateral Triangle": {
                changes: `Adjust all sides to ${Array.from(uniqueSides).join(' or ')}.`
            },
            "Isosceles Triangle": {
                changes: `Make any two sides equal to ${formatNumber(Math.max(shortest, middle))} unit${Math.max(shortest, middle) === 1 ? "" : "s"}`
            }
        };

        delete adaptations[currentType as keyof typeof adaptations];
        return adaptations;
    };

    const calculateRightTriangle = (currentType: string, a: number, b: number, c: number) => {
        const targetC = Math.sqrt(a * a + b * b);
        if (currentType === "Equilateral Triangle") {
            return `Adjust any side to ${formatNumber(targetC)} unit${targetC === 1 ? "" : "s"} to satisfy the Pythagorean theorem.`;;
        }
        else if (currentType === "Isosceles Triangle") {
            return `Adjust at least one side to satisfy the Pythagorean theorem. For example, adjust the longest side (${mapSide[`side${[side1, side2, side3].indexOf(longest) + 1}` as keyof typeof mapSide]}) to ${formatNumber(targetC)} unit${targetC === 1 ? "" : "s"}`;
        }
        return `Adjust the longest side (${mapSide[`side${[side1, side2, side3].indexOf(longest) + 1}` as keyof typeof mapSide]}) to ${formatNumber(targetC)} unit${targetC === 1 ? "" : "s"} to satisfy the Pythagorean theorem.`;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">Adapt Triangle Suggestion</h2>
                    <button 
                        onClick={onClose}
                        className="close-button"
                    >
                        ×
                    </button>
                </div>
                
                <div className="current-triangle">
                    <h3 className="current-triangle-title">Current Triangle</h3>
                    <div className="triangle-details">
                        <div className="detail-label">Type:</div>
                        <div className="detail-value">{currentType}</div>
                        <div className="detail-label">Side 1:</div>
                        <div className="detail-value">{currentSides.side1}</div>
                        <div className="detail-label">Side 2:</div>
                        <div className="detail-value">{currentSides.side2}</div>
                        <div className="detail-label">Side 3:</div>
                        <div className="detail-value">{currentSides.side3}</div>
                    </div>
                </div>

                <div className="adaptation-section">
                    {Object.entries(calculateAdaptations()).map(([type, info]) => (
                        <div key={type} className="adaptation-item">
                            <h3 className="adaptation-title">
                                To Make A {type}
                            </h3>
                            <div className="adaptation-content">
                                <p className="adaptation-text">
                                    {info.changes}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="modal-footer">
                    <button
                        onClick={onClose}
                        className="close-modal-button"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}