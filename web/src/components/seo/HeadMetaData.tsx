import Head from 'next/head';

type HeadMetaDataProps = {
  title: string;
};

const HeadMetaData = ({ title = 'Ngasir lebih ez' }: HeadMetaDataProps) => {
  const defaultTitle = 'Ngasir Lur';

  return (
    <Head>
      <title>{title + ' | ' + defaultTitle}</title>
    </Head>
  );
};

export default HeadMetaData;
