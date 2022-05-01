import { useEffect, useMemo, useState } from "react";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  LT,
  LT_SPACE,
  TIME_FORMAT,
} from "../../constants";
import Select from "react-select";
import moment, { defaultTimeZoneId } from "../../utils/tz";
import "./style.css";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

interface Props {
  tableRef: React.MutableRefObject<any>;
}
function Table(props: Props) {
  const [startTimes, setSetStartTimes] = useState<number[]>([
    defaultTimeZoneId,
  ]);

  const addNewTimeZone = () => {
    setSetStartTimes((prev) => [defaultTimeZoneId, ...prev]);
  };

  useEffect(() => {
    props.tableRef.current = { addNew: addNewTimeZone };
  }, [props.tableRef]);

  // load data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("saved");
    if (data) {
      setSetStartTimes(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    startTimes && localStorage.setItem("saved", JSON.stringify(startTimes));
  }, [startTimes]);

  const TIME_ZONES = useMemo(
    () =>
      moment.tz.names().map((label, index) => ({
        value: index,
        label: label + " " + moment.tz(label).format("Z"),
        zone: label,
      })),
    []
  );

  const getTimeOf = (zone: string): { current: boolean; time: string }[] => {
    if (!zone) return [];
    const times = [];
    const now = moment().format(DATE_TIME_FORMAT);
    const today = moment().format(DATE_FORMAT);
    for (let i = 0; i <= 23; i++) {
      times.push({
        current: Number(moment(now, DATE_TIME_FORMAT).format("HH")) === i,
        time: moment(today + " " + i + ":00", `${DATE_FORMAT} ${TIME_FORMAT}`)
          .tz(zone)
          .format(LT_SPACE),
      });
    }
    console.log("zone: " + zone, now, times);
    return times;
  };
  return (
    <div className="tableWrapper">
      <table cellPadding={0} cellSpacing={2} className="table">
        <thead>
          <tr>
            <th>Zone</th>
            <th>Current time</th>
            <th colSpan={24}>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {startTimes.map((zoneId, index) => (
            <tr key={index}>
              <td>
                <div style={{ width: 140 }}>
                  <Select
                    menuPosition="fixed"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
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
                </div>
              </td>
              <td className="current-time">
                {moment.tz(TIME_ZONES[zoneId].zone).format(LT)}
              </td>
              {getTimeOf(TIME_ZONES[zoneId].zone).map(
                ({ time, current }, index) => (
                  <td
                    className={"time" + (current ? " current" : "")}
                    key={index}
                  >
                    {time.split(" ").map((item, index) => {
                      return <div key={item + "-" + index}>{item}</div>;
                    }, "")}
                  </td>
                )
              )}
              <td style={{ textAlign: "center" }}>
                <DeleteIcon
                  className="deleteIcon"
                  onClick={() => {
                    setSetStartTimes((prev: number[]) =>
                      prev.filter((_, prevIndex) => prevIndex !== index)
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
