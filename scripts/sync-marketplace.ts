#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

function syncMarketplace() {
  const marketplacePath = resolve(
    projectRoot,
    ".claude-plugin/marketplace.json",
  );
  const marketplace = JSON.parse(readFileSync(marketplacePath, "utf-8"));

  for (const plugin of marketplace.plugins) {
    const pluginJsonPath = resolve(
      projectRoot,
      plugin.source,
      ".claude-plugin/plugin.json",
    );

    try {
      const pluginJson = JSON.parse(readFileSync(pluginJsonPath, "utf-8"));

      // Sync metadata from plugin.json to marketplace entry
      plugin.description = pluginJson.description;
      plugin.version = pluginJson.version;
      plugin.author = pluginJson.author;

      if (pluginJson.homepage) plugin.homepage = pluginJson.homepage;
      if (pluginJson.repository) plugin.repository = pluginJson.repository;
      if (pluginJson.license) plugin.license = pluginJson.license;
      if (pluginJson.keywords) plugin.keywords = pluginJson.keywords;
      if (pluginJson.category) plugin.category = pluginJson.category;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Failed to read ${pluginJsonPath}:`, message);
    }
  }

  writeFileSync(marketplacePath, JSON.stringify(marketplace, null, 2) + "\n");
  console.log("Marketplace synced successfully");
}

syncMarketplace();
