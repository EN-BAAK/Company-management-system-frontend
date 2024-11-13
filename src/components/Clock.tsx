import React from 'react'
import { GiAlarmClock } from "react-icons/gi";
import { calculateTimeDifference } from '../misc/helpers';

interface Props {
  startHour?: string,
  endHour?: string
}

const Clock = ({ startHour, endHour }: Props): React.ReactNode => {
  return (
    <div className='flex-center-y justify-content-end gap-2 mt-1'>
      {startHour && endHour && (
        <>
          <span className="fw-bold">
            {calculateTimeDifference(startHour, endHour)} =
          </span>
          {endHour.slice(0, 5)} - {startHour.slice(0, 5)}
        </>
      )}

      {!startHour && endHour && <span>{endHour.slice(0, 5)}</span>}
      {startHour && !endHour && <span>{startHour.slice(0, 5)}</span>}

      <GiAlarmClock size={20} />
    </div>
  )
}

export default Clock
