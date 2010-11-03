/**
 * @author marcodeseri
 */
Ext.data.MobilitixProxy = function(data){
    Ext.data.MobilitixProxy.superclass.constructor.call(this);
    console.log("proxy");
	this.data = data;
	
};
Ext.extend(Ext.data.MobilitixProxy, Ext.data.DataProxy, {
    results: function(params, reader, callback, scope, arg) {
        return function(result) {
         	console.log("gathering results");
            var profiles = [];
			
            var entries = result.feed.entry;
            for (i = 0; i < entries.length; i++) {
				
                var aName = entries[i].getPropertyValue('ga:AccountName');
                var pName = entries[i].getTitle().getText();
				var tId = entries[i].getTableId().getValue();
				
				console.log(tId);
               
                profiles.push({
                    accountName: aName,
                    profileName: pName,
                    tableId: tId
                });
            }
			
            var ttl = result.feed.getTotalResults().getValue();
            result = reader.readRecords(profiles);
            result.totalRecords = ttl;
            callback.call(scope, result, arg, true);
        }
    },
    load : function(params, reader, callback, scope, arg){
		console.log("store.load");
       
	    var query = new google.gdata.analytics.AnalyticsService('gaExportAPI_acctSample_v2.0');
	    
        query.setMaxResults(50); // Max results query setting
        query.setStartIndex(1); // Starting idx (1 not 0)
        var as = this.data.analyticsService;
        as.getAccountFeed(query, this.results(params, reader, callback, scope, arg));
        
    }
});