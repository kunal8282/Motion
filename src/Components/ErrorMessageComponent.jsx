import PropTypes from 'prop-types'

const ErrorMessageComponent = (
  {
    errorMessage,
    backgroundColor = "bg-red-700",
    className = "",
    ...props
  }
) => {
  return (
    <div className={`text-white px-2 py-1 rounded font-semibold ${backgroundColor} ${className}`} {...props}>{errorMessage}</div>
  )
}

ErrorMessageComponent.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  className: PropTypes.string
}

export default ErrorMessageComponent;