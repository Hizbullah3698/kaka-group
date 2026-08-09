import { config } from "dotenv";

config({ path: ".env.local" });

import postgres from "postgres";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set (expected in .env.local)");
  }

  const sql = postgres(databaseUrl, { ssl: "require" });

  await sql`
    create table if not exists enquiries (
      id uuid primary key default gen_random_uuid(),
      name text not null,
      email text not null,
      phone text,
      division text not null,
      message text,
      created_at timestamptz not null default now()
    )
  `;

  console.log("Migration complete: `enquiries` table is ready.");
  await sql.end();
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
