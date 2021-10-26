import 'dotenv/config';

import app from './app';

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening port ${process.env.APP_PORT}`);
});
