import React from 'react';

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name}</h1>;
};

export default Header;
