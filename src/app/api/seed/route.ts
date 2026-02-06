import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/client';

// 使用基础 PrismaClient，不加速扩展
const prisma = new PrismaClient();

export async function GET() {
  // 只在开发环境允许
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    // 清理现有数据（先清理关联关系）
    const existingPosts = await prisma.post.findMany();
    for (const post of existingPosts) {
      await prisma.post.update({
        where: { id: post.id },
        data: { tags: { set: [] } },
      });
    }

    await prisma.post.deleteMany();
    await prisma.category.deleteMany();
    await prisma.tag.deleteMany();

    // 创建分类
    const techCategory = await prisma.category.create({
      data: {
        name: '技术文章',
        slug: 'tech',
        description: '关于区块链、AI、Web3技术的文章',
      },
    });

    const productCategory = await prisma.category.create({
      data: {
        name: '产品动态',
        slug: 'product',
        description: 'AIL2产品更新和动态',
      },
    });

    // 创建标签
    const blockchainTag = await prisma.tag.create({
      data: { name: '区块链', slug: 'blockchain' },
    });

    const aiTag = await prisma.tag.create({
      data: { name: '人工智能', slug: 'ai' },
    });

    const web3Tag = await prisma.tag.create({
      data: { name: 'Web3', slug: 'web3' },
    });

    // 创建文章1
    const post1 = await prisma.post.create({
      data: {
        title: 'AIL2：去中心化AI的未来',
        slug: 'ail2-future-of-decentralized-ai',
        content: `<h2>什么是AIL2？</h2>
<p>AIL2是一个构建在分布式GPU矿工网络和跨链结算层之上的去中心化AI应用生态系统。它作为一个标准化的基础设施解决方案，赋能开发者在多个区块链上高效部署和扩展去中心化AI应用。</p>

<h2>为什么选择去中心化AI？</h2>
<p>传统的AI服务依赖于中心化服务器，存在单点故障、数据隐私和审查等问题。去中心化AI通过分布式网络解决了这些挑战：</p>
<ul>
  <li><strong>抗审查</strong>：没有中心化机构可以关闭服务</li>
  <li><strong>数据隐私</strong>：用户数据不会被单一实体控制</li>
  <li><strong>全球可访问</strong>：任何地方都可以访问AI服务</li>
  <li><strong>成本效益</strong>：利用闲置GPU资源，降低计算成本</li>
</ul>

<h2>技术架构</h2>
<p>AIL2采用四层架构设计：</p>
<ol>
  <li><strong>计算层</strong>：由分布式GPU矿工节点组成</li>
  <li><strong>网络层</strong>：处理请求路由和调度</li>
  <li><strong>结算层</strong>：管理跨链支付和计费</li>
  <li><strong>生态层</strong>：面向用户的SDK和平台</li>
</ol>

<h2>结语</h2>
<p>AIL2正在重新定义AI服务的交付方式，让去中心化智能成为现实。加入我们，共同构建AI的未来。</p>`,
        excerpt: '探索AIL2如何通过去中心化GPU网络和跨链结算层，为AI应用提供无限可扩展的基础设施。',
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
        metaTitle: 'AIL2：去中心化AI的未来 | AIL2 Blog',
        metaDesc: '了解AIL2如何通过分布式GPU网络实现去中心化AI服务。',
        keywords: ['AIL2', '去中心化AI', '区块链', 'GPU挖矿', 'Web3'],
        ogImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
        status: 'PUBLISHED',
        publishedAt: new Date('2025-01-15'),
        authorId: 'admin',
        authorName: 'AIL2团队',
        categoryId: techCategory.id,
        viewCount: 1258,
        tags: {
          connect: [{ id: blockchainTag.id }, { id: aiTag.id }, { id: web3Tag.id }],
        },
      },
    });

    // 创建文章2
    const post2 = await prisma.post.create({
      data: {
        title: '如何在AIL2上部署你的第一个AI模型',
        slug: 'deploy-first-ai-model-on-ail2',
        content: `<h2>准备工作</h2>
<p>在开始之前，请确保你已经：</p>
<ul>
  <li>注册了AIL2开发者账号</li>
  <li>安装了AIL2 CLI工具</li>
  <li>准备好你的AI模型文件</li>
</ul>

<h2>步骤一：创建项目</h2>
<p>使用CLI创建一个新项目：</p>
<pre><code>ail2 project create my-first-model
cd my-first-model</code></pre>

<h2>步骤二：配置模型</h2>
<p>编辑 ail2.yaml 文件，配置你的模型参数。</p>

<h2>步骤三：部署模型</h2>
<p>运行部署命令：</p>
<pre><code>ail2 deploy</code></pre>

<h2>验证部署</h2>
<p>部署完成后，你可以通过API测试你的模型。</p>

<h2>下一步</h2>
<p>恭喜！你已经成功部署了第一个AI模型。</p>`,
        excerpt: '本教程将手把手教你如何在AIL2平台上快速部署和运行你的第一个AI模型。',
        coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop',
        metaTitle: '如何在AIL2上部署你的第一个AI模型 | AIL2 Blog',
        metaDesc: '5分钟快速入门教程，教你如何在AIL2去中心化AI平台上部署AI模型。',
        keywords: ['教程', 'AI部署', '开发指南', 'CLI'],
        ogImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop',
        status: 'PUBLISHED',
        publishedAt: new Date('2025-01-20'),
        authorId: 'admin',
        authorName: '技术团队',
        categoryId: techCategory.id,
        viewCount: 892,
        tags: {
          connect: [{ id: aiTag.id }],
        },
      },
    });

    // 创建文章3 - 草稿
    const post3 = await prisma.post.create({
      data: {
        title: 'AIL2 2025年路线图发布',
        slug: 'ail2-2025-roadmap',
        content: `<h2>回顾2024</h2>
<p>在过去的一年里，AIL2取得了显著的进展：</p>
<ul>
  <li>主网上线，支持6条主流区块链</li>
  <li>超过10,000个GPU节点加入网络</li>
  <li>处理了超过1亿次推理请求</li>
  <li>开发者社区增长到50,000人</li>
</ul>

<h2>2025年愿景</h2>
<p>新的一年，我们将专注于以下几个关键领域...</p>`,
        excerpt: '了解AIL2在2025年的发展规划，包括性能优化、生态扩展、企业级功能和全球化战略。',
        coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
        metaTitle: 'AIL2 2025年路线图发布 | AIL2 Blog',
        metaDesc: '探索AIL2的2025年发展蓝图。',
        keywords: ['路线图', '2025', '产品规划'],
        ogImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
        status: 'DRAFT',
        publishedAt: null,
        authorId: 'admin',
        authorName: '产品团队',
        categoryId: productCategory.id,
        viewCount: 0,
        tags: {
          connect: [{ id: web3Tag.id }],
        },
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: '测试数据添加成功',
      data: {
        categories: 2,
        tags: 3,
        posts: [
          { title: post1.title, status: post1.status, slug: post1.slug },
          { title: post2.title, status: post2.status, slug: post2.slug },
          { title: post3.title, status: post3.status, slug: post3.slug },
        ],
      },
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    await prisma.$disconnect();
    return NextResponse.json(
      { error: '添加测试数据失败: ' + error.message },
      { status: 500 }
    );
  }
}
