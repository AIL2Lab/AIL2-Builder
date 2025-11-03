import Image from "next/image";

const floats = [
  {
    name: "waterdrip",
    src: "/images/waterdrip.png",
    with: 132,
    height: 60,
    styles: {
      left: "-100px",
      top: "100px",
    },
  },
  {
    name: "jdi",
    src: "/images/jdi.png",
    with: 95,
    height: 70,
    styles: {
      right: "-100px",
      bottom: "100px",
    },
  },
  {
    name: "dbc",
    src: "/images/dbc.png",
    with: 78,
    height: 70,
    styles: {
      left: "50%",
      top: "30%",
    },
  },
  {
    name: "meezan",
    src: "/images/meezan.png",
    with: 84,
    height: 50,
    styles: {
      left: "0px",
      bottom: "20px",
      zIndex: -1
    },
  },
  {
    name: "primelink",
    src: "/images/primelink.png",
    with: 170,
    height: 60,
    styles: {
      right: "-110px",
      top: "80px",
      zIndex: -1
    },
  },
];
export default function HomeSeventhScreen() {
  return (
    <section className="container mx-auto lg:max-w-7xl md:my-24 lg:my-32 ">
      <div className="justify-center flex flex-col items-center mb-40">
        <div className="ai-l2-btn w-fit text-xl border border-theme/30 py-2.5 px-5 rounded-2x">
          Ecosystem Partners
        </div>
        <div className="mt-5 font-bold text-3xl">
          Join AIL2 Global community
        </div>
        <div className="mt-5 text-theme text-3xl font-normal">
          See the biggest AI L2 ecosystem
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-fit relative">
          <Image src="/images/bg-seven.png" alt="" width={772} height={772} />
          {floats.map((item, idx) => (
            <div
              key={idx}
              className="border-white/10 border-5 bg-white/5 w-60 h-24 absolute flex justify-center items-center rounded-xl backdrop-blur-lg"
              style={item.styles}
            >
              <Image
                src={item.src}
                alt={item.name}
                width={item.with}
                height={item.height}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
