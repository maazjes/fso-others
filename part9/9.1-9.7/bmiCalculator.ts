export const calculateBmi = (weight: number, height: number): string => {
    if (weight < 0 || height < 0) {
        throw new Error('weight and height must be positive numbers');
    }
    const bmi = weight / (height / 100) ** 2;
    if (bmi < 18.5) {
        return 'Low (underweight range)';
    } else if (bmi < 24.9) {
        return 'Normal (healthy weight)';
    } else if (bmi < 29.9) {
        return 'High (overweight)';
    } else {
        return 'Very high (obese)';
    }
};

console.log(calculateBmi(74, 180));
