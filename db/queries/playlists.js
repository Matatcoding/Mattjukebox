import db from "#db/client";

export async function getPlaylists() {
  const sql = `
    SELECT *
    FROM playlists
    `;
  const {
    rows: [playlists],
  } = await db.query(sql);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
    SELECT *
    FROM playlists
    WHERE id = $1
    `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function createPlaylist({ name, description }) {
  const SQL = `
  INSERT INTO employees (name, description)
  VALUES($1, $2) RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(SQL, [name, description]);
  return playlist;
}

export async function getTracksByPlaylistId(playlistId) {
  const sql = `
    SELECT tracks.*
    FROM tracks
    JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id
    WHERE playlists_tracks.playlist_id = $1
  `;
  const { rows } = await db.query(sql, [playlistId]);
  return rows;
}

export async function addTrackToPlaylist(playlistId, trackId) {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return playlistTrack;
}
