import {
    Typography,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    Box,
    Grid,
    Button,
    Slider,
    
  } from "@mui/material";
  import LoadingButton from '@mui/lab/LoadingButton';
  
  import { display } from "@mui/system";
  import React, { useEffect } from "react";
  import { useState } from "react";
  import { primaryGreen, primaryGrey } from "../Colors";
  import Strategy from "../models/Strategy";
  
  /**
   *
   * @param {Object} selectedUserGenres
   * @param updateGeneratedPlaylistCallback
   * @returns
   */
  
  function Strategies({ selectedUserGenres, updateGeneratedPlaylistCallback }) {
    const strategies = [
      new Strategy(
        "Smooth transition",
        "This is the description of smooth transition strategy which is very long bla bla bla bla bla ipsum lorem lore upsut",
        "st"
      ),
      new Strategy(
        "Take me away",
        "This is the description of Take me away strategy which is very long bla bla bla bla bla ipsum lorem lore upsut",
        "tma"
      ),
      new Strategy(
        "A little curious a little cautious",
        "This is the description of A little curious a little cautious strategy which is very long bla bla bla bla bla ipsum lorem lore upsut",
        "alc"
      ),
      new Strategy(
        "Random",
        "This is the description of Radnom strategy which is very long bla bla bla bla bla ipsum lorem lore upsut",
        "random"
      ),
    ];
    const [strategy, setStrategy] = useState();
    const [numberOfSongsPerGenre, setNumberOfSongsPerGenre] = useState(2);
    const [numberOfGenresToExplore, setNumberOfGenreToExplore] = useState(10);
    const [userGenres, setUserGenres] = useState(selectedUserGenres);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (selectedUserGenres == null) {
        setUserGenres([]);
      } else {
        setUserGenres(selectedUserGenres);
      }
    }, []);
  
    const generatePlaylist = () => {
      setIsLoading(true);
      const requestBody = {
        n_genres: numberOfGenresToExplore,
        n_songs_genre: numberOfSongsPerGenre,
        user_genres: Object.keys(userGenres),
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
  
      fetch(strategies[strategy].endpoint, requestOptions).then((response) => 
        response.json().then((data) => {
          updateGeneratedPlaylistCallback(JSON.parse(data));
          setIsLoading(false);
        })
      ).catch(e => {
        setIsLoading(false);
      });
    };
  
    const handleChange = (event) => {
      setStrategy(event.target.value);
    };
  
    const handleChangeSlider = (event, newValue) => {
      setNumberOfSongsPerGenre(newValue);
    };
    return (
      <div style={{ paddingTop: 100, height: "100%" }}>
        <Typography variant="h3" style={{ fontWeight: "bold", paddingLeft: 25 }}>
          Strategy
        </Typography>
        {userGenres == null || userGenres.length == 0 ? (
          <Typography>
            Please select one or more of your playlists in the panel to the left.
          </Typography>
        ) : (
          <Box
            sx={{ display: "flex", paddingTop: 5 }}
            flexDirection="column"
            alignItems="center"
          >
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel id="label-id">Select strategy...</InputLabel>
              <Select
                defaultValue={""}
                labelId="label-id"
                id="selector"
                value={strategy}
                label="Select strategy..."
                onChange={handleChange}
              >
                <MenuItem value={0}>Smooth transition</MenuItem>
                <MenuItem value={1}>Take me away</MenuItem>
                <MenuItem value={2}>A little cautious a little curious</MenuItem>
                <MenuItem value={3}>Random</MenuItem>
              </Select>
            </FormControl>
            <Typography width={300}>
              {"Number of genres collected: " +
                Object.keys(selectedUserGenres).length}
            </Typography>
            <Box width={300} flex="center" paddingTop={5}>
              <Typography id="slider-id" gutterBottom>
                Number of wanted songs per genre: {numberOfSongsPerGenre}
              </Typography>
              <Slider
                size="small"
                defaultValue={2}
                aria-label="Small"
                valueLabelDisplay="auto"
                min={1}
                max={10}
                onChange={handleChangeSlider}
                aria-labelledby="slider-id"
              />
              {strategy != null ? (
                <div>
                  <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
                  <Typography>{strategies[strategy].description}</Typography>
                </div>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        )}
  
        <Box
          sx={{
            position: "absolute",
            bottom: 65,
            left: 65,
            right: 65,
            paddingTop: 5,
          }}
        >
          <LoadingButton
            disabled={strategy == null}
            loading={isLoading}
            variant="contained"
            style={{
              width: 200,
              borderRadius: 200,
              backgroundColor: strategy == null ? "#FFFFF" : primaryGreen,
              color: "white",
            }}
            onClick={generatePlaylist}
          >
            <Box
              flexDirection="column"
              alignItems="center"
              sx={{ display: "flex", paddingLeft: 10, paddingRight: 10 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>GENERATE</Typography>
              <Typography sx={{ fontWeight: "bold" }}>PLAYLIST</Typography>
            </Box>
          </LoadingButton>
        </Box>
      </div>
    );
  }
  
  export default Strategies;
  