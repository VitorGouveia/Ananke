import { MultiProgressBar } from "./deps.ts";

import { scale } from "./scale.ts";
import { promise } from "./promises.ts";

type DownloadGithubFileProps = {
  title: string;

  version: string;
  fileName: string;
  path: string;

  username: string;
  repository: string;
};

export const DownloadGithubFile = async ({
  title,
  fileName,
  version,
  path,
  username,
  repository,
}: DownloadGithubFileProps) => {
  const [response, fetchError] = await promise(
    fetch(
      `https://github.com/${username}/${repository}/releases/download/${version}/${fileName}`
    )
  );

  if (fetchError) {
    throw fetchError;
  }

  const body = response?.clone().body;
  const totalBytes = Number(response?.headers.get("content-length"));
  let bytesReceived = 0;

  const progressBar = new MultiProgressBar({
    title,
    complete: "=",
    incomplete: "-",
    display: "[:bar] :text :percent :time :completed/:total",
    width: 100,
  });

  const [localFile, fileOpenError] = await promise(
    Deno.open(path, {
      create: true,
      write: true,
    })
  );

  if (fileOpenError) throw fileOpenError;
  // https://deno.land/manual/examples/fetch_data
  for await (const chunk of body!) {
    bytesReceived += chunk.length;

    const percentage = scale(bytesReceived, [0, totalBytes], [0, 100]);

    progressBar.render([
      {
        completed: Math.round(percentage),
      },
    ]);

    try {
      await Deno.write(localFile?.rid!, chunk);
    } catch (error) {
      throw error;
    }
  }

  localFile?.close();

  return localFile;
};
