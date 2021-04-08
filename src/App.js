import './App.css';
import Form from './components/Form';
import Results from './components/Results';

const rateAPrice = 15 / 100;
const rateBPriceRush = 20 / 100;
const rateBPriceNonRush = 8 / 100;
const preEVRateA = 9003.71;
const preEVRateBRushHour = 2066.26;
const preEVRateBNonRushHour = 6937.45;
const EVkWhPerMile = 30 / 100;

function App() {
  const callback = (rate, miles, chargeTime) => {
    miles = Number(miles);
    const b1RateA =
      Math.round((preEVRateA * rateAPrice + Number.EPSILON) * 100) / 100;
    const b1RateB =
      Math.round(
        (preEVRateBRushHour * rateBPriceRush +
          preEVRateBNonRushHour * rateBPriceNonRush +
          Number.EPSILON) *
          100
      ) / 100;
    const EVElectricity = miles * EVkWhPerMile;
    const b2RateA =
      Math.round(
        ((preEVRateA + EVElectricity) * rateAPrice + Number.EPSILON) * 100
      ) / 100;
    const b2RateB =
      Math.round(
        ((preEVRateBRushHour + (chargeTime === 'tou1' ? EVElectricity : 0)) *
          rateBPriceRush +
          (preEVRateBNonRushHour +
            (chargeTime === 'tou2' ? EVElectricity : 0)) *
            rateBPriceNonRush +
          Number.EPSILON) *
          100
      ) / 100;
    const impactRateA =
      Math.round((b2RateA - b1RateA + Number.EPSILON) * 100) / 100;
    const impactRateB =
      Math.round((b2RateB - b1RateB + Number.EPSILON) * 100) / 100;
    console.log(
      b1RateA,
      b1RateB,
      miles,
      b2RateA,
      b2RateB,
      impactRateA,
      impactRateB
    );
  };
  return (
    <div className="App">
      <body>
        <Form callback={callback} />
        <Results />
      </body>
    </div>
  );
}

export default App;
