import React from 'react';
import './CircularProgress.css';

const CircularProgress = ({ 
  value = 0, 
  max = 100, 
  size = 120, 
  strokeWidth = 8, 
  variant = 'primary',
  showLabel = true,
  labelSize = 'lg',
  className = '',
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'progress-circular success';
      case 'warning':
        return 'progress-circular warning';
      case 'error':
        return 'progress-circular error';
      default:
        return 'progress-circular';
    }
  };

  const getLabelClass = () => {
    switch (labelSize) {
      case 'sm':
        return 'progress-circular-label text-sm';
      case 'md':
        return 'progress-circular-label text-base';
      case 'lg':
        return 'progress-circular-label text-lg';
      case 'xl':
        return 'progress-circular-label text-xl';
      default:
        return 'progress-circular-label text-lg';
    }
  };

  return (
    <div 
      className={`${getVariantClass()} ${className}`}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size}>
        {/* Background track */}
        <circle
          className="progress-circular-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress fill */}
        <circle
          className="progress-circular-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      
      {/* Center label */}
      {showLabel && (
        <div className={getLabelClass()}>
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
