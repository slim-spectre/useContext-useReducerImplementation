import type { BookFields } from "./BookFields";
import {type Dispatch } from "react";
import {type Action } from "../types/Action";

export interface BookProps {
  book : BookFields,
  isEditing : boolean,
  dispatch : Dispatch<Action>,
  isBorrowed : boolean
}