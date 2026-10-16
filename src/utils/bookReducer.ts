import type { reducerObject } from '../interfaces/reducerObject'
import type { Action } from '../types/Action'

export const bookReducer = (state: reducerObject, action: Action) => {
  switch (action.type) {
    case 'added': {
      return {
        ...state,
        books: [...state.books, { ...action.book }],
        changingInputs: {
          name: '',
          author: '',
          genre: '',
          year: '',
          pages: '',
          searchingQuery: state.changingInputs.searchingQuery,
        },
      }
    }
    case 'deleted': {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.id),
      }
    }
    case 'change_input': {
      return {
        ...state,
        changingInputs: {
          ...state.changingInputs,
          [action.field]: action.payload,
        },
      }
    }
    case 'start_change': {
      return {
        ...state,
        editingBookId: action.id,
      }
    }
    case 'change_borrow_status': {
      return {
        ...state,
        books: state.books.map((book) => (book.id === action.id ? { ...book, isBorrowed: !book.isBorrowed } : book)),
      }
    }
    case 'complete_change': {
      return {
        ...state,
        books: state.books.map((book) => (book.id === state.editingBookId ? { ...action.book } : book)),
        editingBookId: null,
      }
    }
  }
}
