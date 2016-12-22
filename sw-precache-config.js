module.exports = {
    staticFileGlobs: [
      'public/assets/**/**.**',
      'public/template/**.css',
      'public/app/**/*.*'
    ],
  stripPrefix: '/',
  verbose: true,
  runtimeCaching: [{
    urlPattern: /^(https?\:\/\/)?((www\.)?localhost)\/.+$/,
    handler: 'networkFirst'
  }]
};
