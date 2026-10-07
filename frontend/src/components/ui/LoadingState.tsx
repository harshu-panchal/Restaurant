export default function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-charcoal/50">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal/20 border-t-gold" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
