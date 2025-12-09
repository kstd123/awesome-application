This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## AWS 控制台管理该应用的主要入口（基于当前 CDK 配置：S3 + CloudFront + S3 Deployment）：

1) CloudFront（内容分发 + 自定义域/证书）
- 入口：AWS 控制台 → CloudFront → Distributions
- 找到名为 `Distribution` 的分发（或使用输出的 DomainName），可查看/修改：
  - 域名、CNAME、证书（ACM）、缓存策略、错误响应、行为配置等
  - 无需改动已配置的 403/404 回退，除非路由策略变更

2) S3（静态站点文件存储）
- 入口：AWS 控制台 → S3 → 找到 `WebsiteBucket`（CDK 创建）
- 查看/清理/替换静态资源（`out/` 导出物）
- 通常不手动上传，保持 CDK 部署（s3deploy）自动同步；手工改动可能被后续部署覆盖

3) CloudFormation（CDK 管理的栈）
- 入口：AWS 控制台 → CloudFormation → Stacks
- 栈名为你部署时的 stack 名（在 CDK 部署输出里），可：
  - 查看事件、输出（包括 CloudFront 域名）
  - 回滚/删除/更新栈（更新=再部署）

4) IAM（访问权限）
- 入口：AWS 控制台 → IAM
- CDK 部署使用的凭证/Role 权限管理；若需最小权限或分环境隔离，可在此调整

5) 证书（若配置自定义域）
- 入口：AWS 控制台 → Certificate Manager (ACM)
- 证书需在 us-east-1 为 CloudFront 提供；域名解析在 Route53（如使用）

日常操作建议
- 查看访问情况：CloudFront 分发的 Monitoring（或 CloudWatch Metrics）
- 查看/刷新缓存：CloudFront → Invalidations（当需立即更新资源）
- 再部署：本地 `npm run build && npm run deploy`（保持 `out/` 作为静态源）

如需我补充具体栈名、域名输出或引导到精确的控制台链接，请告诉我部署时使用的 stack 名。