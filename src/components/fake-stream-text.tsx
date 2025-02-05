'use client'

import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'

type FakeTextStreamProps = {
  /**
   * The text to be displayed.
   */
  text: string
  /**
   * Speed of the text stream in milliseconds.
   *
   * @default 25
   */
  speed?: number
  /**
   * Disables the fade effect when the text is fully displayed.
   *
   * @default false
   */
  disableFade?: boolean
  /**
   * Additional class names for the component.
   */
  className?: string
}

const FakeTextStream = ({ text, className, disableFade = false, speed = 25 }: FakeTextStreamProps) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    // Reset text when new input is provided
    setDisplayedText('')
    let index = 0

    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <p className={className}>
      {displayedText.split('').map((character, index) => (
        <span
          key={index + character}
          className={cn({
            'fade-in': !disableFade,
          })}
        >
          {character}
        </span>
      ))}
    </p>
  )
}

export default FakeTextStream
