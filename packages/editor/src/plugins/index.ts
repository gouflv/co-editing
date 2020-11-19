import Automerge from 'automerge'

export interface CursorData extends Record<string, any> {
  name: string
  color: string
}

export interface Cursor extends Range, CursorData {
  isForward: boolean
}

export type CursorRecord = Record<string, Cursor>

//
export type AMValue = Automerge.List<Node>

export type AMDoc = Automerge.Doc<{ children: AMValue; cursors: CursorRecord }>

//
export interface CollabAction {
  type: 'operation' | 'document'
  payload: any
}
