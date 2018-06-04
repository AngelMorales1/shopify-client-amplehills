const { injectBabelPlugin } = require("react-app-rewired");
const autoprefixer = require("autoprefixer");

module.exports = function override(config, env) {
  // This injects babel-plugin-react-css-modules into our app.
  config = injectBabelPlugin(
    [
      "react-css-modules",
      {
        generateScopedName: "[local]___[hash:base64:5]",
        filetypes: {
          ".scss": {
            syntax: "postcss-scss"
          }
        }
      }
    ],
    config
  );

  // This find our babel file loaders to append rules to.
  const oneOfRule = config.module.rules.find(rule => rule.oneOf !== undefined);

  // This transpiles our .scss files into css files and connects them to
  // our css modules. It excludes the styles directory so these global
  // styles can still be used directly.
  oneOfRule.oneOf.unshift({
    test: /\.scss$/,
    exclude: /src\/styles/,
    use: [
      require.resolve("style-loader"),
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: "[local]___[hash:base64:5]"
        }
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          ident: "postcss",
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            autoprefixer({
              browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
              flexbox: "no-2009"
            })
          ]
        }
      },
      {
        loader: require.resolve("sass-loader"),
        options: {
          includePaths: ["src/styles"]
        }
      }
    ]
  });

  // This transpiles only our src/styles/*.scss files into .css files.
  oneOfRule.oneOf.unshift({
    test: /\.scss$/,
    include: /src\/styles/,
    use: [
      require.resolve("style-loader"),
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 1
        }
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          ident: "postcss",
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            autoprefixer({
              browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
              flexbox: "no-2009"
            })
          ]
        }
      },
      {
        loader: require.resolve("sass-loader"),
        options: {
          includePaths: ["src/styles"]
        }
      }
    ]
  });

  return config;
};
