require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    const notes = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT });
    notes.forEach((note) => {
      console.log(`${note.author ? note.author + ': ' : ''}'${note.title}', ${note.likes} likes`);
    });
  } catch (error) {
    console.error('Unable to get blogs from database:', error);
  }
  sequelize.close();
};

main();
