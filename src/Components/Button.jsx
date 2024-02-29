import PropTypes from 'prop-types';

const Button = ({
    type = 'button',
    className = '',
    background = 'bg-black',
    children,
    ...props
}) => {
  return (
    <button type = {type} className = {`flex items-center gap-2 text-white px-4 py-2 font-bold ${background} ${className}`} {...props}>
        {children}
    </button>
  )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    background : PropTypes.string,
    className: PropTypes.string
  };

export default Button