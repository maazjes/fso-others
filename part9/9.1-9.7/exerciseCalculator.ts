export interface result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface MultiplyValues {
    value1: number;
    value2: Array<number>;
}

export const calculateExercises = (dailyHours: Array<number>, target: number): result => {
    const trainingDays = dailyHours.filter((day) => day !== 0).length;
    const average = dailyHours.reduce((partialSum, a) => partialSum + a, 0) / dailyHours.length;
    const rating = average < target / 3 ? 1 : average < target ? 2 : 3;
    return {
        periodLength: dailyHours.length,
        trainingDays,
        success: average < target ? false : true,
        rating,
        ratingDescription: rating === 1 ? 'bad' : rating === 2 ? 'not too bad' : 'good',
        target,
        average
    };
};

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    const dailyHours = [];
    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }
        dailyHours.push(Number(args[i]));
    }
    if (isNaN(Number(args[2]))) {
        throw new Error('Provided values were not numbers!');
    }
    return {
        value1: Number(args[2]),
        value2: dailyHours
    };
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateExercises(value2, value1));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
