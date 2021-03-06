/// <reference path="../../defs/es6-promise.d.ts" />

import {App as iApp} from '../internal/app';
import {Addable} from './iaddable';
import {Scene} from '../core/scene';
import{checkSplitmode} from '../internal/util/splitmode';

/**
 *  Class for adding a web source to the stage.
 *  URLs will use http by default unless https
 *  is specified. This class supports adding
 *  locally hosted HTML files as well.
 *
 * ### Basic Usage
 *
 * ```javascript
 * var XJS = require('xjs');
 * var Url = XJS.Url;
 *
 * var urlPromise = new Url('https://www.xsplit.com').addToScene();
 * ```
 */
export class Url implements Addable {

  private _url: string;

  /**
   *  param: (url: string)
   *
   *  Creates a URL object. If unspecified, protocol is http.
   */
  constructor(url: string) {
    this._url = url;
  }

  private _getUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (/^https?:\/\//i.test(this._url)) {
        resolve(this._url);
      } else if (/[a-z]+:\/\//i.test(this._url)) {
        reject(Error('You may only add HTTP or HTTPS URLs to the stage.'));
      } else {
        resolve('http://' + this._url);
      }
    });
  }

  /**
   * param: (value?: number | Scene)
   * ```
   * return: Promise<boolean>
   * ```
   *
   * Adds this URL to the current scene as an HTML source by default.
   * Accepts an optional parameter value, which, when supplied,
   * points to the scene where item will be added instead.
   *
   *  Will raise an error if URL is not http or https.
   */
  addToScene(value?: number | Scene ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let scenePrefix = '';
      checkSplitmode(value).then((prefix) => {
        scenePrefix = prefix
        return this._getUrl();
      }).then(url => {
        return iApp.callFunc(scenePrefix + 'addurl', url);
      }).then(() => {
        resolve(true);
      }).catch(err => {
        reject(err);
      });
    });
  }
}
