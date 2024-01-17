import { useGetUserAuthorization } from '@goal-tracker/data-access';
import styles from './Account.module.scss';

/* eslint-disable-next-line */
export interface AccountProps {}

export function Account(props: AccountProps) {
  const { data } = useGetUserAuthorization();
  return (
    <div className={styles.account}>
      <div className={styles.row}>
        <div className={styles.heading}>First name- </div>
        <div className={styles.desc}>{data?.response?.firstName}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.heading}>Last name- </div>
        <div className={styles.desc}>{data?.response?.lastName}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.heading}>Email- </div>
        <div className={styles.desc}>{data?.response?.email}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.heading}>Mobile number- </div>
        <div className={styles.desc}>{data?.response?.mobile_number}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.heading}>Gender- </div>
        <div className={styles.desc}>{data?.response?.gender}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.heading}>User ID- </div>
        <div className={styles.desc}>{data?.response?.userId}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.heading}>Role ID- </div>
        <div className={styles.desc}>{data?.response?.role.roleId}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.heading}>Role Name- </div>
        <div className={styles.desc}>{data?.response?.role.name}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.heading}>Role Decription- </div>
        <div className={styles.desc}>{data?.response?.role.description}</div>
      </div>
    </div>
  );
}

export default Account;
