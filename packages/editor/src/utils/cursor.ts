import { Operation, Range } from 'slate'
import { CursorData } from '../plugins'

export const setCursor = (
  id: string,
  selection: Range | null,
  doc,
  ops: Operation[],
  cursor: CursorData
) => {}
