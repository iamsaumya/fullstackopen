import React from 'react';

interface Part {
  name: string;
  exerciseCount: number;
}
const Content: React.FC<{ parts: Part[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
