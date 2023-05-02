import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { RWebShare } from "react-web-share";

export const ShareButton = (): JSX.Element => (
  <Button
    variant="light"
    className="w-100 rounded-0 border-dark">
    <RWebShare
      data={{
        text: "Web Share - GfG",
        url: window.location.href,
        title: "GfG"
      }}>
      <FontAwesomeIcon
        className="text-dark"
        onClick={() => console.log("Shared Successfully!")}
        icon={faShareNodes as IconProp}
      />
    </RWebShare>
  </Button>
);
