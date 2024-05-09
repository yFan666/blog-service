const loadConfig = () => {
  const { env } = process;

  return {
    db: {
      database: env.TYPEORM_DATABASE,
      host: env.TYPEORM_HOST,
      port: parseInt(env.TYPEORM_PORT, 10) || 3306,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
      charset: env.TYPEORM_CHARSET,
      entities: env.TYPEORM_ENTITIES,
    },
  };
};

export default loadConfig;
