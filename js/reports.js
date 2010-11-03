/**
 * @author marcodeseri
 */


var dashReport_visits = {
  metrics: ['ga:visits','ga:bounces'],
  dimension:['ga:date'],
  hourDimension:['ga:hour'],
  sort: 'ga:date',
  hourSort:'ga:hour',
  results: '24',
  chartTarget: 'dashVisits',
  reportType: 'TIMELINE',
  title: 'Visits',
  dimensionTitle: ['Date'],
  dimensionHourTitle: ['Hour'],
  metricsTitle:['Visits','Bounces'],
  sortColumn: 0,
  options: {
     showAxisLines:false,legend:'bottom','chco':'0077cc,ff9900','chm':'o,0077cc,0,-1,8.0','chls':'5|3,6,3','chma':'10,10,10,10','chs':'300x200'
  }
}

var dashReport_pageviews = {
  metrics: ['ga:pageviews'],
  dimension:['ga:date'],
  hourDimension:['ga:hour'],
  sort: 'ga:date',
  hourSort:'ga:hour',
  results: '24',
  chartTarget: 'dashPageviews',
  reportType: 'TIMELINE',
  title: 'Pageviews',
  dimensionTitle: ['Date'],
  dimensionHourTitle: ['Hour'],
  metricsTitle:['Pageviews'],
  sortColumn: 0,
  options: {
     showAxisLines:false,legend:'none', 'chco':'0077cc','chm':'o,0077cc,0,-1,5.5','cht':'lc:nda','chls':'3','chma':'20,20,10,10'
  }
}

var dashReport_bounces = {
  metrics: ['ga:bounces'],
  dimension:['ga:date'],
  hourDimension:['ga:hour'],
  sort: 'ga:date',
  hourSort:'ga:hour',
  results: '24',
  chartTarget: 'dashBounces',
  reportType: 'TIMELINE',
  title: 'Bounces',
  dimensionTitle: ['Date'],
  dimensionHourTitle: ['Hour'],
  metricsTitle:['Bounces'],
  sortColumn: 0,
  options: {
     showAxisLines:false,legend:'none','chco':'0077cc','chm':'o,0077cc,0,-1,5.5','cht':'lc:nda','chls':'3','chma':'20,20,10,10'
  }
}

var dashReport_time = {
  metrics: ['ga:timeOnSite'],
  dimension:['ga:date'],
  hourDimension:['ga:hour'],
  sort: 'ga:date',
  hourSort:'ga:hour',
  results: '24',
  chartTarget: 'dashTime',
  reportType: 'TIMELINE',
  title: 'Time On Site',
  dimensionTitle: ['Date'],
  dimensionHourTitle: ['Hour'],
  metricsTitle:['Time on Site'],
  sortColumn: 0,
  options: {
     showAxisLines:false,legend:'none','chco':'0077cc','chm':'o,0077cc,0,-1,5.5','cht':'lc:nda','chls':'3','chma':'20,20,10,10'
  }
}


var dashReport_goals = {
  metrics: ['ga:goalCompletionsAll'],
  dimension:['ga:date'],
  hourDimension:['ga:hour'],
  sort: 'ga:date',
  hourSort:'ga:hour',
  results: '24',
  chartTarget: 'dashGoals',
  reportType: 'TIMELINE',
  title: 'Goal Completions',
  dimensionTitle: ['Date'],
  dimensionHourTitle: ['Hour'],
  metricsTitle:['Goals'],
  sortColumn: 0,
  options: {
     showAxisLines:false,legend:'none','chco':'0077cc','chm':'o,0077cc,0,-1,5.5','cht':'lc:nda','chls':'3','chma':'20,20,10,10'
  }
}

			
var acquisitionReport = {
	metrics: ['ga:visits'],
	dimension:['ga:medium'],
	sort: 'ga:visits',
	results: '5',
	chartTarget: 'acquisitionChart',
	tableTarget: 'acquisitionTable',
	reportType: 'PIE',
	title: 'Visitor Type',
	dimensionTitle: ['Medium'],
	metricsTitle:['Visits'],
  sortColumn: 1	
};

var acquisitionReport_keyword = {
  metrics: ['ga:visits'],
  dimension:['ga:keyword'],
  sort: 'ga:visits',
  results: '10',
  tableTarget: 'acquisitionTable',
  reportType: 'PIE',
  title: 'Keyword Type',
  dimensionTitle: ['Keyword'],
  metricsTitle:['Visits'],
  sortColumn: 1
  
};

var acquisitionReport_referrer = {
  metrics: ['ga:visits'],
  dimension:['ga:source'],
  sort: 'ga:visits',
  results: '10',
  tableTarget: 'acquisitionTable',
  reportType: 'PIE',
  title: 'Source',
  dimensionTitle: ['Source'],
  metricsTitle:['Visits'],
  sortColumn: 1
  
};

var outcomesReport = {
	metrics: ['ga:goalCompletionsAll'],
	dimension:['ga:date'],
	hourDimension:['ga:hour'],
	sort: 'ga:date',
	hourSort:'ga:hour',
	results: '24',
	chartTarget: 'outcomesChart',
	tableTarget: 'outcomesTable',
	reportType: 'TIMELINE',
	title: 'Goals Trend',
	dimensionTitle: ['Date'],
	metricsTitle:['Goals'],
  sortColumn: 0,
  options: {
     width:280,height:200,'chg': '25,50',legend:'bottom','chco':'0077cc','chm':'o,0077cc,0,-1,8.0','chls':'3','chma':'20,20,10,10'
  }
};

var outcomesReport_commerce = {
  metrics: ['ga:itemRevenue','ga:transactions'],
  dimension:['ga:date'],
  hourDimension:['ga:hour'],
  sort: 'ga:date',
  hourSort:'ga:hour',
  results: '24',
  chartTarget: 'outcomesChart',
  tableTarget: 'outcomesTable',
  reportType: 'TIMELINE',
  title: 'Transactions and Revenue',
  dimensionTitle: ['Date'],
  metricsTitle:['Revenue','Transactions'],
  sortColumn: 0,
  options: {
     width:280,height:200,'chg': '25,50',legend:'bottom','chco':'0077cc,ff9900','chm':'o,0077cc,0,-1,8.0','chls':'5|3,6,3','chma':'20,20,10,10'
  }
};


var countryReport = {
  metrics: ['ga:visits'],
  dimension:['ga:country'],
  sort: 'ga:visits',
  results: '50',
  tableTarget: 'countryTable',
  reportType: 'MAP',
  title: 'Map Overlay',
  dimensionTitle: ['Country'],
  metricsTitle:['Visits'],
  sortColumn: 1
  
}
