import { CoursePart } from '../types';

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
    <div>{`Number of exercises ${courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}`}</div>
);

export default Total;
