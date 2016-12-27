import { h, Component } from 'preact';
import {bind} from 'decko';

import Icon from '../icon';

const CLASSES = require('../../../css/blocks/property-line.postcss.css.json');
require('../../../css/blocks/property-line');

class PropertyLine extends Component {
  render () {
    const p = this.props;

    return (
      <div className={CLASSES['property-line']}>
        <div className={CLASSES['label']}>{p.name}</div>
        <div className={CLASSES['property-line__inputs']}>
          {this._renderInputs()}
        </div>
        <div className={CLASSES['button']} onClick={this._onAddSpot}>
          <div className={CLASSES['button__inner']}>
            <Icon shape="spot" />
          </div>
        </div>
      </div>
    );
  }

  _renderInputs() {
    const value = this._getValue();
    const result = [];
    if (value instanceof Array) {
      for (let i = 0; i < value.length; i++) {
        result.push(
          <input  className={CLASSES['input']} value={value[i]}
                  data-width={`1/${value.length}`} />
        );
      }
    } else {
      result.push( <input className={CLASSES['input']} value={value} /> );
    }
    return result;
  }

  _getValue() {
    const {name, state, entireState} = this.props;
    const {selectedSpot} = entireState;
    const {currentProps} = state;

    if (selectedSpot.id == null) { return currentProps[name]; }

    const {id, prop, spotIndex, type} = selectedSpot;
    return entireState.points[id].props[prop][spotIndex][type].value;
  }

  @bind
  _onAddSpot(e) {
    const {store} = this.context;
    const p = this.props;
    const {state, entireState} = p;

    store.dispatch({
      type: 'ADD_PROPERTY_SEGMENT',
      data: { id: p.id, name: p.name, time: entireState.progress }
    });
  }
}

export default PropertyLine;
