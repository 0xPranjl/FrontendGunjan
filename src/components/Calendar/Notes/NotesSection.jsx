import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Plus, Trash2 } from 'lucide-react';
import styles from './NotesSection.module.css';

const NotesSection = ({ selection, notes, onAddNote }) => {
    const [inputText, setInputText] = useState('');

    const getDatesInRange = (start, end) => {
        const dates = [];
        let current = new Date(start);
        const last = new Date(end);

        // Safety break
        let count = 0;
        while (current <= last && count < 32) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
            count++;
        }
        return dates;
    };

    const getSelectedDates = () => {
        if (!selection.start) return [];
        if (!selection.end) return [selection.start];
        return getDatesInRange(selection.start, selection.end);
    };

    const selectedDates = getSelectedDates();

    // Aggregate notes from all selected dates
    const aggregatedNotes = selectedDates.reduce((acc, date) => {
        const dateKey = date.toDateString();
        const dateNotes = notes[dateKey] || [];
        const notesList = Array.isArray(dateNotes) ? dateNotes : [dateNotes];

        notesList.forEach((text, index) => {
            acc.push({
                text,
                date: date,
                dateKey: dateKey,
                originalIdx: index,
                id: `${dateKey}-${index}`
            });
        });
        return acc;
    }, []);

    const handleAdd = () => {
        if (!inputText.trim() || !selection.start) return;

        // Always add to the start date of selection or the only selected date
        const dateKey = selection.start.toDateString();
        const currentDateNotes = notes[dateKey] || [];
        const notesList = Array.isArray(currentDateNotes) ? currentDateNotes : [currentDateNotes];

        const updated = [...notesList, inputText.trim()];

        // We pass the full notes object update back or handle it locally
        // Our onAddNote takes (newDateNotesList, optionalDateKey)
        onAddNote(updated, dateKey);
        setInputText('');
    };

    const handleRemove = (noteObj) => {
        const notesList = notes[noteObj.dateKey] || [];
        const updated = notesList.filter((_, i) => i !== noteObj.originalIdx);
        onAddNote(updated, noteObj.dateKey);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <StickyNote size={18} className={styles.icon} />
                <h2 className={styles.title}>Notes</h2>
            </div>

            <div className={styles.inputArea}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={selection.start ? "Add note to start date..." : "Select date to add notes..."}
                    className={styles.input}
                    disabled={!selection.start}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button
                    onClick={handleAdd}
                    className={styles.addBtn}
                    disabled={!selection.start}
                >
                    <Plus size={20} />
                </button>
            </div>

            <div className={styles.badgeCloud}>
                <AnimatePresence>
                    {aggregatedNotes.map((note) => (
                        <motion.div
                            key={note.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            className={styles.badge}
                        >
                            <div className={styles.badgeContent}>
                                {selection.end && (
                                    <span className={styles.dateLabel}>
                                        {note.date.getDate()} {note.date.toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                )}
                                <span className={styles.badgeText}>
                                    {typeof note.text === 'object' ?
                                        (note.text.text || JSON.stringify(note.text)) :
                                        String(note.text)}
                                </span>
                            </div>
                            <button onClick={() => handleRemove(note)} className={styles.removeBtn}>
                                <Trash2 size={12} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {aggregatedNotes.length === 0 && (
                    <div className={styles.emptyState}>
                        {selection.start ? "No Notes for this selection" : "Select a date or range to view notes"}
                    </div>
                )}
            </div>

            <div className={styles.selectionHint}>
                {selection.start && selection.end ?
                    `Showing notes from ${selection.start.getDate()} to ${selection.end.getDate()} ${selection.start.toLocaleDateString('en-US', { month: 'short' })}` :
                    selection.start ? `Showing notes for ${selection.start.toLocaleDateString()}` :
                        "Showing General Notes"}
            </div>
        </div>
    );
};

export default NotesSection;
