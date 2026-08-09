import postgres from "postgres";

declare global {
  var __sql: ReturnType<typeof postgres> | undefined;
}

/**
 * Single shared connection, cached on `global` in dev so Next's hot-reload
 * doesn't open a fresh pool against Neon on every module reload.
 * `prepare: false` because Neon's pooled connection (PgBouncer, transaction
 * mode) doesn't support prepared statements.
 */
export const sql =
  global.__sql ??
  postgres(process.env.DATABASE_URL!, {
    ssl: "require",
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  global.__sql = sql;
}
