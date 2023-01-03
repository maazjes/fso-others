import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
    <div>
        {courseParts.map((coursePart) => (
            <>
                <Part key={coursePart.name} coursePart={coursePart} />
                <br />
            </>
        ))}
    </div>
);

export default Content;
