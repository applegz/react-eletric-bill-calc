import React, { useState } from 'react';
import './Form.css';

export default function Form(props) {
  const [rate, setRate] = useState('RateA');
  const [miles, setMiles] = useState(0);
  const [chargeTime, setChargeTime] = useState('tou1');

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.callback(rate, miles, chargeTime);
        }}
      >
        <label>What rate you currently on?</label>
        <select value={rate} onChange={(e) => setRate(e.target.value)}>
          <option value="RateA">Flat Rate</option>
          <option value="RateB">TOU Rate</option>
        </select>
        <label>How many miles do you expect to drive per year?</label>
        <input
          type="number"
          min="1"
          onChange={(e) => setMiles(e.target.value)}
          value={miles}
          required
        ></input>
        <label>When do you plan to charge your car?</label>
        <select
          value={chargeTime}
          onChange={(e) => setChargeTime(e.target.value)}
        >
          <option value="tou1">12 pm - 6 pm</option>
          <option value="tou2">any other time</option>
        </select>
        <input
          type="submit"
          value="Submit"
          disabled={!miles}
          className="btn"
        ></input>
      </form>
    </div>
  );
}
