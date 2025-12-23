export const CodeBlock = ({ code, language = 'typescript' }: { code: string, language?: string }) => (
  <div className="bg-[#0d0d0d] rounded-lg border border-gray-800 overflow-hidden font-mono text-sm my-4 group shadow-2xl">
    <div className="flex items-center px-4 py-2 bg-[#1a1a1a] border-b border-gray-800 gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
      <div className="ml-auto text-xs text-gray-500">{language}</div>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="text-gray-300 whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  </div>
);