import { useEffect, useState, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { fetchUnsplashImages } from './api/unsplash';
import Slidebar from './components/Slidebar';

const breakpointColumnsObj = {
  default: 5,
  1280: 4,
  1024: 3,
  768: 2,
  480: 1,
};

function Pin({ pin }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <img
        src={pin.src}
        alt={pin.alt}
        className="w-full object-cover rounded-t-lg"
        loading="lazy"
      />
      <div className="p-2 bg-white rounded-b-lg">
        <p className="text-xs text-gray-600 font-semibold">{pin.title}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('nature');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadImages = useCallback(async (reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const images = await fetchUnsplashImages(query, 20, reset ? 1 : page);
      if (images.length === 0) setHasMore(false);

      setPins(prev => (reset ? images : [...prev, ...images]));
      if (reset) {
        setPage(2);
        setHasMore(true);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query, page, loading]);

  useEffect(() => {
    loadImages(true);
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        loadImages();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, loadImages]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar ocupa espacio a la izquierda */}
      <Slidebar />

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-[#f0f0f0]">
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Buscar imágenes..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="border border-gray-300 rounded-full px-5 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
          />
          <button
            onClick={() => loadImages(true)}
            className="ml-2 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
          >
            Buscar
          </button>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-6"
          columnClassName="flex flex-col gap-6"
        >
          {pins.map(pin => (
            <div key={pin.id}>
              <Pin pin={pin} />
            </div>
          ))}
        </Masonry>

        {loading && (
          <p className="text-center mt-8 text-gray-600 font-semibold">Cargando más imágenes...</p>
        )}
        {!hasMore && (
          <p className="text-center mt-8 text-gray-400 font-semibold">No hay más imágenes</p>
        )}
      </main>
    </div>
  );
}
