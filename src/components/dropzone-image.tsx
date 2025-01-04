'use client'

import { useDropzone } from 'react-dropzone'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Icons } from './icons'
import { Button } from './ui/button'

type Preview = { preview?: string; key?: string }
type FileProps = { file?: File }
export type FileWithPreview = FileProps & Preview

export type MAX_IMAGE_RANGES = '4MB' | '8MB' | '16MB' | '32MB'
export const MAX_IMAGE_SIZE: MAX_IMAGE_RANGES = '8MB'

export const convertSizeToBytes = (size: MAX_IMAGE_RANGES): number => {
  const units = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
  }

  const unit = size.replace(/\d+/g, '').toUpperCase()
  const number = parseFloat(size.replace(/[^\d\.]/g, ''))

  return number * (units[unit as keyof typeof units] || 0)
}

/**
To make the file size conversion more accurate and consistent with what is displayed in Finder, you can use the International System of Units (SI) standard for file sizes. Finder uses base-10 (SI) units, where 1 KB = 1000 bytes, instead of the base-2 (binary) units where 1 KB = 1024 bytes.
 */
export const convertFileSizeToHumanReadable = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']

  let i = 0
  while (size >= 1000 && i < units.length - 1) {
    size /= 1000
    i++
  }
  return `${size.toFixed(1)} ${units[i]}`
}

export const getImageFileSizeErrorToast = (file?: File) => {
  const title = file ? `This file is too large (${convertFileSizeToHumanReadable(file.size)})` : 'This file is too large'

  toast.error(title, {
    description: `Max size is ${MAX_IMAGE_SIZE}, I'm not Jeff Bezos ok...`,
    duration: 5000,
  })
}

export const ImagePreview = ({ file, onCancel }: { file: FileWithPreview; onCancel?: () => void }) => {
  return (
    <div className='z-0 overflow-hidden'>
      <Image
        src={file?.preview ?? ''}
        alt={file?.file?.name ?? ''}
        fill
        className='z-0 aspect-square w-full overflow-hidden rounded-md object-cover'
        // Revoke data uri after image is loaded
        onLoad={() => {
          if (file?.preview) {
            URL.revokeObjectURL(file.preview)
          }
        }}
      />
      <div className='absolute left-0 top-0 z-10 h-full w-full bg-background opacity-85 dark:opacity-60' />
      {onCancel ? (
        <div className='absolute right-4 top-4 z-10 flex w-full justify-end'>
          <Button
            size='icon'
            onClick={() => {
              onCancel()
            }}
          >
            <X />
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default function DropzoneImage({ onChange }: { onChange?: (file: File) => void }) {
  const { getRootProps, getInputProps, fileRejections, open, acceptedFiles, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: convertSizeToBytes(MAX_IMAGE_SIZE),
  })

  const file = acceptedFiles[0]

  useEffect(() => {
    if (fileRejections.length > 0) {
      if (fileRejections?.[0]) {
        getImageFileSizeErrorToast(fileRejections[0].file)
      }
    }
  }, [fileRejections])

  useEffect(() => {
    if (file && onChange) {
      onChange(file)
    }
  }, [file, onChange])

  return (
    <div
      className={cn('relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-md border-2 border-dashed border-border', {
        'border-2 border-solid border-primary': isDragActive,
      })}
    >
      {file ? (
        <ImagePreview
          file={{
            file,
            preview: URL.createObjectURL(file),
          }}
        />
      ) : null}
      <div {...getRootProps({ className: 'dropzone' })} className='z-50 h-full w-full'>
        <div className={cn('flex h-full min-h-64 w-full flex-col items-center justify-center gap-4 p-4')}>
          <input {...getInputProps()} />
          <Icons.cloudUpload />
          <p className='text-center'>{isDragActive ? 'LET GO!' : `Drag 'n' drop some files here, or click to select a file.`}</p>
          <Button
            type='button'
            onClick={(e) => {
              e.stopPropagation()
              open()
            }}
          >
            Upload Image
          </Button>
        </div>
      </div>
    </div>
  )
}
