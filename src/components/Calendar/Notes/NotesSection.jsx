import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Plus, Trash2 } from 'lucide-react';
import styles from './NotesSection.module.css';

const NotesSection = ({ selection, notes, onAddNote }) => {
    const [inputText, setInputText] = useState('');

    const dateKey = selection.start ? selection.start.toDateString() : 'general';

    const currentNotes = notes[dateKey] ?
        (Array.isArray(notes[dateKey]) ? notes[dateKey] : [notes[dateKey]])
        : [];

    const handleAdd = () => {
        if (!inputText.trim()) return;
        const updated = [...currentNotes, inputText.trim()];
        onAddNote(updated);
        setInputText('');
    };

    const removeNote = (index) => {
        const updated = currentNotes.filter((_, i) => i !== index);
        onAddNote(updated);
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
                    placeholder="Notes..."
                    className={styles.input}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button onClick={handleAdd} className={styles.addBtn}>
                    <Plus size={20} />
                </button>
            </div>

            <div className={styles.badgeCloud}>
                <AnimatePresence>
                    {currentNotes.map((noteText, idx) => (
                        <motion.div
                            key={`${dateKey}-${idx}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            className={styles.badge}
                        >
                            <span className={styles.badgeText}>{noteText}</span>
                            <button onClick={() => removeNote(idx)} className={styles.removeBtn}>
                                <Trash2 size={12} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {currentNotes.length === 0 && (
                    <div className={styles.emptyState}>No Notes for this date</div>
                )}
            </div>

            <div className={styles.selectionHint}>
                {selection.start ?
                    `Showing notes for ${selection.start.toLocaleDateString()}` :
                    "Showing General Notes"}
            </div>
        </div>
    );
};

export default NotesSection;
