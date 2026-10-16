import type { BookFields } from './BookFields'

export interface reducerObject {
  books: BookFields[]
  editingBookId: number | null
  changingInputs: { name: string; author: string; genre: string; year: string; pages: string, searchingQuery : string }
}
