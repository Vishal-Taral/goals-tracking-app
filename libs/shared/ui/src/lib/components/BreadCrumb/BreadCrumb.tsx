import styles from './BreadCrumb.module.scss';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface BreadcrumbsProps {}

export const BreadCrumb = () => {
  const router = useRouter();
  let pathnames = router.pathname.split('/').filter((pathNames) => pathNames);
  pathnames = pathnames.filter((path) => path !== 'manage');

  console.log("pathnames", pathnames);

  return (
    <div className={styles.container}>
      <MuiBreadcrumbs separator="/" aria-label="breadcrumb" >
        <Link href="/" className={styles.pathNames} /* color="inherit" */>Home</Link>
        {pathnames.map((path, index) => {
          const route = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography key={route} color="textPrimary" className={styles.pathNames}>
              {path}
            </Typography>
          ) : (
            <Link key={route} href={route} /* color="inherit" */ className={styles.pathNames}>
              {path}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};

export default BreadCrumb;
