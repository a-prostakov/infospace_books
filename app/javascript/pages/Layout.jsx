import React from 'react'
import { useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'

import { selectPageIsLoading } from 'store/metadata/selectors'

import BookNewModal from 'components/books/BookNewModal'
import BookEditModal from 'components/books/BookEditModal'
import AuthorNewModal from 'components/authors/AuthorNewModal'
import AuthorEditModal from 'components/authors/AuthorEditModal'
import ImageModal from 'widgets/imageModal/ImageModal'
import Notifications from 'widgets/notifications/Notifications'

const Layout = (props) => {
  const { children, ...options } = props
  const pageIsLoading = useSelector(selectPageIsLoading())
  if (pageIsLoading) {
    return 'Wait...'
  }
  const x = 13

  return (
    <Row { ...options }>
      { children }

      <AuthorNewModal/>
      <AuthorEditModal/>
      <BookNewModal/>
      <BookEditModal/>
      <ImageModal/>
      <Notifications/>
    </Row>
  );
}

export default Layout
