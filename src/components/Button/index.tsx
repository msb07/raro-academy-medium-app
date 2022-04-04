import React from 'react';

export type ButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  color?: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  disabled,
  color = 'border-b-blue-600 bg-blue-500 hover:bg-blue-400 active:border-b-blue-400',
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={` ${color}
        w-full mt-6 tracking-widest
         py-3 text-white font-bold
        active:translate-y-[0.125rem]
      `}
    >
      {children}
    </button>
  );
};
