import './index.css'

import {RiAlertFill} from 'react-icons/ri'

const FailureView = props => {
  const {reload} = props
  const onClickingTryAgain = () => {
    reload()
  }
  return (
    <div className="failure-view-container">
      <RiAlertFill className="alert-triangle-icon" />
      <h1 className="failure-view-heading">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="try-again-btn"
        onClick={onClickingTryAgain}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView
