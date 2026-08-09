import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const androidBuild = await readFile("android/build.gradle", "utf8");
const androidVersion = androidBuild.match(/^version = '([^']+)'$/m)?.[1];
const androidVersionName = androidBuild.match(
  /^\s+versionName "([^"]+)"$/m,
)?.[1];
const versions = [packageJson.version, androidVersion, androidVersionName];

if (versions.some((version) => version !== packageJson.version)) {
  console.error(
    `Version mismatch: package=${packageJson.version}, android=${androidVersion}, androidName=${androidVersionName}`,
  );
  process.exit(1);
}

console.log(`Version ${packageJson.version} is consistent`);
