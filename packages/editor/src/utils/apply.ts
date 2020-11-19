import { Operation } from 'slate'
import { AMValue } from '../plugins'

const OperationFunctions = {
  set_selection: (doc) => doc
}

export const applyOperation = (doc: AMValue, op: Operation): AMValue => {
  try {
    const func = OperationFunctions[op.type]
    if (!func) {
      throw `no apply fun for ${op.type}`
    }
    return func(doc, op)
  } catch (e) {
    console.error(e)
    return doc
  }
}
