import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import PageHeader from '../components/sections/PageHeader';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';
import MenuCard from '../components/ui/MenuCard';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import DietaryBadge from '../components/ui/DietaryBadge';
import { useApi } from '../hooks/useApi';
import { menuApi } from '../services/api';
import { cn } from '../utils/cn';

export default function Menu() {
  const { data: groups, loading } = useApi(() => menuApi.getPublicMenu(), []);
  const [activeCategory, setActiveCategory] = useState('all');
  const [builderOpen, setBuilderOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const nonEmptyGroups = useMemo(() => (groups || []).filter((g) => g.items.length > 0), [groups]);

  const visibleGroups =
    activeCategory === 'all'
      ? nonEmptyGroups
      : nonEmptyGroups.filter((g) => g.category.slug === activeCategory);

  function toggleItem(name: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function requestCustomMenu() {
    const list = Array.from(selected);
    navigate('/get-a-quote', {
      state: {
        message: `I would like to request the following custom menu:\n${list.map((i) => `- ${i}`).join('\n')}`,
      },
    });
  }

  return (
    <>
      <Seo
        title="Menu"
        description="Browse our wedding catering menu by category — starters, main course, breads, rice, live counters and desserts."
        path="/menu"
      />
      <PageHeader eyebrow="OUR MENU" heading="A Menu Built Around Your Celebration" image="/images/dish-main-course.svg" />

      <section className="container-page py-16 md:py-20">
        {loading && <LoadingState />}
        {!loading && nonEmptyGroups.length === 0 && <EmptyState title="Menu items will be published here soon." />}

        {!loading && nonEmptyGroups.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2 border-b border-charcoal/10 pb-6">
              <button
                onClick={() => setActiveCategory('all')}
                className={cn(
                  'px-4 py-2 text-sm font-medium tracking-wide transition-colors',
                  activeCategory === 'all' ? 'bg-charcoal text-ivory' : 'text-charcoal/60 hover:text-charcoal'
                )}
              >
                All
              </button>
              {nonEmptyGroups.map((group) => (
                <button
                  key={group.category._id}
                  onClick={() => setActiveCategory(group.category.slug)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium tracking-wide transition-colors',
                    activeCategory === group.category.slug ? 'bg-charcoal text-ivory' : 'text-charcoal/60 hover:text-charcoal'
                  )}
                >
                  {group.category.name}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-charcoal/50">
              <span className="flex items-center gap-1.5">
                <DietaryBadge type="veg" /> Vegetarian
              </span>
              <span className="flex items-center gap-1.5">
                <DietaryBadge type="non-veg" /> Non-Vegetarian
              </span>
            </div>

            <div className="mt-10 space-y-14">
              {visibleGroups.map((group) => (
                <div key={group.category._id}>
                  <h2 className="font-display text-2xl text-charcoal">{group.category.name}</h2>
                  <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
                    {group.items.map((item) => (
                      <MenuCard key={item._id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="bg-cream/60 py-16 md:py-20">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="PLAN IT YOUR WAY"
              heading="Build Your Own Menu"
              description="Select the dishes you have in mind and send us your shortlist — we'll follow up with availability and a tailored quote."
            />
            <Button variant="secondary" onClick={() => setBuilderOpen((prev) => !prev)}>
              {builderOpen ? 'Hide Menu Builder' : 'Start Building'}
            </Button>
          </div>

          {builderOpen && !loading && (
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {nonEmptyGroups.map((group) => (
                  <div key={group.category._id}>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">{group.category.name}</p>
                    <ul className="mt-3 space-y-2">
                      {group.items.map((item) => (
                        <li key={item._id}>
                          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-charcoal/75">
                            <input
                              type="checkbox"
                              checked={selected.has(item.name)}
                              onChange={() => toggleItem(item.name)}
                              className="mt-0.5 h-4 w-4 accent-maroon"
                            />
                            {item.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button onClick={requestCustomMenu} disabled={selected.size === 0}>
                  Request This Menu ({selected.size} selected)
                </Button>
                {selected.size > 0 && (
                  <button onClick={() => setSelected(new Set())} className="text-sm text-charcoal/50 underline">
                    Clear selection
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
