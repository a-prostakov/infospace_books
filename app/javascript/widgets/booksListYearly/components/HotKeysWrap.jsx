import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { HotKeys } from 'react-hotkeys'

import useUrlStore from 'store/urlStore'
import { selectAuthorFull } from 'store/authors/selectors'
import { selectCurrentBook } from 'store/books/selectors'
import { selectCurrentAuthorId, selectCurrentBookId } from 'store/axis/selectors'
import {
  jumpToFirstYear,
  jumpToLastYear,
  setBookShiftDirectionHorizontal,
  shiftSelection,
  shiftYear,
} from 'widgets/booksListYearly/actions'
import { syncCurrentBookStats } from 'store/bookSync/actions'

const keyMap = {
  DOWN: 'Down',
  PAGE_DOWN: 'PageDown',
  END: 'End',
  UP: 'Up',
  PAGE_UP: 'PageUp',
  START: 'Home',
  TOGGLE_EDIT: 'e',
  TOGGLE_AUTHOR: 'a',
  LEFT: 'Left',
  RIGHT: 'Right',
  SYNC_BOOK_STATS: 's',
}

const handleWheel = (dispatch, xDirection, yDirection) => {
  const speed = Math.abs(yDirection) / 150
  if (yDirection > 0) {
    dispatch(shiftYear(-speed))
  } else if (yDirection < 0) {
    dispatch(shiftYear(+speed))
  }
}

const HotKeysWrap = (props) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const currentAuthorId = useSelector(selectCurrentAuthorId())
  const currentAuthor = useSelector(selectAuthorFull(currentAuthorId))
  const currentBookId = useSelector(selectCurrentBookId())
  const currentBook = useSelector(selectCurrentBook())
  const [{
           editBookModalShown
         },
         {
           closeModal,
           gotoAuthorBooks,
           gotoBooks,
           openEditBookModal,
         }] = useUrlStore()

  useEffect(() => ref.current.focus(), [])

  const hotKeysHandlers = () => ({
    DOWN: () => dispatch(shiftYear(-1)),
    PAGE_DOWN: () => dispatch(shiftYear(-2)),
    END: () => dispatch(jumpToFirstYear()),
    UP: () => dispatch(shiftYear(+1)),
    PAGE_UP: () => dispatch(shiftYear(+2)),
    START: () => dispatch(jumpToLastYear()),

    RIGHT: () => {
      dispatch(setBookShiftDirectionHorizontal('right'))
      dispatch(shiftSelection(+1))
    },
    LEFT: () => {
      dispatch(setBookShiftDirectionHorizontal('left'))
      dispatch(shiftSelection(-1))
    },
    SYNC_BOOK_STATS: () => dispatch(syncCurrentBookStats()),
    TOGGLE_AUTHOR: () => {
      const { currentAuthorId, currentBookId, currentBook } = state
      console.log(`TOGGLE_AUTHOR get State: ${currentAuthorId}, ${currentBookId}`)
      console.log(`TOGGLE! AuthorID: ${currentAuthorId}, BookID: ${currentBookId}, Book: ${currentBook?.id}`)
      if (!currentBook) {
        return
      } else if (currentAuthorId) {
        gotoBooks({ bookId: currentBookId })
      } else {
        gotoAuthorBooks(currentBook.authorId, { bookId: currentBook.id })
      }
    },
    TOGGLE_EDIT: () => {
      if (!currentBook) { return }

      if (editBookModalShown) {
        closeModal()
      } else {
        openEditBookModal()
      }
    },
  })

  return (
    <HotKeys keyMap={ keyMap } handlers={ hotKeysHandlers() }>
      <div tabIndex="-1" ref={ ref } onWheel={ (e) => handleWheel(dispatch, e.deltaX, e.deltaY) }>
        { props.children }
      </div>
    </HotKeys>
  )
}

export default HotKeysWrap
