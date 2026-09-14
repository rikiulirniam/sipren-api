const bcrypt = require("bcrypt");
const db = require("../utils/db");

const seedData = {
  users: [
    { username: "admin.local", nama: "Administrator Lokal", level: 1 },
    { username: "guru.local", nama: "Guru Lokal", level: 0 },
  ],
  jurusan: [
    { nama: "Teknik Jaringan Komputer dan Telekomunikasi", akronim: "TJKT" },
    { nama: "Teknik Mesin", akronim: "TM" },
  ],
  kelas: [
    { jurusan: "TJKT", tingkat: "X", noKelas: 1 },
    { jurusan: "TJKT", tingkat: "XI", noKelas: 1 },
    { jurusan: "TM", tingkat: "X", noKelas: 1 },
  ],
  mapel: [
    { nama: "Matematika", produktif: 0 },
    { nama: "Pemrograman Web", produktif: 1 },
  ],
  ruang: ["Lab Komputer 1", "Ruang Teori 1"],
  siswa: [
    { nis: 19001, rfid: "RFID-LOCAL-001", nama: "Budi Santoso", kelas: "TJKT-X-1" },
    { nis: 19002, rfid: "RFID-LOCAL-002", nama: "Siti Aminah", kelas: "TJKT-X-1" },
    { nis: 19003, rfid: "RFID-LOCAL-003", nama: "Andi Pratama", kelas: "TJKT-X-1" },
  ],
};

async function findOrInsert(client, selectQuery, selectValues, insertQuery, insertValues) {
  const existing = await client.query(selectQuery, selectValues);
  if (existing.rows.length > 0) return existing.rows[0];

  const inserted = await client.query(insertQuery, insertValues);
  return inserted.rows[0];
}

async function syncSequences(client) {
  const sequences = [
    ["jurusan_id_jurusan_seq", "jurusan", "id_jurusan"],
    ["kelas_id_kelas_seq", "kelas", "id_kelas"],
    ["mapel_id_mapel_seq", "mapel", "id_mapel"],
    ["ruang_id_ruang_seq", "ruang", "id_ruang"],
    ["siswa_nis_seq", "siswa", "nis"],
    ["user_id_user_seq", '"user"', "id_user"],
    ["jadwal_id_jadwal_seq", "jadwal", "id_jadwal"],
  ];

  for (const [sequence, table, column] of sequences) {
    await client.query(
      `SELECT setval('public.${sequence}', COALESCE((SELECT MAX(${column}) FROM ${table}), 0) + 1, false)`
    );
  }
}

async function seed() {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    await syncSequences(client);

    const password = await bcrypt.hash("password123", 10);
    const users = {};
    for (const user of seedData.users) {
      users[user.username] = await findOrInsert(
        client,
        'SELECT id_user FROM "user" WHERE username = $1',
        [user.username],
        'INSERT INTO "user" (username, nama, password, level) VALUES ($1, $2, $3, $4) RETURNING id_user',
        [user.username, user.nama, password, user.level]
      );
    }

    const jurusan = {};
    for (const item of seedData.jurusan) {
      jurusan[item.akronim] = await findOrInsert(
        client,
        "SELECT id_jurusan FROM jurusan WHERE akronim = $1",
        [item.akronim],
        "INSERT INTO jurusan (nama_jurusan, akronim) VALUES ($1, $2) RETURNING id_jurusan",
        [item.nama, item.akronim]
      );
    }

    const kelas = {};
    for (const item of seedData.kelas) {
      const key = `${item.jurusan}-${item.tingkat}-${item.noKelas}`;
      kelas[key] = await findOrInsert(
        client,
        "SELECT id_kelas FROM kelas WHERE id_jurusan = $1 AND tingkat = $2 AND no_kelas = $3",
        [jurusan[item.jurusan].id_jurusan, item.tingkat, item.noKelas],
        "INSERT INTO kelas (id_jurusan, tingkat, no_kelas) VALUES ($1, $2, $3) RETURNING id_kelas",
        [jurusan[item.jurusan].id_jurusan, item.tingkat, item.noKelas]
      );
    }

    const mapel = {};
    for (const item of seedData.mapel) {
      mapel[item.nama] = await findOrInsert(
        client,
        "SELECT id_mapel FROM mapel WHERE nama_mapel = $1",
        [item.nama],
        "INSERT INTO mapel (nama_mapel, produktif) VALUES ($1, $2) RETURNING id_mapel",
        [item.nama, item.produktif]
      );
    }

    const ruang = {};
    for (const nama of seedData.ruang) {
      ruang[nama] = await findOrInsert(
        client,
        "SELECT id_ruang FROM ruang WHERE nama_ruang = $1",
        [nama],
        "INSERT INTO ruang (nama_ruang) VALUES ($1) RETURNING id_ruang",
        [nama]
      );
    }

    for (const item of seedData.siswa) {
      await findOrInsert(
        client,
        "SELECT nis FROM siswa WHERE nis = $1 OR rfid = $2",
        [item.nis, item.rfid],
        "INSERT INTO siswa (nis, rfid, nama, id_kelas) VALUES ($1, $2, $3, $4) RETURNING nis",
        [item.nis, item.rfid, item.nama, kelas[item.kelas].id_kelas]
      );
    }

    await findOrInsert(
      client,
      "SELECT id_jadwal FROM jadwal WHERE id_kelas = $1 AND hari = $2 AND id_mapel = $3 AND id_user = $4",
      [kelas["TJKT-X-1"].id_kelas, "senin", mapel["Pemrograman Web"].id_mapel, users["guru.local"].id_user],
      "INSERT INTO jadwal (id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user, pecahan_absen) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_jadwal",
      [
        kelas["TJKT-X-1"].id_kelas,
        "senin",
        "07:00",
        "08:30",
        mapel["Pemrograman Web"].id_mapel,
        ruang["Lab Komputer 1"].id_ruang,
        users["guru.local"].id_user,
        "semua",
      ]
    );

    await client.query("COMMIT");
    console.log("Seeder berhasil dijalankan.");
    console.log("Akun lokal: admin.local / password123 dan guru.local / password123");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Seeder gagal:", error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await db.end();
  }
}

seed();