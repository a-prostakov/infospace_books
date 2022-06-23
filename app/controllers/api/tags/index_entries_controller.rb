# frozen_string_literal: true

module Api
  module Tags
    class IndexEntriesController < Api::Tags::BaseController
      before_action :fetch_tag, only: :show

      def index
        @tags = Tag.preload(:book_tag_connections, :author_tag_connections)
      end

      def show; end
    end
  end
end
