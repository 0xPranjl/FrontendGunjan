import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HeroHeader.module.css';

const HeroHeader = ({ currentDate, onNext, onPrev }) => {
    const headerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start start", "end start"]
    });

    // Parallax effect for the image
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    const year = currentDate.getFullYear();
    const month = monthNames[currentDate.getMonth()];

    return (
        <div className={styles.header} ref={headerRef}>
            <motion.img
                style={{ y }}
                src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=1200"
                alt="Calendar Hero"
                className={styles.heroImage}
            />

            <div className={styles.overlay}>
                <div className={styles.navButtons}>
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onPrev}
                        className={styles.navBtn}
                    >
                        <ChevronLeft size={20} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onNext}
                        className={styles.navBtn}
                    >
                        <ChevronRight size={20} />
                    </motion.button>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={month}
                    className={styles.dateInfo}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={year === 2022 ? styles.yearHighlight : styles.year}
                    >
                        {year}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={styles.monthName}
                    >
                        {month}
                    </motion.h1>
                </motion.div>
            </div>

            <div className={styles.geometricAccent} />
        </div>
    );
};

export default HeroHeader;
