'use client'

import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'
import Container from './container'

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
    <div className='flex flex-col gap-2 items-center'>
      <Button onClick={handleCopy} className='w-fit'>
        <Copy />
        Copy Code
      </Button>
      <Container className='border p-4 rounded-md max-w-lg'>
        <Markdown
          components={{
            code(props) {
              const { children, className, ...rest } = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  PreTag='div'
                  language={match[1]}
                  style={dark}
                  customStyle={{
                    backgroundColor: 'transparent',
                    // backgroundColor: 'red',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code
                  {...rest}
                  className={className}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                >
                  {children}
                </code>
              )
            },
          }}
        >
          {markdown}
        </Markdown>
        {/* <p className='break-all whitespace-break-spaces'>{file}</p> */}
      </Container>
    </div>
  )
}

export default FileViewer
