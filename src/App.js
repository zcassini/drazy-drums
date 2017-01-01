import React, { Component } from 'react'
import './App.css'
import GithubCorner from 'react-github-corner'

import clap    from './sounds/clap.wav'
import hihat   from './sounds/hihat.wav'
import kick    from './sounds/kick.wav'
import openhat from './sounds/openhat.wav'
import boom    from './sounds/boom.wav'
import ride    from './sounds/ride.wav'
import snare   from './sounds/snare.wav'
import tom     from './sounds/tom.wav'
import tink    from './sounds/tink.wav'

function removeTransition (e) {
  if (e.propertyName !== 'transform') return // skip it if its not a transition
  this.classList.remove('playing')
}

const Key = props => {
  return (
    <div className='key' data-key={props['data-key']} key={props['data-key']} onClick={() => props.handleClick(props.name)}>
      <p>{props.letter}</p>
      <span className="sound">{props.name}</span>
      <audio id={props.name} src={props.snd} data-key={props['data-key']} preload="auto"></audio>
    </div>
  )
}

class App extends Component {
  constructor () {
    super()
    this.state = { keys: [
      {'data-key': 65, name: 'clap',    snd: clap},
      {'data-key': 83, name: 'hihat',   snd: hihat},
      {'data-key': 68, name: 'kick',    snd: kick},
      {'data-key': 70, name: 'openhat', snd: openhat},
      {'data-key': 71, name: 'boom',    snd: boom},
      {'data-key': 72, name: 'ride',    snd: ride},
      {'data-key': 74, name: 'snare',   snd: snare},
      {'data-key': 75, name: 'tom',     snd: tom},
      {'data-key': 76, name: 'tink',    snd: tink}
    ]}
  }
  handleClick (id) {
    console.log(id)
    const ele = document.getElementById(id)
    ele.currentTime = 0
    ele.play()
    ele.parentNode.classList.add('playing')
  }
  componentDidMount () {
    document.querySelectorAll('.key').forEach(k => k.addEventListener('transitionend', removeTransition))
    window.addEventListener('keydown', playSound)
  }
  render () {
    const keys = this.state.keys.map(e =>
      <Key key={e['data-key']}
           data-key={e['data-key']}
           letter={String.fromCharCode(e['data-key'])}
           name={e.name}
           snd={e.snd}
           handleClick={this.handleClick}/>)
    return (
      <div>
        <GithubCorner href="https://github.com/zcassini/drazy-drums" />
        <div className="keys">
          {keys}
        </div>
      </div>
    )
  }
}

function playSound (e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
  const key = document.querySelector('.key[data-key="' + e.keyCode + '"]')
  if (!audio) return // stops the function if no key associated with audio
  audio.currentTime = 0 // rewinds to the start
  audio.play()
  key.classList.add('playing')
}

export default App
