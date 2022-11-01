import { Box, useToast } from "@chakra-ui/react";
import CharacterCount from "@tiptap/extension-character-count";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Field, useField } from "formik";
import { useCallback, useEffect } from "react";
import { axiosClient, BASE_URL } from "../../constants";
import { Indentation } from "./extensions/Indentation";
import { uploadImagePlugin } from "./extensions/plugins/ImageUploadPlugin";
import { SmilieReplacer } from "./extensions/SmileReplacer";
import { Spoiler } from "./extensions/Spoiler";
import Toolbar from "./toolbar/Toolbar";

interface EditorProps {
  content?: string;
  onChange?: (value: string) => void;
}

const Editor = ({ onChange, content }: EditorProps) => {
  const toast = useToast();
  const handleImageUpload = useCallback(
    (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        if (file.size > 1000000) {
          toast({
            title: "Image too large",
            description:
              "The image you are trying to upload is too large. Please upload an image smaller than 10MB.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          reject("File is too big");
        }
        const formData = new FormData();
        formData.append("image", file);
        axiosClient
          .post("/image", formData)
          .then((result) => {
            resolve(result.data.url);
          })
          .catch(() => reject(new Error("Upload failed")));
      }),
    [toast]
  );

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
      CharacterCount,
    ],
    content,
  });

  useEffect(() => {
    editor?.commands.setContent(content ?? "");
  }, [content]);

  useEffect(() => {
    editor?.on("update", () => {
      if (editor.storage.characterCount.characters() === 0) {
        onChange?.("");
      } else {
        onChange?.(editor?.getHTML());
      }
    });
  }, [editor, onChange]);

  return (
    <Box bg="gray.600" rounded="lg" minH="44">
      <Toolbar editor={editor} />
      <Box p="0.1rem 1rem" flex="1 1 auto" overflowX="hidden" overflowY="auto">
        <EditorContent editor={editor} content={content} />
      </Box>
    </Box>
  );
};

export default Editor;
