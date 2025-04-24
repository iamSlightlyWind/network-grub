export default async function handler(req, res) {
    try {
        const repoOwner = process.env.VERCEL_GIT_REPO_OWNER;
        const repoSlug = process.env.VERCEL_GIT_REPO_SLUG;

        if (!repoOwner || !repoSlug) {
            throw new Error('Vercel environment variables for the repository are not set.');
        }

        const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoSlug}/contents`;
        console.log(`Fetching repository contents from: ${repoUrl}`);

        const response = await fetch(repoUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });

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