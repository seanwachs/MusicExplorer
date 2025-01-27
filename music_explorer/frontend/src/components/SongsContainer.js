import React from "react";
import { useEffect } from "react";
import { Button, Grid, Typography, Box, List } from "@material-ui/core";
import { millisToMinutesAndSeconds, replace_special_characters } from "../Util";
import { primaryGrey, primaryGreyDark, primaryGreyLight } from "../Colors";
import Song from "../models/Song.js";

/**
 *
 * @param {List<Song>} tracks
 * @param {*} playSongCallback
 * @returns
 */
function SongsContainer({ tracks, playSongCallback }) {
  return (
    <List style={{ overflow: "auto", height: "90vh" }}>
      {console.log("tracks", tracks)}
      {tracks.map((track, index) => {
        return (
          <Grid item key={index}>
            <Box
              onClick={() => {
                playSongCallback(track.id);
              }}
              variant="conained"
              sx={{
                cursor: "pointer",
                backgroundColor: `${primaryGrey}`,
                "&:hover": {
                  backgroundColor: `${primaryGreyLight}`,
                },
                borderRadius: "200px",
                paddingLeft: "30px",
                paddingRight: "5px",
                margin: "15px",
                boxShadow:
                  "rgba(0, 0, 0, 0.03) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 4px 4px",
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid container item xs justifyContent={"center"}>
                  <img
                    src={track.image}
                    style={{
                      height: 60,
                      width: 60,
                      border: `2px solid ${primaryGreyDark}`,
                    }}
                  ></img>
                </Grid>
                <Grid
                  container
                  direction={"column"}
                  spacing={0}
                  item
                  justifyContent={"center"}
                  alignItems={"flex-start"}
                  xs={10}
                  style={{padding: 15}}
                >
                  <Grid item>
                    <Typography style={{ color: "white", fontWeight: "bold" }}>
                      {track.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {/*console.log(track)*/}
                    <Typography style={{ color: "white" }}>
                      {track.artists.map((artist, index) =>
                        index + 1 != track.artists.length
                          ? artist + ", "
                          : artist
                      )}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ color: "white" }}>
                      Genre: {replace_special_characters(track.genre, false)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Typography style={{ color: "white" }}>
                    {millisToMinutesAndSeconds(track.duration)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        );
      })}
    </List>
  );
}

export default SongsContainer;
