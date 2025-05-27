// Pin.jsx
import React from 'react';

export default function Pin({ pin }) {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer
      hover:shadow-xl transition-shadow duration-300 border border-transparent"
      style={{ margin: '8px' }}
    >
      <img
        src={pin.src}
        alt={pin.alt}
        loading="lazy"
        className="w-full object-cover rounded-3xl block"
        style={{ borderRadius: '1.5rem' }}
      />
      <div className="p-3">
        <p className="text-sm text-gray-700 font-semibold">{pin.title}</p>
      </div>
    </div>
  );
}
