/// <reference path="../../defs/es6-promise.d.ts" />

import {EventEmitter} from '../util/eventemitter';
import {exec} from '../internal/internal';

/** This utility class is used internally by the framework for certain important
 *  processes. This class also exposes certain important events that the source
 *  plugin may emit.
 *
 *  Currently there are only two events:
 *  - ```save-config```: signals the source that it should save the configuration object. Handler is a function f(config: JSON)
 *  - ```apply-config```: signals the source that it should apply the changes that this configuration object describes. Handler is a function f(config: JSON)
 *
 *  Use the ```on(event: string, handler: Function)``` function to listen to an event.
 */
export class SourcePluginWindow extends EventEmitter {
  private static _instance: SourcePluginWindow;

  static getInstance() {
    if (SourcePluginWindow._instance === undefined) {
      SourcePluginWindow._instance = new SourcePluginWindow();
    }
    return SourcePluginWindow._instance;
  }

  /**
   *  Use getInstance() instead.
   */
  constructor() {
    super();

    this.on('message-source', function(message) {
      if (message.request !== undefined) {
        if (message.request === 'saveConfig') {
          this.emit('save-config', message.data);
        }
        else if (message.request === 'applyConfig') {
          this.emit('apply-config', message.data);
        }
      }
    });

    SourcePluginWindow._instance = this;
  }
}

window['MessageSource'] = function(message: string) {
    SourcePluginWindow.getInstance().emit("message-source",
      JSON.parse(message));
}

window['SetConfiguration'] = function(configObj: string) {
    try {
        var data = JSON.parse(configObj);
        var source = SourcePluginWindow.getInstance();
        source.emit("apply-config", data);
        source.emit("save-config", data);
    } catch (e) {
        // syntax error probably happened, exit gracefully
        return;
    }
}