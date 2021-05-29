import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoodreadsG } from '@fortawesome/free-brands-svg-icons'

const GoodreadsIcon = (props) => {
  const { url } = props
  if (!url) { return null }

  return (
    <a className='icon-goodreads' href={ url } target='_blank'>
      <FontAwesomeIcon icon={ faGoodreadsG }/>
    </a>
  )
}

GoodreadsIcon.propTypes = {
  url: PropTypes.string
}

export default GoodreadsIcon
