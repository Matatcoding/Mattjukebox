import express from "express";
const app = express();
export default app;

app.use(express.json());

import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);
