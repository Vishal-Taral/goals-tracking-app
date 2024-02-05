import styles from './BreadCrumb.module.scss';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface BreadcrumbsProps {}

export const BreadCrumb = () => {
  const router = useRouter();
  const pathnames = router.pathname.split('/').filter((x) => x);

  return (
    <div className={styles.container}>
      <MuiBreadcrumbs separator="›" aria-label="breadcrumb">
        <Link href="/">
          Home
        </Link>
        {pathnames.map((path, index) => {
          const route = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography key={route} color="textPrimary">{path}</Typography>
          ) : (
            <Link key={route} href={route} color="inherit">{path}</Link>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};

export default BreadCrumb;
