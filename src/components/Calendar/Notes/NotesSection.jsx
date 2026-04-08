import React, { useState, useEffect } from 'react';
import styles from './NotesSection.module.css';

const NotesSection = ({ selection, notes, onAddNote }) => {
    const [currentText, setCurrentText] = useState('');

    const dateKey = selection.start ? selection.start.toDateString() : 'general';
    const displayTitle = selection.start
        ? `Notes for ${selection.start.toLocaleDateString()}`
        : 'Monthly Notes';

    useEffect(() => {
        setCurrentText(notes[dateKey] || '');
    }, [dateKey, notes]);

    const handleChange = (e) => {
        const text = e.target.value;
        setCurrentText(text);
        onAddNote(text);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Notes</h2>
            <div className={styles.paper}>
                <div className={styles.header}>
                    <span className={styles.displayTitle}>{displayTitle}</span>
                </div>
                <textarea
                    className={styles.textarea}
                    placeholder="Jot down something..."
                    value={currentText}
                    onChange={handleChange}
                />
                <div className={styles.lines}>
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className={styles.line} />
                    ))}
                </div>
            </div>
            <div className={styles.hint}>
                {selection.start && !selection.end && "Select an end date to complete the range"}
                {selection.start && selection.end && "Range selected. Add notes for the start date."}
                {!selection.start && "Click a date to start selection"}
            </div>
        </div>
    );
};

export default NotesSection;
