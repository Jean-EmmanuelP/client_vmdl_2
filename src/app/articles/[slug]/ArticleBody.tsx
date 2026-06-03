"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  content: string;
}

const DAVIS_EASE = [0.44, 0, 0.56, 1] as const;

function RevealBlock({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.35, ease: DAVIS_EASE }}
    >
      {children}
    </motion.div>
  );
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

function parseBlocks(raw: string): Block[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }
    if (line.startsWith("> ")) {
      const buf: string[] = [line.slice(2).trim()];
      i++;
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: "quote", text: buf.join(" ") });
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const buf: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("> ") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: buf.join(" ").trim() });
  }
  return blocks;
}

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-medium text-noir">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*")) {
      nodes.push(
        <em key={key++} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("[")) {
      const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/;
      const linkMatch = linkPattern.exec(token);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        const isExternal = /^https?:\/\//.test(url);
        nodes.push(
          <a
            key={key++}
            href={url}
            className="underline underline-offset-4 decoration-noir/30 hover:decoration-noir transition"
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {label}
          </a>
        );
      }
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes.length > 0 ? nodes : [text];
}

export default function ArticleBody({ content }: Props) {
  const blocks = parseBlocks(content);
  return (
    <div className="text-[15px] sm:text-[17px] leading-[1.8] font-light text-noir/85 space-y-5">
      {blocks.map((b, i) => {
        const inner = (() => {
          switch (b.type) {
            case "h2":
              return (
                <h2 className="text-[18px] sm:text-[22px] font-light text-noir mt-10 mb-2 leading-tight tracking-wide">
                  {renderInline(b.text)}
                </h2>
              );
            case "h3":
              return (
                <h3 className="text-[14px] sm:text-[16px] tracking-[0.15em] font-medium text-noir mt-6 mb-1">
                  {renderInline(b.text)}
                </h3>
              );
            case "ul":
              return (
                <ul className="list-disc pl-6 space-y-2 marker:text-noir/40">
                  {b.items.map((it, j) => (
                    <li key={j}>{renderInline(it)}</li>
                  ))}
                </ul>
              );
            case "ol":
              return (
                <ol className="list-decimal pl-6 space-y-2 marker:text-noir/40">
                  {b.items.map((it, j) => (
                    <li key={j}>{renderInline(it)}</li>
                  ))}
                </ol>
              );
            case "quote":
              return (
                <blockquote className="border-l-2 border-noir/40 pl-6 italic text-noir/75 my-8">
                  {renderInline(b.text)}
                </blockquote>
              );
            case "p":
            default:
              return <p>{renderInline(b.text)}</p>;
          }
        })();
        return (
          <RevealBlock key={i}>
            {inner}
          </RevealBlock>
        );
      })}
    </div>
  );
}
