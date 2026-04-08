import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroHeader from './Header/HeroHeader';
import DateGrid from './Grid/DateGrid';
import NotesSection from './Notes/NotesSection';
import styles from './Calendar.module.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2022, 0, 1));
    const [selection, setSelection] = useState({ start: null, end: null });
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('calendar_notes');
        const parsed = saved ? JSON.parse(saved) : {};

        // Normalize data: Ensure everything is an array of strings
        const normalized = {};
        Object.keys(parsed).forEach(key => {
            const val = parsed[key];
            if (Array.isArray(val)) {
                normalized[key] = val.map(v => typeof v === 'object' ? (v.text || JSON.stringify(v)) : String(v));
            } else if (typeof val === 'object' && val !== null) {
                normalized[key] = [val.text || JSON.stringify(val)];
            } else {
                normalized[key] = [String(val)];
            }
        });
        return normalized;
    });
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        localStorage.setItem('calendar_notes', JSON.stringify(notes));
    }, [notes]);

    const handleDateClick = (date) => {
        if (!selection.start || (selection.start && selection.end)) {
            setSelection({ start: date, end: null });
        } else {
            if (date < selection.start) {
                setSelection({ start: date, end: selection.start });
            } else {
                setSelection({ ...selection, end: date });
            }
        }
    };

    const handleAddNote = (note, customDateKey) => {
        const dateKey = customDateKey || (selection.start ? selection.start.toDateString() : 'general');
        setNotes(prev => ({ ...prev, [dateKey]: note }));
    };

    const changeMonth = (delta) => {
        setDirection(delta);
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
    };

    const clearSelection = () => setSelection({ start: null, end: null });

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className={styles.wrapper}
        >
            <div className={styles.hangingDevice}>
                <div className={styles.nail} />
                <div className={styles.wire} />
            </div>

            <div className={styles.spiral}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className={styles.spiralHole}
                    />
                ))}
            </div>

            <div className={styles.calendarContainer}>
                <HeroHeader
                    currentDate={currentDate}
                    onNext={() => changeMonth(1)}
                    onPrev={() => changeMonth(-1)}
                    onDateChange={(newDate) => setCurrentDate(newDate)}
                />

                <div className={styles.mainContent}>
                    <NotesSection
                        selection={selection}
                        notes={notes}
                        onAddNote={handleAddNote}
                    />

                    <div className={styles.rightPanel}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentDate.toISOString()}
                                initial={{ x: direction * 50, opacity: 0, rotateY: direction * 10 }}
                                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                                exit={{ x: -direction * 50, opacity: 0, rotateY: -direction * 10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <DateGrid
                                    currentDate={currentDate}
                                    selection={selection}
                                    onDateClick={handleDateClick}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {selection.start && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={styles.clearBtn}
                                onClick={clearSelection}
                            >
                                Clear Selection
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Calendar;
