import { Star, GitFork, Bookmark, ExternalLink } from "lucide-react";

const RepoCard = ({ repo, bookmarked, onToggleBookmark }) => {
  return (
    <div className="p-4 rounded-xl border border-input bg-card hover:shadow-md transition-all group">
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary hover:underline flex items-center gap-1 min-w-0"
        >
          <span className="truncate">{repo.name}</span>
          <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        <button
          onClick={() => onToggleBookmark(repo)}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
          title={bookmarked ? "Remove bookmark" : "Bookmark"}
        >
          <Bookmark
            className={`h-4 w-4 ${bookmarked ? "fill-bookmark text-bookmark" : "text-muted-foreground"}`}
          />
        </button>
      </div>

      {repo.description && (
        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-star" />
          {repo.stargazers_count.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5 text-fork" />
          {repo.forks_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default RepoCard;
