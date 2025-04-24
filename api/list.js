export default async function handler(req, res) {
    try {
        const { repo } = req.query;

        if (!repo) {
            throw new Error('Repository URL parameter is required.');
        }

        const match = repo.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) {
            throw new Error('Invalid repository URL format.');
        }

        const repoOwner = match[1];
        const repoSlug = match[2];

        const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoSlug}/contents`;
        console.log(`Fetching repository contents from: ${repoUrl}`);

        const headers = {
            'Accept': 'application/vnd.github.v3+json',
        };

        const githubToken = process.env.GITHUB_TOKEN;
        if (githubToken) {
            headers['Authorization'] = `Bearer ${githubToken}`;
        }

        const response = await fetch(repoUrl, { headers });

        if (!response.ok) {
            throw new Error(`Failed to fetch repository contents: ${response.statusText}`);
        }

        const files = await response.json();

        const cfgFiles = files
            .filter(file => file.name.endsWith('.cfg'))
            .map(file => file.name.replace('.cfg', ''));

        res.status(200).json(cfgFiles);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
}