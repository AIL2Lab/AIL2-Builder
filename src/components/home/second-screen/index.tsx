import Logo from "@/components/Logo";
import Image from "next/image";
import Circle from "./Circle";
import BlockchainCarousel from "./BlockchainCarousel";
export default function HomeSecondScreen() {
  return (
    <div className="container mx-auto lg:max-w-7xl md:my-24 lg:my-32">
      <div className="w-full relative">
        <div className="abc w-full">
          <Image
            className="flex lg:hidden"
            width={944}
            height={546}
            src="/images/Subtract-md.png"
            alt=""
          />
          <Image
            className="hidden lg:flex"
            width={1175}
            height={580}
            src="/images/Subtract.png"
            alt=""
          />
        </div>
        <div className="absolute w-full h-full left-0 top-0 flex justify-between">
          <div className="w-1/2 flex flex-col">
            <div className="flex flex-1 justify-center items-center px-12">
              <Image
                src="/svg/logo.svg"
                width={50}
                height={50}
                alt="logo"
                className="mr-4"
              />
              <h3 className="text-2xl md:text-3xl lg:text-4xl">
                Accelerate Decentralized AI Development 100x
              </h3>
            </div>
            <div className="flex-1 flex flex-col justify-center  px-12">
              <div>
                AI models run fully decentralized, with infinite scalability,
                empowering developers to accelerate decentralized AI application
                development by 100x across six blockchains: ETH, BSC, GIWA,
                XLayer, Base, and Mantle
              </div>
              <div className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5">
                Support AIL2 on X
              </div>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            {/* <Image width={476} height={493} src="/images/Frame.png" alt="" /> */}
            <BlockchainCarousel 
              autoPlay={true}
              interval={1000}
            />
          </div>
        </div>
      </div>
      <div className="mt-60">
        <Circle />
      </div>
    </div>
  );
}
