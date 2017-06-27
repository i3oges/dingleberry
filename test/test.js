const commands = require('~/commands/')
const expect = require('chai').expect
const winston = require('winston')

winston.remove(winston.transports.Console)
winston.add(winston.transports.File, { filename: './debug.log' })

describe('Dice Roll', function () {
  it('Normal dice roll (No params)', function () {
    let roll = commands.roll()
    expect(roll.faces).to.equal(20)
    expect(roll.sum).to.be.within(1, 20)
    expect(roll.message).to.equal('Rolled')
  })
  it('Normal dice roll out of 6', function () {
    let roll = commands.roll(6)
    expect(roll.faces).to.equal(6)
    expect(roll.sum).to.be.within(1, 6)
    expect(roll.message).to.equal('Rolled')
  })
  it('2 dice rolls out of 20', function () {
    let roll = commands.roll('2d20')
    expect(roll.faces).to.equal(20)
    expect(roll.results).to.be.an('array')
    expect(roll.sum).to.be.within(1, 50)
    expect(roll.message).to.equal('Rolled')
  })
  it('Normal dice roll with custom message', function () {
    let roll = commands.roll('# Attack')
    expect(roll.faces).to.equal(20)
    expect(roll.sum).to.be.within(1, 20)
    expect(roll.message).to.equal('Attack')
  })
  it('5 dice rolls out of 6 with custom message', function () {
    let roll = commands.roll('5d6 # Blerg')
    expect(roll.faces).to.equal(6)
    expect(roll.results).to.be.an('array')
    expect(roll.sum).to.be.within(1, 30)
    expect(roll.message).to.equal('Blerg')
  })
})

describe('Meme', async function () {
  this.slow(20000)
  this.timeout(50000)
  it('Random Meme', async function () {
    let meme = await commands.meme.get()
    expect(meme.title).to.be.ok
    expect(meme.title).to.be.a('string')
    expect(meme.image).to.be.ok
    expect(meme.image).to.be.a('string')
    expect(meme.nsfw).to.not.be.ok
    expect(meme.error).to.not.be.ok
  })
  it('Meme from pcmasterrace', async function () {
    let meme = await commands.meme.get('pcmasterrace')
    expect(meme.title).to.be.ok
    expect(meme.title).to.be.a('string')
    expect(meme.image).to.be.ok
    expect(meme.image).to.be.a('string')
    expect(meme.nsfw).to.not.be.ok
    expect(meme.error).to.not.be.ok
  })
  it('NSFW meme', async function () {
    let meme = await commands.meme.get('hentai')
    expect(meme.title).to.be.ok
    expect(meme.title).to.be.a('string')
    expect(meme.image).to.be.ok
    expect(meme.image).to.be.a('string')
    expect(meme.nsfw).to.be.true
    expect(meme.error).to.not.be.ok
  })
  it('Meme not found', async function () {
    let meme = await commands.meme.get('101010101010')
    expect(meme.title).to.not.be.ok
    expect(meme.image).to.not.be.ok
    expect(meme.nsfw).to.not.be.ok
    expect(meme.error).to.be.ok
    expect(meme.error).to.be.a('string')
  })
})
