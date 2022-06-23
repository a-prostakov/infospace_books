import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'

import Layout from 'pages/Layout'
import TagCard from 'sidebar/tagCard/TagCard'
import BookCard from 'sidebar/bookCard/BookCard'
import BooksListLinearControls from 'sidebar/booksListLinearControls/BooksListLinearControls'
import BatchControls from 'sidebar/batchControls/BatchControls'
import BooksListLinear from 'widgets/booksListLinear/BooksListLinear'
import PageConfigurer from 'pages/tagPage/PageConfigurer'

const TagPage = () => {
  return (
    <>
      <PageConfigurer/>

      <Layout>
        <Col xs={ 4 }>
          <div className='page-sidebar'>
            <TagCard/>
            <BooksListLinearControls/>
            <BatchControls/>
            <BookCard/>
          </div>
        </Col>

        <Col xs={ 8 }>
          <BooksListLinear/>
        </Col>
      </Layout>
    </>
  )
}

export default TagPage
