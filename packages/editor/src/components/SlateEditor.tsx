import React, { FC, useCallback, useMemo, useState } from 'react'
import { createEditor, Node } from 'slate'
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react'

export const SlateEditor: FC = (props) => {
  const editor = useMemo(() => withReact(createEditor()), [])

  const [value, setValue] = useState<Node[]>([
    {
      type: 'heading-1',
      children: [{ text: 'Header' }]
    },
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    },
    {
      type: 'code',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ])

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
