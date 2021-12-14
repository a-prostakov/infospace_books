class BookDetailsController < ApplicationController
  before_action :set_book, only: %i[show update]

  protect_from_forgery with: :null_session

  def show
  end

  def create
    @book = Book.new
    if form.update(book_params)
      render json: { id: @book.id }
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  def update
    if form.update(book_params)
      render json: {}
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  private

  def set_book
    @book = Book.find(params[:book_id])
  end

  def form
    Forms::BookForm.new(@book)
  end

  def book_params
    params.fetch(:book, {})
          .permit(:title,
                  :author_id,
                  :year_published,
                  :original_title,
                  :cover_thumb_url,
                  :cover_file,
                  :goodreads_url,
                  tag_names: [])
          .tap do |attributes|
            file = attributes.delete(:cover_file)
            next if !file || file == 'undefined'

            attributes[:covers] = file
          end
  end
end
