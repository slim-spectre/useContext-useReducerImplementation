import type { BookFields } from '../interfaces/BookFields'

export type Action =
  | { type: 'added'; book: BookFields }
  | { type: 'deleted'; id: number }
  | { type: 'start_change'; id: number }
  | { type: 'complete_change'; book: BookFields }
  | { type: 'change_input'; field: string; payload: number | string }
  | {type : 'change_borrow_status', id : number}
