window.packageConfig = [
  {
    name: 'npm',
    file: 'package.json',
    registry: window.registry.npm,
    parse: window.parser.json,
    keys: ['dependencies', 'devDependencies'],
  },
  {
    name: 'composer',
    file: 'composer.json',
    registry: window.registry.composer,
    parse: window.parser.json,
    keys: ['require', 'require-dev'],
    filter: /.*\/.*/,
  },
  {
    name: 'pip',
    file: 'Pipfile',
    registry: window.registry.librariesIO.bind('pypi'),
    parse: window.parser.toml,
    keys: ['packages', 'dev-packages'],
  }
];
