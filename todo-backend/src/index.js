const Koa = require('koa');

const app = new Koa();

// app.use((ctx,next) => {}) : Koa의 미들웨어 함수
// ctx: Context의 줄임말로, 웹 요청과 응답에 관한 정보
// next: 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수 (optional)
app.use(async (ctx, next) => {
  // Chrome 브라우저는 사용자가 웹 페이지에 들어가면 해당 사이트의 아이콘 파일인 /favicon.ico 파일을 서버에 요청하기 때문에 결과에 /경로와 /favicon.ico 경로 모두 나타남
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== '1') {
    ctx.status = 401; // Unauthorized
    return;
  }
  // next함수 호출하면 Promise 반환
  await next();
  console.log('END');
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
