import './WordRow.css'

function WordRow({ word = '', solution }) {
  return (
    <div className='word-row'>
      {Array.from(Array(5)).map((_, i) => (
        <span className={solution && solution[i]}>
          {word[i] || '_'}
        </span>
      ))}
    </div>
  )
}

export default WordRow;
