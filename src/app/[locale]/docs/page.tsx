import { getTranslations } from "next-intl/server";

export default async function DocsPage() {
  const t = await getTranslations("Home"); 

  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-[4rem] font-bold mb-4 leading-tight">Documentation</h1>
      <p className="text-[1.5rem] text-white/60 mb-12 font-normal">
        Technical guides, API references, and architecture overviews for the AIL2 network.
      </p>

      <div id="intro" className="scroll-mt-40 mb-16">
        <h2 className="text-[2.5rem] font-bold mt-12 mb-6">Introduction to AIL2</h2>
        <p className="text-[1.125rem] text-white/60 mb-6 leading-relaxed">
          AIL2 is a Layer 2 scaling solution specifically designed for Artificial Intelligence workloads. It
          bridges the gap between massive compute requirements and distributed blockchain consensus, scaling
          intelligence to infinity.
        </p>
        <div className="note bg-theme/5 border-l-4 border-theme p-6 rounded-r-xl my-8">
          <p className="text-white/80 m-0">
            <strong className="text-white">Note:</strong> AIL2 Mainnet Beta is currently live. Developers can begin deploying models
            to our distributed GPU network immediately.
          </p>
        </div>
      </div>

      <div id="setup" className="scroll-mt-40 mb-16">
        <h2 className="text-[2.5rem] font-bold mt-12 mb-6">SDK Installation</h2>
        <p className="text-[1.125rem] text-white/60 mb-6 leading-relaxed">
          To begin building with AIL2, install our core SDK and peer dependencies:
        </p>
        <pre className="bg-black border border-white/10 p-6 rounded-xl overflow-x-auto mb-8">
          <code className="bg-transparent p-0 text-white font-mono">npm install @ail2/sdk ethers</code>
        </pre>
      </div>

      <div id="quickstart" className="scroll-mt-40 mb-16">
        <h2 className="text-[2.5rem] font-bold mt-12 mb-6">Ship in 5 Minutes</h2>
        <p className="text-[1.125rem] text-white/60 mb-6 leading-relaxed">
            Start building with a single API call once you have your <code className="bg-theme/10 text-theme px-1.5 py-0.5 rounded font-mono text-sm">project_id</code> from the developer
            console.
        </p>
        <pre className="bg-black border border-white/10 p-6 rounded-xl overflow-x-auto mb-8">
            <code className="bg-transparent p-0 text-white font-mono block leading-relaxed">
{`curl -X POST "https://api.ail2.network/v1/infer" \\
  -H "Authorization: Bearer $AIL2_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "p_123",
    "model_id": "nebula-ai",
    "input": {"prompt": "Explain zk-proof in 3 bullets"}
  }'`}
            </code>
        </pre>
      </div>

      <div id="poi" className="scroll-mt-40 mb-16">
        <h2 className="text-[2.5rem] font-bold mt-12 mb-6">Verifiable Inference (PoI)</h2>
        <p className="text-[1.125rem] text-white/60 mb-6 leading-relaxed">
            Ensuring that decentralized models return correct results. We utilize <strong className="text-white">Optimistic
            ZK-Rollups</strong> to cryptographically verify that the compute performed by an untrusted node
            matches the expected model execution path.
        </p>
        <h3 className="text-[1.5rem] text-theme font-bold mt-8 mb-4">The PoI protocol ensures:</h3>
        <ul className="list-disc pl-5 space-y-2 text-white/60 text-[1.125rem]">
            <li>Deterministic Execution</li>
            <li>Cryptographic Weight Verification</li>
            <li>Slashing conditions for dishonest nodes</li>
        </ul>
      </div>

      {/* Placeholders for other sections to avoid dead links */}
      <div id="state-channels" className="scroll-mt-40 mb-16 h-20"></div>
      <div id="tokenomics" className="scroll-mt-40 mb-16 h-20"></div>
      <div id="inference-api" className="scroll-mt-40 mb-16 h-20"></div>
      <div id="model-registry" className="scroll-mt-40 mb-16 h-20"></div>
      <div id="billing" className="scroll-mt-40 mb-16 h-20"></div>

    </div>
  );
}
