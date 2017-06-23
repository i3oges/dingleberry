# dingleberry

A discord bot for everyone! Completely open-source means you run it for yourself!

# Prerequisite

ffmpeg
	
	npm i -g ffmpeg-binaries

[^Node.js 8.1.0](https://nodejs.org/)

[Discord API Access](https://discordapp.com/developers/docs/intro)

[imgur API Access](https://apidocs.imgur.com/)

# Installation

create a file 'auth.json' in the root directory and fill in with this code

```javascript
	{
		'discord': 'DISCORD_API_TOKEN',
		'imgur': 'IMGUR_CLIENT_ID'
	}
```

Then just authorize your discord bot on your server if you haven't already

Run the bot!

	npm start

And you're good to go!


# Commands

/meme [subreddit] - Gets a random image from imgur's viral posts, or one of the top images from any subreddit on imgur

/more - Repeats the last "/meme" command

/playme [url] - Plays a youtube video url in your currently joined voice channel

/stop - Stops playing music in said voice channel

/ping - ping the bot

/roll [#d#] - roll out of a specific number, defaults to 1 d20

examples:

	1d20 - single dodecahedron

	5d20 - 5 dodecahedrons

	3d6 - 3 hexahedrons