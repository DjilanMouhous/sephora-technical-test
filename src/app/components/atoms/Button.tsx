import Link from "next/link";

export type BaseButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export type ClickButtonProps = BaseButtonProps & {
  onClick: () => void;
};
export type LinkButtonProps = BaseButtonProps & {
  href: string;
  as?: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = ClickButtonProps | LinkButtonProps;

const LinkButton = (props: LinkButtonProps) => {
  const { href, as, children, className, target, rel } = props;
  return (
    <Link href={href} as={as} className={className} target={target} rel={rel}>
      {children}
    </Link>
  );
};

const ClickButton = (props: ClickButtonProps) => {
  const { onClick, children, className, disabled } = props;
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

function isHrefButton(props: ButtonProps): props is LinkButtonProps {
  return "href" in props;
}
function isClickButton(props: ButtonProps): props is ClickButtonProps {
  return "onClick" in props;
}

export default function Button(props: ButtonProps) {
  const baseClassNames = `bg-neutral-950 border border-neutral-800 rounded-md px-4 py-2 text-neutral-100 transition-colors duration-100 hover:bg-neutral-900 ${
    props.className ?? ""
  }`;
  const disabledClass = "cursor-not-allowed opacity-50";
  const classNames = props.disabled
    ? `${baseClassNames} ${disabledClass}`
    : baseClassNames;

  switch (true) {
    case isHrefButton(props):
      return <LinkButton {...props} className={classNames} />;
    case isClickButton(props):
      return <ClickButton {...props} className={classNames} />;
  }
}
