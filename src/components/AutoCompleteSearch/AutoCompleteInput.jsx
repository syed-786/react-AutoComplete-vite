import { useState, useEffect } from 'react';
import './AutoCompleteInput.css';

export default function AutoCompleteInput() {
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cachedResults, setCachedResults] = useState({});

  const fetchRecipes = async () => {
    // if (searchText.trim() === '') {
    //   setRecipes([]);
    //   return;
    // }

    if (cachedResults[searchText]) {
      console.log('Fetching from cache', cachedResults);
      setRecipes(cachedResults[searchText]);
      return;
    }

    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${searchText}`
      );
      const result = await response.json();
      setRecipes(result?.recipes);
      console.log('Fetching from API');
      setCachedResults(prev => ({ ...prev, [searchText]: result?.recipes }));
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      fetchRecipes();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  function highlightText(text, query) {
    if (!query) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    const matchIndex = lowerText.indexOf(lowerQuery);

    if (matchIndex === -1) return text;

    const before = text.slice(0, matchIndex);
    const match = text.slice(matchIndex, matchIndex + query.length);
    const after = text.slice(matchIndex + query.length);

    return (
      <>
        {before}
        <span className="highlight">{match}</span>
        {after}
      </>
    );
  }

  return (
    <div className="main-container">
      <h1>Auto Complete Search</h1>
      <input
        type="text"
        className="search-input"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 100)}
      />
      {showResults && recipes.length > 0 && (
        <div className="results-container">
          {recipes?.map(item => (
            <div className="results-name" key={item.id}>
              {highlightText(item.name, searchText)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
