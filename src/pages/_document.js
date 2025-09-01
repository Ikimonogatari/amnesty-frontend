import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="mn">
      <Head>
        <meta name="title" content="ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ" />
        <meta
          name="keywords"
          content="amnesty, mongolia, international, ᠡᠮᠨᠧᠰᠲ᠋ᠢ, ᠮᠣᠩᠭᠣᠯ"
        />
        <meta
          name="description"
          content="ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠤᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ - ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠦᠯᠦᠭᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.webp"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.webp"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.webp"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#FFFF00" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0EEDEKGL9M"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0EEDEKGL9M');
          `,
          }}
        />
      </Head>
      <body className="antialiased bg-white text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
