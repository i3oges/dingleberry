# dingleberry

A discord bot for everyone! Completely open-source means you run it for yourself!

# Prerequisite

[Discord API Access](https://discordapp.com/developers/docs/intro)

[imgur API Access](https://apidocs.imgur.com/)

## Run with Docker

[Docker](https://www.docker.com/)

## Run with Nodejs

install ffmpeg (for playing videos)
npm i -g ffmpeg-binaries

[^Node.js 14.4.0](https://nodejs.org/)

You will need a discord and an imgur api token in order for the bot to work properly, you can add them in the next step

# Installation

Dingleberg requires some environment variable to be set, you can find them in the `.env.example` file.

- if running with node, copy them into a new file called .env and fill in their values.
- if running with docker, make them available to your docker environment

Then authorize your discord bot on your server if you haven't already

Download dependencies:

    npm i

Run the bot!

    npm start

And you're good to go!

# Commands (given prefix is '!')

!meme [subreddit] - Gets a random image from imgur's viral posts, or one of the top images from any subreddit on imgur

!more - Repeats the last "!meme" command

!giphy [search] - Get a giphpy gif (why...)

!playme [url] - Plays a youtube video url in your currently joined voice channel

!stop - Stops playing music in said voice channel

!ping - ping the bot

!roll [F] - roll, where F is the maximum number

!roll [NdF] - roll, where N is the number of rolls and F is the maximum number

!roleassign @member "the role" - assigns @member with "the role", use the @ tagging as the member (the text should be blue)

!roll examples:

    20 - 1 roll of 20

    5d20 - 5 rolls of 20

    3d6 - 3 rolls of 6

    1d20 # Defending - roll out of 20 with a comment

# Tests

    npm t
