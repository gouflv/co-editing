import Automerge from 'automerge'
import { Editor, Operation } from 'slate'
import { applyOperation } from '../utils/apply'
import { setCursor } from '../utils/cursor'
import { AMDoc, CursorData } from './index'
import { WithCollaborationEditor } from './withCollaboration'
import { toJS } from '../utils'

const log = require('debug')('utils.AutomergeHelper')

export const AutomergeHelper = {
  createConnection(e: WithCollaborationEditor, emit: (data) => void) {
    return new Automerge.Connection(e.docSet, (msg) => {
      debugger
      emit(msg)
    })
  },

  receiveDocument: (
    e: WithCollaborationEditor,
    docId: string,
    data: string
  ) => {
    const currDoc = e.docSet.getDoc(docId)
    const newDoc = Automerge.load<AMDoc>(data)
    const merged = Automerge.merge<AMDoc>(newDoc, currDoc || Automerge.init())
    e.docSet.setDoc(docId, merged)

    Editor.withoutNormalizing(e, () => {
      // e.children =
      e.onChange()
    })
  },

  applySlateOps: async (
    e: WithCollaborationEditor,
    docId: string,
    ops: Operation[],
    cursorData?: CursorData
  ) => {
    let doc = e.docSet.getDoc(docId)
    if (!doc) {
      console.warn(`docId: ${docId} no found`)
      e.docSet.setDoc(docId, Automerge.init())
      doc = e.docSet.getDoc(docId)
    }

    let changed
    for await (let op of ops) {
      changed = Automerge.change<AMDoc>(changed || doc, (d) =>
        applyOperation(d.children, op)
      )
    }

    log(`changed`, toJS(changed))

    changed = Automerge.change(changed || changed, (d) => {
      setCursor(e.clientId, e.selection, d, ops, cursorData || ({} as any))
    })

    log(`changed`, toJS(changed))

    e.docSet.setDoc(docId, changed)
  },

  applyOperation: () => {}
}
