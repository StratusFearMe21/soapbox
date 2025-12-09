import {useEffect} from "react";

const useMetadata = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title
    if (description) {
      const metaElement = document.querySelector(`meta[name=description]`);
      if (metaElement) {
        metaElement.setAttribute('content', description);
      } else {
        const metaElement = document.createElement("meta");
        metaElement.name = 'description';
        metaElement.content = description;
        document.head.appendChild(metaElement);
      }
    }
  }, [title, description]);
}

export default useMetadata;