'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { EthereumIcon } from "@/components/icons/Ethereum";
import { BnbIcon } from "@/components/icons/Bnb";
import { MantleIcon } from '@/components/icons/Mantle';
import { OkxIcon } from '@/components/icons/Okx';

const BlockchainCarousel = ({ autoPlay = true, interval = 2500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 区块链数据
  const blockchains = [
    {
      name: 'Ethereum',
      icon: <EthereumIcon size={96} fill="var(--color-theme)" />,
      color: '#627EEA',
      bgColor: 'from-blue-500/20 to-purple-500/20',
      
    },
    {
      name: 'BSC',
      icon: <BnbIcon size={96} fill="var(--color-theme)" />,
      color: '#F0B90B',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      name: 'GIWA',
      icon: <Image src="/images/giwa-logo.webp" className="w-2/3" width={81} height={103} alt="giwa" />,
      color: '#00D4FF',
      bgColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      name: 'XLayer',
      icon: <OkxIcon size={96} fill="var(--color-theme)" />,
      color: '#FF6B6B',
      bgColor: 'from-red-500/20 to-pink-500/20'
    },
    {
      name: 'Base',
      icon: <div className={`w-10 h-10 rounded-xs bg-white`}></div>,
      color: '#0052FF',
      bgColor: 'from-blue-600/20 to-indigo-500/20'
    },
    {
      name: 'Mantle',
      icon: <MantleIcon size={96} fill="var(--color-theme)" />,
      color: '#7B3FF2',
      bgColor: 'from-purple-500/20 to-pink-500/20'
    }
  ]
  useEffect(() => {
    if (autoPlay && !isTransitioning) {
      timeoutRef.current = setTimeout(() => {
        handleNext()
      }, interval)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, autoPlay, interval, isTransitioning])

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % blockchains.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + blockchains.length) % blockchains.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const getCurrentAndNext = () => {
    const current = blockchains[currentIndex]
    const next = blockchains[(currentIndex + 1) % blockchains.length]
    return { current, next }
  }

  const { current, next } = getCurrentAndNext()

  return (
    <div className="relative overflow-hidden w-fit">
      <div className="absolute inset-0">
        <Image width={476} height={493} src="/images/Frame.png" alt="" />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" /> */}
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-600 ease-out"
            style={{
              transform: isTransitioning ? 'translateY(20px) scale(0.9)' : 'translateY(0) scale(1)',
              opacity: isTransitioning ? 0 : 1,
              zIndex: 20
            }}
          >
            <div className="relative group">
              <div>{current.icon}</div>
            </div>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-600 ease-out"
            style={{
              transform: isTransitioning ? 'translateY(-20px) scale(1.1)' : 'translateY(-50px) scale(0.5)',
              opacity: isTransitioning ? 1 : 0.6,
              zIndex: 10
            }}
          >
            <div className="relative group">
              <div>{next.icon}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockchainCarousel
