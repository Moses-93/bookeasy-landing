import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

const MarkdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="scroll-mt-24 pt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="scroll-mt-24 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="scroll-mt-24 pt-5 text-base font-semibold tracking-tight text-slate-900 sm:text-xl"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base sm:leading-8"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc space-y-2 pl-6 text-slate-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal space-y-2 pl-6 text-slate-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="whitespace-pre-line text-sm leading-7 sm:text-base" {...props}>
      {children}
    </li>
  ),
  hr: ({ ...props }) => <hr className="my-7 border-slate-200" {...props} />,
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
      className="underline decoration-slate-400 underline-offset-2 hover:text-slate-900"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-slate-900" {...props}>
      {children}
    </strong>
  ),
};

export const SharedMarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return <ReactMarkdown components={MarkdownComponents}>{markdown}</ReactMarkdown>;
};
