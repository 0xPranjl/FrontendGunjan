import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import styles from './HeroHeader.module.css';

const HeroHeader = ({ currentDate, onNext, onPrev, onDateChange }) => {
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    const year = currentDate.getFullYear();
    const month = monthNames[currentDate.getMonth()];

    const handleMonthChange = (e) => {
        const newDate = new Date(currentDate.getFullYear(), parseInt(e.target.value), 1);
        onDateChange(newDate);
    };

    const handleYearChange = (e) => {
        const newDate = new Date(parseInt(e.target.value), currentDate.getMonth(), 1);
        onDateChange(newDate);
    };

    return (
        <div className={styles.header}>
            <img
                src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=1200"
                alt="Calendar Hero"
                className={styles.heroImage}
            />

            <div className={styles.overlay}>
                <div className={styles.topBar}>
                    <div className={styles.selectors}>
                        <select value={currentDate.getMonth()} onChange={handleMonthChange} className={styles.selector}>
                            {monthNames.map((name, i) => (
                                <option key={name} value={i}>{name}</option>
                            ))}
                        </select>
                        <select value={year} onChange={handleYearChange} className={styles.selector}>
                            {Array.from({ length: 31 }, (_, i) => 2010 + i).map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.navButtons}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onPrev}
                            className={styles.navBtn}
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onNext}
                            className={styles.navBtn}
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={month}
                    className={styles.dateInfo}
                >
                    <span className={year === 2022 ? styles.yearHighlight : styles.year}>{year}</span>
                    <h1 className={styles.monthName}>{month}</h1>
                </motion.div>
            </div>

            <div className={styles.geometricAccent} />
        </div>
    );
};

export default HeroHeader;
