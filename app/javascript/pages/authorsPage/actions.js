import {
  fetchAuthorsIndex,
  fetchAuthorsRefs,
  fetchAllTags,
} from 'store/metadata/actions'
import { slice } from 'pages/authorsPage/slice'

export const {
  addId,
  removeId,
  setBatchMode,
} = slice.actions

export const setupStoreForPage = () => dispatch => {
  dispatch(fetchAllTags())
  dispatch(fetchAuthorsRefs())
  dispatch(fetchAuthorsIndex())
}
