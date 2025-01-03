const cron = require('node-cron');
const { checkAndCreateAttendance } = require('../controller/attendance'); 

cron.schedule('0 0 * * *', async () => {
  console.log('Running daily attendance check at midnight...');
  try {
    await checkAndCreateAttendance();
  } catch (err) {
    console.error('Error checking or creating attendance:', err);
  }
});