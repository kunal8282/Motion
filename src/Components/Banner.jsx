import PropTypes from 'prop-types'

const Banner = ({
    children,
    height = "h-[calc(100vh-5rem)]",
    className = ""
}) => {
  return (
    <div className={`bg-gradient-to-r from-amber-200 to-yellow-500 flex justify-center items-center ${height}${className}`}>
        {children}
    </div>
  )
}

Banner.propTypes = {
    children: PropTypes.node.isRequired,
    height: PropTypes.string,
    className: PropTypes.string
}


export default Banner