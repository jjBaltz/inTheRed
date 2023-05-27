import React, { useState, useEffect } from 'react';

function RangeSlider() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <div className="RangeSlider">
      <input
        className="RangeSlider"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(e.target.valueAsNumber)}
      />
    </div>
  );
}

export default RangeSlider;
