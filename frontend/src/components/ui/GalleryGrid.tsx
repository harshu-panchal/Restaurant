import { useState } from 'react';
import Lightbox from './Lightbox';
import type { GalleryItem } from '../../types';

// CSS-columns masonry — mixed portrait/landscape/square images create
// visual rhythm instead of a uniform equal-sized grid.
export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 md:gap-5">
        {items.map((item, index) => (
          <button
            key={item._id}
            onClick={() => setActiveIndex(index)}
            className="mb-4 block w-full overflow-hidden bg-cream md:mb-5"
          >
            <img
              src={item.image}
              alt={item.title || 'Catering photography'}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <Lightbox
        items={items.map((item) => ({ image: item.image, title: item.title }))}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
