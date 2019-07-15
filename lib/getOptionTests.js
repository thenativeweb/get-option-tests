'use strict';

const assert = require('assertthat'),
      capitalize = require('lodash/capitalize'),
      cloneDeep = require('lodash/cloneDeep'),
      getFlatObjectKeys = require('flat-object-keys'),
      lowerCase = require('lodash/lowerCase'),
      unset = require('lodash/unset');

const getOptionTests = function ({ options, excludes = [], run }) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!run) {
    throw new Error('Run is missing.');
  }

  const paths = getFlatObjectKeys({ from: options, excludes });

  for (const path of paths) {
    const spacedPath = lowerCase(path);
    const capitalizedPath = capitalize(spacedPath);

    /* eslint-disable no-loop-func */
    test(`throws an error if ${spacedPath} is missing.`, async () => {
      const clonedOptions = cloneDeep(options);

      unset(clonedOptions, path);

      await assert.that(async () => {
        await run(clonedOptions);
      }).is.throwingAsync(`${capitalizedPath} is missing.`);
    });
    /* eslint-enable no-loop-func */
  }
};

module.exports = getOptionTests;
