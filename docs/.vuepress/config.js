module.exports = {
  base: '/', //目标地址是：https://happyndoc.github.io
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'happyndoc',
      description: 'happynet组网系统的文档中心'
    },
    '/en/': {
      lang: 'en-US',
      title: 'happyndoc',
      description: 'THe documents of happynet platform'
    }
  },
  themeConfig: {
    logo: '/favicon-32x32.png',
    locales: {
      '/en': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {},
        nav: [
          { text: 'Guide', link: '/guide/', ariaLabel: 'Guide' },
          { text: 'Download', link: '/guide/download', ariaLabel: 'Download' },
					{ text: 'Github', link: 'https://github.com/happynclient' }
        ],
        sidebar: {
          '/en/guide/': [
            '',
            'server',
            'windows'
          ],
          '/en/resource/': [],
        }
      },
      '/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: [
          { text: '指南', link: '/guide/', ariaLabel: '指南' },
          { text: '下载', link: '/resource', ariaLabel: '下载' },
					{ text: '论坛', link: 'https://forum.happyn.cn' },
          { text: '交流群', link: '/chatgroup', ariaLabel: '交流群' },
					{ text: 'Github', link: 'https://github.com/happynclient' }
        ],
        sidebar: {
          '/guide/': [
            'server',
            'windows',
            'linux',
            'macOS',
            'Android',
            'ios',
            'synology',
            'openwrt'
          ],
          '/resource/': ['resource'],
        }
      }
    }
  },

}
