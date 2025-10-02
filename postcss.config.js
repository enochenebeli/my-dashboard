// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ correct plugin for Next.js 15
    autoprefixer: {},
  },
};
