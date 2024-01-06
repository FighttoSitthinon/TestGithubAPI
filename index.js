const axios = require('axios');
const { config } = require('./config');
// Function to fetch repositories
async function fetchRepositories() {
  try {
    const response = await axios.get(`https://api.github.com/users/${config.username}/repos`, {
      headers: {
        Authorization: `token ${config.accessToken}`,
      },
    });

    // console.log(response.data)

    return response.data.map(repo => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      url: repo.url,
      language: repo.language,
      private: repo.private
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    return [];
  }
}

const summaryLanguage = (data) => {
  const summary = {};

  data.forEach(repo => {
    const name = repo.name
    const language = repo.language

    if (language) {
      if (!summary[language]) {
        summary[language] = { repoName: [], count: 0 }
      }
      summary[language].repoName.push(name)
      summary[language].count++
    }
  });

  console.log(summary)
}

// Fetch repositories and log the data
fetchRepositories()
  .then(repos => {
    // console.log('Repositories:');
    // console.log(repos);
    summaryLanguage(repos);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
