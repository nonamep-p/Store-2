import Link from 'next/link';
import { Store } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Store className="h-6 w-6 text-primary" />
      <span className="text-lg font-semibold tracking-tight">Zenith Market</span>
    </Link>
  );
}
