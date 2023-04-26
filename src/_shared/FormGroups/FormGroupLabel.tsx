import { IFormGroupLabelProps } from "src/_shared/_formGroupTypes";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

export const FormGroupLabel = (props: IFormGroupLabelProps): JSX.Element => {
  const { tooltipText, label, formIdentifier, required } = props;

  const RenderTooltip = (tooltipProps: any) => <Tooltip {...tooltipProps}>{tooltipText}</Tooltip>;

  if (tooltipText) {
    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={RenderTooltip}>
        <Form.Label htmlFor={formIdentifier}>
          <span>{label}</span>
          {required ? <span className="text-danger">&nbsp;*&nbsp;</span> : null}
          <span className="text-info">
            <FontAwesomeIcon icon={faCircleQuestion as IconProp} />
          </span>
        </Form.Label>
      </OverlayTrigger>
    );
  }

  return (
    <Form.Label htmlFor={formIdentifier}>
      <span>{label}</span>
      {required ? <span className="text-danger">&nbsp;*</span> : null}
    </Form.Label>
  );
};
