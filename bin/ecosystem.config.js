module.exports = {
  apps: [{
    name: 'yyf-zone-backend',
    script: 'bin/www.js',
    env_prod: {
      NODE_ENV: 'prod'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '39.96.181.105',
      repo: 'git@github.com:yyfann/yyf-zone-backend.git',
      ref: 'origin/master',
      path: '/root/projects/yyf-zone/backend',
      'post-deploy': 'git pull origin master && npm install && npm run prod'
    }
  }
};
