window.packageConfig = [
  {
    name: 'npm',
    file: 'package.json',
    registry: 'npm',
    parse: window.parser.json,
    keys: ['dependencies', 'devDependencies'],
  },
  {
    name: 'composer',
    file: 'composer.json',
    registry: 'packagist',
    parse: window.parser.json,
    keys: ['require', 'require-dev'],
    filter: /.*\/.*/,
  },
  {
    name: 'pip',
    file: 'Pipfile',
    registry: 'pypi',
    parse: window.parser.toml,
    keys: ['packages', 'dev-packages'],
  },
  {
    name: 'cargo',
    file: 'Cargo.toml',
    registry: 'cargo',
    parse: window.parser.toml,
    keys: ['dependencies', 'dev-dependencies'],
  },
]
