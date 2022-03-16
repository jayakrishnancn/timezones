import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [startTimes, setSetStartTimes] = useState<number[]>([0, 5.5]);

  const shiftTimeWithOffset = useCallback((offset: number): string[] => {
    const clock: string[] = [];
    for (let i = 1; i <= 24; i++) {
      let time = i + offset;
      const amPm = time < 12 ? "AM" : "PM";
      time = time > 12 ? time % 12 : time;
      clock.push(`${time || 12} ${amPm}`);
      time += 0.5;
      time = time > 12 ? time % 12 : time;
      clock.push(`${time || 12} ${amPm}`);
    }
    return clock;
  }, []);

  return (
    <div className="App">
      <button onClick={() => setSetStartTimes((prev) => [...prev, 5.5])}>
        ADD
      </button>
      <table className="table">
        {startTimes.map((startTime, index) => (
          <tr>
            <input
              value={startTime}
              step=".5"
              type="number"
              className="timeinput"
              onChange={(e) => {
                const val = Number(e.target.value);
                setSetStartTimes((prev) => {
                  prev[index] = val;
                  return [...prev];
                });
              }}
            />
            {shiftTimeWithOffset(startTime).map((time, index) => (
              <td key={index}>{time}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
