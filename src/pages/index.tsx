import React, { useState } from 'react'
import { motion, useMotionValue, Variants, animate, MotionProps, EventInfo } from 'framer-motion'

export default function Home() {
  const [sequence, setSequence] = useState('end') // Change the initial value to 'end'
  const [isHovering, setIsHovering] = useState(false)

  interface ButtonState {
    [key: string]: boolean
  }

  const [buttons, setButtons] = useState<ButtonState>({
    '1': false,
    '2': false,
    '3': false,
  })
  /*
  async function handleHoverStart(e) {
    if (!buttons[e.target.id]) {
      setButtons({ ...buttons, [e.target.id]: true })
    }
  }
  async function handleHoverEnd(e) {
    if (buttons[e.target.id]) {
      setButtons({ ...buttons, [e.target.id]: false })
    }
  }


*/

  function handleHoverStart(event: MouseEvent, info: EventInfo) {
    const buttonId: string = (event.target as HTMLElement).id
    if (!buttons[buttonId]) {
      setButtons({ ...buttons, [buttonId]: true })
      const newButtonsState = Object.keys(buttons).reduce((acc: ButtonState, key: string) => {
        acc[String(key) as keyof ButtonState] = key === buttonId ? true : false
        return acc
      }, {})

      // Update the buttons state
      setButtons(newButtonsState)
    }
  }

  function handleHoverEnd(event: MouseEvent, info: EventInfo) {
    const buttonId: string = (event.target as HTMLElement).id
    if (buttons[buttonId]) {
      setButtons({ ...buttons, [buttonId]: false })
      // Create a new object with all button states set to false,
      // except for the selected button, which will keep its current state
      const newButtonsState = Object.keys(buttons).reduce((acc: ButtonState, key) => {
        acc[key] = false
        return acc
      }, {})

      // Update the buttons state
      setButtons(newButtonsState)
    }
  }
  console.log(buttons)

  const variants: Variants = {
    hover: {
      scale: 1.1,
      color: 'rgba(99,99,99)',
      transition: { scale: { duration: 0.5, repeat: Infinity, repeatType: 'mirror' }, color: { duration: 0.5 } },
    },
    inactive: {
      opacity: 0.5,
      transition: { opacity: { duration: 0.1 } },
    },
  }

  const x = useMotionValue(0)

  interface IAnimatedButton {
    id: string
  }
  function AnimatedButton({ id }: IAnimatedButton) {
    const isActive = buttons[id]
    return (
      <motion.button
        variants={variants}
        id={id}
        whileHover='hover'
        initial={!isActive && 'inactive'} // Change animation based on the button state
        onHoverStart={(e, info) => handleHoverStart(e, info)}
        onHoverEnd={(e, info) => handleHoverEnd(e, info)}
        className='rounded-xl text-blue-400 bg-orange-300 p-10 text-5xl flex flex-col justify-center items-center h-100'
      >
        Animate Me
      </motion.button>
    )
  }
  return (
    <main className='flex gap-8 justify-center items-center h-screen'>
      {['1', '2', '3'].map((num) => (
        <AnimatedButton id={num} />
      ))}
    </main>
  )
}

// How are we going to denote a selected button? useState?
// if selected, do this, otherwise, apply group styling
