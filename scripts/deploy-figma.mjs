import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const SITES = {
  staging: {
    envFiles: [".env.staging-figma"],
    url: "https://pickup-staging.figma.site",
  },
  production: {
    envFiles: [".env.production-figma", ".env"],
    url: "https://pickup.figma.site",
  },
};

const target = process.argv[2] ?? "production";
const site = SITES[target];

if (!site) {
  console.error(
    "Usage: node scripts/deploy-figma.mjs [staging|production]\n" +
      "staging deploys WIP to pickup-staging without touching the main site.\n" +
      "production (default) deploys to pickup.figma.site.",
  );
  process.exit(1);
}

function readEnv(path) {
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    vars[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return vars;
}

function projectIdFrom(envFile) {
  const path = join(root, envFile);
  if (!existsSync(path)) return null;
  return readEnv(path).FIGMA_PROJECT_ID?.trim() || null;
}

function run(command, args, extraEnv = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...extraEnv },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function assertStandaloneBuild() {
  const buildId = join(root, ".next/BUILD_ID");
  const server = join(root, ".next/standalone/server.js");
  if (!existsSync(buildId) || !existsSync(server)) {
    console.error(
      "Figma Cloud needs a Next.js standalone build. Expected .next/BUILD_ID and .next/standalone/server.js after `npm run build`.",
    );
    process.exit(1);
  }
}

let envFile = null;
let projectId = null;
for (const candidate of site.envFiles) {
  const id = projectIdFrom(candidate);
  if (id) {
    envFile = candidate;
    projectId = id;
    break;
  }
}

if (!projectId) {
  console.error(
    `No FIGMA_PROJECT_ID for ${target}. Looked in ${site.envFiles.join(", ")}.`,
  );
  process.exit(1);
}

console.log(`Building Next.js standalone output for Figma Cloud (${target})…`);
run("npm", ["run", "build"], { FIGMA_EXTRACT_SCHEDULES: "true" });
assertStandaloneBuild();

console.log(`${envFile} — updating ${site.url}`);
run("npx", [
  "@payloadcms/figma@alpha",
  "deploy",
  "-y",
  "--skip-build",
  "--adapter",
  "nextjs",
  "--output",
  ".next",
  "--id",
  projectId,
]);

console.log(`Deployed ${target} → ${site.url}`);
console.log("The live URL usually takes 2–3 minutes to finish updating.");
