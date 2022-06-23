import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Route, useParams } from 'react-router-dom'

import { setCurrentAuthorId } from 'store/axis/actions'
import { assignPage, assignPerPage, assignSortBy } from 'pages/authorsPage/actions'
import AuthorsPage from 'pages/authorsPage/Page'
import UrlStoreContext from 'store/urlStore/Context'

const Helper = () => {
  const { actions: { addRoute }, helpers: { buildPath } } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('authorsPagePath', (id) => buildPath({ path: '/authors' }))
  }, [])
  return null
}

const path = '/authors'

const Renderer = () => {
  return (
    <>
      <LocalStoreConfigurer/>
      <AuthorsPage/>
    </>
  )
}

const LocalStoreConfigurer = () => {
  const dispatch = useDispatch()

  const { actions: { addRoute, addUrlAction, addUrlState, patch },
          helpers: { buildPath, buildRelativePath },
          pageState: { authorId, page, perPage, sortBy },
          getRoutes,
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('indexPaginationPath', (page, perPage) => buildRelativePath({ params: { page, per_page: perPage } }))

    addUrlState('authorId', url => parseInt(url.queryParameter('author_id')))

    addUrlState('sortOrder', url => url.queryParameter('sort_order'))

    addUrlState('page', (url) => parseInt(url.queryParameter('page')) || null)

    addUrlState('perPage', (url) => parseInt(url.queryParameter('per_page')) || null)

    addUrlState('sortBy', (url) => url.queryParameter('sort_by'))

    addUrlAction('changeSortOrder', order => patch(buildPath({ params: { 'sort_order': order } })))

    addUrlAction('showAuthor', id => patch(buildRelativePath({ params: { 'author_id': id } })))

    addUrlAction('removeAuthorWidget', () => patch(buildPath({ params: { 'author_id': null } })))

    addUrlAction('switchToIndexPage', (page, perPage) => patch(getRoutes().indexPaginationPath(page, perPage)))

    addUrlAction('switchToIndexSort', (sortBy) => patch(buildRelativePath({ params: { page: 1, sort_by: sortBy } })))
  }, [])

  useEffect(() => {
    dispatch(assignPage(page))
    dispatch(assignPerPage(perPage))
    dispatch(assignSortBy(sortBy))
    dispatch(setCurrentAuthorId(authorId))
  }, [authorId, page, perPage, sortBy])

  return null
}

export default { path, Renderer, Helper }
