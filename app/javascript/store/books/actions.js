import { difference } from 'lodash'
import { slice } from 'store/books/slice'
import { selectCurrentBookId } from 'store/axis/selectors'
import { setRequestedBookId } from 'widgets/booksListYearly/actions'

import {
  selectBooksIndexIds,
  selectBookRef,
} from 'store/books/selectors'
export const {
  addBook,
  addBooks,
  addBooksRefs,
  setDefaultBookImageUrl,
  setCurrentBookDetails,
} = slice.actions

import apiClient from 'store/books/apiClient'

export const showBook = bookId => (dispatch, getState) => {
  if (!bookId) throw new Error('Trying to show nothing!')

  const state = getState()
  const currentBookId = selectCurrentBookId()(state)
  const bookRef = selectBookRef(bookId)(state)
  if (!bookRef) throw new Error(`Book #${bookId} is missing! Cannot show it.`)

  if (bookId !== currentBookId) {
    console.log(['books/actions.showBook bookid', bookId, 'currentBookId', currentBookId])
    dispatch(setRequestedBookId(bookId))
  }
}

export const fetchMissingBookIndexEntries = ids => async(dispatch, getState) => {
  const state = getState()
  const loadedIds = selectBooksIndexIds()(state)
  const idsToLoad = difference(ids, loadedIds)
  if (idsToLoad.length < 1) return
  await apiClient.getBooksIndex({ ids: idsToLoad }).then(({ books }) => {
    console.log(['getBooksIndex loaded', books])
    dispatch(addBooks(books))
  })
}
