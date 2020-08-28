interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (exerciselog: number[], target: number): Result => {
  const periodLength = exerciselog.length;
  const trainingDays = exerciselog.reduce(
    (acc, day) => (day !== 0 ? acc + 1 : acc),
    0
  );

  const average = exerciselog.reduce((acc, day) => acc + day, 0) / periodLength;
  let ratingDescription = '';
  let rating = 0;
  if (average === target) {
    ratingDescription = 'Weldone!';
    rating = 1;
  } else if (average > 0.9 * target) {
    ratingDescription = 'You were almost there!';
    rating = 2;
  } else {
    ratingDescription = "Well tried, next time don't loose focus";
    rating = 3;
  }

  return {
    periodLength,
    trainingDays,
    success: average === target,
    rating,
    ratingDescription,
    target,
    average
  };
};

export { calculateExercise };
