const User = require('../../models/User');

const sampleUsers = ['@john', '@alice', '@mike', '@sara', '@emma'];

async function seedUsers() {
    for (const username of sampleUsers) {
        await User.findOneAndUpdate({ username }, { username }, { upsert: true });
    }
}

module.exports = {seedUsers};