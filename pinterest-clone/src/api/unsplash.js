const ACCESS_KEY = 'djy3O_vfwTukoltk6OMv5Ggz2SDgos7XLCZ6WtkCfd8';

export async function fetchUnsplashImages(query = 'nature', perPage = 20, page = 1) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error fetching images from Unsplash');
  }

  const data = await res.json();

  return data.results.map(photo => ({
    id: photo.id,
    src: photo.urls.small,
    alt: photo.alt_description || 'Unsplash Image',
    title: photo.user.name,
  }));
}
