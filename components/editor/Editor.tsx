import { Box, useToast } from "@chakra-ui/react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";
import { Indentation } from "./extensions/Indentation";
import { uploadImagePlugin } from "./extensions/plugins/ImageUploadPlugin";
import { SmilieReplacer } from "./extensions/SmileReplacer";
import { Spoiler } from "./extensions/Spoiler";
import Toolbar from "./toolbar/Toolbar";

const Editor = () => {
  const toast = useToast();
  const handleImageUpload = useCallback(
    (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        if (file.size > 1000000) {
          toast({
            title: "Image too large",
            description: "The image you are trying to upload is too large",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          reject("File is too big");
        }
        const formData = new FormData();
        formData.append("image", file);
        fetch(
          "https://api.imgbb.com/1/upload?key=16b66d54971dc8467d548a5894e2121c",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => resolve(result.data.url))
          .catch(() => reject(new Error("Upload failed")));
      }),
    []
  );

  const kotki = async (file: File) => {
    console.log(file);
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();
    return data[0].url;
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      Image.extend({
        addProseMirrorPlugins() {
          return [uploadImagePlugin(handleImageUpload)];
        },
      }),
      Indentation,
      SmilieReplacer,
      Spoiler,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right"],
      }),
      Youtube,
    ],
  });

  return (
    <Box bg="gray.600" rounded="lg" minH="44">
      <Toolbar editor={editor} />
      <Box p="0.1rem 1rem" flex="1 1 auto" overflowX="hidden" overflowY="auto">
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default Editor;
