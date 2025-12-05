import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import { TwitterIcon } from "@/components/icons/Twitter";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { Locale } from "next-intl";

const Features = [
  {
    icon: "/images/accelerate-icon-1.png",
    title: "Technical Guidance",
    desc: "Get expert-guided integration and architecture review. Align your roadmap with ours.",
  },
  {
    icon: "/images/accelerate-icon-2.png",
    title: "Joint Marketing Promotion",
    desc: "Align marketing strategies with AIL2. Execute co-promotion across key channels.",
  },
  {
    icon: "/images/accelerate-icon-3.png",
    title: "Marketing and Fundraising Strategy Playbook",
    desc: "Develop ecosystem growth plans with the AIL2 team. Get referred to top-tier venture capitalists.",
  },
  {
    icon: "/images/accelerate-icon-6.png",
    title: "Partner Discounts",
    desc: "Accelerate with partner discounts. Access preferential services. Get key support.",
  },
  {
    icon: "/images/accelerate-icon-5.png",
    title: "Wellness Support",
    desc: "Join meditation courses and wellness activities. AIL2 redefines decentralized intelligence.",
  },
];

export default function AcceleratePage({
  params,
}: PageProps<"/[locale]/accelerate">) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);
  return (
    <PageLayout isShowFooter>
      <section className="relative w-full max-w-6xl mx-auto px-5 pb-20 flex flex-col md:flex-row items-center overflow-hidden">
        <div className="w-full md:w-[50%] space-y-6 z-10 text-center md:text-left mt-20 lg:mt-30">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Build Beyond Limits <br />
            with <span className="accelerate-ail2">AIL2</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-lg mx-auto md:mx-0">
            Accelerating the journey of the next wave of AI founders, propelling
            ideas forward with funding, expert guidance, and go-to-market
            support.
          </p>

          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <div className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer">
              Apply Now
            </div>
            <button className="px-7 py-3 btn2 w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base">
              Learn more
            </button>
          </div>
        </div>
        <div className="w-full md:w-[55%] mt-10 md:mt-0 flex justify-center md:justify-end relative">
          <Image
            src="/images/accelerate-rocket.png"
            alt="Rocket"
            width={1227}
            height={1315}
            className="w-full h-auto object-contain md:scale-150 md:translate-x-6 origin-center md:translate-y-40 lg:translate-y-50"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1512px] -z-10">
          <Image
            src="/images/accelerate-grid.png"
            alt="Grid Background"
            width={1512}
            height={255}
            className="w-full h-auto opacity-60"
          />
        </div>
      </section>
      <section className="py-12 md:py-24 px-5 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <Image
            src="/images/accelerate-ail2.png"
            alt="ail2"
            width={558}
            height={550}
          />
        </div>

        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center px-7 rounded-3xl border border-theme/40 bg-theme/10 text-lg">
            <Image
              src="/images/accelerate-s-ail2.png"
              alt="ail2"
              width={59}
              height={64}
            />
            <span className="pr-3">Who we are</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Leverage the AI Layer of AIL2 to <br />
            Accelerate the Future Development of <br />
            <span className="text-yellow-400">
              Artificial Intelligence.
            </span>{" "}
            Built for <br />
            Unlimited Scalability, Openness, and <br />
            Web3 Integration.
          </h2>
        </div>
      </section>
      <section className="py-12 md:py-24 px-5 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Features.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-2xl bg-white/3 transition duration-300 group"
            >
              <Image src={item.icon} width={60} height={60} alt="" />
              <h3 className="text-xl font-bold mb-3 mt-6">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
          <div className="p-8 rounded-2xl flex flex-col justify-center h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-transparent to-white/5 pointer-events-none" />
            <h2 className="text-5xl font-bold mb-4">AIL2</h2>
            <p className="text-gray-400 text-sm mb-8">
              Redefines how decentralized application is built, deployed, and
              scaled.
            </p>
            <button className="flex items-center justify-between w-full bg-theme/10 border border-theme/50 px-4 py-3 rounded-xl">
              <span className="text-theme">Follow us on</span>
              <TwitterIcon size={24} fill="white" />
            </button>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 px-5 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Image
          src="/images/accelerate-man.png"
          alt="man"
          width={570}
          height={647}
        />

        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Accelerate Decentralized AI <br />
            Development 100x
          </h2>
          <p className="text-gray-400">
            A platform designed to massively accelerate decentralized AI
            application development by providing fully decentralized and
            infinitely scalable AI models across multiple blockchains.
          </p>

          <ul className="space-y-6">
            {[
              "Decentralized & Scalable Core: Operates on a fully decentralized network with unlimited scalability for AI models.",
              "Developer Acceleration: Empowers developers to build decentralized AI applications 100 times faster.",
              "Multi-Chain Support: Provides native support for six major blockchains: ETH, BSC, GIWA, XLayer, Base, and Mantle.",
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                {text}
              </li>
            ))}
          </ul>

          <div className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base">
            Apply Now
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
