interface calculatedBMI {
  weight: number;
  height: number;
  bmi: string;
}

const calculateBMI = (weight: number, height: number): calculatedBMI => {
  height = height / 100;
  const bmi = weight / (height * height);
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

export { calculateBMI };
