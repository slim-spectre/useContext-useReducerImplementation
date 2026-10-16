import { useState } from 'react'
import type { BookProps } from '../interfaces/BookProps'
import { useContext } from 'react'
import { ThemeContext } from '../utils/themeContext'

export const Book = ({ book, isEditing, dispatch, isBorrowed }: BookProps) => {
  const [formData, setFormData] = useState({
    name: book.name,
    author: book.author,
    genre: book.genre,
    year: book.year,
    pages: book.pages,
  })

  const { theme } = useContext(ThemeContext)

  return (
    <div className={`flex gap-4 justify-center items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-amber-200 text-black'}`}>
      {isEditing ? (
        <>
          <input
            className='bg-amber-600 p-4 border-none text-white'
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="name"
          />
          <input
            className='bg-amber-600 p-4 border-none text-white'
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="author"
          />
          <input
            className='bg-amber-600 p-4 border-none text-white'
            type="text"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            placeholder="genre"
          />
          <input
            className='bg-amber-600 p-4 border-none text-white'
            type="text"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            placeholder="year"
          />
          <input
            className='bg-amber-600 p-4 border-none text-white'
            type="text"
            value={formData.pages}
            onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
            placeholder="pages"
          />
          <button className="p-5 cursor-pointer rounded-xl bg-orange-900 text-white border-none" onClick={() => dispatch({ type: 'complete_change', book: { id: book.id,isBorrowed:book.isBorrowed, ...formData } })}>
            Submit
          </button>
        </>
      ) : (
        <>
          <h2>Name : {book.name}</h2>
          <p>Author : {book.author}</p>
          <p>Genre : {book.genre}</p>
          <p>Year of publishing : {book.year}</p>
          <p>Amount of pages : {book.pages}</p>

          <button className="p-5 rounded-xl cursor-pointer bg-orange-900 text-white border-none" onClick={() => dispatch({ type: 'start_change', id: book.id })}>Update</button>
          <button className="p-5 rounded-xl cursor-pointer bg-orange-900 text-white border-none" onClick={() => dispatch({ type: 'deleted', id: book.id })}>Delete</button>
          <button className="p-5 rounded-xl cursor-pointer bg-orange-900 text-white border-none" onClick={() => dispatch({type : "change_borrow_status", id : book.id})}>{isBorrowed ? <p>Return</p> : <p>Borrow</p>}</button>
        </>
      )}
    </div>
  )
}
