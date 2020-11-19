import Automerge from 'automerge'
import { Editor } from 'slate'
import { AutomergeHelper } from './automerge-helper'
import { AMDoc, CursorData } from './index'
import { SocketIOPluginOptions, WithSocketIOEditor } from './withSocketIO'

export interface CollaborationPluginOptions {
  docId: string
  cursorData: CursorData
}

export interface WithCollaborationEditor extends Editor {
  clientId: string

  docSet: Automerge.DocSet<AMDoc>
  amConnection: Automerge.Connection<AMDoc>

  openAmConnection: () => void
  closeAmConnection: () => void

  receiveDocument: (data: string) => void
  receiveOperation: (data: Automerge.Message) => void
}

const log = require('debug')('plugin.withCollaboration')

const withCollaboration = <T extends Editor>(
  editor: T,
  options: CollaborationPluginOptions & SocketIOPluginOptions
) => {
  const e = editor as T & WithCollaborationEditor & WithSocketIOEditor
  const { onChange } = e
  const { docId, cursorData } = options || {}

  // AM
  e.docSet = new Automerge.DocSet()

  const createAMConnection = () => {
    if (e.amConnection) e.amConnection.close()
    e.amConnection = AutomergeHelper.createConnection(e, (data) => {
      e.send(data)
    })
    e.amConnection.open()
  }
  createAMConnection()

  e.openAmConnection = () => {
    e.amConnection.open()
  }

  e.closeAmConnection = () => {
    e.amConnection.close()
  }

  e.onChange = () => {
    const ops = e.operations
    log('onChange', 'ops', JSON.stringify(ops))
    AutomergeHelper.applySlateOps(e, docId, ops, cursorData)
    onChange()
  }

  e.receiveDocument = (data) => {
    AutomergeHelper.receiveDocument(e, docId, data)
    createAMConnection()
  }

  return e
}

export default withCollaboration
