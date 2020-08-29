import React from 'react';
import { CoursePart } from '../type';

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
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
