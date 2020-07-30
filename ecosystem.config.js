module.exports = {
  apps : [{
    name: 'oauth2',
    script: './index.js',
    watch: true,
    env: {
      PG_USERNAME: 'admin',
      PG_PASSWORD: 'password',
    }
  }]
};
