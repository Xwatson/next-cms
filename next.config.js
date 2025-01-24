/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
    'rc-field-form',
    'rc-input',
    'rc-input-number',
    'rc-select',
    'rc-cascader',
    'rc-checkbox',
    'rc-dropdown',
    'rc-menu',
    'rc-switch'
  ],
  reactStrictMode: true,
}

module.exports = nextConfig
