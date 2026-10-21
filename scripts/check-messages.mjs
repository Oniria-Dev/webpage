// Fails when messages/es.json and messages/en.json don't have exactly the same keys,
// so new copy (and its [COPY: …] gaps) never lands in one language only.
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

/** Every key path in a messages tree, walking nested objects and arrays ("a.b.0.c"). */
function paths(node, prefix = "") {
  if (node === null || typeof node !== "object") return [prefix]
  return Object.entries(node).flatMap(([k, v]) => paths(v, prefix ? `${prefix}.${k}` : k))
}

/** Paths in `a` that `b` lacks. */
const missing = (a, b) => {
  const have = new Set(paths(b))
  return paths(a).filter((p) => !have.has(p))
}

// Self-check on a tiny fixture: nested objects, arrays of objects, both directions.
assert.deepEqual(missing({ x: { y: 1 }, l: [{ t: 1, d: 1 }] }, { x: { y: 2 }, l: [{ t: 2 }] }), ["l.0.d"])
assert.deepEqual(missing({ x: 1 }, { x: 1, z: 1 }), [])
assert.deepEqual(missing({ x: 1, z: 1 }, { x: 1 }), ["z"])

const load = (lang) => JSON.parse(readFileSync(new URL(`../messages/${lang}.json`, import.meta.url), "utf8"))
const es = load("es")
const en = load("en")

const problems = [
  ...missing(es, en).map((p) => `missing in messages/en.json: ${p}`),
  ...missing(en, es).map((p) => `missing in messages/es.json: ${p}`),
]

if (problems.length) {
  console.error(problems.join("\n"))
  process.exit(1)
}
console.log(`messages: es and en match (${paths(es).length} keys)`)
