import { React } from 'react';
import { useState } from 'react';
import './style.css';

const NotFoundGame = () => {
  let [newCount, setNewCount] = useState(0);
  let [isJumping, setIsJumping] = useState(false);
  let [isCharged, setIsCharged] = useState(false);
  let [numLifes, setNumLifes] = useState(3);

  let chargedValue = isCharged ? 'jumping' : 'get rdy';
  let charge = <div id="charge">{chargedValue}</div>;

  let character = (
    <div id="character" className={isJumping ? 'animate' : 'null'}></div>
  );

  let lifes = <div id="lifes">Lifes: {numLifes}</div>;

  let block = <div id="block"></div>;

  const myFunc = () => {
    setIsJumping(!isJumping);
    setIsCharged(!isCharged);
    setNewCount(newCount + 1);
    console.log('clicked');
    console.log(character.props.className, isJumping);
  };

  setInterval(function () {
    let characterTop = parseInt(
      window
        .getComputedStyle(document.getElementById('character'))
        .getPropertyValue('top')
    );
    let blockLeft = parseInt(
      window
        .getComputedStyle(document.getElementById('block'))
        .getPropertyValue('left')
    );
    if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
      setNumLifes(numLifes - 1);
      console.log('lost life');
    }
  }, 100);

  setInterval(function () {
    let characterTop = parseInt(
      window
        .getComputedStyle(document.getElementById('character'))
        .getPropertyValue('top')
    );
    let blockLeft = parseInt(
      window
        .getComputedStyle(document.getElementById('block'))
        .getPropertyValue('left')
    );
    if (
      blockLeft < 20 &&
      blockLeft > 0 &&
      characterTop >= 130 &&
      numLifes <= 1
    ) {
      alert('You are dead! Refresh page to restart.');
      console.log('died');
    }
  }, 10);

  setInterval(function () {
    if (newCount > 10) {
      alert(
        'So win. Much Game. Refresh to escape this annoying alert message. Sorry if it never goes away. In that case close the tab I guess, Idk.'
      );
      console.log('won');
    }
  }, 100);

  return (
    <div>
      <div id="game" onClick={() => myFunc()}>
        {character}
        {block}
        {charge}
        {lifes}
        <div id="score">Dodge the doge 4 times</div>
        <div id="points">Clicks: {newCount}</div>
      </div>
    </div>
  );
};

export default NotFoundGame;
