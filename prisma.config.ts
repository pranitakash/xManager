// ─── FC xManager — Prisma Configuration ─────────────────
// Required for Prisma 7+ database URL configuration

import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: path.join("prisma", "schema.prisma"),
});
