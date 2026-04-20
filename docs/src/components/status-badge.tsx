const statusStyles: Record<string, string> = {
  'ready': 'bg-green-100 border-green-200 text-green-800',
  'needs adjustments': 'bg-amber-100 border-amber-200 text-amber-800',
  'deprecated': 'bg-gray-100 border-gray-200 text-gray-600',
  'in progress': 'bg-blue-100 border-blue-200 text-blue-800',
  'not started': 'bg-gray-50 border-gray-200 text-gray-500',
};

export function StatusBadge({ status }: {status: string | undefined}) {
  if (!status) return null;
  
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-md border ${statusStyles[status] || ''}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
