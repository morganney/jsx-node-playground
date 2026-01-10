import { reactJsx } from '@knighted/jsx/react'
import { stableSelectors } from './button.css.knighted-css.js'

import './button.css'

type ButtonProps = {
  label: string
  onClick?: () => void
}

const defaultOnClick = () => {
  alert('Button clicked')
}

export const Button = ({ label, onClick = defaultOnClick }: ButtonProps) =>
  reactJsx`<button class=${stableSelectors.button} onClick=${onClick}>${label}</button>`
