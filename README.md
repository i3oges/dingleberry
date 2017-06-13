# dingleberry
The best bot for getting some dank memes

# Installation

	npm i -s ffmpeg-binaries

create a file 'auth.json' in the root directory and fill in this code

```javascript
	{
		'discord': 'DISCORD_API_TOKEN',
		'imgur': 'IMGUR_API_TOKEN'
	}
```

Then just authorize your discord bot on your server and run the bot!

	node app.js

And you're good to go!


# Commands

/meme [subreddit] - Gets a random image from imgur's viral posts, or one of the top images from any subreddit on imgur

/more - Repeats the last "/meme" command

/playme [url] - Plays a youtube video url in your currently joined voice channel

/stop - Stops playing music in said voice channel