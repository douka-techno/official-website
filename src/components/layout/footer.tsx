
import Link from 'next/link';
import { siteConfig, footerNavItems } from '@/config/site';
import { Mail, Twitter, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-semibold text-foreground mb-2">{siteConfig.name}</h5>
            <p className="text-sm text-muted-foreground">{siteConfig.slogan}</p>
            <p className="text-sm text-muted-foreground mt-2">{siteConfig.companyName}</p>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-2">快速链接</h5>
            <ul className="space-y-1">
              {footerNavItems.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-2">联系我们</h5>
            <div className="flex space-x-4 mb-2">
              <Link href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="推特" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href={`mailto:${siteConfig.contactEmail}`} aria-label="邮箱" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </Link>
               {siteConfig.socialLinks.github && (
                <Link href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary">
                  <Github className="h-5 w-5" />
                </Link>
              )}
            </div>
            <p className="text-sm text-muted-foreground">联系方式：{siteConfig.contactEmail}</p>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}。版权所有。
          </p>
          {/* <p className="text-sm text-muted-foreground mt-1">备案号: [您的ICP备案号]</p> */}
        </div>
      </div>
    </footer>
  );
}
