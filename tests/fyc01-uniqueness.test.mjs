import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fycFiles = [
  "app/lib/sccCopy.ts",
  "app/lib/tierSeoContent.ts",
  "app/lib/storeNap.ts",
  "app/visit/page.tsx",
  "app/hours/page.tsx",
];

function sentencesOf60(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 60);
}

test("new FYC SCC copy shares 0 sentences of 60+ chars with Preston/King Rock refs when present", () => {
  const fycText = fycFiles.map((f) => readFileSync(join(root, f), "utf8")).join("\n");
  const fycSentences = new Set(sentencesOf60(fycText));

  const peers = [
    "C:\\Users\\ADMIN\\Documents\\ChatGPT\\FLEET SEO PRE WORK\\worktrees\\grok-tpc01-scc-content\\lib\\content-hub.mjs",
    "C:\\Users\\ADMIN\\Desktop\\.worktrees\\_kr_ref\\app\\lib\\tierSeoContent.ts",
    "C:\\Users\\ADMIN\\Desktop\\.worktrees\\_kr_ref\\app\\lib\\storeNap.ts",
    "C:\\Users\\ADMIN\\Desktop\\.worktrees\\_kr_ref\\app\\visit\\page.tsx",
  ];

  const shared = [];
  for (const peer of peers) {
    if (!existsSync(peer)) continue;
    const peerSentences = sentencesOf60(readFileSync(peer, "utf8"));
    for (const s of peerSentences) {
      if (fycSentences.has(s)) shared.push({ peer, s });
    }
  }
  assert.equal(shared.length, 0, `shared sentences: ${JSON.stringify(shared, null, 2)}`);
});
