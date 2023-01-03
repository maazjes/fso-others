import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    const base = `${coursePart.name} ${coursePart.exerciseCount}`;
    switch (coursePart.type) {
        case 'normal':
            return (
                <div>
                    <b>{base}</b>
                    <br />
                    <i>{coursePart.description}</i>
                </div>
            );
        case 'groupProject':
            return (
                <div>
                    <b>{base}</b>
                    <br />
                    {`Project exercices ${coursePart.groupProjectCount}`}
                </div>
            );
        case 'submission':
            return (
                <div>
                    <b>{base}</b>
                    <br />
                    <i>{coursePart.description}</i>
                    <br />
                    {`submit to ${coursePart.exerciseSubmissionLink}`}
                </div>
            );
        case 'special':
            return (
                <div>
                    <b>{base}</b>
                    <br />
                    <i>{coursePart.description}</i>
                    <br />
                    required skills:{' '}
                    {coursePart.requirements.map(
                        (requirement, i) => requirement + (i === coursePart.requirements.length - 1 ? '' : ', ')
                    )}
                </div>
            );
        default:
            return assertNever(coursePart);
    }
};

export default Part;
