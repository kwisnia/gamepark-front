import { useLayoutEffect, useRef, useState } from "react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
// import Image from "next/future/image";
import { Image } from "@chakra-ui/react";

const ImageResizeComponent = (props: NodeViewProps) => {
  const handler = (mouseDownEvent: React.MouseEvent<HTMLImageElement>) => {
    const parent = (mouseDownEvent.target as HTMLElement).closest(
      ".image-resizer"
    );
    const image = parent?.querySelector("img.postimage") ?? null;
    if (image === null) return;
    const startSize = { x: image.clientWidth, y: image.clientHeight };
    const startPosition = {
      x: mouseDownEvent.pageX,
      y: mouseDownEvent.pageY,
    };

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      props.updateAttributes({
        width: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        height: startSize.y - startPosition.y + mouseMoveEvent.pageY,
      });
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };
  return (
    <NodeViewWrapper className="image-resizer">
      <Image {...props.node.attrs} className="postimage" alt="Jihyo" />
      <div className="resize-trigger" onMouseDown={handler}>
        {props.extension.options.resizeIcon}
      </div>
    </NodeViewWrapper>
  );
};

export default ImageResizeComponent;
