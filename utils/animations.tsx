type scopeTextProps = {
  children?: React.ReactNode | string | number | null;
  className?: string;
};
function ScopesText({ children, className }: scopeTextProps): JSX.Element {
  let classNames = "scopes-text";

  if (className) {
    classNames += " " + className;
  }

  return (
    <div className={classNames}>
      <p>
        <span className="open">(</span>
        <span className="content">{children}</span>
        <span className="close">)</span>
      </p>
    </div>
  );
}

export { ScopesText };
