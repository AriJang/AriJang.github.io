import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      fallback: '200.html' // SPA 라우팅을 위한 fallback 설정
    }),
    paths: {
      base: '' // base 경로를 비워둡니다.
    }
  }
};