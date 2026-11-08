describe('Nested Mutation', function () {
  function product() {
    return {
      id: 'p2', name: 'Desk Lamp', unitPrice: 18,
      delivery: { city: 'Hyderabad', fee: 40, note: 'Call on arrival' },
      tags: ['lighting', 'desk']
    };
  }

  it('applies the requested fee without changing the original fee', function () {
    var original = product();
    var updated = changeDeliveryFee(original, 25);
    expect(updated.delivery.fee).toBe(25);
    expect(original.delivery.fee).toBe(40);
  });

  it('preserves sibling delivery fields and unrelated product details', function () {
    var original = product();
    var updated = changeDeliveryFee(original, 12);
    expect(updated.delivery.city).toBe('Hyderabad');
    expect(updated.delivery.note).toBe('Call on arrival');
    expect(updated.id).toBe('p2');
    expect(updated.name).toBe('Desk Lamp');
    expect(updated.unitPrice).toBe(18);
    expect(updated.tags).toEqual(['lighting', 'desk']);
  });

  it('returns new outer and delivery objects', function () {
    var original = product();
    var updated = changeDeliveryFee(original, 25);
    expect(updated).not.toBe(original);
    expect(updated.delivery).not.toBe(original.delivery);
  });

  it('supports zero fees and another product without hard-coded details', function () {
    var original = { id: 'p3', name: 'Water Bottle', delivery: { city: 'Pune', fee: 12 } };
    var updated = changeDeliveryFee(original, 0);
    expect(updated).toEqual({ id: 'p3', name: 'Water Bottle', delivery: { city: 'Pune', fee: 0 } });
    expect(original.delivery.fee).toBe(12);
  });

  it('keeps earlier versions intact across repeated updates', function () {
    var original = product();
    var first = changeDeliveryFee(original, 25);
    var second = changeDeliveryFee(first, 10);
    expect(original.delivery.fee).toBe(40);
    expect(first.delivery.fee).toBe(25);
    expect(second.delivery.fee).toBe(10);
    expect(second.delivery.city).toBe('Hyderabad');
  });
});
