# dingleberry
The best bot for getting some dank memes

# Installation

	npm i -s ffmpeg-binaries

create a file 'auth.js' in the root directory and fill in this code

```javascript
	module.exports = {
		'discord': 'DISCORD\_API\_TOKEN',
		'imgur': 'IMGUR\_API\_TOKEN'
	}
```

Then just authorize your discord bot on your server and run the bot!

	node app.js

And you're good to go!


# Commands

/meme [subreddit] - Gets a random image from imgur's viral posts, or one of the top images from any subreddit you type after /meme

/playme [url] - Plays a youtube video url in your currently joined voice channel