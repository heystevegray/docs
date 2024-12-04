'use client'

// Welcome to Code in Framer
// Get Started: https://www.framer.com/developers/

import { ControlType, addPropertyControls } from 'framer'

Copyright.defaultProps = {
  text: 'My LLC',
  color: '#ffffff',
  font: '',
  size: 16,
}

addPropertyControls(Copyright, {
  text: {
    type: ControlType.String,
    defaultValue: Copyright.defaultProps.text,
    placeholder: 'Type something…',
  },
  color: {
    type: ControlType.Color,
    defaultValue: Copyright.defaultProps.color,
  },
  size: {
    type: ControlType.Number,
    defaultValue: Copyright.defaultProps.size,
  },
  font: {
    type: ControlType.String,
    defaultValue: Copyright.defaultProps.font,
  },
})

interface CopyrightProps {
  text: string
  color: string
  font: string
  size: number
}

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/components/auto-sizing
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */

export default function Copyright(props: CopyrightProps) {
  // This is a React component containing an Example component
  // Replace <Example /> with your own code

  return (
    <p
      style={{
        ...containerStyle,
        fontFamily: props.font,
        fontSize: props.size,
        color: props.color,
      }}
    >
      © {new Date().getFullYear()} {props.text}
    </p>
  )
}

// Styles are written in object syntax
// Learn more: https://reactjs.org/docs/dom-elements.html#style
const containerStyle = {
  height: '100%',
  display: 'flex',
  justifyContent: 'end',
  // alignItems: "center",
}
