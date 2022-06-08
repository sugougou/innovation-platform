export interface Member {
  name: string
  description: string
  github: string
  githubUserName: string
  blog?: string
  twitter?: string
  bilibili?: string
}

export const members: Member[] = [
  {
    name: 'cxOrz',
    description: '一杯茶，一根网线，一台电脑',
    github: 'https://github.com/cxOrz',
    githubUserName: 'cxOrz',
    blog: 'https://meoo.space',
    twitter: 'https://twitter.com',
    bilibili: 'https://space.bilibili.com/18844857'
  },
  {
    name: '楚西文',
    description: '积极向上的菜鸡',
    github: 'https://github.com/chuxiwen-forever',
    githubUserName: 'chuxiwen-forever',
    blog: 'https://www.chuxiwen.top'
  },
  {
    name: 'Gezi',
    description: '搞点有意思的玩意才有意思',
    github: 'https://github.com/Gezi-lzq',
    githubUserName: 'Gezi-lzq',
    blog: 'https://gezi-lzq.github.io/',
    bilibili: 'https://space.bilibili.com/153258889',
  }
]
