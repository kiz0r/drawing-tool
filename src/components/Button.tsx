import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const Button = ({
  tooltip,
  className,
  icon,
  text,
  isActive,
  ...restProps
}: IButton) => {
  const buttonCn = clsx(
    {
      '!bg-activeComponent': isActive,
    },
    'flex items-center justify-center rounded-md p-2 bg-tertiaryComponent hover:bg-hoverTertiary hover:scale-[1.1] transition-colors transition-scale duration-200',
    className
  );
  return (
    <button title={tooltip} className={buttonCn} {...restProps}>
      {icon ? icon : text}
    </button>
  );
};

export default Button;
