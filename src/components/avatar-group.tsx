'use client'

import Avatar from './avatar'

const defaultSize = 40
const defaultMax = 5

const initialState = new Array(defaultMax).fill(null).map(() => ({
  src: null,
  alt: null,
}))

const AvatarGroup = ({
  users = initialState,
  max = defaultMax,
  size = defaultSize,
}: {
  users?: {
    src?: string | null
    alt?: string | null
  }[]
  max?: number
  size?: number
}) => {
  const totalUsers = users.length
  const remaining = totalUsers - max
  return (
    <div className='flex flex-row w-full flex-wrap'>
      {users.slice(0, max).map(({ src, alt }) => (
        <Avatar key={src} className='-mx-1' src={src} alt={alt} size={size} />
      ))}
      {users.length > max ? <Avatar className='-mx-1' src={''} alt={`+${remaining}`} showFullAltText fallbackClassName='text-xs text-foreground' size={size} /> : null}
    </div>
  )
}

export default AvatarGroup
