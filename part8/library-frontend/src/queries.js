import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
    id
  }
`

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $intPublished: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $intPublished
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`
export const EDIT_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }

  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOKS_WITH_GENRE = gql`
  query getallBooks($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      book {
        ...BookDetails
      }
      newAuthor {
        ...AuthorDetails
      }
    }
  }
  ${BOOK_DETAILS}
  ${AUTHOR_DETAILS}
`
