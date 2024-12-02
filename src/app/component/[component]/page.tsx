import FileViewer from '@/components/file-viewer'
import fs from 'fs'

export default async function Page({ params }: { params: Promise<{ component: string }> }) {
  const searchParams = await params
  const file = fs.readFileSync('framer/components/word-cloud.tsx', 'utf8')

  return (
    <div className='flex flex-col space-y-4'>
      <h1>My Page</h1>
      <p>Comopnent: {searchParams.component}</p>
      <FileViewer file={file} />
    </div>
  )
}
