import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { createEditor, Node } from 'slate'
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react'
import withCollaboration, {
  CollaborationPluginOptions
} from '../plugins/withCollaboration'
import { SocketIOPluginOptions, withSocketIO } from '../plugins/withSocketIO'

interface EditorProps {
  name: string
}

const DOC_ID = '/co-doc'

export const Editor: FC<EditorProps> = (props) => {
  const { name } = props

  const editor = useMemo(() => {
    const e = withReact(createEditor())

    const options: CollaborationPluginOptions & SocketIOPluginOptions = {
      docId: DOC_ID,
      url:
        (process.env.NODE_ENV === 'production'
          ? window.location.origin
          : 'http://localhost:3000') + DOC_ID,
      cursorData: {
        name,
        color: '#2c64de'
      },
      connectOpts: {
        query: {
          name,
          token: name,
          slug: DOC_ID
        },
        reconnectionDelay: 5000
      }
    }
    return withSocketIO(withCollaboration(e, options), options)
  }, [])

  useEffect(() => {
    editor.connect()
    return editor.destroy
  }, [])

  const [value, setValue] = useState<Node[]>([])

  const renderElement = useCallback(
    ({ attributes, children, element }: RenderElementProps) => {
      switch (element.type) {
        case 'heading-1':
          return <h1 {...attributes}>{children}</h1>
        case 'heading-2':
          return <h2 {...attributes}>{children}</h2>
        case 'code':
          return (
            <pre {...attributes}>
              <code>{children}</code>
            </pre>
          )
        default:
          return <p {...attributes}>{children}</p>
      }
    },
    []
  )

  return (
    <div className='slate-container border-gray-400'>
      <Slate editor={editor} value={value} onChange={(val) => setValue(val)}>
        <Editable renderElement={renderElement} />
      </Slate>
    </div>
  )
}
