import React from 'react';

export interface ButtonPropsType {
  children?: any;
}

export default function Button({ children }: ButtonPropsType) {
  return <div>{children}</div>;
}
