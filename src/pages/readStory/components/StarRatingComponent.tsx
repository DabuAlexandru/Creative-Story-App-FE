import React, { useState } from 'react';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { toNumber } from 'lodash';

const StarContainerStyle = {
  display: 'flex',
  gap: '4px',
  cursor: 'pointer',
}

const StarStyle = {
  width: '24px',
  height: '24px',
  color: '$gray500',
  variants: {
    filled: {
      true: {
        color: '$yellow500',
      },
    },
  },
}

const StarRatingComponent = ({ value, onChange }: { value: number | string, onChange: (value: number) => void }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  const handleMouseEnter = (index: number) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const filled = (index: number) => hoverValue !== null ? index < hoverValue : index < toNumber(value)

  return (
    <div style={StarContainerStyle}>
      {[...Array(5)].map((_, index) => (
        <div style={StarStyle}>
          {!filled(index) ? (
            <StarIcon
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            />
          ) : (
            <StarFilledIcon
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRatingComponent;