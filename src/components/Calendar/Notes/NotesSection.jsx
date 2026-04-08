import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Edit3 } from 'lucide-react';
import styles from './NotesSection.module.css';

const NotesSection = ({ selection, notes, onAddNote }) => {
    const [currentText, setCurrentText] = useState('');

    const dateKey = selection.start ? selection.start.toDateString() : 'general';
    const displayTitle = selection.start
        ? selection.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Monthly Overview';

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
            <div className={styles.labelSection}>
                <FileText size={16} className={styles.icon} />
                <h2 className={styles.title}>Notes</h2>
            </div>

            <motion.div
                layout
                className={styles.paper}
            >
                <div className={styles.paperHeader}>
                    <div className={styles.headerIndicator} />
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={displayTitle}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className={styles.displayTitle}
                        >
                            {displayTitle}
                        </motion.span>
                    </AnimatePresence>
                    <Edit3 size={14} className={styles.editIcon} />
                </div>

                <div className={styles.editorArea}>
                    <textarea
                        className={styles.textarea}
                        placeholder="Click a date to add specific notes..."
                        value={currentText}
                        onChange={handleChange}
                    />
                    <div className={styles.lines}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className={styles.line} />
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.hint}
            >
                {!selection.start && (
                    <span className={styles.pulse}>●</span>
                )}
                {!selection.start ? "Select a date to begin" : "Changes are saved automatically"}
            </motion.div>
        </div>
    );
};

export default NotesSection;
