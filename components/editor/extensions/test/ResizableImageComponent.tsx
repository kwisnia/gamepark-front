import { Image } from "@chakra-ui/react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const ResizableImageComponent = (props: NodeViewProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [lastMovement, setLastMovement] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const isDraggable = false;

  const resizeAspectRatio = useCallback(
    (grow: boolean) => {
      if (props.node.attrs.src) {
        let calcW;
        let calcH;
        if (grow) {
          calcH = props.node.attrs.height + 1;
        } else {
          calcH = props.node.attrs.height - 1;
        }
        calcW = calcH * aspectRatio;
        props.updateAttributes({ width: calcW, height: calcH });
      }
    },
    [props, aspectRatio]
  );

  useLayoutEffect(() => {
    console.log("Effect");
    const onMouseDown = () => {
      if (isDraggable) {
        return;
      }
      setIsResizing(true);
    };
    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      if (!isResizing) {
        return;
      }
      let movement = Math.sqrt(
        Math.pow(mouseMoveEvent.offsetY, 2) +
          Math.pow(mouseMoveEvent.offsetX, 2)
      );
      if (lastMovement > 0) {
        if (movement > lastMovement) {
          resizeAspectRatio(true);
        } else if (movement < lastMovement) {
          resizeAspectRatio(false);
        }
      }
      setLastMovement(movement);
    };
    const onMouseUp = () => {
      setIsResizing(false);
      setLastMovement(0);
    };
    if (imageRef.current) {
      imageRef.current.onload = () =>
        setAspectRatio(
          imageRef.current!.naturalWidth / imageRef.current!.naturalHeight
        );
      imageRef.current.addEventListener("mousedown", onMouseDown);
      imageRef.current.addEventListener("mousemove", (e) => onMouseMove);
      imageRef.current.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("mousedown", onMouseUp);
        imageRef.current.removeEventListener("mousemove", onMouseMove);
        imageRef.current.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [isDraggable, isResizing, lastMovement, resizeAspectRatio]);

  return (
    <NodeViewWrapper>
      <Image {...props.node.attrs} alt="Jihyo" ref={imageRef} />
    </NodeViewWrapper>
  );
};

export default ResizableImageComponent;
