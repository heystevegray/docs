'use client'

import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'

const FileViewer = ({ file }: { file?: string }) => {
  const markdown = `
  ~~~tsx
  ${file}
  ~~~
  `

  const handleCopy = () => {
    try {
      if (!file) {
        toast.error('File not found')
        return
      }

      navigator.clipboard.writeText(file)
      toast('Copied to clipboard')
    } catch (error) {
      console.error(error)
      toast.error('Failed to copy to clipboard')
    }
  }

  if (!file) {
    return <div>File not found</div>
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button onClick={handleCopy} className='w-fit'>
        <Copy />
        Copy
      </Button>
      <div className='bg-card'>
        <Markdown
          components={{
            code(props) {
              const { children, className, ...rest } = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter PreTag='div' language={match[1]} style={dark} wrapLongLines showLineNumbers>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
          }}
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  )
}

export default FileViewer
