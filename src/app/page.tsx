
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig, serviceItems, ctaButtons } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Container } from '@/components/container';
import { CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Container className="text-center bg-gradient-to-b from-background to-secondary/30 pt-16 pb-20">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-xl text-foreground sm:text-2xl md:text-3xl">
          {siteConfig.slogan}
        </p>
        <p className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {ctaButtons.slice(0, 2).map((cta) => (
             <Button key={cta.text} asChild size="lg" variant={cta.variant}>
              {cta.external ? (
                <a href={cta.href} target="_blank" rel="noopener noreferrer">{cta.text}</a>
              ) : (
                <Link href={cta.href}>{cta.text}</Link>
              )}
            </Button>
          ))}
        </div>
      </Container>

      {/* Core Services Section */}
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">我们的核心服务</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.slice(0,3).map((item) => (
            <Card key={item.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-accent mb-4">
                  <item.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center">{item.description}</CardDescription>
              </CardContent>
              {item.link && (
                <CardContent className="text-center">
                   <Button asChild variant="link" className="text-primary hover:underline">
                     <Link href={item.link}>{item.link === "#" ? "敬请期待" : "了解更多"} &rarr;</Link>
                   </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </Container>

      {/* Vision/Mission Section */}
      <Container className="bg-secondary/30">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">我们的愿景与使命</h2>
            <p className="text-lg text-muted-foreground mb-4">
              我们相信，在一个世界里，每个年轻人，无论其神经多样性或背景如何，都拥有茁壮成长的工具和支持。我们的使命是提供实用的指导，培养归属感，并赋能个体自信地应对生活挑战。
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                <span>提供易于获取、实用的生活指南和资源。</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                <span>培养一个包容和支持性的社区。</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                <span>倡导对神经多样性的理解和接纳。</span>
              </li>
            </ul>
             <Button asChild className="mt-8" size="lg">
              <Link href="/about">探索我们的故事</Link>
            </Button>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="团队合作"
              data-ai-hint="community support"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </Container>

      {/* Final CTA Section */}
      <Container className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-primary">准备好加入我们了吗？</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          无论您是在寻求指导、希望做出贡献，还是想支持我们的使命，{siteConfig.name} 都有您的一席之地。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
           {ctaButtons.slice(2).map((cta) => (
             <Button key={cta.text} asChild size="lg" variant={cta.variant}>
              {cta.external ? (
                <a href={cta.href} target="_blank" rel="noopener noreferrer">{cta.text}</a>
              ) : (
                <Link href={cta.href}>{cta.text}</Link>
              )}
            </Button>
          ))}
        </div>
      </Container>
    </>
  );
}
