import React from 'react';
import { ButtonType } from './button.type';

export default function Button({ children }: ButtonType.PropsType) {
  return (
    <div>
      {children}
    </div>
  );
}
