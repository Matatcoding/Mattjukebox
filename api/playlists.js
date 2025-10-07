import {
  getPlaylists,
  createPlaylist,
  getTracksByPlaylistId,
} from "#db/queries/playlists";
import express from "express";
const router = express.Router();
export default router;

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.status(200).send(playlists);
  })
  .post(async (req, res) => {
    const { name, description } = req.body;
    const playlist = await createPlaylist(name, description);
    res.status(200).send(playlist);
  });

router.route("/:id").get(async (req, res) => {
  const playlist = await getPlaylistById(req.params.id);
  if (!playlist) return res.status(404).send("Playlist not found.");
  res.status(200).send(playlist);
});

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const tracks = await getTracksByPlaylistId(req.playlist.id);
    res.send(tracks);
  })
  .post(async (req, res) => {
    const { trackId } = req.body;
    if (!trackId) return res.status(400).send("Request body requires: trackId");

    const playlistTrack = await addTrackToPlaylist(req.playlist.id, trackId);
    res.status(200).send(playlistTrack);
  });
