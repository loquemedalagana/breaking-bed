/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const typescript = require('typescript');

module.exports = {
  input: [
    'src/**/*.{js,jsx}',
    'src/**/*.{ts,tsx}',
    // Use ! to filter out files or directories
    '!src/routes/routes.ts',
    '!src/**/*.spec.{js,jsx}',
    '!src/i18n/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't', 'this.props.t', 'FakeT'],
      // don't pass ts or tsx here!
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      // don't pass ts or tsx here!
      extensions: ['.js', '.jsx'],
      fallbackKey(ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 10, // defaults to 10
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ['en', 'es'],
    ns: ['default', 'error', 'button'],
    defaultLng: 'en',
    defaultNs: 'default',
    defaultValue(lng, ns, key) {
      if (lng === 'en') {
        // Return key as the default value for English language
        return key;
      }
      // Return the string '__NOT_TRANSLATED__' for other languages
      return '__NOT_TRANSLATED__';
    },
    plural(lng, ns, key, options) {
      if (lng === 'es') return false;
      return true;
    },
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: ':', // namespace separator
    pluralSeparator: '_',
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
    removeUnusedKeys: true,
  },
  transform: function customTransform(file, enc, done) {
    const { base, ext } = path.parse(file.path);
    if (!base.includes('.d.ts')) {
      const content = fs.readFileSync(file.path, enc);

      const { outputText } = typescript.transpileModule(content, {
        compilerOptions: { target: 'es2017' },
        fileName: path.basename(file.path),
      });

      this.parser.parseTransFromString(outputText, (key, options) => {
        let sentence = options.defaultValue;
        // remove <Tag> surrounding interopations to match i18next simpilied result
        // @see https://github.com/i18next/react-i18next/blob/master/CHANGELOG.md#800
        sentence = sentence.replace(/<(\d+)>{{(\w+)}}<\/\1>/g, '{{$2}}');
        options.defaultValue = sentence;
        this.parser.set(key, options);
      });
      this.parser.parseFuncFromString(outputText);
    }
    done();
  },
};
