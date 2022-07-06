import { objectToParams } from 'utils/objectToParams'
import BookForm from 'store/books/api/BookForm'
import BookFull from 'store/books/api/BookFull'
import BookIndexEntry from 'store/books/api/BookIndexEntry'
import BookRefEntry from 'store/books/api/BookRefEntry'
import BookSearchEntry from 'store/books/api/BookSearchEntry'

const jQuery = window.$

class ApiClient {
  static getBooksYears({ authorId, tagIds } = {}) {
    const query = {
      'author_id': authorId,
      'tag_ids': tagIds,
    }
    return jQuery.ajax({
      url: `/api/books/years.json${ objectToParams(query) }`
    })
  }

  static getBooksIndex({ ids } = {}) {
    return jQuery.ajax({
      url: `/api/books/index_entries.json${ objectToParams({ ids }) }`
    }).then(list =>
      list.map(entry => BookIndexEntry.parse(entry))
    )
  }

  static getBooksIndexEntry(id) {
    return jQuery.ajax({
      url: `/api/books/index_entries/${id}.json`
    }).then(entry => BookIndexEntry.parse(entry))
  }

  static getBooksRefs({ ids, years, authorId, tagIds, page, perPage, sortBy } = {}) {
    const params = {
      ids,
      years,
      page,
      'author_id': authorId,
      'tag_ids': tagIds,
      'per_page': perPage,
      'sort_by': sortBy
    }
    return jQuery.ajax({
      url: `/api/books/ref_entries.json${ objectToParams(params) }`
    }).then(({ list, total }) => ({
      total,
      books: list.map(entry => BookRefEntry.parse(entry)),
    }))
  }

  static getBookRefEntry(id) {
    return jQuery.ajax({
      url: `/api/books/ref_entries/${id}.json`
    }).then(entry => BookRefEntry.parse(entry))
  }

  static updateBookPopularity(id) {
    return jQuery.ajax({
      url: `/api/books/popularity/${id}.json`,
      type: 'PUT'
    }).then(data => BookIndexEntry.parse(data))
  }

  static getBookFull(id) {
    return jQuery.ajax({
      url: `/api/books/full_entries/${id}.json`
    }).then(entry => BookFull.parse(entry))
  }

  static updateBook(id, data) {
    const body = BookForm.buildServerData(data)
    const formData = new FormData()
    Object.keys(body).forEach(key => formData.append(`book[${key}]`, body[key]))
    return jQuery.ajax({
      url: `/api/books/full_entries/${id}.json`,
      type: 'PUT',
      data: { book: body },
      // contentType: false, cache: false, processData: false
    })
  }

  static createBook(data) {
    const body = BookForm.buildServerData(data)
    return jQuery.ajax({
      url: '/api/books/full_entries.json',
      type: 'POST',
      data: { book: body }
    })
  }

  static updateBooksBatch(ids, tagNames) {
    return jQuery.ajax({
      url: '/api/books/batch.json',
      type: 'PUT',
      data: {
        ids,
        'batch_update': {
          'tag_names': tagNames,
        },
      }
    })
  }

  static search(key) {
    return jQuery.ajax({
      url: `/api/books/search.json${ objectToParams({ key }) }`
    }).then(entries => entries.map(entry => BookSearchEntry.parse(entry)))
  }
}

export default ApiClient
