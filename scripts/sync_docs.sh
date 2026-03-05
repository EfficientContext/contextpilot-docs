#!/usr/bin/env bash
#
# sync_docs.sh — Pull docs from ContextPilot repo and transform them
# for Docusaurus (add frontmatter, fix links, fix image paths).
#
# Usage:
#   ./scripts/sync_docs.sh                # clone from GitHub
#   ./scripts/sync_docs.sh /path/to/repo  # use a local checkout
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DOCS_DIR="$SITE_DIR/docs"

GITHUB_EXAMPLES="https://github.com/EfficientContext/ContextPilot/tree/main/examples/"

# ── Obtain ContextPilot source ──────────────────────────────────────
if [[ -n "${1:-}" && -d "${1:-}" ]]; then
  SRC_DIR="$1"
  echo "Using local ContextPilot repo: $SRC_DIR"
else
  TMPDIR="$(mktemp -d)"
  trap 'rm -rf "$TMPDIR"' EXIT
  echo "Cloning ContextPilot (shallow)..."
  git clone --depth 1 https://github.com/EfficientContext/ContextPilot.git "$TMPDIR/ContextPilot"
  SRC_DIR="$TMPDIR/ContextPilot"
fi

SRC_DOCS="$SRC_DIR/docs"

if [[ ! -d "$SRC_DOCS" ]]; then
  echo "ERROR: $SRC_DOCS does not exist" >&2
  exit 1
fi

# ── Copy images ─────────────────────────────────────────────────────
if [[ -d "$SRC_DOCS/images" ]]; then
  echo "Copying images..."
  cp -v "$SRC_DOCS/images/"* "$SITE_DIR/static/img/" 2>/dev/null || true
fi

# ── Process each markdown file ──────────────────────────────────────
find "$SRC_DOCS" -name '*.md' -type f | sort | while read -r src_file; do
  # Relative path under docs/ (e.g. getting_started/installation.md)
  rel_path="${src_file#"$SRC_DOCS/"}"

  # Skip files we don't want to sync
  basename="$(basename "$rel_path")"
  if [[ "$basename" == "README.md" ]]; then
    echo "Skipping $rel_path (README)"
    continue
  fi

  dest_file="$DOCS_DIR/$rel_path"

  # Skip intro.md — it's maintained manually with custom JSX/slug
  if [[ "$rel_path" == "intro.md" ]]; then
    echo "Skipping $rel_path (site-only)"
    continue
  fi

  echo "Processing $rel_path..."

  # Ensure destination directory exists
  mkdir -p "$(dirname "$dest_file")"

  # Derive id from filename (without extension)
  file_id="$(basename "$rel_path" .md)"

  # Extract title from first # heading
  file_title="$(grep -m 1 '^# ' "$src_file" | sed 's/^# //')"
  if [[ -z "$file_title" ]]; then
    file_title="$file_id"
  fi

  # sidebar_label: use title, but truncate if very long
  sidebar_label="$file_title"

  # Read file content (skip existing frontmatter if present)
  content="$(cat "$src_file")"
  if [[ "$content" == ---* ]]; then
    # Strip existing frontmatter
    content="$(echo "$content" | sed '1{/^---$/d}' | sed '1,/^---$/d')"
  fi

  # ── Transformations ─────────────────────────────────────────────

  # 1. Convert internal .md links: [text](file.md) → [text](file)
  #    Also handles [text](file.md#section) → [text](file#section)
  #    Only target relative links (not starting with http)
  content="$(echo "$content" | sed -E 's/\]\(([^)h][^)]*?)\.md(#[^)]+)?\)/](\1\2)/g')"

  # 2. Convert image paths: ../images/ → /img/
  content="$(echo "$content" | sed 's|../images/|/img/|g')"

  # 3. Convert example relative paths to GitHub URLs (in link targets)
  content="$(echo "$content" | sed "s|\.\./\.\./examples/|${GITHUB_EXAMPLES}|g")"

  # 4. Convert repo-root README links to GitHub URL
  content="$(echo "$content" | sed 's|\.\./\.\./README|https://github.com/EfficientContext/ContextPilot/blob/main/README|g')"

  # ── Write output with frontmatter ───────────────────────────────
  {
    echo "---"
    echo "id: $file_id"
    echo "title: \"$file_title\""
    echo "sidebar_label: \"$sidebar_label\""
    echo "---"
    echo ""
    echo "$content"
  } > "$dest_file"
done

echo ""
echo "Sync complete. Review changes with: git -C '$SITE_DIR' diff"
