"use client";

import useMetadata from "@/app/utils/useMetadata";

export default function MetadataComponent( {title, description} : {title: string, description?: string} ) {
  useMetadata(title, description);
  return null;
}