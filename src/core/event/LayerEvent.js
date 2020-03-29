/*
 * @Author: Caven
 * @Date: 2020-01-02 14:26:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-29 13:00:38
 */
import Cesium from '@/namespace'
import Event from './Event'

class LayerEvent extends Event {
  constructor() {
    super()
    this._registerEvent()
  }

  _registerEvent() {
    for (let key in DC.LayerEventType) {
      let type = DC.LayerEventType[key]
      this._eventCache[type] = new Cesium.Event()
    }
  }
}

export default LayerEvent
