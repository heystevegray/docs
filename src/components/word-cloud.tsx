'use client'

// import { useMeasuredSize } from 'https://framer.com/m/framer/useMeasuredSize.js'
import { ControlType, addPropertyControls, motion } from 'framer'
import { useEffect, useRef, useState } from 'react'

interface WordFrequency {
  word: string
  frequency: number
}

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getFrequency = () => randomBetween(30, 100)

const words: WordFrequency[] = [
  { word: 'sad', frequency: getFrequency() },
  { word: 'happy', frequency: getFrequency() },
  { word: 'angry', frequency: getFrequency() },
  { word: 'scared', frequency: getFrequency() },
  { word: 'disgusted', frequency: getFrequency() },
  { word: 'surprised', frequency: getFrequency() },
  { word: 'neutral', frequency: getFrequency() },
]

interface WordCloudProps {
  width?: number
  height?: number
  minFontSize: number
  maxFontSize: number
  text?: string
  color: string
  backgroundColor?: string
  speedInSeconds: number
  font?: string
  border?: {
    borderWidth: number
    borderStyle: string
    borderColor: string
  }
  radius?: number
}

WordCloud.defaultProps = {
  width: 500,
  height: 500,
  minFontSize: 60,
  maxFontSize: 20,
  backgroundColor: 'transparent',
  text: 'Hey',
  color: '#ffffff',
  speedInSeconds: 3,
  font: undefined,
  border: {
    borderWidth: 2,
    borderStyle: 'solid', // solid, dashed, dotted or double
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  radius: 0,
}

addPropertyControls(WordCloud, {
  text: {
    type: ControlType.String,
    defaultValue: 'Hey',
    placeholder: 'Type something…',
  },
  color: {
    type: ControlType.Color,
    defaultValue: '#fff',
    optional: true,
  },
  backgroundColor: {
    type: ControlType.Color,
    defaultValue: '#000',
    optional: true,
  },
  font: {
    type: ControlType.String,
    defaultValue: WordCloud.defaultProps.font,
  },
  // border: {
  //   type: ControlType.Border,
  //   defaultValue: {
  //     borderWidth: 2,
  //     borderStyle: 'solid', // solid, dashed, dotted or double
  //     borderColor: 'rgba(250, 250, 250, 1)',
  //   },
  // },
  speedInSeconds: {
    type: ControlType.Number,
    defaultValue: 3,
    step: 1,
    min: 1,
    max: 30,
    displayStepper: true,
  },
  radius: {
    type: ControlType.Number,
    defaultValue: 0,
    step: 1,
    min: 0,
    displayStepper: true,
  },
  maxFontSize: {
    type: ControlType.Number,
    defaultValue: 20,
    step: 1,
    min: 1,
    max: 1000,
    displayStepper: true,
  },
  minFontSize: {
    type: ControlType.Number,
    defaultValue: 100,
    step: 1,
    min: 1,
    max: 1000,
    displayStepper: true,
  },
})

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function WordCloud(props: WordCloudProps) {
  const container = useRef<HTMLDivElement>(null)
  const size = { width: 1000, height: 1000 } //useMeasuredSize(container)
  const width = size?.width ?? WordCloud.defaultProps.width
  const height = size?.height ?? WordCloud.defaultProps.height

  const maxFrequency = Math.max(...words.map((w) => w.frequency))
  const minFrequency = Math.min(...words.map((w) => w.frequency))
  const [messy, setMessy] = useState(true)

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: props.backgroundColor,
    position: 'relative',
    // width: '100%',
    // height: '100%',
    borderRadius: props.radius,
    transition: 'opacity 0.3s ease-in-out',
    ...(!!props?.border && props?.border),
  }

  const wordTransition = {
    transition: 'all 0.5s ease-in-out',
  }

  const wordStyle = (fontSize: number, color: string, opacity: number, top: string, left: string): React.CSSProperties => ({
    position: 'absolute',
    display: 'inline-block',
    fontSize: `${fontSize}px`,
    color,
    opacity,
    top,
    left,
    ...wordTransition,
  })

  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    display: 'flex',
    opacity: messy ? 0 : 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: props.color,
    ...wordTransition,
  }

  const getFontSize = (frequency: number) => {
    if (maxFrequency === minFrequency) {
      return props.minFontSize
    }

    return props.minFontSize + ((frequency - minFrequency) / (maxFrequency - minFrequency)) * (props.maxFontSize - props.minFontSize)
  }

  const getColor = () => {
    // frequency: number
    // const intensity = frequency / maxFrequency
    // const alpha = intensity.toFixed(2)
    return props.color // Keeps the user-defined color
  }

  const getRandomPosition = (fontSize: number) => {
    const maxTop = height - fontSize
    const maxLeft = width - fontSize * (words.length / 2)
    return {
      top: `${randomBetween(0, maxTop)}px`,
      left: `${randomBetween(0, maxLeft)}px`,
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMessy((prev) => !prev)
    }, props.speedInSeconds * 1000)
    return () => clearInterval(interval)
  }, [props.speedInSeconds])

  return (
    <motion.div ref={container} style={containerStyle}>
      <p style={titleStyle}>{props.text}</p>
      {words.map((word, index) => {
        const fontSize = getFontSize(word.frequency)
        const color = getColor()
        // const color = getColor(word.frequency)
        const { top, left } = getRandomPosition(fontSize)
        return (
          <span key={index} style={wordStyle(fontSize, color, messy ? 1 : 0, top, left)}>
            {word.word}
          </span>
        )
      })}
    </motion.div>
  )
}
