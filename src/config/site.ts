
import type { NavItem, TeamMember, ServiceItem, ResourceItem, LegalPageInfo, NewsArticleMeta } from '@/types';
import { Home, Info, Briefcase, BookOpen, Users, Scale, Newspaper, DollarSign, Twitter, Mail, Github, Languages, Camera } from 'lucide-react'; // Assuming Languages and Camera icons exist or are placeholders

export const siteConfig = {
  name: "UofCHN 指南针",
  slogan: "为所有成员编织一个更光明的未来，无关身份。",
  description: "UofCHN Project 致力于为刚成年的大学生及初入社会的青年人，特别是那些在社交、生活适应方面面临挑战的个体，提供一个包容、实用、充满智慧的生活指南与互助社群。",
  url: "https://uofchn.org", // 请替换为实际URL
  logo: "/logo.svg", // 请替换为实际logo路径
  companyName: "天津同跨科技有限公司",
  contactEmail: "contact@uofchn.org",
  socialLinks: {
    twitter: "https://twitter.com/uofchn", // 请替换为实际Twitter链接
    github: "https://github.com/uofchn", // 请替换为实际GitHub链接
  },
  donationUrl: "https://stripe.com/donations/placeholder", // 请替换为实际Stripe捐款链接
};

export const navItems: NavItem[] = [
  { title: "首页", href: "/", icon: Home },
  { title: "关于我们", href: "/about", icon: Info },
  { title: "服务项目", href: "/services", icon: Briefcase },
  { title: "资源中心", href: "/resources", icon: BookOpen },
  { title: "参与我们", href: "/get-involved", icon: Users },
  { title: "新闻动态", href: "/newsroom", icon: Newspaper },
  { title: "法律声明", href: "/legal/privacy-policy", icon: Scale },
];

export const footerNavItems: NavItem[] = [
  { title: "隐私政策", href: "/legal/privacy-policy" },
  { title: "服务条款", href: "/legal/terms-of-service" },
  { title: "退款政策", href: "/legal/refund-policy" },
  { title: "免责声明", href: "/legal/disclaimer" },
  { title: "版权声明", href: "/legal/copyright-notice" },
];


export const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen", // 姓名通常保留原文或使用常用中文名
    role: "创始人 & 项目主管",
    bio: "致力于为年轻人创建支持性社区和资源。拥有心理学和软件开发背景。",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "person portrait",
  },
  {
    name: "Jamie Lee",
    role: "首席开发者",
    bio: "热衷于利用技术促进社会公益。擅长 Web 开发和 AI 集成。",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "developer coding",
  },
  {
    name: "Samira Khan",
    role: "内容 & 社区经理",
    bio: "专注于创作引人入胜的内容并营造包容性的在线环境。拥有数字传播经验。",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "community manager",
  },
];

export const serviceItems: ServiceItem[] = [
  {
    title: "“阿斯伯格生活指南” Wiki",
    description: "一份全面的指南，涵盖了自闭症谱系个体生活的各个方面，侧重于实用技能、社交导航和福祉。通过专家见解和社区贡献不断更新。",
    icon: BookOpen,
    link: "/resources",
  },
  {
    title: "社区论坛",
    description: "一个安全且支持性的在线空间，供成员联系、分享经验、提出问题并提供相互支持。经过审核以确保积极和尊重的氛围。",
    icon: Users,
    link: "#", // 论坛链接占位符
  },
  {
    title: "资源中心",
    description: "精选的与阿斯伯格综合症、ADHD、社交技能、心理健康和生活适应相关的文章、工具和链接。您获取可靠信息和支持的首选之地。",
    icon: Briefcase,
    link: "/resources",
  },
  {
    title: "外语翻译 & 辅导",
    description: "专业的翻译服务和个性化语言辅导，帮助弥合沟通差距，增强学习机会。（商业服务）",
    icon: Languages, // 替换为合适的图标，例如 Languages
    link: "#",
  },
  {
    title: "摄影服务",
    description: "为各种需求提供创意和专业的摄影服务，以技巧和艺术性捕捉瞬间。（商业服务）",
    icon: Camera, // 替换为合适的图标，例如 Camera
    link: "#",
  },
];

export const ctaButtons = [
  { text: "了解更多", href: "/about", variant: "secondary" as const },
  { text: "参与我们", href: "/get-involved", variant: "default" as const },
  { text: "查看指南", href: "/resources", variant: "default" as const },
  { text: "支持我们", href: siteConfig.donationUrl, variant: "outline" as const, external: true },
];

export const legalPages: LegalPageInfo[] = [
    { slug: 'privacy-policy', title: '隐私政策' },
    { slug: 'terms-of-service', title: '服务条款' },
    { slug: 'refund-policy', title: '退款政策' },
    { slug: 'disclaimer', title: '免责声明' },
    { slug: 'copyright-notice', title: '版权声明' },
];
