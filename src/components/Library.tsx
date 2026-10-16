import { booksData } from '../data/booksData'
import { Book } from './Book'
import { useReducer, useRef } from 'react'
import { bookReducer } from '../utils/bookReducer'
import { ThemeContext } from '../utils/themeContext'
import { type ThemeType } from '../types/ThemeType'
import { useState } from 'react'

export const Library = () => {
  const [{ books, editingBookId, changingInputs }, dispatch] = useReducer(bookReducer, {
    books: booksData,
    editingBookId: null,
    changingInputs: {
      name: '',
      author: '',
      genre: '',
      year: '',
      pages: '',
      searchingQuery: '',
    },
  })
  const [theme, setTheme] = useState<ThemeType>('light')
  const nextId = useRef(11)

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleAdd = () => {
    const newId = nextId.current
    nextId.current += 1

    dispatch({
      type: 'added',
      book: { id: newId, isBorrowed: false, ...changingInputs },
    })
  }

  const availableBooks = books
    .filter((book) => !book.isBorrowed)
    .filter((book) => {
      const query = changingInputs.searchingQuery.toLowerCase()
      return (
        book.name.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query) ||
        book.year.toString().includes(query) ||
        book.pages.toString().includes(query)
      )
    })
  const borrowedBooks = books.filter((book) => book.isBorrowed)

  return (
    <>
      <ThemeContext value={{theme,toggleTheme}}>
        <div className={`flex flex-col items-center justify-center gap-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-amber-200 text-black'}`}>
          <div className="flex gap-4 items-center">
            <h1>Library</h1>
            <button 
              className="p-2 bg-amber-800 text-white rounded-md cursor-pointer"
              onClick={toggleTheme}
            >
              Toggle Theme ({theme})
            </button>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={changingInputs.searchingQuery}
            onChange={(e) => dispatch({ type: 'change_input', field: 'searchingQuery', payload: e.target.value })}
            className="bg-amber-600 p-4 border-none text-white"
          />

          <div className="flex gap-2 items-center justify-center">
            <p>Add new Book</p>
            <input
              className="bg-amber-600 p-4 border-none text-white"
              type="text"
              value={changingInputs.name}
              onChange={(e) => dispatch({ type: 'change_input', field: 'name', payload: e.target.value })}
              placeholder="Name"
            />
            <input
              className="bg-amber-600 p-4 border-none text-white"
              type="text"
              value={changingInputs.author}
              onChange={(e) => dispatch({ type: 'change_input', field: 'author', payload: e.target.value })}
              placeholder="Author"
            />
            <input
              className="bg-amber-600 p-4 border-none text-white"
              type="text"
              value={changingInputs.genre}
              onChange={(e) => dispatch({ type: 'change_input', field: 'genre', payload: e.target.value })}
              placeholder="Genre"
            />
            <input
              className="bg-amber-600 p-4 border-none text-white"
              type="text"
              value={changingInputs.year}
              onChange={(e) => dispatch({ type: 'change_input', field: 'year', payload: e.target.value })}
              placeholder="Year"
            />
            <input
              className="bg-amber-600 p-4 border-none text-white"
              type="text"
              value={changingInputs.pages}
              onChange={(e) => dispatch({ type: 'change_input', field: 'pages', payload: e.target.value })}
              placeholder="Pages"
            />
            <button className="p-5 cursor-pointer rounded-xl bg-orange-900 text-white border-none" onClick={handleAdd}>
              Add
            </button>
          </div>
          <div>
            <div className="flex flex-col gap-5">
              Available:
              {availableBooks.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  isEditing={book.id === editingBookId}
                  dispatch={dispatch}
                  isBorrowed={book.isBorrowed}
                ></Book>
              ))}
            </div>
            <hr className="m-4" />
            <div className="flex flex-col gap-5">
              Borrowed:
              {borrowedBooks.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  isEditing={book.id === editingBookId}
                  dispatch={dispatch}
                  isBorrowed={book.isBorrowed}
                ></Book>
              ))}
            </div>
          </div>
        </div>
      </ThemeContext>
    </>
  )
}
