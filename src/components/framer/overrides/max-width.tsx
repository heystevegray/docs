import { useState, useEffect } from 'react'

export function MaxWidth() {
  let maxWidth: string | number = 1000
  let background = 'red'
  let size = 'Desktop'

  const [isTablet, setIsTablet] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  if (isTablet) {
    maxWidth = 600
    background = 'green'
    size = 'Tablet'
  }

  if (isMobile) {
    maxWidth = '95%'
    background = 'blue'
    size = 'Mobile'
  }

  useEffect(() => {
    const tabletQuery = window.matchMedia('(max-width: 1199px)')
    const mobileQuery = window.matchMedia('(max-width: 809px)')

    const updateTablet = () => setIsTablet(tabletQuery.matches)
    const updateMobile = () => setIsMobile(mobileQuery.matches)

    // Set the initial state, need to call to initialize mobile.
    updateTablet()
    updateMobile()

    tabletQuery.addEventListener('change', updateTablet)
    mobileQuery.addEventListener('change', updateMobile)

    return () => {
      tabletQuery.removeEventListener('change', updateTablet)
      mobileQuery.removeEventListener('change', updateMobile)
    }
  }, [])

  return (
    <div className='w-full flex justify-center'>
      <div
        className='w-full h-[500px] items-center justify-center flex'
        style={{
          maxWidth,
          background,
        }}
      >
        <p className='text-xl'>{size}</p>
      </div>
    </div>
  )
}
