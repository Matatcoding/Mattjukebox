import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const playlists = [
    { name: "Emo", description: "List of Emo Songs" },
    { name: "Pop", description: "List of pop songs" },
    { name: "Punk", description: "List of punk songs" },
    { name: "Rap", description: "List of rap songs" },
    { name: "Jazz", description: "List of jazz songs" },
    { name: "City Pop", description: "List of city pop songs" },
    { name: "Anime", description: "List of anime songs" },
    { name: "Rock", description: "List of rock songs" },
    { name: "Classical", description: "List of classical songs" },
    { name: "Country", description: "List of country songs" },
  ];
  for (const playlist of playlists) {
    await seedPlaylist(playlist);
  }
  const tracks = [
    { name: "Emo", duration: 242 },
    { name: "Emo Pop", duration: 242 },
    { name: "Country", duration: 243 },
    { name: "Pop punk", duration: 240 },
    { name: "Pop Country", duration: 142 },
    { name: "Classical Jazz", duration: 600 },
    { name: "Jazz Rock", duration: 480 },
    { name: "Pop Rock", duration: 150 },
    { name: "Punk Rock", duration: 120 },
    { name: "Anime Classical", duration: 240 },
    { name: "Anime Jazz", duration: 500 },
    { name: "Jazz Rock Pop", duration: 285 },
    { name: "City Pop", duration: 190 },
    { name: "City Pop Anime Jazz", duration: 242 },
    { name: "Rock Anime", duration: 130 },
    { name: "Country Punk", duration: 120 },
    { name: "Rap", duration: 180 },
    { name: "Emo Rap", duration: 180 },
    { name: "Anime Rap", duration: 140 },
    { name: "Rap Country Pop", duration: 200 },
  ];
  for (const track of tracks) {
    await seedTrack(track);
  }
  const playlists_tracks = [
    { playlist_id: 1, tracks_id: 1 },
    { playlist_id: 1, tracks_id: 2 },
    { playlist_id: 2, tracks_id: 2 },
    { playlist_id: 2, tracks_id: 4 },
    { playlist_id: 3, tracks_id: 4 },
    { playlist_id: 2, tracks_id: 5 },
    { playlist_id: 10, tracks_id: 5 },
    { playlist_id: 5, tracks_id: 6 },
    { playlist_id: 9, tracks_id: 6 },
    { playlist_id: 5, tracks_id: 14 },
    { playlist_id: 6, tracks_id: 14 },
    { playlist_id: 7, tracks_id: 14 },
    { playlist_id: 7, tracks_id: 15 },
    { playlist_id: 8, tracks_id: 16 },
    { playlist_id: 4, tracks_id: 17 },
  ];
  for (const playlist_track of playlists_tracks) {
    await seedPlaylistTrack(playlist_track);
  }
}

async function seedPlaylist(playlist) {
  await db.query("INSERT INTO playlists (name, description) VALUES ($1, $2)", [
    playlist.name,
    playlist.description,
  ]);
}

async function seedTrack(track) {
  await db.query("INSERT INTO tracks (name, duration) VALUES ($1, $2)", [
    track.name,
    track.duration,
  ]);
}

async function seedPlaylistTrack(mapping) {
  await db.query(
    "INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2)",
    [mapping.playlist_id, mapping.tracks_id]
  );
}
