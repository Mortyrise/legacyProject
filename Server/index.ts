import Express from 'express';
import cron from 'node-cron';
import morgan from 'morgan';
import cors from 'cors';
import router from './router/router';
import pushNotificationAndUpdateWaterInterval from './utilities/checkIntervals';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3111;

const app = Express();
app.use(morgan('dev'));
app.use(cors()).use(Express.json());

cron.schedule('0 */5 * ? * *', () => {
  pushNotificationAndUpdateWaterInterval();
});

app.use(router).listen(PORT, () => {
  pushNotificationAndUpdateWaterInterval();
  console.log(`🚀🚀 Running express server at ${PORT} 🚀🚀 `);
});
// };

// const app = startServer(3111);

export default app;
