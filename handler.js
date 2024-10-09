const { User } = require('./sequelize'); // Import User model

module.exports.createUser = async (event) => {
  const { name, email } = JSON.parse(event.body);

  try {
    const newUser = await User.create({ name, email });

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User created', userId: newUser.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating user', error: error.message }),
    };
  }
};

module.exports.getUser = async (event) => {
  const { id } = event.pathParameters;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching user', error: error.message }),
    };
  }
};

module.exports.updateUser = async (event) => {
  const { id } = event.pathParameters;
  const { name, email } = JSON.parse(event.body);

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    await user.update({ name, email });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User updated' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating user', error: error.message }),
    };
  }
};

module.exports.deleteUser = async (event) => {
  const { id } = event.pathParameters;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    await user.destroy();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User deleted' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error deleting user', error: error.message }),
    };
  }
};

module.exports.getAllUsers = async (event) => {
  try {
    const users = await User.findAll();

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching users', error: error.message }),
    };
  }
};
