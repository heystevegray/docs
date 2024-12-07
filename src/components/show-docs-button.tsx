'use client'

import React from 'react'
import { Button } from './ui/button'
import { useSidebar } from './ui/sidebar'

const ShowDocsButton = () => {
  const { open, setOpen, setOpenMobile, isMobile } = useSidebar()
  return (
    <Button
      onClick={() => {
        if (isMobile) {
          setOpenMobile(!open)
        } else {
          setOpen(!open)
        }
      }}
    >
      Read the docs
    </Button>
  )
}

export default ShowDocsButton
