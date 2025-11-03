'use client'

import { motion } from "motion/react";






export default function TestMotion() {
    return (
        <motion.ul animate={{ rotate: 360 }} className="w-25 h-25 bg-red-400" />
    )
}