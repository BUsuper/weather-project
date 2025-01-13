import './SmallBox.css'

export function SmallBox({ children }) {
  return (
  <>
    <div className='smallBox'>
      { children }
    </div>
  </>
  );
}
