import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { ITextAreaFormGroupProps } from "src/_shared/_formGroupTypes";
import { FormGroupLabel } from "./FormGroupLabel";

export const TextAreaFormGroup = (props: ITextAreaFormGroupProps): JSX.Element => {
  const {
    register,
    errors,
    validateObject,
    formIdentifier,
    disabled,
    required,
    requiredMessage,
    // TODO: autoComplete,
    labelKey,
    labelText,
    tooltipKey,
    tooltipText,

    // OnBlur seems to be ignored on input
    // TODO: forceTooltipWithFocus,
    inputClass,
    formClasses,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOver,
    onMouseUp,
    extraOnChange,
    // TODO: showValidTooltip,
    hideInvalidTooltip,
    // TODO: failsOn,
    // TODO: startTouched,
    placeholderKey,
    placeholderText,
    minLength,
    minLengthMessage,
    maxLength,
    maxLengthMessage,
    showCharacterCounter,
    rows
  } = props;

  const [touched, setTouched] = useState<boolean>(false);
  const [letterCount, setLetterCount] = useState<number>(0);

  const textArea = register(formIdentifier, {
    required: {
      value: typeof required === "boolean" ? required : null,
      message: requiredMessage ?? "This field is required"
    },
    minLength: {
      value: typeof minLength === "number" ? minLength : null,
      message: minLengthMessage ?? `Must reach minimum length of ${minLength}`
    },
    maxLength: {
      value: typeof maxLength === "number" ? maxLength : null,
      message: maxLengthMessage ?? `Must not exceed maximum length of ${maxLength}`
    },
    validate: validateObject ?? null
  });

  const applyValidClass = (): string => {
    if (!touched) {
      return "";
    }
    return errors[formIdentifier] ? "is-invalid" : "is-valid";
  };

  return (
    <Form.Group className={`position-relative ${formClasses ?? ""} ${errors[formIdentifier] ? "has-error" : ""}`}>
      <FormGroupLabel
        formIdentifier={formIdentifier}
        label={labelText ?? labelKey}
        tooltipText={tooltipText ?? tooltipKey ? tooltipKey : null}
        required={required}
      />

      <InputGroup>
        <textarea
          className={`w-100 p-1 form-control ${applyValidClass()} ${inputClass ?? ""}`}
          style={{
            maxWidth: "100%",
            minHeight: `${24 * (rows || 4)}px`
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onMouseOver={onMouseOver}
          onMouseUp={onMouseUp}
          rows={rows}
          disabled={disabled}
          {...textArea}
          onChange={e => {
            textArea.onChange(e);
            if (extraOnChange) {
              extraOnChange(e);
            }
            if (!touched) {
              setTouched(true);
            }
            setLetterCount(e.target.value.length);
          }}
          id={formIdentifier}
          placeholder={placeholderText ?? placeholderKey}
        />
        {maxLength > 0 && showCharacterCounter ? <div>{`${letterCount} of ${maxLength}`}</div> : null}
        {errors[formIdentifier] && !hideInvalidTooltip ? (
          <div
            className="input-group-append w-100 pt-1 ps-1"
            role="alert">
            <Form.Control.Feedback type="invalid">{errors[formIdentifier].message}</Form.Control.Feedback>
          </div>
        ) : null}
        {/* TODO: add success messages */}
      </InputGroup>
    </Form.Group>
  );
};
