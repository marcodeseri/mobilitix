configDate = { 
    today: {
      start: new Date().add(Date.DAY, 0),
      end: new Date().add(Date.DAY, 0)
    },
    yesterday:{
      start: new Date().add(Date.DAY, -1),
      end:new Date().add(Date.DAY, -1)
    },     
    lastweek:{
      start: new Date().add(Date.DAY, -7),
      end:new Date().add(Date.DAY, -1)
    }    
};


var outcomesButtonsGroup = new Ext.SegmentedButton({   
  layout:{pack:'center'},
  items: [{
            text: 'Goals',
            pressed: true,
            id: 'outcomesDock'

        }, {
            text: 'E-commerce',
            id: 'outcomesDock_commerce'
        }]
})

var outcomesDock =  [
  new Ext.Toolbar({
      ui: 'light',
      dock: 'top',
      layout:{pack:'center'},
      allowDepress: true,
      items: [outcomesButtonsGroup]
  })
];

var acquisitionButtonsGroup = new Ext.SegmentedButton({ 
  xtype: 'segmentedbutton',
  layout:{pack:'center'},
  items: [{
            text: 'Medium',
            pressed: true,
            id: 'acquisitionDock_medium'

        }, {
            text: 'Keyword',
            id: 'acquisitionDock_keyword'
        },
         {
            text: 'Campaigns',
            id: 'acquisitionDock_referrer'
        }]
})

var acquisitionDock =  [
  new Ext.Toolbar({
      ui: 'light',
      dock: 'top',
      layout:{pack:'center'},
      allowDepress: true,
      items: [acquisitionButtonsGroup]
  })
];

var basicDockConfig = {
    xtype: 'toolbar',
    dock: 'top',
    title: 'Mobilitix'    
}

       
appLoader = new Ext.Panel({
    floating: true,
    modal: true,
    centered: true,
    width: 300,
    height:70,
    styleHtmlContent: true,
    hideOnMaskTap: false,
    html: '<div><img src="/img/ajax-loader.gif" alt="loading" style="float:left;padding:0 10px"/> Loading your data</div>',
    
});

 
var welcomeCardConfig = {
	title: 'Mobilitix',
  cls: 'welcomeCnt',
	iconCls: 'settings',
	id: 'welcomeTab',
  scroll: 'vertical',
  html: ['<br/><br/><p>Mobilitix is a Google Analytics Mobile app: tap the button below to get started!</p><br/>',
			'<div id="loginButton"><div id="ext-comp-1141" class=" x-button x-button-action" style="margin:5px auto;width:300px"><span class="x-button-label" id="ext-gen1174">Access <br/> Google Analytics</span></div></div>',
		  '<br/><br/><p style="font-size:12px">You will login on Google Servers: your password is safe with us.</p>']				
};

var logout = new Ext.Component({
	title: 'Logout',
  cls: 'logoutCnt',
	iconCls:'logout',
	id: 'logoutTab',
  scroll: 'vertical',
  html: ['<h1 id="title">Mobile Web Analytics</h1>',
			'Sure you want to Logout?',
			'<button id="logoutButton">Logout</button>']				
});
var dashboardConfig = {
  
  title: 'Dashboard',
  cls: 'dashboardCnt',
  iconCls: 'dashboard',
  id: 'dashboardTab',
  layout:{
   type: 'vbox',
   align:'stretch',
   pack:'center'
  },
  scroll: 'vertical',
  items:[
   
    {
      flex:'4',
      layout:{
        type:'hbox',
        align:'center',
        pack:'center'
        
      },
      items:[{
        id: 'dashVisits',
        cls:'chartLoader'
        }]
       
    },
    {
      flex:'1',
      layout:{
        type:'hbox',
        align:'stretch',
        pack:'center'  
      },      
      items:[
        {
          id: 'dashPageviews',
          cls:'chartLoader',
          flex: '1'  
        },
        {
          id: 'dashBounces',
          cls:'chartLoader',
          flex: '1' 
        }
      ]
      
    },
    {
      flex:'1',
      layout:{
          type:'hbox',
          align:'stretch',
          pack:'center'  
      },
      items:[
        {
          id: 'dashTime',
          cls:'chartLoader',
          flex: '1'  
        },
        {
          id: 'dashGoals',
          cls:'chartLoader',
          flex: '1'  
        }
      ]
    }
    
  ]
}

var dashboard = new Ext.Panel(dashboardConfig);
    

 
//var traffic = new Ext.Panel(trafficConfig);
		
var acquisition = new Ext.Panel({
	title: 'Acquisition',
  cls: 'acquisitionCnt',
	iconCls: 'acquisition',
	id: 'acquisitionTab',
	layout:{type:'vbox',pack:'start'},
  scroll: 'vertical',
  defaults:'vbox',
  dockedItems: acquisitionDock,
  items:[{
    id:'acquisitionChart',
  
    layout:{
      type:'vbox',
      pack:'justify',
      align:'center'
    }
  },{
    id:'acquisitionTable',
    
     layout:{
        type:'vbox',
        pack:'justify',
        align:'center'
    }
  }]
});

var outcomesConfig = {
  
  title: 'Outcomes',
  cls: 'outcomesCnt',
  iconCls: 'outcomes',
  id: 'outcomesTab',
  layout:{type:'vbox',pack:'justify'},
  scroll: 'vertical',
  dockedItems: outcomesDock,
  items:[{
    id:'outcomesChart',
    cls:'chartLoader',
    layout:{
      type:'vbox',
      pack:'justify',
      align:'center'
    }
  },{
    id:'outcomesTable',
    layout:{
      type:'vbox',
      pack:'justify',
      align:'center'
    }
  }
  ]
}
    

var outcomes = new Ext.Panel(outcomesConfig);

var country = new Ext.Component({
	title: 'Country',
   cls: 'countryCnt',
	iconCls: 'country',
	id: 'countryTab',
	layout:'vbox',
  scroll: 'vertical',
  htmlTemplate: '<div id="countryTable"></div>',
  html: ['<div id="countryTable"></div>']
});


var settingsButton = {
	xtype: 'button',
	text: 'Last Week',
	ui: 'action',
	id: 'settingsButton'
}	


var loginButton = {
	xtype: 'button',
	ui: 'back',
	text: 'Back',
	id: 'accountButton'
}


var headerButtonsR = [
	loginButton,
	{xtype: 'spacer'},
	settingsButton
];


var pTracker = function(page){
  _gaq.push(['_trackPageview', page]);     
}


var eTracker = function(category, action, label){
  _gaq.push(['_trackEvent', category, action, label]);     
}


var eLogger = function(context, error){
  eTracker("ERROR", context, error);
}
