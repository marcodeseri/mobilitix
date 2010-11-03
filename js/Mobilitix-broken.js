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
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
		
		var scope = "https://www.google.com/analytics/feeds";
		var analyticsService = new google.gdata.analytics.AnalyticsService('Mobilitix-Webapp');	
   		var accountFeedUri = 'https://www.google.com/analytics/feeds/accounts/default?max-results=50';
		 
		var auth = google.accounts.user.checkLogin(scope);
		
		
		appLoader = new Ext.Panel({
            floating: true,
            modal: true,
            centered: true,
            width: 300,
			height:70,
            styleHtmlContent: true,
			hideOnMaskTap: false,
			disabled:true,
            html: '<div><img src="/img/ajax-loader.gif" alt="loading" style="float:left;padding:0 10px"/> Loading your data</div>',
            
        });
		
		endDate = new Date().add(Date.DAY, -1);
		startDate = new Date().add(Date.DAY, -7);
		
		Mobilitix.startDate = startDate.format('Y-m-d');
		Mobilitix.endDate = endDate.format('Y-m-d');
		
		Mobilitix.reportConfig = trafficReport;

		
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
			
		
		var dockedItems = [{
			dock: 'top',
			xtype: 'toolbar',
			layout:'hbox',
			title: 'Mobilitix',
			pack: 'justify', 
			items:  headerButtonsR
		}];
		

		var home = new Ext.Container({
	            title: 'Home',
	            cls: 'homeCnt',
				iconCls: 'home',
				id: 'homeTab',
	            scroll: 'vertical',
				align: 'center',
				fullscreen:true,
				layout:'vbox',
				items:[]	 
			});	
			
		/*	
		var reportContainer = new Ext.TabPanel({
					id: 'tabPanel',
		            tabBar: {
		                dock: 'bottom',
		                layout: {
		                    pack: 'center'
		                }
		            },
		            fullscreen: true,
		            ui: 'light',
		            animation: {
		                type: 'cardslide',
		                cover: true
		            },
		            
		            defaults: {
		                scroll: 'vertical'
		            },
		            items: [traffic,visitors,goals,campaigns,logout]
		 });		
		*/
		
		// application manager
		var init = {
			authorized: auth ? true : false,
			status: "bootstrap",
			
			bootstrap: function(){

				if(auth)		
					init.appInit();
				else				
					init.welcomeLayout();

				home.doLayout();
					
				Ext.EventManager.on("welcomeTab", 'click', checkAuth);
				//Ext.EventManager.on("settingsButton", 'click', manageSettings);	
			},
			welcomeLayout: function(){
				console.log("welcome");
				home.add(welcome);							  		       
			},
			appInit: function(){
				console.log("appInit");
				//Ext.get("accountButton").update("Accounts");
				
				Mobilitix.AccountStore.read({
						scope: this,
			            callback: function(records, operation, successful) {
			                if (records.length == 0) {
								init.showLoader();
								analyticsService.getAccountFeed(accountFeedUri, accountFeedHandler, errorHandler);
							}
							else {
								init.showAccounts()
							}
			                    
			            }
			        }
				);
				
							
				
			},
			showAccounts: function(){				
				console.log("showaccounts");
				appContainer = new Ext.Panel({
					title:'Account List',
					activeItem: 'accountsPanel',
					cls: 'accontCnt',
					iconCls: 'accont',
					id: 'accountTab',
					scroll: 'vertical',
				    layout:{
				        type: 'card',
				        align: 'left',	
				        pack: 'center'
				    },
				    cls: 'account-list',
				    items: [{
						id: 'accountsPanel',
				        width: getDesiredW(0),
				        height: getDesiredH(0),
						layout:'vbox',
				        xtype: 'list',
						listeners: {
					        itemtap: setAccount,
					    },
				        store: Mobilitix.AccountStore,
				        tpl: '<tpl for="."><div class="accountList"><strong>{profileName}</strong></div></tpl>',
				        itemSelector: 'div.accountList',
				        singleSelect: true,
				        grouped: true,
				        indexBar: true
				    },
					{
						id: 'tabPanel',
			            tabBar: {
			                dock: 'bottom',
			                layout: {
			                    pack: 'center'
			                }
			            },
			            fullscreen: true,
			            ui: 'light',
			            animation: {
			                type: 'cardslide',
			                cover: true
			            },
			            layout:'vbox',
			            defaults: {
			                scroll: 'vertical'
			            },
			            items: [traffic,visitors,goals,campaigns,logout]
					 }
					]
				});
				
			
				appContainer.update();		
				init.hideLoader();
	
				
				home.show(settingsButton);								
				home.add(appContainer);	
				home.doLayout();
				
			
			
				
			},	
			enableReports: function(){
				//home.remove(accountList);
				
				
				accountList.setCard(2);
				
				
				// set up listeners
				traffic.on("activate", doTraffic);
				visitors.on("activate", doVisitors);
				goals.on("activate", doGoals);
				campaigns.on("activate", doCampaigns);
				
				Ext.EventManager.on("logoutButton", 'click', init.logout);	
				
				doTraffic();
			},		
			hideLoader: function(){
				appLoader.hide();		
			},
			showLoader:function(){
							
	            appLoader.show('pop');	
			},
			logout: function(){
				console.log("logging out")
						
							
				google.accounts.user.logout();
				
				document.location.href='/';
				
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
	

		/* helpers */
		
		// analytics api data handlers
		var accountFeedHandler = function(result){
			home.remove(welcome);
			
			var entries = result.feed.getEntries();
		
				
			for (var i = 0, entry; entry = entries[i]; ++i) {				
				Mobilitix.AccountStore.add(
					{profileName:entry.getTitle().getText().toUpperCase(), tableId:entry.getTableId().getValue()}
				);
			}	
			Mobilitix.AccountStore.sort('profileName', 'ASC');
			Mobilitix.AccountStore.sync();	
			
			init.showAccounts();
		}
					
		// query handler
		var dataManager = function(){
			
			init.showLoader();
			
			var dataQuery = 'https://www.google.com/analytics/feeds/data' +
			
			    '?start-date=' + Mobilitix.startDate +
			    '&end-date=' + Mobilitix.endDate +
			    '&dimensions=' + Mobilitix.reportConfig.dimension +
			    '&metrics=' + Mobilitix.reportConfig.metrics +
			    '&sort=-' + Mobilitix.reportConfig.sort +
			    '&max-results=' + Mobilitix.reportConfig.results +
			    '&ids=' + Mobilitix.selectedAccount;
			  
			 analyticsService.getDataFeed(dataQuery, reportRenderer, errorHandler);					
		}
		
		
		var reportRenderer = function(result){
			init.hideLoader();
			
			console.log("rendering");
			var entries = result.feed.getEntries().reverse();
			var data = new google.visualization.DataTable();
			
			data.addColumn('string', Mobilitix.reportConfig.dimensionTitle);
		    data.addColumn('number', Mobilitix.reportConfig.metricsTitle);
			
			data.addRows(entries.length);
			
			for (var i = 0, entry; entry = entries[i]; ++i) {
				data.setCell(i, 0, entry.getValueOf(Mobilitix.reportConfig.dimension));
				data.setCell(i, 1, entry.getValueOf(Mobilitix.reportConfig.metrics)); 
			}
			
			var table = new google.visualization.Table(document.getElementById(Mobilitix.reportConfig.tableTarget));  
		    table.draw(data, {showRowNumber: false, width:300, height: getDesiredH(120)*.4}); 
			
			switch(Mobilitix.reportConfig.reportType){
				case "PIE":
					var pieChart = new google.visualization.PieChart(document.getElementById(Mobilitix.reportConfig.chartTarget));
    				pieChart.draw(data, {width: getDesiredW(0), height: getDesiredH(120)*.6, is3D: true, title: Mobilitix.reportConfig.title + ' ' + Mobilitix.accountName});
					return;
				case "TIMELINE":
					var lineChart = new google.visualization.LineChart(document.getElementById(Mobilitix.reportConfig.chartTarget));
    				lineChart.draw(data, {width: getDesiredW(0), height: getDesiredH(120)*.6, is3D: true, legend: 'none', title: Mobilitix.reportConfig.title + ' ' + Mobilitix.accountName});
					return;	
			}
			
		    
			
			
		}
		
	
		
		
		
		/* reporting */
		 
		var doTraffic = function(){			
			Mobilitix.reportConfig = trafficReport;
			console.log("let's do some traffic reporting!")
			dataManager();	
		}
		
		
		var doVisitors = function(){
			console.log("let's do some visitors reporting!")		
			Mobilitix.reportConfig = visitorsReport;
			dataManager();
		}
		
				
		var doGoals = function(){
			console.log("let's do some goals reporting!")
			Mobilitix.reportConfig = goalsReport;
			dataManager();
		}

		
		var doCampaigns = function(){
			Mobilitix.reportConfig = campaignsReport;
			console.log("let's do some campaigns reporting!")
			dataManager();
			
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
	
		
		//auth
		var checkAuth = function() {
			console.log("checkAuth");
		
			// auth
			if(!auth)
				google.accounts.user.login(scope);								
			else
				init.logout();
			
        };

		
		

		var setReportingDate = function(dateString){
			console.log(dateString)

			switch (dateString){
				
				case "today":
					Mobilitix.startDate = Mobilitix.endDate = new Date().format('Y-m-d');
					dataManager();
					return;
					
				case "yesterday":
					Mobilitix.startDate = endDate;
					Mobilitix.endDate = endDate;
					dataManager();
					return;
					
				case "lastweek":
					Mobilitix.startDate = new Date().add(Date.DAY, -7).format('Y-m-d');
					Mobilitix.endDate = new Date().add(Date.DAY, -1).format('Y-m-d');
					dataManager();
					return;	
						
				
			}
			
			
			
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
							setReportingDate("today");
							
						}
                    },{
                        text : 'Yesterday',
						scope:this,
                        handler : function(){
							setReportingDate("yesterday");
							this.actions.hide();
						}
                    },{
                        text : 'Last Week',         
                        scope : this,
                        handler : function(){
							setReportingDate("lastweek");
                            this.actions.hide();
                        }
                    }]
                });
            }
            this.actions.show();
		};
		
		
		init.bootstrap();
		
		
    }
});