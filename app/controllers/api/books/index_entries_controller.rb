# frozen_string_literal: true

module Api
  module Books
    class IndexEntriesController < Api::Books::BaseController
      before_action :fetch_book, only: :show

      def index
        @books = Book.where(id: params[:ids]).preload(:tag_connections)
      end

      def show; end
    end
  end
end
