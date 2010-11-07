/**
 * @author marcodeseri
 */
Ext.regModel('Account', {
    fields: ['profileName', 'tableId']
});
 
 
 Ext.ns('Mobilitix');
 
 Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
		
		var scope = "https://www.google.com/analytics/feeds";
		var analyticsService = new google.gdata.analytics.AnalyticsService('Mobilitix-Prod-Webapp');	
   	var accountFeedUri = 'https://www.google.com/analytics/feeds/accounts/default?max-results=50';
		 
		var auth = google.accounts.user.checkLogin(scope);

    
    
   
    welcomeCard = new Ext.Panel({id:'welcomeCard', dockedItems: new Ext.Toolbar(basicDockConfig)})
    accountCard = new Ext.Panel({id:'accountCard', dockedItems: new Ext.Toolbar(basicDockConfig)})
    reportCard = new Ext.Panel({id:'reportCard'});
    
    
    appHolder = new Ext.Panel({
       fullscreen: true,
       layout: 'card',
       title: 'Home',
       cls: 'homeCnt',
       id: 'homeTab',
       scroll: 'vertical',
       align: 'center',
       items:[welcomeCard,accountCard,reportCard]   
      });

		
		setReportingPeriod = function(dateString){
 
      eTracker('reportingPeriod', dateString,'');
 
      switch (dateString){
        
        case "today":
          Mobilitix.reportingPeriod = "today";
          Mobilitix.startDate = Mobilitix.endDate = configDate.today.start.format('Y-m-d');
          
          try{
             Ext.get('settingsButton').update('Today');   
          }catch(e){}
         
          return;
          
        case "yesterday":
          Mobilitix.reportingPeriod = "yesterday";
          Mobilitix.startDate = configDate.yesterday.start.format('Y-m-d');
          Mobilitix.endDate = configDate.yesterday.end.format('Y-m-d');
          
         try{
             Ext.get('settingsButton').update('Yesterday');   
          }catch(e){}
          
          return;
          
        case "lastweek":
          Mobilitix.reportingPeriod = "lastweek";
          Mobilitix.startDate = configDate.lastweek.start.format('Y-m-d');
          Mobilitix.endDate = configDate.lastweek.end.format('Y-m-d');
          
          try{
             Ext.get('settingsButton').update('Last Week');   
          }catch(e){}      
          
          return; 
      }
    }
		
		
		// base report config
		setReportingPeriod('lastweek');
		
		

		
    // helper report config methods
    Mobilitix.getDimension = function(n){
      if(Mobilitix.reportingPeriod!="lastweek"){
        Mobilitix.reportConfig.currDimension = (Mobilitix.reportConfig.hourDimension) ? (Mobilitix.reportConfig.hourDimension) : (Mobilitix.reportConfig.dimension);
                
      }
        
        
      return Mobilitix.reportConfig.currDimension[n];
    }
      
    Mobilitix.getMetrics = function(n){
       if(Mobilitix.reportingPeriod!="lastweek")
         Mobilitix.reportConfig.currMetrics = (Mobilitix.reportConfig.hourMetrics) ? (Mobilitix.reportConfig.hourMetrics) : (Mobilitix.reportConfig.metrics);

      return Mobilitix.reportConfig.currMetrics[n];
    }
    
    Mobilitix.getMetricsString = function(){
      var stringMetrics = '';
      
      if(Mobilitix.reportingPeriod!="lastweek"){
        Mobilitix.reportConfig.currMetrics = (Mobilitix.reportConfig.hourMetrics) ? (Mobilitix.reportConfig.hourMetrics) : (Mobilitix.reportConfig.metrics);
        Mobilitix.reportConfig.currMetricsTitle = (Mobilitix.reportConfig.metricsHourTitle) ? (Mobilitix.reportConfig.metricsHourTitle) : (Mobilitix.reportConfig.metricsTitle);
      }else{
        Mobilitix.reportConfig.currMetrics = Mobilitix.reportConfig.metrics;
        Mobilitix.reportConfig.currMetricsTitle = Mobilitix.reportConfig.metricsTitle;
      }  

      for(var i = 0; i < Mobilitix.reportConfig.currMetrics.length; i++){
        stringMetrics += Mobilitix.reportConfig.currMetrics[i];
    
        if(i !== Mobilitix.reportConfig.currMetrics.length-1)
          stringMetrics += ',';
        }

       return stringMetrics;
    }
    
    Mobilitix.getDimensionString = function(){
      var stringDimension = '';
      
      if(Mobilitix.reportingPeriod!="lastweek"){
        Mobilitix.reportConfig.currDimension = (Mobilitix.reportConfig.hourDimension) ? (Mobilitix.reportConfig.hourDimension) : (Mobilitix.reportConfig.dimension);
        Mobilitix.reportConfig.currDimensionTitle = (Mobilitix.reportConfig.dimensionHourTitle) ? (Mobilitix.reportConfig.dimensionHourTitle) : (Mobilitix.reportConfig.dimensionTitle);
      } else{
        Mobilitix.reportConfig.currDimension = Mobilitix.reportConfig.dimension;
        Mobilitix.reportConfig.currDimensionTitle = Mobilitix.reportConfig.dimensionTitle;
      } 
      
      
      for(var i = 0; i < Mobilitix.reportConfig.currDimension.length; i++){
        stringDimension += Mobilitix.reportConfig.currDimension[i];
        
        if(i !== Mobilitix.reportConfig.currDimension.length-1)
          stringDimension += ',';
      }
        
        
      return stringDimension;
    } 
         
    Mobilitix.getSort = function(){
      if(Mobilitix.reportingPeriod!="lastweek")
        Mobilitix.reportConfig.currSort = (Mobilitix.reportConfig.hourSort) ? (Mobilitix.reportConfig.hourSort) : (Mobilitix.reportConfig.sort);
      else
          Mobilitix.reportConfig.currSort = Mobilitix.reportConfig.sort;
          
      return Mobilitix.reportConfig.currSort;
    }   
		
	   
    
		
		Mobilitix.AccountStore = new Ext.data.Store({
		    model: 'Account',
		    sorters: 'profileName',
		    getGroupString : function(record) {
		        return record.get('profileName')[0];
		    },
			proxy:new Ext.data.LocalStorageProxy({
		        id: 'account-list'
		    }),
		    data: []
		});
			
	
		// application manager
		var init = {
			 bootstrap: function(){
        
        if(auth)    
          init.appInit();
        else        
          init.welcomeLayout();

        appHolder.doLayout();
      },
      checkAuth:function(){
			  if(!auth)
          google.accounts.user.login(scope);                
       
			},
			welcomeLayout: function(){
			  welcomeCardNotLogged = new Ext.Panel(welcomeCardConfig)
			  welcomeCard.add(welcomeCardNotLogged)
			  welcomeCard.doComponentLayout();
			  			  
				if(Ext.get('loginButton'))
				  Ext.EventManager.on('loginButton','tap',init.checkAuth);
				  
				pTracker('welcomeLayout')  
			},
			appInit: function(){	
				Mobilitix.AccountStore.read({
						scope: this,
			            callback: function(records, operation, successful) {
			                if (records.length == 0) {
        								init.showLoader();
        								analyticsService.getAccountFeed(accountFeedUri, init.accountFeedHandler, init.errorHandler);
        							}
        							else {
        								init.showAccounts()
        							}
			                    
			            }
			        }
				);
			},
			accountFeedHandler: function(result){
        var entries = result.feed.getEntries();
      
          
        for (var i = 0, entry; entry = entries[i]; ++i) {       
          Mobilitix.AccountStore.add(
            {profileName:entry.getTitle().getText().toUpperCase(), tableId:entry.getTableId().getValue()}
          );
        } 
        Mobilitix.AccountStore.sort('profileName', 'ASC');
        Mobilitix.AccountStore.sync();  
        
        init.showAccounts();
      },  
			showAccounts: function(){
       
         accountList =  new Ext.List({
            height: getDesiredH(0),
            grouped: true,
            indexBar: true,
            centered: true,
            modal: true,
            hideOnMaskTap: false,
            overItemCls: 'x-item-pressed',
            listeners: {
            itemtap: setAccount,
          },
          store: Mobilitix.AccountStore,
          itemTpl: '<div class="accountList"><strong>{profileName}</strong></div>'
           
         });
                     
         accountCard.add(accountList);
        
         init.hideLoader();
         appHolder.doLayout();
         appHolder.setActiveItem('accountCard',  {type: 'slide'});
         
         pTracker('showAccounts'); 
			},	
			enableReports: function(){
				appHolder.setActiveItem('reportCard',  {type: 'slide'})
				
				
				
				
				if(!Ext.get('tabPanel')){
				  dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            pack: 'justify',
            title: 'Mobilitix', 
            id:'topDock',
            items:  headerButtonsR
          }];    
				  
				  tabpanel = new Ext.TabPanel({
            id: 'tabPanel',
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            fullscreen: true,
            ui: 'light',
            dockedItems: dockedItems,
            items: [dashboard,acquisition,outcomes,country,logout]
            
            
          });  
          
          
          // set up listeners
            dashboard.on("activate", Reports.doDashboard);
            acquisition.on("activate", Reports.doAcquisition);
            outcomes.on("activate", Reports.doOutcomes);
            country.on("activate", Reports.doCountry);
          
            
				}else{
				  
		
				  try{
				
				   Ext.get("tabPanel").show(); 

          }catch(e){eLogger("enableReports", e)}
				}
				
				appHolder.doLayout()
				
				
				Ext.EventManager.on("logoutButton", 'tap', init.logout);	
				Ext.EventManager.on("accountButton", 'tap', accountSelection);
        Ext.EventManager.on("settingsButton", 'tap', manageSettings);
       
       
         
        tabpanel.setActiveItem(dashboard);
       
        elms = tabpanel.getDockedComponent('topDock'); 
        elms.setTitle(Mobilitix.accountName)
        Reports.doDashboard();
				
				pTracker('reportsLayout');
			},
			dataManager: function(){
   		  
        var dataQuery = 'https://www.google.com/analytics/feeds/data' +
      
          '?start-date=' + Mobilitix.startDate +
          '&end-date=' + Mobilitix.endDate +
          '&dimensions=' + Mobilitix.getDimensionString() +
          '&metrics=' + Mobilitix.getMetricsString() +
          '&sort=-' + Mobilitix.getSort() +
          '&max-results=' + Mobilitix.reportConfig.results +
          '&ids=' + Mobilitix.selectedAccount;
        
       analyticsService.getDataFeed(dataQuery, init.reportRenderer, init.errorHandler);   
			},
			reportRenderer: function(result){
    			var entries = result.feed.getEntries().reverse();
          var data = new google.visualization.DataTable();
          
          data.addRows(entries.length);
          
          
          for(var d = 0, dimension; dimension = Mobilitix.reportConfig.currDimensionTitle[d]; d++){
            data.addColumn('string', Mobilitix.reportConfig.currDimensionTitle[d]);
          }
          
          for(var m = 0, metric; metric = Mobilitix.reportConfig.currMetricsTitle[m]; m++){
            data.addColumn('number', Mobilitix.reportConfig.currMetricsTitle[m]);
          }
                  
          for (var i = 0, entry; entry = entries[i]; ++i) {
            for (var y=0, ymetric; ymetric = Mobilitix.reportConfig.currDimension[y]; y++){
                if(Mobilitix.reportConfig.currDimension[y] === 'ga:date')
                  data.setCell(i, y, formatDate(entry.getValueOf(Mobilitix.reportConfig.currDimension[y])));
                else  
                data.setCell(i, y, entry.getValueOf(Mobilitix.reportConfig.currDimension[y]));
              }   
              
              for (var z=0, zmetric; zmetric = Mobilitix.reportConfig.currMetrics[z]; z++){
                data.setCell(i, y+z, entry.getValueOf(Mobilitix.reportConfig.currMetrics[z]));
              }              
          }
         
        
         // TABLE RECAP
          if(Mobilitix.reportConfig.tableTarget){
            var table = new google.visualization.Table(document.getElementById(Mobilitix.reportConfig.tableTarget));  
            table.draw(data, {showRowNumber: false, width:300, sortColumn: Mobilitix.reportConfig.sortColumn, sortAscending: false});           
          }
           


          

          // CHART
          switch(Mobilitix.reportConfig.reportType){
            case "PIE":
              var pieChart = new google.visualization.ImagePieChart(document.getElementById(Mobilitix.reportConfig.chartTarget));
                pieChart.draw(data, {width:290, height:180, is3D: true, title: Mobilitix.reportConfig.title });
              
              init.queueManager();              
              return;
            case "TIMELINE":
              var lineChart = new google.visualization.ImageChart(document.getElementById(Mobilitix.reportConfig.chartTarget));
              Ext.apply(Mobilitix.reportConfig.options,{
                 title: Mobilitix.reportConfig.title
                 /*chg: '25,50', chxs: '0,676767,9,1,l,676767|1,676767,9,0,l,676767', chls: 5*/
               });
              
              lineChart.draw(data, Mobilitix.reportConfig.options);
              
              init.queueManager();
              return;
            case "BARS":
              var barsChart = new google.visualization.ImageChart(document.getElementById(Mobilitix.reportConfig.chartTarget));
               Ext.apply(Mobilitix.reportConfig.options,{
                 width: getDesiredW(0), 
                 height: getDesiredH(120)*.6, 
                 is3D: true, 
                 legend: 'bottom',
                 isStacked: true,
                 title: Mobilitix.reportConfig.title
               });
              
              barsChart.draw(data, Mobilitix.reportConfig.options);
              
              init.queueManager();
              return;
            
              
            
              pTracker(Mobilitix.reportConfig.title);  
              
          }
          
         
			},
			queueManager:function(){
			   if(Mobilitix.reportQueue.length > 1){
                Mobilitix.reportQueue.splice(0,1);                
                Mobilitix.reportConfig = Mobilitix.reportQueue[0];
                init.dataManager();
          }else{
            if(Mobilitix.reportQueue.length == 1){
              Mobilitix.reportQueue = Reports.dashboardQueue.slice(0);              
              Mobilitix.reportConfig = Mobilitix.reportQueue[0]
            }
            
            init.postReportRender(); 
          }
              
                    
			},
			postReportRender:function(){
			 acquisition.doComponentLayout();
			 outcomes.doComponentLayout();
			 country.doComponentLayout();
			 
			},
			errorHandler: function(e){
			  console.log(e);
			},	
			hideLoader: function(){
				appLoader.hide();		
			},
			showLoader:function(){
				if (!appLoader) {
				appLoader = new appLoader();
                
	            }
				
	            appLoader.show('pop');	
			},
			logout: function(){		
				google.accounts.user.logout();
				document.location.href = '/';						
			}
			
			
		}
			
		
		var getDesiredW = function(offset) {
		    var viewW = Ext.Element.getViewportWidth(),
		        desiredW = Math.min(viewW-offset, 768);
		
		    return desiredW;
		};
		
		
		var getDesiredH = function(offset){
			var viewH = Ext.Element.getViewportHeight(),
		        desiredH = Math.min(viewH-offset, 768);
		    return desiredH;
			
		}
		
		var formatDate = function(date){
      month = date.substr(4,2)
      day = date.substr(6,2);
      dateString = month+'/'+day;
      
      return dateString;
    }
	
	
		
		var Reports = {
		  items:[dashboard, acquisition, outcomes, country],
		  reportsId:[
		    'dashVisits','dashPageviews','dashBounces','dashTime','dashGoals',
		    //'trafficChart','trafficTable',
		    'acquisitionChart','acquisitionTable',
		    'outcomesChart','outcomesTable',
		    'countryTable'
		    ],
		  dashboardQueue: [dashReport_visits,dashReport_pageviews,dashReport_bounces, dashReport_time, dashReport_goals],  
		  setup: function(type){
		    Mobilitix.reportConfig = {};
		    Mobilitix.reportQueue  = [];
		    Mobilitix.reportQueue.length = 0;
		    
		    if      (type === "dashboard") {               
            Mobilitix.reportQueue = Reports.dashboardQueue.slice(0);
            Mobilitix.reportConfig = Mobilitix.reportQueue[0];
        }   
		    /*else if (type === "traffic")         
            Mobilitix.reportConfig = trafficReport_visits;*/
        else if (type === "acquisition")
            Mobilitix.reportConfig = acquisitionReport;
        else if (type === "outcomes")
            Mobilitix.reportConfig = outcomesReport;
        else if (type === "outcomes_commerce")
            Mobilitix.reportConfig = outcomesReport_commerce;    
        else if (type === "country")  
            Mobilitix.reportConfig = countryReport;
        /*else if (type === "traffic_pageviews")
            Mobilitix.reportConfig = trafficReport_pageviews;*/
        else if (type === "acquisition_keywords")
            Mobilitix.reportConfig = acquisitionReport_keyword;  
        else
            Mobilitix.reportConfig = acquisitionReport_referrer;

        Mobilitix.currentReport = type;
                  
        Reports.clean();
        init.dataManager();
		  },
		  clean: function(){
		    for (var i=0; i < Reports.reportsId.length; i++){
		       try{
		          Ext.get(Reports.reportsId[i]).update('');  
		       }catch(e){} 
                  
        }      
		  },
		  doDashboard: function(){
        Reports.setup('dashboard');       
      },
		  /*doTraffic: function(){
		    Reports.setup('traffic')

		    trafficButtonsGroup.setPressed('trafficDock_visits',true);
		    
		    
		    Ext.EventManager.on("trafficDock_visits", 'tap', Reports.doTraffic);
        Ext.EventManager.on("trafficDock_pageviews", 'tap', Reports.doTraffic_pageviews);
            
		  },*/
		  doAcquisition:function(){
		    Reports.setup('acquisition')
		    
		    acquisitionButtonsGroup.setPressed('acquisitionDock_medium',true);
		    
		    Ext.EventManager.on("acquisitionDock_medium", 'tap', Reports.doAcquisition);
        Ext.EventManager.on("acquisitionDock_keyword", 'tap', Reports.doAcquisition_keyword);
        Ext.EventManager.on("acquisitionDock_referrer", 'tap', Reports.doAcquisition_referrer);
		  },
		  doOutcomes: function(){
		    Reports.setup('outcomes')
		    
		    outcomesButtonsGroup.setPressed('outcomesDock',true);
		    
		    Ext.EventManager.on("outcomesDock", 'tap', Reports.doOutcomes);
        Ext.EventManager.on("outcomesDock_commerce", 'tap', Reports.doOutcomes_commerce);
		  },
		  doOutcomes_commerce: function(){
        Reports.setup('outcomes_commerce')
      },
		  
		  doCountry: function(){
		    Reports.setup('country')
		  },
		  doAcquisition_keyword: function(){
		    Reports.clean();
        Reports.setup('acquisition_keywords')
      },
      doAcquisition_referrer: function(){
        Reports.clean();
        Reports.setup('acquisition_referrer')
      }
		  
		}
		
		
		var setAccount = function(caller, index, item, e){
			Mobilitix.selectedAccount = caller.store.data.items[index].get('tableId');
			Mobilitix.accountName = caller.store.data.items[index].get('profileName');
			
			init.enableReports();
			
		}
				
				
		// feed logic			
		var errorHandler = function(){
			console.log("there was an error");
			
		}


    var accountSelection = function(){
      appHolder.setActiveItem('accountCard', {type:'slide', reverse:true});
      
     
      
      Reports.clean();  
      Ext.get("tabPanel").hide();  

    }


		// settings	
		var manageSettings = function(){
		   
			if (!this.actions) {
                this.actions = new Ext.ActionSheet({
                    items: [{
                        text: 'Today',
						            scope:this,
                        handler : function(){
            							this.actions.hide();
            							setReportingPeriod("today");
            							init.dataManager();
						            }
                    },{
                        text : 'Yesterday',
						            scope:this,
                        handler : function(){
            							setReportingPeriod("yesterday");
            							this.actions.hide();
            							init.dataManager();
						            }
                    },{
                        text : 'Last Week',         
                        scope : this,
                        handler : function(){
  							          setReportingPeriod("lastweek");
                          this.actions.hide();
                          init.dataManager();
                        }
                    }]
                });
            }
            Reports.clean();
            this.actions.show();
		};

		  init.bootstrap();
		
    }
});