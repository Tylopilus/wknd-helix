type Modify<T, R> = Omit<T, keyof R> & R;

export type QueryIndexItemProps = {
  path: string;

  title: string;

  description: string | undefined;

  keywords: string | undefined;

  robots: string | undefined;

  image: string | undefined;

  tags: string | undefined;

  affiliation: string | undefined;

  twitter: string | undefined;

  lastModified: string;
};

export type QueryIndexItemReturnType = Modify<
  QueryIndexItemProps,
  { robots: string[]; tags: string[]; keywords: string[] }
>;
export default function QueryIndexItem(
  props: QueryIndexItemProps
): QueryIndexItemReturnType;
