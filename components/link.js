import React, {Children} from "react";
import Link from "next/link"; // eslint-disable-line
import url from "url";

type To = {
  href: string,
  query?: Object,
  hash?: string,
};

type LinkProps = {
  children: Children,
  href?: string,
  to?: To,
  prefetch: boolean,
};

export default (props: LinkProps) => {
  const {to, href, ...otherProps} = props;

  return (
    <Link
      href={to ? url.format(to) : href}
      prefetch
      {...otherProps}
    >
      {props.children}
    </Link>
  );
};
