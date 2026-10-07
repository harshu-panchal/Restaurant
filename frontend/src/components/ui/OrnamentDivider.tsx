// A single thin motif used sparingly between sections to carry a subtle
// Indian textile/jaali reference without decorative overload.
export default function OrnamentDivider() {
  return (
    <div className="ornament-divider" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 0 L9 5 L14 7 L9 9 L7 14 L5 9 L0 7 L5 5 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
