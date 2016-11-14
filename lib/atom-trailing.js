'use babel';

import AtomTrailingView from './atom-trailing-view';
import { CompositeDisposable } from 'atom';

export default {

  atomTrailingView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomTrailingView = new AtomTrailingView(state.atomTrailingViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomTrailingView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-trailing:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomTrailingView.destroy();
  },

  serialize() {
    return {
      atomTrailingViewState: this.atomTrailingView.serialize()
    };
  },

  toggle() {
    console.log('AtomTrailing was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
