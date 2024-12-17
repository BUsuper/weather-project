import './SmallAddBox.css'
import addIcon from '../../../assets/plus.svg'

export function SmallAddBox({ onClick }) {
  return (
  <>
    <div className='smallAddBox' onClick={onClick}>
      <img src={addIcon} className='addIcon'/>
    </div>
  </>
  );
}
