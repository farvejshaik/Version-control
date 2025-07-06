import Repo from "./Repo";

const Repos = ({ repos, loading, alwaysFullWidth = false }) => {
  const className = alwaysFullWidth ? "w-full" : "lg:w-2/3 w-full";

  return (
    <div className={`${className} bg-glass rounded-lg px-8 py-6`}>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : repos.length > 0 ? (
        <ol className="relative border-s border-gray-200">
          {repos.map((repo) => (
            <Repo key={repo.id} repo={repo} />
          ))}
        </ol>
      ) : (
        <p className="flex items-center justify-center h-32">No Repos Found</p>
      )}
    </div>
  );
};

export default Repos;
