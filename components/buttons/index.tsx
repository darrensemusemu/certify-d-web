import { ButtonHTMLAttributes, forwardRef, HtmlHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: 'primary' | 'small';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ title, variant = 'primary', ...props }, ref) => (
    <button {...props} ref={ref} className={[styles.primaryBtn].join(' ')}>
      {title}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
