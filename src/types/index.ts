import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
  items?: NavItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  dataAiHint?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon; // Or string if using image paths
  link?: string;
}

export interface ResourceItem {
  title: string;
  description: string;
  category: string;
  link: string;
  type: 'article' | 'tool' | 'video' | 'website';
}

export interface NewsArticleMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  tags?: string[];
  image?: string;
  dataAiHint?: string;
}

export interface NewsArticle extends NewsArticleMeta {
  content: string;
}

export interface LegalPageInfo {
  slug: string;
  title: string;
}

export interface LegalPageContent extends LegalPageInfo {
  content: string;
}
