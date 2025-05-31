
import { Container } from '@/components/container';
import Link from 'next/link';
import { siteConfig, legalPages } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/" className="text-muted-foreground hover:text-primary">
            <ChevronLeft className="mr-2 h-4 w-4" />
            返回首页
          </Link>
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <nav className="sticky top-24 space-y-2">
            <h3 className="text-lg font-semibold text-primary mb-3">法律与政策</h3>
            {legalPages.map(page => (
              <Link
                key={page.slug}
                href={`/legal/${page.slug}`}
                className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                {page.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          {children}
        </main>
      </div>
    </Container>
  );
}
