class AuthorDetails {
  static serverDataToObject(data) {
    return {
      ...data,
      imageThumbUrl: data['photo_thumb_url'],
      imageCardUrl: data['photo_card_url'],
      imageUrl: data['photo_full_url'],
      birthYear: data['birth_year'],
      deathYear: data['death_year'],
      tagIds: data['tag_ids'],
      booksCount: data['books_count'],
      popularity: data['popularity'],
      rank: data['rank']
    }
  }

  static objectToServerdata(details) {
    return {
      'fullname': details.fullname,
      'photo_url': details.imageUrl,
      'reference': details.reference,
      'birth_year': details.birthYear,
      'death_year': details.deathYear,
      'tag_names': details.tagNames,
    }
  }
}

export default AuthorDetails
