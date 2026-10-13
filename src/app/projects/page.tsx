import type { Metadata } from 'next';
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
    repository => !repository.fork && !repository.archived,
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

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <nav className={styles.projectNav} aria-label="Projects navigation">
          <a href="/" className={styles.logo}>{'<RM/>'}</a>
          <span className={styles.navTitle}>All Projects</span>
          <a href="/" className={styles.backLink}>
            <span className={styles.backLinkText}>Back to home</span>
          </a>
        </nav>

        {errorMessage ? (
          <p className={styles.error}>{errorMessage}</p>
        ) : repositories.length === 0 ? (
          <p className={styles.empty}>No public projects found.</p>
        ) : (
          <div className={styles.repositoryList}>
            {repositories.map(repository => (
              <a
                key={repository.id}
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repository}
              >
                <span className={styles.cardOverlay} aria-hidden="true" />
                <div className={styles.repositoryHeader}>
                  <h2>{repository.name}</h2>
                </div>
                <div className={styles.repositoryContent}>
                  <p>{repository.summary}</p>
                  <div className={styles.repositoryFooter}>
                    <div className={styles.repositoryMeta}>
                      <span>{repository.language || 'Various'}</span>
                      <span>Created {formatDate(repository.created_at)}</span>
                      <span>Updated {formatDate(repository.updated_at)}</span>
                    </div>
                    <span className={styles.viewLabel}>View on GitHub →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}
