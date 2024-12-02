'use client'

/* eslint-disable react/no-children-prop */
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
      <Button onClick={handleCopy}>
        <Copy />
        Copy
      </Button>
      <div className='bg-card'>
        <Markdown
          children={markdown}
          components={{
            code(props) {
              const { children, className, ...rest } = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter {...rest} PreTag='div' children={String(children).replace(/\n$/, '')} language={match[1]} style={dark} wrapLongLines showLineNumbers />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
          }}
        />
      </div>
    </div>
  )
}

export default FileViewer
