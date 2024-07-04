import { ReactNode, useEffect, useState } from "react";

interface NoSSRProps {
  /**
   * Optional content to show before the component renders on client.
   * This renders during server-side rendering (SSR).
   */
  onSSR?: React.FC;
  /**
   * The content to render on client.
   */
  children?: ReactNode;
}

const EmptySpan: React.FC = (): ReactNode => <span />;

const NoSSR: React.FC<NoSSRProps> = (props: NoSSRProps): ReactNode => {
  const { onSSR = EmptySpan, children = <EmptySpan /> } = props;

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  });

  return isMounted ? children : onSSR({});
};

export { NoSSR };
