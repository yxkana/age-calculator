import { type AppType } from "next/dist/shared/lib/utils";
import { Poppins } from "next/font/google";

import "~/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: ["italic", "normal"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
