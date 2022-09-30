import { cloneElement } from 'react';

const Stack = ({ wrappers, children }) => {
  return wrappers.reduceRight(
    (acc, x) => cloneElement(x, { children: acc }),
    children
  );
};

export default Stack;
