import Image from "@tiptap/extension-image";
import { Command, ReactNodeViewRenderer } from "@tiptap/react";
import ResizableImageComponent from "./ResizableImageComponent";

declare module "@tiptap/core" {
  interface Commands {
    resizableImage: {
      /**
       * Toggle a bold mark
       */
      toggleResizable: () => Command;
    };
  }
}

export default Image.extend({
  name: "resizableImage",

  addAttributes() {
    return {
      ...this.parent?.(),

      width: {
        default: "100%",
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          };
        },
      },

      height: {
        default: "auto",
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          };
        },
      },

      isDraggable: {
        default: false,
        renderHTML: (attributes) => {
          return {};
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});
