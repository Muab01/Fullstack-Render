import { useEffect, useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};


function App() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => response.json())
      .then((data) => setQuotes(data))
      .catch((error) => console.error('Fel vid hämtning av citat:', error));
  }, []);

  return (
    <div className="App">
      <motion.h1 className="title"
      variants={itemVariants}>
        Words of Wisdom</motion.h1>
      <motion.ul 
      style={{ listStyleType: 'none', padding: 0 }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      >
  {quotes.map((quote) => (
    <motion.li 
    key={quote.id} 
    className="quote-item"
    variants={itemVariants}
    >
  <motion.p className="quote-text" variants={itemVariants}>{quote.quote}</motion.p>
      <motion.p>{quote.author}</motion.p>
    </motion.li>
  ))}
</motion.ul>

    </div>
  );
}

export default App;
