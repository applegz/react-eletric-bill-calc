import './App.css';
import Form from './components/Form';
import Results from './components/Results';
import React, { useState } from 'react';

const rateAPrice = 0.15;
const rateBPriceRush = 0.2;
const rateBPriceNonRush = 0.08;
const preEVRateA = 9003.71;
const preEVRateBRushHour = 2066.26;
const preEVRateBNonRushHour = 6937.45;
const EVkWhPerMile = 0.3;

function App() {
  const [b2RateA, setB2RateA] = useState(0);
  const [b2RateB, setB2RateB] = useState(0);
  const [impactRateA, setImpactRateA] = useState(0);
  const [impactRateB, setImpactRateB] = useState(0);
  const [selectedRate, setSelectedRate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const callback = (rate, miles, chargeTime) => {
    setIsSubmitted(true);
    miles = Number(miles);
    setSelectedRate((selectedRate) => (selectedRate = rate));

    const b1RateA = preEVRateA * rateAPrice;
    const b1RateB =
      preEVRateBRushHour * rateBPriceRush +
      preEVRateBNonRushHour * rateBPriceNonRush;

    const EVElectricity = miles * EVkWhPerMile;

    const curb2RateA =
      Math.round(
        ((preEVRateA + EVElectricity) * rateAPrice + Number.EPSILON) * 100
      ) / 100;
    setB2RateA((b2RateA) => (b2RateA = curb2RateA));
    const curb2RateB =
      Math.round(
        ((preEVRateBRushHour + (chargeTime === 'tou1' ? EVElectricity : 0)) *
          rateBPriceRush +
          (preEVRateBNonRushHour +
            (chargeTime === 'tou2' ? EVElectricity : 0)) *
            rateBPriceNonRush +
          Number.EPSILON) *
          100
      ) / 100;
    setB2RateB((b2RateB) => (b2RateB = curb2RateB));

    setImpactRateA(
      (impactRateA) =>
        (impactRateA =
          Math.round((curb2RateA - b1RateA + Number.EPSILON) * 100) / 100)
    );
    setImpactRateB(
      (impactRateB) =>
        (impactRateB =
          Math.round((curb2RateB - b1RateB + Number.EPSILON) * 100) / 100)
    );
  };

  return (
    <div className="App">
      <body>
        <Form callback={callback} />
        <Results
          impactRateA={impactRateA}
          impactRateB={impactRateB}
          b2RateA={b2RateA}
          b2RateB={b2RateB}
          isSubmitted={isSubmitted}
          selectedRate={selectedRate}
        />
      </body>
    </div>
  );
}

export default App;
