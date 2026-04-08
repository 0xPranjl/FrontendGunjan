import React from 'react';
import styles from './DateGrid.module.css';

const DateGrid = ({ currentDate, selection, onDateClick }) => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    // Adjust for Monday start (as per image)
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const days = [];
    // Previous month dates (optional visual filler)
    for (let i = 0; i < startOffset; i++) {
        days.push({ day: '', currentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            currentMonth: true,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
        });
    }

    const isSelected = (date) => {
        if (!date) return false;
        const { start, end } = selection;
        if (start && date.toDateString() === start.toDateString()) return 'start';
        if (end && date.toDateString() === end.toDateString()) return 'end';
        if (start && end && date > start && date < end) return 'range';
        return false;
    };

    return (
        <div className={styles.container}>
            <div className={styles.weekHeader}>
                {weekDays.map(day => (
                    <div key={day} className={styles.weekDay}>{day}</div>
                ))}
            </div>
            <div className={styles.grid}>
                {days.map((item, index) => {
                    const selectionState = isSelected(item.date);
                    return (
                        <div
                            key={index}
                            className={`
                ${styles.dayCell} 
                ${!item.currentMonth ? styles.empty : ''} 
                ${selectionState ? styles[selectionState] : ''}
              `}
                            onClick={() => item.currentMonth && onDateClick(item.date)}
                        >
                            {item.day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DateGrid;
