import './index.css'

const TaggedItems = props => {
  const {item} = props
  const {userInput, displayText} = item

  return (
    <li className="tag-list-item">
      <p className="user-input"> {userInput} </p>
      <p className="tag-item"> {displayText} </p>
    </li>
  )
}

export default TaggedItems
