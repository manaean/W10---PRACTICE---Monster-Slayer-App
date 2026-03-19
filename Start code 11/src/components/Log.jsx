import react from 'react';

function Logs({ logs }) {
  return (
    <section id="log" className="container">
      <ul>
        {logs.map((log, index) => {
          let className;
          if (log.isDamage) {
            className = "log--damage";
          } else {
            className = "log--heal";
          }
        return (
            <li key={index} className={className}>
              <span className={log.isPlayer ? "log--player" : "log--monster"}>
                {log.isPlayer ? "Player" : "Monster"}
              </span>{" "}
              {log.text}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Logs;