import React, { useState } from 'react';

interface ToggleButtonProps {
    // Add any additional props you may need
}

const ToggleButton: React.FC<ToggleButtonProps> = () => {
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <button
            className={`${
                isToggled ? 'bg-blue-500' : 'bg-gray-300'
            } p-2 rounded-full focus:outline-none`}
            onClick={handleToggle}
        >
      <span
          className={`${
              isToggled ? 'translate-x-full' : 'translate-x-0'
          } inline-block w-5 h-5 bg-white rounded-full transform transition-transform`}
      />
        </button>
    );
};

export default ToggleButton;