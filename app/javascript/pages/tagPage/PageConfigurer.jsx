import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentTagId } from 'store/axis/actions'
import { selectCurrentBookId, selectCurrentTagId } from 'store/axis/selectors'
import { setPageIsLoading } from 'store/metadata/actions'
import { clearListState } from 'widgets/booksListLinear/actions'
import {
  assignFilter,
  assignPerPage,
  assignSortBy,
  fetchBooks,
  setupBooksListSelection,
} from 'widgets/booksListLinear/actions'
import { prepareNavRefs } from 'widgets/navbar/actions'
import { fetchTagsIndexEntry } from 'store/tags/actions'

const Configurer = () => {
  const dispatch = useDispatch()
  const tagId = useSelector(selectCurrentTagId())

  useEffect(() => {
    if (!tagId) { return }
    dispatch(setPageIsLoading(true))
    dispatch(clearListState())
    dispatch(assignSortBy('popularity'))
    dispatch(assignPerPage(40))
    dispatch(assignFilter({ tagIds: [tagId] }))
    Promise.all([
      dispatch(prepareNavRefs()),
      dispatch(fetchTagsIndexEntry(tagId)),
    ]).then(() => {
      dispatch(setPageIsLoading(false))
      dispatch(setupBooksListSelection())
    })
  }, [tagId])

  return null
}

export default Configurer
