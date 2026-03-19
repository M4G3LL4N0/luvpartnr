// Entire file content...
import { useState } from 'react';
const Alert = ({ type, message, onClose}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`alert alert-${type} px-4 py-2 rounded-md shadow-sm`} 
      onClick={onClose}
      onMouseLeave={() => setIsOpen(false)}
    >
      {message}
    </div>
  );
};
