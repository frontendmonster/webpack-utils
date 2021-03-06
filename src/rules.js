const autoprefixer = require('autoprefixer');
const flexbugsfix = require('postcss-flexbugs-fixes');

const query = mimetype => ({ limit: 10000, mimetype });

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      flexbugsfix,
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
        flexbox: 'no-2009',
      }),
    ],
    sourceMap: true,
  },
};

const rules = {
  babel: [{ test: /\.jsx?$/i, exclude: /node_modules/, loader: 'babel-loader' }],
  graphql: [{ test: /\.(graphql|gql)$/i, exclude: /node_modules/, loader: 'graphql-tag/loader' }],
  font: [
    { test: /\.eot(\?v=\d+.\d+.\d+)?$/i, exclude: /node_modules/, loader: 'file-loader' },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i, exclude: /node_modules/, loader: 'url-loader', query: query('application/font-woff') },
    { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/i, exclude: /node_modules/, loader: 'url-loader', query: query('application/octet-stream') },
  ],
  svg: [{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/i, exclude: /node_modules/, loader: 'file-loader', query: query('image/svg+xml') }],
  image: [{ test: /\.(jpe?g|png|gif|ico)$/i, exclude: /node_modules/, loader: 'file-loader' }],
  style: [
    { test: /(\.css|\.scss|\.sass)$/i,
      loaders: [
        'style-loader',
        'css-loader',
        postcssLoader,
        { loader: 'sass-loader', options: { includePaths: [], sourceMap: true } },
      ] },
  ],
  mjs: [{ test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' }],
};

module.exports = rules;
