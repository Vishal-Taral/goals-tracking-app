import styles from './footer.module.scss';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_left}>
        <span className={styles.heading}>
          GOT
        </span>
        <span className={styles.subHeading}>
          Goals On Track
        </span>
      </div>
      <div className={styles.footer_right}>
        <div className={styles.footer_right_links}>
          <p className={styles.links_heading}>Links</p>
          <p className={styles.links}>Dashboard</p>
          <p className={styles.links}>Login</p>
        </div>
        <div className={styles.footer_right_contactUs}>
          <p className={styles.contactUs_heading}>Contact Us</p>
          <p className={styles.contactUs}>Phone</p>
          <p className={styles.contactUs}>Email</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
