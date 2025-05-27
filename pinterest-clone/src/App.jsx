import { useEffect, useState, useCallback } from 'react';
import Slidebar from './components/Slidebar';
import MasonryLayout from './components/MasonryLayout';
import Masonry from 'react-masonry-css';
import { fetchUnsplashImages } from './api/unsplash';
import { Search } from 'lucide-react';
import {
  Home,
  Bell,
  Plus,
  MessageCircle,
  Settings,
} from 'lucide-react';

const breakpointColumnsObj = {
  default: 6,
  1536: 5,
  1280: 4,
  1024: 3,
  768: 2,
  480: 1,
};

function Pin({ pin }) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <img
        src={pin.src}
        alt={pin.alt}
        className="w-full object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <button className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Guardar
      </button>
    </div>
  );
}

const suggestionsMock = [
  'naturaleza',
  'animales',
  'ciudad',
  'paisajes',
  'tecnología',
  'arte',
  'comida',
  'deportes',
];

export default function App() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('nature');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const loadImages = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const images = await fetchUnsplashImages(query, 20, reset ? 1 : page);
        if (images.length === 0) setHasMore(false);
        setPins(prev => (reset ? images : [...prev, ...images]));
        setPage(prev => (reset ? 2 : prev + 1));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [query, page, loading]
  );

  useEffect(() => {
    loadImages(true);
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        loadImages();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, loadImages]);

  const filteredSuggestions = suggestionsMock.filter(
    s => s.toLowerCase().includes(query.toLowerCase()) && query.trim() !== ''
  );

  const selectSuggestion = suggestion => {
    setQuery(suggestion);
    setShowSuggestions(false);
    loadImages(true);
  };

  return (
    <div className="flex h-screen bg-red-200 font-sans text-sm">
      <Slidebar />

      

      <style>
  {`
    .search-container {
      max-width: 420px;
      width: 90%;
      margin: 0 auto;
      transition: all 0.3s ease;
    }

    .search-bar {
      border-radius: 1.5rem;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      background: #f4f4f4;
      border: 2px solid transparent;
    }

    .search-bar:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      transform: scale(1.02);
      border-color: #3b82f6;
      background: #ffffff;
    }

    .suggestions-list {
      animation: fadeIn 0.3s ease;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
</style>

<div className="flex-1 flex flex-col overflow-hidden">
  <header
    className="bg-white px-6 py-6 sticky top-0 z-30 flex justify-center"
    style={{ backdropFilter: 'blur(12px)', marginTop: '2rem' }}
  >
    <div className="relative search-container">
      <div className="flex items-center search-bar px-6 py-4 relative z-40">
        <Search size={24} className="text-red-500 mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar ideas geniales..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className="flex-1 bg-transparent border-none focus:outline-none text-lg text-gray-800 font-medium placeholder-gray-400"
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 z-20">
          <ul className="suggestions-list border border-gray-200 max-h-64 overflow-auto">
            {filteredSuggestions.map((suggestion, i) => (
              <li
                key={i}
                className="px-8 py-4 cursor-pointer hover:bg-red-100 text-gray-800 font-medium"
                onMouseDown={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </header>
  
        {/* Grid de imágenes tipo Pinterest */}
        <main className="flex-1 overflow-y-auto px-4 py-4 bg-gray-100">
            <MasonryLayout>
              {pins.map(pin => (
                <Pin key={pin.id} pin={pin} />
              ))}
            </MasonryLayout>

            {loading && (
              <p className="text-center mt-8 text-gray-600 font-semibold">
                Cargando más imágenes...
              </p>
            )}
            {!hasMore && (
              <p className="text-center mt-8 text-gray-400 font-semibold">
                No hay más imágenes
              </p>
            )}
          </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon }) {
  return (
    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-100 text-gray-700 hover:text-red-600 transition-all">
      {icon}
    </button>
  );
}
