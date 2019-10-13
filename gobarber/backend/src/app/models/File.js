import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const { SERVER_URL, SERVER_PORT } = process.env;

            return `${SERVER_URL}:${SERVER_PORT}/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default File;
