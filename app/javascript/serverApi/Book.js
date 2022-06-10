class Book {
  static parse(data) {
    return {
      ...data,
      authorId: data['author_id'],
      coverUrl: data['cover_thumb_url'],
      coverFullUrl: data['cover_full_url'],
      goodreadsUrl: data['goodreads_url'],
      tagIds: data['tag_ids'],
      popularity: data['popularity'],
      globalRank: data['global_rank'],
    }
  }
}

export default Book
