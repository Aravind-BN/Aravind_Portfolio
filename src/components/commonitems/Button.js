import React from 'react';
import './Button.css';

const STYLES = ['btn--primary', 'btn-outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const scrollToHighlights = () => {
    const el = document.getElementById('highlights');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="btn-mobile">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={(e) => { scrollToHighlights(); onClick?.(e); }}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};
