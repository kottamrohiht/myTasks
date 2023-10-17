import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import SelectEl from './components/SelectEl'
import TaggedItems from './components/TaggedItems'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here

class App extends Component {
  state = {
    userInput: '',
    tag: tagsList[0].optionId,
    taskList: [],
    selectedTag: '',
    taggedItems: [],
  }

  updateTag = optionId => {
    const {taskList} = this.state
    const filteredList = taskList.filter(each => each.tag === optionId)
    console.log(filteredList)

    this.setState({
      selectedTag: optionId,
      tag: optionId,
      taggedItems: filteredList,
    })
  }

  onCLickTask = event => {
    this.setState({
      userInput: event.target.value,
    })
  }

  onChangeSelect = event => {
    this.setState({
      tag: event.target.value,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {userInput, tag} = this.state
    const filteredList = tagsList.filter(each => each.optionId === tag)
    const userObj = {
      id: uuidv4(),
      userInput,
      tag,
      displayText: filteredList[0].displayText,
    }

    if (userInput !== '') {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, userObj],
        taggedItems: [...prevState.taskList, userObj],
        userInput: '',
        tag: tagsList[0].optionId,
      }))
    }
  }

  render() {
    const {userInput, tag, selectedTag, taggedItems, taskList} = this.state

    return (
      <div className="app-container">
        <form className="form" onSubmit={this.onSubmitForm}>
          <h1 className="create-task"> Create a task! </h1>
          <label htmlFor="task" className="label">
            Task
          </label>
          <input
            id="task"
            type="text"
            value={userInput}
            onChange={this.onCLickTask}
            className="input-el"
            placeholder="Enter the task here"
          />
          <label htmlFor="tags" className="label">
            Tags
          </label>
          <select
            onChange={this.onChangeSelect}
            value={tag}
            className="select-el"
            id="tags"
            name=""
          >
            {tagsList.map(each => (
              <option
                key={each.optionId}
                className="option"
                value={each.optionId}
              >
                {each.displayText}
              </option>
            ))}
          </select>
          <button type="submit" className="submit-button">
            Add Task
          </button>
        </form>

        <div className="inner-second-container">
          <h1 className="tag-heading"> Tags </h1>
          <ul className="unordered-list">
            {tagsList.map(each => (
              <SelectEl
                key={each.optionId}
                updateTag={this.updateTag}
                isSelected={each.optionId === selectedTag}
                item={each}
              />
            ))}
          </ul>
          <h1 className="tag-heading"> Tasks </h1>
          {taskList.length > 0 ? (
            <ul className="unordered-list-tags">
              {taggedItems.map(each => (
                <TaggedItems key={each.id} item={each} />
              ))}
            </ul>
          ) : (
            <p className="no-items"> No Tasks Added Yet </p>
          )}
        </div>
      </div>
    )
  }
}

export default App
