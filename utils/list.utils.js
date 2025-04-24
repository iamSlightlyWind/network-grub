import { createGitHubHeaders, parseRepoUrl } from "./common.js";

export async function getEntryList(req) {
    try {
        let { repo, branch } = req.query;

        if (!repo) {
            return { status: 400, message: 'Repository URL parameter is required.' };
        }

        if (!branch) {
            branch = "grub";
        }

        const { owner, repo: repoSlug } = parseRepoUrl(repo);
        const repoUrl = `https://api.github.com/repos/${owner}/${repoSlug}/contents?ref=${branch}`;

        const headers = createGitHubHeaders();
        const response = await fetch(repoUrl, { headers });

        if (!response.ok) {
            return { status: response.status, message: `Failed to fetch repository contents: ${response.statusText}` };
        }

        const files = await response.json();

        const cfgFiles = files
            .filter(file => file.name.endsWith('.cfg'))
            .map(file => file.name.replace('.cfg', ''));

        return { status: 200, message: cfgFiles };
    } catch (error) {
        return { status: 500, message: `Error: ${error.message}` };
    }
}