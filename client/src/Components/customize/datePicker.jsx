import React, { useRef, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function DatePicker ({onChangeFunc}) {
  const datePickerRef = useRef(null);

  useEffect(() => {
    flatpickr(datePickerRef.current, {
      enable: ['2024-07-05', '2024-07-10', '2024-07-15','2024-07-8', '2024-07-12', '2024-07-18', '2024-07-22', '2024-07-25', '2024-07-28'].map(date => new Date(date)),
      onChange: (selectedDates, dateStr, instance) => {
        if (onChangeFunc) {
          onChangeFunc(dateStr);
        }
      }
    });
  }, [onChangeFunc]);

  return (
      <input type="text" id="date" ref={datePickerRef} placeholder='Select a Date' onChange={(e) => {props.onChangeFunc}}/>
  )
}   