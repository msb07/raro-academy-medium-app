import React from 'react';

export type ButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  color: 'blue' | 'red';
  onClick?: () => void;
};

const colors = {
  blue: 'border-b-blue-600 bg-blue-500 hover:bg-blue-400 active:border-b-blue-400',
  red: 'border-b-red-600 bg-red-500 hover:bg-red-400 active:border-b-red-400',
};

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  disabled,
  color,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={` ${colors[color]}
        w-full mt-6 tracking-widest
         py-3 text-white font-bold
        active:translate-y-[0.125rem]
      `}
    >
      {children}
    </button>
  );
};
