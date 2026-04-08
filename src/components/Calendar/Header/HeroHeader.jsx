import React from 'react';
import styles from './HeroHeader.module.css';

const HeroHeader = ({ currentDate, onNext, onPrev }) => {
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    const year = currentDate.getFullYear();
    const month = monthNames[currentDate.getMonth()];

    return (
        <div className={styles.header}>
            <img
                src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=1200"
                alt="Calendar Hero"
                className={styles.heroImage}
            />
            <div className={styles.overlay}>
                <div className={styles.navButtons}>
                    <button onClick={onPrev} className={styles.navBtn}>&larr;</button>
                    <button onClick={onNext} className={styles.navBtn}>&rarr;</button>
                </div>
                <div className={styles.dateInfo}>
                    <span className={year === 2022 ? styles.yearHighlight : styles.year}>{year}</span>
                    <h1 className={styles.monthName}>{month}</h1>
                </div>
            </div>
        </div>
    );
};

export default HeroHeader;
