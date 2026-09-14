const db = require("../utils/db");

async function migrate() {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    await client.query(`
      ALTER TABLE presensi
        ADD COLUMN IF NOT EXISTS id_jadwal integer,
        ADD COLUMN IF NOT EXISTS presensi_mulai timestamp without time zone,
        ADD COLUMN IF NOT EXISTS presensi_selesai timestamp without time zone
    `);
    await client.query(`
      ALTER TABLE presensi
        ALTER COLUMN id_user DROP NOT NULL,
        ALTER COLUMN id_kelas DROP NOT NULL,
        ALTER COLUMN jam_started DROP NOT NULL,
        ALTER COLUMN jam_ended DROP NOT NULL,
        ALTER COLUMN id_mapel DROP NOT NULL
    `);
    await client.query(`
      ALTER TABLE det_presensi
        ADD COLUMN IF NOT EXISTS deskripsi_keterangan character varying(255)
    `);
    await client.query(`
      UPDATE presensi p
      SET id_jadwal = j.id_jadwal
      FROM jadwal j
      WHERE p.id_jadwal IS NULL
        AND p.id_user = j.id_user
        AND p.id_kelas = j.id_kelas
        AND p.id_mapel = j.id_mapel
    `);
      await client.query(`
        UPDATE presensi p
        SET id_user = j.id_user,
          id_kelas = j.id_kelas,
          jam_started = COALESCE(p.jam_started, EXTRACT(HOUR FROM p.presensi_mulai)::integer)
        FROM jadwal j
        WHERE p.id_jadwal = j.id_jadwal
        AND (p.id_user IS NULL OR p.id_kelas IS NULL OR p.jam_started IS NULL)
      `);
    await client.query(`
      UPDATE presensi
      SET presensi_mulai = COALESCE(created_at, CURRENT_TIMESTAMP)
      WHERE presensi_mulai IS NULL
    `);
    await client.query(`
      UPDATE presensi
      SET presensi_selesai = presensi_mulai
      WHERE presensi_selesai IS NULL AND jam_ended IS NOT NULL
    `);
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'presensi_jadwal_foreign'
        ) THEN
          ALTER TABLE presensi
            ADD CONSTRAINT presensi_jadwal_foreign
            FOREIGN KEY (id_jadwal) REFERENCES jadwal(id_jadwal);
        END IF;
      END $$;
    `);
    await client.query("COMMIT");
    console.log("Migrasi struktur presensi berhasil.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Migrasi presensi gagal:", error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await db.end();
  }
}

migrate();
