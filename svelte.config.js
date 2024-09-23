import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      // GitHub Pages에서는 404 페이지가 필요할 수 있습니다.
      fallback: '200.html'
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/<repository-name>' : ''
    }
  }
};