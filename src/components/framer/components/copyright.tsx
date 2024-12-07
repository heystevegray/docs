interface CopyrightProps {
  text: string
  color: string
  font: string
  size: number
}

export default function Copyright({ text = 'My LLC', color = 'text-foreground', font = '', size = 16 }: CopyrightProps) {
  return (
    <p
      style={{
        ...containerStyle,
        fontFamily: font,
        fontSize: size,
        color: color,
      }}
    >
      © {new Date().getFullYear()} {text}
    </p>
  )
}

// Styles are written in object syntax
// Learn more: https://reactjs.org/docs/dom-elements.html#style
const containerStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}
