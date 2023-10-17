import './index.css'

const SelectEl = prop => {
  const {item, isSelected, updateTag} = prop
  const {displayText, optionId} = item

  const buttonCss = isSelected ? 'selected' : ''

  const onClickTag = () => {
    updateTag(optionId)
  }

  return (
    <li className="list-container">
      <button
        onClick={onClickTag}
        type="button"
        className={`tag-button ${buttonCss}`}
      >
        {displayText}
      </button>
    </li>
  )
}

export default SelectEl
