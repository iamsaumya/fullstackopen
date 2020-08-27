// interface MultiplyValues {
//   weight: number;
//   height: number;
// }

interface calculatedBMI {
  weight: number;
  height: number;
  bmi: String;
}

// let parseArguments = (args: Array<string>): MultiplyValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       weight: Number(args[3]),
//       height: Number(args[2])
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// };

const calculateBMI = (weight: number, height: number): calculatedBMI => {
  height = height / 100;
  let bmi = weight / (height * height);
  let status = '';
  if (bmi < 18.5) {
    status = 'Underweight';
  } else if (bmi < 24.9) {
    status = 'Normal (healthy weight)';
  } else if (bmi < 29.9) {
    status = 'Overweight';
  } else {
    status = 'Obese';
  }
  height = height * 100;
  return {
    height,
    weight,
    bmi: status
  };
};

// const { weight, height } = parseArguments(process.argv);
// console.log(calculateBMI(weight, height));

export { calculateBMI };
