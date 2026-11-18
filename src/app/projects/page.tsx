import type { Metadata } from 'next';
import NavBar from '../components/Navbar/Navbar';
import Reveal from '../components/shared/Reveal';
import ProjectsBackdrop from './ProjectsBackdrop';
import ProjectsBrowser, { type ProjectItem } from './ProjectsBrowser';
import styles from './projects.module.css';

interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  created_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

interface GitHubReadme {
  content: string;
  encoding: string;
}

interface Project extends GitHubRepository {
  summary: string;
}

export const metadata: Metadata = {
  title: 'All Projects | Rodrigo Manão',
  description: 'All public projects by Rodrigo Manão on GitHub.',
};

export const revalidate = 60;

async function getRepositories(): Promise<Project[]> {
  const response = await fetch(
    'https://api.github.com/users/rodrigomanao/repos?per_page=100&sort=updated',
    {
      next: { revalidate: 60 },
      headers: {
        Accept: 'application/vnd.github+json',
      },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const repositories: GitHubRepository[] = await response.json();

  const publicRepositories = repositories.filter(
    // skip forks, archived repos and the GitHub profile README repo
    repository =>
      !repository.fork &&
      !repository.archived &&
      repository.name.toLowerCase() !== 'rodrigomanao',
  );

  return Promise.all(
    publicRepositories.map(async repository => ({
      ...repository,
      summary: await getRepositorySummary(repository),
    })),
  );
}

async function getRepositorySummary(repository: GitHubRepository): Promise<string> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/rodrigomanao/${repository.name}/readme`,
      {
        next: { revalidate: 60 },
        headers: {
          Accept: 'application/vnd.github+json',
        },
      },
    );

    if (!response.ok) {
      return getEnglishFallback(repository);
    }

    const readme: GitHubReadme = await response.json();
    const markdown = Buffer.from(readme.content, readme.encoding as BufferEncoding).toString('utf8');
    const summary = markdown
      .split(/\r?\n\s*\r?\n/)
      .map(paragraph => paragraph.replace(/[#>*_`~[\]]/g, '').replace(/\([^)]*\)/g, '').trim())
      .find(paragraph => paragraph.length > 40 && !paragraph.startsWith('!'));

    const candidate = summary?.slice(0, 420) || repository.description || '';
    return isLikelyEnglish(candidate) ? candidate : getEnglishFallback(repository);
  } catch {
    return getEnglishFallback(repository);
  }
}

function isLikelyEnglish(text: string): boolean {
  return !/\b(para|com|uma|um|que|dos|das|não|projeto|sistema|implementado|utilizando)\b|[ãõçáéíóú]/i.test(text);
}

function getEnglishFallback(repository: GitHubRepository): string {
  const language = repository.language || 'multiple technologies';
  return `A public ${language} project developed by Rodrigo Manão.`;
}

export default async function ProjectsPage() {
  let repositories: Project[] = [];
  let errorMessage = '';

  try {
    repositories = await getRepositories();
  } catch {
    errorMessage = 'Projects are temporarily unavailable. Please try again later.';
  }

  const items: ProjectItem[] = repositories.map((r) => ({
    id: r.id,
    name: r.name,
    summary: r.summary,
    url: r.html_url,
    language: r.language || 'Other',
    created: formatDate(r.created_at),
    updated: formatDate(r.updated_at),
  }));

  return (
    <>
      <NavBar page="projects" />
      <main className={styles.page}>
        <ProjectsBackdrop />
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <Reveal delay={150}>
              <h1 className={styles.title}>All Projects</h1>
            </Reveal>
            <Reveal delay={220}>
              <p className={styles.lede}>
                Everything public on my GitHub, most recently updated first. Click one to open it.
              </p>
            </Reveal>
          </header>

          {errorMessage ? (
            <p className={styles.error}>{errorMessage}</p>
          ) : items.length === 0 ? (
            <p className={styles.empty}>No public projects found.</p>
          ) : (
            <ProjectsBrowser projects={items} />
          )}
        </div>
      </main>
    </>
  );
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}
