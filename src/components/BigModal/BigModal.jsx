import { forwardRef } from 'react'
import './BigModal.css'

export const BigModal = forwardRef(
function BigModal({ children }, ref) {
  return (
    <div className="bigModal" ref={ref}>
      { children }
    </div>    
  );
}
)
