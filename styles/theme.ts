import { extendTheme, StyleProps, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props: StyleProps) => ({
    body: {
      ".ProseMirror": {
        mt: 4,
        "> * + *": {
          marginTop: "0.75em",
        },
        // @see https://github.com/jesster2k10/guava-cards/blob/5d5c283eb720bf503258f4e17bce3865d35fd8d3/packages/website/src/bundles/editor/ContentEditor.tsx#L86
        "p.is-editor-empty:first-of-type::before": {
          content: "attr(data-placeholder)",
          color: "gray.500",
          float: "left",
          pointerEvents: "none",
          height: 0,
        },
        "&:focus": {
          outline: "none",
        },
        h1: {
          fontSize: "1.25rem",
        },
        h2: {
          fontSize: "1.15rem",
        },
        h3: {
          fontSize: "1rem",
        },
        "h1, h2, h3, h4,  h5, h6 ": {
          lineHeight: "1.1",
          fontWeight: "700",
          overflowY: "hidden",
        },
        "ul, ol": {
          padding: "0 1.2rem",
        },
        ul: {
          listStyleType: "disc",
        },
        ol: {
          listStyleType: "decimal",
        },
        code: {
          bg: "rgba(#616161, 0.1)",
          color: "#616161",
        },
        pre: {
          fontFamily: "JetBrainsMono, 'Courier New', Courier, monospace",
          background: mode("gray.900", "blue.200")(props),
          color: mode("white", "gray.900")(props),
          padding: "0.75rem 1rem",
          rounded: "lg",
          whiteSpace: "pre-wrap",
          code: {
            color: "inherit",
            p: 0,
            background: "none",
            fontSize: "0.8rem",
          },

          ".hljs-comment, .hljs-quote": {
            color: "#616161",
          },

          ".hljs-variable, .hljs-template-variable,  .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-name, .hljs-selector-id, .hljs-selector-class":
            {
              color: "#F98181",
            },

          ".hljs-number,  .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal,  .hljs-type, .hljs-params":
            {
              color: "#FBBC88",
            },

          ".hljs-string, .hljs-symbol, .hljs-bullet": {
            color: "#B9F18D",
          },

          ".hljs-title, .hljs-section": {
            color: "#FAF594",
          },

          ".hljs-keyword, .hljs-selector-tag": {
            color: "#70CFF8",
          },

          ".hljs-emphasis": {
            fontStyle: "italic",
          },

          ".hljs-strong": {
            fontWeight: 700,
          },
        },
        blockquote: {
          pl: 4,
          borderLeft: "2px solid rgba(13, 13, 13, 0.1)",
          borderLeftColor: mode(undefined, "whiteAlpha.500")(props),
        },
        "span[data-spoiler]": {
          bg: "black",
          color: "black",
          _hover: {
            bg: "transparent",
            color: "white",
          },
        },
        mark: {
          bg: "#FAF594",
        },
        hr: {
          border: "none",
          borderTop: "2px solid rgba(13,13,13,.1)",
          margin: "2rem 0",
        },
        img: {
          maxH: "50vh",
          width: "auto",
        },
      }, // .ProseMirror
    },
  }),
};

const theme = extendTheme({
  fonts: {
    heading: "'Exo 2', sans-serif",
    body: "Montserrat, sans-serif",
    paragraph: "Montserrat, sans-serif",
  },
  styles,
  config,
});

export default theme;
