'use client'

import React, { useState, useEffect } from 'react'

interface FakeStreamTextProps {
  text: string
  speed?: number // Speed in milliseconds
  className?: string
}

const FakeStreamText = ({ text, speed = 25, className }: FakeStreamTextProps) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      const character = text[index]
      if (index < text.length && character) {
        setDisplayedText((prev) => prev + character)
        index++
      } else {
        clearInterval(intervalId)
      }
    }, speed)

    return () => clearInterval(intervalId)
  }, [text, speed])

  return <p className={className}>{displayedText}</p>
}

export default FakeStreamText
