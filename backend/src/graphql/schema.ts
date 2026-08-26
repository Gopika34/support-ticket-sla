import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

export const typeDefs = readFileSync(
    path.join(currentDirectory, "schema", "schema.graphql"),
    "utf8",
);