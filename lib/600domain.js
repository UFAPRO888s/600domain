'use babel';

import 600domainView from './600domain-view';
import { CompositeDisposable } from 'atom';

export default {

  600domainView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.600domainView = new 600domainView(state.600domainViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.600domainView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      '600domain:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.600domainView.destroy();
  },

  serialize() {
    return {
      600domainViewState: this.600domainView.serialize()
    };
  },

  toggle() {
    console.log('600domain was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
