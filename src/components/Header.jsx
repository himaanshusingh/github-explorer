import { Github, Moon, Sun, Bookmark } from "lucide-react";

const Header = ({ dark, onToggleTheme, showBookmarks, onToggleBookmarks, bookmarkCount }) => (
  <header className="sticky top-0 z-50 border-b border-input bg-card/80 backdrop-blur-md">
    <div className="container max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <Github className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-bold text-card-foreground">GitHub Explorer</h1>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleBookmarks}
          className={`relative p-2 rounded-lg transition-colors ${showBookmarks ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
          title="Bookmarks"
        >
          <Bookmark className="h-5 w-5" />
          {bookmarkCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-bookmark text-[10px] font-bold flex items-center justify-center text-primary-foreground">
              {bookmarkCount}
            </span>
          )}
        </button>
        <button onClick={onToggleTheme} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors" title="Toggle theme">
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  </header>
);

export default Header;
