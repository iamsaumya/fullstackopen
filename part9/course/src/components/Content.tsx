import React from 'react';
import { CoursePart } from '../type';
import Part from './Part';
const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
