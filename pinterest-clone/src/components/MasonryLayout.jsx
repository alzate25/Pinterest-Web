// MasonryLayout.jsx
import React from 'react';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function MasonryLayout({ children }) {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 flex flex-col gap-8"
      >
        {children}
      </Masonry>
    </div>
  );
}
