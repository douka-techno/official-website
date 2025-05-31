
import { siteConfig, serviceItems } from '@/config/site';
import { Container } from '@/components/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, DollarSign } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: '我们的服务与项目',
    description: `探索 ${siteConfig.name} 提供的服务与项目，包括我们的维基、社区论坛等。`,
  };
}

export default function ServicesPage() {
  return (
    <>
      <Container className="bg-secondary/30">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">我们的服务与项目</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            了解我们为支持社区而提供的各种举措和资源。
          </p>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((item) => (
            <Card key={item.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 rounded-full bg-accent mb-4">
                  <item.icon className="h-10 w-10 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center">{item.description}</CardDescription>
              </CardContent>
              {item.link && (
                <CardFooter className="justify-center">
                  <Button asChild variant="outline">
                    <Link href={item.link}>
                      {item.link === "#" ? "敬请期待" : "了解更多"}
                    </Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </Container>

      <Container className="bg-secondary/30">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">付费服务 & 捐款</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-6">
            虽然我们的许多资源是免费的，但一些专业服务和项目的可持续性依赖于资金支持。您的贡献，无论是通过使用我们的商业服务还是直接捐款，都有助于我们继续工作。
          </p>
          <Card className="mb-8 text-left shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <DollarSign className="mr-2 h-6 w-6" /> Stripe 支持服务
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                我们使用 Stripe 安全处理商业服务付款和捐款。这确保您的财务信息得到最高级别的安全处理。
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" /> 付费内容和服务的安全交易。</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" /> 便捷安全的捐款处理。</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" /> 适用服务的明确退款政策（请参阅我们的法律声明部分）。</li>
              </ul>
            </CardContent>
            <CardFooter className="justify-center">
              <Button asChild size="lg">
                <Link href={siteConfig.donationUrl} target="_blank" rel="noopener noreferrer">
                  支持我们的使命
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <p className="text-sm text-muted-foreground">
            所有来自商业服务和捐款的收益都将重新投入到 UofCHN 项目中，用于维护和扩展我们的产品、开发新资源并支持我们的社区活动。
          </p>
        </div>
      </Container>
    </>
  );
}
