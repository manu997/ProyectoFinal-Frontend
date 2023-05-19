import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body className="w-2/3 mx-auto bg-default">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
