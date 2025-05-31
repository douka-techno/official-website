
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Heart, Users, Edit3, Share2, DollarSign } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: '参与我们 & 支持我们',
    description: `了解如何作为志愿者、内容贡献者或通过捐款为 ${siteConfig.name} 做出贡献。`,
  };
}

const involvementOptions = [
  {
    title: "成为志愿者",
    description: "贡献您的技能和时间，帮助我们管理社区、组织活动或协助行政工作。您的贡献将产生巨大影响。",
    icon: Users,
    actionText: "表达意向",
    actionLink: `mailto:${siteConfig.contactEmail}?subject=Volunteer Inquiry`,
  },
  {
    title: "贡献内容",
    description: "通过为我们的“阿斯伯格生活指南”维基贡献内容或为我们的资源版块撰写文章，来分享您的知识和经验。帮助我们建立一个丰富且有价值的知识库。",
    icon: Edit3,
    actionText: "提交想法",
    actionLink: `mailto:${siteConfig.contactEmail}?subject=Content Contribution Inquiry`,
  },
  {
    title: "进行捐款",
    description: "在经济上支持我们的使命。捐款帮助我们支付运营成本、开发新资源并扩大我们的影响力。每一笔捐款，无论大小，我们都深表感谢。",
    icon: DollarSign,
    actionText: "立即捐款",
    actionLink: siteConfig.donationUrl,
    external: true,
  },
  {
    title: "分享 & 传播",
    description: "帮助我们接触更多可能从我们的资源和社区中受益的人。通过社交媒体或口碑将我们的网站和项目分享给您的网络。",
    icon: Share2,
    actionText: "分享至推特",
    actionLink: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`来看看 ${siteConfig.name} - 一个充满支持的社区和生活指南: ${siteConfig.url}`)}&via=uofchn`,
    external: true,
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <Container className="bg-secondary/30">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">参与我们 & 支持我们</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            加入我们，共同编织更光明的未来。您可以通过多种方式做出贡献并产生影响。
          </p>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {involvementOptions.map((option) => (
            <Card key={option.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-accent mb-4">
                  <option.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center">{option.description}</CardDescription>
              </CardContent>
              <CardContent className="text-center">
                <Button asChild>
                  {option.external ? (
                    <a href={option.actionLink} target="_blank" rel="noopener noreferrer">
                      {option.actionText}
                    </a>
                  ) : (
                    <Link href={option.actionLink}>
                      {option.actionText}
                    </Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="bg-secondary/30">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">您的支持为何重要</h2>
            <p className="text-lg text-muted-foreground mb-4">
              {siteConfig.name} 不仅仅是一个网站；它是一个不断壮大的社区，也是许多年轻人的生命线。您的任何形式的参与都能帮助我们：
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start"><Heart className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> 用最新且相关的信息扩展我们的资源库。</li>
              <li className="flex items-start"><Heart className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> 维护和改进我们的平台以提供更好的用户体验。</li>
              <li className="flex items-start"><Heart className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> 培养一个安全、包容且支持性的在线社区。</li>
              <li className="flex items-start"><Heart className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> 开发新的项目和举措以满足不断变化的需求。</li>
            </ul>
            <p className="text-lg text-muted-foreground">
              携手并进，我们可以对许多人的生活产生重大的积极影响。
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/500x400.png"
              alt="社区支持视觉图像"
              data-ai-hint="community hands"
              width={500}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
         <div className="text-center mt-12 md:col-span-2">
            <Button asChild size="lg" variant="outline">
                <Link href={`mailto:${siteConfig.contactEmail}?subject=Partnership Inquiry`}>
                    与我们合作
                </Link>
            </Button>
        </div>
        </div> {/* Closing the grid div */}
      </Container>
    </>
  );
}
