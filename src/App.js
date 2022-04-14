import React from 'react';
import CountDown from './components/countdown/App';
// import Selection from './components/selection/Selection';
import MultiColumnSelection from './components/selection/MultiColumnSelection';

const App = () => {
  return (
    <div>
      <CountDown></CountDown>
      {/* <Selection></Selection> */}
      <MultiColumnSelection></MultiColumnSelection>
    </div>
  );
};

export default App;
