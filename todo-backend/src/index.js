const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 라우터 설정
// router.get('라우터 경로', 라우트에 적용할 미들웨어 함수);
router.get('/', (ctx) => {
  ctx.body = '홈';
});

router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params;
  ctx.body = name ? `${name}의 소개` : '소개';
});

router.get('/tasks', (ctx) => {
  const { id } = ctx.query;
  // id의 존재 유무에 따라 다른 결과 출력
  ctx.body = id ? `태스크 #${id}` : '태스크 아이디가 없습니다.';
});

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
