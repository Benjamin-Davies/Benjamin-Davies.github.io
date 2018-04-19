var projects = document.getElementById('projects');
var username = 'Benjamin-Davies';

fetch(`https://api.github.com/users/${username}/repos`, {
  headers: { Accept: 'application/vnd.github.v3+json' }
})
  .then(function(res) {
    return res.json();
  })
  .then(function(repos) {
    Array.from(projects.getElementsByClassName('progress')).forEach(function(
      progress
    ) {
      progress.classList.add('hide');
    });

    repos.slice(0, 6).forEach(function(repo) {
      var card = document.createElement('div');
      card.className = 'card';
      projects.appendChild(card);

      var content = document.createElement('div');
      content.className = 'card-content';
      card.appendChild(content);

      var title = document.createElement('span');
      title.className = 'card-title';
      title.innerText = repo.name;
      content.appendChild(title);

      if (repo.fork) {
        var fork = document.createElement('span');
        fork.className = 'octicon octicon-repo-forked fork-icon';
        title.appendChild(fork);
      }

      var desc = document.createElement('p');
      desc.innerText = repo.description;
      content.appendChild(desc);

      var action = document.createElement('div');
      action.className = 'card-action';
      card.appendChild(action);

      var repo_link = document.createElement('a');
      repo_link.href = repo.html_url;
      repo_link.innerText = 'repository';
      action.appendChild(repo_link);

      if (repo.homepage) {
        var home_link = document.createElement('a');
        home_link.href = repo.homepage;
        home_link.innerText = 'homepage';
        action.appendChild(home_link);
      }
    });
  });
