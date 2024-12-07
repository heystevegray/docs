'use client'

import React from 'react'
import { Button } from './ui/button'
import { useSidebar } from './ui/sidebar'

const ShowDocsButton = () => {
  const { setOpen, setOpenMobile, isMobile } = useSidebar()
  return (
    <Button
      onClick={() => {
        if (isMobile) {
          setOpenMobile(true)
        } else {
          setOpen(true)
        }
      }}
    >
      Read the docs
    </Button>
  )
}

export default ShowDocsButton
