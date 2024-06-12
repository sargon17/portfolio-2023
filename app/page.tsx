import App from "./app";

import Providers from "./Providers";

export default async function Home() {
  // const projects: project[] = await getProjects();

  return (
    <Providers>
      <App />
    </Providers>
  );
}
