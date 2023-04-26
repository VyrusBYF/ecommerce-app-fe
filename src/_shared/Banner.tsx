import { Container } from "react-bootstrap";
import { useLocation } from "react-router";

interface IBannerProps {
  title: string;
}

export const Banner = (props: IBannerProps): JSX.Element => {
  const { title } = props;
  const location = useLocation();

  return (
    <>
      <Container
        className="banner"
        id={`${title.toLowerCase()}-banner`}
        fluid>
        <img
          className="img-fluid w-100"
          src="/media/assets-page-banner.png"
          alt="page banner"
        />
        <div className="position-absolute">
          <h1>{title}</h1>
          <p className="text-sm">{`Home / ${title}`}</p>
        </div>
      </Container>
    </>
  );
};
