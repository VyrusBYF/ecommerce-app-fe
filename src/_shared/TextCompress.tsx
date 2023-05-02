import { useState } from "react";

interface ITextCompressProps {
  text: string;
  textClasses?: string;
}

export const TextCompress = (props: ITextCompressProps): JSX.Element => {
  const { text, textClasses } = props;
  const defaultText = "No descripton";
  const [readMore, setReadMore] = useState<boolean>(true);
  return (
    <div className={textClasses}>
      <p>{readMore ? `${text?.slice(0, 120) ?? defaultText}.....` : text ?? defaultText}</p>
      {readMore ? (
        <span
          className="text-primary fst-italic"
          onClick={() => setReadMore(false)}>
          read more
        </span>
      ) : (
        <span
          className="text-primary fst-italic"
          onClick={() => setReadMore(true)}>
          show less
        </span>
      )}
    </div>
  );
};
