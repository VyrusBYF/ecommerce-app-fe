import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export const WishlistButton = (): JSX.Element => (
  <Button
    variant=""
    className="w-100 rounded-0 border-dark"
    onClick={() => toast.info("Wishlist coming soon")}>
    <FontAwesomeIcon icon={faHeart as IconProp} />
  </Button>
);
