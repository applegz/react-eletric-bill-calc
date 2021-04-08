import React from 'react';

export default function Results(props) {
  const {
    isSubmitted,
    impactRateA,
    impactRateB,
    b2RateA,
    b2RateB,
    selectedRate,
  } = props;
  return (
    <div className="container">
      {!isSubmitted ? (
        <div>
          Enter information to find out the charging impact on your electricity
          bill
        </div>
      ) : (
        <div>
          <div>
            Bill Impact of charging an EV under Flat Rate Plan: {impactRateA}
          </div>
          <div>
            Bill Impact of charging an EV under TOU Rate Plan: {impactRateB}
          </div>
        </div>
      )}
      {b2RateA <= b2RateB && selectedRate === 'RateA' && (
        <div>You already on the cheapest rate</div>
      )}
      {b2RateA < b2RateB && selectedRate === 'RateB' && (
        <div>You should switch from TOU rate to Flat rate</div>
      )}
      {b2RateA >= b2RateB && selectedRate === 'RateB' && (
        <div>You already on the cheapest rate</div>
      )}
      {b2RateA > b2RateB && selectedRate === 'RateA' && (
        <div>You should switch from Flat rate to TOU rate</div>
      )}
    </div>
  );
}
