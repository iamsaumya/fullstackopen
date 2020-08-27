interface MultiplyValues {
  weight: number;
  height: number;
}

let parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[3]),
      height: Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBMI = (weight: number, height: number): String => {
  height = height / 100;
  let bmi = weight / (height * height);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

const { weight, height } = parseArguments(process.argv);
console.log(calculateBMI(weight, height));

export {};
