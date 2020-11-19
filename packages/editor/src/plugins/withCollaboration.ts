import { Editor } from 'slate'
import { CursorData } from '../../../shared/src'
import { SocketIOPluginOptions, WithSocketIOEditor } from './withSocketIO'

export interface CollaborationPluginOptions {
  docId: string
  cursor: CursorData
}

export interface withCollaborationEditor {}

const log = require('debug')('plugin.withCollaboration')

const withCollaboration = <T extends Editor>(
  editor: T,
  options: CollaborationPluginOptions & SocketIOPluginOptions
) => {
  const e = editor as T & withCollaborationEditor & WithSocketIOEditor
  const { onChange } = e

  const applySlateOps = () => {}

  e.onChange = () => {
    const ops = e.operations
    log('ops', JSON.stringify(ops))
    onChange()
    e.send(ops)
  }

  return e
}

export default withCollaboration
