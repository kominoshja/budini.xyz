search.addWidget(
  instantsearch.widgets.hits({
    container: '#search-hits',
    templates: {
      item: function(hit) {
        return `
          <div class="post-item">
            <span class="post-meta">${hit.date}</span>
            <h2><a class="post-link" href="{{ site.baseurl }}${hit.url}">${hit.title}</a></h2>
            <div class="post-snippet">${hit.html}</div>
          </div>
        `;
      }
    }
  })
);
