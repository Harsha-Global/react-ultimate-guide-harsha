// Local recording fixture, not application source. Run on the lab's HOME page
// after loading it. Then use its link to visit the catalog without reloading.
// A full reload restores the browser methods. No stored data is deleted.
Storage.prototype.getItem = function () { throw new DOMException('Controlled storage read denial', 'SecurityError'); };
Storage.prototype.setItem = function () { throw new DOMException('Controlled storage write denial', 'SecurityError'); };
