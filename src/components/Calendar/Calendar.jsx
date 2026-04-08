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
        return saved ? JSON.parse(saved) : {};
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

    const handleAddNote = (note) => {
        const dateKey = selection.start ? selection.start.toDateString() : 'general';
        setNotes(prev => ({ ...prev, [dateKey]: note }));
    };

    const changeMonth = (delta) => {
        setDirection(delta);
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
    };

    const clearSelection = () => setSelection({ start: null, end: null });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.wrapper}
        >
            <div className={styles.spiral}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={styles.spiralHole}
                    />
                ))}
            </div>

            <div className={styles.calendarContainer}>
                <HeroHeader
                    currentDate={currentDate}
                    onNext={() => changeMonth(1)}
                    onPrev={() => changeMonth(-1)}
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
