const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const userData = require('/userData.json');

const seedUsers = async () => {
    try {
        await userData.sync({ force: true }); 

        const hashedUsers = await Promise.all(userData.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { ...user, password: hashedPassword };
        }));

        await User.bulkCreate(hashedUsers);

        console.log('Users seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }

};

seedUsers();

// to be written. seedPokemon, seedFavorites, seedTeams