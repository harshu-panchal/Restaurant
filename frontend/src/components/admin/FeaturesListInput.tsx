import { useState } from 'react';

interface FeaturesListInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function FeaturesListInput({ value, onChange }: FeaturesListInputProps) {
  const [draft, setDraft] = useState('');

  function add() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setDraft('');
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="admin-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Add a feature and press Enter"
        />
        <button type="button" onClick={add} className="rounded border border-slate-300 px-4 text-sm text-slate-600 hover:bg-slate-50">
          Add
        </button>
      </div>
      {value.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {value.map((feature, index) => (
            <li key={`${feature}-${index}`} className="flex items-center justify-between rounded bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
              {feature}
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="text-slate-400 hover:text-red-500"
                aria-label={`Remove ${feature}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
