"use client";

import React, { useEffect, useState } from "react";
import MarkdownEditor from "./MarkdownEditor";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
  metaDescription?: string;
}

interface Props {
  articles: Article[];
  onChange: (articles: Article[]) => void;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

const todayIso = () => new Date().toISOString().slice(0, 10);

const emptyArticle = (): Article => ({
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  publishedAt: todayIso(),
  author: "Vincent Machado Da Luz",
  tags: [],
  metaDescription: "",
});

export default function ArticlesManager({ articles, onChange }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<Article>(emptyArticle());
  const [tagsInput, setTagsInput] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (editingIndex === null) return;
    const a = articles[editingIndex];
    if (!a) return;
    setDraft(a);
    setTagsInput((a.tags || []).join(", "));
    setAutoSlug(false);
  }, [editingIndex, articles]);

  const startNew = () => {
    setEditingIndex(-1);
    setDraft(emptyArticle());
    setTagsInput("");
    setAutoSlug(true);
  };

  const cancel = () => {
    setEditingIndex(null);
    setDraft(emptyArticle());
    setTagsInput("");
    setAutoSlug(true);
  };

  const save = () => {
    if (!draft.title.trim()) {
      alert("Le titre est obligatoire.");
      return;
    }
    if (!draft.content.trim()) {
      alert("Le contenu de l'article est obligatoire.");
      return;
    }
    let slug = draft.slug.trim() || slugify(draft.title);
    if (!slug) {
      alert("Impossible de générer un identifiant URL pour cet article.");
      return;
    }
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const finalised: Article = {
      ...draft,
      slug,
      tags,
      publishedAt: draft.publishedAt || todayIso(),
    };

    let next: Article[];
    if (editingIndex === -1 || editingIndex === null) {
      const collision = articles.some((a) => a.slug === slug);
      if (collision) {
        alert(
          `L'identifiant URL "${slug}" est déjà utilisé. Modifiez-le manuellement.`
        );
        return;
      }
      next = [...articles, finalised];
    } else {
      const collision = articles.some(
        (a, i) => a.slug === slug && i !== editingIndex
      );
      if (collision) {
        alert(
          `L'identifiant URL "${slug}" est déjà utilisé. Modifiez-le manuellement.`
        );
        return;
      }
      next = articles.map((a, i) => (i === editingIndex ? finalised : a));
    }
    onChange(next);
    cancel();
  };

  const remove = (index: number) => {
    const a = articles[index];
    if (!confirm(`Supprimer définitivement "${a.title}" ?`)) return;
    onChange(articles.filter((_, i) => i !== index));
    if (editingIndex === index) cancel();
  };

  const onTitleChange = (value: string) => {
    setDraft((d) => ({
      ...d,
      title: value,
      slug: autoSlug ? slugify(value) : d.slug,
    }));
  };

  const isEditing = editingIndex !== null;

  return (
    <div className="w-full">
      {!isEditing && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-noir/70">
              {articles.length === 0
                ? "Aucun article publié pour le moment."
                : `${articles.length} article${articles.length > 1 ? "s" : ""} publié${articles.length > 1 ? "s" : ""}.`}
            </p>
            <button
              onClick={startNew}
              className="px-4 py-2 bg-noir text-blanc text-xs sm:text-sm uppercase tracking-wider hover:bg-noir/80 transition"
            >
              + Nouvel article
            </button>
          </div>

          <ul className="border-t border-black/10">
            {articles.map((a, i) => (
              <li
                key={a.slug + i}
                className="py-3 border-b border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-noir/50">
                    {a.publishedAt}
                  </p>
                  <p className="text-sm sm:text-base font-medium truncate">
                    {a.title}
                  </p>
                  <p className="text-xs text-noir/50 truncate">/{a.slug}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditingIndex(i)}
                    className="px-3 py-1 text-xs uppercase tracking-wider border border-noir/30 hover:bg-noir hover:text-blanc transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => remove(i)}
                    className="px-3 py-1 text-xs uppercase tracking-wider border border-red-500/40 text-red-700 hover:bg-red-500 hover:text-white transition"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isEditing && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm sm:text-base font-medium uppercase tracking-wider">
              {editingIndex === -1 ? "Nouvel article" : "Modifier l'article"}
            </h3>
            <button
              onClick={cancel}
              className="text-xs underline text-noir/60 hover:text-noir"
            >
              Annuler
            </button>
          </div>

          <Field label="Titre">
            <input
              type="text"
              value={draft.title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir"
              placeholder="Titre de l'article"
            />
          </Field>

          <Field
            label="Identifiant URL (slug)"
            help="Affiché dans l'adresse : vmdl.ai/articles/votre-slug"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={draft.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  setDraft((d) => ({ ...d, slug: slugify(e.target.value) }));
                }}
                className="flex-1 border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir font-mono"
                placeholder="exemple-de-slug"
              />
              <button
                type="button"
                onClick={() => {
                  setAutoSlug(true);
                  setDraft((d) => ({ ...d, slug: slugify(d.title) }));
                }}
                className="px-3 py-2 border border-noir/20 text-xs uppercase tracking-wider hover:bg-noir hover:text-blanc transition"
              >
                Auto
              </button>
            </div>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Date de publication">
              <input
                type="date"
                value={draft.publishedAt}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, publishedAt: e.target.value }))
                }
                className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir"
              />
            </Field>
            <Field label="Auteur">
              <input
                type="text"
                value={draft.author || ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, author: e.target.value }))
                }
                className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir"
              />
            </Field>
          </div>

          <Field
            label="Résumé (excerpt)"
            help="Court paragraphe affiché sur la page liste"
          >
            <textarea
              value={draft.excerpt}
              onChange={(e) =>
                setDraft((d) => ({ ...d, excerpt: e.target.value }))
              }
              rows={3}
              className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir resize-y"
              placeholder="Quelques lignes pour donner envie de lire l'article."
            />
          </Field>

          <Field
            label="Contenu de l'article"
            help="Sélectionnez du texte puis cliquez sur un bouton de mise en forme. Aperçu en direct à droite."
          >
            <MarkdownEditor
              value={draft.content}
              onChange={(next) => setDraft((d) => ({ ...d, content: next }))}
              placeholder={`Commencez à écrire votre article…\n\nUtilisez les boutons au-dessus pour mettre en forme.`}
            />
          </Field>

          <Field
            label="Mots-clés"
            help="Séparés par des virgules. Utiles pour le référencement Google."
          >
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir"
              placeholder="droit du sport, contentieux, footballeur"
            />
          </Field>

          <Field
            label="Description SEO (méta)"
            help="155 caractères max. Affichée dans les résultats Google."
          >
            <textarea
              value={draft.metaDescription || ""}
              onChange={(e) =>
                setDraft((d) => ({ ...d, metaDescription: e.target.value }))
              }
              maxLength={170}
              rows={2}
              className="w-full border border-noir/20 px-3 py-2 text-sm focus:outline-none focus:border-noir resize-y"
            />
            <p className="text-xs text-noir/50 mt-1">
              {(draft.metaDescription || "").length} / 155
            </p>
          </Field>

          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              className="px-5 py-2 bg-noir text-blanc text-xs sm:text-sm uppercase tracking-wider hover:bg-noir/80 transition"
            >
              {editingIndex === -1 ? "Créer l'article" : "Enregistrer"}
            </button>
            <button
              onClick={cancel}
              className="px-5 py-2 border border-noir/30 text-xs sm:text-sm uppercase tracking-wider hover:bg-noir hover:text-blanc transition"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  help,
  children,
}: {
  label: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-noir/60 mb-1">
        {label}
      </label>
      {children}
      {help && <p className="text-xs text-noir/50 mt-1">{help}</p>}
    </div>
  );
}
