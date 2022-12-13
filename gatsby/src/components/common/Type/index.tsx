import React, {PropsWithChildren} from 'react';
import classNames from 'classnames';

interface TypeProps {
  className?: string;
  style?: React.CSSProperties;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  faint?: boolean;
  variant?:
    | 'title-1-display-large'
    | 'title-1-display'
    | 'title-1'
    | 'title-2'
    | 'title-3'
    | 'title-4'
    | 'title-5'
    | 'navigation-text'
    | 'eyebrow-small'
    | 'eyebrow-regular'
    | 'body-small'
    | 'body-regular'
    | 'body-large'
    | 'caption';
}

const Type: React.FC<PropsWithChildren<TypeProps>> = ({
  tag: Tag = 'p',
  variant,
  faint,
  className,
  children,
  style,
}) => {
  return (
    <Tag
      className={classNames(variant, className, {['text-faint']: faint})}
      style={style}>
      {children}
    </Tag>
  );
};

export default Type;
