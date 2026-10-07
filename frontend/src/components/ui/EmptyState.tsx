export default function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="py-16 text-center">
      <p className="font-display text-xl text-charcoal/70">{title}</p>
      {description && <p className="mt-2 text-sm text-charcoal/50">{description}</p>}
    </div>
  );
}
