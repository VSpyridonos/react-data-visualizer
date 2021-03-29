import { arc } from 'd3';

const Mouth = ({ mouthRadius, mouthWidth }) => {
    const mouthArc = arc()
        .innerRadius(90)
        .outerRadius(100)
        .startAngle(0)
        .endAngle(Math.PI * 2)

    return <path d={mouthArc()} />;
};

export default Mouth
