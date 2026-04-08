import React from 'react';
import { motion } from 'framer-motion';
import styles from './DateGrid.module.css';

const DateGrid = ({ currentDate, selection, onDateClick }) => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const days = [];
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.01
            }
        }
    };

    const itemVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 }
    };

    return (
        <div className={styles.container}>
            <div className={styles.weekHeader}>
                {weekDays.map(day => (
                    <div key={day} className={styles.weekDay}>{day}</div>
                ))}
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={styles.grid}
            >
                {days.map((item, index) => {
                    const selectionState = isSelected(item.date);
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={item.currentMonth ? { scale: 1.1, zIndex: 10 } : {}}
                            whileTap={item.currentMonth ? { scale: 0.95 } : {}}
                            className={`
                ${styles.dayCell} 
                ${!item.currentMonth ? styles.empty : ''} 
                ${selectionState ? styles[selectionState] : ''}
              `}
                            onClick={() => item.currentMonth && onDateClick(item.date)}
                        >
                            {item.day}
                            {selectionState === 'start' && (
                                <motion.div layoutId="range-glow" className={styles.glow} />
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default DateGrid;
