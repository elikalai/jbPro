import db from "#db/client";

export async function createPlaylist(name, description) {
  const sql = `
  INSERT INTO playlists
    (name, description)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

export async function getPlaylistsByUserId(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE user_id = $1
  `;
  const {
     rows: playlists 
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

export async function getPlaylistByTrackId(id){
const sql = `
SELECT playlists.*
FROM 
playlists
JOIN playlist_tracks ON playlist.id = playlist_tracks.playlist_id
WHERE playlist_tracks.track_id = $1
`;
const {
  rows: [playlist]
} = await db.query(sql, [id]);
return playlist;
}
