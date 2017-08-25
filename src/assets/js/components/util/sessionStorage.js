//from https://github.com/ui-router/sample-app-angularjs

export class SessionStorage {
  /**
   * Creates a new SessionStorage object
   *
   * @param $http Pass in the $http service
   * @param $q Pass in the $q service
   * @param sessionStorageKey The session storage key. The data will be stored in browser's session storage under this key.
   * @param sourceUrl The url that contains the initial data.
   */
  constructor($http,  $q, sessionStorageKey, sourceUrl) {
    let data, fromSession = sessionStorage.getItem(sessionStorageKey);
    // A promise for *all* of the data.
    this._data = undefined;

    // For each data object, the _idProp defines which property has that object's unique identifier
    // this._idProp = "_id";

    // A basic triple-equals equality checker for two values
    // this._eqFn = (l, r) => l[this._idProp] === r[this._idProp];

    // Services required to implement the fake REST API
    this.$q = $q;
    this.sessionStorageKey = sessionStorageKey;

    if (fromSession) {
      try {
        // Try to parse the existing data from the Session Storage API
        data = JSON.parse(fromSession);
      } catch (e) {
        console.log("Unable to parse session messages, retrieving intial data.");
      }
    }

    // let stripHashKey = (obj) =>
    //     setProp(obj, '$$hashKey', undefined);

    // Create a promise for the data; Either the existing data from session storage, or the initial data via $http request
    this._data = (data ? $q.resolve(data) : $http.get(sourceUrl).then(resp => resp.data))
        .then(this._commit.bind(this))
        .then(() => JSON.parse(sessionStorage.getItem(sessionStorageKey)));
        // .then(array => array.map(stripHashKey));

  }

  /** Saves all the data back to the session storage */
  _commit(data) {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(data));
    return this.$q.resolve(data);
  }

  /** Helper provides the `thenFn` with the data */
  all(thenFn) {
    return this.$q.resolve(this._data).then(thenFn);
  }

  /** Given a sample item, returns a promise for all the data for items which have the same properties as the sample */
  // search(exampleItem) {
  //   let contains = (search, inString) =>
  //       ("" + inString).indexOf("" + search) !== -1;
  //   let matchesExample = (example, item) =>
  //       Object.keys(example).reduce((memo, key) => memo && contains(example[key], item[key]), true);
  //   return this.all(items =>
  //       items.filter(matchesExample.bind(null, exampleItem)));
  // }

  /** Returns a promise for the item with the given identifier */
  // get(id) {
  //   return this.all(items =>
  //       items.find(item => item[this._idProp] === id));
  // }

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
  // save(item) {
  //   return item[this._idProp] ? this.put(item) : this.post(item);
  // }

  /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
  // post(item) {
  //   item[this._idProp] = guid();
  //   return this.all(items => pushToArr(items, item)).then(this._commit.bind(this));
  // }

  /** Returns a promise to save (PUT) an existing item. */
  // put(item, eqFn = this._eqFn) {
  //   return this.all(items => {
  //     let idx = items.findIndex(eqFn.bind(null, item));
  //     if (idx === -1) throw Error(`${item} not found in ${this}`);
  //     items[idx] = item;
  //     return this._commit(items).then(() => item);
  //   });
  // }

  /** Returns a promise to remove (DELETE) an item. */
  // remove(item, eqFn = this._eqFn) {
  //   return this.all(items => {
  //     let idx = items.findIndex(eqFn.bind(null, item));
  //     if (idx === -1) throw Error(`${item} not found in ${this}`);
  //     items.splice(idx, 1);
  //     return this._commit(items).then(() => item);
  //   });
  // }
}
SessionStorage.$inject = ['$http', '$q', 'sessionStorageKey', 'sourceUrl'];
