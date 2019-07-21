const search = instantsearch({
  appId: '1KGN2Y8AB1',
  apiKey: '5dbcbb19bce6bdedc84d7b8c7efafd7e',
  indexName: 'jekyll',
  routing: true
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for albums'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'No results',
      item: '<em>Hit {{objectID}}</em>: {{{_highlightResult.content.value}}}'
    }
  })
);

search.start();
