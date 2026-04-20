'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';

interface CopyButtonProps {
  value: string;
  visible: boolean;
}

function CopyButton({ value, visible }: CopyButtonProps) {
  const [checked, onClick] = useCopyButton(() => {
    return navigator.clipboard.writeText(value);
  });

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      aria-label={checked ? 'Copied' : `Copy ${value}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 18,
        height: 18,
        padding: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        opacity: visible || checked ? 1 : 0,
        transition: 'opacity 0.15s ease',
        color: checked ? '#10b981' : '#9ca3af',
        flexShrink: 0,
      }}
    >
      {checked ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

interface CopyableValueProps {
  value: string;
  children: React.ReactNode;
  minWidth?: number;
}

export function CopyableValue({ value, children, minWidth }: CopyableValueProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        minWidth: minWidth,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <CopyButton value={value} visible={isHovered} />
    </span>
  );
}
