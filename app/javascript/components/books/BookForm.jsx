import { isEmpty, pick } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import FormInputImage from 'components/FormInputImage'
import FormInputTags from 'components/FormInputTags'
import BookFormGoodreadsLine from 'components/books/BookFormGoodreadsLine'
import { fetchAllTags } from 'store/metadata/actions'
import { selectAuthor, selectTags } from 'store/metadata/selectors'
import apiClient from 'serverApi/apiClient'

class BookForm extends React.Component {
  constructor(props) {
    super(props)
    const { bookDetails } = this.props
    this.state = {
      errors: {},
      currentOriginalTitle: bookDetails.originalTitle,
      currentTitle: bookDetails.title,
      currentTags: [],
    }
  }

  sendRequest(bookDetails, formData) {
    const { authorDetails } = this.props
    if (bookDetails.new) {
      return apiClient.postBookDetails(formData)
    } else {
      return apiClient.putBookDetails(bookDetails.id, formData)
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const { onSubmit, bookDetails, author, fetchAllTags } = this.props
    const { currentTags } = this.state

    const formData = pick(
      event.target.elements,
      'yearPublished',
      'title',
      'goodreadsUrl',
      'imageUrl',
      'imageFile',
      'originalTitle',
    )
    Object.keys(formData).forEach(key => formData[key] = formInputToValue(formData[key]))
    formData.authorId = author.id
    formData.tagNames = currentTags.map(tag => tag.name)

    this.sendRequest(bookDetails, formData).
      fail((response) => this.setState({ errors: response.responseJSON })).
      then((data) => { fetchAllTags(); onSubmit(data) })
  }

  render() {
    const { bookDetails, author, tags } = this.props
    const { currentTags, currentTitle, currentOriginalTitle, errors } = this.state
    if (!author || isEmpty(bookDetails)) { return null }

    const initialTags = bookDetails.new ? [{ name: 'Novel' }] : tags

    return (
      <Form id='book_form' className='book-form' onSubmit={ (e) => this.handleSubmit(e) }>
        <InputLine controlId='authorId' label='Author' value={ author?.fullname } readOnly/>
        <InputLine controlId='yearPublished' label='Year' value={ bookDetails.yearPublished } errors={ errors.year_published } autoFocus/>
        <InputLine controlId='title' label='Title' value={ bookDetails.title } errors={ errors.title }
                   onChange={ (e) => this.setState({ currentTitle: e.target.value }) }/>
        <BookFormGoodreadsLine controlId='goodreadsUrl' bookDetails={ bookDetails } errors={ errors.goodreads_url } author={ author } currentTitle={ currentTitle }/>
        <FormInputImage label='Cover'
                        imageUrl={ bookDetails.imageUrl }
                        errors={ errors.image_url }
                        searchPrefix={ `book cover ${ author.fullname }` }
                        searchKey={ currentOriginalTitle || currentTitle }/>
        <Row />
        <FormInputTags initialTags={ initialTags } onChange={ (tags) => this.setState({ currentTags: tags }) }/>
        <InputLine controlId='originalTitle' label='Title (original)' value={ bookDetails.originalTitle } errors={ errors.original_title }
                   onChange={ (e) => this.setState({ currentOriginalTitle: e.target.value }) }/>
      </Form>
    )
  }
}

BookForm.propTypes = {
  bookDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const { authorId, tagIds } = props.bookDetails
  return {
    author: selectAuthor(authorId)(state),
    tags: selectTags(tagIds)(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTags: () => dispatch(fetchAllTags())
  }
}

const formInputToValue = (inputElement) => {
  return inputElement.type === 'file' ? inputElement.files[0] : inputElement.value
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm)
