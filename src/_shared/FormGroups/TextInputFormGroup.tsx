import { ITextInputFormGroupProps } from "../_formGroupTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faAt, faFax, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const TextInputFormGroup = (props: ITextInputFormGroupProps): JSX.Element => {
  const [touched, setTouched] = useState<boolean>(false);
  const [tooltipIsOpen, setTooltipIsOpen] = useState<boolean>(false);

  const {
    register,
    errors,
    pattern,
    patternMessage,
    validateObject,
    formIdentifier,
    disabled,
    required,
    requiredMessage,
    autoComplete,
    labelKey,
    labelText,
    tooltipKey,
    tooltipText,
    // onBlur seems to be ignored on input
    forceTooltipWithFocus,
    leftIcon,
    leftJSXIcon,
    rightIcon,
    inputClass,
    formClasses,
    labelClasses,
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
    ariaDescribedBy,
    failsOn,
    hideInvalidTooltip,
    isEmail,
    isFax,
    isPhone,
    isUsername,
    max,
    maxLength,
    maxLengthMessage,
    maxMessage,
    min,
    minLength,
    minLengthMessage,
    minMessage,
    placeholderKey,
    placeholderText,
    showValidTooltip,
    startTouched
  } = props;

  const textInput = register(formIdentifier, {
    max: {
      value: typeof max === "number" ? max : null,
      message: maxMessage ?? `Please enter an amount less than ${max}`
    },
    maxLength: {
      value: typeof maxLength === "number" ? maxLength : null,
      message: maxLengthMessage ?? `Must not exceed maximum length of ${maxLength}`
    },
    min: {
      value: typeof min === "number" ? min : null,
      message: minMessage ?? `Please enter an amount greater than ${max}`
    },
    minLength: {
      value: typeof minLength === "number" ? minLength : null,
      message: minLengthMessage ?? `Must reach minimum length of ${minLength}`
    },
    pattern: {
      value: pattern === null ? null : pattern,
      message: patternMessage ?? "Value does not match required pattern"
    },
    required: {
      value: typeof required === "boolean" ? required : null,
      message: requiredMessage ?? "This field is required"
    },
    validate: validateObject ?? null
  });

  let inputAutoComplete = "";
  if (isUsername) {
    inputAutoComplete = "username";
  } else if (isEmail) {
    inputAutoComplete = "email";
  } else if (isPhone) {
    inputAutoComplete = "tel";
  } else if (isFax) {
    inputAutoComplete = "fax";
  } else if (autoComplete) {
    inputAutoComplete = autoComplete;
  }

  const applyValidClass = (): string => {
    if (!touched) {
      return "";
    }
    return errors[formIdentifier] ? "is-invalid" : "is-valid";
  };

  const renderLeftIcon = () => {
    if (!isEmail && !isFax && !isPhone && !leftIcon && !leftJSXIcon) {
      return null;
    }
    return (
      <div className="input-group-prepend input-group-text">
        {isEmail ? <FontAwesomeIcon icon={faAt} /> : null}
        {isPhone ? <FontAwesomeIcon icon={faPhone} /> : null}
        {isFax ? <FontAwesomeIcon icon={faFax} /> : null}
        {leftIcon ? <FontAwesomeIcon icon={leftIcon} /> : null}
        {leftJSXIcon ?? null}
      </div>
    );
  };

  return (
    <div className={`form-group position-relative ${formClasses ?? ""} ${errors[formIdentifier] ? "has-error" : ""}`}>
      <label
        htmlFor={formIdentifier}
        className={`control-label ${labelClasses ?? ""}`}
        onMouseEnter={e => {
          if (tooltipKey || tooltipText) {
            setTooltipIsOpen(true);
          }
        }}
        onMouseLeave={e => {
          if (tooltipIsOpen) {
            setTooltipIsOpen(false);
          }
        }}>
        <span>{labelKey ?? labelText}</span>
        {required ? <span className="text-danger">&nbsp;*</span> : null}
        {tooltipKey || tooltipText ? (
          <span className="text-info">
            <FontAwesomeIcon icon={faCheckCircle as IconProp} />
          </span>
        ) : null}
      </label>
      {tooltipIsOpen ? (
        <div className={"rounded border text-center p-2 w-25 small bg-dark text-light form-group-tooltip"}>
          {tooltipKey}
        </div>
      ) : null}
      <div className="input-group">
        {renderLeftIcon()}
        <input
          className={`form-control ${rightIcon ? "" : "rounded-right"} ${applyValidClass()} ${inputClass ?? ""}`}
          type={isPhone || isFax ? "tel" : "text"}
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
          disabled={disabled}
          autoComplete={inputAutoComplete ?? "off"}
          aria-describedby={ariaDescribedBy ?? ""}
          {...textInput}
          onChange={e => {
            textInput.onChange(e);
            if (extraOnChange) {
              extraOnChange(e);
            }
            if (!touched) {
              setTouched(true);
            }
          }}
          id={formIdentifier}
          placeholder={placeholderKey ? "" : placeholderText}
        />
        {rightIcon ? (
          <div className="input-group-append input-group-text rounded-right">
            <FontAwesomeIcon icon={rightIcon} />
          </div>
        ) : null}
        {errors[formIdentifier] && !hideInvalidTooltip ? (
          <div
            className="input-group-append w-100 pt-1 pl-1"
            role="alert">
            <span className="text-danger">{errors[formIdentifier].message}</span>
          </div>
        ) : null}
        {/* TODO: add success messages */}
      </div>
    </div>
  );
};
