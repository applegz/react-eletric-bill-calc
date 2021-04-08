import React from 'react';

export default function Form(props) {
  return (
    <div>
      Form
      <form>
        <label>What rate you currently on?</label>
        <select>
          <option value="RateA">Flat Rate</option>
          <option value="RateB">TOU Rate</option>
        </select>
        <label>How many miles do you expect to drive per year?</label>
        <input type="number" placeholder="100" min="0" required></input>
        <label>When do you plan to charge your car?</label>
        <select>
          <option value="tou1">12 pm - 6 pm</option>
          <option value="tou2">any other time</option>
        </select>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
