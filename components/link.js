import React, {Children} from "react";
import Link from "next/prefetch"; // eslint-disable-line
import url from "url";

type To = {
  href: string,
  query?: Object,
  hash?: string,
}

type LinkProps = {
  children: Children,
  href?: string,
  to?: To,
}

export default (props: LinkProps) => {
  const {to, href, ...otherProps} = props;

  return (
    <Link
      href={to ? url.format(to) : href}
      {...otherProps}
      prefetch
    >{props.children}</Link>
  );
};
