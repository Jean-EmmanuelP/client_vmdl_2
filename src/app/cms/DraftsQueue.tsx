"use client";

import React, { useEffect, useState } from "react";
import MarkdownEditor from "./MarkdownEditor";

export interface DraftArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaDescription?: string;
  tags?: string[];
  publishedAt: string;
  author?: string;
  draftCreatedAt?: string;
  draftSource?: string;
}

export default function DraftsQueue({
  onCount,
}: {
  onCount?: (n: number) => void;
}) {
  const [drafts, setDrafts] = useState<DraftArticle[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [editing, setEditing] = useState<DraftArticle | null>(null);

  const fetchDrafts = async () => {
    setError(null);
    try {
      const token = sessionStorage.getItem("authToken");
      const r = await fetch("/api/drafts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = (await r.json()) as { drafts: DraftArticle[] };
      setDrafts(j.drafts);
      onCount?.(j.drafts.length);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const action = async (
    slug: string,
    body: { action: "publish" | "delete" | "update"; patch?: Partial<DraftArticle> }
  ) => {
    setBusySlug(slug);
    try {
      const token = sessionStorage.getItem("authToken");
      const r = await fetch("/api/drafts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, ...body }),
      });
      if (!r.ok) {
        const t = await r.text();
        throw new Error(t || `HTTP ${r.status}`);
      }
      await fetchDrafts();
    } catch (e) {
      alert(`Erreur : ${(e as Error).message}`);
    } finally {
      setBusySlug(null);
    }
  };

  if (drafts === null && !error) {
    return (
      <p className="text-sm text-noir/60">Chargement des brouillons…</p>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-700">
        Impossible de charger les brouillons : {error}
        <button
          onClick={fetchDrafts}
          className="ml-3 underline"
        >
          réessayer
        </button>
      </div>
    );
  }

  if (editing) {
    return (
      <DraftEditor
        draft={editing}
        onCancel={() => setEditing(null)}
        onSave={async (patch) => {
          await action(editing.slug, { action: "update", patch });
          setEditing(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-noir/70">
          {(drafts || []).length === 0
            ? "Aucun brouillon en attente. Le pipeline en générera un nouveau dans les 48 prochaines heures."
            : `${drafts!.length} brouillon${drafts!.length > 1 ? "s" : ""} en attente de relecture.`}
        </p>
        <button
          onClick={fetchDrafts}
          className="text-xs uppercase tracking-wider underline text-noir/60 hover:text-noir"
        >
          Rafraîchir
        </button>
      </div>

      {(drafts || []).length > 0 && (
        <ul className="border-t border-black/10">
          {drafts!.map((d) => (
            <li
              key={d.slug}
              className="py-4 border-b border-black/10 flex flex-col gap-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-noir/45">
                    {d.draftSource || "auto"} · généré{" "}
                    {d.draftCreatedAt
                      ? new Date(d.draftCreatedAt).toLocaleDateString("fr-FR")
                      : "—"}
                  </p>
                  <h4 className="text-base font-medium mt-1">{d.title}</h4>
                  <p className="text-xs text-noir/55 mt-0.5">/{d.slug}</p>
                </div>
              </div>

              {d.excerpt && (
                <p className="text-sm text-noir/75 leading-relaxed">{d.excerpt}</p>
              )}

              {d.tags && d.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {d.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-wider border border-noir/15 px-2 py-0.5 text-noir/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <details className="text-xs">
                <summary className="cursor-pointer text-noir/60 hover:text-noir">
                  Aperçu du contenu ({d.content.length} caractères)
                </summary>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-[12px] leading-relaxed text-noir/80 bg-noir/[0.03] p-3 max-h-72 overflow-auto">
                  {d.content}
                </pre>
              </details>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  disabled={busySlug === d.slug}
                  onClick={() => setEditing(d)}
                  className="px-3 py-1.5 text-xs uppercase tracking-wider border border-noir/30 hover:bg-noir hover:text-blanc transition disabled:opacity-50"
                >
                  Modifier
                </button>
                <button
                  disabled={busySlug === d.slug}
                  onClick={() =>
                    confirm(`Publier « ${d.title} » sur le site ?`) &&
                    action(d.slug, { action: "publish" })
                  }
                  className="px-3 py-1.5 text-xs uppercase tracking-wider bg-noir text-blanc hover:opacity-80 transition disabled:opacity-50"
                >
                  {busySlug === d.slug ? "…" : "Publier"}
                </button>
                <button
                  disabled={busySlug === d.slug}
                  onClick={() =>
                    confirm(`Supprimer définitivement « ${d.title} » ?`) &&
                    action(d.slug, { action: "delete" })
                  }
                  className="px-3 py-1.5 text-xs uppercase tracking-wider border border-red-500/40 text-red-700 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DraftEditor({
  draft,
  onSave,
  onCancel,
}: {
  draft: DraftArticle;
  onSave: (patch: Partial<DraftArticle>) => Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(draft.title);
  const [excerpt, setExcerpt] = useState(draft.excerpt);
  const [content, setContent] = useState(draft.content);
  const [tags, setTags] = useState((draft.tags || []).join(", "));
  const [meta, setMeta] = useState(draft.metaDescription || "");
  const [saving, setSaving] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium uppercase tracking-wider">
          Modifier le brouillon
        </h3>
        <button
          onClick={onCancel}
          className="text-xs underline text-noir/60 hover:text-noir"
        >
          Annuler
        </button>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-noir/60 mb-1">
          Titre
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-noir/60 mb-1">
          Résumé
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir resize-y"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-noir/60 mb-1">
          Contenu de l&apos;article
        </label>
        <MarkdownEditor value={content} onChange={setContent} rows={24} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-noir/60 mb-1">
            Tags (séparés par virgule)
          </label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-noir/60 mb-1">
            Description SEO
          </label>
          <input
            value={meta}
            maxLength={170}
            onChange={(e) => setMeta(e.target.value)}
            className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            try {
              await onSave({
                title: title.trim(),
                excerpt: excerpt.trim(),
                content,
                tags: tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
                metaDescription: meta.trim(),
              });
            } finally {
              setSaving(false);
            }
          }}
          className="px-5 py-2 bg-noir text-blanc text-xs uppercase tracking-wider hover:bg-noir/80 transition disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer le brouillon"}
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2 border border-noir/30 text-xs uppercase tracking-wider hover:bg-noir hover:text-blanc transition"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
