import styles from './Loader.module.scss';

/* eslint-disable-next-line */
export interface LoaderProps {}

export function Loader(props: LoaderProps) {
  return (
    <div className='loader_container'>
      <div></div>
    </div>
  );
}

export default Loader;
