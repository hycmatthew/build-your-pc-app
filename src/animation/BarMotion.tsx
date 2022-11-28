import React from 'react'
import { motion, Variants } from 'framer-motion'

const cardVariants: Variants = {
  offscreen: {
    x: -250,
  },
  onscreen: {
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.8,
    },
  },
}

type BarMotionProp = {
  children: JSX.Element
}

function BarMotion({ children }: BarMotionProp) {
  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div className="card" variants={cardVariants}>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default BarMotion
