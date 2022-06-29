type VersionProps = {
  username: string;
  repository: string;
};

export const version = async ({
  repository,
  username,
}: VersionProps): Promise<string | boolean> => {
  const RELEASES_REPOSITORY_URL = `https://github.com/${username}/${repository}/releases/latest`;
  const response = await fetch(RELEASES_REPOSITORY_URL, {
    method: "GET",
  });

  const url_parts = response.url.split("/");

  const version = url_parts.pop();

  if (version === "releases") {
    // there is not release yet :(
    return false;
  }

  return version!;
};
