
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Compass } from 'lucide-react'; // Using Compass as a placeholder

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label={`${siteConfig.name} 主页`}>
      <Compass className="h-8 w-8 text-primary" />
      <span className="font-bold text-xl text-foreground hidden sm:inline-block">
        {siteConfig.name}
      </span>
    </Link>
  );
}
