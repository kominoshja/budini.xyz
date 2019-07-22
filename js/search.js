search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-searchbar',
    placeholder: 'Search into posts...',
    poweredBy: true // This is required if you're on the free Community plan
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#search-hits',
    templates: {
      item: hitTemplate
    }
  })
);

search.start();
