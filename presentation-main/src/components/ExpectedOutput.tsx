interface ExpectedOutputProps {
  output: string;
  label?: string;
}

export function ExpectedOutput({ output, label = 'Expected Output' }: ExpectedOutputProps) {
  return (
    <div className="my-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block w-2 h-2 rounded-full bg-accent-500" />
        <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <pre className="bg-zinc-900 text-zinc-100 rounded-xl p-4 text-sm font-mono overflow-x-auto scrollbar-thin whitespace-pre-wrap">
        {output}
      </pre>
    </div>
  );
}
