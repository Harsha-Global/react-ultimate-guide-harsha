describe('Duplicate Webhooks',function(){
 const event={eventId:'evt_1',orderId:'O-1',paid:true};
 it('records one new verified paid notice',function(){const ledger={processedEventIds:[],notifications:[]};expect(recordVerifiedNotice(event,ledger)).toBe(true);expect(ledger).toEqual({processedEventIds:['evt_1'],notifications:['O-1']});});
 it('ignores an unpaid notice',function(){const ledger={processedEventIds:[],notifications:[]};expect(recordVerifiedNotice({...event,paid:false},ledger)).toBe(false);expect(ledger.notifications).toEqual([]);});
 it('replaying the same event returns false',function(){const ledger={processedEventIds:[],notifications:[]};recordVerifiedNotice(event,ledger);expect(recordVerifiedNotice(event,ledger)).toBe(false);});
 it('replaying the event leaves exactly one notification and one processed ID',function(){const ledger={processedEventIds:[],notifications:[]};recordVerifiedNotice(event,ledger);recordVerifiedNotice(event,ledger);recordVerifiedNotice(event,ledger);expect(ledger).toEqual({processedEventIds:['evt_1'],notifications:['O-1']});});
 it('keeps unrelated processed events and records a new one',function(){const ledger={processedEventIds:['evt_0'],notifications:['O-0']};expect(recordVerifiedNotice(event,ledger)).toBe(true);expect(ledger.processedEventIds).toEqual(['evt_0','evt_1']);});
 it('finds an earlier event without requiring it to be the last item',function(){const ledger={processedEventIds:['evt_1','evt_2'],notifications:['O-1','O-2']};expect(recordVerifiedNotice(event,ledger)).toBe(false);expect(ledger.notifications).toEqual(['O-1','O-2']);});
 it('does not change a frozen event',function(){const fixed=Object.freeze({...event});const ledger={processedEventIds:[],notifications:[]};expect(recordVerifiedNotice(fixed,ledger)).toBe(true);expect(fixed.eventId).toBe('evt_1');});
});
