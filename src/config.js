window.packageConfig = [
  {
    name: 'npm',
    file: 'package.json',
    registry: 'https://registry.npmjs.org/',
    parse: window.parser.json,
    keys: ['dependencies', 'devDependencies']
  },
];
