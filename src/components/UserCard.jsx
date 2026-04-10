const UserCard = ({ user, selected, onSelect }) => (
  <button
    onClick={() => onSelect(user)}
    className={`flex items-center gap-3 p-3 rounded-xl border transition-all w-full text-left cursor-pointer ${
      selected
        ? "border-primary bg-primary/10 shadow-md"
        : "border-input bg-card hover:border-primary/40 hover:shadow-sm"
    }`}
  >
    <img
      src={user.avatar_url}
      alt={user.login}
      className="w-10 h-10 rounded-full object-cover"
    />
    <span className="font-medium text-card-foreground truncate">
      {user.login}
    </span>
  </button>
);

export default UserCard;
