import { forwardRef } from 'react'
import './BigModal.css'

export const BigModal = forwardRef(
function BigModal(props, ref) {
  return (
    <div className="bigModal" ref={ref}></div>    
  );
}
)
