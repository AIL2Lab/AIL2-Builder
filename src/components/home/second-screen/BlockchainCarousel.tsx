'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { EthereumIcon } from "@/components/icons/Ethereum";
import { BnbIcon } from "@/components/icons/Bnb";
import { MantleIcon } from '@/components/icons/Mantle';
import { OkxIcon } from '@/components/icons/Okx';
import { GiwaIcon } from "@/components/icons/Giwa";
import useBreakpoint from '@/hooks/useBreakpoint';
import clsx from 'clsx';

const BlockchainCarousel = ({ autoPlay = true, interval = 2500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const breakpoint = useBreakpoint();
  const isPadAndPhone = breakpoint === 'xs'|| breakpoint === 'sm' || breakpoint === 'md' 
  // 区块链数据
  const blockchains = [
    {
      name: 'Ethereum',
      icon: <EthereumIcon size={isPadAndPhone ? 96 : 108} fill="var(--color-theme)" />,
      color: '#627EEA',
      bgColor: 'from-blue-500/20 to-purple-500/20',
    },
    {
      name: 'BSC',
      icon: <BnbIcon size={isPadAndPhone ? 66 : 96} fill="var(--color-theme)" />,
      color: '#F0B90B',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      name: 'GIWA',
      icon: <GiwaIcon size={isPadAndPhone ? 66 : 96} fill="var(--color-theme)" />,
      color: '#00D4FF',
      bgColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      name: 'XLayer',
      icon: <OkxIcon size={isPadAndPhone ? 84 : 96} fill="var(--color-theme)" />,
      color: '#FF6B6B',
      bgColor: 'from-red-500/20 to-pink-500/20'
    },
    {
      name: 'Base',
      icon: <div className={clsx(`rounded-xs bg-theme`, isPadAndPhone ? 'w-14 h-14' :'w-16 h-16 ')}></div>,
      color: '#0052FF',
      bgColor: 'from-blue-600/20 to-indigo-500/20'
    },
    {
      name: 'Mantle',
      icon: <MantleIcon size={isPadAndPhone ? 84:96} fill="var(--color-theme)" />,
      color: '#7B3FF2',
      bgColor: 'from-purple-500/20 to-pink-500/20'
    }
  ]

  // 计算总时间：进入动画(0.8s) + 停留(1s) + 退出动画(0.6s) = 2.4s
  const totalCycleTime = 1000 + 1500 + 600 // 2400ms

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % blockchains.length)
      }, totalCycleTime)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, autoPlay, blockchains.length])

  const getNextIndex = (index: number) => (index + 1) % blockchains.length

  const current = blockchains[currentIndex]
  const next = blockchains[getNextIndex(currentIndex)]

  return (
    <div className="relative w-3/4">
      <Image width={476} height={493} src="/images/Frame.png" alt="" />
      <AnimatePresence mode="wait">
            <motion.div
              key={`current-${currentIndex}`}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ 
                scale: 0.5, 
                y: '-10%',
                opacity: 0.6,
                filter: 'blur(2px)'
              }}
              animate={{ 
                scale: 1, 
                y: '10%',
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                  duration: 1.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
            >
              <div className="relative group">
                <div className='flex justify-center items-center'>{current.icon}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className='absolute inset-0 flex justify-center items-center'>
              <div className="relative group -top-1/8 scale-50 blur-xs opacity-50">
                <div className='flex justify-between items-center'>{next.icon}</div>
              </div>
          </div>
    </div>
  )
}

export default BlockchainCarousel
