
import Image from 'next/image';
import { siteConfig, teamMembers } from '@/config/site';
import { Container } from '@/components/container';
import { TeamMemberCard } from '@/components/team-member-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Twitter, Users, Heart } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: '关于我们',
    description: `了解 ${siteConfig.name} 背后的使命、愿景和团队。`,
  };
}

export default function AboutPage() {
  return (
    <>
      <Container className="bg-secondary/30">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">关于 {siteConfig.name}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            了解我们的故事、使命以及致力于做出改变的专注团队。
          </p>
        </div>
      </Container>

      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">我们的故事与起源</h2>
            <p className="text-lg text-muted-foreground mb-4">
              UofCHN 项目源于一个共同的愿景：为在成年初期复杂生活中探索的年轻人创建一个支持的灯塔。我们认识到许多人，特别是那些神经多样性个体或面临社会适应挑战的人，常常缺乏易于获得、实用且富有同情心的指导。
            </p>
            <p className="text-lg text-muted-foreground">
              我们的创始人，在个人经历和促进包容性的集体愿望的驱动下，开始了这段旅程，旨在建立一个不仅提供信息，更是一个社区的平台。我们的目标是揭开生活障碍的神秘面纱，让每位成员都能编织自己更光明的未来，不受身份的限制。
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/500x350.png"
              alt="创始团队头脑风暴"
              data-ai-hint="team collaboration"
              width={500}
              height={350}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </Container>

      <Container className="bg-secondary/30">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">我们的使命与愿景</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-foreground mb-6">
            我们的口号， <span className="font-semibold text-primary">&quot;{siteConfig.slogan}&quot;</span>，是我们理念的基石。
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            <strong>使命：</strong> 为年轻人，特别是那些面临独特社交和适应挑战的人，提供全面的、用户友好的生活指南和一个支持性的同伴社区。我们努力为他们提供实用知识、应对策略和一个充满理解的个体网络。
          </p>
          <p className="text-lg text-muted-foreground">
            <strong>愿景：</strong> 培养一个颂扬神经多样性的社会，让每个年轻人都感到被理解、被重视，并有能力充分发挥其潜力。我们期望 UofCHN 指南针成为一个领先的资源，为其所有成员倡导包容性和福祉。
          </p>
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">认识我们的核心团队</h2>
        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">我们的团队信息目前正在更新中。请稍后查看！</p>
        )}
        <p className="mt-8 text-center text-muted-foreground">
          我们的团队融合了多元化的才能和背景，因对这个项目的热情而团结在一起。我们相信协作、同理心和持续学习，以便最好地服务我们的社区。
        </p>
      </Container>

      <Container className="bg-secondary/30 text-center">
        <h2 className="text-3xl font-bold mb-6 text-primary">联系我们</h2>
        <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-8">
          我们很乐意收到您的来信！无论您有任何问题、反馈，还是想参与其中，请随时与我们联系。
        </p>
        <div className="flex justify-center space-x-6">
          <Button asChild variant="outline" size="lg">
            <a href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="在推特上关注我们">
              <Twitter className="mr-2 h-5 w-5" /> 推特
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`mailto:${siteConfig.contactEmail}`} aria-label="给我们发送邮件">
              <Mail className="mr-2 h-5 w-5" /> 邮件联系
            </a>
          </Button>
        </div>
        <div className="mt-12">
          <Button asChild size="lg">
            <Link href="/get-involved">
              <Heart className="mr-2 h-5 w-5" /> 加入或支持我们
            </Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
