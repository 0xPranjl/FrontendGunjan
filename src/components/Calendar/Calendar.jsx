import React, { useState, useEffect } from 'react';
import HeroHeader from './Header/HeroHeader';
import DateGrid from './Grid/DateGrid';
import NotesSection from './Notes/NotesSection';
import styles from './Calendar.module.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2022, 0, 1)); // January 2022 as per image
    const [selection, setSelection] = useState({ start: null, end: null });
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('calendar_notes');
        return saved ? JSON.parse(saved) : {};
    });
    const [isFlipping, setIsFlipping] = useState(false);

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
        setNotes(prev => ({
            ...prev,
            [dateKey]: note
        }));
    };

    const nextMonth = () => {
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
            setIsFlipping(false);
        }, 300);
    };

    const prevMonth = () => {
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
            setIsFlipping(false);
        }, 300);
    };

    const clearSelection = () => {
        setSelection({ start: null, end: null });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.spiral}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className={styles.spiralHole} />
                ))}
            </div>
            <div className={`${styles.calendarContainer} ${isFlipping ? styles.flipping : ''}`}>
                <HeroHeader currentDate={currentDate} onNext={nextMonth} onPrev={prevMonth} />
                <div className={styles.mainContent}>
                    <NotesSection
                        selection={selection}
                        notes={notes}
                        onAddNote={handleAddNote}
                    />
                    <div className={styles.rightPanel}>
                        <DateGrid
                            currentDate={currentDate}
                            selection={selection}
                            onDateClick={handleDateClick}
                        />
                        {selection.start && (
                            <button className={styles.clearBtn} onClick={clearSelection}>
                                Clear Selection
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
