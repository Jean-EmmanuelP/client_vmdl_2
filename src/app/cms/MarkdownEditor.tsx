"use client";

import React, { useRef } from "react";
import ArticleBody from "../articles/[slug]/ArticleBody";

interface Props {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
}

type ButtonAction = {
  label: string;
  hint: string;
  apply: (selected: string) => { wrapped: string; cursorOffset: number };
};

const ACTIONS: ButtonAction[] = [
  {
    label: "Titre",
    hint: "Grand titre de section",
    apply: (s) => ({
      wrapped: `## ${s || "Votre titre"}`,
      cursorOffset: s ? 0 : -("Votre titre".length),
    }),
  },
  {
    label: "Sous-titre",
    hint: "Sous-titre",
    apply: (s) => ({
      wrapped: `### ${s || "Votre sous-titre"}`,
      cursorOffset: s ? 0 : -("Votre sous-titre".length),
    }),
  },
  {
    label: "Gras",
    hint: "Texte en gras",
    apply: (s) => ({
      wrapped: `**${s || "texte en gras"}**`,
      cursorOffset: s ? 0 : -("texte en gras".length + 2),
    }),
  },
  {
    label: "Italique",
    hint: "Texte en italique",
    apply: (s) => ({
      wrapped: `*${s || "texte en italique"}*`,
      cursorOffset: s ? 0 : -("texte en italique".length + 1),
    }),
  },
  {
    label: "Liste",
    hint: "Liste à puces",
    apply: (s) => {
      if (!s) {
        return {
          wrapped: `- premier point\n- deuxième point\n- troisième point`,
          cursorOffset: -("- premier point\n- deuxième point\n- troisième point".length),
        };
      }
      const items = s.split("\n").map((l) => `- ${l}`).join("\n");
      return { wrapped: items, cursorOffset: 0 };
    },
  },
  {
    label: "Liste numérotée",
    hint: "Liste numérotée",
    apply: (s) => {
      if (!s) {
        return {
          wrapped: `1. premier point\n2. deuxième point\n3. troisième point`,
          cursorOffset: -("1. premier point\n2. deuxième point\n3. troisième point".length),
        };
      }
      const items = s
        .split("\n")
        .map((l, i) => `${i + 1}. ${l}`)
        .join("\n");
      return { wrapped: items, cursorOffset: 0 };
    },
  },
  {
    label: "Citation",
    hint: "Bloc de citation",
    apply: (s) => ({
      wrapped: `> ${s || "Texte cité"}`,
      cursorOffset: s ? 0 : -("Texte cité".length),
    }),
  },
];

export default function MarkdownEditor({
  value,
  onChange,
  placeholder,
  rows = 22,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const applyAction = (action: ButtonAction) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = value.slice(0, start);
    const selected = value.slice(start, end);
    const after = value.slice(end);

    const { wrapped, cursorOffset } = action.apply(selected);

    // Smart spacing: heading/list/quote should start on a new paragraph.
    const needsLeadingNewlines =
      /^(##|###|>|-|\d+\.)\s/.test(wrapped) &&
      before.length > 0 &&
      !before.endsWith("\n\n");
    const lead = needsLeadingNewlines
      ? before.endsWith("\n")
        ? "\n"
        : "\n\n"
      : "";
    const trail =
      /^(##|###|>|-|\d+\.)\s/.test(wrapped) &&
      after.length > 0 &&
      !after.startsWith("\n")
        ? "\n\n"
        : "";

    const newValue = before + lead + wrapped + trail + after;
    onChange(newValue);

    // Restore focus + selection after React re-render.
    requestAnimationFrame(() => {
      const ta2 = textareaRef.current;
      if (!ta2) return;
      const insertedEnd = before.length + lead.length + wrapped.length;
      const targetPos = insertedEnd + cursorOffset;
      ta2.focus();
      if (selected) {
        ta2.setSelectionRange(
          before.length + lead.length,
          insertedEnd
        );
      } else {
        ta2.setSelectionRange(targetPos, targetPos);
      }
    });
  };

  const insertLink = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);

    const url = window.prompt(
      "Adresse du lien (https://…)",
      selected.startsWith("http") ? selected : "https://"
    );
    if (!url) return;

    const linkText = selected && !selected.startsWith("http")
      ? selected
      : window.prompt("Texte du lien (visible) :", "cliquer ici") || "cliquer ici";

    const wrapped = `[${linkText}](${url})`;
    const newValue =
      value.slice(0, start) + wrapped + value.slice(end);
    onChange(newValue);
    requestAnimationFrame(() => {
      const ta2 = textareaRef.current;
      if (!ta2) return;
      ta2.focus();
      const pos = start + wrapped.length;
      ta2.setSelectionRange(pos, pos);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-1.5 border border-noir/15 bg-noir/[0.04] p-2">
          {ACTIONS.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => applyAction(a)}
              title={a.hint}
              className="px-3 py-1.5 text-[11px] uppercase tracking-wider bg-blanc border border-noir/15 hover:bg-noir hover:text-blanc transition"
            >
              {a.label}
            </button>
          ))}
          <button
            type="button"
            onClick={insertLink}
            title="Insérer un lien hypertexte"
            className="px-3 py-1.5 text-[11px] uppercase tracking-wider bg-blanc border border-noir/15 hover:bg-noir hover:text-blanc transition"
          >
            Lien
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir resize-y font-mono leading-relaxed"
        />
        <p className="text-[11px] text-noir/45 italic">
          Astuce : sélectionnez du texte avant de cliquer un bouton pour
          l&apos;appliquer à la sélection.
        </p>
      </div>

      <div className="border border-noir/15 bg-blanc px-5 py-4 overflow-y-auto max-h-[640px] font-riviera">
        <p className="uppercase text-[10px] tracking-[0.3em] text-noir/40 mb-3 pb-2 border-b border-noir/10">
          Aperçu — comme sur le site
        </p>
        {value.trim() ? (
          <ArticleBody content={value} />
        ) : (
          <p className="text-sm text-noir/40 italic">
            L&apos;aperçu apparaîtra ici dès que vous commencerez à écrire.
          </p>
        )}
      </div>
    </div>
  );
}
