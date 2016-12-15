import React, { Component } from 'react'
import './App.css'

import clap    from './sounds/clap.wav'
import hihat   from './sounds/hihat.wav'
import kick    from './sounds/kick.wav'
import openhat from './sounds/openhat.wav'
import boom    from './sounds/boom.wav'
import ride    from './sounds/ride.wav'
import snare   from './sounds/snare.wav'
import tom     from './sounds/tom.wav'
import tink    from './sounds/tink.wav'


function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // skip it if its not a transition
  this.classList.remove('playing');
  console.log(e.propertyName);
}

const Key = (props) => {
  return (
    <div className='key' key={props.dataKey} onClick={() => props.handleClick(props.name)} accessKey={props.letter}>
      <p>{props.letter}</p>
      <span className="sound">{props.snd}</span>
      <audio id={props.name} src={props.snd} preload="auto"></audio>
    </div>
  )
}

class App extends Component {
  constructor () {
    super()
    this.state = { keys: [
      {dataKey: 65, name: 'clap',    snd: clap},
      {dataKey: 83, name: 'hihat',   snd: hihat},
      {dataKey: 68, name: 'kick',    snd: kick},
      {dataKey: 70, name: 'openhat', snd: openhat},
      {dataKey: 71, name: 'boom',    snd: boom},
      {dataKey: 72, name: 'ride',    snd: ride},
      {dataKey: 74, name: 'snare',   snd: snare},
      {dataKey: 75, name: 'tom',     snd: tom},
      {dataKey: 76, name: 'tink',    snd: tink}
    ]}
  }
  handleClick (id) {
    console.log(id)
    const ele = document.getElementById(id)
    ele.play()
    ele.parentNode.classList.add('playing')
  }
  componentDidMount () {
    const divs = document.querySelectorAll('.key') //.forEach(k => k.addEventListener('transitionend', removeTransition))
    for (let div of divs) {
      div.addEventListener('transitionend', removeTransition)
    }
  }
  render () {
    const keys = this.state.keys.map(e =>
      <Key dataKey={e.dataKey}
           letter={String.fromCharCode(e.dataKey)}
           key={e.dataKey}
           name={e.name}
           snd={e.snd}
           handleClick={this.handleClick}/>)
    return (
      <div className="keys">
       {keys}
      </div>
    )
  }
}


/* 
 * function playSound (e) {
 *   var audio = document.querySelector('audio[data-key="' + e.keyCode + '"]')
 *   var key = document.querySelector('.key[data-key="' + e.keyCode + '"]')
 *   if (!audio) return // stops the function if no key associated with audio
 *   audio.currentTime = 0 // rewinds to the start
 *   audio.play()
 *   key.classList.add('playing')
 * }
 * 
 * window.addEventListener('keydown', playSound);*/

export default App
