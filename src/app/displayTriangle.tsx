import { formatNumber } from "../../public/formatNumber";

export function displayTriangle(triangleType: string, a: number, b: number, c: number) {
    const textStyle = { fontSize: '10.5px' };

    const [x, y, z] = [a, b, c].sort((a, b) => a - b);
    
    return (
        <svg viewBox="0 0 110 110" width="150" height="150" style={{ display: "inline-block", margin: "auto" }}>
            {triangleType === "Right Triangle" && (
                <>
                    <path d="M20,90 L110,90 L20,20 Z" fill="none" stroke="black" strokeWidth="2" />
                    <text x="55" y="105" style={textStyle}>
                        <title>{y}</title>
                        {formatNumber(y)}
                    </text>
                    <text x="65" y="50" style={textStyle}>
                        <title>{z}</title>
                        {formatNumber(z)}
                    </text>
                    <text x="0" y="60" style={textStyle}>
                        <title>{x}</title>
                        {formatNumber(x)}
                    </text>
                </>
            )}

            {triangleType === "Equilateral Triangle" && (
                <>
                    <path d="M15,90 L95,90 L55,20 Z" fill="none" stroke="black" strokeWidth="2" />
                    <text x="55" y="105" style={textStyle}>
                        <title>{x}</title>
                        {formatNumber(x)}
                    </text>
                    <text x="80" y="60" style={textStyle}>
                        <title>{x}</title>
                        {formatNumber(x)}
                    </text>
                    <text x="20" y="60" style={textStyle}>
                        <title>{x}</title>
                        {formatNumber(x)}
                    </text>
                </>
            )}

            {triangleType === "Isosceles Triangle" && (
                <>
                    <path d="M20,90 L90,90 L55,20 Z" fill="none" stroke="black" strokeWidth="2" />
                    {(() => {
                        let equalSide, differentSide;
                        if (Math.abs(x - y) < 0.0001) {
                            equalSide = x;
                            differentSide = z;
                        } else if (Math.abs(x - z) < 0.0001) {
                            equalSide = x;
                            differentSide = y;
                        } else {
                            equalSide = y;
                            differentSide = x;
                        }
                        return (
                            <>
                                <text x="55" y="105" style={textStyle}>
                                    <title>{differentSide}</title>
                                    {formatNumber(differentSide)}
                                </text>
                                <text x="80" y="60" style={textStyle}>
                                    <title>{equalSide}</title>
                                    {formatNumber(equalSide)}
                                </text>
                                <text x="20" y="60" style={textStyle}>
                                    <title>{equalSide}</title>
                                    {formatNumber(equalSide)}
                                </text>
                            </>
                        );
                    })()}
                </>
            )}

            {triangleType === "Scalene Triangle" && (
                <>
                    <path d="M40,90 L110,90 L20,20 Z" fill="none" stroke="black" strokeWidth="2" />
                    <text x="75" y="105" style={textStyle}>
                        <title>{y}</title>
                        {formatNumber(y)}
                    </text>
                    <text x="65" y="50" style={textStyle}>
                        <title>{z}</title>
                        {formatNumber(z)}
                    </text>
                    <text x="0" y="60" style={textStyle}>
                        <title>{x}</title>
                        {formatNumber(x)}
                    </text>
                </>
            )}
        </svg>
    );
}