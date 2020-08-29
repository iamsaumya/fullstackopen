import React from 'react';

interface Part {
  name: string;
  exerciseCount: number;
}
const Total: React.FC<{ parts: Part[] }> = ({ parts }) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
