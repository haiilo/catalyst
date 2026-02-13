import { source } from '@/lib/source';
import { StatusBadge } from './status-badge';
import Link from 'next/link';

interface CategoryOverviewProps {
  category: string;
}

export function CategoryOverview({ category }: CategoryOverviewProps) {
  const pages = source.getPages()
    .filter(page => 
      page.slugs[0] === category && 
      page.slugs.length > 1
    )
    .sort((a, b) => a.data.title.localeCompare(b.data.title));

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 font-medium">Page</th>
          <th className="text-left py-3 font-medium">Status</th>
          <th className="text-left py-3 font-medium">Last edited</th>
        </tr>
      </thead>
      <tbody>
        {pages.map(page => {
          const lastModified = page.data.lastModified;
          
          return (
            <tr key={page.url} className="border-b">
              <td className="py-3">
                <Link href={page.url} className="text-fd-primary hover:underline">
                  {page.data.title}
                </Link>
              </td>
              <td className="py-3">
                <StatusBadge status={page.data.status} />
              </td>
              <td className="py-3 text-fd-muted-foreground">
                {lastModified?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) || '—'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
