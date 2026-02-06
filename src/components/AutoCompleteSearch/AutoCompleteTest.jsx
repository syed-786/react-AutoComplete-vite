import react, { useState, useEffect } from 'react';
import './AutoCompleteTest.css';

export default function AutoCompleteTest() {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [showrResults, setShowResults] = useState(false);
  const [cachedResults, setCachedResults] = useState({});

  const fetchResults = async () => {
    if (cachedResults[inputValue]) {
      setResults(cachedResults[inputValue]);
      console.log('Using cached data:', cachedResults[inputValue]);
      return;
    }

    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${inputValue}`
      );
      const data = await response.json();
      setResults(data?.recipes);
      setCachedResults(prev => ({ ...prev, [inputValue]: data?.recipes }));
      console.log('Fetched data:', data?.recipes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="container">
      <h1>Auto Complete Input</h1>
      <input
        type="text"
        className="input-search"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 150)}
      />
      {showrResults && (
        <div className="resultsContainer">
          {results?.map(item => (
            <div className="results" key={item?.id}>
              {item?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
