// Comprueba que todos los idiomas tengan exactamente las mismas claves que messages/en.json
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "messages");
const load = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));

function flatten(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? flatten(v, `${prefix}${k}.`)
      : [`${prefix}${k}`]
  );
}

const reference = new Set(flatten(load("en.json")));
let failed = false;

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "en.json")) {
  const keys = new Set(flatten(load(file)));
  const missing = [...reference].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !reference.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`✗ ${file}`);
    missing.forEach((k) => console.error(`  falta:  ${k}`));
    extra.forEach((k) => console.error(`  sobra:  ${k}`));
  } else {
    console.log(`✓ ${file} (${keys.size} claves)`);
  }
}

process.exit(failed ? 1 : 0);

