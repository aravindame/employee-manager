import { Wrapper } from '@/redux/Wrapper';
import { ThemeProviderWrapper } from '@/themes/themeContext';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ThemeProviderWrapper>
          <Wrapper>{children}</Wrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
