module.exports = {
  plugins: [
    ...(process.env.NODE_ENV === 'production'
      ? [
        require('autoprefixer')({ grid: 'autoplace' }),
        require('cssnano'),
        require('postcss-flexbugs-fixes'),
      ]
      : []),
  ],
};
