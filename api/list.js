export default async function handler(req, res) {
    try {
        const repoUrl = 'https://api.github.com/repos/iamSlightlyWind/network-grub/contents';

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
            .map(file => file.name.replace('.cfg', ''))

        res.status(200).json(cfgFiles);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
}