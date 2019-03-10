// const wait = require('util').promisify(setTimeout);
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export default async (interval) => {
    console.log('Wait...');
    await delay(interval);
    console.log('...a second.');
};
