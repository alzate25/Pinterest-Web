import React from 'react';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 4,  // columnas para pantallas grandes
  1100: 3,
  700: 2,
  500: 1,
};

export default function MasonryLayout({ children }) {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto gap-4"
      columnClassName="flex flex-col gap-4"
    >
      {children}
    </Masonry>
  );
}
