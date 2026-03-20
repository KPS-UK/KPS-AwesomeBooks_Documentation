'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
};

export default function Reveal({ children, direction = 'up', delay = 0, className }: RevealProps) {
  const offset = offsets[direction];
  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
