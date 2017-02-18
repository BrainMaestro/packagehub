window.packageConfig = [
  {
    name: 'npm',
    file: 'package.json',
    registry: window.registry.npm,
    parse: window.parser.json,
    keys: ['dependencies', 'devDependencies']
  },
];
