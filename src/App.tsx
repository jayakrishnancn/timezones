import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import "./App.css";
import Button from "./components/button";
import { timeZones } from "./utils/timezones";

function App() {
  const [startTimes, setSetStartTimes] = useState<number[]>(
    JSON.parse(localStorage.getItem("saved") ?? "[37]")
  );

  const shiftTimeWithOffset = useCallback((offset: number): string[] => {
    const clock: string[] = [];
    for (let i = 1; i <= 24; i++) {
      let time = i + offset;
      const amPm = time < 12 ? "AM" : "PM";
      time = time > 12 ? time % 12 : time;
      clock.push(`${time || 12} ${amPm}`);
    }
    return clock;
  }, []);

  useEffect(() => {
    startTimes && localStorage.setItem("saved", JSON.stringify(startTimes));
  }, [startTimes]);

  const TIME_ZONES = timeZones.map((item, value) => ({
    label: item.abbr + item.text,
    value,
    offset: item.offset,
  }));
  const LONDON_TZ_ID = 37;
  return (
    <div className="App">
      <Button
        onClick={() => setSetStartTimes((prev) => [...prev, LONDON_TZ_ID])}
      >
        Add Timezone
      </Button>

      <table className="table">
        <tbody>
          {startTimes.map((startTime, index) => (
            <tr key={startTime}>
              <td>
                <Select
                  onChange={(option) => {
                    option !== null &&
                      setSetStartTimes((prev) => {
                        prev[index] = option?.value;
                        return [...prev];
                      });
                  }}
                  value={TIME_ZONES.find(
                    (item) => item.value === startTimes[index]
                  )}
                  options={TIME_ZONES}
                />
              </td>
              {shiftTimeWithOffset(TIME_ZONES[startTime].offset).map(
                (time, index) => (
                  <td className="time" key={index}>
                    {time}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
