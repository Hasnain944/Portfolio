"use client";
import { MotionConfig } from "framer-motion";

// Respects the visitor's "reduce motion" operating-system setting for every animation.
export default function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
