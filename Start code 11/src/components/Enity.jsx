import react from "react";

function Entity({ name, health }) {
  return (
    <div className="container">
      <h2>{name}</h2>
      <div className="healthbar">
        <div className="healthbar__value" style={{ width: `${health}%` }}></div>
      </div>
    </div>
  );
}

export default Entity;