import Polyglot from 'node-polyglot';
import { createProxy, getPath, ObjProxyArg } from 'ts-object-path';

export const phrases = {
  generic: {
    no_code_in_submission: 'Your submission doesn\'t contain any actual code.',
    test_file_submitted: 'It seems you\'ve submitted a test file.'
  }
};

export const strings = createProxy<typeof phrases>();

const I18n = new Polyglot({ phrases });

export default I18n;

export const k = <TRoot, T>(
  proxy: ObjProxyArg<TRoot, T>
): string => getPath(proxy).join('.');

export const t = <TRoot, T>(
  proxy: ObjProxyArg<TRoot, T>,
  options?: Polyglot.InterpolationOptions
): string => I18n.t(k(proxy), options);
