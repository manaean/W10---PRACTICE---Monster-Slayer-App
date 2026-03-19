import React from "react";
import Entity from "./Enity";
import Logs from "./Log";
import GameOver from "./GameOver";


// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: `takes ${damage} damages`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: `heal ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = React.useState(100);
  const [monsterHealth, setMonsterHealth] = React.useState(100);
  const [logs, setLogs] = React.useState([]);
  const [round, setRound] = React.useState(1);
  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  const isGameOver = playerHealth <= 0 || monsterHealth <= 0;
  const canUseSpecial = round > 0 && round % 3 === 0;

  let gameTitle = "";

  if (monsterHealth <= 0) {
    gameTitle = "Player has won";
  } else if (playerHealth <= 0) {
    gameTitle = "Monster has won";
  }
  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function monsterAttack() {
    const damage = getRandomValue(8, 15);
    setPlayerHealth(prev => Math.max(prev - damage, 0));
    setLogs(prev => [
      createLogAttack(false, damage),...prev
    ]);
  }

  function attackHandler() {
    setRound(prev => prev + 1);
    const damage = getRandomValue(5, 12);
    setMonsterHealth(prev => Math.max(prev - damage, 0));
    setLogs(prev => [
      createLogAttack(true, damage),...prev
    ]);

    monsterAttack();
  }

  
  function specialAttackHandler() {
    setRound(prev => prev + 1);

    const damage = getRandomValue(10, 25);
    setMonsterHealth(prev => Math.max(prev - damage, 0));

    setLogs(prev => [
      createLogAttack(true, damage),
      ...prev
    ]);

    monsterAttack();
  }

  function healHandler() {
    setRound(prev => prev + 1);

    const heal = getRandomValue(8, 20);
    setPlayerHealth(prev => Math.min(prev + heal, 100));

    setLogs(prev => [
      createLogHeal(heal),
      ...prev
    ]);

    monsterAttack();
  }

  function surrenderHandler() {
    setPlayerHealth(0);
  }

  function restartGame() {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setRound(0);
  }

  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return <>
    <Entity name="Player" health={playerHealth} />
    <Entity name="Monster" health={monsterHealth} />

    {!isGameOver && (
      <section id="controls">
        <button onClick={attackHandler}>ATTACK</button>
        <button onClick={specialAttackHandler} disabled={!canUseSpecial}>SPECIAL ATTACK </button>

        <button onClick={healHandler}>HEAL</button>

        <button onClick={surrenderHandler}>KILL YOURSELF</button>
      </section>
    )}

    {isGameOver ? (
      <GameOver title={gameTitle} restartGame={restartGame} />
    ) : (
      <Logs logs={logs} />
    )}
  </>;
}