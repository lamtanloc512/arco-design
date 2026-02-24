const fs = require('fs');
const path = require('path');
const ArcoWebpackPlugin = require('@arco-plugins/webpack-react');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const defaultArcoTheme = '@arco-themes/react-navy';

function resolveArcoThemePackage() {
  if (process.env.ARCO_THEME) {
    return process.env.ARCO_THEME;
  }

  const localThemeRoot = path.resolve(__dirname, '../node_modules/@arco-themes');
  if (!fs.existsSync(localThemeRoot)) {
    return defaultArcoTheme;
  }

  const localThemes = fs
    .readdirSync(localThemeRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (!localThemes.length) {
    return defaultArcoTheme;
  }

  const customThemes = localThemes.filter((name) => `@arco-themes/${name}` !== defaultArcoTheme);
  if (customThemes.length) {
    return `@arco-themes/${customThemes[0]}`;
  }

  return `@arco-themes/${localThemes[0]}`;
}

function getLoaderForStyle(isCssModule) {
  return [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: isCssModule ? { modules: true } : {},
    },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      },
    },
  ];
}

module.exports = {
  stories: ['../stories/**/*.story.tsx', '../stories/**/*.story.jsx'],
  webpackFinal: (config) => {
    const activeArcoTheme = resolveArcoThemePackage();
    const dirIcon = path.resolve(__dirname, '../icon');
    const dirHooks = path.resolve(__dirname, '../hooks');
    const dirComponent = path.resolve(__dirname, '../es');

    config.resolve.alias['@self/icon'] = dirIcon;
    config.resolve.alias['@self/hooks'] = dirHooks;
    config.resolve.alias['@self'] = dirComponent;
    config.resolve.alias['@active-arco-theme'] = activeArcoTheme;
    config.resolve.alias['@arco-design/web-react/icon'] = dirIcon;
    config.resolve.alias['@arco-design/web-react'] = dirComponent;
    config.resolve.extensions.push('.tsx');

    config.resolve.modules = ['node_modules', path.resolve(__dirname, '../site/node_modules')];
    // 解决 webpack 编译警告
    config.module.rules[0].use[0].options.plugins.push([
      '@babel/plugin-proposal-private-property-in-object',
      { loose: true },
    ]);

    // 支持 import less
    config.module.rules.push({
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getLoaderForStyle(),
    });

    // less css modules
    config.module.rules.push({
      test: lessModuleRegex,
      use: getLoaderForStyle(true),
    });

    config.plugins.push(
      new ArcoWebpackPlugin({
        theme: activeArcoTheme,
      })
    );

    // 支持 import svg
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: ['@svgr/webpack'],
    });

    return config;
  },
};
