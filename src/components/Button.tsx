import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

// todo: Change text and icon to children
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  className?: string;
  isActive?: boolean;
  forModal?: string;
}

const Button = ({
  tooltip,
  className,
  icon,
  text,
  isActive,
  children,
  disabled,
  ...restProps
}: IButton) => {
  const buttonCn = clsx(
    {
      '!bg-activeComponent': isActive,
      'hover:bg-hoverTertiary hover:scale-[1.1] transition-colors transition-scale duration-200':
        !disabled,
      '!grayscale': disabled,
    },

    'flex items-center justify-center rounded-md p-2 bg-tertiaryComponent',
    className
  );
  return (
    <button
      disabled={disabled || isActive}
      data-tooltip-id="btn-tooltip"
      data-tooltip-content={tooltip}
      className={buttonCn}
      {...restProps}
    >
      {icon ? icon : text}
      {children}
    </button>
  );
};

export default Button;
